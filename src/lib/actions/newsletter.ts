"use server";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates the address and forwards it to the newsletter provider configured through
 * NEWSLETTER_WEBHOOK_URL (server-only). Without that variable, signups are refused rather than
 * silently dropped.
 */
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!emailPattern.test(email) || email.length > 254) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const endpoint = process.env.NEWSLETTER_WEBHOOK_URL;
  if (!endpoint) {
    return {
      status: "error",
      message: "Newsletter signup is temporarily unavailable. Please try again later.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "somabay.com" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Newsletter provider responded with ${response.status}`);
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return { status: "error", message: "We couldn’t subscribe you right now. Please try again." };
  }

  return { status: "success", message: "Thank you — you’re on the list." };
}
