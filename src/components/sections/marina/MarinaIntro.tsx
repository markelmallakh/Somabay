"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";

type MarinaIntroProps = {
  /** Read by screen readers only; the statement stands alone on the page. */
  title: string;
  description: string;
};

/**
 * The Marina's introduction under the hero, with the About page's statement effect: the
 * paragraph alone, set large and centred; as it arrives every word rises out of its line's mask
 * in a quick wave, and on large screens the statement holds in place (sticky) for a while before
 * the page moves on.
 */
export function MarinaIntro({ title, description }: MarinaIntroProps) {
  const ref = useGsap<HTMLElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const paragraph = scope.querySelector<HTMLElement>("[data-statement]");
      if (!paragraph) return;
      const split = SplitText.create(paragraph, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            yPercent: 110,
            duration: 1.6,
            stagger: 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          });
        },
      });
      return () => split.revert();
    },
    [description],
  );

  return (
    <section ref={ref} aria-labelledby="marina-intro-title" className="bg-white text-ink">
      <h2 id="marina-intro-title" className="sr-only">
        {title}
      </h2>
      <Container className="pt-14 pb-12 text-center sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-24">
        <p
          data-statement
          className="mx-auto max-w-[66rem] text-[clamp(1.3125rem,1.05rem+1.25vw,2.25rem)] leading-[1.35] text-pretty text-ink lg:sticky lg:top-[calc(var(--header-height)+14vh)]"
        >
          {description}
        </p>
        {/* Room for the statement to hold (sticky can't travel into padding). */}
        <div aria-hidden className="hidden h-[40vh] lg:block" />
      </Container>
    </section>
  );
}
