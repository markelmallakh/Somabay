import { about } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { AboutJourney } from "./AboutJourney";
import { AboutStats } from "./AboutStats";

/**
 * Figma "About Intro" + "Stats". The story rises over the pinned hero and scrolls over the
 * shoreline film (see AboutJourney); the key figures follow inline on the dune band the film
 * fades into.
 */
export function AboutSection() {
  return (
    <div data-theme-surface="dark" className="relative z-10">
      <AboutJourney
        eyebrow={about.eyebrow}
        statement={about.statement}
        statementLead={about.statementLead}
        paragraphs={about.paragraphs}
        ambient={about.ambient}
      />
      <div className="relative -mt-px bg-dune">
        <Container className="pt-section pb-section">
          <AboutStats stats={about.stats} cta={about.cta} />
        </Container>
      </div>
    </div>
  );
}
