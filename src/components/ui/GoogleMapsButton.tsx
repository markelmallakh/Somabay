import { cn } from "@/lib/utils";

type GoogleMapsButtonProps = {
  href: string;
  /** `dark` sits on deep sections (plain white pill); `light` on white cards (with a hairline). */
  tone?: "dark" | "light";
  className?: string;
};

/** A small white, fully rounded "Open in Google Maps" link with the Google Maps pin. */
export function GoogleMapsButton({ href, tone = "dark", className }: GoogleMapsButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full bg-white py-2 pr-4 pl-2.5 text-body-xs font-semibold text-ink transition-colors duration-500 hover:bg-sand-100",
        tone === "light" && "border border-line",
        className,
      )}
    >
      <GoogleMapsMark className="size-4.5" />
      Open in Google Maps
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** The Google Maps pin, in its four colours. */
function GoogleMapsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#1a73e8" d="M14.45 2.4A7.6 7.6 0 0 0 5.9 4.84l3.82 3.2 4.73-5.64Z" />
      <path
        fill="#ea4335"
        d="M5.9 4.84A7.55 7.55 0 0 0 4.4 9.6c0 1.4.42 2.7 1.08 4l4.24-5.03L5.9 4.84Z"
      />
      <path
        fill="#4285f4"
        d="M12 7.07a2.53 2.53 0 0 1 1.95 4.15l4.6-5.48A7.6 7.6 0 0 0 14.45 2.4L9.72 8.04A2.52 2.52 0 0 1 12 7.07Z"
      />
      <path
        fill="#fbbc04"
        d="M12 12.13a2.53 2.53 0 0 1-2.28-4.09L5.48 13.6c.66 1.34 1.6 2.6 2.53 3.84l5.94-7.06a2.52 2.52 0 0 1-1.95 1.75Z"
      />
      <path
        fill="#34a853"
        d="m13.95 11.22-5.94 7.06c1.17 1.53 2.42 3.07 3.18 4.66.12.25.5.25.62 0C14.9 17.93 19.6 13.6 19.6 9.6c0-1.43-.4-2.76-1.05-3.86l-4.6 5.48Z"
      />
    </svg>
  );
}
