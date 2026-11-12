import { academy, courses, coursesIntro, golfOverview, teeBooking } from "@/content/golf";
import { formDefinitions } from "@/lib/forms";
import { cn } from "@/lib/utils";
import type { ImageAsset } from "@/types/media";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ScrollRevealText } from "@/components/animations/ScrollRevealText";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Chip } from "@/components/ui/Chip";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeadingRow } from "@/components/sections/things-to-do/HeadingRow";

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function GolfOverview() {
  return (
    <Section tone="white" aria-labelledby="golf-overview-title" className="overflow-hidden">
      <Container>
        <Eyebrow as="h2">
          <span id="golf-overview-title">{golfOverview.eyebrow}</span>
        </Eyebrow>
        <ScrollRevealText text={golfOverview.statement} leadWords={10} className="mt-6 max-w-5xl" />
        <RevealGroup
          as="ul"
          className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6"
        >
          {golfOverview.highlights.map((item) => (
            <RevealItem as="li" key={item.label}>
              <div className="group relative aspect-[316/265] overflow-hidden rounded-card bg-sand-200">
                <ResponsiveImage
                  asset={item.image}
                  sizes="(min-width: 1024px) 23vw, 50vw"
                  fill
                  className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                />
              </div>
              <p className="mt-4 font-serif text-heading-6">{item.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </Section>
  );
}

type CourseFeatureProps = {
  image: ImageAsset;
  title: string;
  description?: string;
  features?: string[];
  info: { icon: IconName; text: string; href?: string }[];
  side: "left" | "right";
};

/** Wide rounded course photo with a floating rounded white card; features read as chips. */
function CourseFeature({ image, title, description, features, info, side }: CourseFeatureProps) {
  return (
    <article className="relative lg:min-h-[36rem]">
      <ImageReveal className="relative aspect-[16/10] rounded-card lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-media">
        <div className="absolute inset-0">
          <ResponsiveImage asset={image} sizes="(min-width: 1440px) 1312px, 100vw" fill />
        </div>
      </ImageReveal>
      <Reveal
        className={cn(
          "relative z-10 mx-4 -mt-16 rounded-card bg-white p-6 shadow-[0_12px_40px_rgb(18_58_70/0.12)] sm:mx-8 md:p-8 lg:absolute lg:bottom-8 lg:mx-0 lg:mt-0 lg:w-[32rem]",
          side === "left" ? "lg:left-8" : "lg:right-8",
        )}
      >
        <h3 className="font-serif text-heading-5">{title}</h3>
        {description ? <p className="mt-3 text-body-sm text-slate">{description}</p> : null}
        {features ? (
          <ul aria-label="Key features" className="mt-5 flex flex-wrap gap-2">
            {features.map((feature) => (
              <li key={feature}>
                <Chip accent="sun">{feature}</Chip>
              </li>
            ))}
          </ul>
        ) : null}
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-5 text-caption text-slate">
          {info.map((entry) => (
            <li key={entry.text} className="flex items-center gap-2">
              <Icon name={entry.icon} className="size-4.5 text-turquoise" />
              {entry.href ? (
                <a href={entry.href} className="hover:text-ink">
                  {entry.text}
                </a>
              ) : (
                entry.text
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </article>
  );
}

export function CoursesSection() {
  return (
    <Section
      id="courses"
      tone="white"
      aria-labelledby="courses-title"
      className="scroll-mt-(--header-height) bg-sand-100"
    >
      <Container>
        <HeadingRow
          id="courses-title"
          title={coursesIntro.title}
          description={coursesIntro.description}
        />
        <div className="mt-12 flex flex-col gap-14 lg:mt-16 lg:gap-8">
          {courses.map((course, index) => (
            <CourseFeature
              key={course.title}
              image={course.image}
              title={course.title}
              description={course.description}
              features={course.features}
              info={course.info}
              side={index % 2 ? "left" : "right"}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function AcademySection() {
  return (
    <Section
      id="academy"
      tone="white"
      aria-labelledby="academy-title"
      className="scroll-mt-(--header-height)"
    >
      <Container>
        <HeadingRow
          id="academy-title"
          title={academy.intro.title}
          description={academy.intro.description}
        />
        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-6">
          <ImageReveal
            from="left"
            className="relative aspect-[4/3] rounded-card lg:col-span-6 lg:rounded-media"
          >
            <div className="absolute inset-0">
              <ResponsiveImage asset={academy.image} sizes="(min-width: 1024px) 46vw, 100vw" fill />
            </div>
          </ImageReveal>
          <RevealGroup as="ul" className="border-t border-line lg:col-span-5 lg:col-start-8">
            {academy.facilities.map((facility) => (
              <RevealItem
                as="li"
                key={facility}
                className="flex items-center justify-between gap-6 border-b border-line py-6 font-serif text-heading-6"
              >
                {facility}
                <Icon name="flag" className="size-5 text-turquoise" />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        <div className="mt-section">
          <HeadingRow eyebrow="Our professionals" title="Golf Academy Pros" as="h3" />
          <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3 lg:gap-6">
            {academy.pros.map((pro) => (
              <RevealItem
                as="li"
                key={pro.name}
                className="flex h-full items-center gap-5 rounded-card bg-sand-100 p-5 md:p-6"
              >
                <span
                  aria-hidden
                  className="grid size-16 shrink-0 place-items-center rounded-full bg-white font-serif text-heading-6 text-turquoise"
                >
                  {initials(pro.name)}
                </span>
                <span>
                  <span className="block font-serif text-heading-6">{pro.name}</span>
                  <span className="mt-1 block text-body-sm text-slate">{pro.role}</span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}

export function TeeBookingSection() {
  return (
    <Section
      id="tee-booking"
      tone="white"
      aria-labelledby="tee-title"
      className="scroll-mt-(--header-height) bg-turquoise-5"
    >
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <HeadingRow id="tee-title" eyebrow={teeBooking.eyebrow} title={teeBooking.title} />
          <ul className="mt-8 flex flex-col gap-4">
            {teeBooking.contacts.map((contact) => (
              <li key={contact.label} className="flex items-center gap-3 text-slate">
                <Icon name={contact.icon} className="size-5 text-turquoise" />
                <a href={contact.href} className="link-underline hover:text-ink">
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card bg-white p-6 md:p-10 lg:col-span-6 lg:col-start-7">
          <EnquiryForm definition={formDefinitions.tee} />
        </div>
      </Container>
    </Section>
  );
}
