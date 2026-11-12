import type { EnquiryState } from "@/lib/actions/enquiry";

export type { EnquiryState };

/**
 * Static-hosting stand-in for the enquiry server action (GitHub Pages has no server). It answers
 * the way the live action does when no ENQUIRY_WEBHOOK_URL is configured.
 */
export async function submitEnquiry(
  _previous: EnquiryState,
  _formData: FormData,
): Promise<EnquiryState> {
  return {
    status: "error",
    message: "Online requests are temporarily unavailable. Please call 16390.",
  };
}
