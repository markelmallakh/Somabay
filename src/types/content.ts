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

export type Hotel = {
  slug: string;
  name: string;
  tagline: string;
  /** Official star rating. Omitted for non-hotel stays such as home rentals. */
  stars?: number;
  /** Three images composed around the hotel name in the holidays showcase. */
  images: [ImageAsset, ImageAsset, ImageAsset];
};

export type NeighborhoodStatus = "living" | "upcoming";

export type Neighborhood = {
  slug: string;
  name: string;
  tagline: string;
  status: NeighborhoodStatus;
  image: ImageAsset;
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
};

export type Article = {
  slug: string;
  title: string;
  category: "News" | "Blog";
  readingMinutes: number;
  image: ImageAsset;
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
