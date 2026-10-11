"use client";

import type { ReactNode } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";

type SplitHeadingProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  id?: string;
  /** `load` animates immediately (hero), `scroll` waits until the heading enters the viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
};

/** Reveals a heading line by line, each line rising out of its own mask. */
export function SplitHeading({
  children,
  as: Tag = "h2",
  className,
  id,
  trigger = "scroll",
  delay = 0,
}: SplitHeadingProps) {
  const ref = useGsap<HTMLHeadingElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) {
        gsap.set(scope, { autoAlpha: 1 });
        return;
      }
      const split = SplitText.create(scope, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        onSplit(self) {
          gsap.set(scope, { autoAlpha: 1 });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.09,
            delay,
            ease: "expo.out",
            scrollTrigger:
              trigger === "scroll" ? { trigger: scope, start: "top 85%", once: true } : undefined,
          });
        },
      });
      return () => split.revert();
    },
    [trigger, delay],
  );

  return (
    <Tag ref={ref} id={id} data-split="" className={className}>
      {children}
    </Tag>
  );
}
