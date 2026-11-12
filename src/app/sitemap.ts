import type { MetadataRoute } from "next";
import { publishedRoutes, routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { jobs } from "@/content/careers";
import { events } from "@/content/events";
import { hotels } from "@/content/hotels";
import { articles } from "@/content/journal";
import { neighborhoods } from "@/content/neighborhoods";
import { units } from "@/content/resale";
import { activityDetails } from "@/content/things-to-do";

export default function sitemap(): MetadataRoute.Sitemap {
  const detailPages = [
    ...hotels.map((hotel) => routes.hotel(hotel.slug)),
    routes.activity("golf"),
    ...activityDetails.map((activity) => routes.activity(activity.slug)),
    ...neighborhoods.map((item) => routes.neighborhood(item.slug)),
    ...units.map((unit) => routes.unit(unit.slug)),
    ...events.map((event) => routes.event(event.slug)),
    ...articles.map((article) => routes.article(article.slug)),
    ...jobs.map((job) => routes.career(job.slug)),
  ];
  return [
    ...publishedRoutes.map((path) => ({
      url: `${siteConfig.url}${path === "/" ? "" : path}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...detailPages.map((path) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
