import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import type { MasterplanCategory, MasterplanHotspot } from "./about";
import { venues } from "./dining";
import { neighborhoodsIntro } from "./home";
import { hotelPrice, hotels, themeLabel } from "./hotels";
import { neighborhoods } from "./neighborhoods";
import { hotelPlaces, neighborhoodPlaces } from "./places";

/**
 * Maps a place's coordinates onto the peninsula aerial (% of width and height). An affine fit on
 * three landmarks — the marina basin, Kempinski and The Breakers — so it is only approximate on an
 * oblique photo; places far from those landmarks carry a manual `nudge`.
 */
const MARINA = { lat: 26.8485, lng: 33.9845 };
const aerialPosition = ({ lat, lng }: { lat: number; lng: number }) => {
  const east = (lng - MARINA.lng) * Math.cos((26.85 * Math.PI) / 180) * 111_320;
  const north = (lat - MARINA.lat) * 110_574;
  return {
    x: Math.round((60 - east * 0.000546 - north * 0.0343) * 10) / 10,
    y: Math.round((71 - east * 0.02886 + north * 0.0014) * 10) / 10,
  };
};

/** Pins pushed back onto the shore the oblique photo pulls them off. */
const nudge: Record<string, { x: number; y: number }> = {
  "the-cascades": { x: 9, y: 39 },
  somabreeze: { x: 40, y: 26 },
};

/** 360 tour scenes that exist for a place (3DVista `media-name`). */
const vrScenes: Record<string, string> = {
  marina: "Marina",
  "kempinski-hotel-somabay": "Kempinski Beach",
  baycentral: "Bay Central Apartment Balcony",
};

const place = (
  id: string,
  category: MasterplanCategory,
  coords: { lat: number; lng: number },
  data: Omit<MasterplanHotspot, "id" | "category" | "x" | "y">,
): MasterplanHotspot => ({
  id,
  category,
  vrScene: vrScenes[id],
  ...data,
  ...(nudge[id] ?? aerialPosition(coords)),
});

const hotelPins = hotels.flatMap((hotel) => {
  const coords = hotelPlaces[hotel.slug];
  return coords
    ? [
        place(hotel.slug, "hotels", coords, {
          // Same content as the hotel list row (HotelRow).
          name: hotel.name,
          badges: { stars: hotel.stars, tags: hotel.themes.map(themeLabel) },
          kicker: hotel.tagline,
          price: hotelPrice(hotel),
          description: hotel.description,
          images: hotel.images,
          href: routes.hotel(hotel.slug),
          actions: [
            ...(hotel.website ? [{ label: "Book now", href: hotel.website, external: true }] : []),
            { label: "Explore hotel", href: routes.hotel(hotel.slug) },
          ],
        }),
      ]
    : [];
});

/** Communities whose site falls inside the aerial frame. */
const communityIds = [
  "baycentral",
  "nautilus",
  "reef-town",
  "somabreeze",
  "wadi-jebal-extension",
] as const;

const communityPins = communityIds.flatMap((slug) => {
  const community = neighborhoods.find((item) => item.slug === slug);
  const coords = neighborhoodPlaces[slug];
  return community && coords
    ? [
        place(slug, "communities", coords, {
          // Same content as the neighborhood card (PhotoCard on Live at Somabay).
          name: community.name,
          badges: { tags: [neighborhoodsIntro.tabs[community.status]] },
          kicker: community.tagline,
          description: community.summary ?? "",
          images: community.gallery?.length ? community.gallery : [community.image],
          href: routes.neighborhood(slug),
          actions: [{ label: neighborhoodsIntro.cardCta, href: routes.neighborhood(slug) }],
        }),
      ]
    : [];
});

/**
 * Restaurants on The Marina promenade. Venues have no individual coordinates, so they are spread
 * along the quay above the basin.
 */
const quaySpots: Record<string, { x: number; y: number }> = {
  "baladina-restaurant": { x: 53, y: 66.5 },
  kokomo: { x: 61, y: 65.5 },
  "sobar-rooftop": { x: 67, y: 65 },
};

const diningPins: MasterplanHotspot[] = venues
  .filter((venue) => quaySpots[venue.id])
  .map((venue) => ({
    id: venue.id,
    // Same content as the dining card and its detail drawer.
    name: venue.title,
    category: "dining",
    badges: venue.chip ? { tags: [venue.chip] } : undefined,
    location: venue.location,
    description: venue.description ?? "",
    images: venue.images,
    href: routes.dining,
    actions: [venue.action, venue.infoLink].flatMap((link) => (link ? [link] : [])),
    ...quaySpots[venue.id],
  }));

/** Places on the About masterplan aerial (see `aerialMasterplan`). */
export const masterplanHotspots: MasterplanHotspot[] = [
  place("marina", "marina", MARINA, {
    name: "Somabay Marina",
    description:
      "A lively waterfront destination where shopping, leisure, and everyday essentials come together.",
    images: [image("/images/experience/marina.webp", "Yachts moored in Somabay Marina")],
    href: routes.marina,
  }),
  ...hotelPins,
  ...communityPins,
  ...diningPins,
];
