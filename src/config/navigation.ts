import { hotels } from "@/content/hotels";
import { image } from "@/lib/media";
import type { FooterColumn, MenuItem, NavLink } from "@/types/navigation";
import { routes } from "./routes";
import { siteConfig } from "./site";

const hotelLinks: NavLink[] = hotels.map((hotel) => ({
  label: hotel.name,
  href: routes.hotel(hotel.slug),
}));

const activityLinks: NavLink[] = [
  { label: "Golf", href: routes.activity("golf") },
  { label: "Spa & Thalasso", href: routes.activity("spa-and-thalasso") },
  { label: "Beaches & Adventure", href: routes.activity("beaches-and-adventure") },
  { label: "Watersports & Diving", href: routes.activity("watersports-and-diving") },
  { label: "Sports", href: routes.activity("sports") },
  { label: "Coworking spaces", href: routes.activity("coworking-spaces") },
  { label: "Habitat", href: routes.activity("habitat") },
  { label: "Playpark", href: routes.activity("playpark") },
];

export const mainMenu: MenuItem[] = [
  {
    label: "Home",
    href: routes.home,
    image: image("/images/video/hero-day-poster.webp", ""),
  },
  {
    label: "About",
    href: routes.about,
    image: image("/images/about/stat-area.webp", ""),
  },
  {
    label: "Reserve Hotel",
    href: routes.holidays,
    image: image("/images/hotels/kempinski-1.webp", ""),
    groups: hotelLinks,
    footerLink: { label: "All Hotels", href: routes.holidays },
  },
  {
    label: "Experience Somabay",
    href: routes.thingsToDo,
    image: image("/images/things-to-do/golf.webp", ""),
    groups: [
      { label: "Things To Do", href: routes.thingsToDo, children: activityLinks },
      { label: "The Marina", href: routes.marina },
      { label: "Dining Experience", href: routes.dining },
    ],
  },
  {
    label: "Live At Somabay",
    href: routes.neighborhoods,
    image: image("/images/menu/live.webp", ""),
    groups: [
      { label: "Somabay Neighborhoods", href: routes.neighborhoods },
      { label: "Resale", href: routes.resale },
    ],
  },
  {
    label: "What's Up Soma",
    href: routes.events,
    image: image("/images/menu/whats-up.webp", ""),
    groups: [
      { label: "Events Calendar", href: routes.events },
      { label: "Somabay Journal", href: routes.journal },
      { label: "Sustainability", href: routes.sustainability },
    ],
  },
  {
    label: "Facilities & Services",
    href: routes.facilities,
    image: image("/images/menu/facilities.webp", ""),
  },
];

export const menuUtilityLinks: NavLink[] = [
  { label: "FAQs", href: routes.faqs },
  { label: "Careers", href: routes.careers },
];

export const menuActions = {
  contact: { label: "Contact us", href: routes.contact },
  virtualTour: { label: "View 360 VR", href: siteConfig.virtualTour, external: true },
} satisfies Record<string, NavLink>;

export const footerColumns: FooterColumn[] = [
  {
    title: "Somabay",
    links: [
      { label: "Home", href: routes.home },
      { label: "About Somabay", href: routes.about },
      { label: "Facilities and Services", href: routes.facilities },
      { label: "Careers", href: routes.careers },
    ],
  },
  {
    title: "Experience",
    links: [
      { label: "Things to Do", href: routes.thingsToDo },
      { label: "The Marina", href: routes.marina },
      { label: "Dining Experience", href: routes.dining },
      { label: "360 VR", href: siteConfig.virtualTour, external: true },
    ],
  },
  { title: "Reserve Hotel", links: hotelLinks },
  {
    title: "Real Estate",
    links: [
      { label: "Somabay Neighborhoods", href: routes.neighborhoods },
      { label: "Resale", href: routes.resale },
    ],
  },
  {
    title: "What's Up Soma",
    links: [
      { label: "Events Calendar", href: routes.events },
      { label: "Bay Journal", href: routes.journal },
      { label: "Sustainability Updates", href: routes.sustainability },
    ],
  },
];

export const supportLinks: NavLink[] = [
  { label: "Contact Us", href: routes.contact },
  { label: "FAQs", href: routes.faqs },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: routes.privacy },
  { label: "Terms of Service", href: routes.terms },
  { label: "Cookies Settings", href: routes.cookies },
];
