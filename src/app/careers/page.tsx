import { JobsList } from "@/components/sections/careers/JobsList";
import { WhySomabay } from "@/components/sections/careers/WhySomabay";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import { careersHero } from "@/content/careers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Join Somabay and help shape a Red Sea destination people love to visit, live in and belong to.",
  path: routes.careers,
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        variant="centered"
        height="band"
        eyebrow={careersHero.eyebrow}
        title={careersHero.title}
        media={careersHero.image}
      />
      <WhySomabay />
      <JobsList />
      <ContactCta />
    </>
  );
}
