"use client";

import { AnimatePresence, m } from "framer-motion";
import { type ReactNode, useState } from "react";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { Hotel } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Stars } from "@/components/ui/Stars";
import { TextLink } from "@/components/ui/TextLink";

type HotelsShowcaseProps = {
  hotels: Hotel[];
  hrefs: string[];
  ctaLabel: string;
  /** Section heading, kept in view at the top of the pinned stage on desktop. */
  heading: ReactNode;
};

/** Where each of a hotel's three images floats around the centred list (desktop). */
const slots = [
  { className: "left-[5%] top-[16%] w-[21vw] aspect-[4/3]", sizes: "22vw" },
  { className: "left-[15%] bottom-[10%] w-[13vw] aspect-[4/3]", sizes: "14vw" },
  { className: "right-[5%] top-[24%] w-[17vw] aspect-[3/4]", sizes: "18vw" },
] as const;

export function HotelsShowcase({ hotels, hrefs, ctaLabel, heading }: HotelsShowcaseProps) {
  const [active, setActive] = useState(0);
  const current = hotels[active];

  const ref = useGsap<HTMLDivElement>(
    ({ scope, reducedMotion }) => {
      const list = scope.querySelector<HTMLElement>("[data-hotel-list]");
      const firstItem = list?.firstElementChild;
      if (!list || !(firstItem instanceof HTMLElement)) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const steps = hotels.length - 1;
        gsap.to(list, {
          y: () => -steps * firstItem.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: `+=${hotels.length * 65}%`,
            pin: true,
            scrub: reducedMotion ? true : 0.6,
            snap: reducedMotion
              ? undefined
              : { snapTo: 1 / steps, duration: 0.5, ease: "power2.inOut" },
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * steps)),
          },
        });
      });
      return () => mm.revert();
    },
    [hotels.length],
  );

  return (
    <div ref={ref} className="relative lg:h-svh lg:overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {slots.map((slot, index) => (
          <div key={index} className={cn("absolute overflow-hidden", slot.className)}>
            <AnimatePresence initial={false}>
              <m.div
                key={current.slug}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                transition={{ duration: 1.2, ease: easeOutExpo, delay: index * 0.08 }}
              >
                <ResponsiveImage asset={current.images[index]} alt="" sizes={slot.sizes} fill />
              </m.div>
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="relative z-10 pb-16 text-center lg:absolute lg:inset-x-0 lg:top-0 lg:pt-[calc(var(--header-height)+2rem)] lg:pb-0">
        {heading}
      </div>

      <div className="relative lg:absolute lg:inset-0 lg:mask-[linear-gradient(to_bottom,transparent_27%,black_42%,black_72%,transparent_90%)]">
        <ol
          data-hotel-list
          className="flex flex-col gap-16 [--item-h:15rem] lg:absolute lg:inset-x-0 lg:top-[calc(50%-var(--item-h)/2+2.5rem)] lg:gap-0"
        >
          {hotels.map((hotel, index) => {
            const isActive = index === active;
            return (
              <li
                key={hotel.slug}
                className={cn(
                  "flex flex-col items-center text-center lg:h-(--item-h) lg:justify-center",
                  "transition-[opacity,transform] duration-700 ease-out-expo",
                  isActive ? "lg:opacity-100" : "lg:scale-[0.92] lg:opacity-20",
                )}
              >
                <div className="relative mb-8 aspect-[4/3] w-full max-w-md overflow-hidden lg:hidden">
                  <ResponsiveImage
                    asset={hotel.images[0]}
                    sizes="(min-width: 640px) 28rem, 100vw"
                    fill
                  />
                </div>
                <p className="eyebrow bg-white/10 px-2.5 py-1 text-[0.6875rem] text-white/85">
                  {hotel.tagline}
                </p>
                <h3 className="mt-4 max-w-md font-serif text-[clamp(2.25rem,1.8rem+2vw,3.75rem)] leading-[1.02]">
                  {hotel.name}
                </h3>
                {hotel.stars ? <Stars count={hotel.stars} className="mt-4 text-white/80" /> : null}
                <TextLink
                  href={hrefs[index]}
                  srContext={hotel.name}
                  className={cn("mt-5 text-white/90", !isActive && "lg:pointer-events-none")}
                >
                  {ctaLabel}
                </TextLink>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
