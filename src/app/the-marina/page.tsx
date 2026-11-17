import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { BookingDrawerButton } from "@/components/forms/BookingDrawerButton";
import { MarinaIntro } from "@/components/sections/marina/MarinaIntro";
import { MarinaStoreList } from "@/components/sections/marina/MarinaStoreList";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { HeroSequence } from "@/components/sections/shared/HeroSequence";
import { MoreToExperience } from "@/components/sections/shared/MoreToExperience";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";
import { routes } from "@/config/routes";
import { faqs } from "@/content/faqs";
import {
  marinaBoatFilm,
  marinaFilm,
  marinaGallery,
  marinaSteps,
  marinaStores,
  retailIntro,
} from "@/content/marina";
import { moreFromMarina, moreToExperienceIntro } from "@/content/things-to-do";
import { formDefinitions } from "@/lib/forms";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The Marina",
  description:
    "Somabay Marina: a waterfront destination for dining, shopping, everyday services and boat trips on the Red Sea.",
  path: routes.marina,
});

/** The hero film carries the opening step; the introduction follows it, centred, and the boat
 * step gets its own scroll film further down. */
const heroSteps = marinaSteps.slice(0, 1);
/** "Everything you need, by Somabay": the introduction under the hero. */
const introStep = marinaSteps[1];
const boatStep = marinaSteps[2];

export default function MarinaPage() {
  return (
    <>
      <HeroSequence media={marinaFilm} steps={heroSteps} />
      {introStep ? (
        // The introduction under the hero: a tall section where the title rises in, then the
        // statement fills in word by word as the text drifts up inside the held screen.
        <MarinaIntro title={introStep.title} description={introStep.description ?? ""} />
      ) : null}
      {/* Retail & shops: the heading centred above a grid of shop cards, three to a row. */}
      <Section tone="white" aria-labelledby="retail-title" className="bg-sand-100">
        <Container>
          <SectionHeading
            id="retail-title"
            align="center"
            eyebrow={retailIntro.eyebrow}
            title={retailIntro.title}
            description={retailIntro.description}
          />
          <div className="mt-8 sm:mt-12 lg:mt-14">
            <MarinaStoreList items={marinaStores} />
          </div>
        </Container>
      </Section>
      {boatStep ? (
        <ScrollExpandVideo
          id="boats-title"
          video={marinaBoatFilm}
          eyebrow={boatStep.eyebrow}
          title={boatStep.title}
          description={boatStep.description}
          action={
            // Opens the boat trip booking form (the watersports form, no activity choice) in a drawer.
            <BookingDrawerButton
              label="Book a boat trip"
              eyebrow="Booking"
              title="Plan Your Time on the Water"
              description="Tell us what you need and we will confirm."
              definition={formDefinitions.boatTrip}
              context="The Marina: boat trip"
            />
          }
        />
      ) : null}
      {/* The site's standard gallery: the heading, then the photo carousel with its arrows. */}
      <Section tone="white" aria-labelledby="gallery-title" className="overflow-hidden">
        <Container>
          <HeadingRow id="gallery-title" eyebrow="Gallery" title="Scenes From The Bay" />
        </Container>
        <GalleryCarousel
          images={marinaGallery}
          label="The Marina gallery"
          className="mt-6 sm:mt-12"
        />
      </Section>
      <MoreToExperience intro={moreToExperienceIntro} items={moreFromMarina} />
      <FaqBlock items={faqs.filter((item) => item.category !== "buying")} />
      <ContactCta />
    </>
  );
}
