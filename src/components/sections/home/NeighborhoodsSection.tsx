import { routes } from "@/config/routes";
import { HeadingRow, PhoneEndCta } from "@/components/layout/HeadingRow";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoods } from "@/content/neighborhoods";
import { Button } from "@/components/ui/Button";
import { NeighborhoodsCarousel } from "./NeighborhoodsCarousel";

/** Figma "Section / Neighborhoods — Option B" (401:19351). */
export function NeighborhoodsSection() {
  const hrefs = Object.fromEntries(
    neighborhoods.map((item) => [item.slug, routes.neighborhood(item.slug)]),
  );
  const cta = (
    <Button href={neighborhoodsIntro.cta.href} variant="solid" icon="arrow-right">
      {neighborhoodsIntro.cta.label}
    </Button>
  );
  return (
    <section
      aria-labelledby="neighborhoods-title"
      // A clean white ground, so the photo cards carry the colour.
      className="relative overflow-hidden bg-white py-section text-ink"
    >
      <NeighborhoodsCarousel
        neighborhoods={neighborhoods}
        hrefs={hrefs}
        tabLabels={neighborhoodsIntro.tabs}
        ctaLabel={neighborhoodsIntro.cardCta}
        heading={
          <HeadingRow
            id="neighborhoods-title"
            eyebrow={neighborhoodsIntro.eyebrow}
            title={neighborhoodsIntro.title}
            description={neighborhoodsIntro.description}
            aside={<div>{cta}</div>}
          />
        }
      />
      <PhoneEndCta className="mt-6 px-gutter">{cta}</PhoneEndCta>
    </section>
  );
}
