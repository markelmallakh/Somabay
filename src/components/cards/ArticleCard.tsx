import Link from "next/link";
import { routes } from "@/config/routes";
import { formatLongDate } from "@/lib/dates";
import type { Article } from "@/types/content";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Icon } from "@/components/ui/Icon";
import { PostBadge } from "@/components/ui/PostBadge";

export function ArticleCard({
  article,
  showDate = false,
  tinted: _tinted = false,
}: {
  article: Article;
  showDate?: boolean;
  /** Kept for existing call sites; the category now sits on the photo. */
  tinted?: boolean;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[426/326] overflow-hidden rounded-md bg-sand-200">
        <ResponsiveImage
          asset={article.image}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 85vw"
          fill
          className="transition-transform duration-[1600ms] ease-out-expo group-hover:scale-[1.05]"
        />
        <PostBadge category={article.category} />
      </div>
      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-body-sm sm:mt-5">
        <span className="text-slate">{article.readingMinutes} min read</span>
        {showDate ? (
          <span className="flex items-center gap-1.5 text-slate">
            <Icon name="calendar" className="size-3.5" />
            <time dateTime={article.date}>{formatLongDate(article.date)}</time>
          </span>
        ) : null}
      </p>
      <h3 className="mt-2.5 font-serif text-heading-5 sm:mt-3 sm:text-heading-6">
        <Link href={routes.article(article.slug)} className="after:absolute after:inset-0">
          {article.title}
        </Link>
      </h3>
      <p
        aria-hidden
        className="mt-auto inline-flex items-center gap-2 pt-3 text-body-xs font-semibold tracking-label text-turquoise uppercase sm:pt-4"
      >
        <span className="link-underline pb-0.5 group-hover:[background-size:100%_1px]">
          Read more
        </span>
        <Icon
          name="arrow-right"
          className="size-4 transition-transform duration-700 ease-out-expo group-hover:translate-x-1"
        />
      </p>
    </article>
  );
}
