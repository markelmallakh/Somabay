import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const columnClasses = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  12: "grid-cols-4 md:grid-cols-12",
} as const;

type GridProps = {
  children: ReactNode;
  as?: ElementType;
  columns?: keyof typeof columnClasses;
  className?: string;
};

export function Grid({ children, as: Tag = "div", columns = 12, className }: GridProps) {
  return (
    <Tag className={cn("grid gap-x-4 gap-y-6 md:gap-x-6", columnClasses[columns], className)}>
      {children}
    </Tag>
  );
}
