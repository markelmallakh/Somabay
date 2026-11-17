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
      <ol
        className={cn(
          "flex flex-wrap items-center justify-center gap-2 text-body-sm sm:justify-start",
          tone === "light" ? "text-white/75" : "text-slate",
        )}
      >
        {trail.map((item, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {current ? (
                <span aria-current="page" className={tone === "light" ? "text-white" : "text-ink"}>
                  {item.label}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="link-underline">
                    {item.label}
                  </Link>
                  <Icon name="chevron-right" className="size-3 opacity-60" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
