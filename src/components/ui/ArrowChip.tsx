import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

const tones = {
  /** On imagery: white outline that fills turquoise. */
  dark: "border-white/35 text-white group-hover:border-turquoise group-focus-visible:border-turquoise",
  /** On a white row that floods turquoise: ink outline that turns into a white disc. */
  light:
    "border-ink/20 text-ink [--wave:#fff] group-hover:border-white group-hover:text-turquoise group-focus-visible:border-white group-focus-visible:text-turquoise",
} as const;

/**
 * Round ↗ chip for list rows. Place it inside a `group` link: on hover the arrow turns to point
 * right while the chip changes colour for its tone.
 */
export function ArrowChip({
  tone = "dark",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "wave wave-group grid size-9 shrink-0 place-items-center rounded-md border transition-colors duration-700 ease-out-expo",
        tones[tone],
        className,
      )}
    >
      <Icon
        name="arrow-chip"
        strokeWidth={1.4}
        className="size-5.5 transition-transform duration-700 ease-out-expo group-hover:rotate-45 group-focus-visible:rotate-45"
      />
    </span>
  );
}
