"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { routes } from "@/config/routes";
import { categoryLabel, events } from "@/content/events";
import { image } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { easeOutExpo } from "@/components/animations/easing";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";

type Card = {
  key: string;
  title: string;
  start: string;
  category: string;
  location: string;
  image: ImageAsset;
  href: string;
};

const TODAY = "2026-11-04";
const toCard = (event: (typeof events)[number]): Card => ({
  key: event.slug,
  title: event.title,
  start: event.start,
  category: categoryLabel(event.category).replace(/ event$/i, ""),
  location: event.location,
  image: event.image,
  href: routes.event(event.slug),
});

/**
 * Upcoming cards follow the Figma "Events — Option 3" frame. The festive-season and New Year
 * entries are design placeholders until the live calendar provides them.
 */
const upcoming: Card[] = [
  ...events.filter((event) => event.start >= TODAY).map(toCard),
  {
    key: "festive-season",
    title: "Festive Season at The Marina",
    start: "2026-12-20",
    category: "Seasonal",
    location: "The Marina Somabay",
    image: image("/images/things-to-do/ttd-playpark.webp", "A long table set by the sea"),
    href: routes.events,
  },
  {
    key: "new-years-eve",
    title: "New Year’s Eve by the Bay",
    start: "2026-12-31",
    category: "Celebration",
    location: "Somabay Beach",
    image: image("/images/hotels/showcase-kempinski.webp", "Friends celebrating on a terrace"),
    href: routes.events,
  },
].slice(0, 3);
const past: Card[] = events
  .filter((event) => event.start < TODAY)
  .sort((a, b) => b.start.localeCompare(a.start))
  .slice(0, 3)
  .map(toCard);

const day = new Intl.DateTimeFormat("en-US", { day: "2-digit", timeZone: "UTC" });
const month = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

type Tab = "upcoming" | "past";
const TABS: { id: Tab; label: string }[] = [
  { id: "upcoming", label: "Upcoming events" },
  { id: "past", label: "Past events" },
];

/** Figma "Section / Events — Option 3 (Upcoming)" (426:18317). */
export function HomeEventsSection() {
  const [tab, setTab] = useState<Tab>("upcoming");
  const cards = tab === "upcoming" ? upcoming : past;

  return (
    <section
      aria-labelledby="events-title"
      data-theme-surface="light"
      className="bg-white py-section text-ink"
    >
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Eyebrow>Somabay Events</Eyebrow>
              <h2 id="events-title" className="text-heading-2">
                Events at Somabay
              </h2>
            </div>
            <p className="text-body-md text-slate">
              Races, tournaments and seasonal celebrations by the Red Sea, all year round.
            </p>
          </div>
          <div role="tablist" aria-label="Events" className="flex border-b border-line">
            {TABS.map((item) => {
              const selected = item.id === tab;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "relative -mb-px w-[10rem] pb-4 text-body-sm font-semibold uppercase transition-colors duration-500",
                    selected ? "text-ink" : "text-slate hover:text-ink",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-0.5 origin-left bg-turquoise transition-transform duration-700 ease-out-expo",
                      selected ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          <m.ul
            key={tab}
            role="tabpanel"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="grid gap-6 md:grid-cols-3"
          >
            {cards.map((card) => {
              const date = new Date(card.start);
              const isPast = tab === "past";
              return (
                <li key={card.key}>
                  <SmartLink href={card.href} className="group flex flex-col gap-6">
                    <span className="relative block aspect-[446/480] overflow-hidden rounded-md">
                      <ResponsiveImage
                        asset={card.image}
                        sizes="(min-width: 768px) 30vw, 100vw"
                        fill
                        className={cn(
                          "transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]",
                          isPast && "saturate-[0.4]",
                        )}
                      />
                      <span className="absolute top-4 left-4 flex flex-col items-center rounded-md bg-white px-4 py-2.5 text-ink">
                        <span className="font-serif text-heading-4 leading-none">
                          {day.format(date)}
                        </span>
                        <span
                          className={cn(
                            "mt-1 text-body-sm font-semibold uppercase",
                            isPast ? "text-slate" : "text-turquoise",
                          )}
                        >
                          {month.format(date)}
                        </span>
                      </span>
                      <span className="eyebrow absolute top-4 right-4 rounded-md bg-black/30 px-2 py-0.5 text-white backdrop-blur-lg">
                        {card.category}
                      </span>
                    </span>
                    <span className="flex flex-col gap-4">
                      <span className="font-serif text-heading-5">{card.title}</span>
                      <span className="flex items-center gap-2 text-body-sm text-slate">
                        <Icon name="pin" className="size-4" />
                        {card.location}
                      </span>
                      <span className="inline-flex items-center gap-2 text-body-xs font-semibold tracking-label text-turquoise uppercase">
                        {isPast ? "View highlights" : "Explore event"}
                        <Icon
                          name="arrow-right"
                          className="size-4 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
                        />
                      </span>
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </m.ul>
        </AnimatePresence>

        <div className="flex justify-center">
          <Button href={routes.events} variant="primary" icon="arrow-up-right">
            Explore all events
          </Button>
        </div>
      </Container>
    </section>
  );
}
