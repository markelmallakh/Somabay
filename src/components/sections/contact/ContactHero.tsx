import { contactHero } from "@/content/contact";
import { formDefinitions } from "@/lib/forms";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** Full-bleed evening photo (slow parallax) with the enquiry form in a rounded white panel. */
export function ContactHero() {
  return (
    <section
      aria-labelledby="page-title"
      className="relative isolate bg-abyss pt-[calc(var(--header-height)+2.5rem)] pb-16 md:pt-[calc(var(--header-height)+3.5rem)] md:pb-24"
    >
      <Parallax mode="hero" amount={6} className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <ResponsiveImage asset={contactHero.image} sizes="100vw" fill priority />
        </div>
      </Parallax>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(18_58_70/0.55),rgb(18_58_70/0.15)_60%,transparent)]"
      />
      <Container>
        <Reveal
          distance={40}
          className="max-w-[44rem] rounded-md bg-white p-6 shadow-[0_24px_60px_rgb(18_58_70/0.18)] sm:p-10 lg:p-12"
        >
          <Eyebrow>{contactHero.eyebrow}</Eyebrow>
          <SplitHeading
            as="h1"
            id="page-title"
            trigger="load"
            delay={0.3}
            className="mt-4 text-heading-1"
          >
            {contactHero.title}
          </SplitHeading>
          <EnquiryForm definition={formDefinitions.contact} className="mt-8 md:mt-10" />
        </Reveal>
      </Container>
    </section>
  );
}
