import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import type { Cta, HeroScene, SectionIntro, StartOption, Stat, StoryMedia } from "@/types/content";
import type { ImageAsset, VideoAsset } from "@/types/media";

export const hero: {
  eyebrow: string;
  title: string;
  startLabel: string;
  scenes: [HeroScene, HeroScene];
  startOptions: StartOption[];
} = {
  eyebrow: "A Luxury Red Sea Destination in Egypt",
  title: "Life at the edge of the Red Sea",
  startLabel: "Where do you want to start?",
  scenes: [
    {
      id: "day",
      label: "Day",
      media: video({
        label: "Aerial footage of a yacht gliding over the turquoise reefs of Somabay",
        poster: image("/images/video/hero-day-poster.webp", ""),
        sources: [
          { src: "/videos/hero-day-mobile.webm", type: "video/webm", media: "(max-width: 767px)" },
          { src: "/videos/hero-day.webm", type: "video/webm" },
        ],
      }),
    },
    {
      id: "night",
      label: "Night",
      media: video({
        label: "Sunset over the Red Sea seen from the bow of a boat",
        poster: image("/images/video/hero-night-poster.webp", ""),
        sources: [{ src: "/videos/hero-night.webm", type: "video/webm" }],
      }),
    },
  ],
  startOptions: [
    {
      title: "Live at Somabay",
      description: "Find your second home at the bay.",
      href: routes.neighborhoods,
      image: image("/images/home/start-live.webp", ""),
    },
    {
      title: "Explore Things To Do",
      description: "Discover your next experience.",
      href: routes.thingsToDo,
      image: image("/images/home/start-experience.webp", ""),
    },
    {
      title: "Reserve Holiday",
      description: "Find your perfect hotel.",
      href: routes.holidays,
      image: image("/images/home/start-holiday.webp", ""),
    },
  ],
};

export const about: SectionIntro & {
  story: StoryMedia;
  film: VideoAsset;
  stats: Stat[];
  cta: Cta;
} = {
  eyebrow: "About Somabay",
  title: "A Place to Live, stay & belong",
  description:
    "Set along Egypt’s Red Sea coast, Somabay is more than a destination—it’s a community shaped by nature, designed for living, and filled with experiences to discover. From world-class hospitality and residences to golf, wellness, dining, and adventure, Somabay brings everything together in one extraordinary place.",
  story: {
    playback: "scroll-scrub",
    media: video({
      label: "A drone rises above a yacht anchored on the reef, revealing the bay",
      poster: image("/images/video/bay-reveal-poster.webp", ""),
      sources: [{ src: "/videos/bay-reveal-scrub.webm", type: "video/webm" }],
    }),
  },
  film: video({
    label: "Somabay winter campaign film",
    poster: image("/images/video/somabay-film-poster.webp", ""),
    sources: [{ src: "/videos/somabay-film.webm", type: "video/webm" }],
    hasAudio: true,
  }),
  stats: [
    {
      value: "10M",
      label: "Square meters across red Sea",
      image: image("/images/about/stat-area.webp", ""),
    },
    {
      value: "3 Sides",
      label: "Peninsula surrounded by the sea",
      image: image("/images/about/stat-sides.webp", ""),
    },
    {
      value: "5 Districts",
      label: "One connected destination",
      image: image("/images/about/stat-districts.webp", ""),
    },
  ],
  cta: { label: "Explore our story", href: routes.about },
};

export const holidaysIntro: SectionIntro & { cta: Cta } = {
  eyebrow: "Reserve Hotel",
  title: "Red Sea Holidays",
  cta: { label: "Explore Hotel", href: routes.holidays },
};

export const neighborhoodsIntro: SectionIntro & {
  tabs: { living: string; upcoming: string };
  cta: Cta;
} = {
  eyebrow: "Live at Somabay",
  title: "Somabay Neighborhoods",
  description:
    "Discover Somabay’s distinctive communities, each offering its own character, setting, and way of life",
  tabs: { living: "Living Now", upcoming: "Coming Next" },
  cta: { label: "Explore all neighborhoods", href: routes.neighborhoods },
};

export const resale: SectionIntro & {
  cta: Cta;
  images: [ImageAsset, ImageAsset, ImageAsset];
} = {
  eyebrow: "Resale",
  title: "Own your next home",
  description:
    "Explore available homes across Somabay’s neighborhoods, with a range of properties, unit types, and locations to find the one that feels right for you.",
  cta: { label: "Explore units", href: routes.resale },
  images: [
    image("/images/resale/resale-1.webp", "A villa garden terrace with floor-to-ceiling glass"),
    image("/images/resale/resale-2.webp", "A bright living room opening onto the garden"),
    image("/images/resale/resale-3.webp", "A sunlit bedroom with garden views"),
  ],
};

export const experienceIntro: SectionIntro = {
  title: "Experience Somabay",
  description:
    "From sunrise adventures on the Red Sea to slow afternoons by the water, Somabay brings together experiences for every mood, every age, and every way of life.",
};

export const thingsToDoIntro: SectionIntro & { cta: Cta; itemCtaLabel: string } = {
  title: "Things To Do",
  description:
    "From sunrise adventures on the Red Sea to slow afternoons by the water, Somabay brings together experiences for every mood, every age, and every way of life.",
  itemCtaLabel: "Explore",
  cta: { label: "Explore all things to do", href: routes.thingsToDo },
};

export const facilitiesIntro: SectionIntro & { cta: Cta } = {
  eyebrow: "Everything You Need, Close at Hand",
  title: "Facilities & Services",
  description:
    "Somabay brings together the essential facilities and services that make life by the Red Sea easier, more comfortable, and complete.",
  cta: { label: "Explore all", href: routes.facilities },
};

export const eventsIntro: SectionIntro & { cta: Cta; itemCtaLabel: string; image: ImageAsset } = {
  eyebrow: "Somabay Events",
  title: "Events happening at Somabay",
  cta: { label: "View all events", href: routes.events },
  itemCtaLabel: "Know more",
  image: image("/images/events/featured.webp", "A triathlete running out of the sea"),
};

export const journalIntro: SectionIntro & { cta: Cta; itemCtaLabel: string } = {
  eyebrow: "Bay Journal",
  title: "Latest from Somabay",
  itemCtaLabel: "Read more",
  cta: { label: "Read more", href: routes.journal },
};

export const contactCta: SectionIntro & { cta: Cta; image: ImageAsset } = {
  title: "Your Somabay Journey Starts Here",
  description:
    "Have a question or looking for something specific? Connect with our team and let us help you find your way around the bay.",
  cta: { label: "Let’s talk", href: routes.contact },
  image: image("/images/cta/journey.webp", "The Somabay swing standing in the sea at sunset"),
};
