import { events } from "@/content/events";
import { neighborhoodsIntro } from "@/content/home";
import { hotels, themeLabel } from "@/content/hotels";
import { neighborhoods } from "@/content/neighborhoods";
import { activityDetails, golfTeaser } from "@/content/things-to-do";
import { categoryLabel } from "@/lib/event-categories";
import type { ImageAsset } from "@/types/media";
import { image } from "@/lib/media";
import type {
  FooterColumn,
  HeaderData,
  MenuItem,
  NavLink,
  SearchCards,
  SearchEntry,
} from "@/types/navigation";
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
    image: image("/images/menu/menu-home-4k.webp", ""),
  },
  {
    label: "About",
    href: routes.about,
    image: image("/images/menu/menu-about.webp", ""),
  },
  {
    label: "Book Hotel",
    href: routes.holidays,
    image: image("/images/menu/menu-hotel.webp", ""),
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
    image: image("/images/menu/menu-live.webp", ""),
    groups: [
      { label: "Somabay Neighborhoods", href: routes.neighborhoods },
      { label: "Resale", href: routes.resale },
    ],
  },
  {
    label: "What's Up Soma",
    href: routes.events,
    image: image("/images/menu/menu-whats-up.webp", ""),
    groups: [
      { label: "Events Calendar", href: routes.events },
      { label: "Somabay Journal", href: routes.journal },
      { label: "Sustainability", href: routes.sustainability },
    ],
  },
  {
    label: "Facilities & Services",
    href: routes.facilities,
    image: image("/images/menu/menu-facilities.webp", ""),
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
  { title: "Book Hotel", links: hotelLinks },
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

/** Flattens every navigation destination into one de-duplicated, searchable list. */
function buildSearchIndex(): SearchEntry[] {
  const entries = new Map<string, SearchEntry>();
  const add = (link: NavLink, section: string) => {
    if (!entries.has(link.href))
      entries.set(link.href, {
        label: link.label,
        href: link.href,
        external: link.external,
        section,
      });
  };
  for (const item of mainMenu) {
    add(item, "Somabay");
    for (const group of item.groups ?? []) {
      add(group, item.label);
      for (const child of group.children ?? []) add(child, group.label);
    }
  }
  for (const column of footerColumns) column.links.forEach((link) => add(link, column.title));
  supportLinks.forEach((link) => add(link, "Support"));
  return [...entries.values()];
}

/**
 * What the search popup shows before anything is typed: up to four per section, by page link.
 * Placeholder picks until the CMS supplies its own highlights. Events show the next upcoming.
 */
const SEARCH_HIGHLIGHTS = new Set<string>([
  routes.hotel("kempinski-hotel-somabay"),
  routes.hotel("the-cascades"),
  routes.hotel("robinson-club-somabay"),
  routes.hotel("sheraton-somabay"),
  routes.neighborhood("wadi-jebal"),
  routes.neighborhood("baycentral"),
  routes.neighborhood("mesca"),
  routes.neighborhood("reef-town"),
  routes.activity("golf"),
  routes.activity("spa-and-thalasso"),
  routes.activity("watersports-and-diving"),
  routes.activity("beaches-and-adventure"),
]);

/** Thumbnail without its inline blur placeholder, to keep the header payload light. */
const thumb = (asset: ImageAsset): ImageAsset => ({ ...asset, blurDataURL: undefined });

/** Compact hotel, community and event cards for the search popup. */
function buildSearchCards(): SearchCards {
  return {
    hotels: hotels.map((hotel) => ({
      title: hotel.name,
      subtitle: hotel.tagline,
      href: routes.hotel(hotel.slug),
      image: thumb(hotel.cover ?? hotel.images[0]),
      keywords: [hotel.description, ...hotel.themes.map(themeLabel)].join(" "),
    })),
    communities: neighborhoods.map((place) => ({
      title: place.name,
      subtitle: `${neighborhoodsIntro.tabs[place.status]} · ${place.tagline}`,
      href: routes.neighborhood(place.slug),
      image: thumb(place.image),
      keywords: place.summary ?? "",
    })),
    activities: [
      {
        title: "Golf",
        subtitle: golfTeaser.subtitle,
        href: routes.activity("golf"),
        image: thumb(golfTeaser.wide),
        keywords: [golfTeaser.title, golfTeaser.statement].join(" "),
      },
      ...activityDetails.map((activity) => ({
        title: activity.title,
        subtitle: activity.heroTitle ?? activity.eyebrow,
        href: routes.activity(activity.slug),
        image: thumb(activity.card),
        keywords: [activity.summary, activity.description].filter(Boolean).join(" "),
      })),
    ],
    events: [...events]
      .sort((a, b) => a.start.localeCompare(b.start))
      .map((event) => ({
        title: event.title,
        subtitle: event.location,
        href: routes.event(event.slug),
        start: event.start,
        end: event.end,
        keywords: [categoryLabel(event.category), event.description ?? ""].join(" "),
      })),
  };
}

/** Marks the highlighted cards. */
const highlight = (cards: SearchCards): SearchCards =>
  Object.fromEntries(
    Object.entries(cards).map(([key, list]) => [
      key,
      list.map((card) => ({ ...card, highlighted: SEARCH_HIGHLIGHTS.has(card.href) })),
    ]),
  ) as SearchCards;

export const headerData: HeaderData = {
  menu: mainMenu,
  utilityLinks: menuUtilityLinks,
  actions: menuActions,
  searchIndex: buildSearchIndex(),
  searchCards: highlight(buildSearchCards()),
};
