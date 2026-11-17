import { cn } from "@/lib/utils";

/**
 * The one filter chip used across the site (dining, resale and events filters, neighborhood
 * status): a fully rounded pill. At rest a white pill with a hairline; on hover a light sun yellow;
 * once chosen solid sun yellow with dark text (and, where the chip shows one, a check).
 */
export function filterChipClass(checked: boolean, className?: string) {
  return cn(
    // Phones: a compact 32px pill with a smaller label; the full size from `sm` up.
    "inline-flex min-h-8 items-center rounded-full border px-3 text-xs leading-none font-medium transition-[background-color,border-color,color] duration-500 ease-out-expo sm:min-h-10 sm:px-4.5 sm:text-[0.8125rem]",
    checked
      ? "border-sun bg-sun text-ink"
      : // A solid light yellow (not a see-through wash), so the label stays readable when the
        // chip floats over photos.
        "border-line bg-white text-ink hover:border-sun hover:bg-[color-mix(in_srgb,var(--color-sun)_22%,white)]",
    className,
  );
}
