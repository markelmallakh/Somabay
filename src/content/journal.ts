import { image } from "@/lib/media";
import type { Article } from "@/types/content";

export const articles: Article[] = [
  {
    slug: "a-new-chapter-for-life-by-the-red-sea",
    title: "A New Chapter for Life by the Red Sea",
    category: "News",
    readingMinutes: 2,
    date: "2026-01-22",
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
    date: "2026-01-22",
    image: image("/images/journal/new-ways.webp", "A calm hotel lounge with natural textures"),
    body: [
      { type: "heading", text: "A New Way to Experience Somabay" },
      {
        type: "paragraph",
        text: "Somabay continues to evolve, bringing new experiences and fresh ways to enjoy life by the Red Sea. From leisure and adventure to dining, wellness, and waterfront experiences, the destination keeps giving visitors more reasons to explore.",
      },
      {
        type: "image",
        image: image(
          "/images/library/kaktus/muo-1601.webp",
          "A lounge with green armchairs at The Kaktus",
        ),
      },
      { type: "heading", text: "More to Discover" },
      {
        type: "paragraph",
        text: "Beyond its beaches and resorts, Somabay offers an ever-growing collection of experiences designed around the natural beauty of the bay. Whether you’re looking for an active escape, a moment of relaxation, or something new to enjoy with family and friends, there is always another side of Somabay to discover.",
      },
      { type: "heading", text: "Experience the Bay Your Way" },
      {
        type: "paragraph",
        text: "With its unique setting, wide range of activities, and vibrant community, Somabay makes it easy to shape your own experience. Spend the day on the water, play a round of golf, unwind at the spa, or simply slow down and enjoy the Red Sea.",
      },
      { type: "heading", text: "The Bay Keeps Evolving" },
      {
        type: "paragraph",
        text: "New experiences add to the character of Somabay while preserving what makes the destination special. As the bay grows, so does the choice of ways to stay, play, explore, and experience life by the Red Sea.",
      },
    ],
  },
  {
    slug: "whats-happening-across-the-somabay-community",
    title: "What’s Happening Across the Somabay Community",
    category: "News",
    readingMinutes: 4,
    date: "2026-01-22",
    image: image("/images/journal/community.webp", "Two players shaking hands on a tennis court"),
  },
  {
    slug: "the-latest-stories-shaping-somabay",
    title: "The Latest Stories Shaping Somabay",
    category: "Blog",
    readingMinutes: 4,
    date: "2026-01-22",
    image: image("/images/journal/latest-stories.webp", "A sculpted sun mask on a thatched roof"),
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
