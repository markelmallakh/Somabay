import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Quiet text action ("Clear all", "Clear filter"): small caps that darken on
 * hover. Fades out when disabled.
 */
export function TextAction({
  className,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "eyebrow text-[0.6875rem] text-lagoon transition-[color,opacity] duration-500 hover:text-ink disabled:pointer-events-none disabled:opacity-0",
        className,
      )}
      {...props}
    />
  );
}
