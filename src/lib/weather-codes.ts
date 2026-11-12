import type { IconName } from "@/components/ui/Icon";

/** Plain-language label and icon for a WMO weather code (as used by Open-Meteo). */
export function describeWeather(code: number, isDay = true): { label: string; icon: IconName } {
  if (code === 0) return { label: isDay ? "Sunny" : "Clear", icon: isDay ? "sun" : "moon" };
  if (code === 1) return { label: "Mostly sunny", icon: isDay ? "sun" : "moon" };
  if (code === 2) return { label: "Partly cloudy", icon: "cloud-sun" };
  if (code === 3) return { label: "Cloudy", icon: "cloud" };
  if (code === 45 || code === 48) return { label: "Fog", icon: "cloud-fog" };
  if (code >= 51 && code <= 57) return { label: "Drizzle", icon: "cloud-rain" };
  if (code >= 61 && code <= 67) return { label: "Rain", icon: "cloud-rain" };
  if (code >= 71 && code <= 77) return { label: "Snow", icon: "cloud" };
  if (code >= 80 && code <= 82) return { label: "Showers", icon: "cloud-rain" };
  if (code >= 85 && code <= 86) return { label: "Snow showers", icon: "cloud" };
  if (code >= 95) return { label: "Thunderstorms", icon: "cloud-lightning" };
  return { label: "Fair", icon: "cloud-sun" };
}
