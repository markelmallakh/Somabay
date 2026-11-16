import { image } from "@/lib/media";
import type { EventItem } from "@/types/content";

export { categoryLabel, eventCategories } from "@/lib/event-categories";

/**
 * Events from the wireframes (homepage, events calendar, golf page). Dates are the wireframe
 * dates and should be replaced with the live calendar.
 */
export const events: EventItem[] = [
  {
    slug: "the-trifactory-somabay-endurance-festival",
    title: "The TriFactory Somabay Endurance Festival",
    start: "2026-11-21",
    end: "2026-11-22",
    category: "sports",
    location: "The Marina Somabay",
    featured: true,
    description:
      "The Winter Edition of the Somabay Endurance Festival takes place at Somabay, the iconic Red Sea destination.",
    image: image(
      "/images/library/events/adrenaline-podium-wins-stunning-red-sea--3.webp",
      "A triathlete running out of the sea",
      // Portrait photo in landscape frames: keep his face (near the top) in view.
      { position: "50% 8%" },
    ),
    body: [
      { type: "heading", text: "An Endurance Tradition" },
      {
        type: "paragraph",
        text: "The Somabay Endurance Festival is a celebration of swimming, cycling, and running, bringing together athletes of different ages and abilities for an unforgettable multi-sport experience. First launched in 2014, the festival has grown into one of Egypt’s largest endurance events.",
      },
      {
        type: "imagePair",
        images: [
          image(
            "/images/library/events/adrenaline-podium-wins-stunning-red-sea-.webp",
            "Athletes celebrating at the finish",
          ),
          image(
            "/images/library/events/adrenaline-podium-wins-stunning-red-sea--2.webp",
            "A runner on the course",
          ),
        ],
      },
      { type: "heading", text: "A Challenge for Every Athlete" },
      {
        type: "paragraph",
        text: "Whether you are an experienced competitor or taking on an endurance challenge for the first time, the festival offers a variety of races and distances designed to suit different abilities and levels of experience. Participants can choose the challenge that best matches their goals.",
      },
      { type: "heading", text: "Where Sport Meets the Red Sea" },
      {
        type: "paragraph",
        text: "Hosted at Somabay, the festival brings endurance sports into an extraordinary natural setting. The destination’s open landscapes, coastline, and Red Sea surroundings create an inspiring backdrop for athletes while making the event an experience beyond the race itself.",
      },
      { type: "heading", text: "Race, Recharge, Experience Somabay" },
      {
        type: "paragraph",
        text: "Beyond the competition, the festival is an opportunity to enjoy everything Somabay has to offer. From staying by the Red Sea to discovering its beaches, sports, wellness, and leisure experiences, participants can turn race weekend into a complete destination escape. Registration and race details are available through The TriFactory.",
      },
    ],
  },
  // DRAFT COPY: placeholder upcoming events to fill the calendar until the live list arrives.
  {
    slug: "red-sea-kite-weekend",
    title: "Red Sea Kite Weekend",
    start: "2026-11-28",
    end: "2026-11-29",
    category: "sports",
    location: "Kite House Somabay",
    description: "Two days of kite clinics, freestyle sessions and sunset rides on the bay.",
    image: image("/images/library/watersports/kiters.webp", "Kitesurfers on the Red Sea"),
  },
  {
    slug: "somabay-tennis-open",
    title: "Somabay Tennis Open",
    start: "2026-12-05",
    end: "2026-12-07",
    category: "sports",
    location: "Soma Sports Arena",
    description: "An open tournament for juniors and adults on the courts by the sea.",
    image: image("/images/library/tennis/muo-1476.webp", "A tennis match at Somabay"),
  },
  {
    slug: "leaders-retreat-by-the-sea",
    title: "Leaders’ Retreat by the Sea",
    start: "2026-12-10",
    end: "2026-12-11",
    category: "corporate",
    location: "Somabay",
    description: "A two-day gathering for teams to plan, connect and recharge by the Red Sea.",
    image: image("/images/library/lifestyle/067a2075.webp", "Guests gathered at Somabay"),
  },
  {
    slug: "somabay-festive-market",
    title: "Somabay Festive Market",
    start: "2026-12-19",
    end: "2026-12-20",
    category: "mega",
    location: "The Marina Somabay",
    description: "Local makers, food and music along the marina for the festive season.",
    image: image("/images/library/zouni/soma-118.webp", "An evening by the sea at Somabay"),
  },
  {
    slug: "new-years-eve-at-somabay",
    title: "New Year’s Eve at Somabay",
    start: "2026-12-31",
    category: "mega",
    location: "Somabay",
    description: "Welcome the new year with music by the beach and fireworks over the bay.",
    image: image("/images/library/zouni/1p8a5433.webp", "A celebration by the beach"),
  },
  {
    slug: "somabay-dive-week",
    title: "Somabay Dive Week",
    start: "2027-01-14",
    end: "2027-01-18",
    category: "sports",
    location: "Somabay House Reef",
    description: "Guided reef dives, courses and talks on caring for the Red Sea’s coral.",
    image: image("/images/library/diving/img-0386.webp", "A diver over the reef"),
  },
  {
    slug: "winter-business-summit",
    title: "Winter Business Summit",
    start: "2027-02-04",
    end: "2027-02-05",
    category: "corporate",
    location: "Somabay",
    description: "Talks and workshops for business leaders, with time to enjoy the destination.",
    image: image("/images/library/lifestyle/067a2648.webp", "Somabay by day"),
  },
  {
    slug: "somabay-world-cup",
    title: "Somabay World Cup",
    start: "2026-10-12",
    category: "sports",
    location: "Gary Player Golf Course",
    golf: true,
    image: image(
      "/images/library/golf/hidden-cove-2.webp",
      "Golfers on the course with mountains behind",
    ),
  },
  {
    slug: "somabay-open-golf-tournament",
    title: "Somabay Open Golf Tournament",
    start: "2026-10-08",
    category: "sports",
    location: "Gary Player Golf Course",
    golf: true,
    image: image("/images/library/golf/13-d.webp", "Aerial view of a green by the sea"),
  },
  {
    slug: "egypt-international-teen-championship",
    title: "Egypt International Teen Championship",
    start: "2026-09-25",
    end: "2026-09-27",
    category: "sports",
    location: "Gary Player Golf Course",
    golf: true,
    image: image(
      "/images/library/golf/hiden-cove-13th.webp",
      "The course beneath the Red Sea mountains",
    ),
  },
  {
    slug: "red-sea-golf-championship",
    title: "Red Sea Golf Championship",
    start: "2026-09-20",
    category: "sports",
    location: "Gary Player Golf Course",
    golf: true,
    image: image("/images/library/golf/hidden-cove-12th.webp", "A seaside golf hole at sunset"),
  },
  {
    slug: "sunset-by-the-somabay",
    title: "Sunset by the Somabay",
    start: "2026-09-02",
    category: "mega",
    location: "Somabay",
    image: image(
      "/images/library/beaches/2025-06-01-at-3-05-11-pm.webp",
      "The Somabay swing at sunset",
    ),
  },
  {
    slug: "somabay-sports-and-adventure-weekend",
    title: "Somabay Sports & Adventure Weekend",
    start: "2026-08-21",
    end: "2026-08-22",
    category: "sports",
    location: "Soma Sports Arena",
    image: image("/images/library/watersports/067a1184.webp", "A kitesurfer running into the sea"),
  },
  {
    slug: "somabay-summer-festival",
    title: "Somabay Summer Festival",
    start: "2026-07-11",
    end: "2026-07-15",
    category: "mega",
    location: "The Marina Somabay",
    image: image("/images/library/zouni/1p8a5488.webp", "A DJ performing by the beach"),
  },
];

export const getEvent = (slug: string) => events.find((event) => event.slug === slug);

/** Homepage rows (wireframe order). */
export const homeEvents = [
  "red-sea-golf-championship",
  "sunset-by-the-somabay",
  "somabay-sports-and-adventure-weekend",
  "somabay-summer-festival",
].flatMap((slug) => events.filter((event) => event.slug === slug));

export const golfEvents = events.filter((event) => event.golf);
