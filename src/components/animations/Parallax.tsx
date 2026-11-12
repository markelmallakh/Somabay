"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Drift as a percentage of the frame height, each way. */
  amount?: number;
  /** `hero` starts drifting from the top of the page; `inline` while the frame crosses the screen. */
  mode?: "inline" | "hero";
};

/**
 * Scroll-linked drift for media inside a clipped frame: the first child is oversized just enough
 * to never show an edge and slides slower than the page. The frame must be positioned.
 */
export function Parallax({ children, className, amount = 8, mode = "inline" }: ParallaxProps) {
  const ref = useGsap<HTMLDivElement>(
    ({ scope: frame, reducedMotion }) => {
      const inner = frame.firstElementChild;
      if (reducedMotion || !inner) return;
      const scale = 1 + (amount * 2.2) / 100;
      gsap.set(inner, { scale });
      gsap.fromTo(
        inner,
        { yPercent: mode === "hero" ? 0 : -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: mode === "hero" ? "top top" : "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    [amount, mode],
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
