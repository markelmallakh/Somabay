"use client";

import { useState } from "react";
import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { useGsap } from "@/hooks/useGsap";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Pillar = { title: string; description: string; image: ImageAsset };

type ApproachScrollProps = {
  /** The small label over the statement (also the section's heading for screen readers). */
  title: string;
  intro: string;
  pillars: Pillar[];
  /** The section's id, for in-page links. */
  id?: string;
  /** The heading's id; defaults to "approach-title". */
  headingId?: string;
  /** A fuller heading for screen readers, when the label alone is too short. */
  heading?: string;
  /** The section's background (defaults to the pale turquoise). */
  className?: string;
};

/**
 * "Our Approach" told as one scroll.
 *
 * First the title and its paragraph, centred, the words rising out of their lines; on large
 * screens they hold in place (sticky) until the pillars arrive beneath them, like the statement
 * on the About page.
 *
 * Then the pillars on a ruled three-column grid: the centre column holds the current pillar
 * (number, title, line) while a photo card for each pillar passes by in the side columns,
 * alternating right, left, right. As a card reaches the middle of the screen the centre text
 * changes to its pillar, rising in softly. Phones get each pillar with its photo, stacked.
 */
export function ApproachScroll({
  title,
  intro,
  pillars,
  id,
  headingId = "approach-title",
  heading,
  className = "bg-turquoise-5",
}: ApproachScrollProps) {
  const [active, setActive] = useState(0);

  const ref = useGsap<HTMLElement>(
    ({ scope, reducedMotion }) => {
      const cleanups: (() => void)[] = [];
      if (!reducedMotion) {
        const statement = scope.querySelector<HTMLElement>("[data-approach-intro]");
        if (statement) {
          const split = SplitText.create(statement, {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 110,
                duration: 1.5,
                stagger: 0.05,
                ease: "expo.out",
                scrollTrigger: { trigger: statement, start: "top 78%", once: true },
              });
            },
          });
          cleanups.push(() => split.revert());
        }
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-approach-card]", scope);
        const triggers = cards.map((card, index) =>
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (self) => {
              if (self.isActive) setActive(index);
            },
          }),
        );
        if (!reducedMotion) {
          // A strong parallax: each photo panel travels faster than the page as it passes, and
          // the picture inside drifts the other way.
          cards.forEach((card) => {
            const row = card.parentElement;
            const scrub = { trigger: row, start: "top bottom", end: "bottom top", scrub: true };
            gsap.fromTo(
              card,
              { yPercent: 28 },
              { yPercent: -28, ease: "none", scrollTrigger: scrub },
            );
            // Entrance: the panel grows from a smaller, rounder frame to full size as it rises
            // to the middle of the screen.
            gsap.fromTo(
              card,
              { scale: 0.72, borderRadius: "1.5rem" },
              {
                scale: 1,
                borderRadius: "0.25rem",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top bottom",
                  end: "center 55%",
                  scrub: true,
                },
              },
            );
            const media = card.querySelector("[data-approach-media]");
            if (media) {
              gsap.fromTo(
                media,
                { yPercent: -16 },
                { yPercent: 16, ease: "none", scrollTrigger: { ...scrub } },
              );
            }
          });
        }
        return () => triggers.forEach((trigger) => trigger.kill());
      });
      cleanups.push(() => mm.revert());
      return () => cleanups.forEach((cleanup) => cleanup());
    },
    [pillars.length],
  );

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      data-no-motion=""
      className={cn("relative scroll-mt-(--header-height) text-ink", className)}
    >
      {/* The title and paragraph, centred; sticky until the pillars arrive. */}
      <div className="mx-auto max-w-site px-gutter pt-section text-center">
        <div className="lg:sticky lg:top-[calc(var(--header-height)+14vh)]">
          <Eyebrow className="mx-auto">{title}</Eyebrow>
          <h2 id={headingId} className="sr-only">
            {heading ?? title}
          </h2>
          <p
            data-approach-intro
            className="mx-auto mt-6 max-w-[58rem] text-[clamp(1.5rem,1.05rem+1.25vw,2.25rem)] leading-[1.35] text-pretty"
          >
            {intro}
          </p>
        </div>
        <div aria-hidden className="hidden h-[42vh] lg:block" />
      </div>

      {/* Phones: each pillar with its photo. */}
      <ol className="flex flex-col gap-14 px-gutter py-section lg:hidden">
        {pillars.map((pillar) => (
          <li key={pillar.title} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md">
              <ResponsiveImage asset={pillar.image} sizes="100vw" fill />
            </div>
            <h3 className="font-serif text-heading-4">{pillar.title}</h3>
            <p className="text-body-md text-slate">{pillar.description}</p>
          </li>
        ))}
      </ol>

      {/* Desktop: ruled grid, the pillar held in the centre, photo cards passing at the sides. */}
      <div className="relative mx-auto hidden max-w-site lg:block">
        <div className="relative grid grid-cols-[1.75fr_minmax(0,1.3fr)_1.75fr]">
          {/* The centre text: one pillar at a time. */}
          <div
            className="col-start-2"
            // Spans every card's row, so the text stays pinned for the whole run.
            style={{ gridRow: `1 / span ${pillars.length}` }}
          >
            <div className="sticky top-0 flex h-svh items-center justify-center px-12 text-center">
              <ol className="relative h-[16rem] w-full">
                {pillars.map((pillar, index) => (
                  <li
                    key={pillar.title}
                    aria-current={index === active ? "true" : undefined}
                    className={cn(
                      "absolute inset-0 flex flex-col items-center justify-center gap-5 transition-[opacity,translate,filter] duration-700 ease-out-expo",
                      index === active
                        ? "blur-0 translate-y-0 opacity-100"
                        : index < active
                          ? "pointer-events-none -translate-y-6 opacity-0 blur-sm"
                          : "pointer-events-none translate-y-6 opacity-0 blur-sm",
                    )}
                  >
                    <h3 className="max-w-[16ch] font-serif text-[clamp(2.25rem,1.5rem+2.4vw,4rem)] leading-[1.06] text-balance">
                      {pillar.title}
                    </h3>
                    <p className="max-w-md text-body-md text-slate">{pillar.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* The photo cards: one per pillar, alternating right and left. */}
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              aria-hidden
              className={cn(
                "flex h-svh items-center px-gutter",
                index % 2 === 0 ? "col-start-3" : "col-start-1",
                index === 0 && "mt-[10svh]",
                index === pillars.length - 1 && "mb-[10svh]",
              )}
              style={{ gridRowStart: index + 1 }}
            >
              {/* A tall photo panel, as high as the screen allows below the header. */}
              <div
                data-approach-card
                className="relative h-[calc(100svh-var(--header-height)-4rem)] w-full overflow-hidden rounded-md will-change-transform"
              >
                <div data-approach-media className="absolute inset-x-0 -top-[18%] h-[136%]">
                  <ResponsiveImage asset={pillar.image} sizes="38vw" quality={85} fill />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
