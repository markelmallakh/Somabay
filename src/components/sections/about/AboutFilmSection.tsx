"use client";

import { useState } from "react";
import { about } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FilmDialog } from "@/components/media/FilmDialog";
import { Video } from "@/components/media/Video";
import { Icon } from "@/components/ui/Icon";

/**
 * Figma About film card (492:17918): the Somabay campaign film plays silently in a rounded frame;
 * the small white "Watch video" chip at the bottom left opens it in full with sound.
 */
export function AboutFilmSection() {
  const [open, setOpen] = useState(false);
  return (
    <section aria-label="Somabay film" className="bg-white pb-12 sm:pb-20">
      <Container>
        {/* No parallax: the drift scales and shifts the video layer, which carried its pause button
            off the frame's edge. */}
        <ImageReveal
          parallax={0}
          className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[1392/760]"
        >
          <Video
            // The real campaign film, silent here; Play video opens it with sound.
            asset={{ ...about.film, hasAudio: false }}
            playback="in-view"
            sizes="(min-width: 1512px) 1392px, 100vw"
            showToggle
            toggleClassName="bottom-3 right-3 left-auto size-9 sm:bottom-6 sm:right-6 sm:size-10"
            className="absolute inset-0 size-full"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Watch video: ${about.film.label}`}
            className="wave absolute bottom-3 left-3 flex min-h-9 items-center gap-1.5 rounded-md bg-white px-3 py-2 text-body-xs leading-none font-medium tracking-label text-turquoise uppercase shadow-float transition-[color,scale] duration-500 ease-out-expo hover:scale-105 hover:text-white sm:bottom-6 sm:left-6 sm:min-h-0 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-body-sm"
          >
            <Icon name="play" className="size-3 sm:size-3.5" />
            Watch video
          </button>
        </ImageReveal>
      </Container>
      <FilmDialog film={about.film} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
