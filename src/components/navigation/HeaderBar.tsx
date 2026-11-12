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
  const { scrolled } = useHeaderScroll();
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

  const backdropOverHero = hasDarkHero(pathname) && !scrolled;
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

  const divider = <span aria-hidden className="h-6 w-px bg-current opacity-30" />;

  return (
    <>
      {/* The header's backdrop sits in its own layer beneath the menu, so the menu's circle sweeps
          over it instead of being sliced along the header's edge; the bar itself stays on top. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-[29] transition-[transform,height,background-color,box-shadow] duration-700 ease-out-expo",
          scrolled ? "h-16" : "h-(--header-height)",
          atFooter && !menuOpen && !searchOpen && "-translate-y-full",
          backdropOverHero
            ? "bg-linear-to-b from-black/45 to-transparent"
            : "bg-white/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl",
        )}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-[transform,color] duration-700 ease-out-expo",
          atFooter && !menuOpen && !searchOpen && "-translate-y-full",
          onDark ? "text-white" : "text-ink",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-site items-center justify-between gap-6 px-gutter transition-[height] duration-700 ease-out-expo",
            scrolled ? "h-16" : "h-(--header-height)",
          )}
        >
          <Link href={routes.home} className="relative z-10 shrink-0" aria-label="Somabay — home">
            <Logo
              tone={onDark ? "light" : "brand"}
              title="Somabay"
              className={cn(
                "transition-[width] duration-700 ease-out-expo",
                scrolled ? "w-22 lg:w-24" : "w-26 lg:w-31",
              )}
            />
          </Link>

          <nav
            aria-label="Utility"
            className="flex items-center gap-5 text-body-xs font-semibold lg:gap-6"
          >
            <button
              type="button"
              onClick={openSearch}
              className="flex items-center gap-1 transition-opacity hover:opacity-70"
            >
              <Icon name="search" className="size-4.5" />
              <span className="sr-only uppercase md:not-sr-only">Search</span>
            </button>
            <span className="hidden lg:contents">
              {divider}
              {temperature !== null ? (
                forecast ? (
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
                    className="flex items-center gap-1 transition-opacity hover:opacity-70"
                  >
                    <Icon name="cloud-sun" className="size-5.5" />
                    <span>
                      <span className="sr-only">Weather forecast. Current temperature: </span>
                      {temperature}°C
                    </span>
                  </button>
                ) : (
                  <p className="flex items-center gap-1">
                    <Icon name="cloud-sun" className="size-5.5" />
                    <span>
                      <span className="sr-only">Current temperature at Somabay: </span>
                      {temperature}°C
                    </span>
                  </p>
                )
              ) : null}
              {temperature !== null ? divider : null}
              <LanguageMenu />
              {divider}
            </span>
            <a
              href={siteConfig.contact.hotlineHref}
              className="hidden items-center gap-1 text-body-sm transition-opacity hover:opacity-70 md:flex"
            >
              <Icon name="phone" className="size-5.5" />
              <span>
                <span className="sr-only">Call our hotline </span>
                {siteConfig.contact.hotline}
              </span>
            </a>
            <button
              ref={menuButton}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className={cn(
                "group relative z-10 shrink-0 transition-colors duration-500",
                menuOpen && "hover:text-sun focus-visible:text-sun",
              )}
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              {/* Figma "menu-03": staggered lines that swap sides on hover, folding into an X that turns
                  turquoise and draws in slightly on hover. */}
              <svg
                aria-hidden
                viewBox="0 0 57 30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="h-[1.875rem] w-[3.5625rem] overflow-visible"
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
            </button>
          </nav>
        </div>
      </header>

      {menuLoaded ? (
        <MenuOverlay
          open={menuOpen}
          onClose={closeMenu}
          origin={menuOrigin}
          temperature={temperature}
          data={data}
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
      {searchLoaded ? (
        <SearchDialog
          open={searchOpen}
          onClose={() => setSearchOpen(false)}
          index={data.searchIndex}
          cards={data.searchCards}
        />
      ) : null}
    </>
  );
}
