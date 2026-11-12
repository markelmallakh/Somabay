import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  as?: ElementType;
  id?: string;
  /**
   * `light` deep gold for white and sand surfaces; `dark` bright sun yellow for photos and deep
   * sections. Inside a `data-theme-surface="dark"` section it turns dark on its own.
   */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Section eyebrow: sun-yellow small caps with no background — bright sun over photos, a deeper gold
 * on light surfaces. The ink comes from the tone, so a stray text colour in `className` cannot
 * override it.
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
