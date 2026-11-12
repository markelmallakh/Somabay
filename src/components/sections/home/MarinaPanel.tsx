"use client";

import { useRef } from "react";
import type { Cta } from "@/types/content";
import type { VideoAsset } from "@/types/media";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { ScrollScrubVideo, type ScrubController } from "@/components/media/ScrollScrubVideo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { KitIcon, type KitIconName } from "@/components/ui/KitIcon";

type MarinaPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  cta: Cta;
  film: VideoAsset;
  categories: { label: string; icon: KitIconName }[];
};

/*
 * Figma "Subtract" (416:2097): a 532 px wide, 101 px deep notch cut from the photo's
 * bottom-right corner, its left side slanting 50 px. Every join is rounded: the notch's own
 * top-left corner, the photo's corner where the slant meets the bottom, and the photo's corner
 * where the notch meets the right edge. Cut out of the photo with a CSS mask (rectangle minus the
 * notch), so there is no white overlay and no seam along its edges; the mask's vertical offset
 * (`--notch-y`, px below the bottom edge) lets the notch rise in.
 */
const R = 24;
const SLANT = { x: 50, y: 101 };
const len = Math.hypot(SLANT.x, SLANT.y);
const ux = SLANT.x / len;
const uy = SLANT.y / len;
const X0 = R; // where the slant meets the bottom edge
const TOP = 32; // room above the notch for the photo's rounded corner
const W = X0 + SLANT.x + 532;
const H = TOP + SLANT.y;
const NOTCH = [
  `M ${X0 - R} ${H}`,
  `Q ${X0} ${H} ${X0 + R * ux} ${H - R * uy}`,
  `L ${X0 + SLANT.x - R * ux} ${TOP + R * uy}`,
  `Q ${X0 + SLANT.x} ${TOP} ${X0 + SLANT.x + R} ${TOP}`,
  `L ${W - TOP} ${TOP}`,
  `Q ${W} ${TOP} ${W} 0`,
  `L ${W} ${H} Z`,
].join(" ");
/** The mask shape runs a few px past the photo's right and bottom edges so no edge pixel is half-masked. */
const BLEED = 4;
const NOTCH_SHAPE = [
  NOTCH.replace(/ L \S+ \S+ Z$/, ""),
  `L ${W + BLEED} 0 L ${W + BLEED} ${H + BLEED} L ${X0 - R} ${H + BLEED} Z`,
].join(" ");
const NOTCH_SVG = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W + BLEED} ${H + BLEED}"><path d="${NOTCH_SHAPE}"/></svg>`,
)}")`;
const photoMask = {
  maskImage: `linear-gradient(#000, #000), ${NOTCH_SVG}`,
  WebkitMaskImage: `linear-gradient(#000, #000), ${NOTCH_SVG}`,
  maskSize: `100% 100%, ${W + BLEED}px ${H + BLEED}px`,
  WebkitMaskSize: `100% 100%, ${W + BLEED}px ${H + BLEED}px`,
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: `0 0, right -${BLEED}px bottom calc(var(--notch-y) * -1px - ${BLEED}px)`,
  WebkitMaskPosition: `0 0, right -${BLEED}px bottom calc(var(--notch-y) * -1px - ${BLEED}px)`,
  maskComposite: "exclude",
  WebkitMaskComposite: "xor",
} as const;

/**
 * Figma "The Marina" panel (416:2095). On large screens it arrives as a full-bleed photo with
 * nothing on it; while the section is pinned, scrolling draws the photo in to the content width
 * with rounded corners, the notch rises into the corner and the copy and amenities follow.
 */
export function MarinaPanel({
  eyebrow,
  title,
  description,
  cta,
  film,
  categories,
}: MarinaPanelProps) {
  const scrub = useRef<ScrubController>(null);
  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const photo = scope.querySelector<HTMLElement>("[data-photo]");
    const zoom = scope.querySelector<HTMLElement>("[data-zoom]");
    const veil = scope.querySelector<HTMLElement>("[data-veil]");
    if (!photo || !zoom || !veil) return;
    const copy = scope.querySelectorAll("[data-copy]");
    const chips = scope.querySelectorAll("[data-chip]");
    const panel = scope.querySelector<HTMLElement>("[data-panel]");
    if (!panel) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // How far the panel sits in from each side of the full-viewport stage it is centred in.
      const gaps = () => {
        const stage = scope.getBoundingClientRect();
        const box = panel.getBoundingClientRect();
        return {
          left: box.left,
          right: document.documentElement.clientWidth - box.right,
          top: box.top - stage.top,
          bottom: stage.bottom - box.bottom,
        };
      };

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: "+=120%",
          pin: true,
          // The parent is a flex column, where GSAP would otherwise skip the spacing.
          pinSpacing: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(
          photo,
          {
            left: () => -gaps().left,
            right: () => -gaps().right,
            top: () => -gaps().top,
            bottom: () => -gaps().bottom,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
          },
          {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            borderBottomLeftRadius: 32,
            duration: 1,
          },
          0,
        )
        .fromTo(zoom, { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
        .fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.45)
        .fromTo(
          photo,
          { "--notch-y": H + 2 },
          { "--notch-y": 0, duration: 0.45, ease: "power3.inOut" },
          0.55,
        )
        // Once the notch covers the corner, square it off: a rounded corner's anti-aliased
        // edge would otherwise show through as a faint arc inside the notch.
        .fromTo(
          photo,
          { borderBottomRightRadius: 0 },
          { borderBottomRightRadius: 32, duration: 0.6 },
          0,
        )
        .to(photo, { borderBottomRightRadius: 0, duration: 0.3, ease: "power2.out" }, 0.7)
        .fromTo(
          copy,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" },
          0.65,
        )
        .fromTo(
          chips,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.3, stagger: 0.04, ease: "power3.out" },
          0.8,
        )
        .to({}, { duration: 0.25 });

      // The clip runs from the first scroll until the last amenity has landed.
      const contentEnd = timeline.duration() - 0.25;
      timeline.eventCallback("onUpdate", () =>
        scrub.current?.seek(Math.min(1, timeline.time() / contentEnd)),
      );
    });
    return () => mm.revert();
  }, []);

  return (
    // Large screens: a full-viewport stage that pins, with the panel centred in it. The film
    // starts out filling the whole stage (the viewport) and draws in to the panel.
    <div ref={ref} className="lg:flex lg:h-svh lg:items-center">
      <div data-panel className="relative isolate w-full rounded-[2rem] text-white">
        {/* The photo clips itself (and the notch inside it). */}
        <div
          data-photo
          className="absolute inset-0 -z-10 overflow-hidden rounded-[2rem] [--notch-y:999] lg:[--notch-y:0]"
          style={photoMask}
        >
          <div data-zoom className="absolute inset-0">
            {/* Holds its first frame until the scroll starts, then plays in step with it. */}
            <ScrollScrubVideo
              asset={film}
              mode="external"
              controllerRef={scrub}
              className="absolute inset-0"
            />
          </div>
          <div
            data-veil
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.65),rgb(0_0_0/0.15)_55%,transparent)]"
          />
        </div>

        <div className="flex min-h-[clamp(30rem,45vw,42.5rem)] flex-col justify-center px-[clamp(1.5rem,4vw,3.75rem)] py-16 lg:pb-32">
          <div className="flex max-w-[32.5rem] flex-col gap-6">
            <div data-copy className="flex flex-col gap-2">
              <Eyebrow tone="dark">{eyebrow}</Eyebrow>
              <h3 className="text-heading-2">{title}</h3>
            </div>
            <p data-copy className="text-body-md text-white/90">
              {description}
            </p>
            <div data-copy>
              <Button href={cta.href} variant="primary" icon="arrow-up-right">
                {cta.label}
              </Button>
            </div>
          </div>
        </div>

        <ul className="relative flex flex-wrap justify-between gap-4 bg-white px-6 py-5 text-ink lg:absolute lg:right-0 lg:bottom-0 lg:h-[6.3125rem] lg:w-[33.25rem] lg:flex-nowrap lg:items-center lg:justify-evenly lg:gap-0 lg:bg-transparent lg:py-0 lg:pr-3 lg:pl-5">
          {categories.map((category) => (
            <li key={category.label} data-chip className="group flex flex-col items-center gap-2">
              <KitIcon
                name={category.icon}
                className="size-6 text-turquoise transition-transform duration-700 ease-out-expo group-hover:-translate-y-1"
              />
              <span className="text-body-xs font-semibold">{category.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
