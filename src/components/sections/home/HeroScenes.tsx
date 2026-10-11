"use client";

import { useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { HeroScene } from "@/types/content";
import { Video } from "@/components/media/Video";
import { Icon } from "@/components/ui/Icon";

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
              showToggle={scene.id === activeId}
              toggleClassName="bottom-8 left-(--spacing-gutter)"
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
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 rounded-full border border-white/20 glass p-1 text-[0.8125rem] text-white"
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white transition-transform duration-700 ease-out-expo",
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
                "relative z-10 flex min-w-24 items-center justify-center gap-2 rounded-full px-4 py-2 transition-colors duration-500",
                checked ? "text-ink" : "text-white/85 hover:text-white",
              )}
            >
              <Icon name={scene.id === "day" ? "sun" : "moon"} className="size-4" />
              {scene.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
