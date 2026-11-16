import { cn } from "@/lib/utils";

/**
 * Each journal category in one of the brand's secondary colours: news in dusk purple, blog
 * posts in deep orange; anything else turquoise.
 */
export const postCategoryFill = (category: string) =>
  /news/i.test(category)
    ? "bg-dusk-purple"
    : /blog/i.test(category)
      ? "bg-deep-orange"
      : "bg-turquoise-160";

/**
 * A post's category as a small filled badge, set over the top-left corner of its photo on every
 * journal widget (homepage, journal listing, related stories).
 */
export function PostBadge({ category, className }: { category: string; className?: string }) {
  return (
    <span
      className={cn(
        "absolute top-4 left-4 z-10 inline-flex items-center rounded-md px-2.5 py-[0.3125rem] text-[0.6875rem] leading-none font-semibold tracking-[0.12em] whitespace-nowrap text-white uppercase",
        postCategoryFill(category),
        className,
      )}
    >
      {category}
    </span>
  );
}
