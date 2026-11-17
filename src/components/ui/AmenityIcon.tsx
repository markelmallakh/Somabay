import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A line icon for each hotel, room and suite amenity, drawn on one 24px grid with the site's
 * 1.4 stroke and round ends so every amenity row reads as one family. Labels are matched loosely
 * (case and "free"/"daily" prefixes ignored); anything new falls back to a neutral star mark,
 * never a checkmark.
 */
const paths: Record<string, ReactNode> = {
  beach: (
    <>
      <path d="M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z" />
      <path d="M12 12v8M8 20h8" />
    </>
  ),
  pool: (
    <>
      <path d="M7 15V5.5a2 2 0 0 1 4 0M13 15V5.5a2 2 0 0 1 4 0M7 8.5h10M7 12h10" />
      <path d="M3 18c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
    </>
  ),
  spa: (
    <>
      <path d="M12 20c-4.5 0-8-2.6-8-6 2.5 0 5.4 1.2 8 4 2.6-2.8 5.5-4 8-4 0 3.4-3.5 6-8 6Z" />
      <path d="M12 18c-1.8-2-2.6-4.3-2.6-6.6C9.4 8.8 10.5 6 12 4c1.5 2 2.6 4.8 2.6 7.4 0 2.3-.8 4.6-2.6 6.6Z" />
    </>
  ),
  dining: (
    <path d="M7 3.5v17M4.5 3.5V8a2.5 2.5 0 0 0 5 0V3.5M17 20.5v-17c-2 0-3.5 2.2-3.5 6s1.5 5 3.5 5" />
  ),
  bar: (
    <>
      <path d="M5 4.5h14L12 12 5 4.5ZM12 12v7.5M8.5 19.5h7" />
      <path d="M15.5 4.5 18 2" />
    </>
  ),
  kids: (
    <>
      <circle cx="8" cy="6.5" r="2" />
      <circle cx="16.5" cy="9" r="1.6" />
      <path d="M4.5 20v-5.5a3.5 3.5 0 0 1 7 0V20M13.5 20v-4a3 3 0 0 1 6 0v4" />
    </>
  ),
  fitness: <path d="M6.5 7.5v9M3.5 9.5v5M17.5 7.5v9M20.5 9.5v5M6.5 12h11" />,
  wifi: (
    <>
      <path d="M3 9.5a13 13 0 0 1 18 0M6 13a8.5 8.5 0 0 1 12 0M9 16.5a4 4 0 0 1 6 0" />
      <circle cx="12" cy="19.5" r=".6" fill="currentColor" />
    </>
  ),
  parking: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M10 16.5v-9h3a2.75 2.75 0 0 1 0 5.5h-3" />
    </>
  ),
  golf: (
    <>
      <path d="M8 21V3.5l9 3.5-9 3.5" />
      <ellipse cx="12" cy="20.5" rx="7" ry="1.5" />
    </>
  ),
  diving: (
    <>
      <path d="M3.5 8.5h17v3.5a3 3 0 0 1-3 3h-2.2a2 2 0 0 1-1.8-1.2l-.5-1a1 1 0 0 0-1.8 0l-.5 1a2 2 0 0 1-1.8 1.2H6.5a3 3 0 0 1-3-3V8.5Z" />
      <path d="M20.5 10.5V18a2 2 0 0 1-2 2h-2" />
    </>
  ),
  kite: (
    <>
      <path d="M4 10c3-5 13-5 16 0" />
      <path d="M4 10l7.5 10M20 10l-7.5 10M11.5 20h1" />
    </>
  ),
  tennis: (
    <>
      <ellipse cx="10" cy="9" rx="5.5" ry="6" transform="rotate(-35 10 9)" />
      <path d="m13.8 13.5 6 6.5" />
      <circle cx="18.5" cy="6" r="1.6" />
    </>
  ),
  shuttle: (
    <path d="M10.5 13.5 4 11l1.5-1.5 6.5 1 3.5-3.5c1-1 2.5-1.5 3.5-.5s.5 2.5-.5 3.5L15 13.5l1 6.5L14.5 21.5 12 15l-2.5 2.5V20l-1.5 1-1-3-3-1 1-1.5h2.5L10.5 13.5Z" />
  ),
  roomService: (
    <>
      <path d="M4 17.5h16M5.5 17.5a6.5 6.5 0 0 1 13 0M12 8.5V7M10.5 7h3" />
    </>
  ),
  ac: (
    <>
      <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
      <path d="m10 4.5 2 1.5 2-1.5M10 19.5l2-1.5 2 1.5" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M8 20.5h8" />
    </>
  ),
  minibar: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <path d="M6 10h12M9 6.5v1.5M9 13v2.5" />
    </>
  ),
  shower: (
    <>
      <path d="M4 20V7a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3" />
      <path d="M8 7.5h6M12.5 11v1M15.5 11v1M18.5 11v1M14 14.5v1M17 14.5v1M15.5 18v1" />
    </>
  ),
  housekeeping: (
    <>
      <path d="M4 17.5h16M6 17.5a6 6 0 0 1 12 0M12 11.5v-1" />
      <circle cx="12" cy="9.5" r="1" />
      <path d="M5 20.5h14" />
    </>
  ),
  bathtub: (
    <>
      <path d="M3.5 12h17v2.5a4.5 4.5 0 0 1-4.5 4.5H8A4.5 4.5 0 0 1 3.5 14.5V12Z" />
      <path d="M6 12V6a2 2 0 0 1 4 0M7 19l-1 1.5M17 19l1 1.5" />
    </>
  ),
  balcony: (
    <>
      <path d="M5 11V4.5h14V11M3.5 11h17M5.5 11v9M10 11v9M14 11v9M18.5 11v9M3.5 20h17" />
    </>
  ),
  living: (
    <>
      <path d="M5 11V8.5a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 8.5V11" />
      <path d="M3.5 13a1.5 1.5 0 0 1 3 0v1.5h11V13a1.5 1.5 0 0 1 3 0v4.5h-17V13ZM5.5 17.5V19M18.5 17.5V19" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 9.5h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-5Z" />
      <path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3.5v2.5M12 3.5v2.5" />
    </>
  ),
  safe: (
    <>
      <rect x="4" y="4" width="16" height="15" rx="1.5" />
      <circle cx="12" cy="11.5" r="3" />
      <path d="M12 8.5v1M7 19v1.5M17 19v1.5" />
    </>
  ),
  seaView: (
    <>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M3 15c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1M3 19c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
    </>
  ),
  privatePool: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M6.5 13c1 0 1-.8 2-.8s1 .8 2 .8 1-.8 2-.8 1 .8 2 .8 1-.8 2-.8M8 8V4.5h2" />
    </>
  ),
  kitchen: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M4 9h16M8 6.5h.01M11 6.5h.01" />
      <circle cx="12" cy="14.5" r="3" />
    </>
  ),
  concierge: (
    <>
      <path d="M4 17h16M5.5 17a6.5 6.5 0 0 1 13 0" />
      <path d="M12 10.5V9M10.5 9h3M3.5 20h17" />
      <path d="M9 13.5a3 3 0 0 1 2-1.3" />
    </>
  ),
  garden: (
    <>
      <path d="M12 21v-8M12 13c0-4 2.5-7.5 7-8.5 0 4.5-3 8.5-7 8.5ZM12 15c0-3-2-5.5-6-6 0 3.5 2.5 6 6 6Z" />
      <path d="M7 21h10" />
    </>
  ),
  laundry: (
    <>
      <rect x="4.5" y="3" width="15" height="18" rx="1.5" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M7.5 6.5h2M15.5 6.5h1" />
    </>
  ),
  yoga: (
    <>
      <circle cx="12" cy="5" r="1.8" />
      <path d="M12 8v6M6 10.5l6 1.5 6-1.5M8.5 19.5 12 14l3.5 5.5M5 19.5h14" />
    </>
  ),
  rooftop: (
    <>
      <path d="M3.5 10 12 4l8.5 6" />
      <path d="M8.5 13h7l-3.5 4-3.5-4ZM12 17v3M10 20h4" />
    </>
  ),
  security: (
    <>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  meet: (
    <>
      <circle cx="9" cy="7.5" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 7.5h4.5M16 11h4.5M16 14.5h3" />
    </>
  ),
  allInclusive: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.5h7M12 9v7" />
    </>
  ),
  desk: (
    <>
      <path d="M3.5 9.5h17M5.5 9.5V20M18.5 9.5V20M13 9.5V14h5.5" />
      <path d="M9 6.5V4.5h3.5v2M8 9.5V7.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v2" />
    </>
  ),
  waterSports: (
    <>
      <path d="M12 3.5 6 15h12L12 3.5ZM12 3.5V15" />
      <path d="M3 19c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1" />
    </>
  ),
  marina: (
    <>
      <path d="M12 3.5v11M12 4.5l6 8.5h-6M4 15.5h16l-2 3.5H6l-2-3.5Z" />
      <path d="M3 21c1.5 0 1.5-.8 3-.8s1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8 1.5-.8 3-.8 1.5.8 3 .8" />
    </>
  ),
  lounge: (
    <>
      <path d="M6 20v-6.5a6 6 0 0 1 12 0V20M4 20h16M9 13.5h6" />
      <path d="M12 7.5V4M10.5 4h3" />
    </>
  ),
  fallback: (
    <path d="m12 3.8 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.6-4.8 2.6.9-5.4-3.9-3.8 5.4-.8L12 3.8Z" />
  ),
};

/** Which drawing each amenity label uses, by the words it contains. */
const rules: [RegExp, keyof typeof paths][] = [
  [/shuttle|airport|transfer/, "shuttle"],
  [/all.?inclusive/, "allInclusive"],
  [/water ?sport|sailing/, "waterSports"],
  [/aqua ?park|water ?park|slide/, "pool"],
  [/breakfast/, "coffee"],
  [/marble/, "bathtub"],
  [/desk|workstation/, "desk"],
  [/bathrooms?$|en.?suite/, "shower"],
  [/beachfront|beach access/, "beach"],
  [/outdoor seating|patio/, "balcony"],
  [/pool access/, "pool"],
  [/dining area/, "dining"],
  [/satellite|flat.?screen/, "tv"],
  [/private pool|plunge/, "privatePool"],
  [/beach/, "beach"],
  [/pool/, "pool"],
  [/spa|wellness|thalasso/, "spa"],
  [/rooftop/, "rooftop"],
  [/restaurant|dining/, "dining"],
  [/\bbar\b|bars/, "bar"],
  [/kid|family|child/, "kids"],
  [/fitness|gym/, "fitness"],
  [/wi-?fi|internet/, "wifi"],
  [/parking/, "parking"],
  [/golf/, "golf"],
  [/div/, "diving"],
  [/kite|surf/, "kite"],
  [/tennis|padel|squash/, "tennis"],
  [/shuttle|airport|transfer/, "shuttle"],
  [/room service|in-room dining/, "roomService"],
  [/air.?condition|a\/c/, "ac"],
  [/tv|television/, "tv"],
  [/minibar|fridge|refrigerator/, "minibar"],
  [/shower/, "shower"],
  [/housekeeping|turndown/, "housekeeping"],
  [/bath/, "bathtub"],
  [/balcony|terrace/, "balcony"],
  [/living|sofa|sitting/, "living"],
  [/coffee|tea|espresso|kettle/, "coffee"],
  [/safe/, "safe"],
  [/marina/, "marina"],
  [/garden/, "garden"],
  [/sea view|ocean|lagoon|view/, "seaView"],
  [/kitchen/, "kitchen"],
  [/concierge|butler/, "concierge"],
  [/wash|laundry/, "laundry"],
  [/yoga/, "yoga"],
  [/secur/, "security"],
  [/meet|greet/, "meet"],
  [/lounge|club access/, "lounge"],
];

export function amenityKey(label: string): keyof typeof paths {
  const text = label.toLowerCase();
  return rules.find(([pattern]) => pattern.test(text))?.[1] ?? "fallback";
}

export function AmenityIcon({ amenity, className }: { amenity: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={cn("shrink-0", className)}
    >
      {paths[amenityKey(amenity)]}
    </svg>
  );
}
