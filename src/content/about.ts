import { image } from "@/lib/media";
import type { SectionIntro } from "@/types/content";
import type { ImageAsset } from "@/types/media";

export const aboutHero = {
  eyebrow: "About Somabay",
  title: "More Than a Destination",
  image: image(
    "/images/about/peninsula-aerial.webp",
    "Aerial view of the Somabay peninsula, its marina, resorts and golf course on the Red Sea",
  ),
};

export const aboutStory = {
  eyebrow: "Somabay Story",
  paragraph:
    "Somabay began with a simple idea: create a destination where exceptional living meets the extraordinary beauty of the Red Sea. Today, it has grown into a complete coastal community where homes, hospitality, wellness, sports, dining, and nature come together in one remarkable setting.",
  photo: image(
    "/images/about/story-simply-somabay.webp",
    "The bay at sunset, with the Simply Somabay sign on the breakwater",
  ),
  /** The three photos that fan out under the headline: left, centre, right. */
  photos: [
    image("/images/about/milestone-2014-golf.webp", "A golf green overlooking the sea"),
    image(
      "/images/about/story-simply-somabay.webp",
      "The bay at sunset, with the Simply Somabay sign on the breakwater",
    ),
    image("/images/about/milestone-2018-kaktus.webp", "The lounge at The Kaktus"),
  ],
};

export const timelineIntro: SectionIntro = {
  eyebrow: "Somabay Milestones",
  title: "A Journey of Continuous Growth",
  description:
    "What began as an ambitious vision for a Red Sea destination has grown into one of Egypt’s most distinctive coastal communities.",
};

/** One image behind the whole milestones section. */
export const timelineImage = image(
  "/images/about/milestone-2005-sunrise.webp",
  "Sun rising over the Red Sea mountains",
);

/** Each milestone needs only a year, a title and a line of text. */
export const milestones = [
  {
    year: "2005",
    title: "The Beginning",
    description:
      "Somabay’s journey begins with a vision to create an extraordinary destination on the Red Sea.",
  },
  {
    year: "2007",
    title: "First Steps",
    description:
      "The destination begins taking shape, introducing its first residential and hospitality experiences.",
  },
  // Draft milestones (2010, 2012, 2016, 2021, 2024): general copy written as placeholders, to be
  // confirmed or replaced with Somabay's own dates and facts.
  {
    year: "2010",
    title: "Room to Play",
    description:
      "Golf, watersports, and the reef open up new ways to spend the day, giving the bay its active side.",
  },
  {
    year: "2012",
    title: "A Place to Belong",
    description:
      "More families choose Somabay as a second home, and a true community starts to form around the bay.",
  },
  {
    year: "2014",
    title: "Growth Years",
    description:
      "New neighborhoods, hotels, golf, wellness, the marina, and experiences continue to expand Somabay’s offering.",
  },
  {
    year: "2016",
    title: "Wellness by the Sea",
    description:
      "Wellness becomes part of everyday life, inspired by the sea, the sun, and the calm of the peninsula.",
  },
  {
    year: "2018",
    title: "A Living Destination",
    description:
      "Somabay has evolved into a year-round destination for living, holidays, sport, wellness, and discovery.",
  },
  {
    year: "2021",
    title: "Life by the Water",
    description:
      "The waterfront grows into a lively heart for dining, shopping, and slow evenings by the marina.",
  },
  {
    year: "2024",
    title: "New Neighborhoods",
    description:
      "A new generation of homes extends the destination along the coast, closer to nature than ever.",
  },
  {
    year: "The Future",
    title: "What’s Next",
    description: "New communities and experiences continue to shape the next chapter of Somabay.",
  },
];

export const leadershipIntro: SectionIntro = {
  eyebrow: "Leadership",
  title: "The People Accountable For It",
  description:
    "A small executive team, most of whom have been here through more than one phase of the masterplan.",
};

export type Leader = {
  name: string;
  role: string;
  /** Biography, one string per paragraph. */
  bio: string[];
  /** Placeholder person and bio, to be replaced with real details. */
  placeholder?: boolean;
  /** Portrait photo; cards show a turquoise monogram until one is supplied. */
  portrait?: ImageAsset;
};

/**
 * Chairman and CEO bios are verbatim from the Somabay staff handbook
 * (isoma.somabay.com/our-company/chairman-ceo), with their full names as supplied by Somabay.
 * The other five members are placeholders.
 */
export const leaders: Leader[] = [
  {
    name: "Saleh Mohamed",
    role: "Chairman",
    portrait: image("/images/about/team-chairman-saleh-mohamed.webp", "Portrait of Saleh Mohamed"),
    bio: [
      "Mr. Saleh assumed the role of Minister of Investment in 2012 for two consecutive terms. In 2009, he was appointed as the Chairman of the General Authority for Investment and Free Zones (“GAFI”) for four years. Prior to Chairing GAFI, Mr. Saleh was the Chairman of the Mortgage Finance Authority (“MFA”) for four years. He was responsible for laying the foundation of the mortgage finance industry in Egypt, as well as the real estate appraising system and its respective rules and regulations.",
      "Mr. Saleh currently chairs the board of several companies, including Abu Soma Development Company, Damietta Furniture City, Ayady Misr for Industrial Development, and Sixth of October Development and Investment Company (“SODIC”). He also serves on the boards of several companies and institutions, including the National Investment Bank, NI Capital, GAMA Construction Company, and The Egyptian Company for Electricity Distribution.",
      "Mr. Saleh is the founder and chief executive officer of RiseInvest for Financial and Investment Solutions.",
      "Mr. Saleh has a total of 25 years of banking experience. He held the position of the Regional Manager for Egypt and the Middle East at American Express Bank, and he also served as a visiting professor at the American University in Cairo.",
      "Mr. Saleh holds a Bachelor of Commerce from Cairo University. During his career, he received a diploma in mortgage finance and securitization from Wharton University, in addition to several professional studies and degrees.",
    ],
  },
  {
    name: "Ibrahim El Missiri",
    role: "CEO",
    portrait: image("/images/about/team-ibrahim-el-missiri.webp", "Portrait of Ibrahim El Missiri"),
    bio: [
      "Ibrahim joined Abu Soma Development Company (ASDC) in 2012 as Director of Development and assumed his current role as CEO at the end of 2014.",
      "His responsibilities include managing ASDC and the group of companies in which ASDC is a majority shareholder in that are operating in Somabay on the Red Sea in Egypt. During his tenure, Ibrahim developed the company’s real estate business, restructured the existing hotels physically, financially & operationally, and established Somabay as a recognized brand and destination.",
      "Prior to joining ASDC, Ibrahim was the Regional Business Development Director, CH2MHill, MENAI (2013), Director of Development, MNHD, (2009 to 2012), Director of Development, North Africa, Limitless [a Dubai World Company] (2008 to 2009), Business / Commercial and Project Controls Manager Roles across 5 countries, Bechtel, (1994 to 2008).",
      "He graduated from the American University in Cairo in 1994 with B.Sc. in Construction Engineering with High Honors, then he got his M.Sc. Degree from University College London in 1999 in Built Environment.",
    ],
  },
  {
    name: "Enas Mohamed",
    role: "Head of Operations",
    portrait: image("/images/about/team-enas-mohamed.webp", "Portrait of Enas Mohamed"),
    placeholder: true,
    bio: [
      "Placeholder biography. This paragraph will introduce the Head of Operations, their background and the year they joined Somabay.",
      "A second paragraph will cover their responsibilities across the destination and the experience they bring to the role.",
    ],
  },
  {
    name: "Maged Ismail",
    role: "Head of Architecture",
    portrait: image("/images/about/team-maged-ismail.webp", "Portrait of Maged Ismail"),
    placeholder: true,
    bio: [
      "Placeholder biography. This paragraph will introduce the Head of Architecture, their background and the year they joined Somabay.",
      "A second paragraph will cover their responsibilities across the masterplan and the experience they bring to the role.",
    ],
  },
  {
    name: "Hossam Ghaly",
    role: "Head of Development",
    portrait: image("/images/about/team-development-hossam-ghaly.webp", "Portrait of Hossam Ghaly"),
    placeholder: true,
    bio: [
      "Placeholder biography. This paragraph will introduce the Head of Development, their background and the year they joined Somabay.",
      "A second paragraph will cover their responsibilities across the destination's projects and the experience they bring to the role.",
    ],
  },
  {
    name: "Mahmoud El Shazly",
    role: "Head of Finance",
    portrait: image("/images/about/team-mahmoud-el-shazly.webp", "Portrait of Mahmoud El Shazly"),
    placeholder: true,
    bio: [
      "Placeholder biography. This paragraph will introduce the Head of Finance, their background and the year they joined Somabay.",
      "A second paragraph will cover their responsibilities across the group's companies and the experience they bring to the role.",
    ],
  },
  {
    name: "Nour Hassan",
    role: "Head of Marketing",
    portrait: image("/images/about/team-nour-hassan.webp", "Portrait of Nour Hassan"),
    placeholder: true,
    bio: [
      "Placeholder biography. This paragraph will introduce the Head of Marketing, their background and the year they joined Somabay.",
      "A second paragraph will cover their responsibilities across the Somabay brand and the experience they bring to the role.",
    ],
  },
];

export const masterplanIntro: SectionIntro = {
  eyebrow: "The destination",
  title: "Somabay Masterplan",
  // DRAFT COPY: rewritten to run three lines; confirm with the client.
  description:
    "Somabay was not launched all at once. It was assembled piece by piece, from hotels and homes to golf and a marina, into one peninsula on the Red Sea.",
};

export type MasterplanCategory = "hotels" | "marina" | "communities" | "dining";

export type MasterplanHotspot = {
  id: string;
  name: string;
  category: MasterplanCategory;
  description: string;
  images: ImageAsset[];
  href?: string;
  /** Badge row exactly as on the place's own card: star rating first, then tag chips. */
  badges?: { stars?: number; tags: string[] };
  /** Short line under the name (hotel or community tagline). */
  kicker?: string;
  /** "Starting from" nightly price (hotels). */
  price?: string;
  /** Location line with a pin (restaurants). */
  location?: string;
  /** The same actions the place's card offers; the first is the main button. */
  actions?: { label: string; href: string; external?: boolean }[];
  /** Scene label in the 3DVista tour, opened with `#media-name=`. */
  vrScene?: string;
  /** Position on the aerial, in % of its width and height. */
  x: number;
  y: number;
};

/**
 * Aerial masterplan: the peninsula drone shot with clickable places. Pins are projected from each
 * place's map coordinates (see `aerialPosition`) — the photo is oblique, so they are approximate.
 */
export const aerialMasterplan = {
  image: image(
    "/images/about/peninsula-aerial.webp",
    "Aerial view of the Somabay peninsula with the marina, resorts and golf course",
  ),
  categories: [
    { id: "all", label: "All" },
    { id: "hotels", label: "Hotels" },
    { id: "marina", label: "Marina" },
    { id: "communities", label: "Communities" },
    { id: "dining", label: "Dining" },
  ] as const,
};
