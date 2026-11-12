import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Time between one letter and the next, so the roll runs across the word in a quick wave. */
const STAGGER_MS = 10;

/**
 * Masked letter roll for menu labels: every letter sits in its own clipped slot; when the link or
 * button around it (the nearest `group`) is hovered or focused, each letter slides up out of the
 * mask while its copy rolls in from below, one letter just after the other. Screen readers get
 * the plain label once.
 */
export function MaskRoll({ children, className }: { children: string; className?: string }) {
  const letters = Array.from(children);
  return (
    <span className={cn("relative block", className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="flex overflow-hidden">
        {letters.map((letter, index) => (
          <span
            key={index}
            style={{ "--roll-delay": `${index * STAGGER_MS}ms` } as CSSProperties}
            className="relative block transition-transform delay-(--roll-delay) duration-350 ease-out-expo group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none"
          >
            {letter === " " ? " " : letter}
            <span className="absolute top-full left-0">{letter === " " ? " " : letter}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
