import { image } from "@/lib/media";
import type { ArticleBlock } from "@/types/content";

export type Job = {
  slug: string;
  title: string;
  summary: string;
  location: string;
  type: string;
  body?: ArticleBlock[];
};

export const careersHero = {
  eyebrow: "Careers",
  title: "Join Somabay",
  image: image(
    "/images/library/beaches/dsc-0648.webp",
    "A group of friends jumping together on the beach at sunset",
  ),
};

export const careersIntro = {
  title: "Build Something Extraordinary",
  description:
    "Be part of a destination where ambitious ideas, diverse talents, and a passion for creating exceptional experiences come together. At Somabay, every role contributes to shaping a place people love to visit, live, and belong.",
  image: image("/images/library/tennis/muo-2533.webp", "Two players shaking hands on court"),
};

/** Applications go to the main inbox until a careers address or ATS link is provided. */
export const applicationEmail = "info@somabay.com";

export const jobs: Job[] = [
  {
    slug: "senior-architectural-designer",
    title: "Senior Architectural Designer",
    summary:
      "Lead the development of innovative architectural concepts and collaborate closely with multidisciplinary teams to shape premium residential and mixed-use destinations.",
    location: "El Sheikh Zayed, Giza",
    type: "Full-time",
  },
  {
    slug: "marketing-and-brand-executive",
    title: "Marketing & Brand Executive",
    summary:
      "Support the growth of the Somabay brand through creative campaigns, digital storytelling, and integrated marketing initiatives.",
    location: "Somabay, Hurghada",
    type: "Full-time",
  },
  {
    slug: "community-experience-specialist",
    title: "Community Experience Specialist",
    summary:
      "Help create seamless and meaningful customer journeys by enhancing communication, engagement, and resident experiences.",
    location: "Somabay, Hurghada",
    type: "Full-time",
  },
  {
    slug: "real-estate-sales-consultant",
    title: "Real Estate Sales Consultant",
    summary:
      "Guide clients through their investment and lifestyle journey while representing Somabay values and premium developments.",
    location: "El Sheikh Zayed, Giza",
    type: "Full-time",
    body: [
      { type: "heading", text: "About this Role" },
      {
        type: "paragraph",
        text: "As a Real Estate Sales Consultant, you will be responsible for engaging with potential clients, understanding their needs, presenting suitable opportunities, and supporting them throughout the sales process with professionalism, transparency, and care.",
      },
      { type: "heading", text: "Requirements" },
      {
        type: "list",
        items: [
          "Bachelor’s degree in Business, Marketing, or related field",
          "Previous experience in real estate sales is preferred",
          "Strong communication and negotiation skills",
          "Presentable, confident, and customer-oriented personality",
          "Ability to build long-term client relationships",
          "Strong understanding of the Egyptian real estate market is a plus",
          "Excellent organizational and follow-up skills",
        ],
      },
      { type: "heading", text: "Benefits & Privileges" },
      {
        type: "list",
        items: [
          "Competitive Salary & Performance Incentives",
          "Professional Growth & Career Development",
          "Learning & Training Opportunities",
          "Collaborative & Creative Work Environment",
          "Exposure To Premium Real Estate Projects",
          "Medical Insurance Coverage",
          "Employee Recognition Programs",
          "Flexible & Supportive Team Culture",
          "Career Advancement Opportunities",
          "Modern Workplace Environment",
        ],
      },
    ],
  },
];

export const getJob = (slug: string) => jobs.find((job) => job.slug === slug);

export const applyHref = (job: Job) =>
  `mailto:${applicationEmail}?subject=${encodeURIComponent(`Application: ${job.title}`)}`;
