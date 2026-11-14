import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeadingRowProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Shown under the description on the right (a button, arrows or filters). */
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
        "grid gap-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0",
        align === "top" ? "lg:items-start" : "lg:items-end",
        className,
      )}
    >
      <Reveal className="flex flex-col gap-4 lg:col-span-7">
        {eyebrow ? <Eyebrow tone={tone === "light" ? "dark" : undefined}>{eyebrow}</Eyebrow> : null}
        <Heading id={id} className="text-heading-2 text-balance">
          {title}
        </Heading>
      </Reveal>
      {description || aside ? (
        <Reveal
          delay={0.1}
          className={cn(
            "flex flex-col gap-6 lg:col-span-4 lg:col-start-9",
            align === "top" ? "lg:pt-0.5" : "lg:pb-1.5",
          )}
        >
          {description ? (
            <p className={cn("text-body-md", tone === "light" ? "text-white/80" : "text-slate")}>
              {description}
            </p>
          ) : null}
          {aside}
        </Reveal>
      ) : null}
    </div>
  );
}
