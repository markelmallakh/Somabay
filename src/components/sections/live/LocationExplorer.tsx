"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MapPlace } from "@/types/content";
import { PlacesMap } from "@/components/map/PlacesMap";
import { GoogleMapsButton } from "@/components/ui/GoogleMapsButton";

type Destination = MapPlace & { distance: string };

type LocationExplorerProps = {
  /** Fit the places closely, leaving room for the list panel (see PlacesMap). */
  fitTight?: boolean;
  origin: MapPlace;
  destinations: Destination[];
};

/** A landmark flag in orange marks each destination. */
function Flag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M5.5 21.5V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.2 3.8h11.6l-2.4 4.1 2.4 4.1H6.2Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Map with its destinations; choosing one draws a route from the hotel or neighborhood. Phones: the
 * destinations are a compact row of tabs over the top of the map (icon over a small label and the
 * distance, hairlines between, swipeable when they don't fit) and Google Maps sits under the map.
 * Larger screens: a list card beside (or under) the map.
 */
export function LocationExplorer({ origin, destinations, fitTight }: LocationExplorerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${origin.lat},${origin.lng}`;

  const toggle = (id: string) => setSelected((current) => (current === id ? null : id));

  return (
    <div className="relative">
      <PlacesMap
        places={destinations}
        origin={origin}
        selectedId={selected}
        onSelect={(id) => setSelected((current) => (current === id ? null : id))}
        label={`Map of ${origin.name} and nearby destinations`}
        // Phones: a tall 4:5 frame (the tabs sit over its top).
        className="aspect-[4/5] rounded-md sm:aspect-[2/1]"
        fitTight={fitTight}
        insetRight={fitTight ? 352 : 0}
        phoneInsetTop={80}
      />
      {/* Phones: tabs over the top of the map (its zoom buttons sit bottom-left). */}
      <div className="absolute inset-x-2 top-2 z-[1000] md:hidden">
        <ul className="scrollbar-none flex divide-x divide-line overflow-x-auto rounded-md bg-white/95 shadow-float backdrop-blur-sm">
          {destinations.map((destination) => {
            const on = selected === destination.id;
            return (
              <li key={destination.id} className="min-w-[30%] flex-1 shrink-0">
                <button
                  type="button"
                  onClick={() => toggle(destination.id)}
                  aria-pressed={on}
                  className={cn(
                    "flex h-full w-full flex-col items-center gap-1 px-2 py-2.5 text-center transition-colors duration-500",
                    on ? "bg-turquoise-5 text-turquoise-160" : "text-ink",
                  )}
                >
                  <Flag className="size-4 text-deep-orange" />
                  <span className="line-clamp-2 text-[0.6875rem] leading-tight font-semibold">
                    {destination.name}
                  </span>
                  <span className="text-[0.625rem] leading-none text-slate">
                    {destination.distance}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-4 flex justify-center md:hidden">
        <GoogleMapsButton href={mapsHref} tone="light" />
      </div>

      {/* Tablets and desktop: the list card. */}
      <div className="relative z-10 mx-4 -mt-12 hidden rounded-md bg-white p-4 shadow-card sm:mx-8 md:block lg:absolute lg:top-1/2 lg:right-8 lg:mx-0 lg:mt-0 lg:w-80 lg:-translate-y-1/2">
        <ul className="flex flex-col gap-1">
          {destinations.map((destination) => (
            <li key={destination.id}>
              <button
                type="button"
                onClick={() => toggle(destination.id)}
                aria-pressed={selected === destination.id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-3.5 text-left transition-colors duration-500",
                  selected === destination.id ? "bg-turquoise-5" : "hover:bg-sand-100",
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center text-deep-orange">
                  <Flag className="size-5" />
                </span>
                <span>
                  <span className="block font-serif text-[1.125rem] leading-tight">
                    {destination.name}
                  </span>
                  <span className="mt-1 block text-body-xs font-semibold text-slate">
                    {destination.distance}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <GoogleMapsButton href={mapsHref} tone="light" className="mt-4 ml-3" />
      </div>
    </div>
  );
}
