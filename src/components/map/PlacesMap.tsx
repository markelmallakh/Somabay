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
  /** `drawn` is the brand-tinted map; `satellite` shows aerial imagery. */
  basemap?: "drawn" | "satellite";
  className?: string;
  /** Fit the places as closely as possible (fractional zoom, slim padding) instead of the
   *  default whole-step fit, which can leave a lot of empty map around them. */
  fitTight?: boolean;
  /** Extra room on the right when fitting, in px, for a panel laid over the map on large screens. */
  insetRight?: number;
  /**
   * A popup card per place (trusted HTML built by the caller, with any outside text escaped).
   * Places with a popup open it when their pin is clicked, one at a time; while it's closed, their
   * name labels the pin.
   */
  popups?: Record<string, string>;
};

/**
 * Esri's light grey canvas (keyless; CARTO's free tiles now need an API key), recoloured in the
 * browser into the site's palette by the `somabay-duotone` filter below: sand land, turquoise sea,
 * cream roads. Place names come from a separate label layer drawn on top, untinted.
 */
const TILE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}";
const LABELS_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}";
const ATTRIBUTION =
  'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, FAO, NOAA, USGS, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

/** Esri's aerial imagery (also keyless): the real peninsula, sea and greens in full colour. */
const SATELLITE_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const SATELLITE_ATTRIBUTION =
  'Imagery &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, Maxar, Earthstar Geographics, and the GIS User Community';

/**
 * Tone curve for the grey canvas, sampled at 101 steps: its sea (grey ~0.82) turns turquoise, land
 * (~0.94) warm sand and roads (~0.98) white, with short blends between them.
 */
const DUOTONE = (() => {
  const sea = [0.6, 0.83, 0.85];
  const land = [0.953, 0.933, 0.886];
  const road = [1, 1, 1];
  const mix = (a: number[], b: number[], t: number) =>
    a.map((value, i) => value + (b[i] - value) * t);
  const at = (v: number) => {
    if (v <= 0.86) return sea;
    if (v <= 0.92) return mix(sea, land, (v - 0.86) / 0.06);
    if (v <= 0.955) return land;
    if (v <= 0.97) return mix(land, road, (v - 0.955) / 0.015);
    return road;
  };
  const steps = Array.from({ length: 101 }, (_, i) => at(i / 100));
  const channel = (index: number) => steps.map((rgb) => rgb[index].toFixed(3)).join(" ");
  return { r: channel(0), g: channel(1), b: channel(2) };
})();

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
  basemap = "drawn",
  className,
  fitTight = false,
  insetRight = 0,
  popups,
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
        zoomSnap: fitTight ? 0.1 : 1,
      });
      map.current = instance;
      const satellite = basemap === "satellite";
      L.tileLayer(satellite ? SATELLITE_URL : TILE_URL, {
        attribution: satellite ? SATELLITE_ATTRIBUTION : ATTRIBUTION,
        maxZoom: 19,
        maxNativeZoom: satellite ? 18 : 16,
        className: satellite ? "" : "somabay-duotone",
      }).addTo(instance);
      if (!satellite) {
        L.tileLayer(LABELS_URL, {
          maxZoom: 19,
          maxNativeZoom: 16,
          className: "somabay-labels",
        }).addTo(instance);
      }
      layer.current = L.layerGroup().addTo(instance);

      const icon = (kind: "place" | "origin") =>
        L.divIcon({
          className: "",
          html: `<span class="somabay-pin somabay-pin--${kind}"></span>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        });

      const all = origin ? [origin, ...places] : places;
      // Popups can only open once the map has its view, so they open after the fit below.
      for (const place of all) {
        const isOrigin = origin?.id === place.id;
        const marker = L.marker([place.lat, place.lng], {
          icon: icon(isOrigin ? "origin" : "place"),
          // The starting point stays on top of any destination right beside it.
          zIndexOffset: isOrigin ? 1000 : 0,
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
        const popup = popups?.[place.id];
        if (popup) {
          marker.unbindTooltip();
          marker.bindPopup(popup, {
            className: "somabay-popup",
            // One card at a time: opening another closes this one; the X or the map closes it.
            autoClose: true,
            closeOnClick: true,
            closeButton: true,
            maxWidth: 300,
            minWidth: 260,
            offset: [0, -10],
            autoPan: true,
            autoPanPadding: [40, 40],
          });
          // While its card is closed, the place's name sits over the pin; the open card says it.
          marker.bindTooltip(escapeHtml(place.name), {
            direction: "top",
            offset: [0, -14],
            className: "somabay-tooltip somabay-tooltip--label",
            permanent: true,
          });
          marker.on("popupopen", () => marker.closeTooltip());
          marker.on("popupclose", () => marker.openTooltip());
        }
        if (!isOrigin) marker.on("click", () => onSelectRef.current?.(place.id));
        currentMarkers.set(place.id, marker);
      }

      if (view) instance.setView([view.lat, view.lng], view.zoom);
      else {
        const wide = window.matchMedia("(min-width: 1024px)").matches;
        instance.fitBounds(L.latLngBounds(all.map((place) => [place.lat, place.lng])), {
          paddingTopLeft: fitTight ? [40, 40] : [48, 48],
          paddingBottomRight: fitTight
            ? [40 + (wide ? insetRight : 0), 56]
            : [48 + (wide ? insetRight : 0), 48],
        });
      }
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
  }, [places, origin, view, basemap, fitTight, insetRight, popups]);

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
    <>
      {/* Maps the grey canvas's tones onto the palette: darker greys (the sea) to turquoise, light
          grey (land) to sand, white (roads) to cream. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id="somabay-duotone" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="table" tableValues={DUOTONE.r} />
            <feFuncG type="table" tableValues={DUOTONE.g} />
            <feFuncB type="table" tableValues={DUOTONE.b} />
          </feComponentTransfer>
        </filter>
      </svg>
      <div
        ref={container}
        role="region"
        aria-label={label}
        className={cn("somabay-map relative z-0 overflow-hidden bg-sand-200", className)}
      />
    </>
  );
}
