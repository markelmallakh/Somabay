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
    <section aria-label="Somabay film" className="bg-white pb-20">
      <Container>
        <ImageReveal className="relative aspect-[1392/760] overflow-hidden rounded-md">
          <Video
            // The real campaign film, silent here; Play video opens it with sound.
            asset={{ ...about.film, hasAudio: false }}
            playback="in-view"
            sizes="(min-width: 1512px) 1392px, 100vw"
            showToggle
            toggleClassName="bottom-6 right-6 left-auto"
            className="absolute inset-0 size-full"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Watch video: ${about.film.label}`}
            className="group wave absolute bottom-6 left-6 flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-body-sm leading-none font-medium tracking-label text-turquoise uppercase shadow-float transition-[color,scale] duration-500 ease-out-expo hover:scale-105 hover:text-white"
          >
            <Icon name="play" className="size-3.5" />
            Watch video
          </button>
        </ImageReveal>
      </Container>
      <FilmDialog film={about.film} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
