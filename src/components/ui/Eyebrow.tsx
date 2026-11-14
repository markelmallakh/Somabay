import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  /**
   * `light` turquoise for white and sand surfaces; `dark` bright sun yellow for photos and deep
   * sections. Inside a `data-theme-surface="dark"` section it turns dark on its own.
   */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Section eyebrow: small caps with no background — turquoise on light surfaces, bright sun yellow
 * over photos and dark sections. The ink comes from the tone, so a stray text colour in
 * `className` cannot override it.
 */
export function Eyebrow({ children, as: Tag = "p", id, tone, className }: EyebrowProps) {
  return (
    <Tag
      id={id}
      data-tone={tone}
      className={cn("eyebrow eyebrow-tag", className, "text-(--eyebrow-ink)")}
    >
      {children}
    </Tag>
  );
}
