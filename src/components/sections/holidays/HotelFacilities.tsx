"use client";

import { useRef, useState } from "react";
import type { DirectoryItem } from "@/types/content";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Reveal } from "@/components/animations/Reveal";
import { useGsap } from "@/hooks/useGsap";
import { useDragScroll } from "@/hooks/useDragScroll";
import { gsap } from "@/lib/gsap";

/**
 * "Hotel Facilities": on desktop the section pins and scrolling down slides the facility cards
 * across, with a turquoise line under them filling as you go. On small screens (or with reduced
 * motion) the row scrolls sideways by touch or drag and the line follows it. Each card opens
 * its detail drawer.
 */
export function HotelFacilities({ items, label }: { items: DirectoryItem[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const row = useRef<HTMLUListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  useDragScroll(row);

  const scope = useGsap<HTMLElement>(
    ({ scope, reducedMotion }) => {
      const list = row.current;
      const bar = fill.current;
      if (!list || !bar) return;

      // Native sideways scroll drives the line wherever the row isn't pinned.
      const onScroll = () => {
        const max = list.scrollWidth - list.clientWidth;
        gsap.set(bar, { scaleX: max > 0 ? list.scrollLeft / max : 1 });
      };
      list.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      const mm = gsap.matchMedia();
      if (!reducedMotion) {
        mm.add("(min-width: 1024px)", () => {
          // Measured from the last card so the end padding counts whatever the overflow mode.
          const distance = () => {
            const lastCard = list.lastElementChild as HTMLElement | null;
            if (!lastCard) return 0;
            const end = parseFloat(getComputedStyle(list).paddingRight) || 0;
            return Math.max(lastCard.offsetLeft + lastCard.offsetWidth + end - list.clientWidth, 0);
          };
          list.style.overflowX = "visible";
          gsap
            .timeline({
              scrollTrigger: {
                trigger: scope,
                start: "center center",
                end: () => `+=${Math.max(distance(), 1)}`,
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(list, { x: 0 }, { x: () => -distance(), ease: "none" }, 0)
            .fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
          return () => {
            list.style.overflowX = "";
          };
        });
      }
      return () => {
        list.removeEventListener("scroll", onScroll);
        mm.revert();
      };
    },
    [items.length],
  );

  return (
    <section
      ref={scope}
      aria-labelledby="facilities-title"
      className="relative overflow-hidden bg-turquoise-5 py-section"
    >
      <Container>
        <Reveal>
          <h2 id="facilities-title" className="text-heading-2">
            Hotel Facilities
          </h2>
        </Reveal>
      </Container>
      <ul
        ref={row}
        aria-label={label}
        className="mt-10 scrollbar-none flex cursor-grab gap-4 overflow-x-auto ps-site pe-gutter data-[dragging=true]:cursor-grabbing md:mt-12 lg:cursor-auto"
      >
        {items.map((item, index) => (
          <li key={item.id} className="w-[min(62vw,14.5rem)] shrink-0">
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group block w-full rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
            >
              <span className="relative block aspect-[205/265] overflow-hidden rounded-md bg-sand-200">
                <ResponsiveImage
                  asset={item.images[0]}
                  sizes="15rem"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </span>
              <span className="mt-4 block font-serif text-heading-6 transition-colors duration-500 group-hover:text-lagoon">
                {item.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <Container>
        <div aria-hidden className="relative mt-10 h-0.5 overflow-hidden rounded-full bg-ink/10">
          <span
            ref={fill}
            className="absolute inset-0 origin-left scale-x-0 rounded-full bg-turquoise"
          />
        </div>
      </Container>
      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
