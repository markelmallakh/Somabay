import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const gaps = {
  xs: "gap-2",
  sm: "gap-4",
  md: "gap-6",
  lg: "gap-10",
  xl: "gap-16",
} as const;

type StackProps = {
  children: ReactNode;
  as?: ElementType;
  gap?: keyof typeof gaps;
  align?: "start" | "center" | "end";
  className?: string;
};

const aligns = { start: "items-start", center: "items-center text-center", end: "items-end" };

export function Stack({ children, as: Tag = "div", gap = "md", align, className }: StackProps) {
  return (
    <Tag className={cn("flex flex-col", gaps[gap], align && aligns[align], className)}>
      {children}
    </Tag>
  );
}
