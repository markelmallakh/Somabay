"use client";

import { useState } from "react";
import type { ImageAsset } from "@/types/media";
import { Reveal } from "@/components/animations/Reveal";
import { PhotoLightbox } from "@/components/media/PhotoLightbox";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { DragRow } from "@/components/ui/DragRow";

/**
 * Optional photo gallery at the end of an event or journal post: a draggable carousel with
 * arrows, each photo opening the full-screen viewer where it shows whole. Renders nothing
 * without photos, so editors can add as many (or as few) as they like.
 */
export function ArticleGallery({ images, label }: { images?: ImageAsset[]; label: string }) {
  const [open, setOpen] = useState<number | null>(null);
  if (!images?.length) return null;

  return (
    <>
      <Reveal className="mt-14">
        <DragRow label={`${label} photos`}>
          {images.map((image, index) => (
            <li key={image.src} className="w-[min(78vw,26rem)] shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`Open photo ${index + 1} of ${images.length}: ${image.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md outline-offset-2"
              >
                <span data-no-motion className="pointer-events-none absolute inset-0">
                  <ResponsiveImage
                    asset={image}
                    sizes="(min-width: 768px) 26rem, 78vw"
                    fill
                    className="transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </span>
              </button>
            </li>
          ))}
        </DragRow>
      </Reveal>
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
