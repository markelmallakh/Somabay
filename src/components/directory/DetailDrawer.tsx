"use client";

import type { CSSProperties } from "react";
import type { DirectoryItem } from "@/types/content";
import { MediaSlider } from "@/components/media/MediaSlider";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Dialog } from "@/components/ui/Dialog";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";
import { PriceFrom } from "@/components/ui/PriceFrom";
import { StarChip } from "@/components/sections/holidays/StarChip";

type DetailDrawerProps = {
  items: DirectoryItem[];
  /** Index of the open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/** Side drawer with an image slider and details; steps through the items it was opened from. */
export function DetailDrawer({ items, index, onClose, onNavigate }: DetailDrawerProps) {
  const item = index === null ? null : items[index];
  const position = index ?? 0;
  const count = items.length;

  return (
    <Dialog
      open={item !== null}
      onClose={onClose}
      label={item?.title ?? "Details"}
      variant="drawer"
    >
      {item ? (
        <article key={item.id} className="flex min-h-full flex-col">
          <div className="relative">
            <MediaSlider
              key={item.id}
              images={item.images}
              sizes="(min-width: 680px) 680px, 100vw"
              label={`${item.title} photos`}
              className="aspect-[4/3]"
            />
            <button
              type="button"
              onClick={onClose}
              className="wave absolute top-5 left-5 z-20 grid size-12 place-items-center rounded-md bg-white text-ink shadow-float transition-colors duration-500 hover:text-white"
              aria-label="Close"
              data-autofocus
            >
              <Icon name="close" className="size-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-5 p-6 md:p-10">
            {item.badges ? (
              <ul data-drawer-item style={stagger(0)} className="flex flex-wrap gap-2">
                {item.badges.stars ? (
                  <li>
                    <StarChip count={item.badges.stars} />
                  </li>
                ) : null}
                {item.badges.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
            ) : item.chip ? (
              <p data-drawer-item style={stagger(0)}>
                <Chip>{item.chip}</Chip>
              </p>
            ) : null}
            <div data-drawer-item style={stagger(1)} className="flex flex-col gap-2">
              <h2 className="text-heading-2">{item.title}</h2>
              {item.kicker ? <p className="text-body-md text-slate">{item.kicker}</p> : null}
            </div>
            {item.location ? (
              <p
                data-drawer-item
                style={stagger(2)}
                className="flex items-center gap-2 text-body-sm text-slate"
              >
                <Icon name="pin" className="size-4" />
                {item.location}
              </p>
            ) : null}
            {item.description ? (
              <p
                data-drawer-item
                style={stagger(3)}
                className="max-w-2xl whitespace-pre-line text-slate"
              >
                {item.description}
              </p>
            ) : null}
            {item.price ? (
              <div data-drawer-item style={stagger(4)} className="border-t border-line pt-5">
                <PriceFrom amount={item.price} />
              </div>
            ) : null}
            {item.action || item.secondaryAction ? (
              <div data-drawer-item style={stagger(4)} className="flex flex-wrap gap-3">
                {item.action ? (
                  <Button
                    href={item.action.href}
                    external={item.action.external}
                    variant="primary"
                    icon="chevron-right"
                  >
                    {item.action.label}
                  </Button>
                ) : null}
                {item.secondaryAction ? (
                  <Button
                    href={item.secondaryAction.href}
                    external={item.secondaryAction.external}
                    variant="outline"
                    icon={item.secondaryAction.external ? "arrow-up-right" : "chevron-right"}
                    className="border-turquoise text-turquoise-160"
                  >
                    {item.secondaryAction.label}
                  </Button>
                ) : null}
              </div>
            ) : null}

            <div
              data-drawer-item
              style={stagger(5)}
              className="mt-auto flex flex-col gap-6 border-t border-line pt-6 md:flex-row md:items-center md:justify-between"
            >
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-body-sm text-slate">
                {item.hours ? (
                  <li className="flex items-center gap-2">
                    <Icon name="clock" className="size-4.5" />
                    {item.hours}
                  </li>
                ) : null}
                {item.phones?.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 hover:text-ink"
                    >
                      <Icon name="phone" className="size-4.5" />
                      {phone}
                    </a>
                  </li>
                ))}
                {item.infoLink ? (
                  <li>
                    <SmartLink
                      href={item.infoLink.href}
                      external={item.infoLink.external}
                      className="flex items-center gap-2 font-semibold tracking-label text-ink uppercase hover:text-lagoon"
                    >
                      <Icon name="map" className="size-4.5" />
                      {item.infoLink.label}
                    </SmartLink>
                  </li>
                ) : null}
              </ul>
              {count > 1 ? (
                <div className="flex items-center gap-4">
                  <span className="text-body-sm text-slate" aria-live="polite">
                    {position + 1} / {count}
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="wave grid size-11 place-items-center rounded-md border border-line transition-colors duration-500 hover:border-turquoise hover:text-white"
                      onClick={() => onNavigate((position - 1 + count) % count)}
                      aria-label="Previous item"
                    >
                      <Icon name="chevron-left" className="size-4" />
                    </button>
                    <button
                      type="button"
                      className="wave grid size-11 place-items-center rounded-md border border-line transition-colors duration-500 hover:border-turquoise hover:text-white"
                      onClick={() => onNavigate((position + 1) % count)}
                      aria-label="Next item"
                    >
                      <Icon name="chevron-right" className="size-4" />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ) : null}
    </Dialog>
  );
}
