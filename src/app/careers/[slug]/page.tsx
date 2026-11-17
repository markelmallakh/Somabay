import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { JobMeta } from "@/components/sections/careers/JobMeta";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { formDefinitions } from "@/lib/forms";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { routes } from "@/config/routes";
import { getJob, jobs } from "@/content/careers";
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

/** One titled list on the job page (About the Role, Requirements, Benefits & Privileges). */
function JobSection({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="grid gap-4 border-t border-ink/10 py-7 lg:grid-cols-12 lg:gap-6 lg:py-8">
      <h2 className="font-serif text-heading-5 lg:col-span-4">{title}</h2>
      <ul className="flex flex-col gap-2.5 lg:col-span-7 lg:col-start-6">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-body-sm text-ink/85">
            <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-turquoise" />
            {item}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

async function CareerContent({ params }: { params: PageProps<"/careers/[slug]">["params"] }) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  return (
    <article className="bg-sand-100 pt-[calc(var(--header-height)+2.5rem)] pb-section">
      <Container>
        <Link
          href={routes.careers}
          className="eyebrow inline-flex items-center gap-2 text-lagoon hover:text-ink"
        >
          <Icon name="chevron-left" className="size-4" />
          Back to careers
        </Link>

        {/* The cap: the role, its badges and Apply Now, which glides down to the form. */}
        <Reveal className="mt-6 flex flex-col gap-5 pb-2 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-3">
            <JobMeta job={job} tone="plain" />
            <h1 className="max-w-3xl text-heading-3">{job.title}</h1>
            <p className="max-w-2xl text-body-sm text-slate">{job.summary}</p>
          </div>
          <Button href="#apply" variant="primary" className="shrink-0 self-start md:self-end">
            Apply now
          </Button>
        </Reveal>

        <div className="mt-4 border-b border-ink/10 lg:mt-6">
          <JobSection title="About the Role" items={job.about} />
          <JobSection title="Requirements" items={job.requirements} />
          <JobSection title="Benefits & Privileges" items={job.benefits} />
        </div>
      </Container>

      {/* The application, with the CV upload. */}
      <section
        id="apply"
        aria-labelledby="apply-title"
        className="mt-12 scroll-mt-(--header-height) lg:mt-14"
      >
        {/* One centred card: the heading inside it, then the form with a full-width submit. */}
        <Container className="flex justify-center">
          <Reveal className="w-full max-w-[40rem] rounded-md bg-white p-6 sm:p-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 id="apply-title" className="text-heading-4">
                Apply Now
              </h2>
              <p className="max-w-md text-body-sm text-slate">
                Share your details and attach your CV. Our team will review your application and get
                back to you.
              </p>
            </div>
            <EnquiryForm
              definition={formDefinitions.jobApplication}
              context={job.title}
              compact
              className="mt-6"
            />
          </Reveal>
        </Container>
      </section>
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
