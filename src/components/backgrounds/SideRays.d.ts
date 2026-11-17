import type { CSSProperties, JSX } from "react";

/** Props of the React Bits Side Rays background (see SideRays.jsx). */
export type SideRaysProps = {
  rayColor1?: string;
  rayColor2?: string;
  blend?: number;
  origin?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "right" | "left";
  speed?: number;
  intensity?: number;
  spread?: number;
  density?: number;
  sharpness?: number;
  tilt?: number;
  falloff?: number;
  glow?: number;
  saturation?: number;
  dust?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  intro?: boolean;
  lightMode?: boolean;
  opacity?: number;
  maxDevicePixelRatio?: number;
  className?: string;
  style?: CSSProperties;
};

declare const SideRays: (props: SideRaysProps) => JSX.Element;
export default SideRays;
