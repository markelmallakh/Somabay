import { image } from "@/lib/media";
import type { DirectoryItem } from "@/types/content";

export const diningHero = {
  eyebrow: "Experience Somabay",
  title: "Dining Experience",
  description: "From casual bites by the marina to long, memorable evenings under the stars.",
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
  label: "Get directions",
  href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} Somabay`)}`,
  external: true,
});

const venue = (venueData: Omit<Venue, "chip" | "infoLink">): Venue => ({
  ...venueData,
  chip: venueData.cuisine ? `${venueData.category} | ${venueData.cuisine}` : venueData.category,
  infoLink: directions(venueData.title),
});

const photos = (slug: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, index) =>
    image(
      // Every file here is in the media manifest (generated from public/images).
      `/images/dining/${slug}/${String(index + 1).padStart(2, "0")}.webp` as Parameters<
        typeof image
      >[0],
      alt,
    ),
  );

/**
 * Dining at Somabay, as listed on somabay.com/directories. Descriptions, hours, phones, locations
 * and photos come from each venue's page there (somabay.com/explore-somabay/<venue>); where that
 * page is only in German (Baladina, Sobar) the text is translated. Sobar has no photo of its own
 * there, so it keeps placeholder imagery. Menus (opened in a new tab) are the venues' own
 * online menus or the PDFs Somabay Holidays publishes; S.Cape Beach Club, Nutrilab, Thomas Pizza,
 * Seven Fortune and Sobar Rooftop have none online yet, so they show no "View menu".
 */
export const venues: Venue[] = [
  venue({
    id: "baladina-restaurant",
    title: "Baladina Restaurant",
    category: "Restaurant",
    cuisine: "Egyptian",
    location: "Marina, Somabay",
    // Translated from the German page: "Ägyptisch, orientalische Küche. Das Baladina ist der
    // Anlaufpunkt für Liebhaber orientalischer Küche." (hours "to follow" there).
    description:
      "Egyptian and oriental cuisine. Baladina is the place to go for lovers of oriental food.",
    phones: ["+20 101 727 4305"],
    // Baladina's menu, published by Somabay Holidays.
    menuUrl: "https://somabayholidays.com/wp-content/uploads/Baladina-Menu.pdf",
    images: photos("baladina-restaurant", 5, "Baladina Restaurant at Somabay Marina"),
  }),
  venue({
    id: "kokomo",
    title: "Kokomo",
    category: "Restaurant",
    cuisine: "Grill",
    location: "Marina, Somabay",
    description:
      "Cooking over fire has been a staple of human existence since the dawn of time. At Kokomo, we embrace this tradition by using the four elements of life – earth, fire, water, and air – to craft dishes that are infused with a deep, smoky flavor that can only be achieved through slow-cooking methods and natural wood smoke. From our smoked briskets to our paellas, every dish is a tribute to the timeless tradition of cooking over an open flame.",
    hours: "9:00 AM – 12:00 AM",
    phones: ["+20 120 033 3111"],
    // Kokomo's online menu.
    menuUrl: "https://somabay.menu.kokomoeg.com/menu",
    images: photos("kokomo", 1, "Kokomo at Somabay Marina"),
  }),
  venue({
    id: "s-cape-beach-club",
    title: "S.Cape Beach Club",
    category: "Restaurant",
    cuisine: "International",
    location: "S.Cape Beach",
    description:
      "S.Cape Beach Club invites guests to indulge in a diverse array of international cuisines while enjoying unparalleled beach access and breathtaking views. Whether craving Mediterranean flavors, Asian delicacies, or classic Western dishes, guests can savor a culinary journey amidst the serene coastal setting.",
    hours: "9:00 AM – 5:00 PM",
    phones: ["+20 155 409 4250"],
    images: photos("s-cape-beach-club", 1, "S.Cape Beach Club on the beach"),
  }),
  venue({
    id: "nutrilab",
    title: "Nutrilab",
    category: "Cafe",
    cuisine: "Healthy",
    location: "Marina, Somabay",
    description:
      "Nutrilab is a delicious and nutritious snack bar designed to provide a convenient and wholesome energy boost for consumers on the go. Crafted with premium quality ingredients, each bar offers a perfect balance of taste and nutrition.",
    hours: "7:00 AM – 10:00 PM",
    phones: ["+20 155 409 4250"],
    images: photos("nutrilab", 1, "The Nutrilab counter"),
  }),
  venue({
    id: "thomas-pizza",
    title: "Thomas Pizza",
    category: "Restaurant",
    cuisine: "Italian",
    location: "Marina, Somabay",
    description:
      "It’s simple great ingredients that make great food. Delivering the same great taste for years. Serving you a wide range of fresh salads, infamous pizza’s, pastas, hot meals, delicious sandwiches and well known desserts.",
    hours: "12:00 PM – 12:00 AM",
    phones: ["+20 122 459 0272"],
    images: photos("thomas-pizza", 1, "Thomas Pizza's terrace in the evening"),
  }),
  venue({
    id: "seven-fortune",
    title: "Seven Fortune",
    category: "Cafe",
    cuisine: "Coffee",
    location: "Marina, Somabay",
    description:
      "Welcome to Seven Fortune Somabay, where luxury and coffee converge to create an unparalleled sensory journey. Nestled within the prestigious enclave of Marina Somabay, our brand embodies the epitome of refinement and elegance.",
    hours: "9:00 AM – 10:00 PM",
    images: photos("seven-fortune", 1, "The Seven Fortune coffee bar"),
  }),
  venue({
    id: "the-burger-factory",
    title: "The Burger Factory",
    category: "Restaurant",
    cuisine: "Burgers",
    location: "Marina, Somabay",
    description:
      "The Burger Factory is a unique concept were signature recipes, premium ingredients & freshly baked burger",
    hours: "12:00 PM – 12:00 AM",
    phones: ["+20 106 111 7610"],
    // The Burger Factory's menu, published by Somabay Holidays.
    menuUrl: "https://somabayholidays.com/wp-content/uploads/Burger-Menu.pdf",
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
    cuisine: "Rooftop",
    location: "Marina, Somabay",
    description:
      "Sobar rooftop holds a location where pleasant vibes and one-of-a-kind mixing experiences collide. With a wonderful view of Somabay’s peaceful marina and the stunning mountains in the background. Creating a distinct impression of exclusivity and elegance.",
    hours: "Weekdays 4:00 PM – 10:00 PM · Weekend 4:00 PM – 1:00 AM",
    phones: ["+20 106 506 7785"],
    images: photos("sobar-rooftop", 1, "The Sobar Rooftop bar"),
  }),
  venue({
    id: "sobar",
    title: "Sobar",
    category: "Bar",
    cuisine: "Restaurant",
    location: "Marina, Somabay",
    // Translated from the German page.
    description:
      "Sobar is where good vibes meet culinary experiences, perfectly placed with a view of Somabay’s marina and the breathtaking mountains behind it.",
    hours: "8:00 AM – 12:00 AM",
    phones: ["+20 106 506 7785"],
    // Sobar's menu (1 Jan 2025), published by Somabay Holidays.
    menuUrl: "https://somabayholidays.com/wp-content/uploads/SOBAR-MENU-1-1-2025.pdf",
    images: [
      image("/images/library/lifestyle/067a2757.webp", "Drinks at the bar"),
      image("/images/library/zouni/soma-171.webp", "Evening atmosphere"),
    ],
  }),
];
