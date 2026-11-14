import type { ImageAsset } from "@/types/media";
import { type FormDefinition, formDefinitions, unitChoicesFor } from "@/lib/forms";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

type NeighborhoodInterestProps = {
  /** The neighborhood's name, as on its page and in the unit listings. */
  name: string;
  image: ImageAsset;
};

/**
 * The close of a neighborhood page: register interest in this neighborhood. A deep-teal panel
 * over the neighborhood's photo invites the visitor in; beside it, a white form card asks for
 * contact details and the preferred unit, offering the unit types listed in this neighborhood.
 */
export function NeighborhoodInterest({ name, image }: NeighborhoodInterestProps) {
  const base = formDefinitions.neighborhoodInterest;
  // Same fields as the shared form; the unit list narrowed to this neighborhood.
  const definition: FormDefinition = {
    ...base,
    fields: base.fields.map((field) =>
      field.kind === "select" && field.name === "unit"
        ? { ...field, options: unitChoicesFor(name) }
        : field,
    ),
  };

  return (
    <section
      aria-labelledby="interest-title"
      className="relative isolate overflow-hidden bg-turquoise-160 py-section text-white"
      data-theme-surface="dark"
    >
      <Parallax amount={6} className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <ResponsiveImage asset={image} alt="" sizes="100vw" fill />
        </div>
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(0_70_74/0.94),rgb(0_70_74/0.8)_45%,rgb(0_70_74/0.45))]"
      />

      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="flex flex-col gap-5 lg:col-span-5">
          <Reveal distance={12}>
            <Eyebrow tone="dark">Register your interest</Eyebrow>
          </Reveal>
          {/* DRAFT COPY: the title and paragraph were written for this form, not from Figma. */}
          <SplitHeading id="interest-title" className="text-heading-1 text-balance">
            {`Make ${name} your home`}
          </SplitHeading>
          <Reveal delay={0.2}>
            <p className="max-w-md text-body-lg text-white/85">
              Tell us which home you have in mind and our sales team will share availability, prices
              and a time to visit.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-md bg-white p-6 text-ink shadow-[0_24px_60px_rgb(0_0_0/0.25)] sm:p-10">
            <p className="font-serif text-heading-5">{name}</p>
            <EnquiryForm
              definition={definition}
              context={`Neighborhood: ${name}`}
              className="mt-6"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
