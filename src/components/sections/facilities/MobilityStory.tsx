import { mobilityIntro, mobilityOptions } from "@/content/facilities-page";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";

/** Sticky intro on the left; rounded photo panels scroll past on the right with their copy. */
export function MobilityStory() {
  return (
    <section
      id="mobility"
      aria-labelledby="mobility-title"
      className="scroll-mt-(--header-height) bg-white py-section"
    >
      <Container className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+3rem)]">
            <SectionHeading
              id="mobility-title"
              eyebrow={mobilityIntro.eyebrow}
              title={mobilityIntro.title}
              description={mobilityIntro.description}
            />
          </div>
        </div>
        <ol className="flex flex-col gap-4 md:gap-6 lg:col-span-7 lg:col-start-6">
          {mobilityOptions.map((option, index) => (
            <li
              key={option.title}
              className="relative isolate flex min-h-[26rem] items-end overflow-hidden rounded-md text-white md:min-h-[32rem] lg:h-[min(78svh,42rem)]"
            >
              <ImageReveal className="absolute inset-0 -z-10" from={index % 2 ? "left" : "bottom"}>
                <div className="absolute inset-0">
                  <ResponsiveImage
                    asset={option.image}
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    fill
                  />
                </div>
              </ImageReveal>
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-linear-to-t from-abyss/85 via-abyss/25 to-transparent"
              />
              <Reveal className="max-w-lg p-7 md:p-10">
                <p aria-hidden className="font-serif text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-heading-4">{option.title}</h3>
                <p className="mt-4 text-white/80">{option.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
