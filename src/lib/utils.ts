import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's default type scale, so it would read custom sizes like
 * `text-cta-md` as colours and drop a neighbouring `text-white`. Register the theme's sizes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "eyebrow",
        "body-xl",
        "body-lg",
        "body-md",
        "body-sm",
        "body-xs",
        "body-2xs",
        "statement",
        "cta-lg",
        "cta-md",
        "display",
        "h1",
        "h2",
        "h3",
        "h4",
        "lead",
        "body",
        "caption",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
