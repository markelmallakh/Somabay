"use client";

import { ResultCount } from "@/components/ui/ResultCount";
import { useState } from "react";
import type { Venue } from "@/content/dining";
import { cn } from "@/lib/utils";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Chip } from "@/components/ui/Chip";
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
      <RevealGroup as="ul" className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {visible.map((venue) => (
          <RevealItem as="li" key={venue.id}>
            <article className="group flex h-full flex-col overflow-hidden rounded-md bg-white transition-shadow duration-500 hover:shadow-card">
              <MediaSlider
                images={venue.images}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                label={`${venue.title} photos`}
                controls="sm"
                className="aspect-[412/300]"
              />
              <div className="flex flex-1 items-end justify-between gap-4 p-5 md:p-6">
                <div className="flex flex-col items-start gap-3">
                  {venue.chip ? <Chip>{venue.chip}</Chip> : null}
                  <h3 className="font-serif text-heading-5">{venue.title}</h3>
                  {venue.location ? (
                    <p className="flex items-center gap-2 text-body-sm text-slate">
                      <Icon name="pin" className="size-4" />
                      {venue.location}
                    </p>
                  ) : null}
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(venues.indexOf(venue))}
                  className="wave grid size-11 shrink-0 place-items-center rounded-md border border-ink/15 transition-colors duration-500 hover:border-turquoise hover:text-white"
                  aria-label={`View ${venue.title} details`}
                >
                  <Icon name="arrow-right" className="size-4" />
                </button>
              </div>
            </article>
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
