import { cn } from "@/lib/utils";

type PriceFromProps = {
  /** The amount, e.g. "$240". */
  amount: string;
  /**
   * `inline`: label over the price, for cards and drawers; `compact`: a touch smaller, to sit
   * beside a small button; `stacked`: large, for the booking panel; `line`: everything on one
   * line, for slim bars.
   */
  size?: "inline" | "compact" | "stacked" | "line";
  /** `light` on white/sand, `dark` over photos. */
  tone?: "light" | "dark";
  className?: string;
};

/** "Starting from" over "$120 / night": the nightly price for hotels and rooms. */
export function PriceFrom({ amount, size = "inline", tone = "light", className }: PriceFromProps) {
  const muted = tone === "dark" ? "text-white/70" : "text-slate";
  const strong = tone === "dark" ? "text-white" : "text-ink";

  if (size === "line") {
    return (
      <p className={cn("flex items-baseline gap-1.5 whitespace-nowrap", className)}>
        <span className={cn("text-body-2xs font-semibold tracking-[0.12em] uppercase", muted)}>
          From
        </span>
        <span className={cn("font-serif text-body-md leading-none tabular-nums", strong)}>
          {amount}
        </span>
        <span className={cn("text-body-2xs", muted)}>/ night</span>
      </p>
    );
  }

  if (size === "stacked") {
    return (
      <p className={cn("flex flex-col gap-1", className)}>
        <span className={cn("text-label font-semibold tracking-[0.14em] uppercase", muted)}>
          Starting from
        </span>
        <span className="flex items-baseline gap-2">
          <span className={cn("font-serif text-[2.75rem] leading-none tabular-nums", strong)}>
            {amount}
          </span>
          <span className={cn("text-body-sm", muted)}>/ night</span>
        </span>
      </p>
    );
  }

  return (
    <p className={cn("flex flex-col gap-0.5", className)}>
      <span className={cn("text-body-2xs font-semibold tracking-[0.14em] uppercase", muted)}>
        Starting from
      </span>
      <span className="flex items-baseline gap-1.5">
        <span
          className={cn(
            "font-serif leading-none tabular-nums",
            size === "compact" ? "text-[1.0625rem]" : "text-heading-6",
            strong,
          )}
        >
          {amount}
        </span>
        <span className={cn("text-body-xs", muted)}>/ night</span>
      </span>
    </p>
  );
}
