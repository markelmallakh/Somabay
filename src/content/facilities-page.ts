import { image } from "@/lib/media";
import type { SectionIntro } from "@/types/content";

export const facilitiesHero = {
  eyebrow: "Facilities & Services",
  title: "Everything you need, right here",
  image: image(
    "/images/library/sports/img-7897.webp",
    "Aerial view of the Soma Sports Arena pools",
  ),
};

export const mobilityIntro: SectionIntro = {
  eyebrow: "Mobility",
  title: "Move Around The Bay Your Way",
  description:
    "Four ways to get around the peninsula. Each one is simple, clean, and built for the way you live.",
};

export const mobilityOptions = [
  {
    title: "G-Ride",
    description:
      "Golf car rides with a driver. Convenient transportation around Somabay for residents and guests.",
    image: image(
      "/images/things-to-do/directory/hopper/02.webp",
      "A guest at the wheel of a Somabay golf car",
    ),
  },
  {
    title: "Hoppersoma",
    description:
      "Self-drive golf cars. The freedom to move around the destination independently, on your own schedule.",
    image: image(
      "/images/things-to-do/directory/hopper/03.webp",
      "Riding out from the Hopper station by the beach",
    ),
  },
  {
    title: "Soma Ride",
    description:
      "An on-demand ride service. Point-to-point transportation within Somabay, requested from your phone.",
    image: image("/images/facilities/mobility.webp", "A car arriving at a Somabay entrance court"),
  },
  {
    title: "Somabay Limousine",
    description:
      "Premium private transportation. Airport transfers, special occasions, and comfortable journeys beyond the bay.",
    image: image("/images/facilities/somabay-limousine.webp", "Somabay cars ready for transfers"),
  },
];

export const healthcareIntro: SectionIntro = {
  eyebrow: "Healthcare",
  title: "Medical Center",
  description:
    "The Somabay Medical Center provides accessible healthcare for residents, guests, and visitors. Doctors are on call and the facility is equipped for everyday needs.",
};

export const healthcareServices = [
  {
    title: "Medical facilities",
    description:
      "General consultations, minor procedures, vaccinations, and referrals to hospitals in Hurghada and Safaga when needed.",
    hours: "24/7",
    image: image(
      "/images/facilities/medical-center.webp",
      "A bright corridor in the Somabay Medical Center",
    ),
  },
  {
    title: "Expert Care When You Need It",
    description:
      "Professional medical care and emergency support for residents and visitors, whenever needed.",
    hours: "24/7",
    image: image("/images/facilities/medical-team.webp", "The Somabay medical team"),
  },
  {
    title: "Pharmacy",
    description:
      "On-site dispensing for prescriptions issued at the centre, plus common over-the-counter items.",
    hours: "24/7",
    image: image(
      "/images/facilities/natural-pharmacy.webp",
      "The Natural Pharmacy at Somabay Marina",
    ),
  },
];

export const educationIntro: SectionIntro = {
  eyebrow: "Education & Schools",
  title: "Education in Somabay",
  description:
    "Somabay brings learning closer to nature, with schools that give children the space to discover, explore, and grow within a close-knit Red Sea community.",
};

/**
 * The two schools, each card in its own identity: its logo and brand colours (taken from the
 * schools' websites) and a gallery of the schools' own photos. The buttons go to their websites.
 */
export const schools = [
  {
    name: "GEMS International School Somabay",
    label: "International school · Pre-K to Grade 9",
    description:
      "A future-focused international school combining academic excellence, skills-based learning, technology, and hands-on experiences in Somabay’s unique coastal setting. GISS currently offers education from Pre-K to Grade 9, with an inquiry-based approach and an international curriculum.",
    website: { label: "Visit GEMS website", href: "https://gis-somabay.com/" },
    logo: { src: "/images/schools/gems-logo.svg", width: 182, height: 67, plate: true },
    /** GEMS blue, with its red as the accent. */
    brand: {
      panel: "#0044ab",
      dark: true,
      ink: "#ffffff",
      accent: "#de0038",
      label: "#9cc3ff",
      muted: "rgb(255 255 255 / 0.78)",
    },
    gallery: [
      image("/images/schools/gems-beach.webp", "A GEMS pupil smiling on the beach in Somabay"),
      image(
        "/images/schools/gems-science-lab.webp",
        "A student running an experiment in the science lab",
      ),
      image("/images/schools/gems-reading-friends.webp", "Pupils reading together in the library"),
      image("/images/schools/gems-reading.webp", "A young pupil enjoying a picture book in class"),
    ],
  },
  {
    name: "Kompass Somabay",
    label: "Trilingual school · Nursery to Primary",
    description:
      "A small, trilingual international school where children learn through close relationships, curiosity, and meaningful connection with nature. From Nursery through Primary, Kompass combines child-centered learning with the unique rhythm of life by the Red Sea.",
    website: { label: "Visit Kompass website", href: "https://kompassschool.com/somabay/" },
    logo: { src: "/images/schools/kompass-logo.webp", width: 1920, height: 714, plate: false },
    /** Kompass warm cream, with its orange as the accent. */
    brand: {
      panel: "#f8f4f0",
      dark: false,
      ink: "#1d1d22",
      accent: "#c65a32",
      label: "#c65a32",
      muted: "rgb(29 29 34 / 0.72)",
    },
    gallery: [
      image(
        "/images/schools/kompass-shore-walk.webp",
        "Kompass children walking along the Somabay shore",
      ),
      image("/images/schools/kompass-primary.webp", "A primary pupil learning at Kompass Somabay"),
      image("/images/schools/kompass-science.webp", "A child looking through a microscope"),
    ],
  },
];

export const maintenance = {
  eyebrow: "Need Assistance?",
  title: "Maintenance & Home Services",
  description:
    "From everyday repairs to essential home services, Somabay’s maintenance team helps keep your property running smoothly, comfortably, and beautifully.",
  card: {
    title: "Complete Home Support",
    description: "One dedicated maintenance service for everything your home needs.",
    services: [
      "Air conditioning",
      "Plumbing",
      "Electricity",
      "Carpentry",
      "Painting",
      "Marble & ceramic works",
      "Aluminum",
      "Water valves & meters",
      "Furniture fabrication",
    ],
    hours: "9:00 AM–5:00 PM",
    // DRAFT: the maintenance team's mobile number isn't published yet; the 16390 hotline stands
    // in until it's supplied.
    phone: { label: "16390", href: "tel:16390" },
  },
  images: [
    image(
      "/images/facilities/maintenance-technician.webp",
      "A Somabay maintenance technician fitting a wall socket in a home by the sea",
    ),
    image(
      "/images/facilities/maintenance-consultation.webp",
      "A technician and a resident checking the air conditioning in a home by the sea",
    ),
  ],
};

export const facilitiesSections = [
  { id: "mobility", label: "Mobility" },
  { id: "healthcare", label: "Healthcare & Medical Center" },
  { id: "education", label: "Education & Schools" },
  { id: "maintenance", label: "Maintenance & Home Services" },
];
