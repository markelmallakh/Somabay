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

/** Map with a destination list; choosing a destination draws a route from the neighborhood. */
export function LocationExplorer({ origin, destinations, fitTight }: LocationExplorerProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${origin.lat},${origin.lng}`;

  return (
    <div className="relative">
      <PlacesMap
        places={destinations}
        origin={origin}
        selectedId={selected}
        onSelect={(id) => setSelected((current) => (current === id ? null : id))}
        label={`Map of ${origin.name} and nearby destinations`}
        className="aspect-[4/5] rounded-md sm:aspect-[2/1]"
        fitTight={fitTight}
        insetRight={fitTight ? 352 : 0}
      />
      <div className="relative z-10 mx-4 -mt-12 rounded-md bg-white p-4 shadow-card sm:mx-8 lg:absolute lg:top-1/2 lg:right-8 lg:mx-0 lg:mt-0 lg:w-80 lg:-translate-y-1/2">
        <ul className="flex flex-col gap-1">
          {destinations.map((destination) => (
            <li key={destination.id}>
              <button
                type="button"
                onClick={() =>
                  setSelected((current) => (current === destination.id ? null : destination.id))
                }
                aria-pressed={selected === destination.id}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-3.5 text-left transition-colors duration-500",
                  selected === destination.id ? "bg-turquoise-5" : "hover:bg-sand-100",
                )}
              >
                {/* A landmark flag in orange marks each destination. */}
                <span className="grid size-8 shrink-0 place-items-center text-deep-orange">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-5">
                    <path
                      d="M5.5 21.5V3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                    <path d="M6.2 3.8h11.6l-2.4 4.1 2.4 4.1H6.2Z" fill="currentColor" />
                  </svg>
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
