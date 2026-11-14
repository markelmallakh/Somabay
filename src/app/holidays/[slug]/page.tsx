import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { PhotoSlider } from "@/components/media/PhotoSlider";
import { Video } from "@/components/media/Video";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { GuestReviews } from "@/components/sections/holidays/GuestReviews";
import { HotelFacilities } from "@/components/sections/holidays/HotelFacilities";
import { RoomsFinder } from "@/components/sections/holidays/RoomsFinder";
import { StarChip } from "@/components/sections/holidays/StarChip";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { routes } from "@/config/routes";
import { getHotel, hotelPrice, hotels, placeholderReviews, themeLabel } from "@/content/hotels";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/holidays/[slug]">): Promise<Metadata> {
  const hotel = getHotel((await params).slug);
  if (!hotel) return {};
  return pageMetadata({
    title: hotel.name,
    description: hotel.description,
    path: routes.hotel(hotel.slug),
    image: hotel.images[0],
  });
}

async function HotelContent({ params }: { params: PageProps<"/holidays/[slug]">["params"] }) {
  const hotel = getHotel((await params).slug);
  if (!hotel) notFound();

  return (
    <>
      <Section
        spacing="none"
        className="pt-[calc(var(--header-height)+2.5rem)] pb-section"
        aria-labelledby="page-title"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Book Hotel", href: routes.holidays },
              { label: hotel.name, href: routes.hotel(hotel.slug) },
            ]}
            className="mb-8"
          />
          <PhotoSlider images={hotel.gallery} label={hotel.name} />
          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2">
                {hotel.stars ? (
                  <li>
                    <StarChip count={hotel.stars} />
                  </li>
                ) : null}
                {hotel.themes.map((theme) => (
                  <li key={theme}>
                    <Chip>{themeLabel(theme)}</Chip>
                  </li>
                ))}
              </ul>
              <h1 id="page-title" className="mt-5 text-heading-2">
                {hotel.name}
              </h1>
              <p className="mt-6 text-lead text-slate">{hotel.description}</p>
              {hotel.overview ? (
                <>
                  <h2 className="mt-10 text-heading-5">Overview</h2>
                  <p className="mt-4 text-slate">{hotel.overview}</p>
                </>
              ) : null}
            </Reveal>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col gap-6 rounded-md bg-sand-100 p-6 md:p-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                <PriceFrom amount={hotelPrice(hotel)} size="stacked" />
                {hotel.website ? (
                  <Button
                    href={hotel.website}
                    external
                    variant="primary"
                    icon="arrow-up-right"
                    className="w-full"
                  >
                    Book now
                  </Button>
                ) : null}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {hotel.facilities ? (
        <HotelFacilities items={hotel.facilities} label={`${hotel.name} facilities`} />
      ) : null}

      {hotel.film ? (
        <Section
          tone="white"
          spacing="none"
          className={hotel.facilities ? "py-section" : "pb-section"}
        >
          <Container>
            <ImageReveal parallax={0} className="relative h-[min(40rem,62svh)] rounded-md">
              <div className="absolute inset-0">
                <Video
                  asset={hotel.film}
                  playback="in-view"
                  showToggle
                  toggleClassName="bottom-6 left-6"
                  className="size-full"
                />
              </div>
            </ImageReveal>
          </Container>
        </Section>
      ) : null}

      {hotel.rooms ? (
        <Section tone="white" aria-labelledby="rooms-title" className="bg-sand-100">
          <Container>
            <Reveal>
              <h2 id="rooms-title" className="text-heading-2">
                Accommodation
              </h2>
            </Reveal>
            <div className="mt-10">
              <RoomsFinder rooms={hotel.rooms} bookingHref={hotel.website} />
            </div>
          </Container>
        </Section>
      ) : null}

      <GuestReviews reviews={hotel.reviews ?? placeholderReviews} />

      <ContactCta />
    </>
  );
}

export default function HotelPage({ params }: PageProps<"/holidays/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HotelContent params={params} />
    </Suspense>
  );
}
