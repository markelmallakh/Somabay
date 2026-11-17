"use client";

import { useState } from "react";
import { venues, type Venue } from "@/content/dining";
import type { ImageAsset } from "@/types/media";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

type Place = { id: string; name: string; tag: string };

/**
 * Homepage dining rows. Each row opens the venue's side drawer (the same one used on the
 * dining page), and the drawer's arrows step through just these places.
 */
export function DiningList({ places, thumb }: { places: Place[]; thumb: ImageAsset }) {
  const [open, setOpen] = useState<number | null>(null);
  const items = places
    .map((place) => venues.find((venue) => venue.id === place.id))
    .filter((venue): venue is Venue => Boolean(venue));

  return (
    <>
      <RevealGroup as="ul" className="border-t border-line">
        {places.map((place) => {
          const venue = items.find((item) => item.id === place.id);
          if (!venue) return null;
          return (
            <RevealItem as="li" key={place.id}>
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpen(items.indexOf(venue))}
                className="group flex w-full items-center gap-4 border-b border-line py-2 pr-2 text-left transition-colors duration-500 hover:bg-sand-100 focus-visible:bg-sand-100"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-md sm:size-16">
                  {/* The venue's own photo (the first in its drawer); the shared one as fallback. */}
                  <ResponsiveImage
                    asset={venue.images[0] ?? thumb}
                    sizes="64px"
                    fill
                    className="transition-transform duration-1000 ease-out-expo group-hover:scale-[1.05]"
                  />
                </span>
                {/* Phones: the name over its cuisine and place; side by side from `sm`. */}
                <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
                  <span className="font-sans text-heading-6 transition-transform duration-700 ease-out-expo group-hover:translate-x-1 sm:whitespace-nowrap">
                    {place.name}
                  </span>
                  <span className="flex items-center gap-2 text-body-sm text-slate sm:ml-auto sm:shrink-0">
                    <span>{place.tag}</span>
                    <span aria-hidden className="size-1 rounded-full bg-current opacity-50" />
                    <span>{venue.location}</span>
                  </span>
                </span>
              </button>
            </RevealItem>
          );
        })}
      </RevealGroup>
      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
