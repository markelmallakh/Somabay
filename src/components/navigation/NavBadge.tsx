import { cn } from "@/lib/utils";

/** The small tag beside a menu link (e.g. "Rentals" on Stayr): sun yellow, tiny caps. */
export function NavBadge({ children, className }: { children: string; className?: string }) {
  return (
    <span
      className={cn(
        "ml-2 inline-flex shrink-0 items-center rounded-full bg-sun px-1.5 py-0.5 align-middle font-sans text-[0.5625rem] leading-none font-semibold tracking-[0.1em] text-ink uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
