import { cn } from "@/lib/utils";

/**
 * The one filter chip used across the site (dining, resale and events filters, neighborhood
 * status): a fully rounded pill. At rest a white pill with a hairline; on hover a warm sun wash;
 * once chosen solid sun yellow with dark text (and, where the chip shows one, a check).
 */
export function filterChipClass(checked: boolean, className?: string) {
  return cn(
    "inline-flex min-h-10 items-center rounded-full border px-4.5 text-[0.8125rem] leading-none font-medium transition-[background-color,border-color,color] duration-500 ease-out-expo",
    checked
      ? "border-sun bg-sun text-ink"
      : "border-line bg-white text-ink hover:border-sun hover:bg-sun/15",
    className,
  );
}
