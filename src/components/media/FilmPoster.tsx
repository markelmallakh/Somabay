"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { VideoAsset } from "@/types/media";
import { Icon } from "@/components/ui/Icon";
import { FilmDialog } from "./FilmDialog";
import { ResponsiveImage } from "./ResponsiveImage";

type FilmPosterProps = {
  film: VideoAsset;
  sizes: string;
  className?: string;
  label?: string;
};

/** Poster frame with a play button that opens the film (with sound) in a modal. */
export function FilmPoster({ film, sizes, className, label = "Play film" }: FilmPosterProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn("group relative block w-full overflow-hidden bg-abyss text-white", className)}
        aria-label={`${label}: ${film.label}`}
      >
        <ResponsiveImage
          asset={film.poster}
          alt=""
          sizes={sizes}
          fill
          className="transition-transform duration-[1800ms] ease-out-expo group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-abyss/25 transition-colors duration-700 group-hover:bg-abyss/35"
        />
        <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
          <span className="grid size-22 place-items-center rounded-full border border-white/40 glass transition-transform duration-700 ease-out-expo group-hover:scale-110">
            <Icon name="play" className="size-6 translate-x-0.5" />
          </span>
          <span className="eyebrow">{label}</span>
        </span>
      </button>
      <FilmDialog film={film} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
