import { EducationSection } from "@/components/sections/facilities/EducationSection";
import { HealthcareSection } from "@/components/sections/facilities/HealthcareSection";
import { MaintenanceSection } from "@/components/sections/facilities/MaintenanceSection";
import { MobilityStory } from "@/components/sections/facilities/MobilityStory";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { SectionNav } from "@/components/navigation/SectionNav";
import { routes } from "@/config/routes";
import { facilitiesHero, facilitiesSections } from "@/content/facilities-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Facilities & Services",
  description:
    "Mobility, healthcare, schools and home maintenance — the everyday services that make life in Somabay easy.",
  path: routes.facilities,
});

export default function FacilitiesPage() {
  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={facilitiesHero.eyebrow}
        title={facilitiesHero.title}
        media={facilitiesHero.image}
      />
      <MobilityStory />
      <HealthcareSection />
      <EducationSection />
      <MaintenanceSection />
      <ContactCta />
      <SectionNav items={facilitiesSections} label="Facilities sections" />
    </>
  );
}
