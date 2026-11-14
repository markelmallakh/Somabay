"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { accentClasses, accentFor } from "@/lib/accents";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { easeOutExpo } from "@/components/animations/easing";

type EventsCalendarProps = {
  events: EventItem[];
  hrefs: Record<string, string>;
  categoryLabels: Record<string, string>;
  /** "YYYY-MM" to open on. */
  initialMonth: string;
  /** "YYYY-MM-DD" highlighted as today. */
  today: string;
};

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });

const iso = (date: Date) => date.toISOString().slice(0, 10);

/** Month grid with event bars; selecting an event opens a preview card. */
export function EventsCalendar({
  events,
  hrefs,
  categoryLabels,
  initialMonth,
  today,
}: EventsCalendarProps) {
  const [year, month] = initialMonth.split("-").map(Number);
  const [cursor, setCursor] = useState(() => new Date(Date.UTC(year, month - 1, 1)));
  const [selected, setSelected] = useState<EventItem | null>(null);

  const first = new Date(cursor);
  const gridStart = new Date(first);
  gridStart.setUTCDate(1 - first.getUTCDay());
  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setUTCDate(gridStart.getUTCDate() + index);
    return date;
  });
  const visibleDays = days[35].getUTCMonth() === cursor.getUTCMonth() ? days : days.slice(0, 35);

  const eventsOn = (day: string) =>
    events.filter((event) => event.start <= day && (event.end ?? event.start) >= day);
  const shift = (step: number) => {
    setSelected(null);
    setCursor(
      (current) => new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + step, 1)),
    );
  };

  return (
    <div className="relative rounded-md bg-turquoise-5 p-3 sm:p-5 md:p-8">
      <div className="flex items-center justify-between px-1 sm:px-0">
        <p className="font-serif text-heading-5" aria-live="polite">
          {monthName.format(cursor)} <span className="text-slate">{cursor.getUTCFullYear()}</span>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            className="wave grid size-10 place-items-center rounded-md bg-white text-ink shadow-[0_4px_16px_rgb(18_58_70/0.08)] transition-colors duration-500 hover:text-white"
            aria-label="Previous month"
          >
            <Icon name="chevron-left" className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            className="wave grid size-10 place-items-center rounded-md bg-white text-ink shadow-[0_4px_16px_rgb(18_58_70/0.08)] transition-colors duration-500 hover:text-white"
            aria-label="Next month"
          >
            <Icon name="chevron-right" className="size-4" />
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-body-sm text-slate">
        {weekdays.map((day) => (
          <p key={day} className="py-2">
            <abbr title={day} className="no-underline">
              {day}
            </abbr>
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md bg-line ring-1 ring-line">
        {visibleDays.map((date) => {
          const day = iso(date);
          const inMonth = date.getUTCMonth() === cursor.getUTCMonth();
          const dayEvents = eventsOn(day);
          return (
            <div
              key={day}
              className={cn(
                "min-h-20 bg-white p-1 sm:p-1.5 md:min-h-28 md:p-2",
                !inMonth && "bg-sand-100 text-mist",
              )}
            >
              <p
                className={cn(
                  "mx-auto grid size-7 place-items-center rounded-full text-body-sm",
                  day === today && "bg-turquoise text-white",
                )}
              >
                {date.getUTCDate()}
              </p>
              <ul className="mt-1 flex flex-col gap-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <li key={event.slug}>
                    <button
                      type="button"
                      onClick={() => setSelected(event)}
                      className={cn(
                        "flex w-full items-center gap-1 rounded-full bg-turquoise-10 px-1.5 py-0.5 text-left text-body-2xs leading-tight text-ink transition-colors duration-300 hover:bg-turquoise-20 md:text-label",
                        selected?.slug === event.slug && "bg-turquoise-20",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "hidden size-1.5 shrink-0 rounded-full sm:block",
                          accentClasses[accentFor(categoryLabels[event.category])].dot,
                        )}
                      />
                      <span className="truncate">{event.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected ? (
          <m.div
            key={selected.slug}
            role="dialog"
            aria-label={selected.title}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="absolute inset-x-3 bottom-3 z-10 overflow-hidden rounded-md bg-white shadow-[0_24px_60px_rgb(18_58_70/0.2)] sm:inset-x-5 sm:bottom-5 md:inset-x-auto md:right-8 md:bottom-8 md:w-[24rem]"
          >
            <div className="relative aspect-[416/240]">
              <ResponsiveImage asset={selected.image} sizes="24rem" fill />
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="wave absolute top-3 right-3 grid size-10 place-items-center rounded-md bg-white/95 text-ink backdrop-blur-sm transition-colors duration-500 hover:text-white"
                aria-label="Close preview"
              >
                <Icon name="close" className="size-4.5" />
              </button>
            </div>
            <div className="flex flex-col gap-3 p-6">
              <Chip>{categoryLabels[selected.category]}</Chip>
              <p className="font-serif text-heading-6">{selected.title}</p>
              <p className="flex items-center gap-2 text-body-sm text-slate">
                <Icon name="pin" className="size-4" />
                {selected.location}
              </p>
              <Link
                href={hrefs[selected.slug]}
                className="mt-1 inline-flex items-center gap-2 text-body-xs font-semibold tracking-label uppercase hover:text-lagoon"
              >
                View event <Icon name="chevron-right" className="size-3.5" />
              </Link>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
