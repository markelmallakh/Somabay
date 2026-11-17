"use server";

import { type FormField, fieldShown, formDefinitions, isFormId } from "@/lib/forms";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Checks an uploaded file against its field: present when required, an allowed type, small enough. */
function validateFile(
  field: Extract<FormField, { kind: "file" }>,
  file: FormDataEntryValue | null,
): string | undefined {
  const upload = file instanceof File && file.size > 0 ? file : null;
  if (!upload) return field.required ? "Please attach your file." : undefined;
  const allowed = field.accept.split(",").map((ext) => ext.trim().toLowerCase());
  if (!allowed.some((ext) => upload.name.toLowerCase().endsWith(ext)))
    return `Please attach a ${allowed.join(", ")} file.`;
  if (upload.size > field.maxMb * 1024 * 1024)
    return `Please attach a file under ${field.maxMb} MB.`;
  return undefined;
}

function validate(field: FormField, raw: string): string | undefined {
  const value = raw.trim();
  if (field.kind === "consent")
    return raw === "on" ? undefined : "Please accept the terms to continue.";
  if (field.required && !value) return "This field is required.";
  if (value.length > 4000) return "Please shorten this entry.";
  if (field.kind === "email" && value && !emailPattern.test(value))
    return "Please enter a valid email address.";
  if (field.kind === "tel" && value && !/^[+\d][\d\s()-]{5,}$/.test(value))
    return "Please enter a valid phone number.";
  if (
    (field.kind === "select" || field.kind === "radio") &&
    value &&
    !field.options.includes(value)
  ) {
    return "Please choose one of the options.";
  }
  return undefined;
}

/**
 * Validates a submission against its server-side form definition and forwards it to the
 * enquiry endpoint configured in ENQUIRY_WEBHOOK_URL. Without it, submissions are refused
 * rather than silently dropped.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const formId = String(formData.get("formId") ?? "");
  if (!isFormId(formId)) return { status: "error", message: "This form is not available." };
  const definition = formDefinitions[formId];

  const values: Record<string, string> = {};
  const files: { field: string; name: string; type: string; size: number; data: string }[] = [];
  const fieldErrors: Record<string, string> = {};
  const read = (name: string) => String(formData.get(name) ?? "").trim();
  for (const field of definition.fields as readonly FormField[]) {
    // Questions that don't apply to this purpose are neither required nor sent.
    if (!fieldShown(field, read)) continue;
    if (field.kind === "file") {
      const entry = formData.get(field.name);
      const error = validateFile(field, entry);
      if (error) fieldErrors[field.name] = error;
      else if (entry instanceof File && entry.size > 0) {
        files.push({
          field: field.name,
          name: entry.name,
          type: entry.type,
          size: entry.size,
          data: Buffer.from(await entry.arrayBuffer()).toString("base64"),
        });
      }
      continue;
    }
    const raw = String(formData.get(field.name) ?? "");
    const error = validate(field, raw);
    if (error) fieldErrors[field.name] = error;
    else if (field.kind === "tel" && raw.trim() && !raw.trim().startsWith("+")) {
      // The country code from the phone field's dropdown, joined to the number.
      const code = String(formData.get(`${field.name}Code`) ?? "").trim();
      values[field.name] = code ? `${code} ${raw.trim()}` : raw.trim();
    } else if (field.kind !== "consent") values[field.name] = raw.trim();
  }
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  const endpoint = process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) {
    return {
      status: "error",
      message: "Online requests are temporarily unavailable. Please call 16390.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: formId,
        subject: definition.subject,
        context: String(formData.get("context") ?? ""),
        values,
        // Attachments (e.g. a CV) as base64, so the endpoint can forward them by email.
        ...(files.length ? { files } : {}),
      }),
      signal: AbortSignal.timeout(files.length ? 20000 : 8000),
    });
    if (!response.ok) throw new Error(`Enquiry endpoint responded with ${response.status}`);
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return {
      status: "error",
      message: "We couldn’t send your request right now. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      ("successMessage" in definition ? definition.successMessage : undefined) ??
      "Thank you — our team will be in touch shortly.",
  };
}
