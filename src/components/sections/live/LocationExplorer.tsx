"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { MapPlace } from "@/types/content";
import { PlacesMap } from "@/components/map/PlacesMap";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Destination = MapPlace & { distance: string };

type LocationExplorerProps = {
  origin: MapPlace;
  destinations: Destination[];
};

/** Map with a destination list; choosing a destination draws a route from the neighborhood. */
export function LocationExplorer({ origin, destinations }: LocationExplorerProps) {
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
        className="aspect-[4/5] rounded-card sm:aspect-[2/1] lg:rounded-media"
      />
      <div className="relative z-10 mx-4 -mt-12 rounded-card bg-white p-4 shadow-[0_12px_40px_rgb(18_58_70/0.12)] sm:mx-8 lg:absolute lg:top-8 lg:right-8 lg:mx-0 lg:mt-0 lg:w-80">
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
                  "flex w-full items-center gap-3 rounded-thumb px-3 py-3.5 text-left transition-colors duration-500",
                  selected === destination.id ? "bg-turquoise-5" : "hover:bg-sand-100",
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-turquoise-5 text-turquoise">
                  <Icon name="pin" className="size-4" />
                </span>
                <span>
                  <span className="block font-serif text-heading-6">{destination.name}</span>
                  <span className="mt-1 block text-body-xs font-semibold text-slate">
                    {destination.distance}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <Button href={mapsHref} external variant="outline" size="sm" className="mt-4 w-full">
          Open in maps
        </Button>
      </div>
    </div>
  );
}
