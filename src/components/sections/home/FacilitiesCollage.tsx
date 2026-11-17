"use client";

import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types/media";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";

export type Facility = {
  title: string;
  description: string;
  image: ImageAsset;
  href: string;
};

/** Phones: every card the same portrait size, about one and a half to a screen. */
const PHONE_CARD =
  "aspect-[4/5] w-[62vw] shrink-0 snap-start md:aspect-auto md:h-(--h) md:w-auto md:shrink";

/** How far (px) the columns drift against each other while scrolling. */
const SHIFT = 220;

/** Card heights (rem) at the two ends of the scroll: a large card shrinks as its neighbour grows. */
const LARGE = 36;
const SMALL = 26;

function FacilityCard({
  item,
  className,
  sizes,
  from,
  style,
}: {
  item: Facility;
  className?: string;
  sizes: string;
  from?: "large" | "small";
  style?: CSSProperties;
}) {
  return (
    <div data-from={from} style={style} className={cn("relative", className)}>
      <ImageReveal parallax={0} className="absolute inset-0 overflow-hidden rounded-md">
        <SmartLink href={item.href} className="group absolute inset-0 block text-white">
          {/* Taller than the card so it can drift (parallax) without exposing an edge. */}
          <span data-parallax className="absolute inset-x-0 -top-[12%] block h-[124%]">
            <ResponsiveImage
              asset={item.image}
              sizes={sizes}
              fill
              className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
            />
          </span>
          <span
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"
          />
          <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6 sm:gap-6">
            <span className="flex flex-col gap-1">
              <span className="font-serif text-heading-5">{item.title}</span>
              <span className="text-body-xs text-white/80 sm:text-body-sm">{item.description}</span>
            </span>
            <span className="wave wave-group grid size-9 shrink-0 place-items-center rounded-md bg-turquoise transition-colors duration-500 [--wave:#fff] group-hover:text-turquoise sm:size-11">
              <Icon
                name="arrow-up-right"
                className="size-4 transition-transform duration-700 ease-out-expo group-hover:rotate-45 sm:size-5"
              />
            </span>
          </span>
        </SmartLink>
      </ImageReveal>
    </div>
  );
}

/**
 * Facilities collage: the lead card across the full width, then two unequal columns that drift
 * against each other (right starts lower, left ends lower). While they scroll past, each pair trades size —
 * large cards shrink as their small neighbours grow (column heights stay constant, so nothing
 * below jumps) — and every photo drifts in parallax.
 */
export function FacilitiesCollage({
  lead,
  left,
  right,
}: {
  lead: Facility;
  left: [Facility, Facility];
  right: [Facility, Facility];
}) {
  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      scope.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
        gsap.fromTo(
          layer,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: layer.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      const columns = scope.querySelector<HTMLElement>("[data-columns]");
      // The columns travel at different speeds and cross over: the right one starts lower, and
      // by the time the pair leaves, the left one has slipped below it.
      const range = { trigger: columns, start: "top 85%", end: "bottom 30%", scrub: 0.8 };
      gsap.fromTo("[data-col='left']", { y: 0 }, { y: SHIFT, ease: "none", scrollTrigger: range });
      gsap.fromTo("[data-col='right']", { y: SHIFT }, { y: 0, ease: "none", scrollTrigger: range });
      scope.querySelectorAll<HTMLElement>("[data-from]").forEach((card) => {
        const startsLarge = card.dataset.from === "large";
        gsap.fromTo(
          card,
          { height: `${startsLarge ? LARGE : SMALL}rem` },
          {
            height: `${startsLarge ? SMALL : LARGE}rem`,
            ease: "none",
            scrollTrigger: {
              trigger: columns,
              start: "top 85%",
              end: "bottom 30%",
              scrub: 0.6,
            },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  const height = (rem: number) => ({ "--h": `${rem}rem` }) as CSSProperties;

  return (
    <div ref={ref} className="flex flex-col gap-6 md:gap-[3.75rem]">
      {/* The lead card across the full width (from `md`; phones show it first in the row). */}
      <FacilityCard
        item={lead}
        className="hidden aspect-[16/9] sm:block md:aspect-[1392/649]"
        sizes="(min-width: 1512px) 1392px, 100vw"
      />
      {/* Unequal columns for a looser, collage feel; bottom padding absorbs the drift. On phones
          all five cards share one size in a swipe row that shows one and a half at a time. */}
      <div
        data-columns
        className="-mx-gutter scrollbar-none flex snap-x snap-mandatory scroll-px-gutter gap-3 overflow-x-auto px-gutter md:mx-0 md:grid md:snap-none md:grid-cols-[7fr_6fr] md:items-start md:gap-x-10 md:overflow-visible md:px-0 md:pb-[8.75rem]"
      >
        <FacilityCard item={lead} className={PHONE_CARD + " sm:hidden"} sizes="62vw" />
        <div data-col="left" className="contents md:flex md:flex-col md:gap-8">
          <FacilityCard
            item={left[0]}
            from="large"
            className={PHONE_CARD}
            style={height(LARGE)}
            sizes="(min-width: 768px) 46vw, 62vw"
          />
          <FacilityCard
            item={left[1]}
            from="small"
            className={PHONE_CARD}
            style={height(SMALL)}
            sizes="(min-width: 768px) 46vw, 62vw"
          />
        </div>
        <div data-col="right" className="contents md:flex md:flex-col md:gap-8">
          <FacilityCard
            item={right[0]}
            from="small"
            className={PHONE_CARD}
            style={height(SMALL)}
            sizes="(min-width: 768px) 46vw, 62vw"
          />
          <FacilityCard
            item={right[1]}
            from="large"
            className={PHONE_CARD}
            style={height(LARGE)}
            sizes="(min-width: 768px) 46vw, 62vw"
          />
        </div>
      </div>
    </div>
  );
}
