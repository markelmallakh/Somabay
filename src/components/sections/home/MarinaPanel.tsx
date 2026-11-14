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

/**
 * "The Marina" panel. On large screens it arrives as a full-bleed film with nothing on it; while
 * the section is pinned, scrolling draws the film in to the content width, then the copy and a
 * quiet line of amenities along the film's foot fade in. The panel keeps four clean corners.
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
    const bar = scope.querySelector<HTMLElement>("[data-bar]");
    const panel = scope.querySelector<HTMLElement>("[data-panel]");
    if (!photo || !zoom || !veil || !bar || !panel) return;
    const copy = scope.querySelectorAll("[data-copy]");
    const chips = scope.querySelectorAll("[data-chip]");

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
            borderRadius: 0,
          },
          { left: 0, right: 0, top: 0, bottom: 0, borderRadius: 4, duration: 1 },
          0,
        )
        .fromTo(zoom, { scale: 1.12 }, { scale: 1, duration: 1 }, 0)
        .fromTo(veil, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.45)
        .fromTo(bar, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 0.6)
        .fromTo(
          copy,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power3.out" },
          0.65,
        )
        .fromTo(
          chips,
          { autoAlpha: 0, y: 12 },
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
      <div data-panel className="relative isolate w-full rounded-md text-white">
        {/* The film clips itself and the amenities bar inside it. */}
        <div data-photo className="absolute inset-0 -z-10 overflow-hidden rounded-md">
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

          {/* Amenities: one quiet line along the film's foot, over a soft shade, under a hairline. */}
          <div
            data-bar
            className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.55),transparent)] px-[clamp(1.5rem,4vw,3.75rem)] pt-16 pb-7"
          >
            <ul className="scrollbar-none flex gap-x-8 overflow-x-auto border-t border-white/25 pt-5 lg:flex-wrap lg:gap-x-10 lg:gap-y-3 lg:overflow-visible">
              {categories.map((category) => (
                <li
                  key={category.label}
                  data-chip
                  className="flex shrink-0 items-center gap-2 text-white/80 transition-colors duration-500 hover:text-white"
                >
                  <KitIcon name={category.icon} className="size-4" />
                  <span className="text-body-xs font-medium tracking-label uppercase">
                    {category.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pointer-events-none flex min-h-[clamp(30rem,45vw,42.5rem)] flex-col justify-center px-[clamp(1.5rem,4vw,3.75rem)] pt-16 pb-32">
          <div className="pointer-events-auto flex max-w-[32.5rem] flex-col gap-6">
            <div data-copy className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
