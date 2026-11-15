import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import { travelLabel } from "@/lib/geo";
import type { MapPlace, SectionIntro } from "@/types/content";
import type { Leader } from "./about";
import { events } from "./events";
import { hotelPlaces, venuePlaces } from "./places";

/**
 * Golf page content. Facts (course data, hours, designers, contacts) come from
 * somabaygolf.com; lines marked "Draft" are written for the layout until the final copy lands.
 */

/** Tee times, lessons and rates are booked on the golf club's own website. */
export const golfBookingUrl = "https://somabaygolf.com/enquiries";

const golfSite = (name: string, alt: string, position?: string) =>
  image(`/images/golf/site/${name}.webp` as Parameters<typeof image>[0], alt, { position });

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
  title: "Somabay Golf Overview",
  statement:
    "Somabay brings together distinctive golf experiences in one extraordinary setting: a championship course by the sea, a floodlit Par 3, Egypt’s first all-round sustainable course and an academy for every level of player.",
  geo: {
    logo: "/images/golf/geo-certified.svg",
    eyebrow: "GEO Certified®",
    title: "Leading the Way in Sustainable Golf",
    description:
      "Somabay Golf is GEO Certified®, recognised for its commitment to environmental stewardship. Water-efficient irrigation with treated wastewater, solar-powered energy solutions, biodiversity conservation and waste reduction initiatives keep the courses in harmony with the Red Sea landscape around them.",
    points: [
      "Irrigation with treated wastewater",
      "Solar-powered energy",
      "Biodiversity conservation",
      "Waste reduction",
    ],
  },
};

export const coursesIntro: SectionIntro = {
  title: "The Courses",
  description:
    "Three courses, each with its own character: a championship layout above the sea, a floodlit short course, and Egypt’s first all-round sustainable course on the coast.",
};

export type GolfCourse = {
  title: string;
  label: string;
  description: string;
  facts: { label: string; value: string }[];
  hours: string[];
  /** The course's own page on the golf club's website. */
  url: string;
  image: ReturnType<typeof image>;
};

export const courses: GolfCourse[] = [
  {
    title: "Gary Player Championship Course",
    url: "https://somabaygolf.com/Gary-Player-Course",
    label: "18 holes · Par 72",
    description:
      "An 18-hole championship course by the Gary Player Design Group, set between the desert mountains and the Red Sea. Varied fairways, a strategic layout and changing coastal winds make every round different, with nine holes played around water.",
    facts: [
      { label: "Length", value: "5,363 – 6,998 yds" },
      { label: "Fairways", value: "Kikuyu grass" },
      { label: "Greens", value: "Paspalum Dynasty" },
      { label: "Bunkers", value: "68" },
      { label: "Water holes", value: "9" },
      { label: "Golf carts", value: "55" },
    ],
    hours: ["Tee times · 7:00am – Sunset"],
    image: image(
      "/images/library/golf/hidden-cove-14th.webp",
      "The championship course above the sea",
    ),
  },
  {
    title: "Par 3 Golf Course",
    url: "https://somabaygolf.com/en/Par-3-Course",
    label: "9 holes · Floodlit",
    description:
      "A 1,239-yard challenge course designed by Tim Lobb and James Edwards, made for sharpening the short game. Multiple tee positions and creative approach shots bring a new challenge every round, and floodlights keep play going late into the evening.",
    facts: [
      { label: "Length", value: "1,239 yds" },
      { label: "Design", value: "Tim Lobb & James Edwards" },
      { label: "Lighting", value: "Floodlit" },
    ],
    hours: ["Summer · 7:00am – 12:00am", "Winter · 7:00am – 10:00pm"],
    image: golfSite("rate-par3", "The floodlit Par 3 course"),
  },
  {
    title: "Hidden Coves Golf Course",
    url: "https://somabaygolf.com/Hidden-Coves-Course",
    label: "18 holes · By the sea",
    description:
      "Egypt’s first all-round sustainable golf course, designed by Lobb & Partners. Its 18 holes follow the natural coves of the coastline, with holes 12 to 17 played right along the Red Sea.",
    facts: [
      { label: "Holes", value: "18" },
      { label: "Design", value: "Lobb & Partners" },
      { label: "Sea holes", value: "12 – 17" },
    ],
    // Draft: opening hours to be confirmed with the club.
    hours: ["Tee times · 7:00am – Sunset"],
    image: golfSite("hc-course2", "A Hidden Coves green on the shore"),
  },
];

export const golfLeisure = {
  eyebrow: "Golf Leisure",
  title: "More Ways to Play",
  aside: { label: "Book a tee time", href: golfBookingUrl },
  items: [
    {
      title: "Driving Range",
      description:
        "A double-ended range over 300 yards long, floodlit since 2021. Summer 7:00am – 12:00am, winter 7:00am – 10:00pm.",
      image: golfSite("range", "The floodlit driving range"),
    },
    {
      title: "Putting Green",
      // Draft.
      description:
        "A large practice green with true-rolling Paspalum surfaces, ready for a warm-up before your round.",
      image: golfSite("newputting", "The putting green"),
    },
    {
      title: "Scoring Arena",
      description:
        "A 5,000 sqm short-game area designed by James Edwards of EDI Golf, with chipping, pitching and bunker play.",
      image: golfSite("newshortgame", "The short-game scoring arena"),
    },
    {
      title: "360 Hub",
      description:
        "Four indoor simulator bays for practice, data-led lessons and virtual rounds on famous courses. Open 12:00pm – 8:00pm.",
      image: golfSite("360hub", "Simulator bays in the 360 Hub"),
    },
    {
      title: "Footgolf",
      description:
        "Soccer skills meet the precision of golf: a game the whole family can play together. Open 7:00am – 12:00am.",
      image: golfSite("footgolf2", "Footgolf on the course"),
    },
    {
      title: "Boat Golfing",
      // Draft.
      description:
        "Tee off from the deck towards floating greens on the Red Sea, a round unlike any other.",
      image: golfSite(
        "boat-golfing-sea",
        "A golfer teeing off from a boat deck over the Red Sea",
        "47% 50%",
      ),
    },
    {
      title: "Pro Shop",
      description:
        "Clubs, apparel and accessories, with the Seven Fortune pop-up café for a drink after your round. Open 7:00am – 12:00am.",
      image: image("/images/library/golf/13-d.webp", "The clubhouse above the course"),
    },
  ],
};

/** The academy sits by the clubhouse of the Gary Player course. */
const academyPlace: MapPlace = {
  id: "golf-academy",
  name: "Somabay Golf Academy",
  lat: venuePlaces.golf.lat,
  lng: venuePlaces.golf.lng,
  category: "facilities",
};

const landmarks: MapPlace[] = [
  { id: "cascades", name: "The Cascades", ...hotelPlaces["the-cascades"], category: "hotels" },
  {
    id: "kempinski",
    name: "Kempinski Hotel Soma Bay",
    ...hotelPlaces["kempinski-hotel-somabay"],
    category: "hotels",
  },
  { id: "breakers", name: "The Breakers", ...hotelPlaces["the-breakers"], category: "hotels" },
  venuePlaces.marina,
  venuePlaces.splash,
  venuePlaces.gate,
];

export const academy = {
  intro: {
    title: "Golf Academy",
    description:
      "Whether you’re picking up a club for the first time or refining your competitive edge, the academy’s PGA professionals tailor coaching to your game, with a double-ended range, short-game areas and the Par 3 course to practise on. Open 7:00am – 12:00am.",
  } satisfies SectionIntro,
  image: image("/images/library/lifestyle/067a2927.webp", "A golfer lining up a shot"),
  facts: [
    { label: "Coaching", value: "PGA professionals" },
    { label: "Lessons", value: "From €50" },
    { label: "Open", value: "7:00am – 12:00am" },
  ],
  pros: [
    {
      name: "Mohamed Kahoul",
      role: "Golf Professional – Golf Academy Manager",
      portrait: image(
        "/images/golf/pros/kahoul.webp" as Parameters<typeof image>[0],
        "Mohamed Kahoul",
      ),
      bio: [
        "Mohamed Kahoul started to play golf at the age of 5. His father being a famous golfer and a well-known professional in Egypt and Sweden put a little extra pressure on him to learn the game young. Mohamed competed in national and international tournaments and was a member of the Egyptian National Golf Team from 1996 until 2006.",
        "During a successful amateur playing career he won many tournaments, then dedicated many years to teaching as a full-time golf instructor.",
        "Mohamed’s teaching philosophy is to make golf simple by helping students understand the natural and athletic movements of a golf swing.",
      ],
    },
    {
      name: "Ahmed Samy",
      role: "Teaching Golf Professional",
      portrait: image("/images/golf/pros/samy.webp" as Parameters<typeof image>[0], "Ahmed Samy"),
      bio: [
        "Ahmed Samy started to play golf at the age of 17 at Gezira Sporting Club in Cairo.",
        "Samy has a vast experience of golf in Egypt, playing and working in the game for more than 20 years. He offers a variety of comprehensive improvement plans for adult and junior golfers, custom crafted to reach your goals.",
      ],
    },
    {
      name: "Ahmed Morgan",
      role: "Teaching Golf Professional",
      portrait: image(
        "/images/golf/pros/morgan.webp" as Parameters<typeof image>[0],
        "Ahmed Morgan playing out of a bunker",
        // Keep his face and swing in frame in the tall card and drawer crops.
        { position: "42% 35%" },
      ),
      bio: [
        "Ahmed Morgan started to play golf at the age of 14 at Alexandria Sporting Club.",
        "Morgan has vast experience teaching golfers with physical challenges and working with players of all abilities, from high-performance golfers to anyone looking to pick up the game and have fun.",
      ],
    },
  ] satisfies Leader[],
  prosIntro:
    "With unparalleled expertise and a passion for the game, our pros guide every golfer, from beginner to seasoned player, with personalised coaching and exclusive clinics.",
  origin: academyPlace,
  destinations: landmarks.map((place) => ({
    ...place,
    distance: travelLabel(academyPlace, place),
  })),
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
  title: "Book Your Round",
  description:
    "Tee times, lessons and range sessions are booked online with Somabay Golf. Choose your course, pick a time and the team will confirm your booking.",
  image: golfSite("hc-course4", "The Hidden Coves course by the Red Sea"),
  contacts: [
    {
      icon: "phone-solid" as const,
      label: "Pro Shop",
      value: "+20 12 2350 3528",
      href: "tel:+201223503528",
    },
    { icon: "phone-solid" as const, label: "Hotline", value: "16390", href: "tel:16390" },
    { icon: "clock-solid" as const, label: "Pro Shop hours", value: "7:00am – 12:00am" },
    {
      icon: "mail-solid" as const,
      label: "Pro Shop email",
      value: "proshop@somabaygolf.com",
      href: "mailto:proshop@somabaygolf.com",
    },
    {
      icon: "mail-solid" as const,
      label: "Academy email",
      value: "golfacademy@somabaygolf.com",
      href: "mailto:golfacademy@somabaygolf.com",
    },
    {
      icon: "pin-solid" as const,
      label: "Address",
      value: "KM 48 Hurghada, Somabay, Egypt",
      href: "https://www.google.com/maps/search/?api=1&query=Somabay+Golf+Clubhouse",
    },
  ],
  cta: { label: "Book now", href: golfBookingUrl },
};

/** The bar along the foot of the screen. */
export const golfSectionNav = [
  { label: "Overview", titleId: "golf-overview-title" },
  { label: "Courses", titleId: "courses-title" },
  { label: "Golf Leisure", titleId: "golf-leisure-title" },
  { label: "Academy", titleId: "academy-title" },
  { label: "Location", titleId: "academy-location-title" },
  { label: "Events", titleId: "events-title" },
  { label: "Booking", titleId: "booking-title" },
];
