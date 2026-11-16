import { facilitiesIntro } from "@/content/home";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { FacilitiesCollage, type Facility } from "./FacilitiesCollage";
import { image } from "@/lib/media";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

// Photos of the real places, from somabay.com's Facilities & Services page; the Medical Center
// tile (full width) uses the supplied photo of the medical team. The pharmacy
// tile uses the supplied Natural Pharmacy shopfront.
const medicalCenter = image(
  "/images/facilities/medical-team.webp",
  "Smiling doctors and nurses in a bright clinic lobby with sea views",
  // Keep the faces in frame in the wide tile.
  { position: "50% 28%" },
);
const classroom = image(
  "/images/facilities/kompass-classroom.webp",
  "A lesson in a Kompass Primary School classroom",
);
const limousine = image(
  "/images/facilities/somabay-limousine.webp",
  "Somabay Limousine cars parked under the palms",
);
const homeServices = image(
  "/images/facilities/coral-home-services.webp",
  "The Coral interior design and home services studio",
);
const pharmacy = image(
  "/images/facilities/natural-pharmacy.webp",
  "The Natural Pharmacy shopfront by the marina, framed by bougainvillea and palms",
  { position: "50% 0%" },
);

/** Figma "Section / Facilities & Services — Collage" (416:17854). */
const lead: Facility = {
  title: "Medical Centers",
  description: "Expert care and emergency support, 24/7.",
  image: medicalCenter,
  href: `${facilitiesIntro.cta.href}#medical`,
};
const rows: [Facility, Facility][] = [
  [
    {
      title: "Mobility & Transfers",
      description: "Shuttles, G-Ride and airport transfers across the bay.",
      image: limousine,
      href: `${facilitiesIntro.cta.href}#mobility`,
    },
    {
      title: "Education & Schools",
      description:
        "International curricula and early years learning within a close-knit coastal community.",
      image: classroom,
      href: `${facilitiesIntro.cta.href}#education`,
    },
  ],
  [
    {
      title: "Maintenance",
      description: "Complete home support, from repairs to housekeeping.",
      image: homeServices,
      href: `${facilitiesIntro.cta.href}#maintenance`,
    },
    {
      title: "Pharmacies",
      description: "Everyday medicines and essentials, open daily.",
      image: pharmacy,
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
