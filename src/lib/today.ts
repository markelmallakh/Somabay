import { cacheLife } from "next/cache";

/** Today's date (UTC, YYYY-MM-DD), refreshed daily so static pages stay prerenderable. */
export async function getToday(): Promise<string> {
  "use cache";
  cacheLife("days");
  return new Date().toISOString().slice(0, 10);
}
