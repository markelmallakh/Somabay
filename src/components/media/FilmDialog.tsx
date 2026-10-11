"use client";

import type { VideoAsset } from "@/types/media";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";

type FilmDialogProps = {
  film: VideoAsset;
  open: boolean;
  onClose: () => void;
};

/** Plays a film with sound in a modal. Playback starts only because the visitor asked for it. */
export function FilmDialog({ film, open, onClose }: FilmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} label={film.label} className="bg-black/92">
      <div className="flex h-full flex-col items-center justify-center px-gutter">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 grid size-12 place-items-center text-white"
          aria-label="Close film"
        >
          <Icon name="close" className="size-8 stroke-1" />
        </button>
        <video
          className="aspect-video max-h-[80vh] w-full max-w-6xl bg-black"
          controls
          autoPlay
          playsInline
          preload="auto"
          poster={film.poster.src}
          aria-label={film.label}
        >
          {film.sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} media={source.media} />
          ))}
        </video>
      </div>
    </Dialog>
  );
}
