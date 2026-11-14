import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type OptionTagProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
};

/**
 * Selectable filter option drawn as a tag (4px corners, like the content tags): outlined at rest,
 * pale turquoise with deep-teal text and a check once chosen. A real checkbox underneath.
 */
export function OptionTag({ id, checked, onChange, children }: OptionTagProps) {
  return (
    <label htmlFor={id} className="cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={cn(
          "inline-flex items-center rounded-md border px-3 py-2 text-[0.8125rem] leading-none transition-colors duration-500 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise",
          checked
            ? "border-turquoise/40 bg-turquoise-10 text-turquoise-160"
            : "border-line text-ink hover:border-turquoise/60",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "grid overflow-hidden transition-[width,margin,opacity] duration-500 ease-out-expo",
            checked ? "mr-1.5 w-3.5 opacity-100" : "w-0 opacity-0",
          )}
        >
          <Icon name="check" className="size-3.5" />
        </span>
        {children}
      </span>
    </label>
  );
}
