"use client";

import { useActionState, useId } from "react";
import { type NewsletterState, subscribeToNewsletter } from "@/lib/actions/newsletter";
import { cn } from "@/lib/utils";

const initialState: NewsletterState = { status: "idle", message: "" };

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribeToNewsletter, initialState);
  const inputId = useId();
  const messageId = useId();

  return (
    <form action={formAction} className="mt-6" noValidate>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-0 sm:border sm:border-white/25 sm:p-1.5 sm:focus-within:border-white/60">
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          aria-describedby={messageId}
          aria-invalid={state.status === "error" || undefined}
          className="min-h-12 w-full border border-white/25 bg-transparent px-4 text-white outline-none placeholder:text-white/50 sm:border-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="min-h-12 shrink-0 bg-white px-7 text-[0.75rem] font-semibold tracking-label text-ink uppercase transition-colors duration-500 hover:bg-turquoise hover:text-white disabled:opacity-60"
        >
          {pending ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          "mt-3 text-caption",
          state.status === "error" && "text-alert-soft",
          state.status === "success" && "text-turquoise",
          state.status === "idle" && "text-white/55",
        )}
      >
        {state.status === "idle"
          ? "By subscribing you agree to our Privacy Policy."
          : state.message}
      </p>
    </form>
  );
}
