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

export const publishedRoutes: readonly string[] = [routes.home];
