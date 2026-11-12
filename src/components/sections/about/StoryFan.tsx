"use client";

import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/media";
import { useGsap } from "@/hooks/useGsap";
import { gsap, SplitText } from "@/lib/gsap";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

type StoryFanProps = {
  title: string;
  /** Shown under the statement; the statement stays put until this reaches it. */
  children?: ReactNode;
  paragraph: string;
  /** The photos, left to right. */
  photos: ImageAsset[];
};

/**
 * About story: the "Somabay Story" headline, three photos standing side by side that pop up one
 * after another, then the statement set large and centred, its words rising out of each line
 * in a wave; it then holds in place while the figures under it rise to meet it.
 */
export function StoryFan({ title, paragraph, photos, children }: StoryFanProps) {
  const scope = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;

    gsap.from("[data-story-title]", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: { trigger: scope, start: "top 80%", once: true },
    });

    // The photos pop up one after another, fast.
    gsap.from("[data-story-photo]", {
      yPercent: 30,
      scale: 0.9,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "expo.out",
      scrollTrigger: { trigger: "[data-story-photos]", start: "top 85%", once: true },
    });

    // The statement: every word rises out of its line's mask, in a quick wave.
    const split = SplitText.create("[data-story-paragraph]", {
      type: "lines,words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.words, {
          yPercent: 110,
          duration: 1.6,
          stagger: 0.06,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-story-paragraph]", start: "top 75%", once: true },
        });
      },
    });
    return () => split.revert();
  });

  return (
    <div ref={scope} className="flex flex-col items-center gap-14 text-center lg:gap-20">
      <h2
        id="story-title"
        data-story-title
        className="font-serif text-heading-2 leading-[1.15] text-ink"
      >
        {title}
      </h2>

      {/* The photos, standing side by side. */}
      <ul data-story-photos className="grid w-full grid-cols-3 gap-2 md:gap-4">
        {photos.map((photo) => (
          <li
            key={photo.src}
            data-story-photo
            className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-turquoise-10"
          >
            <ResponsiveImage
              asset={photo}
              sizes="(min-width: 1512px) 464px, 33vw"
              quality={85}
              fill
            />
          </li>
        ))}
      </ul>

      {/* The statement holds in place (sticky) while the figures below rise up to meet it, then
          both leave together. */}
      <div className="w-full">
        {/* The sticky area ends exactly where the figures begin, so they meet without overlap. */}
        <div>
          <p
            data-story-paragraph
            className="mx-auto max-w-[58rem] py-12 text-[clamp(1.5rem,1.05rem+1.25vw,2.25rem)] leading-[1.35] text-ink md:py-16 lg:sticky lg:top-[calc(var(--header-height)+14vh)] lg:py-0"
          >
            {paragraph}
          </p>
          {/* Room for the statement to hold (sticky can't travel into padding). */}
          <div aria-hidden className="hidden h-[40vh] lg:block" />
        </div>
        {children ? <div className="text-left lg:mt-16">{children}</div> : null}
      </div>
    </div>
  );
}
