"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { DirectoryItem, SectionIntro } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type AmenitiesShowcaseProps = {
  id: string;
  intro: SectionIntro;
  items: DirectoryItem[];
};

/**
 * "Everything Within Reach": the heading over a large photo on the left, and on the right an
 * indexed list of amenities in serif. Hovering or focusing a name makes it the active one: its
 * photo wipes up on the left and its description opens under it. On phones each row shows its own
 * photo and description.
 */
export function AmenitiesShowcase({ id, intro, items }: AmenitiesShowcaseProps) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <section aria-labelledby={id} className="bg-white py-section text-ink">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col lg:col-span-5">
          <Reveal className="flex flex-col gap-5">
            {intro.eyebrow ? <Eyebrow>{intro.eyebrow}</Eyebrow> : null}
            <h2 id={id} className="text-heading-2 text-balance">
              {intro.title}
            </h2>
            {intro.description ? (
              <p className="max-w-md text-body-lg text-slate">{intro.description}</p>
            ) : null}
          </Reveal>

          {/* The active amenity's photo, wiping up over the last one. */}
          <Reveal
            delay={0.15}
            className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-md bg-sand-200 lg:block"
          >
            <AnimatePresence initial={false}>
              <m.div
                key={current.id}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.7 } }}
                transition={{ duration: 0.9, ease: easeOutExpo }}
              >
                <m.div
                  className="absolute inset-0"
                  initial={{ scale: 1.12 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: easeOutExpo }}
                >
                  <ResponsiveImage
                    asset={current.images[0]}
                    sizes="(min-width: 1024px) 38vw, 0px"
                    fill
                  />
                </m.div>
              </m.div>
            </AnimatePresence>
            <span
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.45),transparent_45%)]"
            />
            <m.p
              key={`caption-${current.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="absolute bottom-5 left-6 text-label tracking-label text-white uppercase"
            >
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </m.p>
          </Reveal>
        </div>

        <ul className="border-t border-line lg:col-span-6 lg:col-start-7 lg:self-end">
          {items.map((item, index) => {
            const on = index === active;
            return (
              <Reveal as="li" key={item.id} delay={index * 0.05} className="border-b border-line">
                {/* Hover, focus or a tap picks the amenity; the row itself is not a link. */}
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setActive(index)}
                  onPointerEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group flex w-full gap-6 py-6 text-left outline-none focus-visible:bg-sand-100 lg:py-7"
                >
                  <span
                    className={cn(
                      "w-8 shrink-0 pt-2 text-label tracking-label tabular-nums transition-colors duration-500",
                      on ? "text-turquoise" : "text-mist",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="block min-w-0 flex-1">
                    <span
                      className={cn(
                        "block",
                        "font-serif text-heading-4 leading-[1.2] transition-colors duration-500",
                        on ? "text-ink" : "text-ink/45 group-hover:text-ink",
                      )}
                    >
                      {item.title}
                    </span>
                    {/* Phones: the row's own photo. */}
                    <span className="relative mt-4 block aspect-[16/10] overflow-hidden rounded-md bg-sand-200 lg:hidden">
                      <ResponsiveImage asset={item.images[0]} sizes="100vw" fill />
                    </span>
                    {item.description ? (
                      <span
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo",
                          on
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0",
                        )}
                      >
                        <span className="block overflow-hidden text-body-md text-slate">
                          <span className="block pt-3">{item.description}</span>
                        </span>
                      </span>
                    ) : null}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
