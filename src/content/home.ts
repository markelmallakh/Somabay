import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import type { Cta, HeroScene, SectionIntro, StartOption, Stat } from "@/types/content";
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
        label: "Somabay winter campaign: guests waking up, swimming and celebrating by the Red Sea",
        poster: image("/images/video/hero-campaign-poster.webp", ""),
        sources: [
          {
            src: "/videos/hero-campaign-mobile.webm",
            type: "video/webm",
            media: "(max-width: 767px)",
          },
          { src: "/videos/hero-campaign.webm", type: "video/webm" },
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
      image: image("/images/home/start-live-family.webp", ""),
    },
    {
      title: "Things To Do",
      description: "Discover your next experience.",
      href: routes.thingsToDo,
      image: image("/images/home/start-things-to-do-diving.webp", ""),
    },
    {
      title: "Book Holiday",
      description: "Find your perfect hotel.",
      href: routes.holidays,
      image: image("/images/home/start-holiday-balcony.webp", ""),
    },
  ],
};

export const about: {
  eyebrow: string;
  statement: string;
  /** Leading words of the statement shown at full strength before the scroll fill starts. */
  statementLead: number;
  /** Top-down aerial loop (sea to shore) the story paragraphs scroll over. */
  ambient: VideoAsset;
  paragraphs: [string, string, string];
  film: VideoAsset;
  stats: Stat[];
  cta: Cta;
} = {
  eyebrow: "About Somabay",
  statement:
    "Somabay is more than a holiday destination, it’s a place where nature, community, and everyday life come together.",
  statementLead: 12,
  ambient: video({
    label: "Top-down aerial of the Red Sea washing onto Somabay’s sand",
    poster: image("/images/video/somabay-shore-blue-poster.webp", ""),
    sources: [{ src: "/videos/somabay-shore-loop.webm", type: "video/webm" }],
  }),
  paragraphs: [
    "Surrounded by beautiful beaches and open landscapes, Somabay offers a unique setting for living, relaxing, and connecting with nature.",
    "From exceptional hotels and homes to golf, wellness, dining, and water adventures, there’s always something new to experience at Somabay.",
    "Whether you’re visiting for a few days or making it your home, every moment offers a chance to enjoy life by the Red Sea.",
  ],
  film: video({
    label: "Somabay winter campaign film",
    poster: image("/images/video/somabay-film-poster.webp", ""),
    sources: [{ src: "/videos/somabay-film.webm", type: "video/webm" }],
    hasAudio: true,
  }),
  stats: [
    {
      value: "10M",
      label: "Square metres across the Red Sea",
      image: image("/images/about/stat-map.webp", ""),
    },
    {
      value: "3 Sides",
      label: "Peninsula surrounded by the sea",
      image: image("/images/about/stat-peninsula-sides.webp", ""),
    },
    {
      value: "5 Districts",
      label: "One connected destination",
      image: image("/images/about/stat-map.webp", ""),
    },
  ],
  cta: { label: "Explore our story", href: routes.about },
};

export const holidaysIntro: SectionIntro & { cta: Cta; itemCtaLabel: string } = {
  eyebrow: "Book Hotel",
  title: "Red Sea Holidays",
  description:
    "From exceptional hotels and homes to golf, wellness, dining, and water adventures, there’s always something new to experience at Somabay.",
  cta: { label: "View all hotels", href: routes.holidays },
  itemCtaLabel: "Explore",
};

export const neighborhoodsIntro: SectionIntro & {
  tabs: { living: string; upcoming: string };
  cta: Cta;
  cardCta: string;
} = {
  eyebrow: "Live at Somabay",
  title: "Somabay Neighborhoods",
  description:
    "Discover Somabay’s distinctive communities, each offering its own character, setting, and way of life.",
  tabs: { living: "Living Now", upcoming: "Coming Next" },
  cta: { label: "Explore all neighborhoods", href: routes.neighborhoods },
  cardCta: "Discover",
};

export const resale: SectionIntro & {
  cta: Cta;
  images: [ImageAsset, ImageAsset, ImageAsset];
  /** Figma gallery collage (378:18992): the lounge photo expands into the Resale panel. */
  gallery: {
    top: ImageAsset;
    left: ImageAsset;
    centre: ImageAsset;
    right: ImageAsset;
    bottom: ImageAsset;
  };
} = {
  eyebrow: "Resale",
  title: "Own Your Next Home",
  description:
    "Discover homes for sale across Somabay’s neighborhoods and find the one that feels right for you.",
  cta: { label: "Explore units", href: routes.resale },
  gallery: {
    top: image(
      "/images/resale/gallery-bay-view-hd.webp",
      "Sheraton beach and pools facing the mountains",
    ),
    left: image(
      "/images/resale/gallery-sunset-hd.webp",
      "Swimmers in the sea as the sun sets behind the mountains",
    ),
    centre: image(
      "/images/resale/gallery-lounge.webp",
      "A guest relaxing on a shaded lounge terrace",
    ),
    right: image(
      "/images/resale/gallery-kiter-hd.webp",
      "A kitesurfer carrying his board at sunset",
    ),
    bottom: image(
      "/images/resale/gallery-family-beach-hd.webp",
      "A family building sandcastles on the beach",
    ),
  },
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
  eyebrow: "Experience Somabay",
  title: "Things To Do",
  description:
    "From sunrise tee times to slow afternoons at the spa, find something for every mood, every age, and every way of life.",
  itemCtaLabel: "Explore",
  cta: { label: "Explore all", href: routes.thingsToDo },
};

export const facilitiesIntro: SectionIntro & { cta: Cta } = {
  eyebrow: "Everything You Need, Close at Hand",
  title: "Facilities & Services",
  description:
    "From schools and healthcare to home care and getting around, the everyday essentials of life by the bay are always a few minutes away.",
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
  cta: { label: "Contact us", href: routes.contact },
  image: image("/images/cta/journey.webp", "The Somabay swing standing in the sea at sunset"),
};
