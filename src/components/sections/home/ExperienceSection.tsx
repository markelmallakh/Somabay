import Link from "next/link";
import { highlights } from "@/content/experiences";
import { experienceIntro } from "@/content/home";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

export function ExperienceSection() {
  return (
    <Section aria-labelledby="experience-title">
      <Container>
        <SectionHeading
          id="experience-title"
          align="center"
          title={experienceIntro.title}
          description={experienceIntro.description}
        />
        <ul className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
          {highlights.map((item, index) => (
            <li key={item.href}>
              <Link href={item.href} className="group block text-white">
                <ImageReveal delay={index * 0.12} className="relative aspect-[4/5] sm:aspect-[6/5]">
                  <div className="absolute inset-0 transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.04]">
                    <ResponsiveImage
                      asset={item.image}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      fill
                    />
                  </div>
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-linear-to-t from-abyss/75 via-abyss/5 to-transparent"
                  />
                  <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-6 md:inset-x-8 md:bottom-8">
                    <span>
                      <span className="block font-serif text-h2">{item.title}</span>
                      <span className="mt-2 block max-w-sm text-white/80">{item.description}</span>
                    </span>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-white/50 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-ink">
                      <Icon name="arrow-up-right" className="size-5" />
                    </span>
                  </span>
                </ImageReveal>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
