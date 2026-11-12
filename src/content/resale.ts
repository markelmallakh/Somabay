import { image } from "@/lib/media";
import type { ImageAsset } from "@/types/media";

export type Unit = {
  slug: string;
  title: string;
  type: string;
  neighborhood: string;
  bedrooms: number;
  bathrooms: number;
  /** Built-up area in square metres. Shown on the card once real figures are provided. */
  size?: number;
  images: ImageAsset[];
  amenities: string[];
};

export const resaleHero = {
  eyebrow: "Live in Somabay",
  title: "Buy Your Home In Somabay",
  image: image(
    "/images/menu/menu-home-4k.webp",
    "Whitewashed homes and palms beside a turquoise pool",
  ),
};

const set = (folder: string, files: string[], alt: string) =>
  files.map((file) =>
    image(`/images/library/residences/${folder}/${file}.webp` as Parameters<typeof image>[0], alt),
  );

/** Wireframe placeholder size (Figma "245 sqm") until real unit areas are provided. */
const PLACEHOLDER_SIZE = 245;

const sharedAmenities = [
  "Beach Front",
  "Wi-Fi",
  "Fully Finished",
  "Gym Access",
  "Medical Center",
  "Golf Course",
  "Tennis Court",
  "Bazar",
];

/**
 * Sample listings from the wireframe, shown until live resale inventory is connected.
 */
export const units: Unit[] = [
  {
    slug: "4br-town-house-wadi-soma",
    title: "4BR Town House",
    type: "Town House",
    neighborhood: "Wadi Soma",
    bedrooms: 4,
    bathrooms: 5,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "patio-212",
      [
        "2026-02-04-at-2-06-06-pm",
        "2026-02-04-at-2-06-44-pm-12",
        "2026-02-04-at-2-06-44-pm-14",
        "2026-02-04-at-2-06-44-pm-1",
        "2026-02-04-at-2-06-44-pm-6",
        "2026-02-04-at-2-06-44-pm-11",
        "2026-02-04-at-2-06-45-pm",
        "2026-02-04-at-2-06-44-pm-15",
      ],
      "4BR Town House",
    ),
  },
  {
    slug: "2br-chalet-blanca",
    title: "2BR Chalet",
    type: "Chalet",
    neighborhood: "Blanca",
    bedrooms: 2,
    bathrooms: 2,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "somabreeze",
      [
        "2025-05-19-at-6-02-36-pm",
        "2025-05-19-at-6-02-38-pm-1",
        "2025-05-19-at-6-02-38-pm-2",
        "2025-05-19-at-6-02-39-pm-1",
      ],
      "2BR Chalet",
    ),
  },
  {
    slug: "3br-villa-wadi-jebal-extension",
    title: "3BR Villa",
    type: "Villa",
    neighborhood: "Wadi Jebal Extension",
    bedrooms: 3,
    bathrooms: 3,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "wadi-jebal-extension",
      [
        "2026-02-04-at-2-21-55-pm-4",
        "2026-02-04-at-2-21-55-pm-2",
        "2026-02-04-at-2-21-56-pm",
        "2026-02-04-at-2-21-55-pm-5",
        "2026-02-04-at-2-21-56-pm-1",
      ],
      "3BR Villa",
    ),
  },
  {
    slug: "studio-baycentral",
    title: "Studio",
    type: "Studio",
    neighborhood: "Baycentral",
    bedrooms: 1,
    bathrooms: 1,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "villa-103",
      [
        "2025-05-15-at-5-22-35-pm-1",
        "2025-05-15-at-5-22-36-pm",
        "2025-05-15-at-5-22-37-pm",
        "2025-05-15-at-5-22-38-pm-1",
        "2025-05-15-at-5-22-36-pm-2",
      ],
      "Studio",
    ),
  },
  {
    slug: "4br-chalet-mesca",
    title: "4BR Chalet",
    type: "Chalet",
    neighborhood: "Mesca",
    bedrooms: 4,
    bathrooms: 5,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "reeftown",
      [
        "2025-05-15-at-5-26-04-pm-3",
        "2025-05-15-at-5-26-01-pm-3",
        "2025-05-15-at-5-26-00-pm",
        "2025-05-15-at-5-26-02-pm-2",
        "2025-05-15-at-5-25-59-pm-2",
      ],
      "4BR Chalet",
    ),
  },
  {
    slug: "2br-apartment-baywest",
    title: "2BR Apartment",
    type: "Apartment",
    neighborhood: "Baywest",
    bedrooms: 2,
    bathrooms: 1,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "wadi-jebal-patio",
      [
        "2025-05-20-at-11-07-56-am",
        "2025-05-20-at-11-07-55-am",
        "2025-05-20-at-11-07-54-am-1",
        "2025-05-20-at-11-07-55-am-2",
        "2025-05-20-at-11-07-56-am-3",
      ],
      "2BR Apartment",
    ),
  },
  {
    slug: "1br-apartment-baywest",
    title: "1BR Apartment",
    type: "Apartment",
    neighborhood: "Baywest",
    bedrooms: 1,
    bathrooms: 1,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "villa-103",
      [
        "2025-05-15-at-5-22-33-pm-1",
        "2025-05-15-at-5-22-34-pm",
        "2025-05-15-at-5-22-37-pm-1",
        "2025-05-15-at-5-22-38-pm",
        "2025-05-15-at-5-22-39-pm",
      ],
      "1BR Apartment",
    ),
  },
  {
    slug: "2br-apartment-baywest-garden",
    title: "2BR Apartment",
    type: "Apartment",
    neighborhood: "Baywest",
    bedrooms: 2,
    bathrooms: 1,
    size: PLACEHOLDER_SIZE,
    amenities: sharedAmenities,
    images: set(
      "wadi-jebal-patio",
      [
        "2025-05-20-at-11-07-39-am",
        "2025-05-20-at-11-07-40-am",
        "2025-05-20-at-11-07-41-am",
        "2025-05-20-at-11-07-54-am-2",
        "2025-05-20-at-11-07-56-am-1",
      ],
      "2BR Apartment",
    ),
  },
];

export const getUnit = (slug: string) => units.find((unit) => unit.slug === slug);

export const unitNeighborhoods = [...new Set(units.map((unit) => unit.neighborhood))];
