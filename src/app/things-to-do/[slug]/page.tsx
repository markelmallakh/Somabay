import { Suspense } from "react";
import { PageSkeleton } from "@/components/layout/PageSkeleton";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ActivitySections } from "@/components/sections/activity/ActivitySections";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { MoreToExperience } from "@/components/sections/shared/MoreToExperience";
import { PageHero } from "@/components/sections/shared/PageHero";
import { routes } from "@/config/routes";
import {
  activityDetails,
  getActivity,
  moreFromThingsToDo,
  moreToExperienceIntro,
} from "@/content/things-to-do";
import { getActivitySections } from "@/content/activity-sections";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return activityDetails.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/things-to-do/[slug]">): Promise<Metadata> {
  const activity = getActivity((await params).slug);
  if (!activity) return {};
  return pageMetadata({
    title: activity.title,
    description: activity.summary,
    path: routes.activity(activity.slug),
    image: activity.card,
  });
}

async function ActivityContent({
  params,
}: {
  params: PageProps<"/things-to-do/[slug]">["params"];
}) {
  const activity = getActivity((await params).slug);
  if (!activity) notFound();

  return (
    <>
      <PageHero
        variant="split"
        eyebrow={activity.eyebrow}
        title={activity.heroTitle}
        media={activity.hero}
        // A shorter band than the section landing heroes, so it reads as a sub-page.
        height="band"
      />
      {/* One template for every activity, Spa & Thalasso included. */}
      <ActivitySections activity={activity} sections={getActivitySections(activity.slug)} />
      <MoreToExperience intro={moreToExperienceIntro} items={moreFromThingsToDo} />
      <ContactCta />
    </>
  );
}

export default function ActivityPage({ params }: PageProps<"/things-to-do/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <ActivityContent params={params} />
    </Suspense>
  );
}
