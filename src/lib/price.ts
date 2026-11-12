import type { Hotel } from "@/types/content";

/** Placeholder until each hotel's live rate is connected. */
export const PRICE_PLACEHOLDER = "$120";

/** The hotel's "starting from" nightly price, or the placeholder. */
export const hotelPrice = (hotel: Pick<Hotel, "priceFrom">) => hotel.priceFrom ?? PRICE_PLACEHOLDER;
