import {
  spaBooking,
  spaBrochure,
  spaPackages,
  spaTreatments,
  type ActivityDetail,
} from "@/content/things-to-do";
import { formDefinitions } from "@/lib/forms";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";
import { BookingPanel } from "./BookingPanel";
import { InfoRows } from "./InfoRows";
import { PackagesGrid } from "./PackagesGrid";

export function SpaSections({ activity }: { activity: ActivityDetail }) {
  return (
    <>
      <Section tone="white" aria-labelledby="treatments-title">
        <Container>
          <Eyebrow>Treatments overview</Eyebrow>
          <h2 id="treatments-title" className="sr-only">
            Treatments
          </h2>
          <ScrollRevealText
            text={activity.description}
            leadWords={12}
            className="mt-5 max-w-3xl font-sans text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.55]"
          />
          {/* The page's call to action, under the overview: glides down to the booking form. */}
          <Reveal className="mt-10">
            <Button href="#booking" variant="primary">
              Book treatment
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Treatments: their own section under the overview, as information rows. */}
      <InfoRows
        id="treatments-list-title"
        eyebrow="Treatments"
        title="Our Treatments"
        items={spaTreatments}
        aside={
          <Button
            href={spaBrochure.href}
            variant="outline"
            icon="download"
            className="border-turquoise text-turquoise"
            // Downloads only once a real PDF is linked (a "#" placeholder would save the page).
            download={spaBrochure.href.endsWith(".pdf") || undefined}
          >
            {spaBrochure.label}
          </Button>
        }
      />

      <Section tone="white" aria-labelledby="gallery-title" className="overflow-hidden">
        <Container>
          <HeadingRow id="gallery-title" eyebrow="Gallery" title="Discover Your Retreat" />
        </Container>
        <GalleryCarousel
          images={activity.gallery}
          label={`${activity.title} gallery`}
          className="mt-12"
        />
      </Section>

      {/* Packages on deep turquoise: white cards with a framed photo, the duration large and
          turquoise ticks, rising in one after another. No prices (confirmed at booking). */}
      <Section
        tone="abyss"
        aria-labelledby="packages-title"
        className="overflow-hidden bg-turquoise-160"
      >
        <Container>
          <HeadingRow
            id="packages-title"
            tone="light"
            title="Wellness Packages"
            description="Discover thoughtfully designed packages that bring together treatments and experiences for a deeper sense of renewal."
          />
        </Container>
        <PackagesGrid packages={spaPackages} />
      </Section>

      <BookingPanel
        eyebrow={spaBooking.eyebrow}
        title={spaBooking.title}
        description={spaBooking.description}
        image={spaBooking.image}
        contacts={spaBooking.contacts}
        definition={formDefinitions.spa}
        context={activity.title}
      />
    </>
  );
}
