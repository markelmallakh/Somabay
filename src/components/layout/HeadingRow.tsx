import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeadingRowProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Shown under the description on the right (a button or link). Hidden on phones: render the
   * same element in `PhoneEndCta` at the end of the section.
   */
  aside?: ReactNode;
  as?: "h1" | "h2" | "h3";
  /** `light` on dark or photo sections. */
  tone?: "default" | "light";
  /** `bottom` (default) sets the last lines level; `top` lines the title up with the description's top. */
  align?: "bottom" | "top";
  className?: string;
};

/**
 * The one section heading row for the whole site: eyebrow and serif title on the left (seven of
 * twelve columns), the description on the right starting on the same grid line in every section
 * (column nine), its last line sitting level with the title's last line. Stacked on mobile.
 */
export function HeadingRow({
  id,
  eyebrow,
  title,
  description,
  aside,
  as: Heading = "h2",
  tone = "default",
  align = "bottom",
  className,
}: HeadingRowProps) {
  return (
    <div
      className={cn(
        // Phones: centred, like the rest of the layout.
        "grid gap-3 text-center sm:gap-6 sm:text-left lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0",
        align === "top" ? "lg:items-start" : "lg:items-end",
        className,
      )}
    >
      <Reveal className="flex flex-col items-center gap-2.5 sm:items-start lg:col-span-7 lg:gap-3">
        {eyebrow ? <Eyebrow tone={tone === "light" ? "dark" : undefined}>{eyebrow}</Eyebrow> : null}
        <Heading id={id} className="text-heading-2 text-balance">
          {title}
        </Heading>
      </Reveal>
      {description || aside ? (
        <Reveal
          delay={0.1}
          className={cn(
            "flex flex-col items-center gap-5 sm:items-start sm:gap-6 lg:col-span-4 lg:col-start-9",
            align === "top" ? "lg:pt-0.5" : "lg:pb-1.5",
          )}
        >
          {description ? (
            <p className={cn("text-body-md", tone === "light" ? "text-white/80" : "text-slate")}>
              {description}
            </p>
          ) : null}
          {/* Phones: the call to action moves to the end of the section (PhoneEndCta). */}
          {aside ? <div className="hidden sm:contents">{aside}</div> : null}
        </Reveal>
      ) : null}
    </div>
  );
}

/**
 * Phones only: a section's call to action, centred at the end of the section after its content
 * (the heading row's `aside` hides on phones). Pass the same element as the aside.
 */
export function PhoneEndCta({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mt-8 flex justify-center sm:hidden", className)}>{children}</div>;
}
