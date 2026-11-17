import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { ArticleBody } from "@/components/sections/shared/ArticleBody";
import { DetailHeader } from "@/components/sections/shared/DetailHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";
import { ArticleGallery } from "@/components/sections/shared/ArticleGallery";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { routes } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { articles, getArticle } from "@/content/journal";
import { formatLongDate } from "@/lib/dates";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/bay-journal/[slug]">): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: `${article.title} — from the Somabay Journal.`,
    path: routes.article(article.slug),
    image: article.image,
  });
}

async function ArticleContent({ params }: { params: PageProps<"/bay-journal/[slug]">["params"] }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const path = routes.article(article.slug);
  const related = articles.filter((other) => other.slug !== article.slug).slice(0, 3);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": article.category === "News" ? "NewsArticle" : "BlogPosting",
    headline: article.title,
    datePublished: article.date,
    image: `${siteConfig.url}${article.image.src}`,
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <article aria-labelledby="page-title">
        <DetailHeader
          back={{ label: "Back to journal", href: routes.journal }}
          title={article.title}
          path={path}
          image={article.image}
          meta={
            <>
              <Chip>{article.category}</Chip>
              <span className="flex items-center gap-2">
                <Icon name="clock" className="size-4" />
                {article.readingMinutes} min read
              </span>
              <span className="flex items-center gap-2">
                <Icon name="calendar" className="size-4" />
                <time dateTime={article.date}>{formatLongDate(article.date)}</time>
              </span>
            </>
          }
        />
        <Container className="max-w-3xl pt-10 lg:pt-12">
          {article.body ? <ArticleBody blocks={article.body} /> : null}
        </Container>
        <ArticleGallery images={article.gallery} label={article.title} />
        <Container className="pb-section">
          <div className="mt-12 flex justify-end border-t border-line pt-8">
            <ShareButtons path={path} title={article.title} />
          </div>
        </Container>
      </article>
      <Section tone="white" className="bg-sand-100" aria-labelledby="read-also-title">
        <Container>
          <SectionHeading id="read-also-title" align="center" title="Read Also" />
          <RevealGroup
            as="ul"
            className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:mt-12 lg:grid-cols-3"
          >
            {related.map((other) => (
              <RevealItem as="li" key={other.slug}>
                <ArticleCard article={other} tinted />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-12 flex justify-center">
            <Button href={routes.journal} variant="outline">
              Read more
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

export default function ArticlePage({ params }: PageProps<"/bay-journal/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}
