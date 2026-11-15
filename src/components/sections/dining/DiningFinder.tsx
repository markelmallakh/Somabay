"use client";

import { ResultCount } from "@/components/ui/ResultCount";
import { useState } from "react";
import type { Venue } from "@/content/dining";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { Icon } from "@/components/ui/Icon";

type DiningFinderProps = {
  venues: Venue[];
  categories: readonly { value: string; label: string }[];
};

/**
 * Venue directory: rounded category toggles (each with its accent dot) and a pill search, over a
 * grid of rounded white cards. A card opens the shared detail drawer.
 */
export function DiningFinder({ venues, categories }: DiningFinderProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(null);

  const needle = query.trim().toLowerCase();
  const visible = venues.filter(
    (venue) =>
      (selected.length === 0 || selected.includes(venue.category)) &&
      (!needle ||
        `${venue.title} ${venue.chip ?? ""} ${venue.location ?? ""}`
          .toLowerCase()
          .includes(needle)),
  );

  const toggle = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );

  const pill =
    "inline-flex min-h-11 items-center rounded-md border px-4 text-body-sm transition-colors duration-500";

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={selected.length === 0}
            onClick={() => setSelected([])}
            className={cn(
              pill,
              selected.length === 0
                ? "border-turquoise/40 bg-turquoise-10 text-turquoise-160"
                : "border-line bg-white text-ink hover:border-turquoise/60",
            )}
          >
            All
          </button>
          {categories.map((category) => {
            const active = selected.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(category.value)}
                className={cn(
                  pill,
                  active
                    ? "border-turquoise/40 bg-turquoise-10 text-turquoise-160"
                    : "border-line bg-white text-ink hover:border-turquoise/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "grid overflow-hidden transition-[width,margin,opacity] duration-500 ease-out-expo",
                    active ? "mr-2 w-3.5 opacity-100" : "w-0 opacity-0",
                  )}
                >
                  <Icon name="check" className="size-3.5" />
                </span>
                {category.label}
              </button>
            );
          })}
        </div>
        <label className="flex min-h-11 items-center gap-3 rounded-md border border-line bg-white px-4 ring-1 ring-transparent transition-shadow focus-within:ring-ink lg:w-80">
          <Icon name="search" className="size-4.5 text-slate" />
          <span className="sr-only">Search restaurants</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-full bg-transparent outline-none placeholder:text-mist"
          />
        </label>
      </div>
      <ResultCount
        count={visible.length}
        label={visible.length === 1 ? "venue" : "venues"}
        className="mt-8"
      />
      <RevealGroup as="ul" className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((venue) => (
          <RevealItem as="li" key={venue.id}>
            {/* The Marina shop card: the photo fills it, the type as a badge, the name at the foot
                and the turquoise bar flooding up on hover; it opens the venue's drawer. */}
            <PhotoCard
              onClick={() => setOpen(venues.indexOf(venue))}
              image={venue.images[0]}
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              tag={venue.chip}
              title={venue.title}
              action="View details"
              className="aspect-[400/520]"
            />
          </RevealItem>
        ))}
      </RevealGroup>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-md bg-white p-10 text-center text-slate">
          No venues match your search.
        </p>
      ) : null}
      <DetailDrawer
        items={venues}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </>
  );
}
