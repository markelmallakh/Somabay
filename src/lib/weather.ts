import { cacheLife } from "next/cache";
import { siteConfig } from "@/config/site";

export type CurrentWeather = {
  temperature: number;
  isDay: boolean;
};

type OpenMeteoResponse = {
  current?: { temperature_2m?: number; is_day?: number };
};

/**
 * Current conditions at Somabay from Open-Meteo (free, no API key). Cached for an hour so the
 * header never waits on the network; returns null if the service is unavailable.
 */
export async function getCurrentWeather(): Promise<CurrentWeather | null> {
  "use cache";
  cacheLife("hours");

  const { latitude, longitude } = siteConfig.location;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day&timezone=Africa%2FCairo`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    if (!response.ok) return null;
    const data: OpenMeteoResponse = await response.json();
    const temperature = data.current?.temperature_2m;
    if (typeof temperature !== "number") return null;
    return { temperature: Math.round(temperature), isDay: data.current?.is_day === 1 };
  } catch {
    return null;
  }
}
