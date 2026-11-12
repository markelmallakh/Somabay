"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";
import type { ImageAsset } from "@/types/media";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type CollageHeroProps = {
  eyebrow: string;
  title: string;
  /** Scattered tiles framing the title (8–12 work best). */
  tiles: ImageAsset[];
  /** Full-bleed image the collage opens into, with its overview copy. */
  focus: { image: ImageAsset; intro: SectionIntro };
};

/** Tile positions as [left %, top %, width vw]; they ring the centred title. */
const layout: [number, number, number][] = [
  [4, 14, 11],
  [18, 4, 8],
  [33, 9, 6],
  [62, 5, 9],
  [80, 12, 13],
  [2, 52, 9],
  [86, 48, 10],
  [12, 76, 13],
  [30, 82, 7],
  [58, 80, 9],
  [74, 72, 12],
  [44, 4, 5],
];

/**
 * Light collage hero. While pinned, the tiles drift outward and fade as a full-bleed image
 * opens from the centre, revealing the overview copy. Static on small screens and for
 * reduced motion.
 */
export function CollageHero({ eyebrow, title, tiles, focus }: CollageHeroProps) {
  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      if (reducedMotion) return;
      const stage = scope.querySelector("[data-stage]");
      const tileEls = gsap.utils.toArray<HTMLElement>("[data-tile]", scope);
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: stage, start: "top top", end: "+=140%", pin: true, scrub: 0.8 },
      });
      tileEls.forEach((tile) => {
        const left = Number(tile.dataset.left);
        const top = Number(tile.dataset.top);
        timeline.to(
          tile,
          {
            xPercent: (left - 45) * 4,
            yPercent: (top - 45) * 4,
            scale: 1.6,
            opacity: 0,
            duration: 1,
          },
          0,
        );
      });
      timeline
        .to("[data-title]", { opacity: 0, y: -40, duration: 0.4 }, 0)
        .fromTo(
          "[data-focus]",
          { clipPath: "inset(50% 50% 50% 50%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8 },
          0.1,
        )
        .fromTo("[data-focus-img]", { scale: 1.3 }, { scale: 1, duration: 0.9 }, 0.1)
        .fromTo(
          "[data-overview]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.3 },
          0.75,
        );
    });
    return () => mm.revert();
  });

  return (
    <div ref={ref}>
      <section
        data-stage
        aria-labelledby="page-title"
        className="relative overflow-hidden bg-sand-50 lg:h-svh"
      >
        <div className="relative flex min-h-[34rem] items-center justify-center px-gutter pt-[calc(var(--header-height)+3rem)] pb-16 lg:h-full lg:min-h-0 lg:p-0">
          {tiles.slice(0, layout.length).map((tile, index) => {
            const [left, top, width] = layout[index];
            return (
              <div
                key={tile.src + index}
                data-tile
                data-left={left}
                data-top={top}
                className={cn(
                  "absolute aspect-square overflow-hidden",
                  index > 7 && "max-lg:hidden",
                )}
                style={{ left: `${left}%`, top: `${top}%`, width: `max(4.5rem, ${width}vw)` }}
              >
                <ResponsiveImage asset={tile} alt="" sizes="14vw" fill />
              </div>
            );
          })}
          <div
            data-title
            className="relative z-10 max-w-3xl bg-sand-50/70 p-6 text-center backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none"
          >
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 id="page-title" className="mt-5 text-display">
              {title}
            </h1>
          </div>
        </div>

        <div
          data-focus
          className="relative isolate overflow-hidden text-white lg:absolute lg:inset-0 lg:[clip-path:inset(50%_50%_50%_50%)]"
        >
          <div data-focus-img className="absolute inset-0 -z-10">
            <ResponsiveImage asset={focus.image} sizes="100vw" fill />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-abyss/85 via-abyss/30 to-transparent"
          />
          <div
            data-overview
            className="flex min-h-[32rem] items-end px-gutter pt-40 pb-14 lg:h-full lg:pb-20"
          >
            <div className="mx-auto w-full max-w-site">
              <div className="max-w-2xl">
                {focus.intro.eyebrow ? <Eyebrow>{focus.intro.eyebrow}</Eyebrow> : null}
                <h2 className="mt-4 text-h1">{focus.intro.title}</h2>
                {focus.intro.description ? (
                  <p className="mt-5 text-lead text-white/85">{focus.intro.description}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
