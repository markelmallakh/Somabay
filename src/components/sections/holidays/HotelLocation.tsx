import { venuePlaces } from "@/content/places";
import { travelLabel } from "@/lib/geo";
import type { MapPlace } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { LocationExplorer } from "@/components/sections/live/LocationExplorer";

type HotelLocationProps = {
  slug: string;
  name: string;
  lat: number;
  lng: number;
};

/**
 * "Location" for a hotel, in the same style as a single neighborhood: the map with the hotel as
 * the starting point, and the landmarks (marina, golf course, Soma Splash) listed beside it with
 * travel times. Choosing one draws the route; the panel opens the spot in Google Maps.
 */
export function HotelLocation({ slug, name, lat, lng }: HotelLocationProps) {
  const origin: MapPlace = { id: slug, name, lat, lng };
  const destinations = [venuePlaces.marina, venuePlaces.golf, venuePlaces.splash].map((place) => ({
    ...place,
    distance: travelLabel(origin, place),
  }));

  return (
    <section aria-labelledby="location-title" className="bg-white py-section text-ink">
      <Container>
        <HeadingRow id="location-title" title="Location" />
        <Reveal className="mt-6 sm:mt-10 lg:mt-12">
          <LocationExplorer origin={origin} destinations={destinations} />
        </Reveal>
      </Container>
    </section>
  );
}
