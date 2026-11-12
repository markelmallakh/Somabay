import Link from "next/link";
import { routes } from "@/config/routes";
import { applyHref, jobs } from "@/content/careers";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JobMeta } from "./JobMeta";

/** Open positions as white rounded cards on a turquoise-5 section. */
export function JobsList() {
  return (
    <section aria-labelledby="jobs-title" className="bg-turquoise-5 py-section text-ink">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Open positions</Eyebrow>
          <h2 id="jobs-title" className="text-heading-2">
            Find Your Next Opportunity
          </h2>
        </Reveal>
        <RevealGroup as="ul" className="mt-10 grid gap-4 md:mt-12 lg:grid-cols-2 lg:gap-6">
          {jobs.map((job) => (
            <RevealItem as="li" key={job.slug} className="flex">
              <article className="group relative flex w-full flex-col gap-4 rounded-card bg-white p-6 transition-shadow duration-700 ease-out-expo hover:shadow-[0_12px_40px_rgb(18_58_70/0.12)] md:p-8">
                <JobMeta job={job} />
                <h3 className="font-serif text-h3">
                  <Link
                    href={routes.career(job.slug)}
                    className="transition-colors group-hover:text-lagoon after:absolute after:inset-0 after:rounded-card"
                  >
                    {job.title}
                  </Link>
                </h3>
                <p className="text-slate">{job.summary}</p>
                <div className="mt-auto pt-2">
                  <Button
                    href={applyHref(job)}
                    external
                    variant="outline"
                    size="sm"
                    className="relative z-10"
                    aria-label={`Apply now for ${job.title}`}
                  >
                    Apply now
                  </Button>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
