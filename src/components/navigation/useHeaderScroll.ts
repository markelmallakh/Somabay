"use client";

import { useEffect, useState } from "react";

type HeaderScrollState = {
  /** The page has scrolled past the top threshold. */
  scrolled: boolean;
  /** The visitor is scrolling down past the hide threshold. */
  hidden: boolean;
  /** The last scroll movement was upward (the visitor is heading back up the page). */
  up: boolean;
};

/** How far the visitor must scroll the other way before `up` flips, so small jitters don't. */
const TURN = 48;

/**
 * Where the header should change. Over a sticky hero (it holds while the content scrolls up over
 * it) that is the moment the content's top edge reaches the foot of the header; elsewhere the
 * usual small threshold.
 */
function changePoint(threshold: number) {
  const hero = document.querySelector<HTMLElement>("#main-content [data-sticky-hero]");
  if (!hero) return threshold;
  // The header's full height (with its tabs row): it folds once it changes, and measuring it
  // then would move the point and make it flicker back and forth.
  const header = document.querySelector<HTMLElement>("header");
  fullHeader = Math.max(fullHeader, header?.offsetHeight ?? 0);
  return Math.max(threshold, hero.offsetHeight - fullHeader);
}
let fullHeader = 0;

export function useHeaderScroll(threshold = 40, hideAfter = 480): HeaderScrollState {
  const [state, setState] = useState<HeaderScrollState>({
    scrolled: false,
    hidden: false,
    up: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    // Where the current scroll direction started.
    let turnY = lastY;
    let heading: "up" | "down" = "down";
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      lastY = y;
      if (goingUp && heading === "down") {
        heading = "up";
        turnY = y;
      } else if (goingDown && heading === "up") {
        heading = "down";
        turnY = y;
      }
      const travelled = Math.abs(y - turnY);
      setState((previous) => {
        const scrolled = y > changePoint(threshold);
        const hidden =
          y > hideAfter ? (goingDown ? true : goingUp ? false : previous.hidden) : false;
        const up = travelled >= TURN ? heading === "up" : previous.up;
        return previous.scrolled === scrolled && previous.hidden === hidden && previous.up === up
          ? previous
          : { scrolled, hidden, up };
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [threshold, hideAfter]);

  return state;
}
