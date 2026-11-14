"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ImageAsset } from "@/types/media";
import { easeOutExpo } from "@/components/animations/easing";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "./ResponsiveImage";

type PhotoLightboxProps = {
  images: ImageAsset[];
  label: string;
  /** The photo on show, or null when closed. */
  open: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Full-screen photo viewer on near-black: the photo as large as the screen allows, previous/next
 * looping round, and every photo as a thumbnail beside it (the current one outlined in
 * turquoise). A click on the black space closes it.
 */
export function PhotoLightbox({ images, label, open, onChange, onClose }: PhotoLightboxProps) {
  const strip = useRef<HTMLUListElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);

  // A click on the black space around the photo (not the photo or the controls) closes it.
  useEffect(() => {
    const element = backdrop.current;
    if (open === null || !element) return;
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).hasAttribute("data-backdrop")) onClose();
    };
    element.addEventListener("click", onClick);
    return () => element.removeEventListener("click", onClick);
  }, [open, onClose]);

  // Keep the current thumbnail in view as the photos step on.
  useEffect(() => {
    strip.current
      ?.querySelector<HTMLElement>("[data-current]")
      ?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [open]);

  return (
    <Dialog
      open={open !== null}
      onClose={onClose}
      label={`${label} photos`}
      className="bg-black/95"
    >
      {/* The photo as large as the screen allows, with every photo as a thumbnail beside it. */}
      <div
        ref={backdrop}
        data-backdrop
        className="relative flex h-full flex-col gap-4 px-4 py-6 md:flex-row md:gap-6 md:px-8 md:py-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 grid size-12 place-items-center text-white md:top-6 md:right-6"
          aria-label="Close photos"
          data-autofocus
        >
          <Icon name="close" className="size-8 stroke-1" />
        </button>
        <div
          data-backdrop
          className="flex min-h-0 min-w-0 flex-1 flex-col items-center justify-center gap-5 pt-10 md:pt-0"
        >
          <div data-backdrop className="relative min-h-0 w-full flex-1">
            <AnimatePresence initial={false}>
              {open !== null ? (
                <m.div
                  key={open}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                >
                  <ResponsiveImage
                    asset={images[open]}
                    sizes="85vw"
                    fill
                    className="object-contain"
                  />
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-6 text-white">
            <button
              type="button"
              className="wave grid size-12 place-items-center rounded-md border border-white/40 [--wave:#fff] hover:text-ink"
              onClick={() => onChange(((open ?? 0) - 1 + images.length) % images.length)}
              aria-label="Previous photo"
            >
              <Icon name="chevron-left" className="size-4.5" />
            </button>
            <p className="text-body-sm tabular-nums" aria-live="polite">
              {(open ?? 0) + 1} / {images.length}
            </p>
            <button
              type="button"
              className="wave grid size-12 place-items-center rounded-md border border-white/40 [--wave:#fff] hover:text-ink"
              onClick={() => onChange(((open ?? 0) + 1) % images.length)}
              aria-label="Next photo"
            >
              <Icon name="chevron-right" className="size-4.5" />
            </button>
          </div>
        </div>
        {/* Every photo as a thumbnail; the current one is outlined in turquoise. */}
        <ul
          ref={strip}
          aria-label="All photos"
          className="scrollbar-none flex max-w-full shrink-0 gap-2 overflow-x-auto p-1 md:max-h-full md:flex-col md:overflow-x-visible md:overflow-y-auto md:pt-16"
        >
          {images.map((image, index) => {
            const current = index === open;
            return (
              <li key={`${image.src}-${index}`} className="shrink-0">
                <button
                  type="button"
                  data-current={current || undefined}
                  onClick={() => onChange(index)}
                  aria-label={`Show photo ${index + 1} of ${images.length}`}
                  aria-current={current ? "true" : undefined}
                  className={cn(
                    "relative block size-16 overflow-hidden rounded-md outline-2 outline-offset-2 transition-[opacity,outline-color] duration-300 md:size-20",
                    current
                      ? "opacity-100 outline-turquoise"
                      : "opacity-50 outline-transparent hover:opacity-90",
                  )}
                >
                  <ResponsiveImage asset={image} sizes="80px" fill />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </Dialog>
  );
}
