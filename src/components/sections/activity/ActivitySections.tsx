import type { ActivityDetail } from "@/content/things-to-do";
import type { ActivitySections as Sections } from "@/content/activity-sections";
import { routes } from "@/config/routes";
import { formDefinitions } from "@/lib/forms";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { GalleryCarousel } from "@/components/media/GalleryCarousel";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";
import { BookingPanel } from "./BookingPanel";
import { InfoRows } from "./InfoRows";
import { VenueSlider } from "./VenueSlider";

/**
 * The body of a Things To Do activity page, following the Spa & Thalasso page: the overview with
 * the call to action (gliding to the booking form where the page has one), then whichever of
 * info rows, the venue slider, a film, the gallery and the booking form the page has content for.
 */
export function ActivitySections({
  activity,
  sections,
}: {
  activity: ActivityDetail;
  sections: Sections;
}) {
  const { cta, rows, venues, film, booking } = sections;

  return (
    <>
      <Section tone="white" aria-label={`${activity.title} overview`}>
        <Container>
          <Eyebrow>Overview</Eyebrow>
          <ScrollRevealText
            text={activity.summary}
            className="mt-5 max-w-3xl font-sans text-[clamp(1.125rem,1rem+0.45vw,1.375rem)] leading-[1.55]"
          />
          {/* The page's call to action sits under the overview (the hero carries only the title). */}
          <Reveal className="mt-10">
            <Button href={cta?.href ?? routes.contact} variant="primary">
              {cta?.label ?? "Let’s talk"}
            </Button>
          </Reveal>
        </Container>
      </Section>

      {rows ? (
        <InfoRows id="rows-title" eyebrow={rows.eyebrow} title={rows.title} items={rows.items} />
      ) : null}

      {venues ? (
        <VenueSlider
          id="venues-title"
          eyebrow={venues.eyebrow}
          title={venues.title}
          description={venues.description}
          items={venues.items}
        />
      ) : null}

      {film ? (
        <ScrollExpandVideo
          id="film-title"
          video={film.video}
          eyebrow={film.eyebrow}
          title={film.title}
          description={film.description}
          action={
            film.cta ? (
              <Button href={film.cta.href} variant="primary">
                {film.cta.label}
              </Button>
            ) : undefined
          }
        />
      ) : null}

      <Section tone="white" aria-labelledby="gallery-title" className="overflow-hidden">
        <Container>
          <HeadingRow
            id="gallery-title"
            eyebrow="Gallery"
            title={`${activity.title} in Pictures`}
          />
        </Container>
        <GalleryCarousel
          images={activity.gallery}
          label={`${activity.title} gallery`}
          className="mt-12"
        />
      </Section>

      {booking ? (
        <BookingPanel
          eyebrow={booking.eyebrow}
          title={booking.title}
          description={booking.description}
          image={booking.image}
          contacts={booking.contacts}
          definition={formDefinitions[booking.formId]}
          context={activity.title}
        />
      ) : null}
    </>
  );
}
