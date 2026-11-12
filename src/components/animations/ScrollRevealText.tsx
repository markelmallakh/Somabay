"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrollRevealTextProps = {
  /** The statement, set large in serif. */
  text: string;
  /** Kept for existing callers; every word now rises in the same way. */
  leadWords?: number;
  as?: "p" | "h2";
  /** Kept for existing callers (the old grey-to-ink fill is gone). */
  dimOpacity?: number;
  className?: string;
};

/**
 * Large statement revealed with a masked line wave: each line is clipped to its own box and its
 * words rise up into it one after another, the first time the statement scrolls into view (the
 * same motion as the About story). Lines re-split on resize.
 */
export function ScrollRevealText({ text, as: Tag = "p", className }: ScrollRevealTextProps) {
  const ref = useGsap<HTMLParagraphElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const split = SplitText.create(scope, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 1.4,
            stagger: 0.035,
            ease: "expo.out",
            scrollTrigger: { trigger: scope, start: "top 80%", once: true },
          });
        },
      });
      return () => split.revert();
    },
    [text],
  );

  return (
    <Tag
      ref={ref}
      className={cn(
        "font-serif text-[clamp(1.375rem,1.05rem+1.35vw,2.125rem)] leading-[1.3] text-ink",
        className,
      )}
    >
      {text}
    </Tag>
  );
}
