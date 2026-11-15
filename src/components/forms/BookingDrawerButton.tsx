"use client";

import { type CSSProperties, useState } from "react";
import type { FormDefinition } from "@/lib/forms";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

type BookingDrawerButtonProps = {
  /** The button's label, e.g. "Book a boat trip". */
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  /** The same form definition the Things To Do booking sections use. */
  definition: FormDefinition;
  /** Sent with the request so the team knows where it came from. */
  context: string;
};

/**
 * A call to action that opens a booking form in the site's side drawer, for pages without a
 * booking section of their own: the eyebrow, a short title and line, then the same enquiry form
 * the Things To Do pages use.
 */
export function BookingDrawerButton({
  label,
  eyebrow,
  title,
  description,
  definition,
  context,
}: BookingDrawerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="primary" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} label={title} variant="drawer">
        <div className="relative flex min-h-full flex-col p-6 sm:p-10 lg:p-12">
          {/* Phones: the close button inside the drawer (wider screens have it outside). */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-md text-ink md:hidden"
          >
            <Icon name="close" className="size-5" />
          </button>
          <div data-drawer-item style={{ "--i": 0 } as CSSProperties}>
            {/* Turquoise on the white drawer, even when opened from a dark section. */}
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h2 className="mt-2 text-heading-3">{title}</h2>
            <p className="mt-2 max-w-lg text-body-md text-slate">{description}</p>
          </div>
          <div data-drawer-item style={{ "--i": 1 } as CSSProperties} className="mt-8">
            <EnquiryForm definition={definition} context={context} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
