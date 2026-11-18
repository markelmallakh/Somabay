import { AboutFilmSection } from "@/components/sections/about/AboutFilmSection";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { LeadershipSection } from "@/components/sections/about/LeadershipSection";
import { AwardsSection } from "@/components/sections/about/AwardsSection";
import { MasterplanSection } from "@/components/sections/about/MasterplanSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { TimelineSection } from "@/components/sections/about/TimelineSection";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { routes } from "@/config/routes";
import { milestones, timelineImage, timelineIntro } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Somabay",
  description:
    "The story of Somabay: a Red Sea peninsula shaped by nature into a complete coastal community of homes, hospitality, golf, wellness and adventure.",
  path: routes.about,
});

/** Figma "UI - Design" About frame (488:10543). */
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StorySection />
      <AboutFilmSection />
      <TimelineSection intro={timelineIntro} milestones={milestones} image={timelineImage} />
      <MasterplanSection />
      <AwardsSection />
      <LeadershipSection />
      <ContactCta />
    </>
  );
}
