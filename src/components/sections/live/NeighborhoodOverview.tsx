"use client";

import type { ImageAsset } from "@/types/media";
import type { SectionIntro } from "@/types/content";
import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Stat = { value: string; unit?: string; label: string };

type NeighborhoodOverviewProps = {
  id: string;
  stats?: Stat[];
  /** "Living Now" / "Coming Soon", shown as the last tile. */
  status: string;
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
  stats = [],
  status,
  concept,
}: NeighborhoodOverviewProps) {
  const tiles: Stat[] = [...stats, { value: status, label: "Status" }];

  const ref = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const cards = gsap.utils.toArray<HTMLElement>("[data-tile]", scope);
    if (!cards.length) return;

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: cards[0], start: "top 85%", toggleActions: "play none none none" },
    });
    // Tiles rise out of their own frames one after another…
    timeline.fromTo(
      cards,
      { clipPath: "inset(100% 0% 0% 0% round 4px)" },
      {
        clipPath: "inset(0% 0% 0% 0% round 4px)",
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
      },
    );
    timeline.from(
      gsap.utils.toArray<HTMLElement>("[data-tile-copy]", scope),
      { y: 30, autoAlpha: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
      0.3,
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
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((tile) => {
            const numeric = /^\d[\d,]*$/.test(tile.value);
            return (
              <li
                key={tile.label}
                data-tile
                className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-md bg-turquoise-160 p-7 text-white lg:aspect-[7/5] lg:min-h-0 lg:p-8"
              >
                {/* A soft light that slides across the tile on hover. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgb(255_255_255/0.08)_50%,transparent_70%)] transition-transform duration-[1400ms] ease-out-expo group-hover:translate-x-full"
                />
                <p data-tile-copy className="text-body-sm text-white/75">
                  {tile.label}
                </p>
                <p data-tile-copy className="font-serif text-heading-2 leading-[1.05]">
                  <span data-count={numeric ? tile.value.replace(/,/g, "") : undefined}>
                    {tile.value}
                  </span>
                  {tile.unit ? (
                    <span className="ml-2 font-sans text-body-lg text-sun">{tile.unit}</span>
                  ) : null}
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
                <FillText
                  text={concept.description}
                  className="font-sans text-[clamp(1.375rem,1rem+1.3vw,2.125rem)] leading-[1.35] tracking-[-0.01em] text-turquoise-160 lg:col-span-8 lg:col-start-5"
                />
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
 * A statement that fills in as it is read: every word starts faint and turns solid one after
 * another while the paragraph scrolls up through the screen, after the block first rises in.
 */
function FillText({ text, className }: { text: string; className?: string }) {
  const ref = useGsap<HTMLParagraphElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      gsap.from(scope, {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: scope, start: "top 90%", toggleActions: "play none none none" },
      });
      const split = SplitText.create(scope, {
        type: "words",
        autoSplit: true,
        onSplit(self) {
          return gsap.fromTo(
            self.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              stagger: 0.1,
              ease: "none",
              scrollTrigger: { trigger: scope, start: "top 78%", end: "bottom 50%", scrub: 0.6 },
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
