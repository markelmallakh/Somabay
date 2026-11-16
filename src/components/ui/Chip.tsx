import type { ReactNode } from "react";
import type { Accent } from "@/lib/accents";
import { cn } from "@/lib/utils";

type ChipProps = {
  children: ReactNode;
  /** Secondary-palette accent; inferred from the label text when omitted. */
  accent?: Accent;
  /** `light` on photos and dark surfaces (frosted white); `soft` and `plain` use the pale tint. */
  tone?: "light" | "soft" | "plain";
  className?: string;
};

/**
 * Small tag (category, star rating, location), kept quiet and editorial: a small uppercase,
 * letter-spaced label in a hairline outline, in one neutral ink whatever its subject. On photos
 * and dark surfaces (`light`) it sits on frosted white instead. `accent` is accepted for older
 * call sites but no longer colours the chip; the palette stays calm.
 */
export function Chip({ children, tone = "soft", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-[0.3125rem] text-[0.6875rem] leading-none font-semibold tracking-[0.12em] whitespace-nowrap uppercase",
        tone === "light"
          ? "bg-white/90 text-ink backdrop-blur-sm"
          : "border border-ink/15 text-ink/75",
        className,
      )}
    >
      {children}
    </span>
  );
}
