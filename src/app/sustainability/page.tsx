import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { ApproachScroll } from "@/components/sections/sustainability/ApproachScroll";
import { DevelopmentSlider } from "@/components/sections/sustainability/DevelopmentSlider";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/config/routes";
import {
  approach,
  developmentIntro,
  developmentQuote,
  developmentTiles,
  sustainabilityFilm,
  sustainabilityHero,
  sustainabilityOverview,
} from "@/content/sustainability";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Community & Sustainability",
  description:
    "How Somabay balances thoughtful development with protecting the Red Sea, its coastline and desert landscapes for generations to come.",
  path: routes.sustainability,
});

export default function SustainabilityPage() {
  const nature = approach.pillars.find((pillar) => pillar.title === "Natural Environment");

  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={sustainabilityHero.eyebrow}
        title={sustainabilityHero.title}
        media={sustainabilityHero.image}
      />

      <Section tone="white" spacing="compact" aria-labelledby="overview-title">
        <Container>
          <Eyebrow as="h2">
            <span id="overview-title">Overview</span>
          </Eyebrow>
          <ScrollRevealText
            text={sustainabilityOverview}
            leadWords={15}
            className="mt-6 max-w-4xl"
          />
        </Container>
      </Section>

      {nature ? (
        <ScrollExpandVideo
          id="nature-title"
          video={sustainabilityFilm}
          eyebrow={sustainabilityHero.eyebrow}
          title={nature.title}
          description={nature.description}
        />
      ) : null}

      <ApproachScroll title={approach.title} intro={approach.intro} pillars={approach.pillars} />

      <DevelopmentSlider
        eyebrow={developmentIntro.eyebrow}
        title={developmentIntro.title}
        description={developmentIntro.description}
        tiles={developmentTiles}
        quote={developmentQuote}
      />

      <ContactCta />
    </>
  );
}
