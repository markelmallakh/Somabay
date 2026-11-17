import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/animations/Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Muted text colour for the eyebrow/description; defaults to the inherited colour. */
  tone?: "default" | "light";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  as: Heading = "h2",
  size = "h2",
  id,
  className,
  tone = "default",
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={cn(
        // Phones always centre; larger screens follow `align`.
        "flex flex-col items-center gap-3 text-center sm:gap-5",
        centered ? "mx-auto max-w-3xl" : "sm:items-start sm:text-left",
        className,
      )}
    >
      {/* The eyebrow sits close over its title (one unit), the description a step further. */}
      <div
        className={cn("flex flex-col items-center gap-2.5 lg:gap-3", !centered && "sm:items-start")}
      >
        {eyebrow ? <Eyebrow tone={tone === "light" ? "dark" : undefined}>{eyebrow}</Eyebrow> : null}
        <Heading id={id} className={size === "h1" ? "text-heading-1" : "text-heading-2"}>
          {title}
        </Heading>
      </div>
      {description ? (
        <p
          className={cn(
            "mx-auto max-w-xl text-lead",
            tone === "light" ? "text-white/80" : "text-slate",
            !centered && "sm:mx-0",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
