"use client";

import { ResultCount } from "@/components/ui/ResultCount";
import { useState } from "react";
import type { Unit } from "@/content/resale";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { FilterPanel, type FilterState, matchesFilters } from "@/components/ui/FilterPanel";
import { UnitCard } from "./UnitCard";

type UnitsFinderProps = {
  units: Unit[];
  hrefs: Record<string, string>;
  neighborhoods: string[];
};

const bedroomOptions = [
  { value: "1", label: "1 BR" },
  { value: "2", label: "2 BR or above" },
  { value: "3", label: "3 BR or above" },
  { value: "4", label: "4 BR or above" },
];

export function UnitsFinder({ units, hrefs, neighborhoods }: UnitsFinderProps) {
  const [filters, setFilters] = useState<FilterState>({});
  const groups = [
    {
      id: "neighborhood",
      label: "Neighborhood",
      options: neighborhoods.map((name) => ({ value: name, label: name })),
    },
    { id: "bedrooms", label: "Bedrooms", options: bedroomOptions },
  ];
  const visible = units.filter((unit) =>
    matchesFilters(
      {
        neighborhood: [unit.neighborhood],
        // "N or above" thresholds the unit satisfies; 1 BR only matches one-bedroom units.
        bedrooms: bedroomOptions
          .map((option) => option.value)
          .filter((value) =>
            value === "1" ? unit.bedrooms === 1 : unit.bedrooms >= Number(value),
          ),
      },
      filters,
    ),
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem_1fr]">
      <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
        <FilterPanel groups={groups} value={filters} onChange={setFilters} className="border-0" />
      </div>
      <div>
        <ResultCount
          count={visible.length}
          label={`${visible.length === 1 ? "unit" : "units"} available`}
          className="mb-6"
        />
        <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2">
          {visible.map((unit) => (
            <RevealItem as="li" key={unit.slug}>
              <UnitCard unit={unit} href={hrefs[unit.slug]} />
            </RevealItem>
          ))}
        </RevealGroup>
        {visible.length === 0 ? (
          <p className="rounded-card bg-white p-10 text-center text-slate">
            No units match these filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
