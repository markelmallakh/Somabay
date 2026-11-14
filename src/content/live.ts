import { image } from "@/lib/media";
import type { DirectoryItem, SectionIntro } from "@/types/content";

export const neighborhoodsHero = {
  eyebrow: "Somabay Neighborhoods",
  // DRAFT COPY: two-line headline written for the hero redesign, not from Figma; confirm with
  // the client.
  title: ["Live at Somabay,", "on the shores of the Red Sea"] as const,
  image: image(
    "/images/library/beaches/december-back.webp",
    "Aerial view of the Somabay peninsula",
  ),
};

export const neighborhoodsStory = {
  title: "Every Neighborhood Has a Story",
  statement:
    "From beachfront residences and tranquil gardens to golf-side retreats and elevated views, Somabay’s neighborhoods offer different ways to experience life by the Red Sea. Explore each community, discover its character and surroundings, and find the place that feels right for you.",
  floating: [
    image("/images/library/residences/somabreeze/2025-05-19-at-6-02-38-pm-1.webp", ""),
    image("/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-56-am-4.webp", ""),
    image("/images/library/residences/villa-103/2025-05-15-at-5-22-39-pm-1.webp", ""),
    image("/images/library/residences/reeftown/2025-05-15-at-5-26-01-pm.webp", ""),
  ],
};

export const amenitiesIntro: SectionIntro = {
  eyebrow: "Amenities",
  title: "Everything Within Reach",
  description:
    "From golf and wellness to beaches, dining, and adventure, enjoy the best of Somabay just moments from home.",
};

export const amenities: DirectoryItem[] = [
  {
    id: "beach",
    title: "Beach Access",
    description: "Sandy shores and the Red Sea just moments from home.",
    images: [image("/images/library/beaches/mg-8909.webp", "A sandy beach at sunset")],
  },
  {
    id: "golf",
    title: "Golf",
    description: "World-class golf, including the 18-hole Gary Player Signature Course.",
    images: [image("/images/library/golf/13-a.webp", "A golf green by the sea")],
  },
  {
    id: "marina",
    title: "Somabay Marina",
    description: "A lively waterfront destination for dining, leisure, and time on the water.",
    images: [image("/images/experience/marina.webp", "Yachts in the marina")],
  },
  {
    id: "sports",
    title: "Soma Sports Arena",
    description: "Tennis, padel, squash, football, swimming, fitness, and more.",
    images: [image("/images/library/sports/img-7906.webp", "The aquatics center")],
  },
  {
    id: "watersports",
    title: "Water Sports & Diving",
    description: "Diving, kitesurfing, boat trips, snorkeling, and Red Sea adventures.",
    images: [image("/images/library/watersports/img-7103.webp", "A kitesurfer on the bay")],
  },
  {
    id: "dining",
    title: "Dining & Hospitality",
    description: "Hotels, restaurants, beach clubs, and waterfront experiences across Somabay.",
    images: [image("/images/library/zouni/soma-60.webp", "A beach club terrace at dusk")],
  },
];
