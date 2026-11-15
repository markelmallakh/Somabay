"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { neighborhoodsIntro } from "@/content/home";
import type { MapPlace, Neighborhood, NeighborhoodStatus } from "@/types/content";
import { useGsap } from "@/hooks/useGsap";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { getLenis } from "@/components/animations/SmoothScroll";
import { PlacesMap } from "@/components/map/PlacesMap";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { neighborhoodImage } from "./neighborhoodImage";

type NeighborhoodGridProps = {
  neighborhoods: Neighborhood[];
  hrefs: Record<string, string>;
  /** Map position of each neighborhood that has one, by slug. */
  places: Record<string, Pick<MapPlace, "lat" | "lng">>;
  titleId: string;
  title: string;
  description?: string;
};

type Filter = "all" | NeighborhoodStatus;
type View = "grid" | "map";

const statusLabel: Record<NeighborhoodStatus, string> = {
  living: "Living Now",
  upcoming: "Coming Soon",
};

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "living", label: "Living Now" },
  { id: "upcoming", label: "Coming Next" },
];

/**
 * "Explore the Neighborhoods": a centred heading that rises line by line, then status chips (All,
 * Living Now, Coming Next) and a Grid / Map switch. The grid shows large portrait cards in two
 * columns; on desktop the right column sits lower and drifts at its own pace while scrolling, and
 * each card unveils with a soft wipe. The map pins every neighborhood; a pin opens its preview.
 * Once the controls under the heading scroll away, a floating copy holds the bottom centre of the
 * screen until the cards end.
 */
export function NeighborhoodGrid({
  neighborhoods,
  hrefs,
  places,
  titleId,
  title,
  description,
}: NeighborhoodGridProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("grid");
  const [selected, setSelected] = useState<string | null>(null);
  const [floating, setFloating] = useState(false);
  const items =
    filter === "all" ? neighborhoods : neighborhoods.filter((item) => item.status === filter);
  const top = useRef<HTMLDivElement>(null);
  const inline = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const grid = useGsap<HTMLDivElement>(
    ({ scope, reducedMotion }) => {
      if (reducedMotion) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]", scope);

      // Each card unveils from a slightly inset frame as it scrolls in; its copy follows.
      cards.forEach((card) => {
        const copy = card.querySelectorAll("[data-card-copy] > *");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          })
          .fromTo(
            card,
            { clipPath: "inset(10% 6% 0% 6% round 4px)", autoAlpha: 0 },
            {
              clipPath: "inset(0% 0% 0% 0% round 4px)",
              autoAlpha: 1,
              duration: 1.4,
              ease: "expo.out",
            },
          )
          .from(
            copy,
            { y: 24, autoAlpha: 0, duration: 1, stagger: 0.08, ease: "power3.out" },
            0.35,
          );
      });

      // Desktop: the two columns move at different speeds, the right one starting lower.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-column]", scope).forEach((wrap) => {
          const right = wrap.dataset.column === "right";
          gsap.fromTo(
            wrap,
            { y: right ? 220 : 40 },
            {
              y: -40,
              ease: "none",
              scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: 0.6 },
            },
          );
        });
      });

      // The list changed height: let every trigger below it re-measure.
      const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(frame);
        mm.revert();
      };
    },
    [filter, view],
  );

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = inline.current?.getBoundingClientRect();
      const box = list.current?.getBoundingClientRect();
      // Only the long grid gets the floating controls; the map is short enough without them.
      setFloating(
        view === "grid" &&
          !!anchor &&
          !!box &&
          anchor.bottom < 0 &&
          box.bottom > window.innerHeight * 0.75,
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [view]);

  // Changing the list deep in the section brings the visitor back to the top of the new one.
  const backToTop = () => {
    const element = top.current;
    if (!element || element.getBoundingClientRect().top >= 0) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(element, { offset: -120, duration: 1.2 });
    else element.scrollIntoView({ behavior: "smooth" });
  };
  const chooseFilter = (next: Filter) => {
    setFilter(next);
    setSelected(null);
    backToTop();
  };
  const chooseView = (next: View) => {
    setView(next);
    backToTop();
  };

  const pins: MapPlace[] = items.flatMap((item) => {
    const point = places[item.slug];
    return point
      ? [{ id: item.slug, name: item.name, subtitle: statusLabel[item.status], ...point }]
      : [];
  });
  const preview = items.find((item) => item.slug === selected);

  // Under the heading the chips sit left and the view switch right; the floating copy packs both
  // into one centred bar with a divider.
  const controls = (spread: boolean) => (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-6 gap-y-4",
        spread ? "justify-between" : "justify-center",
      )}
    >
      <div
        role="radiogroup"
        aria-label="Neighborhood status"
        className={cn("flex flex-wrap", spread ? "gap-2" : "gap-1")}
      >
        {filters.map((option) => {
          const checked = option.id === filter;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={checked}
              onClick={() => chooseFilter(option.id)}
              className={cn(
                "inline-flex min-h-10 items-center rounded-md border px-4 text-[0.8125rem] transition-colors duration-500",
                // Floating over the photos, each chip carries its own soft shadow.
                !spread && "shadow-float",
                checked
                  ? "border-turquoise bg-turquoise text-white"
                  : "border-line bg-white text-ink hover:border-turquoise/60 hover:text-turquoise-160",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {/* The floating bar carries the status chips only; the view switch stays up top. */}
      {spread ? (
        <SegmentedControl
          label="Neighborhood view"
          value={view}
          onChange={chooseView}
          options={[
            { id: "grid", label: "Grid", icon: "grid" },
            { id: "map", label: "Map", icon: "map" },
          ]}
        />
      ) : null}
    </div>
  );

  return (
    <>
      <div ref={top} className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <SplitHeading id={titleId} className="text-heading-2 text-balance">
          {title}
        </SplitHeading>
        {description ? (
          <Reveal delay={0.25}>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-slate">{description}</p>
          </Reveal>
        ) : null}
      </div>
      <Reveal delay={0.35}>
        <div ref={inline} className="mt-8 lg:mt-10">
          {controls(true)}
        </div>
      </Reveal>

      <div ref={list}>
        {view === "grid" ? (
          <div
            key={filter}
            ref={grid}
            className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-x-6 lg:pb-8"
          >
            {(["left", "right"] as const).map((side) => (
              <div key={side} data-column={side} className="contents lg:block">
                <ul className="contents lg:flex lg:flex-col lg:gap-6">
                  {items
                    .filter((_, index) => index % 2 === (side === "left" ? 0 : 1))
                    .map((item) => (
                      <li
                        key={item.slug}
                        data-card
                        // Mobile keeps the original order inside one column.
                        style={{ order: items.indexOf(item) }}
                      >
                        <PhotoCard
                          href={hrefs[item.slug]}
                          image={neighborhoodImage(item)}
                          sizes="(min-width: 1024px) 46vw, 100vw"
                          tag={statusLabel[item.status]}
                          kicker={item.tagline}
                          title={item.name}
                          summary={item.summary}
                          action={neighborhoodsIntro.cardCta}
                          size="lg"
                          // Desktop: a whole card fits on screen under the header, never taller than 42rem.
                          className="aspect-[4/5] w-full lg:aspect-auto lg:h-[min(calc(100svh-var(--header-bar)-8rem),42rem)]"
                        />
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative mt-6">
            <PlacesMap
              key={filter}
              places={pins}
              selectedId={selected}
              onSelect={(id) => setSelected((current) => (current === id ? null : id))}
              label="Map of Somabay neighborhoods"
              className="aspect-[4/5] rounded-md sm:aspect-[21/9]"
            />
            {/* The chosen neighborhood's preview, pinned to the map's corner. */}
            {preview ? (
              <div className="relative z-[500] mx-4 -mt-16 overflow-hidden rounded-md bg-white shadow-card sm:mx-8 lg:absolute lg:top-6 lg:right-6 lg:mx-0 lg:mt-0 lg:w-80">
                <div className="relative aspect-[16/10]">
                  <ResponsiveImage asset={neighborhoodImage(preview)} sizes="20rem" fill />
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 grid size-8 place-items-center rounded-md bg-white/90 text-ink transition-colors hover:bg-white"
                  >
                    <Icon name="close" className="size-4" />
                    <span className="sr-only">Close preview</span>
                  </button>
                </div>
                <div className="p-5">
                  <p className="text-body-xs font-semibold tracking-label text-turquoise-160 uppercase">
                    {statusLabel[preview.status]}
                  </p>
                  <p className="mt-2 text-body-sm text-slate">{preview.tagline}</p>
                  <p className="mt-1 font-serif text-heading-5">{preview.name}</p>
                  <Link
                    href={hrefs[preview.slug]}
                    className="group mt-4 inline-flex items-center gap-2 text-body-sm font-semibold text-ink transition-colors hover:text-turquoise-160"
                  >
                    {neighborhoodsIntro.cardCta}
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {/* The floating copy: slides up at the bottom centre while the cards scroll by. */}
      <div
        inert={!floating}
        className={cn(
          "fixed inset-x-0 bottom-6 z-20 flex justify-center px-4 transition-[opacity,translate] duration-500 ease-out-expo lg:bottom-8",
          floating ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <div>{controls(false)}</div>
      </div>
    </>
  );
}
