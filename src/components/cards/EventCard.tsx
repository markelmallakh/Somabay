import Link from "next/link";
import { routes } from "@/config/routes";
import { categoryLabel } from "@/lib/event-categories";
import { formatDayRange, formatMonthYear } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { EventItem } from "@/types/content";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

export function DateBadge({ event, className }: { event: EventItem; className?: string }) {
  return (
    <span
      className={cn(
        "flex min-w-22 flex-col items-center rounded-md bg-white/95 px-4 py-3 text-ink shadow-[0_8px_24px_rgb(18_58_70/0.14)] backdrop-blur-sm",
        className,
      )}
    >
      <span className="font-serif text-heading-6 leading-none whitespace-nowrap">
        {formatDayRange(event.start, event.end)}
      </span>
      <span className="mt-1.5 text-body-sm text-slate">{formatMonthYear(event.start)}</span>
    </span>
  );
}

function ViewEvent() {
  return (
    <p
      aria-hidden
      className="mt-auto inline-flex items-center gap-2 pt-2 text-body-xs font-semibold tracking-label uppercase"
    >
      <span className="link-underline pb-0.5 group-hover:[background-size:100%_1px]">
        Explore event
      </span>
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
      />
    </p>
  );
}

/** Featured event: a turquoise-5 panel with the photo on one side and the details on the other. */
function FeaturedEventCard({ event }: { event: EventItem }) {
  return (
    <article className="group relative grid overflow-hidden rounded-md bg-turquoise-5 md:grid-cols-2">
      <ImageReveal className="relative aspect-[3/2] md:aspect-auto md:min-h-[26rem]">
        <div className="absolute inset-0">
          <ResponsiveImage asset={event.image} sizes="(min-width: 768px) 50vw, 100vw" fill />
        </div>
      </ImageReveal>
      <DateBadge event={event} className="absolute top-4 left-4" />
      <div className="flex flex-col gap-4 p-6 sm:p-8 lg:p-14">
        <Chip tone="plain">{categoryLabel(event.category)}</Chip>
        <h3 className="font-serif text-heading-2">
          <Link
            href={routes.event(event.slug)}
            className="after:absolute after:inset-0 hover:text-lagoon"
          >
            {event.title}
          </Link>
        </h3>
        <p className="flex items-center gap-2 text-body-sm text-slate">
          <Icon name="pin" className="size-4" />
          {event.location}
        </p>
        {event.description ? (
          <p className="line-clamp-4 max-w-lg text-slate">{event.description}</p>
        ) : null}
        <ViewEvent />
      </div>
    </article>
  );
}

type EventCardProps = {
  event: EventItem;
  featured?: boolean;
  /** On a tinted (sand/turquoise) section the category chip turns white. */
  tinted?: boolean;
};

export function EventCard({ event, featured = false, tinted = false }: EventCardProps) {
  if (featured) return <FeaturedEventCard event={event} />;
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[416/277] overflow-hidden rounded-md bg-sand-200">
        <ResponsiveImage
          asset={event.image}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          fill
          className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
        />
        <DateBadge event={event} className="absolute top-3 right-3" />
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-5">
        <Chip tone={tinted ? "plain" : "soft"}>{categoryLabel(event.category)}</Chip>
        <h3 className="font-serif text-heading-6">
          <Link
            href={routes.event(event.slug)}
            className="after:absolute after:inset-0 hover:text-lagoon"
          >
            {event.title}
          </Link>
        </h3>
        <p className="flex items-center gap-2 text-body-sm text-slate">
          <Icon name="pin" className="size-4" />
          {event.location}
        </p>
        {event.description ? <p className="line-clamp-2 text-slate">{event.description}</p> : null}
        <ViewEvent />
      </div>
    </article>
  );
}
