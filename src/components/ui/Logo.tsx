import { cn } from "@/lib/utils";
import { LOGO_VIEWBOX, markPaths, wordmarkPaths } from "./logo-paths";

type LogoProps = {
  /** `brand`: turquoise mark + cool-gray wordmark (light grounds). `light`: all white. */
  tone?: "brand" | "light";
  className?: string;
  title?: string;
};

const tones = {
  brand: { mark: "fill-turquoise", word: "fill-cool-grey" },
  light: { mark: "fill-white", word: "fill-white" },
} as const;

export function Logo({ tone = "brand", className, title = "Somabay" }: LogoProps) {
  const colors = tones[tone];
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      role="img"
      aria-label={title}
      className={cn("h-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={cn(colors.mark, "transition-[fill] duration-700 ease-in-out")}>
        {markPaths.map((path, index) => (
          <path key={index} transform={`translate(${path.x} ${path.y})`} d={path.d} />
        ))}
      </g>
      <g className={cn(colors.word, "transition-[fill] duration-700 ease-in-out")}>
        {wordmarkPaths.map((path, index) => (
          <path key={index} transform={`translate(${path.x} ${path.y})`} d={path.d} />
        ))}
      </g>
    </svg>
  );
}
