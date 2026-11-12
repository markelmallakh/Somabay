import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/types/media";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "./Icon";

type CardActionBarProps = {
  label: ReactNode;
  /** `dark` over photos (white text), `light` on white cards (ink text). */
  tone?: "dark" | "light";
  className?: string;
};

/**
 * The site's card hover: a footer bar under a hairline that floods turquoise from the bottom when
 * its `group` card is hovered or focused, while the arrow turns to point right. Sits flush with the
 * card's bottom and sides, so put it last in a card with `overflow-hidden`.
 */
export function CardActionBar({ label, tone = "dark", className }: CardActionBarProps) {
  return (
    <span
      className={cn(
        "relative isolate flex items-center justify-between overflow-hidden border-t px-6 pt-4 pb-6 text-body-sm font-semibold transition-colors duration-500",
        tone === "dark"
          ? "border-white/30 text-white"
          : "border-ink/10 text-ink group-hover:text-white group-focus-visible:text-white",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-turquoise transition-transform duration-700 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      {label}
      <Icon
        name="arrow-up-right"
        className="size-4.5 transition-transform duration-700 ease-out-expo group-hover:rotate-45 group-focus-visible:rotate-45"
      />
    </span>
  );
}

type PhotoCardProps = {
  href: string;
  image: ImageAsset;
  sizes: string;
  title: ReactNode;
  /** Small label in a frosted tag at the top left. */
  tag?: ReactNode;
  /** Short line above the title. */
  kicker?: ReactNode;
  summary?: ReactNode;
  /** Footer bar label ("Discover"). */
  action: ReactNode;
  /** Sizing, usually an aspect ratio. */
  className?: string;
  draggable?: boolean;
  tabIndex?: number;
  priority?: boolean;
};

/**
 * Photo card (the homepage neighborhood widget): 12px corners, copy over a deep bottom shade, the
 * photo easing in on hover and the turquoise action bar flooding up from the bottom.
 */
export function PhotoCard({
  href,
  image,
  sizes,
  title,
  tag,
  kicker,
  summary,
  action,
  className,
  draggable,
  tabIndex,
  priority,
}: PhotoCardProps) {
  return (
    <Link
      href={href}
      draggable={draggable}
      tabIndex={tabIndex}
      className={cn(
        "group relative isolate flex flex-col justify-between overflow-hidden rounded-xl text-white",
        className,
      )}
    >
      <ResponsiveImage
        asset={image}
        sizes={sizes}
        fill
        priority={priority}
        className="-z-10 transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.06]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.35)_0%,rgb(0_0_0/0)_20%,rgb(0_0_0/0.15)_45%,rgb(0_0_0/0.65)_68%,rgb(0_0_0/0.9)_100%)]"
      />
      <span className="flex items-start p-6 pb-0">
        {tag ? (
          <span className="eyebrow rounded-sm bg-black/30 px-2 py-0.5 backdrop-blur-lg">{tag}</span>
        ) : null}
      </span>
      <span className="flex flex-col gap-4">
        <span className="flex flex-col gap-4 px-6">
          <span className="flex flex-col gap-2">
            {kicker ? <span className="text-body-sm text-white/80">{kicker}</span> : null}
            <span className="font-serif text-heading-5">{title}</span>
          </span>
          {summary ? <span className="text-body-sm text-white/80">{summary}</span> : null}
        </span>
        <CardActionBar label={action} />
      </span>
    </Link>
  );
}
