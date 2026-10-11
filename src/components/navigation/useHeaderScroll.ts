"use client";

import { useEffect, useState } from "react";

type HeaderScrollState = {
  /** The page has scrolled past the top threshold. */
  scrolled: boolean;
  /** The visitor is scrolling down past the hide threshold. */
  hidden: boolean;
};

export function useHeaderScroll(threshold = 40, hideAfter = 480): HeaderScrollState {
  const [state, setState] = useState<HeaderScrollState>({ scrolled: false, hidden: false });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const goingDown = y > lastY + 2;
      const goingUp = y < lastY - 2;
      lastY = y;
      setState((previous) => {
        const scrolled = y > threshold;
        const hidden =
          y > hideAfter ? (goingDown ? true : goingUp ? false : previous.hidden) : false;
        return previous.scrolled === scrolled && previous.hidden === hidden
          ? previous
          : { scrolled, hidden };
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
