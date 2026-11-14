"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { OptionTag } from "./OptionTag";
import { TextAction } from "./TextAction";

export type FilterGroup = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

export type FilterState = Record<string, string[]>;

type FilterPanelProps = {
  groups: FilterGroup[];
  value: FilterState;
  onChange: (value: FilterState) => void;
  className?: string;
};

/**
 * Filter groups as selectable tags, divided by wave hairlines, with a small-caps Clear all.
 * Empty groups mean "no restriction".
 */
export function FilterPanel({ groups, value, onChange, className }: FilterPanelProps) {
  const baseId = useId();
  const active = Object.values(value).some((selected) => selected.length > 0);

  const toggle = (group: string, option: string) => {
    const selected = value[group] ?? [];
    onChange({
      ...value,
      [group]: selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option],
    });
  };

  return (
    <div className={cn("rounded-md bg-white p-6", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-serif text-heading-6">Filters</p>
        <TextAction onClick={() => onChange({})} disabled={!active}>
          Clear all
        </TextAction>
      </div>
      {groups.map((group) => (
        <fieldset key={group.id} className="mt-5">
          <span aria-hidden className="wave-line mb-5 text-turquoise/35" />
          <legend className="sr-only">{group.label}</legend>
          <p aria-hidden className="eyebrow mb-3 text-label text-slate">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.options.map((option) => (
              <OptionTag
                key={option.value}
                id={`${baseId}-${group.id}-${option.value}`}
                checked={(value[group.id] ?? []).includes(option.value)}
                onChange={() => toggle(group.id, option.value)}
              >
                {option.label}
              </OptionTag>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

/** True when an item's values satisfy every non-empty filter group (OR within a group). */
export function matchesFilters(
  itemValues: Record<string, string[]>,
  filters: FilterState,
): boolean {
  return Object.entries(filters).every(
    ([group, selected]) =>
      selected.length === 0 ||
      selected.some((option) => (itemValues[group] ?? []).includes(option)),
  );
}
