import { image } from "@/lib/media";
import type { Neighborhood } from "@/types/content";

export const neighborhoods: Neighborhood[] = [
  {
    slug: "arc-of-soma",
    name: "Arc of Soma",
    tagline: "Peninsula Edge",
    status: "living",
    image: image("/images/neighborhoods/arc-of-soma.webp", "Aerial view of the peninsula edge"),
  },
  {
    slug: "greens-baywest-valley",
    name: "Greens Baywest Valley",
    tagline: "Valley Calm",
    status: "living",
    image: image(
      "/images/neighborhoods/greens-baywest-valley.webp",
      "Green fairways and palms in the western valley",
    ),
  },
  {
    slug: "wadi-soma",
    name: "Wadi Soma",
    tagline: "Natural Authenticity",
    status: "living",
    image: image("/images/neighborhoods/wadi-soma.webp", "Aerial view of contemporary villas"),
  },
  {
    slug: "mesca-golf-edition",
    name: "Mesca Golf Edition",
    tagline: "Golf Living",
    status: "living",
    image: image(
      "/images/neighborhoods/mesca-golf-edition.webp",
      "Aerial view of Mesca by the beach",
    ),
  },
  {
    slug: "blanca",
    name: "Blanca",
    tagline: "Relaxed Luxury",
    status: "living",
    image: image("/images/neighborhoods/blanca.webp", "Aerial view of white Blanca villas"),
  },
  {
    slug: "blanca-gardens",
    name: "Blanca Gardens",
    tagline: "Garden Living",
    status: "living",
    image: image(
      "/images/neighborhoods/blanca-gardens.webp",
      "Villas set around landscaped gardens",
    ),
  },
  {
    slug: "blanca-gardens-ii",
    name: "Blanca Gardens II",
    tagline: "Green Elegance",
    status: "upcoming",
    image: image("/images/neighborhoods/blanca-gardens-ii.webp", "A private pool facing the sea"),
  },
  {
    slug: "nautilus",
    name: "Nautilus",
    tagline: "Bayfront Elegance",
    status: "upcoming",
    image: image("/images/neighborhoods/nautilus.webp", "A seaside green with the bay beyond"),
  },
  {
    slug: "the-lighthouse-somabay",
    name: "The Lighthouse Somabay",
    tagline: "Shoreline Living",
    status: "upcoming",
    image: image("/images/neighborhoods/the-lighthouse.webp", "Palm fronds framing the shoreline"),
  },
  {
    slug: "mazeej-residence-soma",
    name: "Mazeej Residence Soma",
    tagline: "Natural Harmony",
    status: "upcoming",
    image: image("/images/neighborhoods/mazeej-residence.webp", "A bench facing the sea at sunset"),
  },
  {
    slug: "mesca-heights",
    name: "Mesca Heights",
    tagline: "Elevated Views",
    status: "upcoming",
    image: image("/images/neighborhoods/mesca-heights.webp", "Aerial view of Mesca toward the sea"),
  },
];
