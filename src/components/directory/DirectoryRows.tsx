"use client";

import { useState } from "react";
import type { DirectoryItem } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { DetailDrawer } from "./DetailDrawer";

type DirectoryRowsProps = {
  items: DirectoryItem[];
  /** Rows open the detail drawer; set false for a plain list. */
  interactive?: boolean;
};

/** Image + text rows (Marina shops, neighborhood amenities); interactive rows open a drawer. */
export function DirectoryRows({ items, interactive = true }: DirectoryRowsProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <RevealGroup as="ul" className="flex flex-col divide-y divide-line border-y border-line">
        {items.map((item, index) => {
          const content = (
            <>
              <span className="relative aspect-[224/154] w-28 shrink-0 overflow-hidden rounded-thumb bg-sand-200 sm:w-48 sm:rounded-card">
                <ResponsiveImage
                  asset={item.images[0]}
                  sizes="12rem"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.06]"
                />
              </span>
              <span className="flex-1">
                <span className="block font-serif text-h4 transition-colors group-hover:text-lagoon sm:text-h3">
                  {item.title}
                </span>
                {item.description ? (
                  <span className="mt-2 line-clamp-2 block text-slate">{item.description}</span>
                ) : null}
              </span>
              {interactive ? (
                <span
                  aria-hidden
                  className="wave wave-group hidden size-12 shrink-0 place-items-center rounded-md border border-ink/20 transition-colors duration-500 group-hover:border-turquoise group-hover:text-white sm:grid"
                >
                  <Icon name="arrow-right" className="size-4.5" />
                </span>
              ) : null}
            </>
          );
          return (
            <RevealItem as="li" key={item.id}>
              {interactive ? (
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
                >
                  {content}
                </button>
              ) : (
                <div className="group flex items-center gap-5 py-6 sm:gap-8">{content}</div>
              )}
            </RevealItem>
          );
        })}
      </RevealGroup>
      {interactive ? (
        <DetailDrawer
          items={items}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      ) : null}
    </>
  );
}
