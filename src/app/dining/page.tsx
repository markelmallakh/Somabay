import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DiningFinder } from "@/components/sections/dining/DiningFinder";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { MoreToExperience } from "@/components/sections/shared/MoreToExperience";
import { PageHero } from "@/components/sections/shared/PageHero";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";
import { routes } from "@/config/routes";
import { diningCategories, diningHero, venues } from "@/content/dining";
import { moreFromDining, moreToExperienceIntro } from "@/content/things-to-do";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Dining Experience",
  description:
    "Restaurants, cafes and bars across Somabay — from casual bites to memorable evenings by the Red Sea.",
  path: routes.dining,
});

export default function DiningPage() {
  return (
    <>
      <PageHero
        variant="centered"
        eyebrow={diningHero.eyebrow}
        title={diningHero.title}
        description={diningHero.description}
        media={diningHero.image}
        height="band"
      />
      <Section tone="white" aria-labelledby="venues-title" className="bg-sand-100">
        <Container>
          <HeadingRow
            id="venues-title"
            eyebrow="Your table awaits"
            title="Flavours by the Red Sea"
          />
          <div className="mt-6 sm:mt-10 lg:mt-12">
            <DiningFinder venues={venues} categories={diningCategories} />
          </div>
        </Container>
      </Section>
      <MoreToExperience intro={moreToExperienceIntro} items={moreFromDining} />
      <ContactCta />
    </>
  );
}
