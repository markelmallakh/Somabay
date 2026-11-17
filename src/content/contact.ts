import { image } from "@/lib/media";
import { routes } from "@/config/routes";
import type { ImageAsset } from "@/types/media";
import { hotelHref, hotels } from "@/content/hotels";

export const contactHero = {
  eyebrow: "Contact Us",
  title: "Let’s Talk",
  image: image(
    "/images/library/beaches/mg-8344.webp",
    "The Somabay swing in the sea under an evening sky",
  ),
};

export const contactIntro =
  "Whether you’re planning a stay, looking for a home or booking an experience, our team is here to help.";

/** The ways to reach us, shown beside the form. */
export const contactQuick = {
  hotline: { label: "Hotline", value: "16390", href: "tel:16390" },
  email: { label: "Email", value: "info@somabay.com", href: "mailto:info@somabay.com" },
  hours: { label: "Working hours", value: "Sun – Thu · 9:00am – 4:00pm" },
};

export type Office = {
  id: string;
  /** Small label over the name. */
  region: string;
  name: string;
  address: string;
  hours: string;
  phone: { label: string; href: string };
  email: { label: string; href: string };
  lat: number;
  lng: number;
};

/**
 * The two offices on the contact map. Coordinates are approximate (the Sheikh Zayed office on the
 * 26th of July Corridor; the Somabay office at KM 48 by the Somabay gate) — confirm the exact pins.
 * Both list the 16390 hotline until direct office numbers are supplied.
 */
export const offices: Office[] = [
  {
    id: "somabay-office",
    region: "Red Sea",
    name: "Somabay Office",
    address: "KM 48, Hurghada–Safaga Road, Red Sea",
    hours: "Sun – Thu · 9:00am – 4:00pm",
    phone: { label: "16390", href: "tel:16390" },
    email: { label: "info@somabay.com", href: "mailto:info@somabay.com" },
    lat: 26.8752,
    lng: 33.9683,
  },
  {
    id: "giza-office",
    region: "Cairo",
    name: "Giza Office",
    address: "26th of July Corridor, 1st Floor, Sheikh Zayed",
    hours: "Sun – Thu · 9:00am – 4:00pm",
    phone: { label: "16390", href: "tel:16390" },
    email: { label: "info@somabay.com", href: "mailto:info@somabay.com" },
    lat: 30.0396,
    lng: 30.9845,
  },
];

export type ContactLine = {
  icon: "phone-solid" | "mail-solid" | "globe-solid" | "arrow-up-right";
  /** What the pill says, e.g. the number or address itself. */
  label: string;
  href: string;
};

export type ContactCard = {
  kind: "card";
  title: string;
  text: string;
  /** Small print under the text, e.g. opening hours. */
  note?: string;
  actions: ContactLine[];
};

/** A photo set between the contact tiles, the same size as a tile. */
export type ContactPhoto = {
  kind: "photo";
  image: ImageAsset;
  /** Spans two tiles on wide screens. */
  wide?: boolean;
};

export type ContactGroup = {
  id: string;
  title: string;
  items: (ContactCard | ContactPhoto)[];
};

const call = (number: string, dial = number.replace(/\s/g, "")): ContactLine => ({
  icon: "phone-solid",
  label: number,
  href: `tel:${dial}`,
});
const write = (address: string): ContactLine => ({
  icon: "mail-solid",
  label: address,
  href: `mailto:${address}`,
});

const photo = (src: string, alt: string): ContactPhoto => ({
  kind: "photo",
  image: image(src as Parameters<typeof image>[0], alt),
});

/**
 * Every way to reach Somabay, grouped by need, with photos set between the tiles. Addresses and
 * numbers come from somabay.com and the golf page; the hotels link to their own websites (direct
 * hotel numbers to be supplied). Tile texts, working hours and the resale contacts are DRAFT COPY
 * until confirmed.
 */
export const contactDirectory: ContactGroup[] = [
  {
    id: "somabay",
    title: "Somabay",
    items: [
      {
        kind: "card",
        title: "Guest Services",
        text: "Visits, events and services.",
        note: contactQuick.hours.value,
        actions: [call("16390"), write("info@somabay.com")],
      },
      {
        kind: "card",
        title: "Support",
        text: "Help with anything in progress.",
        actions: [write("support@somabay.com")],
      },
      photo(
        "/images/cta/contact-bay-aerial.webp",
        "The Somabay peninsula and its bay from the air",
      ),
    ],
  },
  {
    id: "resale",
    title: "Real Estate & Resale",
    items: [
      photo(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-54-am.webp",
        "A villa terrace in Wadi Jebal",
      ),
      {
        kind: "card",
        title: "Sales",
        text: "New homes and visits.",
        actions: [call("16390"), write("info@somabayrealestate.com")],
      },
      {
        kind: "card",
        title: "Resale",
        text: "Buying or selling a built home.",
        actions: [
          write("info@somabayrealestate.com"),
          { icon: "arrow-up-right", label: "Browse units", href: routes.resale },
        ],
      },
    ],
  },
  {
    id: "golf",
    title: "Golf",
    items: [
      {
        kind: "card",
        title: "Pro Shop",
        text: "Tee times and equipment.",
        note: "7:00am – 12:00am",
        actions: [call("+20 12 2350 3528"), write("proshop@somabaygolf.com")],
      },
      {
        kind: "card",
        title: "Golf Academy",
        text: "Lessons for every level.",
        actions: [write("golfacademy@somabaygolf.com")],
      },
      photo("/images/library/golf/hidden-cove-15th.webp", "A seaside golf hole at sunset"),
    ],
  },
  {
    id: "sports",
    title: "Sports",
    items: [
      photo("/images/library/tennis/muo-1563.webp", "A player on the academy courts"),
      {
        kind: "card",
        title: "Tennis, Padel & Squash",
        text: "Court bookings and coaching.",
        actions: [call("+20 122 350 3528")],
      },
      {
        kind: "card",
        title: "Bayfit",
        text: "Gym and fitness classes.",
        actions: [call("+20 155 600 5693")],
      },
    ],
  },
  {
    id: "boats",
    title: "Boat Booking",
    items: [
      {
        kind: "card",
        title: "Boat Trips",
        text: "Snorkeling, sunset and full-day trips.",
        actions: [call("+20 102 045 6528")],
      },
      { ...photo("/images/library/boat/dji-0014.webp", "A boat over the reef"), wide: true },
    ],
  },
  {
    id: "hotels",
    title: "Hotels",
    // Six hotel tiles with two photos: one closing the first row, a wide one opening the last.
    items: (() => {
      const tiles = hotels.map((hotel): ContactCard => ({
        kind: "card",
        title: hotel.name,
        text: hotel.tagline,
        actions: [
          ...(hotel.website
            ? [{ icon: "globe-solid" as const, label: "Website", href: hotel.website }]
            : []),
          { icon: "arrow-up-right" as const, label: "View hotel", href: hotelHref(hotel) },
        ],
      }));
      return [
        ...tiles.slice(0, 2),
        { kind: "photo", image: hotels[0]!.images[0] },
        ...tiles.slice(2, 5),
        { kind: "photo", image: hotels[4]!.images[0], wide: true },
        ...tiles.slice(5),
      ];
    })(),
  },
];
