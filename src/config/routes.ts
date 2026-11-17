/**
 * Single source of truth for every URL in the Somabay sitemap (from the Figma wireframes).
 * Pages are added incrementally; `publishedRoutes` lists the ones that exist today and
 * feeds `sitemap.ts`, so unfinished sections never leak into search engines.
 */
export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
  facilities: "/facilities-and-services",
  holidays: "/holidays",
  hotel: (slug: string) => `/holidays/${slug}`,
  thingsToDo: "/things-to-do",
  activity: (slug: string) => `/things-to-do/${slug}`,
  marina: "/the-marina",
  dining: "/dining",
  neighborhoods: "/neighborhoods",
  neighborhood: (slug: string) => `/neighborhoods/${slug}`,
  resale: "/resale",
  unit: (slug: string) => `/resale/${slug}`,
  events: "/events",
  event: (slug: string) => `/events/${slug}`,
  journal: "/bay-journal",
  article: (slug: string) => `/bay-journal/${slug}`,
  sustainability: "/sustainability",
  careers: "/careers",
  career: (slug: string) => `/careers/${slug}`,
  faqs: "/faqs",
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
  cookies: "/cookie-settings",
} as const;

/** Static pages that are live (detail pages are added in sitemap.ts from content). */
export const publishedRoutes: readonly string[] = [
  routes.home,
  routes.about,
  routes.contact,
  routes.facilities,
  routes.holidays,
  routes.thingsToDo,
  routes.marina,
  routes.dining,
  routes.neighborhoods,
  routes.resale,
  routes.events,
  routes.journal,
  routes.sustainability,
  routes.careers,
  routes.faqs,
];

/**
 * Pages that open with a full-bleed dark hero, so the header starts transparent over it.
 * Exact paths, or prefixes ending in "/" for every detail page under a section.
 */
const darkHeroPaths: readonly string[] = [
  routes.home,
  routes.about,
  routes.contact,
  routes.facilities,
  routes.holidays,
  routes.marina,
  routes.dining,
  routes.events,
  routes.neighborhoods,
  "/neighborhoods/",
  routes.resale,
  "/things-to-do/",
  routes.sustainability,
  routes.careers,
];

/** Dark-hero pages whose content starts right under the header: the header's shade stays short so
 * it doesn't fall across that content (e.g. the contact form card). */
const shortShadePaths: readonly string[] = [routes.contact];

export function hasShortHeroShade(pathname: string): boolean {
  return shortShadePaths.includes(pathname);
}

export function hasDarkHero(pathname: string): boolean {
  return darkHeroPaths.some((path) =>
    path.endsWith("/") && path !== "/" ? pathname.startsWith(path) : pathname === path,
  );
}
