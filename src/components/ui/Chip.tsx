import type { ReactNode } from "react";
import { type Accent, accentClasses, accentFor } from "@/lib/accents";
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
 * Small tag (category, star rating, location): 4px corners like the buttons, a pale tint of its
 * secondary colour behind text in a deep shade of the same colour.
 */
export function Chip({ children, accent, tone = "soft", className }: ChipProps) {
  const tint = accent ?? accentFor(typeof children === "string" ? children : undefined);
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1.5 text-body-xs leading-none font-medium whitespace-nowrap",
        accentClasses[tint].ink,
        tone === "light" ? "bg-white/90 backdrop-blur-sm" : accentClasses[tint].tint,
        className,
      )}
    >
      {children}
    </span>
  );
}
