import type { Cta, Stat } from "@/types/content";
import { cn } from "@/lib/utils";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";

type AboutStatsProps = {
  stats: Stat[];
  cta: Cta;
  className?: string;
};

export function AboutStats({ stats, cta, className }: AboutStatsProps) {
  return (
    <div className={cn("bg-sand-50 p-5 text-ink shadow-soft sm:p-6", className)}>
      <dl className="flex flex-col divide-y divide-line">
        {stats.map((stat) => (
          <div key={stat.value} className="flex items-center gap-5 py-4 first:pt-0">
            <div className="relative h-16 w-24 shrink-0 overflow-hidden">
              <ResponsiveImage asset={stat.image} sizes="96px" fill />
            </div>
            <div className="flex flex-col-reverse">
              <dt className="text-caption text-slate">{stat.label}</dt>
              <dd className="font-serif text-h3">{stat.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <Button href={cta.href} variant="outline" className="mt-2 w-full">
        {cta.label}
      </Button>
    </div>
  );
}
