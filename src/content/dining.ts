import { image } from "@/lib/media";
import type { DirectoryItem } from "@/types/content";

export const diningHero = {
  eyebrow: "Experience Somabay",
  title: "Dining Experience",
  description: "From casual bites to memorable evenings.",
  image: image("/images/library/zouni/soma-60.webp", "A beach bar terrace at dusk"),
};

export const diningCategories = [
  { value: "Restaurant", label: "Restaurants" },
  { value: "Cafe", label: "Cafes" },
  { value: "Bar", label: "Bars" },
] as const;

export type Venue = DirectoryItem & {
  category: (typeof diningCategories)[number]["value"];
  cuisine?: string;
};

const directions = (name: string) => ({
  label: "Get direction",
  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Somabay`)}`,
  external: true,
});

const venue = (venueData: Omit<Venue, "chip" | "infoLink">): Venue => ({
  ...venueData,
  chip: venueData.cuisine ? `${venueData.category} | ${venueData.cuisine}` : venueData.category,
  infoLink: directions(venueData.title),
});

/** Venue imagery is placeholder until each outlet supplies photography. */
export const venues: Venue[] = [
  venue({
    id: "baladina-restaurant",
    title: "Baladina Restaurant",
    category: "Restaurant",
    cuisine: "Egyptian",
    location: "The Marina",
    description:
      "Enjoy authentic Egyptian flavours in a relaxed setting, bringing the warmth and character of local cuisine to the Somabay experience.",
    images: [
      image("/images/library/lifestyle/067a2648.webp", "A shared lunch on a terrace"),
      image("/images/library/beaches/dsc03390.webp", "A table set by the sea"),
    ],
  }),
  venue({
    id: "kokomo",
    title: "Kokomo",
    category: "Restaurant",
    cuisine: "Italian",
    location: "The Marina",
    images: [
      image("/images/library/zouni/soma-61.webp", "Terrace seating under thatch"),
      image("/images/library/zouni/soma-62.webp", "Wooden tables in the shade"),
    ],
  }),
  venue({
    id: "s-cape-beach-club",
    title: "S.Cape Beach Club",
    category: "Restaurant",
    cuisine: "Asian",
    location: "S.Cape Beach",
    images: [
      image("/images/library/zouni/1p8a5428.webp", "A beach club by the water"),
      image("/images/library/zouni/soma-43.webp", "Guests on the beach at sunset"),
    ],
  }),
  venue({
    id: "nutrilab",
    title: "Nutrilab",
    category: "Restaurant",
    cuisine: "Asian",
    location: "The Marina",
    images: [
      image("/images/library/kaktus/soma-19.webp", "A sunny terrace"),
      image("/images/library/kaktus/soma-23.webp", "Loungers by the pool"),
    ],
  }),
  venue({
    id: "thomas-pizza",
    title: "Thomas Pizza",
    category: "Restaurant",
    cuisine: "Italian",
    location: "The Marina",
    images: [
      image("/images/library/beaches/dsc03390.webp", "A dinner table set by the sea"),
      image("/images/library/lifestyle/067a2757.webp", "An evening at the bar"),
    ],
  }),
  venue({
    id: "seven-fortune",
    title: "Seven Fortune",
    category: "Cafe",
    location: "The Marina",
    images: [
      image("/images/library/bready/bready-img-5501.webp", "A cafe storefront"),
      image("/images/library/bready/bready-img-5502.webp", "A cafe entrance"),
    ],
  }),
  venue({
    id: "the-burger-factory",
    title: "The Burger Factory",
    category: "Restaurant",
    cuisine: "Burgers",
    location: "The Marina",
    // Verbatim from the Somabay directory (somabay.com/explore-somabay/the-burger-factory).
    description:
      "The Burger Factory is a unique concept were signature recipes, premium ingredients & freshly baked burger",
    hours: "12:00 PM – 12:00 AM",
    images: [
      image("/images/dining/burger-factory/02.webp", "A burger with fries on a tray"),
      image("/images/dining/burger-factory/01.webp", "Burgers and fries to share"),
      image("/images/dining/burger-factory/04.webp", "A burger with curly fries and a cold drink"),
      image("/images/dining/burger-factory/03.webp", "Pancakes drizzled with syrup"),
    ],
  }),
  venue({
    id: "sobar-rooftop",
    title: "Sobar Rooftop",
    category: "Bar",
    location: "The Marina",
    images: [
      image("/images/library/lifestyle/067a2745.webp", "A guest at the bar"),
      image("/images/library/zouni/soma-118.webp", "A bar sign glowing at night"),
    ],
  }),
  venue({
    id: "sobar",
    title: "Sobar",
    category: "Bar",
    location: "The Marina",
    images: [
      image("/images/library/lifestyle/067a2757.webp", "Drinks at the bar"),
      image("/images/library/zouni/soma-171.webp", "Evening atmosphere"),
    ],
  }),
];
