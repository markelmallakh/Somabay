import type { EventItem } from "@/types/content";

export const eventCategories = [
  { value: "sports", label: "Sports Event" },
  { value: "corporate", label: "Corporate Event" },
  { value: "mega", label: "Mega Event" },
] as const;

export const categoryLabel = (value: EventItem["category"]) =>
  eventCategories.find((category) => category.value === value)?.label ?? value;
