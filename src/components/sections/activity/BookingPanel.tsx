import type { FormDefinition } from "@/lib/forms";
import type { ImageAsset } from "@/types/media";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

type BookingPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: ImageAsset;
  contacts: readonly { icon: "mail" | "phone" | "pin"; label: string; href?: string }[];
  definition: FormDefinition;
  /** Sent with the request so the team knows the page it came from. */
  context: string;
};

/**
 * The booking block shared by the Things To Do pages (first built for Spa & Thalasso): the heading,
 * a short line and the contacts on one white card with the enquiry form, over a photo that
 * drifts in strong parallax. Anchored at #booking, which the page's call to action glides to.
 */
export function BookingPanel({
  eyebrow,
  title,
  description,
  image,
  contacts,
  definition,
  context,
}: BookingPanelProps) {
  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="relative isolate scroll-mt-(--header-height) overflow-hidden py-20 md:py-28 lg:py-36"
    >
      <Parallax amount={18} className="absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <ResponsiveImage asset={image} sizes="100vw" fill />
          <div aria-hidden className="absolute inset-0 bg-black/25" />
        </div>
      </Parallax>
      <Container>
        <Reveal className="mx-auto grid max-w-5xl gap-10 rounded-xl bg-white p-6 shadow-soft md:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="flex flex-col lg:col-span-5">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="booking-title" className="mt-4 text-heading-3 leading-[1.15] text-balance">
              {title}
            </h2>
            <p className="mt-4 text-body-md text-slate">{description}</p>
            <ul className="mt-8 flex flex-col gap-3.5 border-t border-ink/8 pt-6 text-body-sm">
              {contacts.map((contact) => (
                <li key={contact.label} className="flex items-center gap-3 text-slate">
                  <Icon name={contact.icon} className="size-4.5 shrink-0 text-turquoise" />
                  {contact.href ? (
                    <a href={contact.href} className="link-underline hover:text-ink">
                      {contact.label}
                    </a>
                  ) : (
                    contact.label
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm definition={definition} context={context} className="gap-y-4" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
