import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { filterChipClass } from "./filterChip";
import { Icon } from "./Icon";

type OptionTagProps = {
  id: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
};

/**
 * Selectable filter option in the site's one filter chip style (see filterChip): a rounded pill,
 * solid sun yellow with a check once chosen. A real checkbox underneath.
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
        className={filterChipClass(
          checked,
          "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turquoise",
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
