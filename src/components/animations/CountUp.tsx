"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Counts the leading number of a figure such as "10M" or "5 Districts" up from zero the
 * first time it scrolls into view; the rest of the text stays as written. Screen readers get
 * the final value straight away.
 */
export function CountUp({ value, duration = 1.8 }: { value: string; duration?: number }) {
  const match = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  const target = match ? Number(match[1]) : 0;
  const decimals = match?.[1].split(".")[1]?.length ?? 0;

  useEffect(() => {
    const node = ref.current;
    if (!match || !node || !inView || reduced) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = latest.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [match, inView, reduced, target, decimals, duration]);

  if (!match) return <>{value}</>;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden>
        <span ref={ref} className="tabular-nums">
          {reduced ? match[1] : (0).toFixed(decimals)}
        </span>
        {match[2]}
      </span>
    </>
  );
}
