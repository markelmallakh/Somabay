type Point = { lat: number; lng: number };

/** Great-circle distance in kilometres. */
export function distanceKm(a: Point, b: Point): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

/**
 * "2KM - 3 MINS" style label. Road distance is approximated as 1.3× the straight line at an
 * average 35 km/h on the peninsula's roads.
 */
export function travelLabel(a: Point, b: Point): string {
  const road = distanceKm(a, b) * 1.3;
  const minutes = Math.max(1, Math.round((road / 35) * 60));
  const km = road < 10 ? road.toFixed(1).replace(/\.0$/, "") : Math.round(road).toString();
  return `${km} km · ${minutes} ${minutes === 1 ? "min" : "mins"}`;
}
