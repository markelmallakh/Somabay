import { HeaderBar } from "@/components/navigation/HeaderBar";
import { getCurrentWeather } from "@/lib/weather";

export async function SiteHeader() {
  const weather = await getCurrentWeather();
  return <HeaderBar temperature={weather?.temperature ?? null} />;
}
