import { image, video } from "@/lib/media";
import type { Neighborhood } from "@/types/content";

/**
 * From the Neighborhood List wireframe. Taglines the wireframe left as placeholders use the
 * homepage wireframe's taglines instead. Status and imagery to be confirmed by Somabay.
 */
export const neighborhoods: Neighborhood[] = [
  {
    slug: "wadi-jebal",
    // The Wadi Jebal film (shared with Wadi Jebal Extension, from the client's WJ Extension shoot).
    heroMedia: video({
      label: "Aerial film of the Wadi Jebal homes along the cliffs",
      poster: image("/images/video/wadi-jebal-ext-loop-poster.webp", ""),
      sources: [{ src: "/videos/wadi-jebal-ext-loop.webm", type: "video/webm" }],
    }),
    name: "Wadi Jebal",
    tagline: "Peninsula Edge",
    status: "living",
    image: image(
      "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-54-am.webp",
      "Wadi Jebal patio villa terrace",
    ),
    gallery: [
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-56-am.webp",
        "Wadi Jebal villa living room",
      ),
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-55-am.webp",
        "Wadi Jebal villa interior",
      ),
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-54-am-1.webp",
        "Wadi Jebal villa terrace",
      ),
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-54-am-3.webp",
        "Wadi Jebal villa garden",
      ),
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-55-am-2.webp",
        "Wadi Jebal villa bedroom",
      ),
      image(
        "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-56-am-3.webp",
        "Wadi Jebal villa view",
      ),
    ],
    detail: {
      // DRAFT COPY: the hero paragraph, condensed from the concept text below; confirm with the
      // client.
      subtitle:
        "Elevated living by the Red Sea. Homes set along the cliffs, with only 15% of the land developed and open views all around.",
      stats: [
        { value: "210", unit: "K sqm", label: "Land Area" },
        { value: "11", unit: "KM", label: "Somabay Coastline" },
        { value: "165", label: "Residences" },
        // From the concept text: "only 15% of the cliff developed".
        { value: "15", unit: "%", label: "Of the Cliff Developed" },
      ],
      concept: {
        eyebrow: "Where the landscape leads",
        title: "Wadi Jebal Concept",
        description:
          "Wadi Jebal is shaped by its natural topography, with residences thoughtfully positioned along the cliffs to make the most of the sea, sky, and surrounding landscape. With only 15% of the cliff developed, the neighborhood preserves generous open spaces while creating a sense of privacy, openness, and connection to nature.",
        images: [
          image(
            "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-56-am-1.webp",
            "Wadi Jebal villa exterior",
          ),
          image(
            "/images/library/residences/wadi-jebal-patio/2025-05-20-at-11-07-54-am-2.webp",
            "Wadi Jebal residence with a view of the sea",
          ),
        ],
      },
      logo: "/images/neighborhoods/wadi-jebal-logo.svg",
      hasMasterplan: true,
    },
  },
  {
    slug: "baycentral",
    name: "Baycentral",
    tagline: "Valley Calm",
    status: "living",
    image: image("/images/library/lifestyle/067a2820.webp", "The bay at sunset near Baycentral"),
  },
  {
    slug: "wadi-jebal-extension",
    heroMedia: video({
      label: "Aerial view of the Wadi Jebal Extension homes",
      poster: image("/images/video/wadi-jebal-ext-loop-poster.webp", ""),
      sources: [{ src: "/videos/wadi-jebal-ext-loop.webm", type: "video/webm" }],
    }),
    name: "Wadi Jebal Extension",
    tagline: "Natural Authenticity",
    status: "living",
    image: image(
      "/images/neighborhoods/wadi-soma.webp",
      "Aerial view of Wadi Jebal Extension villas",
    ),
    gallery: [
      image(
        "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-2.webp",
        "Wadi Jebal Extension aerial view",
      ),
      image(
        "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-4.webp",
        "Villas with private pools",
      ),
      image(
        "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-56-pm.webp",
        "Contemporary villas by the sea",
      ),
      image(
        "/images/library/residences/wadi-jebal-extension/2026-02-04-at-2-21-55-pm-5.webp",
        "Wadi Jebal Extension streetscape",
      ),
    ],
  },
  {
    slug: "mesca",
    name: "Mesca",
    tagline: "Golf Living",
    status: "living",
    image: image(
      "/images/neighborhoods/mesca-golf-edition.webp",
      "Aerial view of Mesca by the beach",
    ),
    heroMedia: video({
      label: "Moments from Mesca",
      poster: image("/images/video/mesca-loop-poster.webp", ""),
      sources: [{ src: "/videos/mesca-loop.webm", type: "video/webm" }],
    }),
  },
  {
    slug: "reef-town",
    heroMedia: image(
      "/images/cta/contact-bay-aerial.webp",
      "Aerial view of the bay, the beach and a speedboat on turquoise water",
    ),
    name: "Reef Town",
    tagline: "Relaxed Luxury",
    status: "living",
    image: image(
      "/images/library/residences/reeftown/2025-05-15-at-5-26-04-pm-3.webp",
      "A Reef Town villa",
    ),
    gallery: [
      image(
        "/images/library/residences/reeftown/2025-05-15-at-5-26-01-pm-3.webp",
        "Reef Town villa interior",
      ),
      image(
        "/images/library/residences/reeftown/2025-05-15-at-5-26-00-pm.webp",
        "Reef Town living room",
      ),
      image(
        "/images/library/residences/reeftown/2025-05-15-at-5-26-02-pm-2.webp",
        "Reef Town terrace",
      ),
      image(
        "/images/library/residences/reeftown/2025-05-15-at-5-25-59-pm-2.webp",
        "Reef Town bedroom",
      ),
    ],
  },
  {
    slug: "coves",
    name: "Coves",
    tagline: "Garden Living",
    status: "living",
    image: image("/images/library/golf/hiden-cove-5.webp", "The coastline at Coves"),
  },
  {
    slug: "somabreeze",
    heroMedia: image(
      "/images/library/golf/hidden-cove-15th.webp",
      "A green framed by palms and desert dunes",
    ),
    name: "Somabreeze",
    tagline: "Green Elegance",
    status: "living",
    image: image(
      "/images/library/residences/somabreeze/2025-05-19-at-6-02-36-pm.webp",
      "A Somabreeze chalet",
    ),
  },
  {
    slug: "nautilus",
    name: "Nautilus",
    tagline: "Bayfront Elegance",
    status: "upcoming",
    image: image(
      "/images/neighborhoods/nautilus-living.webp",
      "An open-plan Nautilus living room facing the sea",
    ),
    summary: "Coastal living with beautiful sea views and a relaxed beachfront atmosphere.",
  },
  {
    slug: "greens-baywest-valley",
    heroMedia: image(
      "/images/library/golf/hidden-cove-2.webp",
      "Palm-lined fairways running toward the sea",
    ),
    name: "Greens Baywest Valley",
    tagline: "Shoreline Living",
    status: "upcoming",
    image: image(
      "/images/neighborhoods/greens-baywest-valley.webp",
      "Green fairways and palms in the western valley",
    ),
  },
  {
    slug: "mazeej-residence-soma",
    heroMedia: image(
      "/images/library/beaches/mg-8317-enhanced-nr.webp",
      "The sea swing at sunset under a dramatic sky",
    ),
    name: "Mazeej Residence Soma",
    tagline: "Natural Harmony",
    status: "upcoming",
    image: image("/images/neighborhoods/mazeej-residence.webp", "A bench facing the sea at sunset"),
  },
  {
    slug: "mesca-heights",
    heroMedia: image(
      "/images/library/golf/hidden-cove-12th.webp",
      "Aerial view of the fairways and the sea at sunset",
    ),
    name: "Mesca Heights",
    tagline: "Elevated Views",
    status: "upcoming",
    image: image("/images/neighborhoods/mesca-heights.webp", "Aerial view of Mesca toward the sea"),
  },
  {
    slug: "arc-of-soma",
    heroMedia: image(
      "/images/library/beaches/dsc07223.webp",
      "Palm fronds framing the sea and the Simply Somabay sign",
    ),
    name: "Arc of Soma",
    tagline: "Bayfront Elegance",
    status: "upcoming",
    summary: "Terraced homes framed by palms, gardens and open views of the Red Sea.",
    image: image("/images/neighborhoods/arc-of-soma.webp", "Aerial view of the peninsula edge"),
  },
  {
    slug: "blanca",
    heroMedia: image(
      "/images/menu/menu-live.webp",
      "A family building sandcastles on a white beach",
    ),
    name: "Blanca",
    tagline: "Coastal Retreat",
    status: "upcoming",
    image: image("/images/neighborhoods/blanca-aerial.webp", "Aerial view of white Blanca villas"),
    summary: "Whitewashed homes along the shore, made for slow days by the water.",
  },
  {
    slug: "blanca-gardens",
    heroMedia: image(
      "/images/library/golf/hidden-cove.webp",
      "A green fairway by the sea at sunset",
    ),
    name: "Blanca Gardens",
    tagline: "Garden Living",
    status: "upcoming",
    image: image(
      "/images/neighborhoods/blanca-gardens.webp",
      "Villas set around landscaped gardens",
    ),
  },
  {
    slug: "blanca-gardens-ii",
    heroMedia: image(
      "/images/library/golf/hidden-cove-4.webp",
      "Palms and greens beneath the Red Sea mountains",
    ),
    name: "Blanca Gardens II",
    tagline: "Green Elegance",
    status: "upcoming",
    image: image("/images/neighborhoods/blanca-gardens-ii.webp", "A private pool facing the sea"),
  },
  {
    slug: "the-lighthouse-somabay",
    heroMedia: image(
      "/images/library/beaches/img-1663.webp",
      "The sun setting over the mountains across the sea",
    ),
    name: "The Lighthouse Somabay",
    tagline: "Shoreline Living",
    status: "upcoming",
    image: image("/images/neighborhoods/the-lighthouse.webp", "Palm fronds framing the shoreline"),
  },
  {
    slug: "mesca-golf-edition",
    heroMedia: image(
      "/images/library/golf/hiden-cove-13th.webp",
      "A green with palms and mountains at golden hour",
    ),
    name: "Mesca Golf Edition",
    tagline: "Golf Living",
    status: "upcoming",
    image: image("/images/library/golf/13-a.webp", "A green overlooking the sea"),
  },
];

export function getNeighborhood(slug: string): Neighborhood | undefined {
  return neighborhoods.find((item) => item.slug === slug);
}
