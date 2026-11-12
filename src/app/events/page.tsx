import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { EventsExplorer } from "@/components/sections/events/EventsExplorer";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { eventCategories, events } from "@/content/events";
import { pageMetadata } from "@/lib/metadata";
import { getToday } from "@/lib/today";

export const metadata = pageMetadata({
  title: "Somabay Events",
  description:
    "From world-class sporting events to unforgettable celebrations, discover what’s happening across the bay.",
  path: routes.events,
});

export default async function EventsPage() {
  const today = await getToday();
  const sorted = [...events].sort((a, b) => a.start.localeCompare(b.start));
  const upcoming =
    sorted.find((event) => (event.end ?? event.start) >= today) ?? sorted[sorted.length - 1];
  const ordered = [
    ...sorted.filter((event) => (event.end ?? event.start) >= today),
    ...sorted.filter((event) => (event.end ?? event.start) < today).reverse(),
  ];

  return (
    <>
      <PageHero
        variant="title"
        eyebrow="What’s Up Soma"
        title="Somabay Events"
        description="From world-class sporting events to unforgettable celebrations, discover what’s happening across the bay."
      />
      <Section spacing="none" className="pb-section" aria-label="Events">
        <Container>
          <EventsExplorer
            events={ordered}
            hrefs={Object.fromEntries(
              events.map((event) => [event.slug, routes.event(event.slug)]),
            )}
            categories={eventCategories}
            initialMonth={upcoming.start.slice(0, 7)}
            today={today}
          />
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
