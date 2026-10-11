"use client";

import { type ReactNode, useRef, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import type { StoryMedia } from "@/types/content";
import type { VideoAsset } from "@/types/media";
import { FilmDialog } from "@/components/media/FilmDialog";
import { ScrollScrubVideo, type ScrubController } from "@/components/media/ScrollScrubVideo";
import { Media } from "@/components/media/Media";
import { Icon } from "@/components/ui/Icon";

type AboutStoryProps = {
  story: StoryMedia;
  film: VideoAsset;
  /** Overlay content revealed once the frame has fully opened (the stats card). */
  aside: ReactNode;
};

const SIZES = "100vw";

/**
 * Desktop: the stage pins while the media frame opens from a centred window to full bleed.
 * When the story media is a scroll-scrub video, its playback follows the same timeline.
 * Mobile and reduced motion: a static full-width frame, with scrubbing tied to plain scrolling.
 */
export function AboutStory({ story, film, aside }: AboutStoryProps) {
  const scrub = useRef<ScrubController>(null);
  const [filmOpen, setFilmOpen] = useState(false);
  const isScrub = story.media.type === "video" && story.playback === "scroll-scrub";

  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    const frame = scope.querySelector<HTMLElement>("[data-story-frame]");
    const asideEl = scope.querySelector<HTMLElement>("[data-story-aside]");
    const stage = scope.querySelector<HTMLElement>("[data-story-stage]");
    if (!frame || !asideEl || !stage) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (reducedMotion) return;
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => scrub.current?.seek(self.progress),
        },
      });
      timeline
        .fromTo(
          frame,
          { clipPath: "inset(18% 27% 18% 27% round 6px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.75 },
        )
        .fromTo(
          asideEl,
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.72,
        )
        .to({}, { duration: 0.08 });
    });

    mm.add("(max-width: 1023px)", () => {
      ScrollTrigger.create({
        trigger: frame,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => scrub.current?.seek(self.progress),
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref}>
      <div data-story-stage className="relative lg:h-svh lg:overflow-hidden">
        <div
          data-story-frame
          className="relative aspect-[4/5] w-full overflow-hidden bg-abyss sm:aspect-video lg:absolute lg:inset-0 lg:aspect-auto"
        >
          {isScrub && story.media.type === "video" ? (
            <ScrollScrubVideo
              asset={story.media}
              mode="external"
              controllerRef={scrub}
              sizes={SIZES}
              className="absolute inset-0"
            />
          ) : (
            <Media
              asset={story.media}
              playback={story.playback}
              sizes={SIZES}
              className="absolute inset-0"
            />
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-abyss/15" />
          <button
            type="button"
            onClick={() => setFilmOpen(true)}
            className="group absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 text-white"
          >
            <span className="grid size-22 place-items-center rounded-full border border-white/40 glass transition-transform duration-700 ease-out-expo group-hover:scale-110">
              <Icon name="play" className="size-6 translate-x-0.5" />
            </span>
            <span className="eyebrow">Play film</span>
          </button>
        </div>
        <div
          data-story-aside
          className="relative z-10 -mt-10 px-gutter lg:absolute lg:right-(--spacing-gutter) lg:bottom-12 lg:mt-0 lg:w-full lg:max-w-sm lg:px-0"
        >
          {aside}
        </div>
      </div>
      <FilmDialog film={film} open={filmOpen} onClose={() => setFilmOpen(false)} />
    </div>
  );
}
