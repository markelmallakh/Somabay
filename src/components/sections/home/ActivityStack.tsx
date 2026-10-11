"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";

/**
 * Sticky card stack: each card pins below the header and, as the next one slides over it,
 * recedes (scales down and dims). Purely presentational — cards stay in normal document flow.
 */
export function ActivityStack({ children }: { children: ReactNode }) {
  const ref = useGsap<HTMLOListElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", scope);
    cards.slice(0, -1).forEach((card, index) => {
      const next = cards[index + 1];
      gsap.to(card.querySelector("[data-stack-inner]"), {
        scale: 0.94,
        filter: "brightness(0.72)",
        ease: "none",
        scrollTrigger: { trigger: next, start: "top 70%", end: "top 12%", scrub: true },
      });
    });
  });

  return (
    <ol ref={ref} className="flex flex-col gap-6 md:gap-0">
      {children}
    </ol>
  );
}
