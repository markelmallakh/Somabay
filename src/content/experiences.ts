import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import type { Activity, Highlight } from "@/types/content";

export const highlights: Highlight[] = [
  {
    title: "Dining",
    description: "From casual bites to memorable evenings.",
    href: routes.dining,
    image: image("/images/experience/dining.webp", "A thatched beach bar terrace at dusk"),
  },
  {
    title: "The Marina",
    description: "A vibrant waterfront for dining, shopping, and leisure.",
    href: routes.marina,
    image: image("/images/experience/marina.webp", "Yachts moored in the marina", {
      position: "50% 60%",
    }),
  },
];

export const activities: Activity[] = [
  {
    slug: "golf",
    eyebrow: "Play by the Sea",
    title: "Golf",
    description:
      "World-class golf surrounded by spectacular landscapes, open skies, and breathtaking Red Sea views.",
    image: image("/images/things-to-do/golf.webp", "A clifftop green above the Red Sea at sunset"),
  },
  {
    slug: "watersports-and-diving",
    eyebrow: "Into the Blue",
    title: "Watersports & Diving",
    description:
      "Explore vibrant reefs, crystal waters, and endless ways to experience the Red Sea above and beneath the surface.",
    image: image(
      "/images/things-to-do/watersports.webp",
      "A diver beside a sea fan on a coral reef",
    ),
  },
  {
    slug: "sports",
    eyebrow: "Move Your Way",
    title: "Sports",
    description:
      "Stay active with sports, fitness, and experiences designed for every level, interest, and pace.",
    image: image(
      "/images/things-to-do/sports.webp",
      "A tennis player serving at the tennis academy",
    ),
  },
  {
    slug: "spa-and-thalasso",
    eyebrow: "Restore & Reconnect",
    title: "Spa & Thalasso",
    description:
      "Wellness experiences inspired by the healing power of the Red Sea, designed to restore your body, mind, and spirit.",
    image: image("/images/things-to-do/spa.webp", "A guest in the thalasso pool beneath arches", {
      position: "50% 70%",
    }),
  },
];
