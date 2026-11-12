import { Chip } from "@/components/ui/Chip";
import { Icon } from "@/components/ui/Icon";

/**
 * The one star-rating badge (homepage hotels, hotel list, hotel page): a sun chip with gold stars,
 * always first in the row of tag chips above the hotel name.
 */
export function StarChip({ count, tone }: { count: number; tone?: "light" | "soft" | "plain" }) {
  return (
    <Chip accent="sun" tone={tone}>
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: count }, (_, index) => (
          <Icon key={index} name="star" className="size-2.5" />
        ))}
      </span>
      {count} Stars
    </Chip>
  );
}
