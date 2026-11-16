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
      data-theme-surface="dark"
      // Deep turquoise ground: the photo cards glow against it. The text and line tokens are
      // re-pointed to white for everything inside, so the carousel needs no dark variant.
      className="relative overflow-hidden bg-turquoise-160 py-section text-white [--color-ink:#fff] [--color-line:rgb(255_255_255/0.22)] [--color-slate:rgb(255_255_255/0.72)]"
    >
      <NeighborhoodsCarousel
        neighborhoods={neighborhoods}
        hrefs={hrefs}
        tabLabels={neighborhoodsIntro.tabs}
        ctaLabel={neighborhoodsIntro.cardCta}
        heading={
          <HeadingRow
            id="neighborhoods-title"
            tone="light"
            eyebrow={neighborhoodsIntro.eyebrow}
            title={neighborhoodsIntro.title}
            description={neighborhoodsIntro.description}
            aside={
              <div>
                <Button
                  href={neighborhoodsIntro.cta.href}
                  variant="solid-light"
                  icon="arrow-right"
                  className="[--color-ink:#2c2c2c]"
                >
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
