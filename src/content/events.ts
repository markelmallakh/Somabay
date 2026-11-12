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
