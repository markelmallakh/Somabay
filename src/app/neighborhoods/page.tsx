import { Container } from "@/components/layout/Container";
import { NeighborhoodGrid } from "@/components/sections/live/NeighborhoodGrid";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoodsHero } from "@/content/live";
import { neighborhoods } from "@/content/neighborhoods";
import { neighborhoodPlaces } from "@/content/places";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Somabay Neighborhoods",
  description:
    "Beachfront residences, garden communities, golf-side retreats and elevated views — explore Somabay’s neighborhoods.",
  path: routes.neighborhoods,
});

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        variant="centered"
        height="screen"
        eyebrow={neighborhoodsHero.eyebrow}
        title={neighborhoodsHero.title}
        media={neighborhoodsHero.image}
      />

      <section aria-labelledby="explore-title" className="bg-sand-100 py-section text-ink">
        <Container>
          <NeighborhoodGrid
            places={neighborhoodPlaces}
            titleId="explore-title"
            title="Explore the Neighborhoods"
            description={neighborhoodsIntro.description}
            neighborhoods={neighborhoods}
            hrefs={Object.fromEntries(
              neighborhoods.map((item) => [item.slug, routes.neighborhood(item.slug)]),
            )}
          />
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
