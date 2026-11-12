"use client";

import { AnimatePresence, m } from "framer-motion";
import { type KeyboardEvent, useState } from "react";
import { HeadingRow } from "@/components/layout/HeadingRow";
import type { SectionIntro } from "@/types/content";
import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

type Milestone = { year: string; title: string; description: string; image: ImageAsset };

type TimelineSectionProps = {
  intro: SectionIntro;
  milestones: Milestone[];
};

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Option A (kept for comparison; not used): milestones as one featured chapter at a time: a large photo that wipes to the next phase, the
 * year set huge in turquoise serif beside the story, prev / next arrows with a "02 / 05" counter,
 * and a year rail underneath whose line fills up to the selected phase.
 */
export function TimelineSpotlight({ intro, milestones }: TimelineSectionProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const last = milestones.length - 1;
  const current = milestones[active];
  const numeric = /^\d+$/.test(current.year);

  const goTo = (index: number) => {
    const next = Math.min(Math.max(index, 0), last);
    if (next === active) return;
    setDirection(next > active ? 1 : -1);
    setActive(next);
  };

  const onRailKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") goTo(active + 1);
    else if (event.key === "ArrowLeft") goTo(active - 1);
    else return;
    event.preventDefault();
  };

  const arrow =
    "wave grid size-12 place-items-center rounded-md border border-ink/15 text-ink transition-colors duration-500 hover:border-turquoise hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <section aria-labelledby="timeline-title" className="overflow-hidden bg-turquoise-5 py-30">
      <Container>
        <HeadingRow
          id="timeline-title"
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
        />

        {/* Featured chapter */}
        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-stretch lg:gap-x-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-turquoise-10 lg:col-span-7 lg:aspect-auto lg:min-h-[32rem]">
            <AnimatePresence initial={false} custom={direction}>
              <m.div
                key={current.year}
                custom={direction}
                className="absolute inset-0"
                initial={{ clipPath: direction > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 1, transition: { duration: 1 } }}
                transition={{ duration: 1, ease: easeOutExpo }}
              >
                <m.div
                  className="absolute inset-0"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: easeOutExpo }}
                >
                  <ResponsiveImage
                    asset={current.image}
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    quality={85}
                    fill
                  />
                </m.div>
              </m.div>
            </AnimatePresence>
            <span className="absolute bottom-5 left-5 rounded-md bg-black/35 px-3 py-2 text-body-xs font-medium tracking-[0.14em] text-white tabular-nums backdrop-blur-md">
              {pad(active + 1)} / {pad(milestones.length)}
            </span>
          </div>

          <div className="flex flex-col justify-between gap-10 lg:col-span-4 lg:col-start-9">
            <div aria-live="polite" className="relative">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <m.div
                  key={current.year}
                  custom={direction}
                  initial={{ opacity: 0, y: direction * 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction * -16 }}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="flex flex-col gap-5"
                >
                  <p
                    className={cn(
                      "font-serif leading-none text-turquoise",
                      numeric ? "text-[6rem] md:text-[8.5rem]" : "text-[3.5rem] md:text-[5rem]",
                    )}
                  >
                    {current.year}
                  </p>
                  <h3 className="font-serif text-heading-4 leading-[1.2]">{current.title}</h3>
                  <p className="text-body-lg text-slate">{current.description}</p>
                </m.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                className={arrow}
              >
                <span className="sr-only">Previous milestone</span>
                <Icon name="arrow-right" className="size-5 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                disabled={active === last}
                className={arrow}
              >
                <span className="sr-only">Next milestone</span>
                <Icon name="arrow-right" className="size-5" />
              </button>
              {active < last ? (
                <span className="ml-3 text-body-sm text-slate">
                  Next: <span className="text-ink">{milestones[active + 1].year}</span>
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Year rail */}
        <div
          role="tablist"
          aria-label="Milestones"
          onKeyDown={onRailKey}
          className="relative mt-14 grid lg:mt-16"
          style={{ gridTemplateColumns: `repeat(${milestones.length}, minmax(0, 1fr))` }}
        >
          <span aria-hidden className="absolute inset-x-0 top-[5px] h-px bg-ink/12" />
          <span
            aria-hidden
            className="absolute top-[5px] left-0 h-px bg-turquoise transition-[width] duration-700 ease-out-expo"
            style={{
              width: `${(active / milestones.length) * 100}%`,
            }}
          />
          {milestones.map((milestone, index) => {
            const selected = index === active;
            const reached = index <= active;
            return (
              <button
                key={milestone.year}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => goTo(index)}
                className="group relative flex flex-col items-start gap-4 pr-4 text-left"
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 size-[11px] rounded-full border transition-[background-color,border-color,box-shadow] duration-500",
                    selected
                      ? "border-turquoise bg-turquoise shadow-[0_0_0_6px_rgb(0_178_186/0.18)]"
                      : reached
                        ? "border-turquoise bg-turquoise"
                        : "border-ink/30 bg-turquoise-5 group-hover:border-turquoise",
                  )}
                />
                <span className="flex flex-col gap-1">
                  <span
                    className={cn(
                      "font-serif text-heading-6 leading-none transition-colors duration-500",
                      selected ? "text-turquoise-160" : "text-ink/45 group-hover:text-ink",
                    )}
                  >
                    {milestone.year}
                  </span>
                  <span
                    className={cn(
                      "text-body-xs transition-colors duration-500 max-md:hidden",
                      selected ? "text-ink" : "text-slate/70",
                    )}
                  >
                    {milestone.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
