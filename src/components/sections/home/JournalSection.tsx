import Link from "next/link";
import { routes } from "@/config/routes";
import { journalIntro } from "@/content/home";
import { articles } from "@/content/journal";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { JournalCarousel } from "./JournalCarousel";

export function JournalSection() {
  return (
    <Section tone="white" aria-labelledby="journal-title" className="overflow-hidden">
      <Container>
        <SectionHeading
          id="journal-title"
          align="center"
          eyebrow={journalIntro.eyebrow}
          title={journalIntro.title}
        />
      </Container>
      <div className="mt-14 md:mt-20">
        <JournalCarousel label={journalIntro.title}>
          {articles.map((article) => (
            <li key={article.slug} className="w-[min(82vw,26rem)] shrink-0 snap-start">
              <article className="group relative">
                <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
                  <ResponsiveImage
                    asset={article.image}
                    sizes="(min-width: 768px) 26rem, 82vw"
                    fill
                    className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-6 flex items-center gap-3 text-caption">
                  <span className="bg-sand-100 px-2.5 py-1 font-semibold">{article.category}</span>
                  <span className="text-slate">{article.readingMinutes} min read</span>
                </p>
                <h3 className="mt-4 font-serif text-h4">
                  <Link
                    href={routes.article(article.slug)}
                    className="after:absolute after:inset-0"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p
                  aria-hidden
                  className="mt-5 inline-flex items-center gap-2 text-[0.75rem] font-semibold tracking-label uppercase"
                >
                  <span className="link-underline pb-0.5 group-hover:[background-size:100%_1px]">
                    {journalIntro.itemCtaLabel}
                  </span>
                  <Icon
                    name="chevron-right"
                    className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </p>
              </article>
            </li>
          ))}
        </JournalCarousel>
      </div>
      <Reveal className="mt-14 flex justify-center px-gutter">
        <Button href={journalIntro.cta.href} variant="outline">
          {journalIntro.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
