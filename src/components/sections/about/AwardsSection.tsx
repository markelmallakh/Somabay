"use client";

import { useRef } from "react";
import { awards, awardsIntro } from "@/content/about";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * A small band of awards under the masterplan: the heading on the left with previous / next
 * arrows under it, then a row of awards (four on screen on laptops) that slides one award at a
 * time and loops round at either end. Each award shows its badge (on the right), title and year,
 * the awarding body and what won it, divided by hairlines. Phones swipe the row.
 */
export function AwardsSection() {
  const row = useRef<HTMLUListElement>(null);

  const page = (direction: 1 | -1) => {
    const list = row.current;
    if (!list) return;
    const step = (list.firstElementChild as HTMLElement | null)?.offsetWidth ?? list.clientWidth;
    const max = list.scrollWidth - list.clientWidth;
    if (direction === 1 && list.scrollLeft >= max - 4)
      list.scrollTo({ left: 0, behavior: "smooth" });
    else if (direction === -1 && list.scrollLeft <= 4)
      list.scrollTo({ left: max, behavior: "smooth" });
    else list.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="awards-title" className="bg-white py-14 text-ink sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
          <Reveal className="flex flex-col gap-2 lg:col-span-3 lg:gap-3">
            <Eyebrow>{awardsIntro.eyebrow}</Eyebrow>
            <h2 id="awards-title" className="text-heading-3 text-balance">
              {awardsIntro.title}
            </h2>
            <CarouselArrows
              canBack
              canForward
              onPage={page}
              label="awards"
              className="mt-4 lg:mt-6"
            />
          </Reveal>
          <Reveal delay={0.1} className="min-w-0 lg:col-span-9">
            <ul
              ref={row}
              aria-label="Awards"
              className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
            >
              {awards.map((award) => (
                <li
                  key={`${award.title}-${award.year}`}
                  className="flex w-[70%] shrink-0 snap-start flex-col items-start gap-3 border-l border-line px-4 sm:w-1/3 sm:px-6 lg:w-1/4"
                >
                  {/* The award's badge on the right, then its title with the year under it. */}
                  <span className="relative block size-16 shrink-0 self-end sm:size-20">
                    <ResponsiveImage
                      asset={award.badge}
                      alt=""
                      sizes="5rem"
                      fill
                      className="object-contain"
                    />
                  </span>
                  <span className="flex flex-col gap-1">
                    <h3 className="font-serif text-[1.0625rem] leading-[1.25]">{award.title}</h3>
                    <span className="text-body-xs font-semibold tracking-label text-turquoise uppercase">
                      {award.year}
                    </span>
                  </span>
                  <p className="text-body-sm text-slate">
                    <span className="text-ink">{award.by}</span>
                    <br />
                    {award.winner}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
