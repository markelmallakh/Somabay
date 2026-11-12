import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import type { SectionIntro } from "@/types/content";
import { events } from "./events";

export const golfHero = {
  eyebrow: "Golf at Somabay",
  title: "Golf by the Red Sea",
  description:
    "Experience exceptional golf surrounded by the Red Sea and dramatic desert landscapes, with championship courses, professional coaching, and experiences for every level.",
  image: image("/images/library/golf/hidden-cove-15th.webp", "A seaside golf hole at sunset", {
    position: "50% 60%",
  }),
};

export const golfOverview = {
  eyebrow: "Somabay Golf Overview",
  statement:
    "Somabay brings together distinctive golf experiences in one extraordinary setting. Explore the courses, discover your next challenge, or improve your game with professional coaching and academy programs.",
  highlights: [
    {
      label: "18-Hole Championship Course",
      image: image("/images/library/golf/13-a.webp", "A green overlooking the sea"),
    },
    {
      label: "3 Courses to Explore",
      image: image("/images/library/golf/13-d.webp", "Aerial view of the course"),
    },
    {
      label: "Professional Academy",
      image: image("/images/library/lifestyle/067a2910.webp", "A golfer mid-swing"),
    },
    {
      label: "Red Sea Views",
      image: image("/images/library/golf/hidden-cove-4.webp", "The course at golden hour"),
    },
  ],
};

export const coursesIntro: SectionIntro = {
  title: "The Courses",
  description:
    "Discover Somabay’s golf courses, each offering its own character, challenges, and spectacular surroundings.",
};

const proShop = { icon: "phone" as const, text: "+20 12 2350 3528", href: "tel:+201223503528" };

export const courses = [
  {
    title: "Gary Player Championship Course",
    description:
      "The championship course blends challenging play with breathtaking Red Sea surroundings. Its varied fairways, strategic layout, and changing coastal winds create a memorable experience for golfers of every level.",
    features: [
      "18 holes · Par 72",
      "5,363–6,998 yards",
      "Designed by Gary Player Design Group",
      "9 water-hazard holes",
      "300m double-ended driving range",
    ],
    info: [{ icon: "clock" as const, text: "7:00 AM – Sunset" }, proShop],
    image: image(
      "/images/library/golf/hidden-cove-14th.webp",
      "The championship course above the sea",
    ),
  },
  {
    title: "Par 3 Golf Course",
    description:
      "A unique 1,239-yard challenge course designed by Tim Lobb and James Edwards, offering golfers of all levels the chance to sharpen their short game. With multiple tee positions and creative approach shots, every round brings a new challenge.",
    info: [
      { icon: "clock" as const, text: "Summer · 7:00am till 12:00am" },
      { icon: "clock" as const, text: "Winter · 7:00am till 10:00am" },
      proShop,
    ],
    image: image(
      "/images/library/golf/hiden-cove-13th.webp",
      "A flagged green framed by palms beneath the mountains",
    ),
  },
  {
    // The wireframe repeats the championship copy here; awaiting the Reef Course description.
    title: "Reef Course",
    info: [{ icon: "clock" as const, text: "7:00 AM – Sunset" }, proShop],
    image: image(
      "/images/library/golf/hiden-cove-5.webp",
      "Waves breaking on the rocky coast by the course",
    ),
  },
];

export const academy = {
  intro: {
    title: "Golf Academy",
    description:
      "Whether you’re picking up a club for the first time or refining your competitive edge, Somabay’s golf academy offers professional coaching tailored to your game.",
  } satisfies SectionIntro,
  image: image("/images/library/lifestyle/067a2927.webp", "A golfer lining up a shot"),
  facilities: ["Driving Range", "Putting Green", "Scoring Area", "360 Hub", "Golf Lessons Rate"],
  pros: [
    { name: "Mohamed Kahoul", role: "Golf Professional – Golf Academy Manager" },
    { name: "Ahmed Samy", role: "Teaching Golf Professional" },
    { name: "Ahmed Morgan", role: "Teaching Golf Professional" },
  ],
};

export const golfEventsIntro = {
  eyebrow: "Golf Events",
  title: "Events happening at Somabay",
  cta: { label: "View all events", href: routes.events },
  itemCtaLabel: "Know more",
  image: image(
    "/images/library/golf/hidden-cove-2.webp",
    "Golfers walking the course beneath the mountains",
  ),
};

export const golfEventItems = [
  "egypt-international-teen-championship",
  "somabay-open-golf-tournament",
  "somabay-world-cup",
].flatMap((slug) => events.filter((event) => event.slug === slug));

export const teeBooking = {
  eyebrow: "Tee Booking",
  title: "Book your slot now",
  contacts: [
    { icon: "mail" as const, label: "golf@somabay.com", href: "mailto:golf@somabay.com" },
    { icon: "phone" as const, label: "+20 65 326 0000", href: "tel:+20653260000" },
  ],
};
