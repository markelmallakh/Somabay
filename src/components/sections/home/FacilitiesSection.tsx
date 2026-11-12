import { facilitiesIntro } from "@/content/home";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { FacilitiesCollage, type Facility } from "./FacilitiesCollage";
import { image } from "@/lib/media";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

const school = image(
  "/images/facilities/facility-school.webp",
  "A modern school building framed by cacti",
);
const lounge = image(
  "/images/facilities/facility-lounge.webp",
  "A guest relaxing on a shaded terrace",
);

/** Figma "Section / Facilities & Services — Collage" (416:17854). */
const lead: Facility = {
  title: "Education & Schools",
  description:
    "International curricula and early years learning within a close-knit coastal community.",
  image: school,
  href: `${facilitiesIntro.cta.href}#education`,
};
const rows: [Facility, Facility][] = [
  [
    {
      title: "Mobility & Transfers",
      description: "Shuttles, G-Ride and airport transfers across the bay.",
      image: school,
      href: `${facilitiesIntro.cta.href}#mobility`,
    },
    {
      title: "Medical Centers",
      description: "Expert care and emergency support, 24/7.",
      image: image(
        "/images/facilities/facility-kiter.webp",
        "A kitesurfer carrying his board at sunset",
      ),
      href: `${facilitiesIntro.cta.href}#medical`,
    },
  ],
  [
    {
      title: "Maintenance",
      description: "Complete home support, from repairs to housekeeping.",
      image: lounge,
      href: `${facilitiesIntro.cta.href}#maintenance`,
    },
    {
      title: "Pharmacies",
      description: "Everyday medicines and essentials, open daily.",
      image: lounge,
      href: `${facilitiesIntro.cta.href}#pharmacy`,
    },
  ],
];

export function FacilitiesSection() {
  return (
    <section
      aria-labelledby="facilities-title"
      data-theme-surface="light"
      className="bg-turquoise-5 py-section text-ink"
    >
      <Container className="flex flex-col gap-[3.75rem]">
        <HeadingRow
          id="facilities-title"
          eyebrow={facilitiesIntro.eyebrow}
          title={facilitiesIntro.title}
          description={facilitiesIntro.description}
          aside={
            <div>
              <Button href={facilitiesIntro.cta.href} variant="primary" icon="arrow-up-right">
                {facilitiesIntro.cta.label}
              </Button>
            </div>
          }
        />

        <FacilitiesCollage
          lead={lead}
          left={[rows[0][0], rows[1][0]]}
          right={[rows[0][1], rows[1][1]]}
        />
      </Container>
    </section>
  );
}
