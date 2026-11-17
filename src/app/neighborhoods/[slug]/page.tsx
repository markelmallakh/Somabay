import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { PhoneEndCta } from "@/components/layout/HeadingRow";
import { AmenitiesShowcase } from "@/components/sections/live/AmenitiesShowcase";
import { LocationExplorer } from "@/components/sections/live/LocationExplorer";
import { NeighborhoodInterest } from "@/components/sections/live/NeighborhoodInterest";
import { NeighborhoodOverview } from "@/components/sections/live/NeighborhoodOverview";
import { NeighborhoodSectionNav } from "@/components/sections/live/NeighborhoodSectionNav";
import { ProjectMasterplan } from "@/components/sections/live/ProjectMasterplan";
import { UnitTypes } from "@/components/sections/live/UnitTypes";
import { neighborhoodImage } from "@/components/sections/live/neighborhoodImage";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { DragRow } from "@/components/ui/DragRow";
import { routes } from "@/config/routes";
import { faqs } from "@/content/faqs";
import { neighborhoodsIntro } from "@/content/home";
import { amenities, amenitiesIntro } from "@/content/live";
import { getNeighborhood, neighborhoods } from "@/content/neighborhoods";
import { neighborhoodPlaces, venuePlaces } from "@/content/places";
import { travelLabel } from "@/lib/geo";
import { pageMetadata } from "@/lib/metadata";

const statusLabel = { living: "Living Now", upcoming: "Coming Soon" } as const;

export function generateStaticParams() {
  return neighborhoods.map((item) => ({ slug: item.slug }));
}

/** The neighborhood whose page every neighborhood shows for now (see NeighborhoodContent). */
const TEMPLATE_SLUG = "wadi-jebal";

export async function generateMetadata({
  params,
}: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const requested = getNeighborhood((await params).slug);
  if (!requested) return {};
  const item = getNeighborhood(TEMPLATE_SLUG) ?? requested;
  return pageMetadata({
    title: item.name,
    description: `${item.name} — ${item.tagline}. A Somabay neighborhood by the Red Sea.`,
    path: routes.neighborhood(requested.slug),
    image: item.image,
  });
}

async function NeighborhoodContent({
  params,
}: {
  params: PageProps<"/neighborhoods/[slug]">["params"];
}) {
  const requested = getNeighborhood((await params).slug);
  if (!requested) notFound();
  // TEMPORARY (presentation): every neighborhood shows the Wadi Jebal page as the template for
  // the single-neighborhood design, until each one's own content arrives at data entry. Remove
  // this line (and use `requested`) to show each neighborhood's own content again.
  const item = getNeighborhood(TEMPLATE_SLUG) ?? requested;
  const point = neighborhoodPlaces[item.slug];
  const origin = point ? { id: item.slug, name: item.name, ...point } : null;
  const destinations = origin
    ? [venuePlaces.marina, venuePlaces.golf, venuePlaces.splash].map((place) => ({
        ...place,
        distance: travelLabel(origin, place),
      }))
    : [];
  const detail = item.detail;
  // The project masterplan (illustrative until the real site plan is supplied).
  const masterplan = detail?.hasMasterplan ?? false;
  const others = neighborhoods.filter(
    (other) => other.slug !== requested.slug && other.status === item.status,
  );

  const moreCta = (
    <Button href={neighborhoodsIntro.cta.href} variant="outline" icon="arrow-up-right">
      {neighborhoodsIntro.cta.label}
    </Button>
  );
  return (
    <>
      {/* The hero stays in place while the rest of the page slides over it. */}
      <div className="sticky top-0 z-0">
        <PageHero
          variant="centered"
          eyebrow={statusLabel[item.status]}
          title={item.name}
          description={detail?.subtitle ?? item.tagline}
          media={item.heroMedia ?? item.image}
        />
      </div>
      {/* Everything after the hero scrolls up over it, as one sheet with a soft shadow. */}
      {/* The shade falls only upward onto the hero, never down onto the footer. */}
      <div className="relative z-10 before:pointer-events-none before:absolute before:inset-x-0 before:bottom-full before:h-16 before:bg-linear-to-t before:from-black/25 before:to-transparent">
        {detail?.stats || detail?.concept ? (
          <NeighborhoodOverview
            id="concept-title"
            name={item.name}
            logo={detail.logo}
            stats={detail.stats}
            concept={detail.concept}
          />
        ) : null}

        {origin ? (
          <section aria-labelledby="location-title" className="bg-sand-100 py-section text-ink">
            <Container>
              <HeadingRow id="location-title" title="Location" />
              <Reveal className="mt-6 sm:mt-10 lg:mt-12">
                <LocationExplorer origin={origin} destinations={destinations} />
              </Reveal>
            </Container>
          </section>
        ) : null}

        <AmenitiesShowcase id="amenities-title" intro={amenitiesIntro} items={amenities} />

        {masterplan ? (
          <section aria-labelledby="masterplan-title" className="bg-sand-100 py-section text-ink">
            <Container>
              <HeadingRow id="masterplan-title" title="Masterplan" />
              <Reveal className="mt-6 sm:mt-10 lg:mt-12">
                <ProjectMasterplan name={item.name} />
              </Reveal>
            </Container>
          </section>
        ) : null}

        {/* DRAFT COPY in the section intro and briefs: placeholders for the real unit types. */}
        {masterplan ? <UnitTypes name={item.name} /> : null}

        {item.gallery ? (
          <section
            aria-labelledby="gallery-title"
            data-theme-surface="dark"
            className="overflow-hidden bg-turquoise-160 py-section text-white"
          >
            <Container>
              <HeadingRow
                id="gallery-title"
                eyebrow="Gallery"
                tone="light"
                title={`See ${item.name} From Every Angle`}
              />
            </Container>
            <GalleryCarousel
              images={item.gallery}
              label={`${item.name} gallery`}
              tone="dark"
              className="mt-6 sm:mt-10 lg:mt-12"
            />
          </section>
        ) : null}

        <FaqBlock
          tone="teal"
          items={[
            ...faqs.filter((faq) => faq.category === "buying"),
            ...faqs.filter((faq) => faq.id === "airport"),
          ]}
        />
        <NeighborhoodInterest name={item.name} />

        {/* Other neighborhoods, after the interest form. */}
        {others.length ? (
          <section aria-labelledby="more-title" className="overflow-hidden bg-white py-section">
            <Container>
              <HeadingRow
                id="more-title"
                title="Explore the Neighborhoods"
                aside={
                  // Sits on the right edge of the page padding, level with the cards below.
                  <div className="flex lg:justify-end">{moreCta}</div>
                }
              />
            </Container>
            <Reveal className="mt-6 sm:mt-10 lg:mt-12">
              <DragRow
                label={`More ${statusLabel[item.status].toLowerCase()} neighborhoods`}
                className="max-md:swipe-row"
              >
                {others.map((other) => (
                  <li key={other.slug} className="md:w-[min(72vw,20rem)] md:shrink-0 md:snap-start">
                    {/* The listing page's neighborhood card, at this row's size. */}
                    <PhotoCard
                      href={routes.neighborhood(other.slug)}
                      draggable={false}
                      image={neighborhoodImage(other)}
                      sizes="20rem"
                      tag={statusLabel[other.status]}
                      kicker={other.tagline}
                      title={other.name}
                      summary={other.summary}
                      action={neighborhoodsIntro.cardCta}
                      className="aspect-[4/5] w-full"
                    />
                  </li>
                ))}
              </DragRow>
            </Reveal>
            <PhoneEndCta className="mt-6 px-gutter">{moreCta}</PhoneEndCta>
          </section>
        ) : null}
      </div>
      <NeighborhoodSectionNav
        name={item.name}
        logo={detail?.logo}
        items={[
          ...(detail?.stats || detail?.concept
            ? [{ label: "Overview", titleId: "concept-title" }]
            : []),
          ...(origin ? [{ label: "Location", titleId: "location-title" }] : []),
          { label: "Amenities", titleId: "amenities-title" },
          ...(masterplan
            ? [
                { label: "Masterplan", titleId: "masterplan-title" },
                { label: "Unit Types", titleId: "unit-types-title" },
              ]
            : []),
          ...(item.gallery ? [{ label: "Gallery", titleId: "gallery-title" }] : []),
          { label: "FAQs", titleId: "faq-title" },
        ]}
      />
    </>
  );
}

export default function NeighborhoodPage({ params }: PageProps<"/neighborhoods/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <NeighborhoodContent params={params} />
    </Suspense>
  );
}
