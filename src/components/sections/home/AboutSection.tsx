import { about } from "@/content/home";
import { AboutJourney } from "./AboutJourney";
import { AboutStats } from "./AboutStats";

/**
 * Figma "About Intro" + "Stats". The story rises over the pinned hero and scrolls over the
 * shoreline film (see AboutJourney); the key figures close it on the film's last frame.
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
        outro={<AboutStats stats={about.stats} cta={about.cta} />}
      />
    </div>
  );
}
