import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  /** `site` is the standard 1440px column; `wide` lets content reach the viewport edges on large screens. */
  size?: "site" | "wide" | "prose";
  className?: string;
};

const sizes = {
  site: "max-w-site",
  wide: "max-w-[120rem]",
  prose: "max-w-prose",
} as const;

export function Container({ children, as: Tag = "div", size = "site", className }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full px-gutter", sizes[size], className)}>{children}</Tag>;
}
