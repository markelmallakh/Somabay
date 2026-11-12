"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { WeatherForecast } from "@/lib/weather";
import { Icon } from "@/components/ui/Icon";

const WeatherDialog = dynamic(() =>
  import("./WeatherDialog").then((module) => module.WeatherDialog),
);

/** The footer's weather pill: opens the same forecast popup as the header, above the pill. */
export function FooterWeather({ forecast }: { forecast: WeatherForecast }) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [anchor, setAnchor] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(event) => {
          const box = event.currentTarget.getBoundingClientRect();
          setAnchor({ left: box.left, top: box.top, width: box.width, height: box.height });
          setLoaded(true);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-body-xs text-ink transition-colors hover:border-turquoise/60"
      >
        <Icon
          name={forecast.current.isDay ? "cloud-sun" : "moon"}
          className="size-4.5 text-turquoise"
        />
        <span>
          <span className="sr-only">Weather forecast. Current temperature: </span>
          <span className="font-semibold">{forecast.current.temperature}°C</span>
          <span className="text-slate"> · Somabay now</span>
        </span>
      </button>
      {loaded ? (
        <WeatherDialog
          open={open}
          onClose={() => setOpen(false)}
          forecast={forecast}
          anchor={anchor}
        />
      ) : null}
    </>
  );
}
