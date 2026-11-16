"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { EventItem } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { EventCard } from "@/components/cards/EventCard";
import { cn } from "@/lib/utils";
import { filterChipClass } from "@/components/ui/filterChip";
import { Icon } from "@/components/ui/Icon";
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
  const [when, setWhen] = useState<"upcoming" | "past">("upcoming");
  const isPast = (event: EventItem) => (event.end ?? event.start) < today;
  const inCategory = events.filter(
    (event) => selected.length === 0 || selected.includes(event.category),
  );
  // The grid shows one timeline at a time; the calendar keeps every month.
  const visible =
    mode === "grid"
      ? inCategory.filter((event) => (when === "past" ? isPast(event) : !isPast(event)))
      : inCategory;
  const featured = when === "upcoming" ? visible.find((event) => event.featured) : undefined;
  const rest = visible.filter((event) => event !== featured);
  const labels = Object.fromEntries(categories.map((category) => [category.value, category.label]));

  return (
    <>
      {/* The Grid / Calendar switch leads, centred. */}
      <div className="flex justify-center">
        <SegmentedControl
          label="View events as"
          className="[&>button]:min-w-36 md:[&>button]:min-w-44"
          value={mode}
          onChange={setMode}
          options={[
            { id: "grid", label: "Grid", icon: "grid" },
            { id: "calendar", label: "Calendar", icon: "calendar" },
          ]}
        />
      </div>
      {/* Below it, one row: categories on the left, Upcoming / Past on the right (hidden for the
          calendar, which shows every month). */}
      <div className="mt-10 flex flex-col-reverse gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={selected.length === 0}
            onClick={() => setSelected([])}
            className={filterChipClass(selected.length === 0)}
          >
            All
          </button>
          {categories.map((category) => {
            const on = selected.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  setSelected((current) =>
                    on
                      ? current.filter((value) => value !== category.value)
                      : [...current, category.value],
                  )
                }
                className={filterChipClass(on)}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid overflow-hidden transition-[width,margin,opacity] duration-500 ease-out-expo",
                    on ? "mr-1.5 w-3.5 opacity-100" : "w-0 opacity-0",
                  )}
                >
                  <Icon name="check" className="size-3.5" />
                </span>
                {category.label}
              </button>
            );
          })}
        </div>
        <div
          role="tablist"
          aria-label="Which events"
          className={cn("flex gap-10", mode === "calendar" && "invisible")}
        >
          {(["upcoming", "past"] as const).map((option) => {
            const on = when === option;
            const disabled = mode === "calendar";
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={on}
                disabled={disabled}
                onClick={() => setWhen(option)}
                className={cn(
                  "group relative flex items-baseline pb-2 font-serif text-heading-5 transition-colors duration-500 disabled:opacity-40",
                  on ? "text-ink" : "text-slate hover:text-ink",
                )}
              >
                {option === "upcoming" ? "Upcoming events" : "Past events"}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 -bottom-px h-0.5 origin-left bg-turquoise transition-transform duration-700 ease-out-expo",
                    on
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-hover:bg-turquoise/40",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.div
          key={`${mode}-${when}`}
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
                <p className="rounded-md bg-white p-10 text-center text-slate">
                  {when === "past"
                    ? "No past events in these categories."
                    : "No upcoming events in these categories yet."}
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
