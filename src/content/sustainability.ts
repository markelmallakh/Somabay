import { image, video } from "@/lib/media";
import type { SectionIntro } from "@/types/content";

export const sustainabilityHero = {
  eyebrow: "Community and Sustainability",
  title: "Protecting What Makes the Bay Special",
  image: image(
    "/images/library/beaches/img-1664-enhanced-nr.webp",
    "A small crab on the shoreline as the sun sets over the Red Sea",
  ),
};

/** Scroll-expanding film on the page: a hawksbill turtle gliding over the reef. */
export const sustainabilityFilm = video({
  label: "A sea turtle swimming over the Red Sea reef",
  poster: image("/images/video/into-the-blue-loop-poster.webp", ""),
  sources: [{ src: "/videos/into-the-blue-loop.webm", type: "video/webm" }],
});

export const sustainabilityOverview =
  "Somabay was created on a unique peninsula where the Red Sea meets the desert. Its natural setting is not simply the backdrop to the destination—it is part of what makes it special.";

export const approach = {
  title: "Our Approach",
  intro:
    "Our approach balances thoughtful development with protecting the Red Sea, coastal environment, and natural landscapes for generations to come.",
  image: image("/images/library/diving/0c5a8241-1.webp", "Reef fish along a coral wall"),
  pillars: [
    {
      title: "Growing with Purpose",
      description:
        "Creating a destination that can thrive today while preserving what matters for tomorrow.",
    },
    {
      title: "Responsible Development",
      description:
        "Thoughtful planning that works with the natural landscape and considers the long-term impact of development.",
    },
    {
      title: "Natural Environment",
      description:
        "Protecting the coastline, desert landscapes, marine habitats, and biodiversity that define Somabay.",
    },
    {
      title: "Resource Responsibility",
      description: "Using water, energy, and other resources thoughtfully across the destination.",
    },
    {
      title: "Community & People",
      description:
        "Creating a place where residents, employees, businesses, and visitors can connect, contribute, and grow together.",
    },
  ],
};

export const developmentIntro: SectionIntro = {
  eyebrow: "Designed to Last",
  title: "Sustainable Development",
  description:
    "Every destination grows over time. At Somabay, the ambition is to make that growth thoughtful—balancing development with the preservation of open spaces, natural surroundings, and the character of the peninsula.",
};

export const developmentTiles = [
  {
    label: "Thoughtful Master Planning",
    image: image(
      "/images/library/beaches/december-back.webp",
      "Aerial view of the planned peninsula",
    ),
    size: "square",
  },
  {
    label: "Landscape Preservation",
    image: image("/images/library/golf/hiden-cove-13th.webp", "Desert mountains behind the coast"),
    size: "square",
  },
  {
    label: "Energy Efficiency",
    image: image("/images/library/beaches/img-1663.webp", "Sun over the Red Sea"),
    size: "wide",
  },
  {
    label: "Responsible Construction",
    image: image(
      "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-2.webp",
      "Low-rise villas set into the landscape",
    ),
    size: "wide",
  },
  {
    label: "Water Management",
    image: image("/images/library/watersports/img-1006.webp", "Clear water in the bay"),
    size: "square",
  },
  {
    label: "Sustainable Mobility",
    image: image("/images/library/golf/hc-course1.webp", "Palm-lined paths"),
    size: "square",
  },
] as const;
