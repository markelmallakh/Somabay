"use client";

import Grainient from "@/components/backgrounds/Grainient";
import { AnimatePresence, m } from "framer-motion";
import { type KeyboardEvent, useEffect, useState } from "react";
import type { HotelReview } from "@/types/content";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { easeOutExpo } from "@/components/animations/easing";
import { Icon } from "@/components/ui/Icon";

/** Cards either side of the centre that stay rendered (the rest are off screen). */
const REACH = 3;
const GAP = 16;

/** On the orange ground every card is white: the open one solid, the rest a touch see-through. */
const CARD_OPEN = "rgba(255, 255, 255, 1)";
const CARD_REST = "rgba(255, 255, 255, 0.86)";

const wrap = (value: number, length: number) => ((value % length) + length) % length;

/**
 * Guest Reviews as a looping carousel with the open review always in the centre, on a deep
 * orange ground. Every card is white: the open one solid, the rest a touch see-through, each teasing the first line
 * of its review. The arrows (or the arrow keys, or a click on any card) move round the loop.
 */
export function GuestReviews({ reviews }: { reviews: HotelReview[] }) {
  // An ever-growing position, so stepping past the last review carries straight on to the first.
  const [cursor, setCursor] = useState(0);
  const [cardWidth, setCardWidth] = useState(352);
  const count = reviews.length;

  useEffect(() => {
    const measure = () => setCardWidth(Math.min(window.innerWidth * 0.8, 352));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const step = cardWidth + GAP;
  const go = (delta: number) => setCursor((value) => value + delta);
  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
    else return;
    event.preventDefault();
  };

  const slots = Array.from({ length: REACH * 2 + 1 }, (_, index) => cursor - REACH + index);

  const arrow =
    "grid size-11 place-items-center rounded-md border border-white/60 text-white transition-colors duration-500 hover:border-white hover:bg-white hover:text-deep-orange";

  return (
    <Section
      tone="white"
      className="isolate overflow-hidden bg-deep-orange text-white"
      aria-labelledby="reviews-title"
    >
      {/* A slow, grainy orange gradient drifting behind everything (React Bits "Grainient"),
          so the orange reads soft and deep rather than flat and bright. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Grainient
          colors={["#c9580f", "#e06a18", "#f58025", "#f79a52", "#fbc08c"]}
          angle={55}
          flow={0.8}
          silk={0.3}
          grainAmount={0.06}
          contrast={0.9}
          interactive={false}
          clickSwirl={false}
        />
      </div>
      <Container>
        <Reveal>
          <h2 id="reviews-title" className="text-center text-heading-2">
            Guest Reviews
          </h2>
        </Reveal>
      </Container>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Guest reviews"
        tabIndex={0}
        onKeyDown={onKey}
        className="relative mt-12 h-[15.5rem] overflow-hidden rounded-md lg:mt-14"
      >
        <AnimatePresence initial={false}>
          {slots.map((position) => {
            const offset = position - cursor;
            const review = reviews[wrap(position, count)];
            const open = offset === 0;
            return (
              <m.button
                key={position}
                type="button"
                onClick={() => go(offset)}
                aria-current={open ? "true" : undefined}
                aria-label={open ? undefined : `Read the review by ${review.author}`}
                initial={{
                  x: offset * step,
                  opacity: 0,
                  height: open ? "100%" : "auto",
                  scale: open ? 1 : 0.97,
                  backgroundColor: open ? CARD_OPEN : CARD_REST,
                }}
                // Slide first; then the card arriving in the centre springs open, lifts a touch
                // and fills with colour, while the one leaving settles back to its teaser.
                animate={{
                  x: offset * step,
                  opacity: Math.abs(offset) > 2 ? 0 : 1,
                  height: open ? "100%" : "auto",
                  scale: open ? 1 : 0.97,
                  backgroundColor: open ? CARD_OPEN : CARD_REST,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  x: { duration: 0.8, ease: easeOutExpo },
                  opacity: { duration: 0.5 },
                  height: open
                    ? { type: "spring", stiffness: 140, damping: 20, delay: 0.18 }
                    : { duration: 0.45, ease: easeOutExpo },
                  scale: { duration: 0.9, ease: easeOutExpo, delay: open ? 0.15 : 0 },
                  backgroundColor: { duration: 0.6, delay: open ? 0.12 : 0 },
                }}
                style={{ width: cardWidth, marginLeft: -cardWidth / 2, originY: 0 }}
                className={cn(
                  "absolute top-0 left-1/2 flex flex-col overflow-hidden rounded-md p-6 text-left transition-colors duration-500",
                  "text-ink",
                  !open && "hover:brightness-[0.98]",
                )}
              >
                <span className="flex items-center gap-1.5 self-end text-body-xs font-semibold tabular-nums">
                  <Icon name="star" className="size-3.5 text-deep-orange" />
                  {review.rating}/5
                  <span className="sr-only"> stars</span>
                </span>
                <span className="mt-6 font-serif text-heading-6 leading-tight">
                  {review.author}
                </span>
                {/* The teaser fades out and the full review fades up as the card opens. */}
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={open ? "full" : "teaser"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: easeOutExpo, delay: open ? 0.3 : 0.05 },
                    }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                    className={cn(
                      "mt-3 text-body-md leading-relaxed",
                      open ? "line-clamp-5 text-slate" : "line-clamp-1 text-slate",
                    )}
                  >
                    “{review.quote}”
                  </m.span>
                </AnimatePresence>
              </m.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <button type="button" onClick={() => go(-1)} className={arrow}>
          <span className="sr-only">Previous review</span>
          <Icon name="arrow-right" className="size-5 rotate-180" />
        </button>
        <button type="button" onClick={() => go(1)} className={arrow}>
          <span className="sr-only">Next review</span>
          <Icon name="arrow-right" className="size-5" />
        </button>
      </div>
    </Section>
  );
}
