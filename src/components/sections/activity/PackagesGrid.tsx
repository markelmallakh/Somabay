"use client";

import { m, type Variants } from "framer-motion";
import type { ImageAsset } from "@/types/media";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { DragRow } from "@/components/ui/DragRow";
import { Icon } from "@/components/ui/Icon";

type Package = {
  id: string;
  title: string;
  description: string;
  image: ImageAsset;
  href: string;
};

const ease = "duration-700 ease-out-expo";

/** Each card rises in after the one before it, once the row is in view. */
const card: Variants = {
  hidden: { opacity: 0, y: 60 },
  shown: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: easeOutExpo, delay: index * 0.12 },
  }),
};

/** The photo wipes up while settling from a zoom. */
const photo: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.25 },
  shown: (index: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.4, ease: easeOutExpo, delay: 0.15 + index * 0.12 },
  }),
};

/**
 * The Cascades packages as a compact, draggable slider, styled like the sports and hotel cards:
 * the photo fills the card with the name on its shaded foot; on hover (or focus) the photo pulls
 * up into a rounded frame and a white panel beneath it shows the name, description and an arrow.
 * Touch screens, which cannot hover, show the panel from the start. Each card opens the package's
 * page on The Cascades site.
 */
export function PackagesGrid({ packages }: { packages: Package[] }) {
  return (
    // The whole row triggers the entrance (cards past the right edge are never "in view" alone,
    // so watching each card would leave them hidden).
    <m.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
      <DragRow label="Wellness packages" tone="dark" className="mt-12 lg:mt-14">
        {packages.map((pack, index) => (
          <m.li
            key={pack.id}
            custom={index}
            variants={card}
            className="w-[min(80vw,20rem)] shrink-0 snap-start"
          >
            <a
              href={pack.href}
              target="_blank"
              rel="noopener noreferrer"
              draggable={false}
              className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span className="sr-only"> (opens The Cascades site)</span>

              {/* The photo: the whole card at rest, a rounded frame above the panel when open. */}
              <span
                className={`absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.5rem)] ${ease} group-hover:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)] group-focus-visible:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)] [@media(hover:none)]:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)]`}
              >
                <span
                  className={`absolute inset-0 transition-transform ${ease} group-hover:-translate-y-[16%] group-focus-visible:-translate-y-[16%] [@media(hover:none)]:-translate-y-[16%]`}
                >
                  <m.span custom={index} variants={photo} className="absolute inset-0 block">
                    <ResponsiveImage asset={pack.image} sizes="20rem" fill />
                  </m.span>
                </span>
                <span
                  aria-hidden
                  className={`absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0_0_0/0)_45%,rgb(0_0_0/0.65)_100%)] transition-opacity ${ease} group-hover:opacity-0 group-focus-visible:opacity-0 [@media(hover:none)]:opacity-0`}
                />
              </span>

              {/* At rest: the name on the photo. */}
              <span
                aria-hidden
                className={`absolute inset-x-5 bottom-5 font-serif text-heading-5 leading-[1.15] text-white transition-[opacity,translate] ${ease} group-hover:translate-y-3 group-hover:opacity-0 group-focus-visible:translate-y-3 group-focus-visible:opacity-0 [@media(hover:none)]:opacity-0`}
              >
                {pack.title}
              </span>

              {/* Open: the white panel with the name, description and arrow. */}
              <span
                className={`absolute inset-x-0 bottom-0 flex h-[40%] translate-y-4 flex-col justify-center gap-2 px-5 pb-1 opacity-0 transition-[opacity,translate] ${ease} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-serif text-heading-6 leading-[1.2] text-ink">
                    {pack.title}
                  </span>
                  <span
                    aria-hidden
                    className="grid size-8 shrink-0 place-items-center rounded-full bg-turquoise text-white"
                  >
                    <Icon name="arrow-up-right" className="size-4" />
                  </span>
                </span>
                <span className="line-clamp-3 text-body-sm text-navy">{pack.description}</span>
              </span>
            </a>
          </m.li>
        ))}
      </DragRow>
    </m.div>
  );
}
