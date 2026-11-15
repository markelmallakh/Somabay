import {
  AcademyLocationSection,
  AcademySection,
  CoursesSection,
  GolfLeisureSection,
  GolfOverview,
  TeeBookingSection,
} from "@/components/sections/golf/GolfSections";
import { NeighborhoodSectionNav } from "@/components/sections/live/NeighborhoodSectionNav";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { EventsSection } from "@/components/sections/shared/EventsSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import {
  golfBookingUrl,
  golfEventItems,
  golfEventsIntro,
  golfHero,
  golfSectionNav,
} from "@/content/golf";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Golf at Somabay",
  description:
    "Championship golf by the Red Sea: the Gary Player course, a floodlit Par 3, Hidden Coves, a professional academy and tee times for every level.",
  path: routes.activity("golf"),
  image: golfHero.image,
});

export default function GolfPage() {
  return (
    <>
      <PageHero
        variant="split"
        eyebrow={golfHero.eyebrow}
        title={golfHero.title}
        description={golfHero.description}
        media={golfHero.image}
        actions={
          <Button href={golfBookingUrl} external variant="solid-light" icon="arrow-up-right">
            Book tee time
          </Button>
        }
      />
      <GolfOverview />
      <CoursesSection />
      <GolfLeisureSection />
      <AcademySection />
      <AcademyLocationSection />
      <EventsSection id="golf-events" intro={golfEventsIntro} items={golfEventItems} thumbnails />
      <TeeBookingSection />
      <ContactCta />
      <NeighborhoodSectionNav
        name="Somabay Golf"
        logo="/images/golf/somabay-golf-logo.svg"
        logoClassName="h-8"
        items={golfSectionNav}
        cta={{ label: "Book tee time", href: golfBookingUrl, external: true }}
        hideAt="[data-site-footer]"
      />
    </>
  );
}
