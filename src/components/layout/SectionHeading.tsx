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
        "flex flex-col gap-5",
        centered && "mx-auto max-w-3xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone === "light" ? "dark" : undefined}>{eyebrow}</Eyebrow> : null}
      <Heading id={id} className={size === "h1" ? "text-h1" : "text-h2"}>
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-xl text-lead",
            tone === "light" ? "text-white/80" : "text-slate",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </Reveal>
  );
}
