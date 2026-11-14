"use client";

import { useState } from "react";
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
 * A wide photo slider for a place's gallery. Photos crossfade while settling from a gentle zoom;
 * a frosted strip of thumbnails sits on the photo (below it on phones), the current one outlined
 * with a thin line that fills while it is on show and moves on when full. Hovering pauses it,
 * arrows step through, and the photo opens the full-screen viewer.
 */
export function PhotoSlider({ images, label, interval = 6 }: PhotoSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const count = images.length;
  if (!count) return null;

  const go = (index: number) => setActive((index + count) % count);
  const pad = (value: number) => String(value).padStart(2, "0");

  const thumbs = (tone: "glass" | "plain") => (
    <ul
      className={cn(
        "scrollbar-none flex gap-1.5 overflow-x-auto",
        tone === "glass" && "rounded-md bg-black/25 p-1.5 backdrop-blur-lg",
      )}
      aria-label={`${label} photos`}
    >
      {images.map((image, index) => {
        const on = index === active;
        return (
          <li key={image.src} className="shrink-0">
            <button
              type="button"
              onClick={() => go(index)}
              aria-label={`Show photo ${index + 1} of ${count}`}
              aria-current={on ? "true" : undefined}
              className={cn(
                "relative block aspect-[4/3] w-14 overflow-hidden rounded-[3px] transition-[opacity,box-shadow] duration-500 lg:w-16",
                on
                  ? "opacity-100 shadow-[0_0_0_2px_#fff]"
                  : "opacity-60 hover:opacity-100 focus-visible:opacity-100",
              )}
            >
              <ResponsiveImage asset={image} alt="" sizes="6rem" fill />
              {/* Fills while this photo is on show; when full, the next one comes in. */}
              {on && !reducedMotion ? (
                <span
                  key={`${active}-${tone}`}
                  aria-hidden
                  // Only the visible strip animates (the other is display: none).
                  onAnimationEnd={() => go(active + 1)}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white"
                  style={{
                    animation: `slider-progress ${interval}s linear forwards`,
                    animationPlayState: paused || open !== null ? "paused" : "running",
                  }}
                />
              ) : null}
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
        className="flex flex-col gap-3"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative isolate aspect-[4/3] overflow-hidden rounded-md bg-sand-200 sm:aspect-[16/9] lg:aspect-[2/1]">
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
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-[linear-gradient(to_top,rgb(0_0_0/0.45),transparent)]"
          />

          <div className="pointer-events-none absolute inset-x-4 bottom-4 z-30 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-6">
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
            <div className="pointer-events-auto hidden max-w-[60%] md:block">{thumbs("glass")}</div>
          </div>
        </div>

        {/* Phones: the thumbnails under the photo. */}
        <div className="md:hidden">{thumbs("plain")}</div>
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
