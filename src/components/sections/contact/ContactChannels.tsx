import { contactChannels, contactStripImage } from "@/content/contact";
import { Container } from "@/components/layout/Container";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

/** Hotline, email and offices as white rounded cards beside an aerial of the peninsula. */
export function ContactChannels() {
  return (
    <section aria-labelledby="contacts-title" className="bg-turquoise-5 py-section text-ink">
      <Container>
        <Reveal>
          <h2 id="contacts-title" className="text-heading-2">
            Contacts
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
          <ImageReveal className="relative aspect-[4/3] rounded-card lg:aspect-auto lg:min-h-full lg:rounded-media">
            <div className="absolute inset-0">
              <ResponsiveImage
                asset={contactStripImage}
                sizes="(min-width: 1024px) 40vw, 100vw"
                fill
              />
            </div>
          </ImageReveal>
          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {contactChannels.map((channel) => (
              <RevealItem
                as="li"
                key={channel.label + channel.lines[0]}
                className="flex flex-col gap-5 rounded-card bg-white p-6 md:p-8"
              >
                <span className="grid size-11 place-items-center rounded-full bg-turquoise-10 text-turquoise">
                  <Icon name={channel.icon} className="size-5" />
                </span>
                <div>
                  <p className="font-serif text-h4">{channel.label}</p>
                  {channel.lines.map((line, index) =>
                    channel.href && index === 0 ? (
                      <a
                        key={line}
                        href={channel.href}
                        className="link-underline mt-2 inline-block text-slate hover:text-ink"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={line} className="mt-2 text-slate">
                        {line}
                      </p>
                    ),
                  )}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
