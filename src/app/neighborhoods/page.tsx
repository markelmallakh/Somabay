import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { ScrollExpandVideo } from "@/components/media/ScrollExpandVideo";
import { ResaleSection } from "@/components/sections/home/ResaleSection";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { NeighborhoodGrid } from "@/components/sections/live/NeighborhoodGrid";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoodsHero, neighborhoodsStory } from "@/content/live";
import { getNeighborhood, neighborhoods } from "@/content/neighborhoods";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Somabay Neighborhoods",
  description:
    "Beachfront residences, garden communities, golf-side retreats and elevated views — explore Somabay’s neighborhoods.",
  path: routes.neighborhoods,
});

/** Small rounded photos that float around the story statement on larger screens. */
const floating = [
  "right-[5%] top-[12%] w-24 rotate-3 lg:w-32",
  "right-[12%] bottom-[10%] w-28 -rotate-2 lg:w-36",
  "left-[4%] bottom-[12%] w-24 rotate-2 lg:w-32",
  "left-[10%] top-[10%] w-20 -rotate-3 lg:w-28",
];

const featured = getNeighborhood("wadi-jebal-extension");

export default function NeighborhoodsPage() {
  const film = featured?.heroMedia?.type === "video" ? featured.heroMedia : null;

  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={neighborhoodsHero.eyebrow}
        title={neighborhoodsHero.title}
        media={neighborhoodsHero.image}
      />

      <Section tone="white" aria-labelledby="story-title" className="overflow-hidden">
        {neighborhoodsStory.floating.map((photo, index) => (
          <Reveal
            key={photo.src}
            delay={index * 0.12}
            className={cn(
              "absolute hidden aspect-[4/5] overflow-hidden rounded-thumb shadow-[0_12px_40px_rgb(18_58_70/0.12)] lg:block",
              floating[index],
            )}
          >
            <ResponsiveImage asset={photo} alt="" sizes="9rem" fill />
          </Reveal>
        ))}
        <Container className="relative text-center">
          <Reveal>
            <h2 id="story-title" className="text-heading-5">
              {neighborhoodsStory.title}
            </h2>
          </Reveal>
          <ScrollRevealText
            text={neighborhoodsStory.statement}
            leadWords={18}
            className="mx-auto mt-8 max-w-3xl"
          />
        </Container>
      </Section>

      <section aria-labelledby="explore-title" className="bg-sand-100 py-section text-ink">
        <Container>
          <HeadingRow
            id="explore-title"
            title="Explore the Neighborhoods"
            description={neighborhoodsIntro.description}
          />
          <NeighborhoodGrid
            neighborhoods={neighborhoods}
            hrefs={Object.fromEntries(
              neighborhoods.map((item) => [item.slug, routes.neighborhood(item.slug)]),
            )}
          />
        </Container>
      </section>

      {featured && film ? (
        <ScrollExpandVideo
          id="featured-neighborhood-title"
          video={film}
          eyebrow={featured.tagline}
          title={featured.name}
          action={
            <Button href={routes.neighborhood(featured.slug)} variant="light" icon="arrow-up-right">
              {neighborhoodsIntro.cardCta}
            </Button>
          }
        />
      ) : null}

      <ResaleSection />
      <ContactCta />
    </>
  );
}
