"use client";

import { type KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";

export type TabOption<T extends string> = { id: T; label: string };

type TabsProps<T extends string> = {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  /** Prefix for the ids of the panels each tab controls. */
  panelId: string;
  className?: string;
};

/** WAI-ARIA tablist with roving focus (arrow keys, Home/End). */
export function Tabs<T extends string>({
  options,
  value,
  onChange,
  label,
  panelId,
  className,
}: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = options.findIndex((option) => option.id === value);
    const last = options.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (current + 1) % options.length
        : event.key === "ArrowLeft"
          ? (current - 1 + options.length) % options.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    onChange(options[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn("flex gap-2", className)}
      onKeyDown={onKeyDown}
    >
      {options.map((option, index) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${option.id}`}
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(option.id)}
            className={cn(
              "min-h-11 border px-6 text-[0.8125rem] tracking-wide transition-colors duration-500",
              selected
                ? "border-ink bg-ink text-sand-50"
                : "border-ink/30 text-ink hover:border-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
