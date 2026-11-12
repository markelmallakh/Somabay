import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import type { DirectoryItem, MapPlace } from "@/types/content";
import { hotels } from "./hotels";
import { neighborhoods } from "./neighborhoods";
import { hotelPlaces, neighborhoodPlaces, venuePlaces } from "./places";

type Category = "residential" | "commercial" | "facilities";
type MasterplanPlace = MapPlace & { category: Category };

const venueImages = {
  marina: image("/images/experience/marina.webp", "Yachts in Somabay Marina"),
  golf: image("/images/library/golf/hidden-cove-14th.webp", "The championship golf course"),
  splash: image("/images/library/watersports/img-1005.webp", "Soma Splash water slides"),
  gems: image("/images/library/beaches/somabay-may321.webp", "Children on the beach"),
  kaktus: image("/images/library/kaktus/muo-1599.webp", "The Kaktus facade"),
  gate: image("/images/library/golf/hc-course1.webp", "Palm-lined arrival road"),
} as const;

const venueCategory: Record<keyof typeof venuePlaces, Category> = {
  marina: "commercial",
  kaktus: "commercial",
  golf: "facilities",
  splash: "facilities",
  gems: "facilities",
  gate: "facilities",
};

const venueLinks: Partial<Record<keyof typeof venuePlaces, string>> = {
  marina: routes.marina,
  golf: routes.activity("golf"),
  gems: routes.facilities,
};

export function masterplanData(): { places: MasterplanPlace[]; details: DirectoryItem[] } {
  const places: MasterplanPlace[] = [];
  const details: DirectoryItem[] = [];

  for (const item of neighborhoods) {
    const point = neighborhoodPlaces[item.slug];
    if (!point) continue;
    places.push({
      id: item.slug,
      name: item.name,
      subtitle: item.tagline,
      category: "residential",
      ...point,
    });
    details.push({
      id: item.slug,
      title: item.name,
      chip: "Residential",
      description: item.tagline,
      images: [item.image, ...(item.gallery ?? []).slice(0, 3)],
      action: { label: "Explore", href: routes.neighborhood(item.slug) },
    });
  }

  for (const hotel of hotels) {
    const point = hotelPlaces[hotel.slug];
    if (!point) continue;
    places.push({
      id: hotel.slug,
      name: hotel.name,
      subtitle: hotel.tagline,
      category: "commercial",
      ...point,
    });
    details.push({
      id: hotel.slug,
      title: hotel.name,
      chip: "Hotel",
      description: hotel.description,
      images: hotel.gallery.slice(0, 4),
      action: { label: "Explore", href: routes.hotel(hotel.slug) },
    });
  }

  for (const key of Object.keys(venuePlaces) as (keyof typeof venuePlaces)[]) {
    const venue = venuePlaces[key];
    places.push({ ...venue, category: venueCategory[key] });
    const href = venueLinks[key];
    details.push({
      id: venue.id,
      title: venue.name,
      chip: venueCategory[key] === "commercial" ? "Commercial" : "Facility",
      images: [venueImages[key]],
      action: href ? { label: "Explore", href } : undefined,
    });
  }

  return { places, details };
}
