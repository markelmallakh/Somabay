import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import type { NavLink } from "@/types/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Icon } from "@/components/ui/Icon";

type BreadcrumbsProps = {
  /** Trail after Home; the last item is the current page. */
  items: NavLink[];
  tone?: "light" | "dark";
  className?: string;
};

export function Breadcrumbs({ items, tone = "dark", className }: BreadcrumbsProps) {
  const trail: NavLink[] = [{ label: "Home", href: "/" }, ...items];
  const structured = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteConfig.url}${item.href === "/" ? "" : item.href}`,
    })),
  };
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <JsonLd data={structured} />
      {/* Phones: a very small trail laid out inline, so it follows the text alignment of the
          heading block it sits in (left under a left-aligned title, centred over a centred one). */}
      <ol
        className={cn(
          "text-[0.6875rem] leading-snug sm:flex sm:flex-wrap sm:items-center sm:gap-2 sm:text-body-sm",
          tone === "light" ? "text-white/75" : "text-slate",
        )}
      >
        {trail.map((item, index) => {
          const current = index === trail.length - 1;
          return (
            <li
              key={item.href}
              className="inline-flex items-center gap-1 align-middle not-last:mr-1 sm:flex sm:gap-2 sm:not-last:mr-0"
            >
              {current ? (
                <span aria-current="page" className={tone === "light" ? "text-white" : "text-ink"}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                  <Icon name="chevron-right" className="size-2.5 opacity-60 sm:size-3" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
