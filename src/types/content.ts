import type { ImageAsset, MediaAsset, VideoAsset, VideoPlayback } from "./media";

export type Cta = {
  label: string;
  href: string;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export type HotelTheme =
  "adults-only" | "golfers" | "families" | "luxury" | "beachfront" | "all-inclusive";

export type HotelRoom = {
  name: string;
  type: "room" | "suite";
  view: "marina" | "sea" | "pool" | "golf";
  guests: number;
  amenities: string[];
  image: ImageAsset;
  /** Lowest nightly rate, e.g. "$140"; the shared placeholder is shown until supplied. */
  priceFrom?: string;
};

export type Hotel = {
  slug: string;
  name: string;
  tagline: string;
  /** Official star rating. Omitted for non-hotel stays such as home rentals. */
  stars?: number;
  /** Three images composed around the hotel name in the holidays showcase. */
  images: [ImageAsset, ImageAsset, ImageAsset];
  /** Lead image for the homepage hotel switcher (Figma "Section / Hotels"). */
  cover?: ImageAsset;
  description: string;
  overview?: string;
  website?: string;
  /** Lowest nightly rate, e.g. "$240". Shown as "Starting from"; "$120" until supplied. */
  priceFrom?: string;
  themes: HotelTheme[];
  gallery: ImageAsset[];
  film?: VideoAsset;
  facilities?: DirectoryItem[];
  rooms?: HotelRoom[];
  /** Guest reviews; the shared wireframe placeholders are used until a hotel has its own. */
  reviews?: HotelReview[];
};

export type HotelReview = {
  /** Out of 5. */
  rating: number;
  quote: string;
  author: string;
};

export type NeighborhoodStatus = "living" | "upcoming";

export type Neighborhood = {
  slug: string;
  name: string;
  tagline: string;
  status: NeighborhoodStatus;
  image: ImageAsset;
  /** One-line teaser shown on the homepage carousel card. */
  summary?: string;
  /** Optional hero film; the cover image is used otherwise. */
  heroMedia?: MediaAsset;
  gallery?: ImageAsset[];
  /** Rich detail-page content, when available. */
  detail?: {
    subtitle?: string;
    stats?: { value: string; unit?: string; label: string }[];
    concept?: SectionIntro & { images: [ImageAsset, ImageAsset] };
    /** The project's own logo (an SVG in public/), shown above its numbers and in its section bar. */
    logo?: string;
    hasMasterplan?: boolean;
  };
};

export type Activity = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
};

export type Highlight = {
  title: string;
  description: string;
  href: string;
  image: ImageAsset;
};

export type Facility = {
  title: string;
  description: string;
  icon?: "medical" | "maintenance";
  image?: ImageAsset;
};

export type EventItem = {
  slug: string;
  title: string;
  /** ISO dates; `end` is set for multi-day events. */
  start: string;
  end?: string;
  category: "sports" | "corporate" | "mega";
  location: string;
  image: ImageAsset;
  description?: string;
  featured?: boolean;
  golf?: boolean;
  body?: ArticleBlock[];
};

export type Article = {
  slug: string;
  title: string;
  category: "News" | "Blog";
  readingMinutes: number;
  /** ISO publication date. */
  date: string;
  image: ImageAsset;
  body?: ArticleBlock[];
};

export type Stat = {
  value: string;
  label: string;
  image: ImageAsset;
};

export type HeroScene = {
  id: "day" | "night";
  label: string;
  media: VideoAsset;
};

export type StartOption = {
  title: string;
  description: string;
  href: string;
  image: ImageAsset;
};

export type StoryMedia = {
  media: MediaAsset;
  playback: VideoPlayback;
};

export type FaqCategory = "staying" | "buying" | "experience";

export type FaqItem = {
  id: string;
  category: FaqCategory;
  question: string;
  answer: string;
};

/** A place or service that opens in a detail drawer (stores, restaurants, facilities, pins). */
export type DirectoryItem = {
  id: string;
  title: string;
  description?: string;
  images: ImageAsset[];
  /** Small category label, e.g. "Restaurant | Egyptian". */
  chip?: string;
  /** Badge row as on the item's own card: star rating first, then one chip per tag. */
  badges?: { stars?: number; tags: string[] };
  /** Short line under the title (e.g. a hotel's tagline). */
  kicker?: string;
  location?: string;
  hours?: string;
  phones?: string[];
  /** Primary action shown in the drawer body (e.g. View menu, Explore). */
  action?: Cta & { external?: boolean };
  /** "Starting from" nightly price (hotels). */
  price?: string;
  /** Second button beside the primary action, outlined in turquoise (e.g. Book now). */
  secondaryAction?: Cta & { external?: boolean };
  /**
   * The venue's online menu (a page or PDF). When set, the drawer shows "View menu", which
   * opens it in a new tab.
   */
  menuUrl?: string;
  /** Secondary link shown in the drawer info row (e.g. Get direction). */
  infoLink?: Cta & { external?: boolean };
};

export type ArticleBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: ImageAsset }
  | { type: "imagePair"; images: [ImageAsset, ImageAsset] };

export type MapPlace = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  subtitle?: string;
  category?: string;
};

export type SequenceStep = {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Where the copy sits for this step. */
  placement: "center" | "bottom-left" | "right" | "split";
};
