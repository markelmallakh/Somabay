"use client";

import SideRays from "@/components/backgrounds/SideRays";
import { AnimatePresence, m } from "framer-motion";
import {
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
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
 * Guest Reviews as a looping carousel with the open review always in the centre, on light
 * turquoise with sun-yellow rays. Every card is white: the open one solid, the rest a touch see-through, each teasing the first line
 * of its review. The arrows (or the arrow keys, a swipe or a click on any card) move round the loop.
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
  // Swipe with the cursor (or a finger): a horizontal drag of 40px or more steps the loop, and the
  // click that ends the drag is swallowed so it doesn't also open a card.
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = { x: event.clientX, moved: false };
    setDragging(true);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (start && Math.abs(event.clientX - start.x) > 8) start.moved = true;
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    setDragging(false);
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) >= 40) go(dx < 0 ? 1 : -1);
    // Keep the "moved" flag until the click that follows has been swallowed.
    window.setTimeout(() => {
      drag.current = null;
    }, 0);
  };
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (drag.current?.moved) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
    else return;
    event.preventDefault();
  };

  const slots = Array.from({ length: REACH * 2 + 1 }, (_, index) => cursor - REACH + index);

  const arrow =
    "grid size-11 place-items-center rounded-md border border-white text-white transition-colors duration-500 hover:bg-white hover:text-turquoise-160";

  return (
    <Section
      tone="white"
      className="isolate overflow-hidden bg-turquoise-40 text-ink"
      aria-labelledby="reviews-title"
    >
      {/* Sun-yellow light raking in from the top corner over light turquoise (React Bits "Side
          Rays"), blended with "screen" so it only ever brightens: no dark shading. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 mix-blend-screen">
        <SideRays
          rayColor1="#ffe28a"
          rayColor2="#ffc222"
          blend={0.55}
          origin="top-right"
          speed={1.6}
          intensity={1.7}
          spread={2.3}
          density={5}
          sharpness={0.45}
          falloff={1.3}
          glow={0.9}
          dust={0.2}
          mouseInfluence={0.35}
        />
      </div>
      <Container>
        <Reveal>
          <h2 id="reviews-title" className="text-center text-heading-2 text-white">
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
          setDragging(false);
        }}
        onClickCapture={onClickCapture}
        className={cn(
          "relative mt-6 h-[15.5rem] touch-pan-y overflow-hidden rounded-md select-none sm:mt-12 lg:mt-14",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
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

      {/* Phones swipe the cards (both neighbours peek in); the arrows are for larger screens. */}
      <div className="mt-8 hidden justify-center gap-2 md:flex">
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
