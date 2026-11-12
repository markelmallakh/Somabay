import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PhotoGrid } from "@/components/media/PhotoGrid";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { HeadingRow } from "@/components/sections/live/HeadingRow";
import { UnitCard } from "@/components/sections/live/UnitCard";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon, type IconName } from "@/components/ui/Icon";
import { routes } from "@/config/routes";
import { getUnit, units } from "@/content/resale";
import { formDefinitions } from "@/lib/forms";
import { pageMetadata } from "@/lib/metadata";

const amenityIcons: Record<string, IconName> = {
  "Beach Front": "umbrella",
  "Wi-Fi": "wifi",
  "Fully Finished": "key",
  "Gym Access": "dumbbell",
  "Medical Center": "medical",
  "Golf Course": "flag",
  "Tennis Court": "sparkle",
  Bazar: "shop",
};

export function generateStaticParams() {
  return units.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resale/[slug]">): Promise<Metadata> {
  const unit = getUnit((await params).slug);
  if (!unit) return {};
  return pageMetadata({
    title: `${unit.title} in ${unit.neighborhood}`,
    description: `${unit.title} for resale in ${unit.neighborhood}, Somabay — ${unit.bedrooms} bedrooms, ${unit.bathrooms} bathrooms.`,
    path: routes.unit(unit.slug),
    image: unit.images[0],
  });
}

async function UnitContent({ params }: { params: PageProps<"/resale/[slug]">["params"] }) {
  const unit = getUnit((await params).slug);
  if (!unit) notFound();
  const related = units.filter((other) => other.slug !== unit.slug).slice(0, 3);
  const specs: { icon: IconName; label: string; value: string }[] = [
    { icon: "bed", label: "Bedrooms", value: String(unit.bedrooms) },
    { icon: "bath", label: "Bathrooms", value: String(unit.bathrooms) },
    { icon: "home", label: "Type", value: unit.type },
    { icon: "pin", label: "Neighborhood", value: unit.neighborhood },
  ];

  return (
    <>
      <Section
        spacing="none"
        className="pt-[calc(var(--header-height)+2.5rem)] pb-section"
        aria-labelledby="page-title"
      >
        <Container>
          <Breadcrumbs
            items={[
              { label: "Live in Somabay", href: routes.resale },
              { label: unit.title, href: routes.unit(unit.slug) },
            ]}
            className="mb-8"
          />
          <PhotoGrid images={unit.images} label={unit.title} />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-6">
            <Reveal className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Chip accent="turquoise">{unit.type}</Chip>
                <Chip accent="dune">
                  {unit.bedrooms} {unit.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                </Chip>
                <Chip accent="twilight">{unit.neighborhood}</Chip>
              </div>
              <h1 id="page-title" className="mt-5 text-heading-2 leading-[1.2]">
                {unit.title}
              </h1>
              <h2 className="mt-12 text-heading-5">Amenities</h2>
              <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {unit.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="flex items-center gap-3 rounded-thumb bg-sand-100 p-3 text-body-sm text-ink"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-turquoise">
                      <Icon name={amenityIcons[amenity] ?? "check"} className="size-4.5" />
                    </span>
                    {amenity}
                  </li>
                ))}
              </ul>
            </Reveal>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col gap-5 rounded-card bg-sand-100 p-6 md:p-8 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                <p className="font-serif text-heading-5">{unit.type}</p>
                <Button href="#reserve" variant="primary" className="w-full">
                  Request call
                </Button>
                <dl className="divide-y divide-ink/10">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between gap-4 py-3">
                      <dt className="flex items-center gap-2 text-body-sm text-slate">
                        <Icon name={spec.icon} className="size-4.5" />
                        {spec.label}
                      </dt>
                      <dd className="font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section
        id="reserve"
        aria-labelledby="reserve-title"
        className="scroll-mt-(--header-height) bg-turquoise-5"
      >
        <Container className="max-w-3xl">
          <Reveal className="rounded-card bg-white p-6 md:p-10 lg:rounded-media">
            <SectionHeading
              id="reserve-title"
              title="Reserve Your Home"
              description="Connect with our team and take the next step towards living in Somabay."
            />
            <EnquiryForm
              definition={formDefinitions.unit}
              context={`${unit.title} — ${unit.neighborhood}`}
              className="mt-10"
            />
          </Reveal>
        </Container>
      </Section>

      <Section aria-labelledby="related-title" className="bg-sand-100">
        <Container>
          <HeadingRow
            id="related-title"
            title="You May Also Like"
            aside={
              <div>
                <Button href={routes.resale} variant="outline" icon="arrow-up-right">
                  Explore all units
                </Button>
              </div>
            }
          />
          <RevealGroup as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {related.map((other) => (
              <RevealItem as="li" key={other.slug}>
                <UnitCard unit={other} href={routes.unit(other.slug)} />
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </Section>
    </>
  );
}

export default function UnitPage({ params }: PageProps<"/resale/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <UnitContent params={params} />
    </Suspense>
  );
}
