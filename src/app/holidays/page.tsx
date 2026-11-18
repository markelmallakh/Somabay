import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { HotelFinder } from "@/components/sections/holidays/HotelFinder";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { hotelThemes, hotels } from "@/content/hotels";
import { hotelPlaces, peninsulaView } from "@/content/places";
import { image, video } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
import type { MapPlace } from "@/types/content";

export const metadata = pageMetadata({
  title: "Red Sea Holidays",
  description:
    "From beachfront luxury and golf escapes to diving adventures and laid-back bay living, find the Somabay hotel that fits your stay.",
  path: routes.holidays,
});

const heroFilm = video({
  label: "Moments from a Somabay holiday",
  poster: image("/images/video/sheraton-loop-poster.webp", ""),
  sources: [{ src: "/videos/sheraton-loop.webm", type: "video/webm" }],
});

const places: MapPlace[] = hotels.flatMap((hotel) => {
  const point = hotelPlaces[hotel.slug];
  return point ? [{ id: hotel.slug, name: hotel.name, subtitle: hotel.tagline, ...point }] : [];
});

export default function HolidaysPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow="Book Stay"
        title="Red Sea Holidays"
        description="From beachfront luxury and golf escapes to diving adventures and laid-back bay living, discover a stay that matches the way you want to experience Somabay."
        media={heroFilm}
      />
      <Section tone="white" aria-labelledby="stays-title" className="bg-sand-100">
        <Container>
          <HotelFinder
            heading={
              <SectionHeading
                id="stays-title"
                eyebrow="Hotels & rentals"
                title="Find your perfect stay"
              />
            }
            hotels={hotels}
            hrefs={Object.fromEntries(
              hotels.map((hotel) => [hotel.slug, routes.hotel(hotel.slug)]),
            )}
            themeOptions={hotelThemes}
            places={places}
            view={peninsulaView}
          />
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
