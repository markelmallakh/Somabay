"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { useHeaderScroll } from "./useHeaderScroll";

const MenuOverlay = dynamic(() => import("./MenuOverlay").then((module) => module.MenuOverlay));
const SearchDialog = dynamic(() => import("./SearchDialog").then((module) => module.SearchDialog));

/** Routes that open with a full-bleed dark hero, so the header starts transparent. */
const heroRoutes = new Set<string>([routes.home]);

type HeaderBarProps = {
  temperature: number | null;
};

export function HeaderBar({ temperature }: HeaderBarProps) {
  const pathname = usePathname();
  const { scrolled, hidden } = useHeaderScroll();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [searchLoaded, setSearchLoaded] = useState(false);

  const overHero = heroRoutes.has(pathname) && !scrolled;
  const language = siteConfig.languages[0];

  const openMenu = () => {
    setMenuLoaded(true);
    setMenuOpen(true);
  };
  const openSearch = () => {
    setSearchLoaded(true);
    setSearchOpen(true);
  };

  const divider = <span aria-hidden className="h-5 w-px bg-current opacity-25" />;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,color,box-shadow] duration-700 ease-out-expo",
          overHero
            ? "bg-linear-to-b from-black/45 to-transparent text-white"
            : "bg-sand-50/92 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl",
          hidden && !menuOpen && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex h-(--header-height) max-w-site items-center justify-between gap-6 px-gutter">
          <Link href={routes.home} className="relative z-10 shrink-0" aria-label="Somabay — home">
            <Logo tone={overHero ? "light" : "brand"} className="w-34 md:w-42" title="Somabay" />
          </Link>

          <nav aria-label="Utility" className="flex items-center gap-5 text-[0.8125rem] lg:gap-7">
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Icon name="search" className="size-4.5" />
              <span className="sr-only md:not-sr-only">Search</span>
            </button>
            <span className="hidden lg:contents">
              {divider}
              {temperature !== null ? (
                <p className="flex items-center gap-2">
                  <Icon name="cloud-sun" className="size-5" />
                  <span>
                    <span className="sr-only">Current temperature at Somabay: </span>
                    {temperature}°C
                  </span>
                </p>
              ) : null}
              {temperature !== null ? divider : null}
              <p className="tracking-[0.12em] uppercase">
                <span className="sr-only">Language: </span>
                {language.label}
              </p>
              {divider}
            </span>
            <a
              href={siteConfig.contact.hotlineHref}
              className="hidden items-center gap-2 transition-opacity hover:opacity-70 md:flex"
            >
              <Icon name="phone" className="size-4.5" />
              <span>
                <span className="sr-only">Call our hotline </span>
                {siteConfig.contact.hotline}
              </span>
            </a>
            <button
              type="button"
              onClick={openMenu}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="group -mr-2 flex h-11 w-14 flex-col items-end justify-center gap-[7px] p-2"
            >
              <span className="sr-only">Open menu</span>
              <span className="h-px w-full origin-right bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-75" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full origin-right bg-current transition-transform duration-500 ease-out-expo group-hover:scale-x-50" />
            </button>
          </nav>
        </div>
      </header>

      {menuLoaded ? (
        <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} temperature={temperature} />
      ) : null}
      {searchLoaded ? (
        <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      ) : null}
    </>
  );
}
