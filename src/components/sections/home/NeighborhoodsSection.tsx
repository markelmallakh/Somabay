import { routes } from "@/config/routes";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoods } from "@/content/neighborhoods";
import { Button } from "@/components/ui/Button";
import { NeighborhoodsCarousel } from "./NeighborhoodsCarousel";

/** Figma "Section / Neighborhoods — Option B" (401:19351). */
export function NeighborhoodsSection() {
  const hrefs = Object.fromEntries(
    neighborhoods.map((item) => [item.slug, routes.neighborhood(item.slug)]),
  );
  return (
    <section
      aria-labelledby="neighborhoods-title"
      data-theme-surface="light"
      className="relative overflow-hidden bg-sand-100 py-section text-ink"
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
            aside={
              <div>
                <Button href={neighborhoodsIntro.cta.href} variant="primary" icon="arrow-right">
                  {neighborhoodsIntro.cta.label}
                </Button>
              </div>
            }
          />
        }
      />
    </section>
  );
}
