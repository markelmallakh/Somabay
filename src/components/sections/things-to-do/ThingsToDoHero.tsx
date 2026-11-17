"use client";

import type { CSSProperties } from "react";
import type { ImageAsset } from "@/types/media";
import type { SectionIntro } from "@/types/content";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type ThingsToDoHeroProps = {
  eyebrow: string;
  /** "Things To Do" above the photo, "in Somabay" below it. */
  lines: [string, string];
  image: ImageAsset;
  /** Activity photos scattered around the title. */
  scatter: ImageAsset[];
  overview: SectionIntro;
};

/**
 * Where each scattered photo sits (left/top in % of the screen), its width (vw on desktop), its
 * shape, and its depth: deeper photos drift further with the pointer and the scroll. `mobile`
 * keeps it on small screens, where only half of them fit around the title.
 */
const SPOTS = [
  { left: 5, top: 17, w: 15, aspect: "16/10", depth: 0.9, mobile: true },
  { left: 23, top: 9, w: 8.5, aspect: "4/5", depth: 0.5, mobile: false },
  { left: 68, top: 12, w: 13, aspect: "3/2", depth: 0.7, mobile: true },
  { left: 86, top: 30, w: 10, aspect: "3/4", depth: 1, mobile: false },
  { left: 3, top: 49, w: 9.5, aspect: "3/4", depth: 0.6, mobile: false },
  { left: 18, top: 63, w: 11, aspect: "4/5", depth: 1.15, mobile: true },
  { left: 74, top: 56, w: 10, aspect: "3/4", depth: 0.8, mobile: true },
  { left: 85, top: 76, w: 12, aspect: "3/2", depth: 0.5, mobile: false },
  { left: 37, top: 85, w: 9, aspect: "4/3", depth: 1.2, mobile: true },
  { left: 46, top: 13, w: 8, aspect: "16/10", depth: 0.4, mobile: false },
];

/**
 * Things To Do hero (wireframe 1:4371, reworked): the title sits in a loose, uneven gallery of
 * activity photos that drift with the pointer. On scroll (sticky, no pinning) a photo opens from
 * nothing between the two lines and grows to cover the screen, parting the title and scattering
 * the gallery at different speeds; the overview then rises over the full-screen photo.
 */
export function ThingsToDoHero({ eyebrow, lines, image, scatter, overview }: ThingsToDoHeroProps) {
  const scope = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const q = gsap.utils.selector(scope);
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Entrance: the title rises and the gallery wipes up photo by photo around it.
    gsap.from(q("[data-line]"), {
      yPercent: 60,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
    });
    gsap.fromTo(
      q("[data-spot-reveal]"),
      { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.4,
        ease: "expo.out",
        stagger: { each: 0.07, from: "random" },
        delay: 0.2,
      },
    );

    // Scroll: one continuous growth, from nothing to the full screen, with no pause on the way.
    // The photo's top and bottom edges push the two title lines ahead of them, so the title
    // always parts around the photo and never sits over it.
    const frame = q<HTMLElement>("[data-frame]")[0];
    const lineTop = q<HTMLElement>("[data-line-top]")[0];
    const lineBottom = q<HTMLElement>("[data-line-bottom]")[0];
    const gap = 20;
    // Layout positions (offsetTop ignores our transforms and stays right once the fonts load).
    const topEdge = () => lineTop.offsetTop + lineTop.offsetHeight;
    const bottomEdge = () => lineBottom.offsetTop;
    const setTop = gsap.quickSetter(lineTop, "y", "px");
    const setBottom = gsap.quickSetter(lineBottom, "y", "px");
    const setFade = gsap.quickSetter([lineTop, lineBottom], "opacity");
    const radius = 4;
    // Fully open at 75% of the hero's scroll; the overview rises over the last quarter.
    const OPEN = 0.75;
    const progress = { value: 0 };
    const drawFrame = () => {
      const k = Math.min(progress.value / OPEN, 1);
      const inset = 50 * (1 - k);
      const r = radius * Math.min(1, (1 - k) / 0.25);
      frame.style.clipPath = `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${r}px)`;
      const half = ((50 - inset) / 100) * vh;
      setTop(Math.min(0, vh / 2 - half - gap - topEdge()));
      setBottom(Math.max(0, vh / 2 + half + gap - bottomEdge()));
      setFade(1 - Math.min(Math.max((k - 0.55) / 0.3, 0), 1));
    };
    drawFrame();
    // Scrub straight to the (already smoothed) Lenis scroll, so nothing lags behind or catches up.
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: scope, start: "top top", end: "bottom bottom", scrub: true },
    });
    tl.to(progress, { value: 1, duration: 1, onUpdate: drawFrame }, 0)
      .to(q("[data-eyebrow]"), { opacity: 0, duration: 0.12 }, 0)
      .fromTo(q("[data-photo]"), { scale: 1.3 }, { scale: 1, duration: OPEN }, 0)
      .fromTo(q("[data-shade]"), { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0.6)
      .fromTo(
        q("[data-overview]"),
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.25 },
        0.75,
      );

    // The gallery scatters outward and upward, deeper photos faster, as the photo grows.
    q<HTMLElement>("[data-spot]").forEach((spot) => {
      const depth = Number(spot.dataset.depth);
      const away = Number(spot.dataset.left) < 45 ? -1 : 1;
      tl.to(
        spot,
        {
          x: away * vw * 0.18 * depth,
          y: -vh * 0.55 * depth,
          scale: 1 + depth * 0.25,
          duration: 0.75,
        },
        0,
      ).to(spot, { opacity: 0, duration: 0.25 }, 0.45);
    });

    // Pointer parallax on wide screens: each photo leans away from the cursor by its depth.
    if (!wide || !window.matchMedia("(hover: hover)").matches) return;
    const movers = q<HTMLElement>("[data-spot-move]").map((element) => ({
      depth: Number(element.dataset.depth),
      x: gsap.quickTo(element, "x", { duration: 1.2, ease: "power3.out" }),
      y: gsap.quickTo(element, "y", { duration: 1.2, ease: "power3.out" }),
    }));
    const onMove = (event: PointerEvent) => {
      const dx = event.clientX / vw - 0.5;
      const dy = event.clientY / vh - 0.5;
      movers.forEach((mover) => {
        mover.x(-dx * 46 * mover.depth);
        mover.y(-dy * 34 * mover.depth);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  });

  return (
    <section
      ref={scope}
      aria-labelledby="page-title"
      className="relative h-[220svh] bg-white motion-reduce:h-auto md:h-[300svh]"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto">
        {/* The scattered gallery around the title. */}
        <div aria-hidden className="absolute inset-0 motion-reduce:hidden">
          {scatter.slice(0, SPOTS.length).map((photo, index) => {
            const spot = SPOTS[index];
            return (
              <div
                key={photo.src}
                data-spot
                data-depth={spot.depth}
                data-left={spot.left}
                style={
                  {
                    left: `${spot.left}%`,
                    top: `${spot.top}%`,
                    aspectRatio: spot.aspect,
                    "--w": spot.w,
                  } as CSSProperties
                }
                className={cn(
                  "absolute w-[calc(var(--w)*2.3vw)] will-change-transform md:w-[calc(var(--w)*1vw)]",
                  !spot.mobile && "max-md:hidden",
                )}
              >
                <div data-spot-move data-depth={spot.depth} className="size-full">
                  <div
                    data-spot-reveal
                    className="relative size-full overflow-hidden rounded-md bg-sand-200 [clip-path:inset(100%_0%_0%_0%)]"
                  >
                    <ResponsiveImage asset={photo} sizes="(min-width: 768px) 16vw, 36vw" fill />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* The photo that opens from nothing between the lines to the full screen. */}
        <div
          data-frame
          className="absolute inset-0 z-10 overflow-hidden bg-turquoise-10 will-change-[clip-path] [clip-path:inset(50%_50%_50%_50%)] motion-reduce:relative motion-reduce:h-svh motion-reduce:[clip-path:none]"
        >
          <div data-photo className="absolute inset-0 will-change-transform">
            <ResponsiveImage asset={image} sizes="100vw" quality={85} fill priority />
          </div>
          <div
            data-shade
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.75),rgb(0_0_0/0.25)_55%,rgb(0_0_0/0.1))] opacity-0 motion-reduce:opacity-100"
          />
        </div>

        {/* The title, parted by the photo. */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center motion-reduce:relative motion-reduce:py-16">
          <h1 id="page-title" className="font-serif text-heading-1 leading-[1.05] text-ink">
            <span data-line-top className="block">
              {/* The eyebrow travels with the top line, so it never sits over the photo. */}
              <span data-eyebrow className="mb-2 block lg:mb-3">
                <Eyebrow as="span" className="mx-auto">
                  {eyebrow}
                </Eyebrow>
              </span>
              <span data-line className="block">
                {lines[0]}
              </span>
            </span>
            <span data-line-bottom className="block">
              <span data-line className="block">
                {lines[1]}
              </span>
            </span>
          </h1>
        </div>

        {/* The overview, over the full-screen photo. */}
        <div
          data-overview
          data-theme-surface="dark"
          className="absolute inset-x-0 bottom-0 z-30 pb-10 text-white opacity-0 motion-reduce:opacity-100 sm:pb-16 lg:pb-20"
        >
          <Container className="grid gap-4 sm:gap-6 lg:grid-cols-12 lg:items-end">
            <div className="flex flex-col gap-2 lg:col-span-7 lg:gap-3">
              {overview.eyebrow ? <Eyebrow tone="dark">{overview.eyebrow}</Eyebrow> : null}
              <h2 className="max-w-[11em] font-serif text-heading-2 text-balance max-sm:mx-auto">
                {overview.title}
              </h2>
            </div>
            {overview.description ? (
              <p className="text-body-md text-white/80 max-sm:text-center lg:col-span-4 lg:col-start-9">
                {overview.description}
              </p>
            ) : null}
          </Container>
        </div>
      </div>
    </section>
  );
}
