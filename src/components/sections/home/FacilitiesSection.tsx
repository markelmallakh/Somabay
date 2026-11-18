import { facilitiesIntro } from "@/content/home";
import { image } from "@/lib/media";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

// The supplied Winter Campaign photo (067A0335).
const photo = image(
  "/images/facilities/facilities-winter-067a0335.webp",
  "A guest in a bathrobe with a morning coffee on a bright, sea-view hotel bed",
  { position: "50% 60%" },
);

// DRAFT statement: to be confirmed by the client.
const statement =
  "Everything daily life asks for, from schools and clinics to home care and getting around, is only a few minutes from your door.";

/**
 * Facilities & Services as one calm sand panel (after the Podium Automation feature section on
 * unsection.com): on the left a small turquoise label and a large statement, then, under a
 * hairline, the short brief with Explore all beside it; the photo sits on
 * the right.
 */
export function FacilitiesSection() {
  return (
    <section aria-labelledby="facilities-title" className="bg-white py-section text-ink">
      <Container>
        <div className="grid gap-8 rounded-md bg-sand-100 p-6 sm:p-8 lg:grid-cols-12 lg:gap-0 lg:p-10">
          <Reveal className="flex flex-col gap-10 lg:col-span-7 lg:justify-between lg:pr-10">
            <div className="flex flex-col gap-4 lg:gap-5">
              <h2
                id="facilities-title"
                className="font-sans text-body-xs font-semibold text-turquoise"
              >
                {facilitiesIntro.title}
              </h2>
              <p className="font-serif text-heading-3 text-balance">{statement}</p>
            </div>

            <div className="flex flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
              <p className="max-w-[22rem] text-body-sm text-slate">{facilitiesIntro.description}</p>
              <Button
                href={facilitiesIntro.cta.href}
                variant="primary"
                icon="arrow-up-right"
                className="shrink-0"
              >
                {facilitiesIntro.cta.label}
              </Button>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:pl-10">
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-md sm:aspect-[4/3] lg:aspect-auto lg:h-[min(28rem,54svh)]">
              <div className="absolute inset-0">
                <ResponsiveImage
                  asset={photo}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
