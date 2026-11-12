import type { NewsletterState } from "@/lib/actions/newsletter";

export type { NewsletterState };

/**
 * Static-hosting stand-in for the newsletter server action (GitHub Pages has no server). It answers
 * the way the live action does when no NEWSLETTER_WEBHOOK_URL is configured.
 */
export async function subscribeToNewsletter(
  _previous: NewsletterState,
  _formData: FormData,
): Promise<NewsletterState> {
  return {
    status: "error",
    message: "Newsletter signup is temporarily unavailable. Please try again later.",
  };
}
