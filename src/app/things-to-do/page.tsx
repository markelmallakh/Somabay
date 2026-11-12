import { ContactCta } from "@/components/sections/shared/ContactCta";
import { MoreToExperience } from "@/components/sections/shared/MoreToExperience";
import { ExperienceGrid } from "@/components/sections/things-to-do/ExperienceGrid";
import { GolfTeaser } from "@/components/sections/things-to-do/GolfTeaser";
import { SportsRow } from "@/components/sections/things-to-do/SportsRow";
import { ThingsToDoHero } from "@/components/sections/things-to-do/ThingsToDoHero";
import { routes } from "@/config/routes";
import { moreFromThingsToDo, moreToExperienceIntro, thingsToDoHero } from "@/content/things-to-do";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Things To Do",
  description:
    "Golf by the Red Sea, diving and kitesurfing, spa and thalasso, sports, beaches and family fun — everything to do in Somabay.",
  path: routes.thingsToDo,
});

export default function ThingsToDoPage() {
  return (
    <>
      <ThingsToDoHero
        eyebrow={thingsToDoHero.eyebrow}
        lines={["Things To Do", "in Somabay"]}
        image={thingsToDoHero.image}
        scatter={thingsToDoHero.scatter}
        overview={thingsToDoHero.overview}
      />
      <ExperienceGrid />
      <GolfTeaser />
      <SportsRow />
      <MoreToExperience intro={moreToExperienceIntro} items={moreFromThingsToDo} />
      <ContactCta />
    </>
  );
}
