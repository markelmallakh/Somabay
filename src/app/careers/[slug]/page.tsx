import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { JobMeta } from "@/components/sections/careers/JobMeta";
import { ArticleBody } from "@/components/sections/shared/ArticleBody";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/config/routes";
import { applyHref, getJob, jobs } from "@/content/careers";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return pageMetadata({
    title: job.title,
    description: job.summary,
    path: routes.career(job.slug),
  });
}

async function CareerContent({ params }: { params: PageProps<"/careers/[slug]">["params"] }) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  return (
    <article className="pt-[calc(var(--header-height)+3.5rem)] pb-section">
      <Container className="max-w-5xl">
        <Link
          href={routes.careers}
          className="eyebrow inline-flex items-center gap-2 text-lagoon hover:text-ink"
        >
          <Icon name="chevron-left" className="size-4" />
          Back to careers
        </Link>
        <Reveal className="mt-8 flex flex-col gap-8 rounded-card bg-turquoise-5 p-6 sm:p-10 md:flex-row md:items-end md:justify-between lg:rounded-media lg:p-14">
          <div>
            <JobMeta job={job} tone="plain" />
            <h1 className="mt-5 max-w-2xl text-h1">{job.title}</h1>
            {job.body ? <p className="mt-5 max-w-2xl text-lead text-slate">{job.summary}</p> : null}
          </div>
          <Button
            href={applyHref(job)}
            external
            variant="solid"
            className="shrink-0 self-start md:self-end"
          >
            Apply now
          </Button>
        </Reveal>
        <div className="mt-12 md:mt-16 [&_.prose-somabay]:mx-0">
          {job.body ? (
            <ArticleBody blocks={job.body} />
          ) : (
            <p className="max-w-prose text-lead text-slate">{job.summary}</p>
          )}
        </div>
        <div className="mt-12 border-t border-line pt-8">
          <Button href={applyHref(job)} external variant="solid">
            Apply now
          </Button>
        </div>
      </Container>
    </article>
  );
}

export default function CareerPage({ params }: PageProps<"/careers/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CareerContent params={params} />
    </Suspense>
  );
}
