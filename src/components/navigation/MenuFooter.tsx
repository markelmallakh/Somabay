import Link from "next/link";
import type { HeaderData, NavLink } from "@/types/navigation";
import { Button } from "@/components/ui/Button";

type MenuFooterProps = {
  temperature: number | null;
  onNavigate: () => void;
  utilityLinks: NavLink[];
  actions: HeaderData["actions"];
};

export function MenuFooter({ onNavigate, utilityLinks, actions }: MenuFooterProps) {
  return (
    <div className="mt-8 flex flex-col gap-6">
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-white/15 pb-6 font-sans text-body-sm font-medium tracking-[0.08em] text-white/85 uppercase">
        {utilityLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={onNavigate} className="link-underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          href={actions.contact.href}
          variant="light"
          icon="chevron-right"
          iconPosition="start"
          onClick={onNavigate}
        >
          {actions.contact.label}
        </Button>
        <Button
          href={actions.virtualTour.href}
          external
          variant="outline-light"
          icon="cube"
          iconPosition="start"
        >
          {actions.virtualTour.label}
        </Button>
      </div>
    </div>
  );
}
