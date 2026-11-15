"use client";

import { m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Unit } from "@/content/resale";
import { easeOutExpo } from "@/components/animations/easing";
import { ResultCount } from "@/components/ui/ResultCount";
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

/** Units shown at first, and added each time the visitor nears the end of the list. */
const BATCH = 4;

export function UnitsFinder({ units, hrefs, neighborhoods }: UnitsFinderProps) {
  const [filters, setFiltersState] = useState<FilterState>({});
  // Lazy loading: the list grows a batch at a time as its end comes near.
  const [shownCount, setShownCount] = useState(BATCH);
  const sentinel = useRef<HTMLDivElement>(null);
  // A new filter starts the list again from its first batch.
  const setFilters = (next: FilterState) => {
    setFiltersState(next);
    setShownCount(BATCH);
  };
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

  const shown = visible.slice(0, shownCount);
  const more = shown.length < visible.length;

  // Load the next batch as the end of the list comes within a quarter screen of view.
  useEffect(() => {
    const element = sentinel.current;
    if (!element || !more) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShownCount((count) => count + BATCH);
      },
      { rootMargin: "0px 0px 25% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [more, shownCount]);

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
        {/* Each card rises in on its own, just before it reaches the screen. */}
        <ul className="grid gap-5 sm:grid-cols-2">
          {shown.map((unit, index) => (
            <m.li
              key={unit.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 15% 0px" }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: (index % 2) * 0.08 }}
            >
              <UnitCard unit={unit} href={hrefs[unit.slug]} />
            </m.li>
          ))}
          {/* Placeholders for the next batch while it loads. */}
          {more
            ? Array.from({ length: Math.min(2, visible.length - shown.length) }, (_, index) => (
                <li
                  key={`placeholder-${index}`}
                  aria-hidden
                  className="h-[28rem] animate-pulse rounded-md bg-sand-200/70"
                />
              ))
            : null}
        </ul>
        <div ref={sentinel} aria-hidden />
        {visible.length === 0 ? (
          <p className="rounded-md bg-white p-10 text-center text-slate">
            No units match these filters.
          </p>
        ) : null}
      </div>
    </div>
  );
}
