import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { MasonryGallery } from "@/components/media/MasonryGallery";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { MarinaStoreList } from "@/components/sections/marina/MarinaStoreList";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { FaqBlock } from "@/components/sections/shared/FaqBlock";
import { HeroSequence } from "@/components/sections/shared/HeroSequence";
import { MoreToExperience } from "@/components/sections/shared/MoreToExperience";
import { SplitScrollList } from "@/components/sections/shared/SplitScrollList";
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
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "The Marina",
  description:
    "Somabay Marina: a waterfront destination for dining, shopping, everyday services and boat trips on the Red Sea.",
  path: routes.marina,
});

/** The hero film carries the opening steps; the boat step gets its own scroll film further down. */
const heroSteps = marinaSteps.slice(0, 2);
const boatStep = marinaSteps[2];

export default function MarinaPage() {
  return (
    <>
      <HeroSequence media={marinaFilm} steps={heroSteps} />
      <SplitScrollList id="retail-title" intro={retailIntro}>
        <MarinaStoreList items={marinaStores} />
      </SplitScrollList>
      {boatStep ? (
        <ScrollExpandVideo
          id="boats-title"
          video={marinaBoatFilm}
          eyebrow={boatStep.eyebrow}
          title={boatStep.title}
          description={boatStep.description}
        />
      ) : null}
      <Section tone="white" aria-labelledby="gallery-title" className="bg-sand-100">
        <Container>
          <HeadingRow id="gallery-title" eyebrow="Gallery" title="Scenes From The Bay" />
          <div className="mt-10 lg:mt-12">
            <MasonryGallery images={marinaGallery} />
          </div>
        </Container>
      </Section>
      <MoreToExperience intro={moreToExperienceIntro} items={moreFromMarina} />
      <FaqBlock items={faqs.filter((item) => item.category !== "buying")} />
      <ContactCta />
    </>
  );
}
