const utc = { timeZone: "UTC" } as const;

const dayFormat = new Intl.DateTimeFormat("en-US", { ...utc, day: "2-digit" });
const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  ...utc,
  month: "short",
  year: "numeric",
});
const longFormat = new Intl.DateTimeFormat("en-GB", {
  ...utc,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);

export const formatDay = (iso: string) => dayFormat.format(parse(iso));
export const formatMonthYear = (iso: string) => monthYearFormat.format(parse(iso));
export const formatLongDate = (iso: string) => longFormat.format(parse(iso));

/** "21 – 22" for multi-day events, "20" for single days. */
export const formatDayRange = (start: string, end?: string) =>
  end && end !== start ? `${formatDay(start)} – ${formatDay(end)}` : formatDay(start);

export const formatLongRange = (start: string, end?: string) =>
  end && end !== start
    ? `${formatLongDate(start)} – ${formatLongDate(end)}`
    : formatLongDate(start);
