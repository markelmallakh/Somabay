"use client";

import type { ImageAsset } from "@/types/media";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

/**
 * The story photo travels up alongside the statement as the section scrolls in, turning from its
 * tilt to straight by the time it sits level with the text. Reduced motion shows it straight.
 */
export function StoryPhoto({ photo }: { photo: ImageAsset }) {
  const ref = useGsap<HTMLDivElement>(({ scope, reducedMotion }) => {
    const card = scope.firstElementChild;
    if (!card) return;
    if (reducedMotion) {
      gsap.set(card, { rotate: 0 });
      return;
    }
    gsap.fromTo(
      card,
      { rotate: -10, y: 180 },
      {
        rotate: 0,
        y: 0,
        ease: "none",
        scrollTrigger: {
          trigger: scope.closest("section") ?? scope,
          start: "top 90%",
          end: "center 55%",
          scrub: 0.8,
        },
      },
    );
  });

  return (
    <div ref={ref} className="mx-auto w-full max-w-[20.7rem] lg:mr-0 lg:justify-self-end">
      <div className="relative aspect-[331/296] [transform:rotate(-6deg)] overflow-hidden rounded-[2rem] shadow-[0_24px_48px_rgb(18_58_70/0.16)] will-change-transform">
        <ResponsiveImage asset={photo} sizes="(min-width: 1024px) 331px, 80vw" quality={85} fill />
      </div>
    </div>
  );
}
