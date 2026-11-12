import { cacheLife } from "next/cache";
import { siteConfig } from "@/config/site";

export type CurrentWeather = {
  temperature: number;
  isDay: boolean;
};

export type ForecastDay = {
  /** Local date, YYYY-MM-DD. */
  date: string;
  /** WMO weather code. */
  code: number;
  max: number;
  min: number;
  /** Chance of rain, %. */
  rain: number | null;
  /** Max wind, km/h. */
  wind: number | null;
  uv: number | null;
};

export type WeatherForecast = {
  current: {
    temperature: number;
    feelsLike: number | null;
    humidity: number | null;
    wind: number | null;
    code: number;
    isDay: boolean;
  };
  /** Red Sea surface temperature off Somabay, °C. */
  sea: number | null;
  /** Every day Open-Meteo forecasts (up to 16). */
  days: ForecastDay[];
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    apparent_temperature?: number;
    relative_humidity_2m?: number;
    wind_speed_10m?: number;
    weather_code?: number;
    is_day?: number;
  };
  daily?: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max?: (number | null)[];
    wind_speed_10m_max?: (number | null)[];
    uv_index_max?: (number | null)[];
  };
};

type MarineResponse = { current?: { sea_surface_temperature?: number } };

const round = (value: number | null | undefined) =>
  typeof value === "number" ? Math.round(value) : null;

/**
 * Current conditions and the full forecast at Somabay from Open-Meteo (free, no API key): the
 * longest range it offers (16 days), plus the sea temperature from its marine service. Cached for
 * an hour so the header never waits on the network; returns null if the service is unavailable.
 */
export async function getWeatherForecast(): Promise<WeatherForecast | null> {
  "use cache";
  cacheLife("hours");

  const { latitude, longitude } = siteConfig.location;
  const where = `latitude=${latitude}&longitude=${longitude}&timezone=Africa%2FCairo`;
  const forecastUrl = `https://api.open-meteo.com/v1/forecast?${where}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,uv_index_max&forecast_days=16`;
  const marineUrl = `https://marine-api.open-meteo.com/v1/marine?${where}&current=sea_surface_temperature`;

  try {
    const [forecastResponse, marineResponse] = await Promise.all([
      fetch(forecastUrl, { signal: AbortSignal.timeout(3000) }),
      fetch(marineUrl, { signal: AbortSignal.timeout(3000) }).catch(() => null),
    ]);
    if (!forecastResponse.ok) return null;
    const data: OpenMeteoResponse = await forecastResponse.json();
    const temperature = data.current?.temperature_2m;
    if (typeof temperature !== "number") return null;

    let sea: number | null = null;
    if (marineResponse?.ok) {
      const marine: MarineResponse = await marineResponse.json();
      sea = round(marine.current?.sea_surface_temperature);
    }

    const daily = data.daily;
    const days: ForecastDay[] = daily
      ? daily.time.map((date, index) => ({
          date,
          code: daily.weather_code[index] ?? 0,
          max: Math.round(daily.temperature_2m_max[index]),
          min: Math.round(daily.temperature_2m_min[index]),
          rain: round(daily.precipitation_probability_max?.[index]),
          wind: round(daily.wind_speed_10m_max?.[index]),
          uv: round(daily.uv_index_max?.[index]),
        }))
      : [];

    return {
      current: {
        temperature: Math.round(temperature),
        feelsLike: round(data.current?.apparent_temperature),
        humidity: round(data.current?.relative_humidity_2m),
        wind: round(data.current?.wind_speed_10m),
        code: data.current?.weather_code ?? 0,
        isDay: data.current?.is_day === 1,
      },
      sea,
      days,
    };
  } catch {
    return null;
  }
}

/** Current conditions only (kept for callers that just need the temperature). */
export async function getCurrentWeather(): Promise<CurrentWeather | null> {
  const forecast = await getWeatherForecast();
  return forecast
    ? { temperature: forecast.current.temperature, isDay: forecast.current.isDay }
    : null;
}
