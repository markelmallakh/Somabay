import { maintenance } from "@/content/facilities-page";
import { HeadingRow } from "@/components/layout/HeadingRow";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

/**
 * The heading row over three joined portrait panels: two home photos, then a white card with a
 * one-line title, the services listed one under another on hairline rows, and the phone and
 * opening hours at its foot.
 */
export function MaintenanceSection() {
  const { card } = maintenance;
  return (
    <Section
      id="maintenance"
      tone="white"
      aria-labelledby="maintenance-title"
      className="scroll-mt-(--header-height) bg-sand-100"
    >
      <Container>
        <HeadingRow
          id="maintenance-title"
          eyebrow={maintenance.eyebrow}
          title={maintenance.title}
          description={maintenance.description}
        />
        {/* Three portrait panels a hair apart: two photos, then the card (phones: the photos
            side by side over the card). */}
        <div className="mt-7 grid grid-cols-2 gap-1.5 sm:mt-10 md:grid-cols-3 lg:mt-12">
          {maintenance.images.map((image, index) => (
            <ImageReveal
              key={image.src}
              from={index ? "right" : "left"}
              className="relative aspect-[4/5] rounded-md md:aspect-[3/4]"
            >
              {/* A noticeable drift as the band crosses the screen, each photo a different pace. */}
              <Parallax amount={index ? 14 : 10} className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0">
                  <ResponsiveImage asset={image} sizes="(min-width: 768px) 33vw, 50vw" fill />
                </div>
              </Parallax>
            </ImageReveal>
          ))}

          <Reveal
            delay={0.15}
            className="col-span-2 flex flex-col rounded-md bg-white p-5 sm:p-8 md:col-span-1 md:aspect-[3/4] lg:px-12 lg:py-11"
          >
            <h3 className="font-serif text-heading-5 whitespace-nowrap">{card.title}</h3>
            <p className="mt-2 text-body-sm text-slate">{card.description}</p>

            {/* The services one under another, ruled like the contact page's channels. */}
            <ul className="mt-5 border-t border-line">
              {card.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 border-b border-line py-2 text-body-sm"
                >
                  <Icon name="check-solid" className="size-4 shrink-0 text-turquoise" />
                  {service}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-5">
              <a
                href={card.phone.href}
                className="inline-flex items-center gap-2 text-body-sm text-slate transition-colors hover:text-ink"
              >
                <Icon name="phone-solid" className="size-4 text-turquoise" />
                {card.phone.label}
              </a>
              <span className="inline-flex items-center gap-2 text-body-sm text-slate">
                <Icon name="clock-solid" className="size-4 text-turquoise" />
                {card.hours}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
