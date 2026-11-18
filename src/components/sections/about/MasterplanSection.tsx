import { masterplanIntro } from "@/content/about";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { masterplanHotspots } from "@/content/masterplan-hotspots";
import { Container } from "@/components/layout/Container";
import { MasterplanAerial } from "./MasterplanAerial";

/**
 * Figma About "Section / Masterplan" (491:10609) heading, over the interactive peninsula aerial, rounded and as wide as the content:
 * category tabs, clickable places that open a side drawer, and the 360 tour.
 */
export function MasterplanSection() {
  return (
    <section aria-labelledby="masterplan-title" className="bg-sand-100 py-section text-ink">
      <Container>
        <HeadingRow
          id="masterplan-title"
          eyebrow={masterplanIntro.eyebrow}
          title={masterplanIntro.title}
          description={masterplanIntro.description}
          className="mb-6 sm:mb-10"
        />
        <div className="sm:[container-type:inline-size]">
          <MasterplanAerial hotspots={masterplanHotspots} />
        </div>
      </Container>
    </section>
  );
}
