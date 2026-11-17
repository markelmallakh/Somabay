import { mobilityIntro, mobilityOptions } from "@/content/facilities-page";
import { ApproachScroll } from "@/components/sections/sustainability/ApproachScroll";

/**
 * Mobility, told like the Sustainability approach: the line centred and held while the four ways
 * to get around pass by, each one's name and line changing in the centre as its photo crosses the
 * middle of the screen, the photos alternating right and left.
 */
export function MobilityStory() {
  return (
    <ApproachScroll
      id="mobility"
      headingId="mobility-title"
      title={mobilityIntro.eyebrow ?? "Mobility"}
      heading={mobilityIntro.title}
      intro={`${mobilityIntro.title}. ${mobilityIntro.description}`}
      pillars={mobilityOptions}
      className="bg-white"
    />
  );
}
