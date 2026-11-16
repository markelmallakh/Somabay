"use client";

import { m, useInView } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import { routes } from "@/config/routes";
import { thingsToDoIntro } from "@/content/home";
import { image } from "@/lib/media";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

/** Slides from the Figma "Things To Do — Option 4" (401:19992). */
const slides = [
  {
    slug: "beaches-and-adventure",
    title: "Beaches & Adventure",
    tagline: "Sand, sun and a little thrill",
    image: image(
      "/images/things-to-do/ttd-beaches.webp",
      "A family building sandcastles beside a kayak",
    ),
  },
  {
    slug: "golf",
    title: "Golf",
    tagline: "Championship courses by the sea",
    image: image("/images/things-to-do/ttd-golf.webp", "A seaside green glowing at sunset"),
    href: routes.activity("golf"),
  },
  {
    slug: "spa-and-thalasso",
    title: "Spa & Thalasso",
    tagline: "Unwind with the healing sea",
    image: image("/images/things-to-do/ttd-spa.webp", "A calm spa lounge"),
  },
  {
    slug: "watersports-and-diving",
    title: "Watersports & Diving",
    tagline: "Reefs, kites and open water",
    image: image(
      "/images/things-to-do/ttd-watersports.webp",
      "Turquoise water washing over the reef",
    ),
  },
  {
    slug: "sports",
    title: "Sports",
    tagline: "Courts, fields and padel",
    image: image(
      "/images/things-to-do/ttd-sports.webp",
      "Two players shaking hands on a padel court",
    ),
  },
  {
    slug: "habitat",
    title: "Habitat",
    tagline: "Nature up close",
    image: image(
      "/images/things-to-do/ttd-habitat.webp",
      "Aerial view of the peninsula and its lagoons",
    ),
  },
  {
    slug: "playpark",
    title: "Playpark",
    tagline: "Fun for little ones",
    image: image("/images/things-to-do/ttd-playpark.webp", "A long table set by the sea"),
  },
];

/** Card size steps outward from the active slide (Figma 400×480 / 220 × 240·300·340, scaled to fit under the header). */
const SIZES = [
  { w: 30, h: 26 },
  { w: 12, h: 13 },
  { w: 12, h: 16.25 },
  { w: 12, h: 18.5 },
];
const GAP = 1;

/** Horizontal centre (rem from the row's middle) of the card `offset` steps from the active one. */
function centreX(offset: number) {
  const distance = Math.abs(offset);
  if (distance === 0) return 0;
  const first = SIZES[0].w / 2 + GAP + SIZES[1].w / 2;
  return Math.sign(offset) * (first + (distance - 1) * (SIZES[1].w + GAP));
}

const wrap = (value: number, count: number) => {
  const half = Math.floor(count / 2);
  return ((((value + half) % count) + count) % count) - half;
};

/** Title letters rise out of a mask one after another. */
function SplitTitle({
  text,
  show,
  delay,
  className,
}: {
  text: string;
  show: boolean;
  delay: number;
  className?: string;
}) {
  return (
    <span aria-hidden className={cn("-mb-[0.12em] block overflow-hidden pb-[0.12em]", className)}>
      {Array.from(text).map((char, index) => (
        <m.span
          key={index}
          className="inline-block whitespace-pre"
          initial={{ y: "110%" }}
          animate={show ? { y: "0%" } : { y: "110%" }}
          transition={{ duration: 1.1, ease: easeOutExpo, delay: delay + index * 0.05 }}
        >
          {char}
        </m.span>
      ))}
    </span>
  );
}

const GOLF = slides.findIndex((slide) => slide.slug === "golf");

/*
 * The row renders three copies of the slides so there are always cards waiting beyond both
 * edges of the screen: cards glide in and out of view, and the one that loops round from one
 * end to the other does so off-screen.
 */
const LOOP = slides.length * 3;
const track = Array.from({ length: LOOP }, (_, index) => ({
  index,
  slide: slides[index % slides.length],
}));

/**
 * Figma "Things / To Do": a giant split title around a centred slider. On entry the title
 * writes itself in, then the cards rise from the centre outward, then the copy. Each card keeps
 * its identity as the row turns, so moving glides every card to its new slot while it grows or
 * shrinks; the active photo also eases out of a slight zoom.
 */
export function ThingsToDoSection() {
  // `position` counts steps taken (it can grow or go negative); the active card sits there.
  const [state, setState] = useState({
    position: GOLF + slides.length,
    previous: GOLF + slides.length,
  });
  const { position, previous } = state;
  const ref = useRef<HTMLElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.35 });

  const step = useCallback(
    (by: number) =>
      setState((current) => ({ position: current.position + by, previous: current.position })),
    [],
  );

  return (
    <section
      ref={ref}
      aria-labelledby="things-title"
      data-theme-surface="light"
      className="relative overflow-hidden bg-sand-100 py-section text-ink"
    >
      <Container>
        <div className="flex flex-col gap-2">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, ease: easeOutExpo }}
          >
            <Eyebrow>{thingsToDoIntro.eyebrow}</Eyebrow>
          </m.div>
          <h2
            id="things-title"
            className="font-serif text-[clamp(3.25rem,8vw,7.5rem)] leading-[1.2]"
          >
            <span className="sr-only">Things To Do</span>
            <SplitTitle text="Things" show={shown} delay={0.05} />
          </h2>
        </div>
      </Container>

      <div className="relative -mt-[clamp(1rem,1.5vw,1.5rem)] h-[26rem]">
        {track.map(({ index, slide }) => {
          const offset = wrap(index - position, LOOP);
          const before = wrap(index - previous, LOOP);
          const distance = Math.abs(offset);
          const current = offset === 0;
          // The card looping round (always off-screen) jumps instead of flying across.
          const jumps = Math.abs(offset - before) > LOOP / 2;
          const size = SIZES[Math.min(distance, SIZES.length - 1)];
          return (
            <Link
              key={index}
              href={slide.href ?? routes.activity(slide.slug)}
              tabIndex={current ? 0 : -1}
              aria-hidden={!current || undefined}
              onClick={(event) => {
                if (!current) {
                  event.preventDefault();
                  step(offset);
                }
              }}
              style={
                {
                  width: `${size.w}rem`,
                  height: `${size.h}rem`,
                  transform: `translate(calc(-50% + ${centreX(offset)}rem), -50%)`,
                  zIndex: 10 - distance,
                } as CSSProperties
              }
              className={cn(
                "group absolute top-1/2 left-1/2 text-white",
                jumps
                  ? "transition-none"
                  : "transition-[transform,width,height] duration-[1100ms] ease-out-expo",
              )}
            >
              <m.span
                className="absolute inset-0 block overflow-hidden rounded-md"
                initial={{ opacity: 0, y: 90, scale: 0.88 }}
                animate={shown ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{
                  duration: 1.3,
                  ease: easeOutExpo,
                  delay: 0.55 + Math.min(distance, 4) * 0.1,
                }}
              >
                <span
                  className={cn(
                    "absolute inset-0 block transition-transform duration-[1400ms] ease-out-expo",
                    current ? "scale-100" : "scale-[1.18]",
                  )}
                >
                  <ResponsiveImage
                    asset={slide.image}
                    sizes="(min-width: 768px) 480px, 100vw"
                    fill
                    className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                  />
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-700",
                    current ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                />
                <span
                  className={cn(
                    "absolute flex flex-col gap-1 transition-[opacity,translate] duration-700 ease-out-expo",
                    current
                      ? "inset-x-6 bottom-6 translate-y-0 pr-14 opacity-100 delay-300"
                      : "inset-x-4 bottom-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                  )}
                >
                  <span className={cn("font-serif", current ? "text-heading-5" : "text-body-lg")}>
                    {slide.title}
                  </span>
                  {current && <span className="text-body-sm text-white/80">{slide.tagline}</span>}
                </span>
                {current && (
                  <span
                    aria-hidden
                    className="absolute right-6 bottom-6 grid size-11 scale-75 place-items-center rounded-full bg-turquoise text-white opacity-0 transition-[opacity,scale] duration-700 ease-out-expo group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                  >
                    <Icon name="arrow-chip" strokeWidth={1.4} className="size-6" />
                  </span>
                )}
              </m.span>
            </Link>
          );
        })}
      </div>

      <Container className="relative -mt-[clamp(0rem,1vw,0.75rem)] grid items-end gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <m.div
          className="flex max-w-[22.5rem] flex-col gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: easeOutExpo, delay: 1.15 }}
        >
          <p className="text-body-md text-slate">{thingsToDoIntro.description}</p>
          <div>
            <Button href={routes.thingsToDo} variant="primary" icon="arrow-up-right">
              {thingsToDoIntro.cta.label}
            </Button>
          </div>
        </m.div>
        <m.div
          className="flex gap-2 self-center lg:-translate-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={shown ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: easeOutExpo, delay: 1.25 }}
        >
          <button
            type="button"
            onClick={() => step(-1)}
            className="wave grid size-12 place-items-center rounded-md border border-ink/15 transition-colors duration-500 hover:border-turquoise hover:text-white"
          >
            <span className="sr-only">Previous activity</span>
            <Icon name="arrow-right" className="size-5 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="wave grid size-12 place-items-center rounded-md border border-ink/15 text-ink transition-colors duration-500 hover:border-turquoise hover:text-white"
          >
            <span className="sr-only">Next activity</span>
            <Icon name="arrow-right" className="size-5" />
          </button>
        </m.div>
        <p className="font-serif text-[clamp(3.25rem,8vw,7.5rem)] leading-[1.2] lg:text-right">
          <SplitTitle text="To Do" show={shown} delay={0.2} />
        </p>
      </Container>
    </section>
  );
}
