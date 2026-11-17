import type { Job } from "@/content/careers";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/Chip";

/** Department, location and contract type as chips; `plain` (white) on tinted panels. */
export function JobMeta({
  job,
  className,
  tone = "soft",
}: {
  job: Job;
  className?: string;
  tone?: "soft" | "plain";
}) {
  return (
    <p className={cn("flex flex-wrap items-center gap-2", className)}>
      <Chip tone={tone}>{job.department}</Chip>
      <Chip tone={tone}>{job.location}</Chip>
      <Chip tone={tone} accent="sun">
        {job.type}
      </Chip>
    </p>
  );
}
