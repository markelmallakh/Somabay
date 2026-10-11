import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "sand" | "white" | "stone" | "abyss";

const tones: Record<SectionTone, string> = {
  sand: "bg-sand-50 text-ink",
  white: "bg-white text-ink",
  stone: "bg-sand-200 text-ink",
  abyss: "bg-abyss text-white",
};

type SectionProps = Omit<ComponentPropsWithoutRef<"section">, "children"> & {
  children: ReactNode;
  tone?: SectionTone;
  /** Vertical rhythm: `default` uses the fluid section token, `none` lets the content decide. */
  spacing?: "default" | "compact" | "none";
};

const spacings = {
  default: "py-section",
  compact: "py-[calc(var(--spacing-section)*0.6)]",
  none: "",
} as const;

export function Section({
  children,
  tone = "sand",
  spacing = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-theme-surface={tone === "abyss" ? "dark" : "light"}
      className={cn("relative", tones[tone], spacings[spacing], className)}
      {...props}
    >
      {children}
    </section>
  );
}
