"use client";

import { useState } from "react";
import type { ImageAsset } from "@/types/media";
import { PhotoLightbox } from "./PhotoLightbox";
import { ResponsiveImage } from "./ResponsiveImage";

type PhotoGridProps = {
  images: ImageAsset[];
  label: string;
};

/**
 * One large photo plus a 2×2 grid; the last tile is darkened with a centred "+N Photos". Any tile
 * opens a full-screen lightbox with every photo as a thumbnail below (the current one outlined in
 * turquoise).
 */
export function PhotoGrid({ images, label }: PhotoGridProps) {
  const [open, setOpen] = useState<number | null>(null);
  const [lead, ...rest] = images;
  const tiles = rest.slice(0, 4);
  const hidden = images.length - 5;
  if (!lead) return null;

  const tile = "group relative overflow-hidden rounded-card bg-sand-200 text-left";

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2 md:gap-4">
        <button
          type="button"
          className={`${tile} aspect-square`}
          onClick={() => setOpen(0)}
          aria-label={`Open photo 1 of ${images.length}`}
        >
          <ResponsiveImage
            asset={lead}
            sizes="(min-width: 768px) 50vw, 100vw"
            fill
            priority
            className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.04]"
          />
        </button>
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tiles.map((image, index) => (
            <button
              key={image.src}
              type="button"
              className={`${tile} aspect-[324/308]`}
              onClick={() => setOpen(index + 1)}
              aria-label={`Open photo ${index + 2} of ${images.length}`}
            >
              <ResponsiveImage
                asset={image}
                sizes="(min-width: 768px) 25vw, 50vw"
                fill
                className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
              />
              {index === tiles.length - 1 && hidden > 0 ? (
                <span className="absolute inset-0 grid place-items-center bg-black/50 transition-colors duration-500 group-hover:bg-black/40">
                  <span className="rounded-full border border-white/70 px-5 py-2.5 text-[0.75rem] font-semibold tracking-label text-white uppercase">
                    +{hidden} Photos
                  </span>
                </span>
              ) : null}
            </button>
          ))}
        </div>
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
