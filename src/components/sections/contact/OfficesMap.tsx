"use client";

import { useMemo } from "react";
import { offices } from "@/content/contact";
import type { MapPlace } from "@/types/content";
import { PlacesMap } from "@/components/map/PlacesMap";

const escape = (value: string) => value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

/** Small solid icons for the popup rows (after Heroicons solid, MIT). */
const ICON = {
  clock:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z"/><path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
};

/**
 * Both offices on one full-width map, each with an open card: its region and name, address,
 * working hours, phone and email, and a link to directions in Google Maps.
 */
export function OfficesMap() {
  const { places, popups } = useMemo(() => {
    const placesList: MapPlace[] = offices.map((office) => ({
      id: office.id,
      name: office.name,
      lat: office.lat,
      lng: office.lng,
    }));
    const cards = Object.fromEntries(
      offices.map((office) => {
        const directions = `https://www.google.com/maps/search/?api=1&query=${office.lat},${office.lng}`;
        return [
          office.id,
          `<div class="office-card">
            <p class="office-card__eyebrow">${escape(office.region)}</p>
            <p class="office-card__title">${escape(office.name)}</p>
            <p class="office-card__address">${escape(office.address)}</p>
            <div class="office-card__rows">
              <p class="office-card__row">${ICON.clock}<span>${escape(office.hours)}</span></p>
              <p class="office-card__row">${ICON.phone}<a href="${escape(office.phone.href)}">${escape(office.phone.label)}</a></p>
              <p class="office-card__row">${ICON.mail}<a href="${escape(office.email.href)}">${escape(office.email.label)}</a></p>
            </div>
            <a class="office-card__link" href="${directions}" target="_blank" rel="noopener noreferrer">Get directions ${ICON.arrow}</a>
          </div>`,
        ];
      }),
    );
    return { places: placesList, popups: cards };
  }, []);

  return (
    <PlacesMap
      places={places}
      popups={popups}
      label="Map of the Somabay offices"
      // Framed on Cairo and the Red Sea coast, zoomed so each office's open card has room
      // above its pin without meeting the other. Fractional zoom needs the tight setting.
      view={{ lat: 30.22, lng: 32.48, zoom: 7.1 }}
      fitTight
      className="h-[min(50rem,86svh)] w-full"
    />
  );
}
