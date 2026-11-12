import type { ImageAsset } from "./media";

export type NavLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavGroup = NavLink & {
  /** Optional nested links shown as an indented list (e.g. activities under Things To Do). */
  children?: NavLink[];
};

export type MenuItem = NavLink & {
  image: ImageAsset;
  /** Second-level panel. Groups may themselves contain children. */
  groups?: NavGroup[];
  /** Optional "see all" link pinned to the bottom of the second-level panel. */
  footerLink?: NavLink;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SearchEntry = NavLink & { section: string };

/** A compact result card in search (hotel, community or event). */
export type SearchCard = {
  title: string;
  subtitle: string;
  href: string;
  /** Small thumbnail (hotels and communities). */
  image?: ImageAsset;
  /** ISO dates (events); `end` is set for multi-day events. */
  start?: string;
  end?: string;
  /** Extra words the search matches on (themes, location, category). */
  keywords: string;
  /** Shown in the search popup before anything is typed. */
  highlighted?: boolean;
};

export type SearchCards = {
  hotels: SearchCard[];
  communities: SearchCard[];
  activities: SearchCard[];
  events: SearchCard[];
};

/** Everything the client-side header needs, resolved on the server (keeps media data off the client). */
export type HeaderData = {
  menu: MenuItem[];
  utilityLinks: NavLink[];
  actions: { contact: NavLink; virtualTour: NavLink };
  searchIndex: SearchEntry[];
  searchCards: SearchCards;
};
