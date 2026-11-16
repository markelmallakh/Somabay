"use client";

import { useEffect, useState } from "react";
import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { PhotoLightbox } from "./PhotoLightbox";
import { ResponsiveImage } from "./ResponsiveImage";

type PhotoSliderProps = {
  images: ImageAsset[];
  label: string;
  /** Seconds each photo stays before the next one fades in. */
  interval?: number;
};

/**
 * A wide photo slider for a place's gallery. Photos crossfade while settling from a gentle zoom.
 * The arrows and counter sit at the photo's bottom left; a neat row of thumbnails sits at its
 * bottom right (under the photo on phones), the current one framed. Photos move on by themselves
 * every few seconds; hovering pauses them, and the photo opens the full-screen viewer.
 */
export function PhotoSlider({ images, label, interval = 6 }: PhotoSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const count = images.length;

  // Autoplay: the next photo comes in after `interval` seconds, held while hovered, while the
  // full-screen viewer is open, or with reduced motion.
  useEffect(() => {
    if (count < 2 || paused || open !== null || reducedMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % count),
      interval * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [active, count, paused, open, reducedMotion, interval]);

  if (!count) return null;

  const go = (index: number) => setActive((index + count) % count);
  const pad = (value: number) => String(value).padStart(2, "0");
  const thumbs = (onPhoto: boolean) => (
    <ul className="scrollbar-none flex gap-2 overflow-x-auto" aria-label={`${label} photos`}>
      {images.map((image, index) => {
        const on = index === active;
        return (
          <li key={image.src} className="shrink-0">
            <button
              type="button"
              onClick={() => go(index)}
              aria-label={`Show photo ${index + 1} of ${count}`}
              aria-current={on ? "true" : undefined}
              className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span
                className={cn(
                  "relative block aspect-[3/2] overflow-hidden rounded-[3px] transition-[box-shadow,opacity] duration-500",
                  onPhoto ? "w-[4.5rem]" : "w-20",
                  on
                    ? onPhoto
                      ? "opacity-100 shadow-[0_0_0_1.5px_#fff]"
                      : "opacity-100 shadow-[0_0_0_1.5px_var(--color-turquoise)]"
                    : "opacity-60 group-hover:opacity-100",
                )}
              >
                <ResponsiveImage asset={image} alt="" sizes="6rem" fill />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Hover and focus pause the autoplay; the controls inside are real buttons. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="flex flex-col gap-4"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Never taller than the screen below the header and breadcrumb, so the whole photo
            shows without scrolling on wide screens too. */}
        <div className="relative isolate aspect-[4/3] max-h-[calc(100svh-var(--header-height)-8rem)] overflow-hidden rounded-md bg-sand-200 sm:aspect-[16/9] lg:aspect-[21/9]">
          {images.map((image, index) => {
            const on = index === active;
            return (
              <div
                key={image.src}
                aria-hidden={!on}
                className={cn(
                  "absolute inset-0 transition-[opacity,scale] duration-[1400ms] ease-out-expo",
                  on ? "z-10 scale-100 opacity-100" : "z-0 scale-[1.06] opacity-0",
                )}
              >
                <ResponsiveImage
                  asset={image}
                  sizes="(min-width: 1024px) 92vw, 100vw"
                  fill
                  priority={index === 0}
                />
              </div>
            );
          })}

          {/* The photo itself opens the full-screen viewer. */}
          <button
            type="button"
            onClick={() => setOpen(active)}
            className="absolute inset-0 z-20 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white"
          >
            <span className="sr-only">
              Open photo {active + 1} of {count} full screen
            </span>
          </button>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-2/5 bg-[linear-gradient(to_top,rgb(0_0_0/0.5),transparent)]"
          />

          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-30 flex items-end justify-between gap-6 sm:inset-x-6 sm:bottom-6">
            <div className="pointer-events-auto flex items-center gap-5">
              <CarouselArrows
                canBack
                canForward
                onPage={(direction) => go(active + direction)}
                label={`photo of ${label}`}
                tone="dark"
              />
              <p aria-live="polite" className="text-body-sm text-white tabular-nums">
                <span className="font-semibold">{pad(active + 1)}</span>
                <span className="text-white/70"> / {pad(count)}</span>
              </p>
            </div>
            {/* Bottom right: the thumbnails, straight on the photo. */}
            <div className="pointer-events-auto hidden max-w-[60%] md:block">{thumbs(true)}</div>
          </div>
        </div>

        {/* Phones: the thumbnails under the photo. */}
        <div className="md:hidden">{thumbs(false)}</div>
      </div>

      <PhotoLightbox
        images={images}
        label={label}
        open={open}
        onChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </>
  );
}
