"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { EventItem } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { EventCard } from "@/components/cards/EventCard";
import { FilterDropdown } from "@/components/ui/FilterDropdown";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { EventsCalendar } from "./EventsCalendar";

type EventsExplorerProps = {
  events: EventItem[];
  hrefs: Record<string, string>;
  categories: readonly { value: string; label: string }[];
  initialMonth: string;
  today: string;
};

export function EventsExplorer({
  events,
  hrefs,
  categories,
  initialMonth,
  today,
}: EventsExplorerProps) {
  const [mode, setMode] = useState<"grid" | "calendar">("grid");
  const [selected, setSelected] = useState<string[]>([]);
  const visible = events.filter(
    (event) => selected.length === 0 || selected.includes(event.category),
  );
  const featured = visible.find((event) => event.featured);
  const rest = visible.filter((event) => event !== featured);
  const labels = Object.fromEntries(categories.map((category) => [category.value, category.label]));

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterDropdown options={categories} value={selected} onChange={setSelected} />
        <SegmentedControl
          label="View events as"
          value={mode}
          onChange={setMode}
          options={[
            { id: "grid", label: "Grid", icon: "grid" },
            { id: "calendar", label: "Calendar", icon: "calendar" },
          ]}
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={mode}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-8 md:mt-10"
        >
          {mode === "grid" ? (
            <>
              {featured ? (
                <div className="mb-12 md:mb-16">
                  <EventCard event={featured} featured />
                </div>
              ) : null}
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((event) => (
                  <li key={event.slug}>
                    <EventCard event={event} />
                  </li>
                ))}
              </ul>
              {visible.length === 0 ? (
                <p className="rounded-md bg-sand-100 p-10 text-center text-slate">
                  No events in these categories yet.
                </p>
              ) : null}
            </>
          ) : (
            <EventsCalendar
              events={visible}
              hrefs={hrefs}
              categoryLabels={labels}
              initialMonth={initialMonth}
              today={today}
            />
          )}
        </m.div>
      </AnimatePresence>
    </>
  );
}
