"use client";

import { ResultCount } from "@/components/ui/ResultCount";
import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useMemo, useState } from "react";
import type { DirectoryItem, Hotel, MapPlace } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { PlacesMap } from "@/components/map/PlacesMap";
import { FilterPanel, type FilterState, matchesFilters } from "@/components/ui/FilterPanel";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { hotelPrice } from "@/lib/price";
import { HotelCard } from "./HotelCard";

type HotelFinderProps = {
  heading: ReactNode;
  hotels: Hotel[];
  hrefs: Record<string, string>;
  themeOptions: { value: string; label: string }[];
  places: MapPlace[];
  view: { lat: number; lng: number; zoom: number };
};

type View = "list" | "map";

export function HotelFinder({
  heading,
  hotels,
  hrefs,
  themeOptions,
  places,
  view,
}: HotelFinderProps) {
  const [mode, setMode] = useState<View>("list");
  const [filters, setFilters] = useState<FilterState>({});
  const [drawer, setDrawer] = useState<number | null>(null);

  const label = (theme: string) =>
    themeOptions.find((option) => option.value === theme)?.label ?? theme;
  const groups = [
    {
      id: "stars",
      label: "Stars",
      options: [...new Set(hotels.flatMap((hotel) => (hotel.stars ? [hotel.stars] : [])))]
        .sort()
        .map((stars) => ({ value: String(stars), label: `${stars} Stars` })),
    },
    { id: "theme", label: "Theme", options: themeOptions },
  ];

  const visible = useMemo(
    () =>
      hotels.filter((hotel) =>
        matchesFilters(
          { stars: hotel.stars ? [String(hotel.stars)] : [], theme: hotel.themes },
          filters,
        ),
      ),
    [hotels, filters],
  );

  const drawerItems: DirectoryItem[] = visible.map((hotel) => ({
    id: hotel.slug,
    title: hotel.name,
    badges: { stars: hotel.stars, tags: hotel.themes.map(label) },
    kicker: hotel.tagline,
    price: hotelPrice(hotel),
    description: hotel.description,
    images: hotel.gallery.slice(0, 5),
    action: { label: "Explore hotel", href: hrefs[hotel.slug] },
    secondaryAction: hotel.website
      ? { label: "Book now", href: hotel.website, external: true }
      : undefined,
  }));
  const visiblePlaces = places.filter((place) => visible.some((hotel) => hotel.slug === place.id));

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {heading}
        <SegmentedControl
          label="View hotels as"
          value={mode}
          onChange={setMode}
          options={[
            { id: "list", label: "List", icon: "list" },
            { id: "map", label: "Map", icon: "map" },
          ]}
        />
      </div>

      <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[20rem_1fr] lg:gap-8">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
          <FilterPanel
            groups={groups}
            value={filters}
            onChange={setFilters}
            className="border-transparent"
          />
        </div>
        <div>
          <ResultCount
            count={visible.length}
            label={visible.length === 1 ? "stay" : "stays"}
            className="mb-6"
          />
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={mode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
            >
              {mode === "list" ? (
                <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
                  {visible.map((hotel) => (
                    <li key={hotel.slug}>
                      <HotelCard
                        hotel={hotel}
                        href={hrefs[hotel.slug]}
                        themeLabels={hotel.themes.map(label)}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <PlacesMap
                  places={visiblePlaces}
                  view={view}
                  label="Map of Somabay hotels"
                  onSelect={(id) => setDrawer(drawerItems.findIndex((item) => item.id === id))}
                  className="aspect-[4/5] rounded-card md:aspect-[16/11] lg:rounded-media"
                />
              )}
              {visible.length === 0 ? (
                <p className="rounded-card bg-white p-10 text-center text-slate">
                  No stays match these filters. Try clearing a few.
                </p>
              ) : null}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
      <DetailDrawer
        items={drawerItems}
        index={drawer}
        onClose={() => setDrawer(null)}
        onNavigate={setDrawer}
      />
    </>
  );
}
