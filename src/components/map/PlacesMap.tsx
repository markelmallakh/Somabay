"use client";

import "leaflet/dist/leaflet.css";
import type { LayerGroup, Map as LeafletMap, Marker, Polyline } from "leaflet";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { MapPlace } from "@/types/content";

type PlacesMapProps = {
  places: MapPlace[];
  /** Map centre and zoom; defaults to fitting every place. */
  view?: { lat: number; lng: number; zoom: number };
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  /** Draws a line from this point to the selected place (neighborhood → destination). */
  origin?: MapPlace;
  label: string;
  className?: string;
};

/**
 * Esri's topographic map: keyless and softly coloured (blue sea, pale land), close to the site's
 * palette. CARTO's free tiles now need an API key.
 */
const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
const ATTRIBUTION =
  'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

/**
 * Interactive Leaflet map with ring pins and hover labels on a light, desaturated basemap.
 * Leaflet only loads in the browser, after the map scrolls near the viewport.
 */
export function PlacesMap({
  places,
  view,
  selectedId,
  onSelect,
  origin,
  label,
  className,
}: PlacesMapProps) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const route = useRef<Polyline | null>(null);
  const layer = useRef<LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let cancelled = false;
    const currentMarkers = markers.current;

    const init = async () => {
      const L = await import("leaflet");
      if (cancelled || map.current) return;
      const instance = L.map(element, {
        scrollWheelZoom: false,
        zoomControl: true,
        attributionControl: true,
      });
      map.current = instance;
      L.tileLayer(TILE_URL, { attribution: ATTRIBUTION, maxZoom: 19, maxNativeZoom: 16 }).addTo(
        instance,
      );
      layer.current = L.layerGroup().addTo(instance);

      const icon = (kind: "place" | "origin") =>
        L.divIcon({
          className: "",
          html: `<span class="somabay-pin somabay-pin--${kind}"></span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

      const all = origin ? [origin, ...places] : places;
      for (const place of all) {
        const isOrigin = origin?.id === place.id;
        const marker = L.marker([place.lat, place.lng], {
          icon: icon(isOrigin ? "origin" : "place"),
          keyboard: true,
          title: place.name,
          alt: place.name,
        })
          .bindTooltip(
            `<strong>${escapeHtml(place.name)}</strong>${place.subtitle ? `<br><span>${escapeHtml(place.subtitle)}</span>` : ""}`,
            {
              direction: "top",
              offset: [0, -14],
              className: "somabay-tooltip",
              permanent: isOrigin,
            },
          )
          .addTo(layer.current);
        if (!isOrigin) marker.on("click", () => onSelectRef.current?.(place.id));
        currentMarkers.set(place.id, marker);
      }

      if (view) instance.setView([view.lat, view.lng], view.zoom);
      else
        instance.fitBounds(L.latLngBounds(all.map((place) => [place.lat, place.lng])), {
          padding: [48, 48],
        });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          void init();
        }
      },
      { rootMargin: "400px" },
    );
    observer.observe(element);

    return () => {
      cancelled = true;
      observer.disconnect();
      map.current?.remove();
      map.current = null;
      currentMarkers.clear();
    };
  }, [places, origin, view]);

  useEffect(() => {
    let cancelled = false;
    const update = async () => {
      const L = await import("leaflet");
      if (cancelled) return;
      markers.current.forEach((marker, id) => {
        marker.getElement()?.classList.toggle("is-selected", id === selectedId);
      });
      route.current?.remove();
      route.current = null;
      const target = places.find((place) => place.id === selectedId);
      if (origin && target && map.current) {
        route.current = L.polyline(
          [
            [origin.lat, origin.lng],
            [target.lat, target.lng],
          ],
          { color: "#24272a", weight: 2, dashArray: "6 6" },
        ).addTo(map.current);
        markers.current.get(target.id)?.openTooltip();
      }
    };
    void update();
    return () => {
      cancelled = true;
    };
  }, [selectedId, origin, places]);

  return (
    <div
      ref={container}
      role="region"
      aria-label={label}
      className={cn("somabay-map relative z-0 overflow-hidden bg-sand-200", className)}
    />
  );
}
