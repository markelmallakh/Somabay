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
