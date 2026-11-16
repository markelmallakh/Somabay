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
      image: image(
        "/images/library/beaches/the-breakers-jetty-01.webp",
        "Two people walking the jetty over the turquoise bay",
      ),
    },
    {
      title: "Responsible Development",
      description:
        "Thoughtful planning that works with the natural landscape and considers the long-term impact of development.",
      image: image(
        "/images/library/beaches/december-back.webp",
        "Aerial view of the peninsula and its marina",
      ),
    },
    {
      title: "Natural Environment",
      description:
        "Protecting the coastline, desert landscapes, marine habitats, and biodiversity that define Somabay.",
      image: image("/images/library/diving/0c5a8241-1.webp", "Reef fish along a coral wall"),
    },
    {
      title: "Resource Responsibility",
      description: "Using water, energy, and other resources thoughtfully across the destination.",
      image: image("/images/library/beaches/img-1663.webp", "The sun rising over the Red Sea"),
    },
    {
      title: "Community & People",
      description:
        "Creating a place where residents, employees, businesses, and visitors can connect, contribute, and grow together.",
      image: image(
        "/images/library/lifestyle/067a2648.webp",
        "Friends sharing lunch on a sunlit terrace",
      ),
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
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description:
      "A peninsula planned as a whole, with open space, views and the shoreline kept for everyone.",
    image: image(
      "/images/library/beaches/december-back.webp",
      "Aerial view of the planned peninsula",
    ),
    size: "square",
  },
  {
    label: "Landscape Preservation",
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description: "Desert, mountains and native planting kept at the heart of every neighborhood.",
    image: image("/images/library/golf/hiden-cove-13th.webp", "Desert mountains behind the coast"),
    size: "square",
  },
  {
    label: "Energy Efficiency",
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description:
      "Buildings oriented to the sun and wind, with efficient systems that use less energy.",
    image: image("/images/library/beaches/img-1663.webp", "Sun over the Red Sea"),
    size: "wide",
  },
  {
    label: "Responsible Construction",
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description: "Low-rise homes set into the landscape, built with care for the land around them.",
    image: image(
      "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-2.webp",
      "Low-rise villas set into the landscape",
    ),
    size: "wide",
  },
  {
    label: "Water Management",
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description: "Treated water reused for landscaping and golf, and every drop counted.",
    image: image("/images/library/watersports/img-1006.webp", "Clear water in the bay"),
    size: "square",
  },
  {
    label: "Sustainable Mobility",
    // DRAFT COPY: written for the layout, to be confirmed by Somabay.
    description: "Walkable paths, bikes and electric carts to get around without a car.",
    image: image("/images/library/golf/hc-course1.webp", "Palm-lined paths"),
    size: "square",
  },
] as const;

/**
 * The line that closes the development story, over the full-screen photo.
 * DRAFT COPY: written for the layout, to be replaced with approved wording.
 */
export const developmentQuote = {
  text: "We believe the sea, the desert and the reef are not ours to take, but ours to care for.",
  attribution: "The Somabay approach",
};
