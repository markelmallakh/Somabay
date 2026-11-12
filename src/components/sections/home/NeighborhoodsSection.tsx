import { routes } from "@/config/routes";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { neighborhoodsIntro } from "@/content/home";
import { neighborhoods } from "@/content/neighborhoods";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
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
      className="relative overflow-hidden bg-gray-50 py-section text-ink"
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
              <SmartLink
                href={neighborhoodsIntro.cta.href}
                className="group inline-flex w-fit items-center gap-1 text-body-xs font-semibold"
              >
                {neighborhoodsIntro.cta.label}
                <Icon
                  name="arrow-right"
                  className="size-3.5 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
                />
              </SmartLink>
            }
          />
        }
      />
    </section>
  );
}
