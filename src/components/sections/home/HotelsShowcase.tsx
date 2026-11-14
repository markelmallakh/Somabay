"use client";

import { type ReactNode, useCallback, useRef, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { getLenis } from "@/components/animations/SmoothScroll";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { Chip } from "@/components/ui/Chip";
import { StarChip } from "@/components/sections/holidays/StarChip";

export type ShowcaseHotel = {
  slug: string;
  name: string;
  tagline: string;
  stars?: number;
  description: string;
  image: ImageAsset;
  /** Photos for the gallery arrows; the first is the cover. */
  gallery: ImageAsset[];
  href: string;
  tags: string[];
  /** "Starting from" nightly price. */
  price: string;
};

type HotelsShowcaseProps = {
  hotels: ShowcaseHotel[];
  ctaLabel: string;
  intro: ReactNode;
};

/**
 * Figma "Section / Hotels". On desktop the section pins and scrolling steps through the hotels:
 * the photo cross-fades, the details rise in and the switcher marks the active hotel. The
 * switcher jumps to a hotel (by scrolling to its step while pinned; without the pin it simply
 * switches). The counter arrows on the photo page through the active hotel's own gallery.
 */
export function HotelsShowcase({ hotels, ctaLabel, intro }: HotelsShowcaseProps) {
  const [active, setActive] = useState(0);
  const trigger = useRef<ScrollTrigger | null>(null);
  const count = hotels.length;

  const ref = useGsap<HTMLDivElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        trigger.current = ScrollTrigger.create({
          trigger: scope,
          start: "center center",
          end: () => `+=${(count - 1) * window.innerHeight * 0.6}`,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(count - 1, Math.floor(self.progress * count));
            setActive((previous) => (previous === index ? previous : index));
          },
        });
        return () => {
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    [count],
  );

  const goTo = useCallback(
    (index: number) => {
      const next = (index + count) % count;
      const st = trigger.current;
      if (!st) {
        setActive(next);
        return;
      }
      const y = st.start + ((next + 0.5) / count) * (st.end - st.start);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(y, { duration: 1.2 });
      else window.scrollTo({ top: y, behavior: "smooth" });
    },
    [count],
  );

  const hotel = hotels[active];

  // Gallery position, remembered per hotel and reset when another hotel becomes active.
  const [photo, setPhoto] = useState({ slug: hotel.slug, index: 0 });
  const photoIndex = photo.slug === hotel.slug ? photo.index : 0;
  const photos = hotel.gallery.length;
  const step = (by: number) =>
    setPhoto({ slug: hotel.slug, index: (photoIndex + by + photos) % photos });

  return (
    <div ref={ref} className="flex flex-col gap-8 py-section">
      {intro}
      <Container>
        <div className="grid gap-8 lg:grid-cols-[560fr_445fr_323fr]">
          {/* Photo */}
          <div className="relative aspect-[560/460] overflow-hidden rounded-md bg-gray-100">
            {hotels.map((item, index) => (
              <div
                key={item.slug}
                aria-hidden={index !== active}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[1200ms] ease-out-expo",
                  index === active ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                )}
              >
                {(index === active ? item.gallery : [item.gallery[0]]).map((asset, slide) => {
                  const shown = index !== active || slide === photoIndex;
                  return (
                    <div
                      key={asset.src}
                      className={cn(
                        "absolute inset-0 transition-[opacity,scale] duration-[900ms] ease-out-expo",
                        shown ? "scale-100 opacity-100" : "scale-[1.05] opacity-0",
                      )}
                    >
                      <ResponsiveImage asset={asset} sizes="(min-width: 1024px) 37vw, 100vw" fill />
                    </div>
                  );
                })}
              </div>
            ))}
            {/* A soft shade so the arrows read on bright photos. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(to_top,rgb(0_0_0/0.35),transparent)]"
            />
            <p aria-live="polite" className="sr-only">
              Photo {photoIndex + 1} of {photos}
            </p>
            <CarouselArrows
              canBack
              canForward
              onPage={step}
              label={`photo of ${hotel.name}`}
              tone="dark"
              className="absolute right-5 bottom-5"
            />
          </div>

          {/* Details */}
          <div key={hotel.slug} className="flex flex-col justify-between gap-6 pb-2">
            <div className="flex flex-col gap-3">
              <ul className="flex animate-rise flex-wrap gap-2">
                {hotel.stars ? (
                  <li>
                    <StarChip count={hotel.stars} />
                  </li>
                ) : null}
                {hotel.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
              <h3 className="animate-rise text-heading-3 [animation-delay:60ms]">{hotel.name}</h3>
              <p className="animate-rise text-body-md text-slate [animation-delay:120ms]">
                {hotel.description}
              </p>
            </div>
            <div className="flex animate-rise flex-wrap items-center gap-x-8 gap-y-4 [animation-delay:240ms]">
              <PriceFrom amount={hotel.price} />
              <Button href={hotel.href} variant="primary" icon="arrow-up-right">
                {ctaLabel}
                <span className="sr-only">: {hotel.name}</span>
              </Button>
            </div>
          </div>

          {/* Switcher */}
          <ul aria-label="Hotels" className="flex flex-col">
            {hotels.map((item, index) => {
              const current = index === active;
              return (
                <li key={item.slug} className="flex-1">
                  <button
                    type="button"
                    aria-current={current ? "true" : undefined}
                    onClick={() => goTo(index)}
                    // The active hotel sits on a soft turquoise wash beside its rule.
                    className={cn(
                      "group relative flex h-full w-full items-center gap-3.5 rounded-r-md border-l border-ink/15 py-2 pr-4 pl-4.5 text-left transition-colors duration-500",
                      current ? "bg-turquoise-5" : "hover:bg-sand-100",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "absolute top-0 -left-px h-full w-0.5 origin-top bg-turquoise transition-transform duration-700 ease-out-expo",
                        current ? "scale-y-100" : "scale-y-0",
                      )}
                    />
                    <span
                      className={cn(
                        "relative size-13 shrink-0 overflow-hidden rounded-full transition-opacity duration-500",
                        current ? "opacity-100" : "opacity-55 group-hover:opacity-80",
                      )}
                    >
                      <ResponsiveImage asset={item.image} sizes="52px" fill />
                    </span>
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span
                        className={cn(
                          "truncate text-body-md font-semibold transition-colors duration-500",
                          current ? "text-ink" : "text-slate group-hover:text-ink",
                        )}
                      >
                        {item.name}
                      </span>
                      <span className="truncate text-body-xs text-slate">{item.tagline}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </div>
  );
}
