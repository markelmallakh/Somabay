"use client";

import { useState } from "react";
import type { HotelRoom } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { PRICE_PLACEHOLDER } from "@/lib/price";
import { FilterPanel, type FilterState, matchesFilters } from "@/components/ui/FilterPanel";
import { Icon, type IconName } from "@/components/ui/Icon";

const amenityIcons: Record<string, IconName> = {
  "Private Beach": "umbrella",
  "Wi-Fi": "wifi",
  "All-Inclusive": "utensils",
  Housekeeping: "sparkle",
  "Smart TV": "tv",
};

const groups = [
  {
    id: "type",
    label: "Type",
    options: [
      { value: "room", label: "Room" },
      { value: "suite", label: "Suite" },
    ],
  },
  {
    id: "view",
    label: "View",
    options: [
      { value: "marina", label: "Marina view" },
      { value: "sea", label: "Sea view" },
      { value: "pool", label: "Pool view" },
      { value: "golf", label: "Golf view" },
    ],
  },
];

/** Guest label and icon: one guest is Single, two are 2 Persons, three or more are Family. */
const occupancy = (guests: number): { label: string; icon: IconName } =>
  guests <= 1
    ? { label: "Single", icon: "user" }
    : guests === 2
      ? { label: "2 Persons", icon: "users" }
      : { label: "Family", icon: "family" };

export function RoomsFinder({ rooms, bookingHref }: { rooms: HotelRoom[]; bookingHref?: string }) {
  const [filters, setFilters] = useState<FilterState>({});
  const visible = rooms.filter((room) =>
    matchesFilters({ type: [room.type], view: [room.view] }, filters),
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-8">
      <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
        <FilterPanel
          groups={groups}
          value={filters}
          onChange={setFilters}
          className="rounded-md border-transparent"
        />
      </div>
      <ul className="flex flex-col gap-4 md:gap-5" aria-live="polite">
        {visible.map((room) => (
          <li key={room.name}>
            <article className="group grid overflow-hidden rounded-md bg-white sm:grid-cols-[1fr_17rem]">
              <div className="flex flex-col gap-5 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-serif text-heading-5">{room.name}</h3>
                  <Chip accent="twilight">
                    <Icon name={occupancy(room.guests).icon} className="size-3.5" />
                    {occupancy(room.guests).label}
                  </Chip>
                </div>
                <ul className="flex flex-wrap gap-x-6 gap-y-4">
                  {room.amenities.map((amenity) => (
                    <li
                      key={amenity}
                      className="flex flex-col items-center gap-1.5 text-center text-body-xs text-slate"
                    >
                      <Icon name={amenityIcons[amenity] ?? "check"} className="size-4.5 text-ink" />
                      {amenity}
                    </li>
                  ))}
                </ul>
                {bookingHref ? (
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Button
                      href={bookingHref}
                      external
                      variant="outline"
                      size="sm"
                      aria-label={`Book the ${room.name}`}
                      className="min-h-9 border-turquoise px-5 text-body-xs text-turquoise-160"
                    >
                      Book now
                    </Button>
                    <PriceFrom amount={room.priceFrom ?? PRICE_PLACEHOLDER} size="compact" />
                  </div>
                ) : null}
              </div>
              <div className="relative order-first aspect-[4/3] overflow-hidden sm:order-none sm:aspect-auto sm:min-h-56">
                <ResponsiveImage
                  asset={room.image}
                  sizes="(min-width: 640px) 17rem, 100vw"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
            </article>
          </li>
        ))}
        {visible.length === 0 ? (
          <li className="rounded-md bg-white p-10 text-center text-slate">
            No rooms match these filters.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
