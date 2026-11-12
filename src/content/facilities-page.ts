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
      "/images/library/golf/hidden-cove-2.webp",
      "A golfer crossing a palm-lined fairway above the sea",
    ),
  },
  {
    title: "Hoppersoma",
    description:
      "Self-drive golf cars. The freedom to move around the destination independently, on your own schedule.",
    image: image("/images/library/golf/hidden-cove-15th.webp", "A golf green with the sea beyond"),
  },
  {
    title: "Soma Ride",
    description:
      "An on-demand ride service. Point-to-point transportation within Somabay, requested from your phone.",
    image: image("/images/library/kaktus/muo-1611.webp", "An arrival court framed by palms"),
  },
  {
    title: "Somabay Limousine",
    description:
      "Premium private transportation. Airport transfers, special occasions, and comfortable journeys beyond the bay.",
    image: image(
      "/images/library/golf/hiden-cove-13th.webp",
      "Mountains rising behind the Somabay coast",
    ),
  },
];

export const healthcareIntro: SectionIntro = {
  eyebrow: "Healthcare",
  title: "Medical Center",
  description:
    "The Somabay Medical Center provides accessible healthcare for residents, guests, and visitors. Doctors are on call and the facility is equipped for everyday needs.",
};

/** Imagery is placeholder until Medical Center photography is supplied. */
export const healthcareServices = [
  {
    title: "Medical facilities",
    description:
      "General consultations, minor procedures, vaccinations, and referrals to hospitals in Hurghada and Safaga when needed.",
    hours: "24/7",
    image: image("/images/library/kaktus/muo-1605.webp", "A calm, light-filled interior"),
  },
  {
    title: "Expert Care When You Need It",
    description:
      "Professional medical care and emergency support for residents and visitors, whenever needed.",
    hours: "24/7",
    image: image("/images/library/kaktus/soma-15.webp", "A bright interior with planting"),
  },
  {
    title: "Pharmacy",
    description:
      "On-site dispensing for prescriptions issued at the centre, plus common over-the-counter items.",
    hours: "24/7",
    image: image("/images/library/kaktus/muo-1607.webp", "A quiet corner with natural textures"),
  },
];

export const educationIntro: SectionIntro = {
  eyebrow: "Education & Schools",
  title: "Education in Somabay",
  description:
    "Somabay brings learning closer to nature, with schools that give children the space to discover, explore, and grow within a close-knit Red Sea community.",
};

export const schools = [
  {
    name: "GEMS International School Somabay",
    description:
      "A future-focused international school combining academic excellence, skills-based learning, technology, and hands-on experiences in Somabay’s unique coastal setting. GISS currently offers education from Pre-K to Grade 9, with an inquiry-based approach and an international curriculum.",
    website: { label: "GEMS website", href: "https://gis-somabay.com/" },
    image: image("/images/library/beaches/somabay-may321.webp", "Children playing on the beach"),
  },
  {
    name: "Kompass Somabay",
    description:
      "A small, trilingual international school where children learn through close relationships, curiosity, and meaningful connection with nature. From Nursery through Primary, Kompass combines child-centered learning with the unique rhythm of life by the Red Sea.",
    website: { label: "Kompass website", href: "https://kompasseducation.com/somabay/" },
    image: image("/images/library/beaches/somabay-may324.webp", "A family by the water"),
  },
];

export const maintenance = {
  eyebrow: "Need Assistance?",
  title: "Maintenance & Home Services",
  description:
    "From everyday repairs to essential home services, Somabay’s maintenance team helps keep your property running smoothly, comfortably, and beautifully.",
  card: {
    title: "Complete Home Support",
    description:
      "Access professional support for air conditioning, plumbing, electricity, carpentry, painting, marble and ceramic works, aluminum, water valves, meters, and furniture fabrication—all through one dedicated maintenance service.",
    hours: "9:00 AM–5:00 PM",
  },
  image: image("/images/library/kaktus/muo-1604.webp", "A bright, plant-filled living space"),
};

export const facilitiesSections = [
  { id: "mobility", label: "Mobility" },
  { id: "healthcare", label: "Healthcare & Medical Center" },
  { id: "education", label: "Education & Schools" },
  { id: "maintenance", label: "Maintenance & Home Services" },
];
