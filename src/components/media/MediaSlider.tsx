"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";
import { ResponsiveImage } from "./ResponsiveImage";

type MediaSliderProps = {
  images: ImageAsset[];
  sizes: string;
  /** Accessible name for the slider region. */
  label: string;
  className?: string;
  /** Visual size of the arrow buttons. */
  controls?: "sm" | "md";
  /**
   * Steps through the photos as the page scrolls past the slider (small, important carousels).
   * The arrows still work and shift the sequence.
   */
  scrollAdvance?: boolean;
};

/** Crossfading image slider with previous/next controls (cards, drawers). */
export function MediaSlider({
  images,
  sizes,
  label,
  className,
  controls = "md",
  scrollAdvance = false,
}: MediaSliderProps) {
  const frame = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [scrollStep, setScrollStep] = useState(0);
  const count = images.length;
  const index = (((scrollStep + offset) % count) + count) % count;
  const go = (step: 1 | -1) => setOffset((current) => current + step);

  useEffect(() => {
    const element = frame.current;
    if (!scrollAdvance || !element || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 85%",
      end: "bottom 15%",
      onUpdate: ({ progress }) => setScrollStep(Math.min(count - 1, Math.floor(progress * count))),
    });
    return () => trigger.kill();
  }, [scrollAdvance, count]);
  const button = cn(
    "wave absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center rounded-md bg-white/90 text-ink shadow-soft transition-colors duration-500 hover:text-white",
    controls === "sm" ? "size-8" : "size-12",
  );

  return (
    <div
      ref={frame}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={cn("relative overflow-hidden bg-sand-200", className)}
    >
      <AnimatePresence initial={false}>
        <m.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
        >
          <ResponsiveImage asset={images[index]} sizes={sizes} fill />
        </m.div>
      </AnimatePresence>
      {count > 1 ? (
        <>
          <button
            type="button"
            className={cn(button, controls === "sm" ? "left-3" : "left-6")}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
          >
            <Icon name="chevron-left" className="size-4" />
          </button>
          <button
            type="button"
            className={cn(button, controls === "sm" ? "right-3" : "right-6")}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
          >
            <Icon name="chevron-right" className="size-4" />
          </button>
          <p className="sr-only" aria-live="polite">
            Image {index + 1} of {count}
          </p>
        </>
      ) : null}
    </div>
  );
}
