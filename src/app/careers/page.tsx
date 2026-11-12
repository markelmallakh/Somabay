import { Container } from "@/components/layout/Container";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { JobsList } from "@/components/sections/careers/JobsList";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { careersHero, careersIntro } from "@/content/careers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Somabay and help shape a Red Sea destination people love to visit, live in and belong to.",
  path: routes.careers,
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        media={careersHero.image}
      />
      <Section tone="white" aria-labelledby="careers-intro">
        <Container>
          <HeadingRow
            id="careers-intro"
            title={careersIntro.title}
            description={careersIntro.description}
          />
          <ImageReveal className="relative mt-10 aspect-[4/3] rounded-card sm:aspect-[16/9] md:mt-14 lg:aspect-[1312/516] lg:rounded-media">
            <div className="absolute inset-0">
              <ResponsiveImage
                asset={careersIntro.image}
                sizes="(min-width: 1440px) 1300px, 100vw"
                fill
              />
            </div>
          </ImageReveal>
        </Container>
      </Section>
      <JobsList />
      <ContactCta />
    </>
  );
}
