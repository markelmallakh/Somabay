"use client";

import { useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { HeroScene } from "@/types/content";
import { Video } from "@/components/media/Video";

type HeroScenesProps = {
  scenes: [HeroScene, HeroScene];
};

/**
 * Full-bleed background media for the hero with a Day / Night switch. The inactive scene's
 * video is not downloaded until it is selected. On scroll the media drifts and settles back,
 * handing the eye to the next section.
 */
export function HeroScenes({ scenes }: HeroScenesProps) {
  const [activeId, setActiveId] = useState<HeroScene["id"]>(scenes[0].id);
  const [visited, setVisited] = useState<Set<HeroScene["id"]>>(() => new Set([scenes[0].id]));

  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    gsap.to(scope.querySelector("[data-hero-media]"), {
      yPercent: 18,
      scale: 1.08,
      ease: "none",
      scrollTrigger: {
        trigger: scope.parentElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  const select = (id: HeroScene["id"]) => {
    setActiveId(id);
    setVisited((previous) => new Set(previous).add(id));
  };

  const activeIndex = scenes.findIndex((scene) => scene.id === activeId);

  return (
    <div ref={ref} className="absolute inset-0">
      <div data-hero-media className="absolute inset-0 will-change-transform">
        {scenes.map((scene, index) =>
          visited.has(scene.id) ? (
            <Video
              key={scene.id}
              asset={scene.media}
              playback="autoplay"
              priority={index === 0}
              active={scene.id === activeId}
              className={cn(
                "absolute inset-0 transition-opacity duration-[1400ms] ease-out-quart",
                scene.id === activeId ? "opacity-100" : "opacity-0",
              )}
            />
          ) : null,
        )}
      </div>

      <div
        role="radiogroup"
        aria-label="Scene"
        // Phones: a small pill centred at the foot of the hero; from `sm` the full-size toggle
        // bottom-left.
        className="absolute bottom-5 left-1/2 z-20 grid w-32 -translate-x-1/2 grid-cols-2 rounded-full bg-white/15 p-0.5 text-body-xs font-medium text-white shadow-[0_8px_32px_rgb(0_0_0/0.2)] backdrop-blur-xl backdrop-saturate-150 sm:bottom-8 sm:left-site sm:w-48 sm:translate-x-0 sm:p-1 sm:text-body-md"
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-0.125rem)] rounded-full bg-white/90 shadow-[0_2px_10px_rgb(0_0_0/0.15)] transition-transform duration-700 ease-out-expo sm:top-1 sm:bottom-1 sm:left-1 sm:w-[calc(50%-0.25rem)]",
            activeIndex === 1 && "translate-x-full",
          )}
        />
        {scenes.map((scene) => {
          const checked = scene.id === activeId;
          return (
            <button
              key={scene.id}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => select(scene.id)}
              className={cn(
                "relative z-10 flex h-7 items-center justify-center gap-1 rounded-full px-2 transition-colors duration-500 sm:h-10 sm:px-3",
                checked ? "text-ink" : "text-white/90 hover:text-white",
              )}
            >
              {scene.id === "day" ? <SunGlyph active={checked} /> : <MoonGlyph active={checked} />}
              {scene.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const glyph = "size-4 shrink-0 overflow-visible sm:size-6";
const fromCentre = "[transform-box:fill-box] origin-center";

/** Sun: resting icon at full strength; when chosen the rays burst out, then keep slowly turning. */
function SunGlyph({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      className={glyph}
    >
      <circle
        cx="12"
        cy="12"
        r="4"
        className={cn(fromCentre, active && "animate-[sun-core_0.9s_var(--ease-out-expo)]")}
      />
      <g className={cn(fromCentre, active && "animate-[spin_14s_linear_infinite]")}>
        <path
          d="M12 2.5v2m0 15v2M4.6 4.6l1.4 1.4m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4"
          className={cn(fromCentre, active && "animate-[sun-burst_1s_var(--ease-out-expo)]")}
        />
      </g>
    </svg>
  );
}

/** Moon: resting icon at full strength; when chosen it swings in, sways calmly and a star twinkles. */
function MoonGlyph({ active }: { active: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={glyph}
    >
      <g className={cn(fromCentre, active && "animate-[moon-sway_6s_ease-in-out_infinite]")}>
        <path
          d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z"
          className={cn(fromCentre, active && "animate-[moon-in_1.1s_var(--ease-out-expo)]")}
        />
      </g>
      <path
        d="M18.5 3.5v3M17 5h3"
        strokeWidth="1.2"
        className={cn(
          fromCentre,
          "transition-[opacity,scale] duration-700 ease-out-expo",
          active ? "animate-[twinkle_3.2s_ease-in-out_infinite] opacity-100" : "scale-0 opacity-0",
        )}
      />
    </svg>
  );
}
