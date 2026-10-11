import { image } from "@/lib/media";
import type { Article } from "@/types/content";

export const articles: Article[] = [
  {
    slug: "a-new-chapter-for-life-by-the-red-sea",
    title: "A New Chapter for Life by the Red Sea",
    category: "News",
    readingMinutes: 2,
    image: image(
      "/images/journal/new-chapter.webp",
      "A long dinner table set in the sea at sunset",
    ),
  },
  {
    slug: "somabay-welcomes-new-ways-to-experience-the-bay",
    title: "Somabay Welcomes New Ways to Experience the Bay",
    category: "Blog",
    readingMinutes: 4,
    image: image("/images/journal/new-ways.webp", "A calm hotel lounge with natural textures"),
  },
  {
    slug: "whats-happening-across-the-somabay-community",
    title: "What’s Happening Across the Somabay Community",
    category: "News",
    readingMinutes: 4,
    image: image("/images/journal/community.webp", "Two players shaking hands on a tennis court"),
  },
  {
    slug: "the-latest-stories-shaping-somabay",
    title: "The Latest Stories Shaping Somabay",
    category: "Blog",
    readingMinutes: 4,
    image: image("/images/journal/latest-stories.webp", "A sculpted sun mask on a thatched roof"),
  },
];
