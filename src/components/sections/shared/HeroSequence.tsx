"use client";

import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { SequenceStep } from "@/types/content";
import type { MediaAsset } from "@/types/media";
import { Media } from "@/components/media/Media";
import { Eyebrow } from "@/components/ui/Eyebrow";

type HeroSequenceProps = {
  media: MediaAsset;
  steps: SequenceStep[];
};

const placements = {
  center: "items-center justify-center text-center",
  "bottom-left": "items-end justify-start pb-16 md:pb-24",
  right: "items-center justify-end",
};

/**
 * Pinned full-screen video whose overlaid copy advances through several steps as the visitor
 * scrolls. Without motion the steps simply stack over the same media.
 */
export function HeroSequence({ media, steps }: HeroSequenceProps) {
  const ref = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const items = gsap.utils.toArray<HTMLElement>("[data-step]", scope);
    gsap.set(items.slice(1), { autoAlpha: 0, y: 40 });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: `+=${(steps.length - 1) * 90}%`,
        pin: true,
        scrub: 0.8,
      },
    });
    items.slice(1).forEach((item, index) => {
      timeline
        .to(items[index], { autoAlpha: 0, y: -40, duration: 0.4 }, index)
        .to(item, { autoAlpha: 1, y: 0, duration: 0.4 }, index + 0.35);
    });
    timeline.to("[data-veil]", { opacity: 0.65, duration: steps.length - 1, ease: "none" }, 0);
  });

  return (
    <section
      ref={ref}
      aria-labelledby="page-title"
      data-theme-surface="dark"
      className="relative isolate h-svh min-h-[40rem] overflow-hidden bg-abyss text-white motion-reduce:h-auto"
    >
      <Media
        asset={media}
        playback="autoplay"
        sizes="100vw"
        priority
        className="absolute inset-0 -z-20"
      />
      <div data-veil aria-hidden className="absolute inset-0 -z-10 bg-abyss opacity-35" />
      <div className="relative h-full motion-reduce:h-auto">
        {steps.map((step, index) => (
          <div
            key={step.title}
            data-step
            className={cn(
              "absolute inset-0 flex px-gutter pt-(--header-height) motion-reduce:relative motion-reduce:min-h-svh",
              placements[step.placement],
            )}
          >
            <div
              className={cn(
                "w-full max-w-site",
                step.placement === "center" ? "mx-auto" : "mx-auto flex",
                step.placement === "right" && "justify-end",
              )}
            >
              <div className={cn(step.placement === "center" ? "mx-auto max-w-3xl" : "max-w-xl")}>
                {step.eyebrow ? <Eyebrow>{step.eyebrow}</Eyebrow> : null}
                {index === 0 ? (
                  <h1 id="page-title" className="mt-5 text-display">
                    {step.title}
                  </h1>
                ) : (
                  <h2 className="mt-5 text-h1">{step.title}</h2>
                )}
                {step.description ? (
                  <p className="mt-6 text-lead text-white/85">{step.description}</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
