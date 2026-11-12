"use client";

import { m, type Variants } from "framer-motion";
import { useState } from "react";
import type { DirectoryItem } from "@/types/content";
import { easeOutExpo } from "@/components/animations/easing";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DetailDrawer } from "@/components/directory/DetailDrawer";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { DragRow } from "@/components/ui/DragRow";
import { Icon } from "@/components/ui/Icon";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";

type VenueSliderProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: DirectoryItem[];
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
 * Venues on deep turquoise (the Wellness Packages style): a draggable slider of photo cards with
 * the name on the shaded foot; on hover the photo pulls up and a white panel shows the category,
 * name and a short line. Touch screens show the panel from the start. Each card opens a side
 * drawer with the venue's photos, description, hours, phones and directions.
 */
export function VenueSlider({ id, eyebrow, title, description, items }: VenueSliderProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Section tone="abyss" aria-labelledby={id} className="overflow-hidden bg-turquoise-160">
      <Container>
        <HeadingRow
          id={id}
          tone="light"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </Container>

      {/* The whole row triggers the entrance (off-screen cards are never "in view" alone). */}
      <m.div initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.25 }}>
        <DragRow label={title} tone="dark" className="mt-12 lg:mt-14">
          {items.map((item, index) => (
            <m.li
              key={item.id}
              custom={index}
              variants={card}
              className="w-[min(80vw,20rem)] shrink-0 snap-start"
            >
              <button
                type="button"
                onClick={() => setOpen(index)}
                aria-label={`${item.title}: details`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-white text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {/* The photo: the whole card at rest, a frame above the panel when open. */}
                <span
                  className={`absolute inset-0 overflow-hidden transition-[clip-path] [clip-path:inset(0_0_0_0_round_0.5rem)] ${ease} group-hover:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)] group-focus-visible:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)] [@media(hover:none)]:[clip-path:inset(0_0_40%_0_round_0.5rem_0.5rem_0_0)]`}
                >
                  <span
                    className={`absolute inset-0 transition-transform ${ease} group-hover:-translate-y-[16%] group-focus-visible:-translate-y-[16%] [@media(hover:none)]:-translate-y-[16%]`}
                  >
                    <m.span custom={index} variants={photo} className="absolute inset-0 block">
                      <ResponsiveImage asset={item.images[0]} sizes="20rem" fill />
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
                  {item.title}
                </span>

                {/* Open: the white panel with the category, name, a short line and the arrow. */}
                <span
                  className={`absolute inset-x-0 bottom-0 flex h-[40%] translate-y-4 flex-col justify-center gap-1.5 px-5 pb-1 opacity-0 transition-[opacity,translate] ${ease} group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100`}
                >
                  {item.chip ? (
                    <span className="text-[0.6875rem] font-semibold tracking-label text-turquoise-160 uppercase">
                      {item.chip}
                    </span>
                  ) : null}
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-serif text-heading-6 leading-[1.2] text-ink">
                      {item.title}
                    </span>
                    <span
                      aria-hidden
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-turquoise text-white"
                    >
                      <Icon name="arrow-up-right" className="size-4" />
                    </span>
                  </span>
                  {item.description ? (
                    <span className="line-clamp-2 text-body-sm text-navy">{item.description}</span>
                  ) : null}
                </span>
              </button>
            </m.li>
          ))}
        </DragRow>
      </m.div>

      <DetailDrawer items={items} index={open} onClose={() => setOpen(null)} onNavigate={setOpen} />
    </Section>
  );
}
