import { routes } from "@/config/routes";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoods } from "@/content/neighborhoods";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { NeighborhoodsCarousel } from "./NeighborhoodsCarousel";

export function NeighborhoodsSection() {
  const hrefs = Object.fromEntries(
    neighborhoods.map((item) => [item.slug, routes.neighborhood(item.slug)]),
  );
  return (
    <Section aria-labelledby="neighborhoods-title" className="overflow-hidden">
      <NeighborhoodsCarousel
        neighborhoods={neighborhoods}
        hrefs={hrefs}
        tabLabels={neighborhoodsIntro.tabs}
        heading={
          <SectionHeading
            id="neighborhoods-title"
            eyebrow={neighborhoodsIntro.eyebrow}
            title={neighborhoodsIntro.title}
            description={neighborhoodsIntro.description}
          />
        }
      />
      <Reveal className="mt-14 flex justify-center px-gutter">
        <Button href={neighborhoodsIntro.cta.href} variant="outline">
          {neighborhoodsIntro.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
