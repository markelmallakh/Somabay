"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the clip-path wipe travels. */
  from?: "bottom" | "top" | "left" | "right";
  /** Scroll-linked drift of the inner media (percentage of its height); 0 turns it off. */
  parallax?: number;
  delay?: number;
};

const insets = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/**
 * Scroll-triggered image entrance: the frame wipes open with a clip-path while the media inside
 * settles from a slight zoom. The wrapper must contain a single positioned media element.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  parallax = 6,
  delay = 0,
}: ImageRevealProps) {
  const ref = useGsap<HTMLDivElement>(
    ({ scope: frame, reducedMotion }) => {
      const inner = frame.firstElementChild;
      if (reducedMotion || !inner) return;

      gsap.fromTo(
        frame,
        { clipPath: insets[from] },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.6,
          delay,
          ease: "expo.inOut",
          scrollTrigger: { trigger: frame, start: "top 88%", once: true },
        },
      );
      // With parallax the media stays slightly oversized so its drift never shows an edge.
      const rest = parallax ? 1 + (parallax * 2.2) / 100 : 1;
      gsap.fromTo(
        inner,
        { scale: rest + 0.16 },
        {
          scale: rest,
          duration: 2,
          delay,
          ease: "expo.out",
          // Hand the transform back to CSS so hover effects keep working.
          ...(parallax ? {} : { clearProps: "transform" }),
          scrollTrigger: { trigger: frame, start: "top 88%", once: true },
        },
      );
      if (parallax) {
        gsap.fromTo(
          inner,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: "none",
            scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      }
    },
    [from, parallax, delay],
  );

  return (
    <div ref={ref} data-no-motion="" className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
