import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { AmenitiesShowcase } from "@/components/sections/live/AmenitiesShowcase";
import { LocationExplorer } from "@/components/sections/live/LocationExplorer";
import { NeighborhoodInterest } from "@/components/sections/live/NeighborhoodInterest";
import { NeighborhoodOverview } from "@/components/sections/live/NeighborhoodOverview";
import { MasterplanExplorer } from "@/components/sections/live/MasterplanExplorer";
import { neighborhoodImage } from "@/components/sections/live/neighborhoodImage";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { PhotoCard } from "@/components/ui/PhotoCard";
import { DragRow } from "@/components/ui/DragRow";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/faqs";
import { neighborhoodsIntro } from "@/content/home";
import { amenities, amenitiesIntro } from "@/content/live";
import { masterplanData } from "@/content/masterplan";
import { getNeighborhood, neighborhoods } from "@/content/neighborhoods";
import { neighborhoodPlaces, peninsulaView, venuePlaces } from "@/content/places";
import { travelLabel } from "@/lib/geo";
import { pageMetadata } from "@/lib/metadata";

const statusLabel = { living: "Living Now", upcoming: "Coming Soon" } as const;

export function generateStaticParams() {
  return neighborhoods.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const item = getNeighborhood((await params).slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name,
    description: `${item.name} — ${item.tagline}. A Somabay neighborhood by the Red Sea.`,
    path: routes.neighborhood(item.slug),
    image: item.image,
  });
}

async function NeighborhoodContent({
  params,
}: {
  params: PageProps<"/neighborhoods/[slug]">["params"];
}) {
  const item = getNeighborhood((await params).slug);
  if (!item) notFound();
  const point = neighborhoodPlaces[item.slug];
  const origin = point ? { id: item.slug, name: item.name, ...point } : null;
  const destinations = origin
    ? [venuePlaces.marina, venuePlaces.golf, venuePlaces.splash].map((place) => ({
        ...place,
        distance: travelLabel(origin, place),
      }))
    : [];
  const detail = item.detail;
  const masterplan = detail?.hasMasterplan ? masterplanData() : null;
  const others = neighborhoods.filter(
    (other) => other.slug !== item.slug && other.status === item.status,
  );

  return (
    <>
      <PageHero
        variant="centered"
        eyebrow={statusLabel[item.status]}
        title={item.name}
        description={detail?.subtitle ?? item.tagline}
        media={item.heroMedia ?? item.image}
      />

      {detail?.stats || detail?.concept ? (
        <NeighborhoodOverview
          id="concept-title"
          stats={detail.stats}
          status={statusLabel[item.status]}
          concept={detail.concept}
        />
      ) : null}

      {origin ? (
        <section aria-labelledby="location-title" className="bg-sand-100 py-section text-ink">
          <Container>
            <HeadingRow id="location-title" title="Location" />
            <Reveal className="mt-10 lg:mt-12">
              <LocationExplorer origin={origin} destinations={destinations} />
            </Reveal>
          </Container>
        </section>
      ) : null}

      <AmenitiesShowcase id="amenities-title" intro={amenitiesIntro} items={amenities} />

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
              aside={
                <div>
                  <Button
                    href={siteConfig.virtualTour}
                    external
                    variant="outline-light"
                    icon="cube"
                    iconPosition="start"
                  >
                    View 360 virtual tour
                  </Button>
                </div>
              }
            />
          </Container>
          <GalleryCarousel
            images={item.gallery}
            label={`${item.name} gallery`}
            tone="dark"
            className="mt-10 lg:mt-12"
          />
        </section>
      ) : null}

      {masterplan ? (
        <section aria-labelledby="masterplan-title" className="bg-sand-100 py-section text-ink">
          <Container>
            <HeadingRow id="masterplan-title" title="Masterplan" />
            <Reveal className="mt-10 lg:mt-12">
              <MasterplanExplorer
                places={masterplan.places}
                details={masterplan.details}
                view={peninsulaView}
              />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {others.length ? (
        <section aria-labelledby="more-title" className="overflow-hidden bg-white py-section">
          <Container>
            <HeadingRow
              id="more-title"
              title="Explore the Neighborhoods"
              aside={
                <div>
                  <Button
                    href={neighborhoodsIntro.cta.href}
                    variant="outline"
                    icon="arrow-up-right"
                  >
                    {neighborhoodsIntro.cta.label}
                  </Button>
                </div>
              }
            />
          </Container>
          <Reveal className="mt-10 lg:mt-12">
            <DragRow label={`More ${statusLabel[item.status].toLowerCase()} neighborhoods`}>
              {others.map((other) => (
                <li key={other.slug} className="w-[min(72vw,20rem)] shrink-0 snap-start">
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
        </section>
      ) : null}

      <FaqBlock items={faqs.filter((faq) => faq.category === "buying")} />
      <NeighborhoodInterest name={item.name} image={item.image} />
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
