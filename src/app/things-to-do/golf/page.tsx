import {
  AcademySection,
  CoursesSection,
  GolfOverview,
  TeeBookingSection,
} from "@/components/sections/golf/GolfSections";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { EventsSection } from "@/components/sections/shared/EventsSection";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { golfEventItems, golfEventsIntro, golfHero } from "@/content/golf";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Golf at Somabay",
  description:
    "Championship golf by the Red Sea: the Gary Player course, a floodlit Par 3, a professional academy and tee times for every level.",
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
          <Button href="#tee-booking" variant="solid-light">
            Book tee time
          </Button>
        }
      />
      <GolfOverview />
      <CoursesSection />
      <AcademySection />
      <EventsSection id="golf-events" intro={golfEventsIntro} items={golfEventItems} />
      <TeeBookingSection />
      <ContactCta />
    </>
  );
}
