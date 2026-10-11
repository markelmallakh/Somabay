"use client";

import { AnimatePresence, m } from "framer-motion";
import { useState } from "react";
import { mainMenu } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { easeOutExpo } from "@/components/animations/easing";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { MenuFooter } from "./MenuFooter";
import { MenuPrimaryList } from "./MenuPrimaryList";
import { MenuSecondaryPanel } from "./MenuSecondaryPanel";

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
  temperature: number | null;
};

export function MenuOverlay({ open, onClose, temperature }: MenuOverlayProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  /** Mobile drill-down: index of the item whose sub-panel is open. */
  const [drilledIndex, setDrilledIndex] = useState<number | null>(null);
  const active = mainMenu[activeIndex];
  const drilled = drilledIndex === null ? null : mainMenu[drilledIndex];

  const close = () => {
    setDrilledIndex(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={close} label="Site menu" className="bg-sand-50 text-ink">
      <div className="mx-auto flex h-full max-w-site flex-col px-gutter pb-6">
        <div className="flex h-(--header-height) shrink-0 items-center justify-between">
          <p className="rounded-sm bg-sand-200 px-3 py-1.5 text-[0.6875rem] font-semibold tracking-label uppercase">
            <span className="sr-only">Language: </span>
            {siteConfig.languages[0].label}
          </p>
          <button
            type="button"
            onClick={close}
            className="group -mr-2 grid size-12 place-items-center"
            aria-label="Close menu"
          >
            <Icon
              name="close"
              className="size-8 stroke-1 transition-transform duration-700 ease-out-expo group-hover:rotate-90"
            />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-12">
          <div className="relative flex min-h-0 flex-col overflow-y-auto bg-sand-100 p-6 md:p-10 lg:col-span-5">
            <div className="relative flex-1">
              <AnimatePresence mode="wait" initial={false}>
                {drilled ? (
                  <m.div
                    key="drill"
                    className="lg:hidden"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24 }}
                    transition={{ duration: 0.5, ease: easeOutExpo }}
                  >
                    <button
                      type="button"
                      onClick={() => setDrilledIndex(null)}
                      className="eyebrow mb-8 flex items-center gap-2 text-lagoon"
                    >
                      <Icon name="chevron-left" className="size-4" />
                      Back
                    </button>
                    <p className="mb-6 font-serif text-h3">{drilled.label}</p>
                    <MenuSecondaryPanel item={drilled} onNavigate={close} />
                  </m.div>
                ) : (
                  <m.div
                    key="primary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <MenuPrimaryList
                      activeIndex={activeIndex}
                      onActivate={setActiveIndex}
                      onDrill={setDrilledIndex}
                      onNavigate={close}
                    />
                  </m.div>
                )}
              </AnimatePresence>
            </div>
            <MenuFooter temperature={temperature} onNavigate={close} />
          </div>

          <div
            className={cn(
              "hidden bg-sand-100 p-10 lg:col-span-3 lg:block",
              !active.groups && "lg:hidden",
            )}
          >
            <AnimatePresence mode="wait">
              {active.groups ? (
                <m.div
                  key={active.label}
                  className="h-full"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                >
                  <MenuSecondaryPanel item={active} onNavigate={close} />
                </m.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div
            className={cn(
              "relative hidden overflow-hidden bg-sand-200 lg:block",
              active.groups ? "lg:col-span-4" : "lg:col-span-7",
            )}
          >
            <AnimatePresence initial={false}>
              <m.div
                key={active.label}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: easeOutExpo }}
              >
                <ResponsiveImage asset={active.image} sizes="(min-width: 1024px) 60vw, 0px" fill />
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
