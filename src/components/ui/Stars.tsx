import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: count }, (_, index) => (
          <Icon key={index} name="star" className="size-3" />
        ))}
      </span>
      <span className="text-caption tracking-wide">{count} Stars</span>
    </p>
  );
}
