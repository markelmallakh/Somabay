import type { Cta, Stat } from "@/types/content";
import { cn } from "@/lib/utils";
import { CountUp } from "@/components/animations/CountUp";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";

type AboutStatsProps = {
  stats: Stat[];
  cta: Cta;
  className?: string;
};

/** Key figures set inline in white on the dune band (counting up on arrival), with the outlined story CTA beneath. */
export function AboutStats({ stats, cta, className }: AboutStatsProps) {
  return (
    <RevealGroup className={cn("flex flex-col gap-12 text-white lg:gap-16", className)}>
      <dl className="grid gap-8 sm:grid-cols-3 sm:gap-8">
        {stats.map((stat) => (
          <RevealItem
            key={stat.value}
            as="div"
            className="flex flex-col-reverse gap-2 border-t border-white/40 pt-6"
          >
            <dt className="text-body-md text-white/80">{stat.label}</dt>
            <dd className="font-serif text-heading-2 leading-none">
              <CountUp value={stat.value} />
            </dd>
          </RevealItem>
        ))}
      </dl>
      <RevealItem className="flex justify-center">
        <Button href={cta.href} variant="outline-light" icon="arrow-up-right">
          {cta.label}
        </Button>
      </RevealItem>
    </RevealGroup>
  );
}
