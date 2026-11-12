import type { MapPlace } from "@/types/content";

/**
 * Coordinates researched from OpenStreetMap, Wikimapia, hotel listings and Nawy compound
 * polygons (neighborhoods are area centroids, not exact buildings).
 */
export const peninsulaView = { lat: 26.853, lng: 33.984, zoom: 14 } as const;

export const hotelPlaces: Record<string, Pick<MapPlace, "lat" | "lng">> = {
  "kempinski-hotel-somabay": { lat: 26.8495, lng: 33.98805 },
  "the-cascades": { lat: 26.85908, lng: 33.99281 },
  "robinson-club-somabay": { lat: 26.84743, lng: 33.99048 },
  "sheraton-somabay": { lat: 26.84606, lng: 33.99681 },
  "the-breakers": { lat: 26.84671, lng: 33.99967 },
};

export const venuePlaces = {
  marina: {
    id: "marina",
    name: "Somabay Marina",
    lat: 26.8485,
    lng: 33.9845,
    category: "commercial",
  },
  golf: {
    id: "golf",
    name: "Gary Player Golf Course",
    lat: 26.85928,
    lng: 33.99351,
    category: "facilities",
  },
  splash: {
    id: "splash",
    name: "Soma Splash",
    lat: 26.84744,
    lng: 33.99621,
    category: "facilities",
  },
  gems: {
    id: "gems",
    name: "GEMS International School",
    lat: 26.84967,
    lng: 33.98544,
    category: "facilities",
  },
  kaktus: { id: "kaktus", name: "The Kaktus", lat: 26.87283, lng: 33.9781, category: "commercial" },
  gate: { id: "gate", name: "Somabay Gate", lat: 26.87522, lng: 33.9683, category: "facilities" },
} satisfies Record<string, MapPlace>;

export const neighborhoodPlaces: Record<string, Pick<MapPlace, "lat" | "lng">> = {
  "wadi-jebal": { lat: 26.86389, lng: 33.992 },
  "wadi-jebal-extension": { lat: 26.86208, lng: 33.99278 },
  mesca: { lat: 26.86544, lng: 33.9682 },
  "mesca-golf-edition": { lat: 26.86544, lng: 33.9682 },
  "mesca-heights": { lat: 26.866, lng: 33.9705 },
  "reef-town": { lat: 26.85762, lng: 33.99827 },
  somabreeze: { lat: 26.85306, lng: 34.00164 },
  baycentral: { lat: 26.85221, lng: 33.9842 },
  "greens-baywest-valley": { lat: 26.87089, lng: 33.96484 },
  coves: { lat: 26.88395, lng: 33.98555 },
  blanca: { lat: 26.86003, lng: 33.97648 },
  "blanca-gardens": { lat: 26.86294, lng: 33.9807 },
  nautilus: { lat: 26.85469, lng: 33.98135 },
};
