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
      <ImageReveal parallax={0} className="absolute inset-0 overflow-hidden rounded-[2rem]">
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
          <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6">
            <span className="flex flex-col gap-1">
              <span className="font-serif text-heading-5">{item.title}</span>
              <span className="text-body-sm text-white/85">{item.description}</span>
            </span>
            <span className="wave wave-group grid size-11 shrink-0 place-items-center rounded-md bg-turquoise transition-colors duration-500 [--wave:#fff] group-hover:text-turquoise">
              <Icon
                name="arrow-up-right"
                className="size-5 transition-transform duration-700 ease-out-expo group-hover:rotate-45"
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
    <div ref={ref} className="flex flex-col gap-[3.75rem]">
      <FacilityCard
        item={lead}
        className="aspect-[1392/649]"
        sizes="(min-width: 1512px) 1392px, 100vw"
      />
      {/* Unequal columns for a looser, collage feel; bottom padding absorbs the drift. */}
      <div
        data-columns
        className="grid gap-8 md:grid-cols-[7fr_6fr] md:items-start md:gap-x-10 md:pb-[8.75rem]"
      >
        <div data-col="left" className="flex flex-col gap-8">
          <FacilityCard
            item={left[0]}
            from="large"
            className="aspect-[4/3] md:aspect-auto md:h-(--h)"
            style={height(LARGE)}
            sizes="(min-width: 768px) 46vw, 100vw"
          />
          <FacilityCard
            item={left[1]}
            from="small"
            className="aspect-[4/3] md:aspect-auto md:h-(--h)"
            style={height(SMALL)}
            sizes="(min-width: 768px) 46vw, 100vw"
          />
        </div>
        <div data-col="right" className="flex flex-col gap-8">
          <FacilityCard
            item={right[0]}
            from="small"
            className="aspect-[4/3] md:aspect-auto md:h-(--h)"
            style={height(SMALL)}
            sizes="(min-width: 768px) 46vw, 100vw"
          />
          <FacilityCard
            item={right[1]}
            from="large"
            className="aspect-[4/3] md:aspect-auto md:h-(--h)"
            style={height(LARGE)}
            sizes="(min-width: 768px) 46vw, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
