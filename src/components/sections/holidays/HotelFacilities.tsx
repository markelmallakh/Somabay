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
 * across; each photo drifts the other way inside its frame as it travels (a sideways parallax).
 * On small screens (or with reduced motion) the row scrolls sideways by touch or drag, and the
 * photos drift with it. Each card opens its detail drawer.
 */
export function HotelFacilities({
  items,
  label,
  title = "Hotel Facilities",
}: {
  items: DirectoryItem[];
  label: string;
  /** The section heading ("Stayr Services" for the rentals). */
  title?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const row = useRef<HTMLUListElement>(null);
  useDragScroll(row);

  const scope = useGsap<HTMLElement>(
    ({ scope, reducedMotion }) => {
      const list = row.current;
      if (!list) return;
      const media = gsap.utils.toArray<HTMLElement>("[data-facility-media]", list);

      // Each photo drifts against the direction of travel: from the right edge of its frame as
      // the card enters on the right, to the left edge as it leaves on the left.
      const drift = () => {
        if (reducedMotion) return;
        const width = window.innerWidth;
        for (const item of media) {
          const box = item.parentElement!.getBoundingClientRect();
          const progress = gsap.utils.clamp(0, 1, (width - box.left) / (width + box.width));
          gsap.set(item, { xPercent: 9 - 18 * progress });
        }
      };
      // Native sideways scroll (phones, tablets) drives it wherever the row isn't pinned.
      list.addEventListener("scroll", drift, { passive: true });
      drift();

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
              onUpdate: drift,
            })
            .fromTo(list, { x: 0 }, { x: () => -distance(), ease: "none" }, 0);
          return () => {
            list.style.overflowX = "";
          };
        });
      }
      return () => {
        list.removeEventListener("scroll", drift);
        mm.revert();
      };
    },
    [items.length],
  );

  return (
    <section
      ref={scope}
      aria-labelledby="facilities-title"
      className="relative overflow-hidden bg-white py-section"
    >
      <Container>
        <Reveal>
          <h2 id="facilities-title" className="text-heading-2">
            {title}
          </h2>
        </Reveal>
      </Container>
      {/* Phones: a swipe row of small portrait cards, about two and a half to a screen, starting
          in line with the heading (the wrapper gives the row its gutter to bleed from). */}
      <div className="max-md:px-gutter">
        <ul
          ref={row}
          aria-label={label}
          className="mt-6 scrollbar-none data-[dragging=true]:cursor-grabbing max-md:swipe-row-half max-md:gap-2.5 max-md:[--swipe-card:38vw] sm:mt-10 md:mt-12 md:flex md:cursor-grab md:gap-4 md:overflow-x-auto md:ps-site md:pe-gutter lg:cursor-auto"
        >
          {items.map((item, index) => (
            <li key={item.id} className="md:w-[min(70vw,17.5rem)] md:shrink-0">
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group block w-full rounded-md text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-turquoise"
              >
                <span className="relative block aspect-[3/4] overflow-hidden rounded-md bg-sand-200 md:aspect-[2/3]">
                  {/* Wider than its frame so the sideways drift never shows an edge. */}
                  <span data-facility-media className="absolute -inset-x-[12%] inset-y-0 block">
                    <ResponsiveImage
                      asset={item.images[0]}
                      sizes="22rem"
                      fill
                      className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                    />
                  </span>
                </span>
                <span className="mt-2 block font-serif text-body-md leading-snug transition-colors duration-500 group-hover:text-lagoon sm:mt-4 sm:text-heading-6">
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </section>
  );
}
