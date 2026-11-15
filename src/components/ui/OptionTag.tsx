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
 * Selectable filter option drawn as a soft chip (4px corners): a light fill at rest, a pale
 * turquoise wash on hover, and solid turquoise with white text and a check once chosen. A real checkbox underneath.
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
          "inline-flex items-center rounded-md px-3.5 py-2.5 text-[0.8125rem] leading-none transition-[background-color,color] duration-500 ease-out-expo peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise",
          checked
            ? "bg-turquoise text-white"
            : "bg-sand-100 text-ink hover:bg-turquoise-10 hover:text-turquoise-160",
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
