import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

const strokeIcons = {
  "arrow-right": <path d="M4 12h15m-5-5 5 5-5 5" />,
  "arrow-up-right": <path d="M7 17 17 7M9 7h8v8" />,
  "chevron-right": <path d="m9.5 6 6 6-6 6" />,
  "chevron-left": <path d="m14.5 6-6 6 6 6" />,
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.8-4.8" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h2.6l1.4 4.1-2 1.4a12 12 0 0 0 6.4 6.4l1.4-2 4.1 1.4v2.6a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2m0 15v2M4.6 4.6l1.4 1.4m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10Z" />,
  "cloud-sun": (
    <>
      <path d="M8.5 4.5v1.2M3.9 6.4l.9.9M2.5 11h1.2M13.1 6.4l-.9.9" />
      <path d="M5.6 11a3 3 0 0 1 5.8-1" />
      <path d="M8 19.5h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.6 1.4A2.8 2.8 0 0 0 8 19.5Z" />
    </>
  ),
  close: <path d="M5 5l14 14M19 5 5 19" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  medical: (
    <>
      <path d="M12 20.5s-8-4.8-8-10.6A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.6c0 5.8-8 10.6-8 10.6Z" />
      <path d="M12 10.5v5m-2.5-2.5h5" />
    </>
  ),
  maintenance: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.8l1.6 2.3 2.8-.5.9 2.7 2.6 1.2-.6 2.8 1.6 2.3-2.1 1.9.3 2.8-2.8.6-1.4 2.5-2.6-1.1-2.6 1.1-1.4-2.5-2.8-.6.3-2.8-2.1-1.9 1.6-2.3-.6-2.8 2.6-1.2.9-2.7 2.8.5Z" />
    </>
  ),
  cube: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" fill="currentColor" stroke="none" />,
  pause: <path d="M8 5.5v13M16 5.5v13" strokeWidth={2.2} />,
  "sound-on": (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
      <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
    </>
  ),
  "sound-off": (
    <>
      <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4v-5Z" />
      <path d="m16 9.5 5 5m0-5-5 5" />
    </>
  ),
} as const;

const fillIcons = {
  star: (
    <path d="m12 3.2 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8L12 3.2Z" />
  ),
  facebook: (
    <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z" />
  ),
  instagram: (
    <path
      fillRule="evenodd"
      d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8H8Zm4 3.4a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 1.8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm4.6-2.9a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  ),
  youtube: (
    <path
      fillRule="evenodd"
      d="M21.6 7.2c.4 1.4.4 4.8.4 4.8s0 3.4-.4 4.8a2.5 2.5 0 0 1-1.8 1.8C18.2 19 12 19 12 19s-6.2 0-7.8-.4a2.5 2.5 0 0 1-1.8-1.8C2 15.4 2 12 2 12s0-3.4.4-4.8a2.5 2.5 0 0 1 1.8-1.8C5.8 5 12 5 12 5s6.2 0 7.8.4a2.5 2.5 0 0 1 1.8 1.8ZM10 15l5.2-3L10 9v6Z"
    />
  ),
  apple: (
    <path d="M16.4 12.6c0-2.4 2-3.6 2.1-3.6a4.5 4.5 0 0 0-3.5-1.9c-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8a4.7 4.7 0 0 0-4 2.4c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4a10 10 0 0 0 1.4-2.8 4.3 4.3 0 0 1-2.7-4Zm-2.4-7.2A4.3 4.3 0 0 0 15 2.2a4.4 4.4 0 0 0-2.9 1.5 4.1 4.1 0 0 0-1 3.1 3.7 3.7 0 0 0 2.9-1.4Z" />
  ),
  "google-play": (
    <path d="M4.2 2.6c-.3.2-.4.6-.4 1.1v16.6c0 .5.1.9.4 1.1l9.3-9.4-9.3-9.4Zm10.2 8.5 2.6-2.6L6.2 2.3l8.2 8.8Zm0 1.8-8.2 8.8 10.8-6.2-2.6-2.6Zm3.9-3.6-2.9 2.7 2.9 2.7 3.2-1.8c.9-.5.9-1.3 0-1.8l-3.2-1.8Z" />
  ),
} as const;

export type IconName = keyof typeof strokeIcons | keyof typeof fillIcons;

type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  /** Provide a label only when the icon is the sole content of a control. */
  label?: string;
};

export function Icon({ name, label, className, ...props }: IconProps) {
  const isFill = name in fillIcons;
  const glyph = isFill
    ? fillIcons[name as keyof typeof fillIcons]
    : strokeIcons[name as keyof typeof strokeIcons];
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
      className={cn("size-5 shrink-0", className)}
      {...props}
    >
      {glyph}
    </svg>
  );
}
