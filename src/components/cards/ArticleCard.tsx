import { Chip } from "@/components/ui/Chip";
import Link from "next/link";
import { routes } from "@/config/routes";
import { formatLongDate } from "@/lib/dates";
import type { Article } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";

export function ArticleCard({
  article,
  showDate = false,
  tinted = false,
}: {
  article: Article;
  showDate?: boolean;
  /** On a tinted (sand/turquoise) section the category chip turns white. */
  tinted?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[426/326] overflow-hidden rounded-card bg-sand-200">
        <ResponsiveImage
          asset={article.image}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
          fill
          className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
        />
      </div>
      <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-caption">
        <Chip tone={tinted ? "plain" : "soft"}>{article.category}</Chip>
        <span className="text-slate">{article.readingMinutes} min read</span>
        {showDate ? (
          <span className="flex items-center gap-1.5 text-slate">
            <Icon name="calendar" className="size-3.5" />
            <time dateTime={article.date}>{formatLongDate(article.date)}</time>
          </span>
        ) : null}
      </p>
      <h3 className="mt-3 font-serif text-h4">
        <Link href={routes.article(article.slug)} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p
        aria-hidden
        className="mt-auto inline-flex items-center gap-2 pt-4 text-[0.75rem] font-semibold tracking-label uppercase"
      >
        <span className="link-underline pb-0.5 group-hover:[background-size:100%_1px]">
          Read more
        </span>
        <Icon
          name="chevron-right"
          className="size-3.5 transition-transform duration-500 group-hover:translate-x-1"
        />
      </p>
    </article>
  );
}
