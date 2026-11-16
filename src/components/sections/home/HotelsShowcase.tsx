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
import { Icon, type IconName } from "@/components/ui/Icon";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { Chip } from "@/components/ui/Chip";

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
  /** A few of the hotel's facilities, listed compactly under the description. */
  amenities: string[];
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
/** An icon for each amenity, picked from its name; a check mark when nothing matches. */
const AMENITY_ICONS: [RegExp, IconName][] = [
  [/beach/i, "umbrella"],
  [/jacuzzi|hot tub|whirlpool/i, "bubbles"],
  [/pool/i, "waves"],
  [/spa|wellness|thalasso/i, "sparkle"],
  [/bar|lounge/i, "cocktail"],
  [/restaurant|dining/i, "utensils"],
  [/gym|fitness/i, "dumbbell"],
  [/golf/i, "flag"],
  [/wifi|wi-fi/i, "wifi"],
  [/kids|family|club/i, "family"],
];
const amenityIcon = (name: string): IconName =>
  AMENITY_ICONS.find(([pattern]) => pattern.test(name))?.[1] ?? "check";

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
    // Desktop: the pinned block is exactly one screen tall (below the header), so the whole
    // showcase fits any laptop; the photo and switcher take whatever height is left.
    <div
      ref={ref}
      className="flex flex-col gap-8 py-section lg:h-svh lg:min-h-[40rem] lg:pt-[calc(var(--header-bar)+1.5rem)] lg:pb-[calc(2.5rem+8svh)]"
    >
      {intro}
      <Container className="lg:min-h-0 lg:flex-1">
        <div className="grid gap-8 lg:h-full lg:grid-cols-[500fr_445fr_323fr] lg:gap-x-12">
          {/* Photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-gray-100 lg:aspect-auto lg:h-full">
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
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-2/5 bg-[linear-gradient(to_top,rgb(0_0_0/0.6),rgb(0_0_0/0.25)_45%,transparent)]"
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
              className="absolute right-5 bottom-5 z-20"
            />
          </div>

          {/* Details */}
          <div key={hotel.slug} className="flex flex-col justify-between gap-7">
            <div className="flex flex-col gap-3">
              {/* The name with its star rating beside it: a small sun-yellow pill, "5 ★". */}
              <div className="flex animate-rise items-center gap-3">
                <h3 className="text-heading-3">{hotel.name}</h3>
                {hotel.stars ? (
                  <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sun px-2.5 py-1 text-body-xs leading-none font-semibold text-ink tabular-nums"
                    aria-label={`${hotel.stars}-star hotel`}
                  >
                    {hotel.stars}
                    <Icon name="star" className="size-3" />
                  </span>
                ) : null}
              </div>
              <ul className="flex animate-rise flex-wrap gap-2 [animation-delay:60ms]">
                {hotel.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
              <p className="animate-rise text-body-md text-slate [animation-delay:120ms]">
                {hotel.description}
              </p>
              {hotel.amenities.length ? (
                <ul
                  aria-label={`${hotel.name} amenities`}
                  className="mt-2 grid animate-rise grid-cols-2 gap-x-6 gap-y-2.5 border-t border-line pt-5 [animation-delay:180ms]"
                >
                  {hotel.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2 text-body-sm text-ink">
                      <Icon
                        name={amenityIcon(amenity)}
                        strokeWidth={1.5}
                        className="size-5 shrink-0 text-turquoise"
                      />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            {/* Price and the call to action together on a soft panel, so the next step is clear. */}
            <div className="flex animate-rise flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line pt-5 [animation-delay:240ms]">
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
