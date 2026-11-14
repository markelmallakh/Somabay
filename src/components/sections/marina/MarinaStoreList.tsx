"use client";

import { useState } from "react";
import type { DirectoryItem } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

/**
 * Marina shops as rounded sand cards: thumbnail, name, short line and a location chip. Each card
 * opens the shared detail drawer, which steps through the whole list.
 */
export function MarinaStoreList({ items }: { items: DirectoryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <RevealGroup as="ul" className="flex flex-col gap-3">
        {items.map((item, index) => (
          <RevealItem as="li" key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group flex w-full items-center gap-4 rounded-md bg-sand-100 p-3 text-left transition-[background-color,box-shadow] duration-500 hover:bg-white hover:shadow-card focus-visible:bg-white sm:gap-6 sm:p-4"
            >
              <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-md bg-sand-200 sm:w-36">
                <ResponsiveImage
                  asset={item.images[0]}
                  sizes="9rem"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </span>
              <span className="flex min-w-0 flex-1 flex-col items-start gap-2">
                <span className="font-serif text-heading-6">{item.title}</span>
                {item.description ? (
                  <span className="line-clamp-2 text-body-sm text-slate">{item.description}</span>
                ) : null}
                {item.location ? (
                  <Chip tone="plain" className="max-sm:hidden">
                    {item.location}
                  </Chip>
                ) : null}
              </span>
              <span
                aria-hidden
                className="wave wave-group mr-2 hidden size-11 shrink-0 place-items-center rounded-md border border-ink/15 transition-colors duration-500 group-hover:border-turquoise group-hover:text-white sm:grid"
              >
                <Icon name="arrow-right" className="size-4" />
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealGroup>
      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
