"use client";

import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { useGsap } from "@/hooks/useGsap";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Tile = {
  label: string;
  description: string;
  image: ImageAsset;
  /** A short note in a small pill above the title, in place of the number (e.g. opening hours). */
  meta?: string;
};

type DevelopmentSliderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  tiles: readonly Tile[];
  /** Set over the last photo once it has opened out to fill the screen. */
  quote?: { text: string; attribution: string };
  /** The section's id, for in-page links. */
  id?: string;
  /** The heading's id; defaults to "development-title". */
  headingId?: string;
  /** The section's background (defaults to white). */
  className?: string;
};

/**
 * "Sustainable Development" as a horizontal run of large photo panels. On large screens the
 * section pins and scrolling down slides the row sideways: the heading leads, then each panel
 * (a tall photo with its title and line on a soft shade) arrives from the right, its photo
 * settling from a zoom and its words rising in as it reaches the screen, while a thin line under
 * the row tracks progress. Phones and reduced motion get a swipeable row.
 */
export function DevelopmentSlider({
  eyebrow,
  title,
  description,
  tiles,
  quote,
  id,
  headingId = "development-title",
  className = "bg-white",
}: DevelopmentSliderProps) {
  const lastTile = tiles[tiles.length - 1];
  const ref = useGsap<HTMLElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const track = scope.querySelector<HTMLElement>("[data-track]");
        const finale = scope.querySelector<HTMLElement>("[data-finale]");
        const panels = gsap.utils.toArray<HTMLElement>("[data-panel]", scope);
        const last = panels[panels.length - 1];
        if (!track || !last) return;
        const media = finale?.querySelector<HTMLElement>("[data-finale-media]");
        const shade = finale?.querySelector<HTMLElement>("[data-finale-shade]");
        const words = finale?.querySelector<HTMLElement>("[data-finale-panel-copy]");
        const lines = finale
          ? gsap.utils.toArray<HTMLElement>("[data-finale-quote] > *", finale)
          : [];

        // Scroll lengths in pixels: the slide, the photo growing, the swap to the quote and a
        // short hold to read it. Re-measured whenever the page refreshes.
        let slide = 0;
        let grow = 0;
        let swap = 0;
        let hold = 0;
        let resting = { left: 0, top: 0, width: 0, height: 0 };
        const measure = () => {
          gsap.set(track, { x: 0 });
          slide = Math.max(0, track.scrollWidth - window.innerWidth);
          grow = finale ? window.innerHeight * 0.9 : 0;
          swap = finale ? window.innerHeight * 0.5 : 0;
          hold = finale ? window.innerHeight * 0.35 : 0;
          // Where the last panel rests once the row has slid home.
          const section = scope.getBoundingClientRect();
          const box = last.getBoundingClientRect();
          resting = {
            left: box.left - section.left - slide,
            top: box.top - section.top,
            width: box.width,
            height: box.height,
          };
        };
        const framed = () => {
          const side = Math.max(24, (window.innerWidth - 1512) / 2 + 60);
          return {
            left: side,
            top: 96,
            width: window.innerWidth - side * 2,
            height: window.innerHeight - 96 - 32,
          };
        };
        const clamp = gsap.utils.clamp(0, 1);
        const easeGrow = gsap.parseEase("power3.inOut");
        const easeSoft = gsap.parseEase("power2.out");

        const render = (scrolled: number) => {
          const width = window.innerWidth;
          // 1. The row slides sideways; each photo drifts and its words appear as it arrives.
          gsap.set(track, { x: -slide * clamp(scrolled / Math.max(1, slide)) });
          for (const panel of panels) {
            const box = panel.getBoundingClientRect();
            const progress = clamp((width - box.left) / (width + box.width));
            const panelMedia = panel.querySelector<HTMLElement>("[data-panel-media]");
            if (panelMedia) {
              gsap.set(panelMedia, {
                scale: 1.25 - 0.25 * Math.min(1, progress * 2),
                xPercent: 8 - 16 * progress,
              });
            }
            panel.toggleAttribute("data-shown", box.left < width * 0.72);
          }
          if (!finale || !media || !shade || !words) return;

          // 2. The last panel grows into a large frame, its words growing with it.
          const growing = clamp((scrolled - slide) / Math.max(1, grow));
          const g = easeGrow(growing);
          const to = framed();
          const box = {
            left: resting.left + (to.left - resting.left) * g,
            top: resting.top + (to.top - resting.top) * g,
            width: resting.width + (to.width - resting.width) * g,
            height: resting.height + (to.height - resting.height) * g,
          };
          gsap.set(finale, { ...box, autoAlpha: scrolled > slide ? 1 : 0 });
          gsap.set(media, { scale: 1.12 - 0.12 * g });
          gsap.set(track, { autoAlpha: 1 - clamp((growing - 0.15) / 0.4) });

          // 3. Once it has stopped growing, its words fade and the quote rises.
          const swapping = clamp((scrolled - slide - grow) / Math.max(1, swap));
          gsap.set(words, {
            scale: 1 + 0.45 * g,
            autoAlpha: 1 - clamp(swapping / 0.4),
            y: -12 * clamp(swapping / 0.4),
          });
          gsap.set(shade, { opacity: easeSoft(clamp(swapping / 0.5)) });
          lines.forEach((line, index) => {
            const p = easeSoft(clamp((swapping - 0.3 - index * 0.1) / 0.45));
            gsap.set(line, { autoAlpha: p, yPercent: 40 * (1 - p) });
          });
        };

        measure();
        const pin = ScrollTrigger.create({
          trigger: scope,
          start: "top top",
          end: () => `+=${slide + grow + swap + hold}`,
          pin: true,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          onUpdate: (self) => render(self.progress * (slide + grow + swap + hold)),
          onRefresh: (self) => render(self.progress * (slide + grow + swap + hold)),
        });
        render(0);
        return () => pin.kill();
      });
      return () => mm.revert();
    },
    [tiles.length],
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      data-no-motion=""
      className={cn("relative scroll-mt-(--header-height) overflow-hidden text-ink", className)}
    >
      <div className="flex flex-col gap-6 py-section sm:gap-10 lg:h-svh lg:justify-center lg:gap-0 lg:py-0 lg:pt-(--header-bar)">
        {/* Phones and tablets: the heading sits above the swipe row. */}
        <div className="flex flex-col gap-2 px-gutter lg:hidden">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h2 id={headingId} className="text-heading-2">
            {title}
          </h2>
          {description ? <p className="mt-1 text-body-md text-slate">{description}</p> : null}
        </div>
        <div className="px-gutter lg:contents">
          <div
            data-track
            className="max-sm:swipe-row-half sm:max-lg:swipe-row lg:flex lg:w-max lg:items-center lg:gap-6 lg:ps-site lg:pe-[8vw] lg:will-change-transform md:max-lg:[&>article]:w-[46vw]"
          >
            {/* Large screens: the heading leads the row. */}
            <div className="hidden shrink-0 flex-col justify-center gap-3 lg:flex lg:w-[30vw] lg:pr-10">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              <p
                role="heading"
                aria-level={2}
                className="font-serif text-[clamp(2.25rem,1.5rem+2.6vw,4.25rem)] leading-[1.05]"
              >
                {title}
              </p>
              {description ? <p className="text-body-md text-slate">{description}</p> : null}
            </div>

            {tiles.map((tile, index) => (
              <article
                key={tile.label}
                data-panel
                className="relative aspect-[4/5] overflow-hidden rounded-md lg:aspect-auto lg:h-[min(72svh,46rem)] lg:w-[min(46vw,44rem)] lg:shrink-0"
              >
                <div data-panel-media className="absolute -inset-x-[10%] inset-y-0">
                  <ResponsiveImage
                    asset={tile.image}
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 46vw, (min-width: 640px) 84vw, 62vw"
                    quality={85}
                    fill
                  />
                </div>
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.7)_0%,rgb(0_0_0/0.25)_38%,rgb(0_0_0/0)_60%)]"
                />
                <div
                  data-panel-copy
                  className="absolute inset-x-3.5 bottom-3.5 flex flex-col gap-1.5 text-white sm:inset-x-5 sm:bottom-5 sm:gap-2.5 md:inset-x-8 md:bottom-8 lg:[&>*]:translate-y-6 lg:[&>*]:opacity-0 lg:[&>*]:transition-[opacity,translate] lg:[&>*]:duration-1000 lg:[&>*]:ease-out-expo lg:[[data-shown]_&>*]:translate-y-0 lg:[[data-shown]_&>*]:opacity-100"
                >
                  {/* A tile with a note (e.g. hours) shows it above the title in place of the number. */}
                  {tile.meta ? (
                    <span className="w-fit rounded-full bg-sun px-2.5 py-1 text-[0.625rem] font-semibold tracking-label text-ink uppercase sm:px-3.5 sm:py-1.5 sm:text-body-xs">
                      {tile.meta}
                    </span>
                  ) : (
                    <span className="text-body-xs font-semibold tracking-label text-sun uppercase tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                  <h3 className="font-serif text-body-lg leading-[1.15] sm:text-heading-4 sm:leading-[1.1]">
                    {tile.label}
                  </h3>
                  <p className="max-w-md text-white/85 max-sm:line-clamp-3 max-sm:text-body-xs max-sm:leading-snug sm:text-body-md">
                    {tile.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
        {/* Phones and tablets: the closing quote under the row (large screens grow it out of the
            last panel). */}
        {quote ? (
          <figure aria-hidden className="px-gutter pt-4 text-center lg:hidden">
            <span className="block font-serif text-[4rem] leading-[0.6] text-turquoise">“</span>
            <p className="mx-auto mt-2 max-w-[24ch] font-serif text-heading-3 text-balance">
              {quote.text}
            </p>
            <figcaption className="mt-4 text-body-xs font-semibold tracking-label text-slate uppercase">
              {quote.attribution}
            </figcaption>
          </figure>
        ) : null}
      </div>

      {/* Finale (large screens): once the row has slid home, the last panel (photo and words)
          grows from where it rests into a large frame; when it stops, its words fade and a quote
          rises in their place. */}
      {quote ? (
        <div
          data-finale
          aria-hidden
          className="invisible absolute z-10 hidden overflow-hidden rounded-md text-white lg:block"
        >
          <div data-finale-media className="absolute inset-0">
            <ResponsiveImage asset={lastTile.image} sizes="100vw" quality={85} fill />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.7)_0%,rgb(0_0_0/0.25)_38%,rgb(0_0_0/0)_60%)]" />
          <div
            data-finale-shade
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.3),rgb(0_0_0/0.55))] opacity-0"
          />
          {/* The panel's own words, growing with the photo. */}
          <div
            data-finale-panel-copy
            className="absolute bottom-8 left-8 flex max-w-md origin-bottom-left flex-col gap-3"
          >
            <span className="text-body-xs font-semibold tracking-label text-sun uppercase tabular-nums">
              {String(tiles.length).padStart(2, "0")}
            </span>
            <span className="font-serif text-heading-4 leading-[1.1]">{lastTile.label}</span>
            <span className="text-body-md text-white/85">{lastTile.description}</span>
          </div>
          <div
            data-finale-quote
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-gutter text-center"
          >
            <span className="font-serif text-[6rem] leading-[0.4] text-sun">“</span>
            <p className="max-w-[24ch] font-serif text-[clamp(2.25rem,1.4rem+2.6vw,4.25rem)] leading-[1.12] text-balance">
              {quote.text}
            </p>
            <p className="text-body-xs font-semibold tracking-label text-white/80 uppercase">
              {quote.attribution}
            </p>
          </div>
        </div>
      ) : null}
      {/* The quote as text for screen readers (the visual one is decorative motion). */}
      {quote ? (
        <blockquote className="sr-only">
          <p>{quote.text}</p>
          <footer>{quote.attribution}</footer>
        </blockquote>
      ) : null}
    </section>
  );
}
