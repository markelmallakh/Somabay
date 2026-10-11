import Link from "next/link";
import { menuActions, menuUtilityLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type MenuFooterProps = {
  temperature: number | null;
  onNavigate: () => void;
};

export function MenuFooter({ temperature, onNavigate }: MenuFooterProps) {
  return (
    <div className="mt-10 flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Button
          href={menuActions.contact.href}
          variant="solid"
          icon="chevron-right"
          iconPosition="start"
          onClick={onNavigate}
        >
          {menuActions.contact.label}
        </Button>
        <Button
          href={menuActions.virtualTour.href}
          external
          variant="outline"
          icon="cube"
          iconPosition="start"
        >
          {menuActions.virtualTour.label}
        </Button>
      </div>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-line pt-6 font-serif text-[1.0625rem]">
        {menuUtilityLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} onClick={onNavigate} className="link-underline">
              {link.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href={siteConfig.contact.hotlineHref}
            className="flex items-center gap-1.5 hover:text-lagoon"
          >
            <Icon name="phone" className="size-4" />
            {siteConfig.contact.hotline}
          </a>
        </li>
        {temperature !== null ? (
          <li className="flex items-center gap-1.5">
            <Icon name="cloud-sun" className="size-4.5" />
            <span className="sr-only">Current temperature: </span>
            {temperature}°C
          </li>
        ) : null}
      </ul>
    </div>
  );
}
