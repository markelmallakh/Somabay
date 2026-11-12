import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { DirectoryRows } from "@/components/directory/DirectoryRows";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { LocationExplorer } from "@/components/sections/live/LocationExplorer";
import { MasterplanExplorer } from "@/components/sections/live/MasterplanExplorer";
import { neighborhoodImage } from "@/components/sections/live/neighborhoodImage";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SplitScrollList } from "@/components/sections/shared/SplitScrollList";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { DragRow } from "@/components/ui/DragRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
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
        <section aria-labelledby="concept-title" className="bg-white py-section text-ink">
          <Container>
            {detail.stats ? (
              <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-3">
                {detail.stats.map((stat) => (
                  <RevealItem
                    as="li"
                    key={stat.label}
                    className="rounded-card bg-sand-100 px-6 py-8 text-center md:py-10"
                  >
                    <p className="font-serif text-heading-2 leading-none">
                      {stat.value}
                      {stat.unit ? <span className="ml-1 text-heading-6">{stat.unit}</span> : null}
                    </p>
                    <p className="mt-3 text-body-sm text-slate">{stat.label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : null}
            {detail.concept ? (
              <div className="mt-16 grid items-center gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
                <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-card lg:col-span-3 lg:self-end lg:rounded-media">
                  <div className="absolute inset-0">
                    <ResponsiveImage
                      asset={detail.concept.images[0]}
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      fill
                    />
                  </div>
                </ImageReveal>
                <Reveal className="flex flex-col items-center gap-5 text-center lg:col-span-6">
                  <Eyebrow>{detail.concept.eyebrow}</Eyebrow>
                  <h2 id="concept-title" className="text-heading-2 leading-[1.2]">
                    {detail.concept.title}
                  </h2>
                  <p className="max-w-xl text-body-md text-slate">{detail.concept.description}</p>
                </Reveal>
                <ImageReveal
                  delay={0.15}
                  className="relative aspect-[4/5] overflow-hidden rounded-card lg:col-span-3 lg:self-start lg:rounded-media"
                >
                  <div className="absolute inset-0">
                    <ResponsiveImage
                      asset={detail.concept.images[1]}
                      sizes="(min-width: 1024px) 22vw, 100vw"
                      fill
                    />
                  </div>
                </ImageReveal>
              </div>
            ) : null}
          </Container>
        </section>
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

      <SplitScrollList id="amenities-title" intro={amenitiesIntro}>
        <DirectoryRows items={amenities} interactive={false} />
      </SplitScrollList>

      {item.gallery ? (
        <section
          aria-labelledby="gallery-title"
          className="overflow-hidden bg-turquoise-5 py-section text-ink"
        >
          <Container>
            <HeadingRow
              id="gallery-title"
              eyebrow="Gallery"
              title={`See ${item.name} From Every Angle`}
              aside={
                <div>
                  <Button
                    href={siteConfig.virtualTour}
                    external
                    variant="outline"
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
                  <Link
                    href={routes.neighborhood(other.slug)}
                    draggable={false}
                    className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-card p-5 text-white"
                  >
                    <ResponsiveImage
                      asset={neighborhoodImage(other)}
                      sizes="20rem"
                      fill
                      className="-z-10 transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.06]"
                    />
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.25)_0%,rgb(0_0_0/0)_30%,rgb(0_0_0/0.7)_100%)]"
                    />
                    <span className="flex items-start justify-between gap-3">
                      <Chip tone="light">{statusLabel[other.status]}</Chip>
                      <span className="wave wave-group grid size-9 shrink-0 place-items-center rounded-md bg-white/90 text-ink transition-colors duration-500 group-hover:text-white">
                        <Icon name="arrow-up-right" className="size-4" />
                      </span>
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="text-body-sm text-white/80">{other.tagline}</span>
                      <span className="font-serif text-heading-6">{other.name}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </DragRow>
          </Reveal>
        </section>
      ) : null}

      <FaqBlock items={faqs.filter((faq) => faq.category === "buying")} />
      <ContactCta />
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
