import Link from "next/link";
import type { MenuItem } from "@/types/navigation";
import { Icon } from "@/components/ui/Icon";

type MenuSecondaryPanelProps = {
  item: MenuItem;
  onNavigate: () => void;
};

export function MenuSecondaryPanel({ item, onNavigate }: MenuSecondaryPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <ul className="flex flex-col gap-4">
        {item.groups?.map((group) => (
          <li key={group.href}>
            <Link
              href={group.href}
              onClick={onNavigate}
              className="link-underline font-serif text-h4 transition-colors hover:text-lagoon"
            >
              {group.label}
            </Link>
            {group.children ? (
              <ul className="mt-4 mb-2 flex flex-col gap-2.5 border-l border-line pl-4">
                {group.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className="group flex items-center gap-2 text-[0.9375rem] text-slate transition-colors hover:text-ink"
                    >
                      <Icon
                        name="chevron-right"
                        className="size-3 transition-transform duration-500 group-hover:translate-x-0.5"
                      />
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
      {item.footerLink ? (
        <Link
          href={item.footerLink.href}
          onClick={onNavigate}
          className="group mt-auto flex items-center justify-between border-t border-line pt-5 font-serif text-h4"
        >
          {item.footerLink.label}
          <Icon
            name="arrow-right"
            className="size-5 transition-transform duration-500 group-hover:translate-x-1"
          />
        </Link>
      ) : null}
    </div>
  );
}
