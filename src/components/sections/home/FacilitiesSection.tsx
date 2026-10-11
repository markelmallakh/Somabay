import { facilities } from "@/content/facilities";
import { facilitiesIntro } from "@/content/home";
import type { Facility } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

function FacilityCard({
  facility,
  imagePosition,
}: {
  facility: Facility;
  imagePosition: "top" | "bottom";
}) {
  const text = (
    <div className="p-7 md:p-8">
      <h3 className="font-serif text-h3">{facility.title}</h3>
      <p className="mt-3 max-w-sm text-slate">{facility.description}</p>
    </div>
  );
  if (facility.image) {
    return (
      <article className="group flex h-full flex-col overflow-hidden bg-sand-50">
        {imagePosition === "bottom" ? text : null}
        <div className="relative min-h-64 flex-1 overflow-hidden">
          <ResponsiveImage
            asset={facility.image}
            sizes="(min-width: 1024px) 30vw, 100vw"
            fill
            className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
          />
        </div>
        {imagePosition === "top" ? text : null}
      </article>
    );
  }
  return (
    <article className="flex h-full flex-col justify-between gap-12 bg-sand-50 p-7 md:p-8">
      {facility.icon ? (
        <span className="grid size-12 place-items-center rounded-full border border-line text-lagoon">
          <Icon name={facility.icon} className="size-6" />
        </span>
      ) : null}
      <div>
        <h3 className="font-serif text-h3">{facility.title}</h3>
        <p className="mt-3 max-w-sm text-slate">{facility.description}</p>
      </div>
    </article>
  );
}

export function FacilitiesSection() {
  const [education, medical, maintenance, mobility] = facilities;
  return (
    <Section tone="stone" aria-labelledby="facilities-title">
      <Container>
        <SectionHeading
          id="facilities-title"
          align="center"
          eyebrow={facilitiesIntro.eyebrow}
          title={facilitiesIntro.title}
          description={facilitiesIntro.description}
        />
        <RevealGroup className="mt-14 grid gap-3 md:mt-20 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <RevealItem className="lg:row-span-2">
            <FacilityCard facility={education} imagePosition="bottom" />
          </RevealItem>
          <RevealItem>
            <FacilityCard facility={medical} imagePosition="top" />
          </RevealItem>
          <RevealItem className="lg:col-start-2">
            <FacilityCard facility={maintenance} imagePosition="top" />
          </RevealItem>
          <RevealItem className="md:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-1">
            <FacilityCard facility={mobility} imagePosition="top" />
          </RevealItem>
        </RevealGroup>
        <Reveal className="mt-14 flex justify-center">
          <Button href={facilitiesIntro.cta.href} variant="outline">
            {facilitiesIntro.cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
