"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { hasDarkHero, routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import type { HeaderData } from "@/types/navigation";
import type { WeatherForecast } from "@/lib/weather";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";
import { easeOutExpo } from "@/components/animations/easing";
import { HEADER_TAB_LABELS, HeaderTabs } from "./HeaderTabs";
import { LanguageMenu } from "./LanguageMenu";
import { useHeaderScroll } from "./useHeaderScroll";

const MenuOverlay = dynamic(() => import("./MenuOverlay").then((module) => module.MenuOverlay));
const SearchDialog = dynamic(() => import("./SearchDialog").then((module) => module.SearchDialog));
const WeatherDialog = dynamic(() =>
  import("./WeatherDialog").then((module) => module.WeatherDialog),
);

/** Menu icon lines: the Figma "menu-03" bars, and the X they fold into when the menu is open. */
const MENU_LINES = [
  {
    closed: "M23.75 6.25L47.5 6.25",
    open: "M24.5 6L42.5 24",
    hover: "group-hover:-translate-x-[14.25px]",
  },
  { closed: "M9.5 15L47.5 15", open: "M33.5 15L33.5 15", hover: "" },
  {
    closed: "M9.5 23.75L33.25 23.75",
    open: "M24.5 24L42.5 6",
    hover: "group-hover:translate-x-[14.25px]",
  },
];

type HeaderBarProps = {
  temperature: number | null;
  /** Full forecast for the weather popup opened from the temperature. */
  forecast: WeatherForecast | null;
  data: HeaderData;
};

export function HeaderBar({ temperature, forecast, data }: HeaderBarProps) {
  const pathname = usePathname();
  // The header stays put while scrolling and condenses into a compact bar.
  const { scrolled: pastTop, up } = useHeaderScroll();
  // Scrolling down folds the tabs row away, leaving the logo bar on white; scrolling back up
  // anywhere on the page brings the tabs back. Only the tabs row moves, so the switch stays calm.
  const scrolled = pastTop && !up;
  const solid = pastTop;
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0 });
  const menuButton = useRef<HTMLButtonElement>(null);
  const [searchLoaded, setSearchLoaded] = useState(false);
  const [weatherOpen, setWeatherOpen] = useState(false);
  const [weatherLoaded, setWeatherLoaded] = useState(false);
  const [weatherAnchor, setWeatherAnchor] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);
  // A header tab's mega menu is open: the bar and the panel read as one white sheet.
  const [megaOpen, setMegaOpen] = useState(false);
  const tabItems = data.menu.filter((item) => HEADER_TAB_LABELS.includes(item.label));
  // The footer carries the weather and language too, so the bar steps aside once it arrives.
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), {
      rootMargin: "0px 0px -20% 0px",
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const backdropOverHero = hasDarkHero(pathname) && !solid && !megaOpen;
  const overHero = backdropOverHero && !menuOpen;
  // Light (white) header over a dark hero, and over the open menu's deep turquoise screen.
  const onDark = overHero || menuOpen;

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  }, []);
  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
      return;
    }
    const box = menuButton.current?.getBoundingClientRect();
    if (box) setMenuOrigin({ x: box.left + box.width / 2, y: box.top + box.height / 2 });
    setMenuLoaded(true);
    setMenuOpen(true);
  };
  const openSearch = () => {
    setSearchLoaded(true);
    setSearchOpen(true);
  };

  const divider = <span aria-hidden className="h-5 w-px bg-current opacity-30" />;
  // The tabs row folds away once the page scrolls (the bar condenses) and under the open menu.
  const showTabs = !scrolled && !menuOpen;
  const hidden = atFooter && !menuOpen && !searchOpen;

  return (
    <>
      {/* The header's backdrop sits in its own layer beneath the menu, so the menu's circle sweeps
          over it instead of being sliced along the header's edge; the bar itself stays on top. */}
      {/* Two layers cross-fade, since a gradient can't animate into a colour: the dark-hero shade
          and the frosted white sheet. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[29] transition-[transform,height] duration-500 ease-in-out",
          scrolled ? "h-(--header-bar)" : "h-(--header-height)",
          hidden && "-translate-y-full",
        )}
      >
        {/* Over a dark hero: a tall, eased shade that fades out well below the header, so it
            reads as soft light falloff rather than a band with an edge. */}
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[calc(var(--header-height)+9rem)] bg-[linear-gradient(to_bottom,rgb(0_0_0/0.62)_0%,rgb(0_0_0/0.5)_30%,rgb(0_0_0/0.3)_55%,rgb(0_0_0/0.12)_78%,rgb(0_0_0/0.03)_92%,transparent_100%)] transition-opacity duration-300 ease-out",
            backdropOverHero ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Frosted white: translucent, with the page softly blurred through it. With a mega menu
            open it turns solid, so the bar and the white panel read as one sheet and the tabs keep
            their full contrast. */}
        <div
          className={cn(
            "absolute inset-0 shadow-[0_10px_32px_-14px_rgb(18_58_70/0.1)] backdrop-blur-lg backdrop-saturate-150 transition-[opacity,background-color] duration-500 ease-in-out",
            megaOpen ? "bg-white" : "bg-white/75",
            backdropOverHero ? "opacity-0" : "opacity-100",
          )}
        />
      </div>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[transform,color] duration-500 ease-in-out",
          hidden && "-translate-y-full",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {/* Logo bar: menu and search on the left, the logo centred, weather, language and the
            hotline on the right. */}
        <div className="mx-auto grid h-(--header-bar) max-w-site grid-cols-[1fr_auto_1fr] items-center gap-6 px-gutter text-body-xs font-semibold">
          <div className="flex items-center gap-5 lg:gap-6">
            <button
              ref={menuButton}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className={cn(
                "group relative z-10 flex shrink-0 items-center gap-3 transition-colors duration-500",
                menuOpen && "hover:text-sun focus-visible:text-sun",
              )}
            >
              {/* Figma "menu-03": staggered lines that swap sides on hover, folding into an X that
                  draws in slightly on hover. */}
              <svg
                aria-hidden
                viewBox="0 0 57 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-[1.375rem] w-[2.625rem] overflow-visible"
              >
                {MENU_LINES.map((line, index) => (
                  <m.path
                    key={index}
                    initial={false}
                    animate={{
                      d: menuOpen ? line.open : line.closed,
                      opacity: menuOpen && index === 1 ? 0 : 1,
                    }}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: menuOpen ? 0.1 : 0 }}
                    className={cn(
                      "transition-transform duration-700 ease-out-expo",
                      !menuOpen && line.hover,
                      menuOpen && "group-hover:scale-[0.82] group-focus-visible:scale-[0.82]",
                    )}
                    style={{ transformOrigin: "33.5px 15px", transformBox: "view-box" }}
                  />
                ))}
              </svg>
              <span className="tracking-[0.12em] uppercase">
                {menuOpen ? "Close" : "Menu"}
                <span className="sr-only"> site menu</span>
              </span>
            </button>
            <span className="hidden md:contents">{divider}</span>
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Icon name="search" className="size-5" />
              <span className="sr-only tracking-[0.12em] uppercase md:not-sr-only">Search</span>
            </button>
          </div>

          <Link href={routes.home} className="relative z-10 shrink-0" aria-label="Somabay — home">
            <Logo tone={onDark ? "light" : "brand"} title="Somabay" className="w-28 lg:w-36" />
          </Link>

          <nav aria-label="Utility" className="flex items-center justify-end gap-5 lg:gap-6">
            <span className="hidden lg:contents">
              {temperature !== null ? (
                <>
                  {forecast ? (
                    <button
                      type="button"
                      onClick={(event) => {
                        const box = event.currentTarget.getBoundingClientRect();
                        setWeatherAnchor({
                          left: box.left,
                          top: box.top,
                          width: box.width,
                          height: box.height,
                        });
                        setWeatherLoaded(true);
                        setWeatherOpen(true);
                      }}
                      aria-haspopup="dialog"
                      className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                    >
                      <Icon name="cloud-sun" className="size-5" />
                      <span>
                        <span className="sr-only">Weather forecast. Current temperature: </span>
                        {temperature}°C
                      </span>
                    </button>
                  ) : (
                    <p className="flex items-center gap-1.5">
                      <Icon name="cloud-sun" className="size-5" />
                      <span>
                        <span className="sr-only">Current temperature at Somabay: </span>
                        {temperature}°C
                      </span>
                    </p>
                  )}
                  {divider}
                </>
              ) : null}
              <LanguageMenu />
              {divider}
            </span>
            <a
              href={siteConfig.contact.hotlineHref}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
            >
              <Icon name="phone" className="size-5" />
              <span className="sr-only md:not-sr-only">
                <span className="sr-only">Call our hotline </span>
                {siteConfig.contact.hotline}
              </span>
            </a>
          </nav>
        </div>

        {/* Tabs row: a hairline under the logo bar, then the three main sections, each opening its
            mega menu (which drops from this row's foot). */}
        <div
          className={cn(
            "relative hidden transition-[height,opacity] duration-500 ease-in-out lg:block",
            showTabs ? "h-(--header-tabs) opacity-100" : "pointer-events-none h-0 opacity-0",
          )}
        >
          <div className="mx-auto h-full max-w-site px-gutter">
            <div className="h-full border-t border-current/15">
              <HeaderTabs items={tabItems} onOpenChange={setMegaOpen} onDark={onDark} />
            </div>
          </div>
        </div>
      </header>

      {menuLoaded ? (
        <MenuOverlay open={menuOpen} onClose={closeMenu} origin={menuOrigin} data={data} />
      ) : null}
      {searchLoaded ? (
        <SearchDialog
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          index={data.searchIndex}
          cards={data.searchCards}
        />
      ) : null}
      {weatherLoaded && forecast ? (
        <WeatherDialog
          open={weatherOpen}
          onClose={() => setWeatherOpen(false)}
          forecast={forecast}
          anchor={weatherAnchor}
        />
      ) : null}
    </>
  );
}
