import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { EventCard } from "@/components/cards/EventCard";
import { ArticleBody } from "@/components/sections/shared/ArticleBody";
import { DetailHeader } from "@/components/sections/shared/DetailHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { ArticleGallery } from "@/components/sections/shared/ArticleGallery";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { categoryLabel, events, getEvent } from "@/content/events";
import { formatLongRange } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = getEvent((await params).slug);
  if (!event) return {};
  return pageMetadata({
    title: event.title,
    description: event.description ?? `${event.title} at ${event.location}, Somabay.`,
    path: routes.event(event.slug),
    image: event.image,
  });
}

async function EventContent({ params }: { params: PageProps<"/events/[slug]">["params"] }) {
  const event = getEvent((await params).slug);
  if (!event) notFound();
  const path = routes.event(event.slug);
  const more = events.filter((other) => other.slug !== event.slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.start,
    endDate: event.end ?? event.start,
    location: { "@type": "Place", name: event.location, address: siteConfig.location.name },
    image: `${siteConfig.url}${event.image.src}`,
    description: event.description,
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <article aria-labelledby="page-title">
        <DetailHeader
          back={{ label: "Back to all events", href: routes.events }}
          title={event.title}
          path={path}
          image={event.image}
          meta={
            <>
              <Chip>{categoryLabel(event.category)}</Chip>
              <span className="flex items-center gap-2">
                <Icon name="pin" className="size-4" />
                {event.location}
              </span>
              <span className="flex items-center gap-2">
                <Icon name="calendar" className="size-4" />
                <time dateTime={event.start}>{formatLongRange(event.start, event.end)}</time>
              </span>
            </>
          }
        />
        <Container className="max-w-3xl pt-8 sm:pt-10 lg:pt-12">
          {event.body ? (
            <ArticleBody blocks={event.body} />
          ) : event.description ? (
            <p className="text-lead text-slate">{event.description}</p>
          ) : null}
        </Container>
        <ArticleGallery images={event.gallery} label={event.title} />
        <Container className="pb-section">
          <div className="mt-8 flex justify-end border-t border-line pt-6 sm:mt-12 sm:pt-8">
            <ShareButtons path={path} title={event.title} />
          </div>
        </Container>
      </article>
      <Section tone="white" className="bg-sand-100" aria-labelledby="more-events-title">
        <Container>
          <SectionHeading id="more-events-title" align="center" title="More Events" />
          <RevealGroup
            as="ul"
            // Phones: a centred swipe row with the cards either side peeking in; a grid from `sm`.
            className="mt-6 grid gap-x-6 gap-y-12 max-sm:swipe-row max-sm:pb-3 sm:mt-10 sm:grid-cols-2 md:mt-12 lg:grid-cols-3"
          >
            {more.map((other) => (
              <RevealItem as="li" key={other.slug}>
                <EventCard event={other} tinted />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 flex justify-center sm:mt-12">
            <Button href={routes.events} variant="outline">
              Explore all
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default function EventPage({ params }: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <EventContent params={params} />
    </Suspense>
  );
}
