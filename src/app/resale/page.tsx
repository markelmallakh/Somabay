import { Container } from "@/components/layout/Container";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { UnitsFinder } from "@/components/sections/live/UnitsFinder";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { resale } from "@/content/home";
import { resaleHero, unitNeighborhoods, units } from "@/content/resale";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resale Homes",
  description:
    "Explore available homes across Somabay’s neighborhoods — villas, chalets, town houses and apartments by the Red Sea.",
  path: routes.resale,
});

export default function ResalePage() {
  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={resaleHero.eyebrow}
        title={resaleHero.title}
        media={resaleHero.image}
      />
      <section aria-labelledby="units-title" className="bg-sand-100 py-section text-ink">
        <Container>
          <HeadingRow
            id="units-title"
            eyebrow="Find your home"
            title="Explore Available Units"
            description={resale.description}
          />
          <div className="mt-10 lg:mt-14">
            <UnitsFinder
              units={units}
              hrefs={Object.fromEntries(units.map((unit) => [unit.slug, routes.unit(unit.slug)]))}
              neighborhoods={unitNeighborhoods}
            />
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
