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
      <div className="flex items-center gap-2 rounded-md bg-sand-100 px-4 transition-shadow duration-500 focus-within:shadow-[inset_0_0_0_1px_var(--color-turquoise)]">
        {/* The label sits inside the box and floats up, shrinking, on focus or once typed in. */}
        <div className="relative min-w-0 flex-1">
          <input
            id={inputId}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder=" "
            aria-describedby={messageId}
            aria-invalid={state.status === "error" || undefined}
            className="peer min-h-14 w-full bg-transparent pt-5 pb-1.5 text-body-md text-ink outline-none"
          />
          <label
            htmlFor={inputId}
            className="pointer-events-none absolute top-1/2 left-0 origin-top-left -translate-y-1/2 text-body-md text-slate transition-[translate,scale,color] duration-300 ease-out-expo peer-focus:-translate-y-[1.4rem] peer-focus:scale-75 peer-focus:text-turquoise-160 peer-[:not(:placeholder-shown)]:-translate-y-[1.4rem] peer-[:not(:placeholder-shown)]:scale-75"
          >
            Your email address
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center gap-1 text-body-sm font-medium text-turquoise uppercase transition-colors duration-500 hover:text-lagoon disabled:opacity-60"
        >
          {pending ? "Joining…" : "Join"}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="size-4 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
          >
            <path d="M4 12h15m-5-5 5 5-5 5" />
          </svg>
        </button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 text-body-xs",
          state.status === "error" && "text-alert",
          state.status === "success" && "text-lagoon",
          state.status === "idle" && "sr-only",
        )}
      >
        {state.status === "idle"
          ? "By subscribing you agree to our Privacy Policy."
          : state.message}
      </p>
    </form>
  );
}
