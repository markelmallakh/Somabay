import { HeaderBar } from "@/components/navigation/HeaderBar";
import { headerData } from "@/config/navigation";
import { getWeatherForecast } from "@/lib/weather";

export async function SiteHeader() {
  const forecast = await getWeatherForecast();
  return (
    <HeaderBar
      temperature={forecast?.current.temperature ?? null}
      forecast={forecast}
      data={headerData}
    />
  );
}
