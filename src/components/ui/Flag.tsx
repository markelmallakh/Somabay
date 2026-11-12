import { cn } from "@/lib/utils";

type FlagCode = "en" | "ar" | "de" | "es";

/** Simplified national flags, drawn in a 24×24 square and clipped to a circle. */
const flags: Record<FlagCode, React.ReactNode> = {
  // United Kingdom.
  en: (
    <>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#fff" strokeWidth="4.8" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="6.4" />
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="3.6" />
    </>
  ),
  // Egypt: red, white and black, with the golden Eagle of Saladin (simplified).
  ar: (
    <>
      <rect width="24" height="8" fill="#CE1126" />
      <rect y="8" width="24" height="8" fill="#fff" />
      <rect y="16" width="24" height="8" fill="#000" />
      <path
        d="M12 9.2c-.6 0-1 .5-1 1v.6l-1.6-.5.5 1.3-1 .3 1.4.9-.3 1.4h4l-.3-1.4 1.4-.9-1-.3.5-1.3-1.6.5v-.6c0-.5-.4-1-1-1Z"
        fill="#C09300"
      />
    </>
  ),
  // Germany.
  de: (
    <>
      <rect width="24" height="8" fill="#000" />
      <rect y="8" width="24" height="8" fill="#DD0000" />
      <rect y="16" width="24" height="8" fill="#FFCE00" />
    </>
  ),
  // Spain.
  es: (
    <>
      <rect width="24" height="24" fill="#AA151B" />
      <rect y="6" width="24" height="12" fill="#F1BF00" />
    </>
  ),
};

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-5 shrink-0 rounded-full ring-1 ring-black/10", className)}
    >
      <clipPath id={`flag-${code}`}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#flag-${code})`}>{flags[code]}</g>
    </svg>
  );
}

export type { FlagCode };
