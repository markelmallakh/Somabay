"use client";

import { image } from "@/lib/media";
import type { ImageAsset } from "@/types/media";
import { Container } from "@/components/layout/Container";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { useGsap } from "@/hooks/useGsap";
import { gsap } from "@/lib/gsap";
import { Icon } from "@/components/ui/Icon";

type UnitType = {
  title: string;
  brief: string;
  image: ImageAsset;
  bedrooms: number;
  bathrooms: number;
  /** Built-up area in square metres. */
  size: number;
};

// DUMMY CONTENT: the residence types shown on the masterplan, with placeholder briefs, bedroom
// and bathroom counts and sizes, until the client supplies the real unit types and specifications.
const unitTypes: UnitType[] = [
  {
    title: "Cliffside Villas",
    bedrooms: 4,
    bathrooms: 4,
    size: 320,
    brief:
      "Detached homes along the upper ridge, with open-plan living opening onto terraces that face the sea.",
    image: image(
      "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-2.webp",
      "Villas along the cliff above the sea",
    ),
  },
  {
    title: "Garden Villas",
    bedrooms: 3,
    bathrooms: 3,
    size: 220,
    brief:
      "Single-storey villas wrapped around private gardens, made for easy indoor and outdoor living.",
    image: image(
      "/images/library/residences/patio-212/2026-02-04-at-2-06-06-pm.webp",
      "A garden villa terrace",
    ),
  },
  {
    title: "Townhouses",
    bedrooms: 3,
    bathrooms: 2,
    size: 180,
    brief:
      "Terraced homes in short rows, each with its own entrance, roof terrace and views down the slope.",
    image: image(
      "/images/library/residences/reeftown/2025-05-15-at-5-25-59-pm-2.webp",
      "A townhouse terrace under arched columns",
    ),
  },
  {
    title: "Beachfront Villas",
    bedrooms: 4,
    bathrooms: 5,
    size: 380,
    brief: "The row closest to the shore, with the beach a few steps from the garden gate.",
    image: image(
      "/images/library/residences/somabreeze/2025-05-19-at-6-02-36-pm.webp",
      "A villa pool looking out to the sea",
    ),
  },
  {
    title: "Twin Villas",
    bedrooms: 3,
    bathrooms: 3,
    size: 240,
    brief: "Pairs of villas sharing a garden wall, each with its own pool and entrance.",
    image: image(
      "/images/library/residences/patio-212/2026-02-04-at-2-06-44-pm-1.webp",
      "A twin villa garden",
    ),
  },
  {
    title: "Garden Apartments",
    bedrooms: 2,
    bathrooms: 2,
    size: 140,
    brief: "Ground-floor apartments opening straight onto shared, landscaped gardens.",
    image: image(
      "/images/library/residences/reeftown/2025-05-15-at-5-26-04-pm-3.webp",
      "A garden with a view to the sea",
    ),
  },
  {
    title: "Penthouses",
    bedrooms: 3,
    bathrooms: 3,
    size: 210,
    brief: "Top-floor homes with wide roof terraces and open views over the bay.",
    image: image(
      "/images/library/residences/villa-103/2025-05-15-at-5-22-35-pm-1.webp",
      "A bright, open living space",
    ),
  },
];

/**
 * The neighborhood's unit types after its masterplan, held in view while the page's scroll slides
 * the row sideways: a
 * photo card per type with its name and compact specs; hovering or focusing a card lifts its
 * brief and a Request Interest link out of a mask.
 */
export function UnitTypes({ name }: { name: string }) {
  // Desktop: the section fills the screen and holds still while the page's scroll slides
  // the cards sideways through the whole row; once the last card is in, the page moves on.
  const sectionRef = useGsap<HTMLElement>(({ scope, reducedMotion }) => {
    if (reducedMotion) return;
    const row = scope.querySelector<HTMLElement>("[data-row]");
    const frame = scope.querySelector<HTMLElement>("[data-frame]");
    if (!row || !frame) return;
    const distance = () => Math.max(0, row.scrollWidth - frame.clientWidth);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.to(row, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: scope,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    // Continues the masterplan section above it: the same ground, and closer to it.
    <section
      ref={sectionRef}
      aria-labelledby="unit-types-title"
      className="bg-sand-100 pt-6 pb-section text-ink lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-(--header-bar) lg:pb-16"
    >
      <Container>
        <HeadingRow
          id="unit-types-title"
          eyebrow="Unit Types"
          title={`Homes in ${name}`}
          description="Choose from detached villas, garden homes and townhouses, each placed to make the most of the views."
        />
      </Container>

      {/* One row of cards; on desktop the page's scroll slides it while the section is held.
          Below desktop (and without motion) it is a row you swipe, each card snapping in. */}
      <div
        data-frame
        className="mt-6 max-md:px-gutter sm:mt-10 md:scrollbar-none md:snap-x md:snap-mandatory md:scroll-ps-site md:overflow-x-auto lg:mt-12 lg:snap-none lg:overflow-hidden lg:motion-reduce:overflow-x-auto"
      >
        {/* Phones: the card centred with its neighbours peeking at both edges. */}
        <ul data-row className="max-md:swipe-row md:flex md:w-max md:gap-4 md:ps-site md:pe-gutter">
          {unitTypes.map((unit) => (
            <li key={unit.title} className="md:w-[min(78vw,21rem)] md:shrink-0 md:snap-start">
              <UnitCard unit={unit} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One unit type: the photo with its name and specs; the brief rises out of a mask on hover. */
function UnitCard({ unit }: { unit: UnitType }) {
  return (
    <div
      tabIndex={0}
      className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-md text-white outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-turquoise"
    >
      <ResponsiveImage
        asset={unit.image}
        sizes="(min-width: 768px) 21rem, 84vw"
        fill
        className="-z-10 transition-transform duration-[1600ms] ease-out-expo group-focus-within:scale-[1.05] group-hover:scale-[1.05]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(0_0_0/0.85),rgb(0_0_0/0.35)_45%,rgb(0_0_0/0.05)_75%)]"
      />
      <div className="p-5 sm:p-6">
        <h3 className="font-serif text-heading-5">{unit.title}</h3>
        {/* Compact specs: always on show. */}
        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-body-sm text-white/85">
          <li className="flex items-center gap-1.5">
            <Icon name="bed-min" className="size-4" />
            {unit.bedrooms} Beds
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="bath-min" className="size-4" />
            {unit.bathrooms} Baths
          </li>
          <li className="flex items-center gap-1.5">
            <Icon name="area-min" className="size-4" />
            {unit.size} sqm
          </li>
        </ul>
        {/* The brief and the link rise out of a mask on hover (always shown below desktop). */}
        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-out-expo lg:grid-rows-[0fr] lg:group-focus-within:grid-rows-[1fr] lg:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <div className="transition-[opacity,translate] delay-100 duration-700 ease-out-expo lg:translate-y-6 lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
              <p className="mt-3 border-t border-white/25 pt-3 text-body-sm text-white/85 sm:mt-4 sm:pt-4">
                {unit.brief}
              </p>
              <a
                href="#register-interest"
                className="mt-2 inline-flex min-h-10 items-center text-body-xs font-semibold tracking-label text-sun uppercase transition-colors hover:text-white sm:mt-4 sm:min-h-0"
              >
                Request interest
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
