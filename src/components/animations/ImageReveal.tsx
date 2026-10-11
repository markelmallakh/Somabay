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
  /** Adds a gentle scroll-linked drift to the inner media (percentage of its height). */
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
  parallax = 0,
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
      gsap.fromTo(
        inner,
        { scale: 1.18 },
        {
          scale: 1,
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
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
