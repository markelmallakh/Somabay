"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { Icon } from "@/components/ui/Icon";
import { PhotoLightbox } from "./PhotoLightbox";
import { ResponsiveImage } from "./ResponsiveImage";

type GalleryCarouselProps = {
  images: ImageAsset[];
  label: string;
  className?: string;
};

/** Three copies of the photos; the user always sits in the middle one, so the row never ends. */
const COPIES = 3;

// Where slide `k` (across all copies) snaps to.
const positionOf = (element: HTMLUListElement, k: number) => {
  const slides = element.children;
  const first = slides[0] as HTMLElement | undefined;
  const slide = slides[k] as HTMLElement | undefined;
  return first && slide ? slide.offsetLeft - first.offsetLeft : 0;
};
const currentSlide = (element: HTMLUListElement) => {
  const step = positionOf(element, 1);
  return step ? Math.round(element.scrollLeft / step) : 0;
};

/**
 * Square-slide gallery that loops endlessly: arrows and swipes carry straight on from the last
 * photo to the first. Any photo opens the full-screen viewer with every photo as a thumbnail.
 */
export function GalleryCarousel({ images, label, className }: GalleryCarouselProps) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  // The slide the row is gliding to, so quick repeated clicks each add a step.
  const heading = useRef<number | null>(null);
  const count = images.length;

  useEffect(() => {
    const element = track.current;
    if (!element || count < 2) return;
    // Start on the first photo of the middle copy.
    element.scrollLeft = positionOf(element, count);

    // Once the row comes to rest in the first or last copy, hop (invisibly) to the same photo in
    // the middle copy, so there is always more row on both sides.
    const recentre = () => {
      heading.current = null;
      const k = currentSlide(element);
      if (k < count || k >= count * 2) {
        const offset = element.scrollLeft - positionOf(element, k);
        element.scrollLeft = positionOf(element, count + (k % count)) + offset;
      }
    };
    // Recentre once the scroll events stop (a glide sends them every frame until it lands).
    let settle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      setActive(((currentSlide(element) % count) + count) % count);
      clearTimeout(settle);
      settle = setTimeout(recentre, 200);
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      element.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  const go = (target: number) => {
    const element = track.current;
    if (!element) return;
    // Stay inside the rendered copies; the settle hop recentres afterwards.
    const clamped = Math.max(0, Math.min(count * COPIES - 1, target));
    heading.current = clamped;
    element.scrollTo({ left: positionOf(element, clamped), behavior: "smooth" });
  };
  const step = (delta: number) => {
    const element = track.current;
    if (element) go((heading.current ?? currentSlide(element)) + delta);
  };
  const toDot = (index: number) => {
    const element = track.current;
    if (!element) return;
    const base = heading.current ?? currentSlide(element);
    go(base - (base % count) + index);
  };

  const arrow =
    "absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 place-items-center rounded-md border border-ink/15 bg-white/95 text-ink shadow-soft transition-colors wave hover:text-white md:grid";

  const slides = Array.from({ length: COPIES }, (_, copy) =>
    images.map((image, index) => ({ image, index, copy })),
  ).flat();

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <ul
        ref={track}
        className="scrollbar-none flex snap-x snap-mandatory scroll-ps-site gap-3 overflow-x-auto ps-site pe-gutter"
      >
        {slides.map(({ image, index, copy }) => {
          // Only the middle copy is announced and reachable by keyboard.
          const clone = copy !== 1;
          return (
            <li
              key={`${copy}-${index}`}
              aria-hidden={clone || undefined}
              className="relative aspect-square w-[min(78vw,25.3rem)] shrink-0 snap-start overflow-hidden rounded-lg bg-sand-200"
            >
              <button
                type="button"
                tabIndex={clone ? -1 : undefined}
                onClick={() => setOpen(index)}
                aria-label={`Open photo ${index + 1} of ${count}`}
                className="group absolute inset-0 cursor-zoom-in outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
              >
                <ResponsiveImage
                  asset={image}
                  sizes="(min-width: 768px) 26rem, 78vw"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.04]"
                />
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className={cn(arrow, "left-[max(1rem,calc((100vw-var(--container-site))/2))]")}
        onClick={() => step(-1)}
        aria-label="Previous image"
      >
        <Icon name="chevron-left" className="size-4.5" />
      </button>
      <button
        type="button"
        className={cn(arrow, "right-[max(1rem,calc((100vw-var(--container-site))/2))]")}
        onClick={() => step(1)}
        aria-label="Next image"
      >
        <Icon name="chevron-right" className="size-4.5" />
      </button>
      <div className="mt-8 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.src + index}
            type="button"
            onClick={() => toDot(index)}
            aria-label={`Go to image ${index + 1}`}
            aria-current={index === active ? "true" : undefined}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              index === active ? "w-8 bg-turquoise" : "w-1.5 bg-turquoise/30 hover:bg-turquoise/60",
            )}
          />
        ))}
      </div>

      <PhotoLightbox
        images={images}
        label={label}
        open={open}
        onChange={setOpen}
        onClose={() => setOpen(null)}
      />
    </div>
  );
}
