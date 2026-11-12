"use client";

import { neighborhoodsIntro } from "@/content/home";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import type { Neighborhood, NeighborhoodStatus } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { neighborhoodImage } from "./neighborhoodImage";

type NeighborhoodGridProps = {
  neighborhoods: Neighborhood[];
  hrefs: Record<string, string>;
};

const statusLabel: Record<NeighborhoodStatus, string> = {
  living: "Living Now",
  upcoming: "Coming Soon",
};

/**
 * Keeps the last row full: on a 3-up grid (6 tracks) a lone last card spans the row and a last
 * pair splits it; on a 2-up grid a lone last card spans both columns. Wide cards drop the
 * portrait ratio and take the row's height.
 */
function balancedSpan(index: number, count: number) {
  const lgRest = count % 3;
  const fromEnd = count - index;
  const lg =
    lgRest === 1 && fromEnd === 1
      ? "lg:col-span-6 lg:[&>a]:aspect-[3/1]"
      : lgRest === 2 && fromEnd <= 2
        ? "lg:col-span-3 lg:[&>a]:aspect-[16/10]"
        : "lg:col-span-2 lg:[&>a]:aspect-[4/5]";
  const sm = count % 2 === 1 && fromEnd === 1 ? "sm:col-span-2 sm:[&>a]:aspect-[16/9]" : "";
  return `${sm} ${lg}`;
}

/** Status tabs over a grid of rounded photo cards; a turquoise rule grows on hover. */
export function NeighborhoodGrid({ neighborhoods, hrefs }: NeighborhoodGridProps) {
  const [status, setStatus] = useState<NeighborhoodStatus>("living");
  const items = neighborhoods.filter((item) => item.status === status);

  return (
    <>
      <div className="mt-10 flex">
        <SegmentedControl
          label="Neighborhood availability"
          value={status}
          onChange={setStatus}
          options={[
            { id: "living", label: "Living Now" },
            { id: "upcoming", label: "Coming Next" },
          ]}
        />
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <m.ul
          key={status}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {items.map((item, index) => (
            <li key={item.slug} className={balancedSpan(index, items.length)}>
              <PhotoCard
                href={hrefs[item.slug]}
                image={neighborhoodImage(item)}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                tag={statusLabel[item.status]}
                kicker={item.tagline}
                title={item.name}
                summary={item.summary}
                action={neighborhoodsIntro.cardCta}
                className="aspect-[4/5] h-full w-full"
              />
            </li>
          ))}
        </m.ul>
      </AnimatePresence>
    </>
  );
}
