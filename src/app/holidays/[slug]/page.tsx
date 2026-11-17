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
import { HotelCard } from "@/components/sections/holidays/HotelCard";
import { DragRow } from "@/components/ui/DragRow";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HotelFacilities } from "@/components/sections/holidays/HotelFacilities";
import { HotelLocation } from "@/components/sections/holidays/HotelLocation";
import { RoomsFinder } from "@/components/sections/holidays/RoomsFinder";
import { StarChip } from "@/components/sections/holidays/StarChip";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { AmenityIcon } from "@/components/ui/AmenityIcon";
import { routes } from "@/config/routes";
import { getHotel, hotelPrice, hotels, placeholderReviews, themeLabel } from "@/content/hotels";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { hotelPlaces } from "@/content/places";
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
        className="bg-sand-100 pt-[calc(var(--header-height)+2.5rem)] pb-section"
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
          {/* The hotel's promise, set above the gallery. */}
          <Reveal className="mb-8 lg:mb-10">
            <ul className="flex flex-wrap gap-2">
              {hotel.themes.map((theme) => (
                <li key={theme}>
                  <Chip>{themeLabel(theme)}</Chip>
                </li>
              ))}
            </ul>
            <h1 id="page-title" className="mt-5 text-heading-2">
              {hotel.name}
              {hotel.stars ? (
                <StarChip count={hotel.stars} className="relative -top-[0.2em] ml-3 align-middle" />
              ) : null}
            </h1>
            <p className="mt-6 max-w-4xl text-lead text-ink">{hotel.description}</p>
          </Reveal>
          <PhotoSlider images={hotel.gallery} label={hotel.name} />
          <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-6">
            <aside className="lg:order-last lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col gap-6 rounded-md bg-white p-6 md:p-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                {/* The name, its stars and badges head the booking box. */}
                <div className="flex flex-col gap-4 border-b border-ink/8 pb-6">
                  <p className="font-serif text-heading-4 leading-[1.15]">
                    {hotel.name}
                    {hotel.stars ? (
                      <StarChip
                        count={hotel.stars}
                        className="relative -top-[0.15em] ml-2.5 align-middle"
                      />
                    ) : null}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {hotel.themes.map((theme) => (
                      <li key={theme}>
                        <Chip>{themeLabel(theme)}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
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
            <Reveal className="lg:col-span-7">
              {hotel.overview ? (
                <>
                  <h2 className="text-heading-5">Overview</h2>
                  <p className="mt-4 text-slate">{hotel.overview}</p>
                </>
              ) : null}
              {hotel.amenities?.length ? (
                <>
                  <h2 className="mt-10 text-heading-5">Hotel Amenities</h2>
                  <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-6 sm:grid-cols-4">
                    {hotel.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex flex-col items-start gap-2 text-body-sm text-ink"
                      >
                        <AmenityIcon amenity={amenity} className="size-5 text-turquoise" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Reveal>
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

      {/* Where the hotel sits on the peninsula, among the landmarks, with Google Maps under it. */}
      {hotelPlaces[hotel.slug] ? (
        <HotelLocation slug={hotel.slug} name={hotel.name} {...hotelPlaces[hotel.slug]} />
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

      {/* The other hotels, as photo cards in a draggable row, with a link to them all. */}
      <section aria-labelledby="more-hotels-title" className="overflow-hidden bg-white py-section">
        <Container>
          <Reveal className="flex flex-col items-center gap-4 text-center">
            <Eyebrow>Holidays</Eyebrow>
            <h2 id="more-hotels-title" className="text-heading-2">
              Explore More Hotels
            </h2>
          </Reveal>
        </Container>
        <Reveal className="mt-10 lg:mt-12">
          <DragRow label="More hotels in Somabay">
            {hotels
              .filter((other) => other.slug !== hotel.slug)
              .map((other) => (
                <li key={other.slug} className="w-[min(80vw,24rem)] shrink-0 snap-start">
                  <HotelCard
                    hotel={other}
                    href={routes.hotel(other.slug)}
                    themeLabels={other.themes.map(themeLabel)}
                  />
                </li>
              ))}
          </DragRow>
        </Reveal>
        <Container className="mt-10 flex justify-center lg:mt-12">
          <Button href={routes.holidays} variant="outline" icon="arrow-up-right">
            Explore all hotels
          </Button>
        </Container>
      </section>

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
