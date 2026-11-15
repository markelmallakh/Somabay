"use client";

import { golfOverview } from "@/content/golf";
import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

/**
 * Golf overview, with the About page's statement effect: the eyebrow, then the statement set
 * large and centred, its words rising out of each line's mask in a wave. On large screens the
 * statement holds in place (sticky) while the GEO Certified® block rises up to meet it, then
 * both leave together.
 */
export function GolfOverview() {
  const { title, statement, geo } = golfOverview;
  const ref = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
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
          scrollTrigger: { trigger: paragraph, start: "top 75%", once: true },
        });
      },
    });
    gsap.from("[data-geo-logo]", {
      scale: 0.8,
      opacity: 0,
      duration: 1.4,
      ease: "expo.out",
      scrollTrigger: { trigger: "[data-geo]", start: "top 80%", once: true },
    });
    return () => split.revert();
  });

  return (
    <section
      ref={ref}
      id="golf-overview"
      aria-labelledby="golf-overview-title"
      className="scroll-mt-(--header-height) bg-white py-section text-ink"
    >
      <Container className="text-center">
        <Eyebrow as="h2">
          <span id="golf-overview-title">{title}</span>
        </Eyebrow>
        <div className="mt-8 lg:mt-10">
          <p
            data-statement
            className="mx-auto max-w-[66rem] text-[clamp(1.5rem,1.05rem+1.25vw,2.25rem)] leading-[1.35] text-pretty lg:sticky lg:top-[calc(var(--header-height)+14vh)]"
          >
            {statement}
          </p>
          {/* Room for the statement to hold (sticky can't travel into padding). */}
          <div aria-hidden className="hidden h-[40vh] lg:block" />
        </div>

        {/* GEO Certified®: rises to meet the statement, then both scroll on together. */}
        <div
          data-geo
          className="relative mt-12 grid items-center gap-10 rounded-md bg-sand-100 p-8 text-left md:p-12 lg:mt-16 lg:grid-cols-12 lg:gap-6 lg:p-16"
        >
          <div className="flex justify-center lg:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- the certification mark, shown as is. */}
            <img
              data-geo-logo
              src={geo.logo}
              alt="GEO Certified®"
              className="h-auto w-40 md:w-52 lg:w-60"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>{geo.eyebrow}</Eyebrow>
            <h3 className="mt-3 text-heading-3">{geo.title}</h3>
            <p className="mt-4 max-w-xl text-body-md text-slate">{geo.description}</p>
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {geo.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-body-sm text-ink">
                  <Icon name="check-solid" className="size-5 shrink-0 text-turquoise" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
