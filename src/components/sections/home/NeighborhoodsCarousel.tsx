"use client";

import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import { type ReactNode, useRef, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";
import type { Neighborhood, NeighborhoodStatus } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { DragCursor } from "@/components/ui/DragCursor";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { Container } from "@/components/layout/Container";

type NeighborhoodsCarouselProps = {
  neighborhoods: Neighborhood[];
  hrefs: Record<string, string>;
  tabLabels: Record<NeighborhoodStatus, string>;
  heading: ReactNode;
};

const PANEL_ID = "neighborhoods-panel";

export function NeighborhoodsCarousel({
  neighborhoods,
  hrefs,
  tabLabels,
  heading,
}: NeighborhoodsCarouselProps) {
  const [status, setStatus] = useState<NeighborhoodStatus>("living");
  const scroller = useRef<HTMLDivElement>(null);
  useDragScroll(scroller);

  const items = neighborhoods.filter((item) => item.status === status);

  const change = (next: NeighborhoodStatus) => {
    setStatus(next);
    scroller.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Container className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {heading}
        <Tabs
          className="shrink-0"
          label="Neighborhood availability"
          panelId={PANEL_ID}
          value={status}
          onChange={change}
          options={[
            { id: "living", label: tabLabels.living },
            { id: "upcoming", label: tabLabels.upcoming },
          ]}
        />
      </Container>

      <div
        ref={scroller}
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`${PANEL_ID}-tab-${status}`}
        className="mt-10 scrollbar-none cursor-grab snap-x snap-proximity scroll-ps-site overflow-x-auto data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none md:mt-12"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={status}
            className="flex w-max gap-3 ps-site pe-gutter md:gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            {items.map((item) => (
              <li key={item.slug} className="w-[clamp(16rem,24vw,23rem)] snap-start">
                <Link
                  href={hrefs[item.slug]}
                  draggable={false}
                  className="group relative block aspect-[7/10] overflow-hidden bg-sand-200 text-white"
                >
                  <ResponsiveImage
                    asset={item.image}
                    sizes="(min-width: 768px) 24vw, 16rem"
                    fill
                    className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-abyss/80 via-abyss/10 to-transparent"
                  />
                  <span className="absolute top-4 right-4 grid size-10 place-items-center bg-white/90 text-ink transition-colors duration-500 group-hover:bg-turquoise group-hover:text-white">
                    <Icon name="arrow-up-right" className="size-4.5" />
                  </span>
                  <span className="absolute inset-x-5 bottom-5">
                    <span className="block font-serif text-h4">{item.name}</span>
                    <span className="mt-1 block text-caption text-white/75">{item.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </m.ul>
        </AnimatePresence>
      </div>
      <DragCursor targetRef={scroller} />
    </>
  );
}
