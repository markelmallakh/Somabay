"use client";

import { useState } from "react";
import type { DirectoryItem } from "@/types/content";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { PhotoCard } from "@/components/ui/PhotoCard";

/**
 * Marina shops as a grid of the homepage neighborhood cards, three to a row on desktop: the photo
 * fills the card, with the name over a deep shade
 * at the foot, and the turquoise action bar that floods up on hover. Each card opens the shared detail drawer, which
 * steps through the whole list.
 */
export function MarinaStoreList({ items }: { items: DirectoryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      {/* Two to a row on phones (compact cards, like the dining venues), three on large
          screens. */}
      <RevealGroup as="ul" className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <RevealItem as="li" key={item.id} className="flex">
            <PhotoCard
              onClick={() => setOpen(index)}
              image={item.images[0]}
              sizes="(min-width: 1024px) 30vw, 50vw"
              tag={item.chip}
              title={item.title}
              action="View details"
              size="compact"
              className="aspect-[3/4] sm:aspect-[400/520]"
            />
          </RevealItem>
        ))}
      </RevealGroup>
      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </>
  );
}
