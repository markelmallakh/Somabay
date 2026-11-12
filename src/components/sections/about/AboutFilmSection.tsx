"use client";

import { useState } from "react";
import { about } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { FilmDialog } from "@/components/media/FilmDialog";
import { Video } from "@/components/media/Video";
import { Icon } from "@/components/ui/Icon";

/**
 * Figma About film card (492:17918): the top-down shore loop plays silently in a rounded frame;
 * the white "Play video" chip opens the full Somabay film with sound.
 */
export function AboutFilmSection() {
  const [open, setOpen] = useState(false);
  return (
    <section aria-label="Somabay film" className="bg-white pb-20">
      <Container>
        <ImageReveal className="relative aspect-[1392/760] overflow-hidden rounded-3xl lg:rounded-[2rem]">
          <Video
            asset={about.ambient}
            playback="in-view"
            sizes="(min-width: 1512px) 1392px, 100vw"
            showToggle
            toggleClassName="bottom-6 left-6"
            className="absolute inset-0 size-full"
          />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Play video: ${about.film.label}`}
            className="group wave absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-md bg-white px-8 py-3 text-[1.25rem] leading-[1.3] text-turquoise uppercase shadow-[0_8px_24px_rgb(18_58_70/0.18)] transition-[color,scale] duration-500 ease-out-expo hover:scale-105 hover:text-white"
          >
            <Icon name="play" className="size-4" />
            Play video
          </button>
        </ImageReveal>
      </Container>
      <FilmDialog film={about.film} open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
