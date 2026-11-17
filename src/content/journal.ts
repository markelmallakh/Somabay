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
    // DRAFT COPY: placeholder article text until the client's copy arrives.
    body: [
      { type: "heading", text: "Life at the Pace of the Sea" },
      {
        type: "paragraph",
        text: "Somabay is opening a new chapter for everyone who calls the bay home, whether for a season or for good. New residences, shared spaces and everyday services are coming together to make life by the Red Sea easier, calmer and more connected.",
      },
      {
        type: "image",
        image: image(
          "/images/library/zouni/soma-43.webp",
          "A family walking along the beach at sunset",
        ),
      },
      { type: "heading", text: "Room to Grow" },
      {
        type: "paragraph",
        text: "Each new neighborhood is planned around open space, sea views and short walks to the beach, so homes feel part of the landscape rather than set against it. Families, couples and remote workers will find homes shaped around the way they want to live.",
      },
      { type: "heading", text: "What Comes Next" },
      {
        type: "paragraph",
        text: "Over the coming months we will share more about the projects, partners and experiences shaping this next chapter. Follow the Somabay Journal for the latest news from the bay.",
      },
    ],
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
    // DRAFT COPY: placeholder article text until the client's copy arrives.
    body: [
      { type: "heading", text: "A Community That Comes Together" },
      {
        type: "paragraph",
        text: "Somabay is more than a destination; it is a community of residents, guests and teams who share the bay every day. Each season brings new reasons to meet, from sports tournaments and wellness mornings to festive markets and evenings by the sea.",
      },
      {
        type: "image",
        image: image(
          "/images/library/tennis/muo-1435.webp",
          "The tennis courts at the Somabay sports club",
        ),
      },
      { type: "heading", text: "On the Courts and Beyond" },
      {
        type: "paragraph",
        text: "The sports club hosts friendly matches and international tournaments, while the marina, beaches and golf course keep the calendar full year-round. Residents are invited to join leagues, classes and clinics for every age and level.",
      },
      { type: "heading", text: "Stay in the Loop" },
      {
        type: "paragraph",
        text: "Keep an eye on the events calendar for upcoming gatherings, and get in touch with our guest services team to find out how to take part.",
      },
    ],
  },
  {
    slug: "the-latest-stories-shaping-somabay",
    title: "The Latest Stories Shaping Somabay",
    category: "Blog",
    readingMinutes: 4,
    date: "2026-01-22",
    image: image("/images/journal/latest-stories.webp", "A sculpted sun mask on a thatched roof"),
    // DRAFT COPY: placeholder article text until the client's copy arrives.
    body: [
      { type: "heading", text: "Stories From the Bay" },
      {
        type: "paragraph",
        text: "Every corner of Somabay has a story, from the craftspeople behind its architecture to the chefs, coaches and hosts who welcome guests each day. This series shares the people and places that give the bay its character.",
      },
      {
        type: "image",
        image: image(
          "/images/library/lifestyle/067a2075.webp",
          "A guest on a terrace balcony at Somabay",
        ),
      },
      { type: "heading", text: "Designed Around the Landscape" },
      {
        type: "paragraph",
        text: "Natural textures, local materials and wide terraces connect each space to the desert, the mountains and the Red Sea. The result is a destination that feels both relaxed and considered, wherever you stay.",
      },
      { type: "heading", text: "More to Come" },
      {
        type: "paragraph",
        text: "New chapters of the story are always being written. Check back for more interviews, behind-the-scenes features and seasonal highlights from Somabay.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((article) => article.slug === slug);
