"use client";

import type { ImageAsset } from "@/types/media";
import type { SectionIntro } from "@/types/content";
import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Stat = { value: string; unit?: string; label: string };

type NeighborhoodOverviewProps = {
  id: string;
  name: string;
  /** The project's logo, centred above its numbers. */
  logo?: string;
  stats?: Stat[];
  concept?: SectionIntro & { images: [ImageAsset, ImageAsset] };
};

/**
 * The neighborhood at a glance, after the hero: a row of tall deep-teal tiles (a small label at
 * the top, the figure large at the foot, its number counting up), then the concept as an overview
 * (eyebrow and title on the left, the description as a large turquoise statement rising word by
 * word on the right) and its two photos drifting at different speeds.
 */
export function NeighborhoodOverview({
  id,
  name,
  logo,
  stats = [],
  concept,
}: NeighborhoodOverviewProps) {
  const tiles = stats;

  const ref = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-tile]", scope);
    if (!cards.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: cards[0], start: "top 85%", toggleActions: "play none none none" },
    });
    // The figures rise in one after another…
    timeline.from(
      gsap.utils.toArray<HTMLElement>("[data-tile-copy]", scope),
      { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
      0,
    );
    // …and each number counts up to its figure.
    gsap.utils.toArray<HTMLElement>("[data-count]", scope).forEach((element, index) => {
      const target = Number(element.dataset.count);
      const counter = { value: 0 };
      timeline.to(
        counter,
        {
          value: target,
          duration: 1.8,
          ease: "power3.out",
          onUpdate: () => {
            element.textContent = Math.round(counter.value).toLocaleString("en-US");
          },
        },
        0.3 + index * 0.1,
      );
    });
  }, []);

  return (
    <section ref={ref} aria-labelledby={id} className="bg-white py-section text-ink">
      <Container>
        {logo ? (
          <Reveal className="mb-10 flex justify-center lg:mb-12">
            {/* eslint-disable-next-line @next/next/no-img-element -- the project's brand SVG, shown as is. */}
            <img src={logo} alt={`${name} logo`} className="h-12 w-auto lg:h-14" />
          </Reveal>
        ) : null}
        {/* The figures in a light row between hairlines, divided by thin rules. */}
        <ul
          className={cn(
            "mx-auto grid divide-y divide-line border-y border-line sm:divide-x sm:divide-y-0",
            tiles.length >= 4 ? "max-w-6xl sm:grid-cols-4" : "max-w-4xl sm:grid-cols-3",
          )}
        >
          {tiles.map((tile) => {
            const numeric = /^\d[\d,]*$/.test(tile.value);
            return (
              <li key={tile.label} data-tile className="px-6 py-8 text-center lg:py-10">
                <p data-tile-copy className="font-serif text-heading-2 leading-none text-ink">
                  <span data-count={numeric ? tile.value.replace(/,/g, "") : undefined}>
                    {tile.value}
                  </span>
                  {tile.unit ? (
                    <span className="ml-1.5 font-sans text-body-md text-turquoise">
                      {tile.unit}
                    </span>
                  ) : null}
                </p>
                <p data-tile-copy className="mt-3 text-label tracking-label text-slate uppercase">
                  {tile.label}
                </p>
              </li>
            );
          })}
        </ul>

        {concept ? (
          <>
            <div className="mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12 lg:gap-6">
              <div className="flex flex-col gap-5 lg:col-span-4">
                <Reveal distance={12}>
                  <Eyebrow>{concept.eyebrow ?? "Overview"}</Eyebrow>
                </Reveal>
                <SplitHeading id={id} className="text-heading-1 text-balance">
                  {concept.title}
                </SplitHeading>
              </div>
              {concept.description ? (
                <div className="flex flex-col items-start gap-10 lg:col-span-8 lg:col-start-5">
                  <FillText
                    text={concept.description}
                    className="font-sans text-[clamp(1.375rem,1rem+1.3vw,2.125rem)] leading-[1.35] tracking-[-0.01em] text-ink"
                  />
                  {/* Takes the visitor down to the register-interest form at the foot of the page. */}
                  <Reveal delay={0.1}>
                    <Button href="#register-interest" variant="primary">
                      Request interest
                    </Button>
                  </Reveal>
                </div>
              ) : null}
            </div>

            {/* The two concept photos: a wide one and a tall one set lower, each drifting. */}
            <div className="mt-16 grid gap-3 lg:mt-24 lg:grid-cols-12 lg:gap-6">
              <Reveal className="lg:col-span-7">
                <Parallax className="relative aspect-[16/11] overflow-hidden rounded-md">
                  <div className="absolute inset-0">
                    <ResponsiveImage
                      asset={concept.images[0]}
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      fill
                    />
                  </div>
                </Parallax>
              </Reveal>
              <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:mt-32">
                <Parallax amount={12} className="relative aspect-[4/5] overflow-hidden rounded-md">
                  <div className="absolute inset-0">
                    <ResponsiveImage
                      asset={concept.images[1]}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      fill
                    />
                  </div>
                </Parallax>
              </Reveal>
            </div>
          </>
        ) : null}
      </Container>
    </section>
  );
}

/**
 * A statement written in as it is read: the paragraph is split into masked lines, and every word
 * rises into its line out of a soft blur, one after another in reading order, tied to the scroll
 * (scrolling back up takes them away again).
 */
function FillText({ text, className }: { text: string; className?: string }) {
  const ref = useGsap<HTMLParagraphElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const split = SplitText.create(scope, {
        type: "lines,words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          // Let descenders (g, y, p) show below each line's mask without changing the rhythm.
          gsap.set(self.masks, { paddingBottom: "0.18em", marginBottom: "-0.18em" });
          return gsap.fromTo(
            self.words,
            { yPercent: 110, opacity: 0, filter: "blur(6px)" },
            {
              yPercent: 0,
              opacity: 1,
              filter: "blur(0px)",
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: scope, start: "top 88%", end: "bottom 62%", scrub: 0.9 },
            },
          );
        },
      });
      return () => split.revert();
    },
    [text],
  );

  return (
    <p ref={ref} className={className}>
      {text}
    </p>
  );
}
