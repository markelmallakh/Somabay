import { contactCta } from "@/content/home";
import { image } from "@/lib/media";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

const background = image(
  "/images/cta/contact-bay-aerial.webp",
  "Aerial view of a Somabay beach with a boat carving circles in the bay",
);

/**
 * Figma Contact CTA (430:19981): a centred invitation over an aerial of the bay, under a deep
 * teal wash (#123a46 at 90%) that fades out from left to right.
 */
export function ContactCta() {
  return (
    <section
      aria-labelledby="cta-title"
      data-theme-surface="dark"
      className="relative isolate overflow-hidden bg-[#123a46] text-white"
    >
      <ResponsiveImage
        asset={background}
        sizes="100vw"
        quality={85}
        fill
        className="-z-10 object-[50%_66%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(18_58_70/0.9),rgb(18_58_70/0))]"
      />
      <Container className="flex min-h-[clamp(26rem,49vw,46.25rem)] flex-col items-center justify-center py-14 text-center sm:py-20">
        <Reveal className="flex max-w-[43.75rem] flex-col items-center gap-6 sm:gap-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <h2 id="cta-title" className="text-heading-1">
              {contactCta.title}
            </h2>
            <p className="text-body-md text-white/90 sm:text-body-lg">{contactCta.description}</p>
          </div>
          <Button href={contactCta.cta.href} variant="primary" size="lg" icon="arrow-right">
            {contactCta.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
