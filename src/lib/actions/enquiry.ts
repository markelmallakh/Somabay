"use server";

import { type FormField, formDefinitions, isFormId } from "@/lib/forms";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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
  const fieldErrors: Record<string, string> = {};
  for (const field of definition.fields) {
    const raw = String(formData.get(field.name) ?? "");
    const error = validate(field, raw);
    if (error) fieldErrors[field.name] = error;
    else if (field.kind !== "consent") values[field.name] = raw.trim();
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
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Enquiry endpoint responded with ${response.status}`);
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return {
      status: "error",
      message: "We couldn’t send your request right now. Please try again.",
    };
  }

  return { status: "success", message: "Thank you — our team will be in touch shortly." };
}
