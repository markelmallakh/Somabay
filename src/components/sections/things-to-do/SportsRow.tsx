"use client";

import { useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { sports, sportsIntro } from "@/content/things-to-do";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { HeadingRow } from "./HeadingRow";

const ease = "duration-700 ease-out-expo";

/**
 * Sports heading row over a draggable row of photo cards. Each card opens a side drawer with the
 * sport's details from the Somabay directory (description, hours, phone, directions).
 */
export function SportsRow() {
  const [open, setOpen] = useState<number | null>(null);

  // Scroll-linked slide: from the first card while the row enters the screen to the last one as
  // it leaves, tied straight to the (Lenis-smoothed) scroll.
  const rowScope = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const track = scope.querySelector<HTMLElement>("[data-sports-track]");
    if (!track) return;
    gsap.to(track, {
      x: () => Math.min(0, scope.clientWidth - track.scrollWidth),
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <Section tone="white" aria-labelledby="sports-title" className="overflow-hidden">
      <Container>
        <HeadingRow
          id="sports-title"
          align="top"
          title={sportsIntro.title}
          description={sportsIntro.description}
          aside={
            <div>
              <Button href={sportsIntro.cta.href} variant="outline" icon="arrow-up-right">
                {sportsIntro.cta.label}
              </Button>
            </div>
          }
        />
      </Container>
      <Reveal className="mt-12 lg:mt-16">
        {/* No arrows: the row glides sideways on its own as the page scrolls past it. */}
        <div ref={rowScope} className="motion-reduce:overflow-x-auto">
          <ul
            data-sports-track
            aria-label="Sports at Somabay"
            className="flex w-max gap-4 ps-site pe-gutter will-change-transform"
          >
            {sports.map((sport, index) => (
              <li key={sport.id} className="w-[min(72vw,18.5rem)] shrink-0">
                {/* At rest the sport's name sits on the photo's shaded foot; on hover the rounded
                  photo pulls up and a white panel beneath it shows the name, tagline and arrow. */}
                <button
                  type="button"
                  onClick={() => setOpen(index)}
                  aria-label={`${sport.chip}: details`}
                  className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                >
                  {/* The photo keeps its rounded corners on hover, pulled up above the panel. */}
                  <span
                    className={`absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.5rem)] ${ease} group-hover:[clip-path:inset(0_0_30%_0_round_0.5rem_0.5rem_0_0)] group-focus-visible:[clip-path:inset(0_0_30%_0_round_0.5rem_0.5rem_0_0)]`}
                  >
                    <span
                      className={`absolute inset-0 transition-transform ${ease} group-hover:-translate-y-[12%] group-focus-visible:-translate-y-[12%]`}
                    >
                      <ResponsiveImage asset={sport.images[0]} sizes="18.5rem" fill />
                    </span>
                    <span
                      aria-hidden
                      className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_50%,rgb(0_0_0/0.6)_100%)] transition-opacity ${ease} group-hover:opacity-0 group-focus-visible:opacity-0`}
                    />
                  </span>

                  {/* At rest: the name only. */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-5 bottom-5 font-serif text-heading-5 leading-[1.15] text-white transition-[opacity,translate] ${ease} group-hover:translate-y-3 group-hover:opacity-0 group-focus-visible:translate-y-3 group-focus-visible:opacity-0`}
                  >
                    {sport.chip}
                  </span>

                  {/* On hover: the white panel. */}
                  <span
                    className={`absolute inset-x-0 bottom-0 flex h-[30%] translate-y-4 items-center justify-between gap-4 px-5 opacity-0 transition-[opacity,translate] ${ease} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-serif text-heading-5 leading-[1.15] text-ink">
                        {sport.chip}
                      </span>
                      {sport.kicker ? (
                        <span className="text-body-sm text-slate">{sport.kicker}</span>
                      ) : null}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-10 shrink-0 place-items-center rounded-full bg-turquoise text-white"
                    >
                      <Icon name="arrow-up-right" className="size-4.5" />
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <DetailDrawer
        items={sports}
        index={open}
        onClose={() => setOpen(null)}
        onNavigate={setOpen}
      />
    </Section>
  );
}
