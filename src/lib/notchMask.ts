import type { CSSProperties } from "react";

export type NotchCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export type NotchOptions = {
  /** Which corner of the frame the notch is cut from. Defaults to the bottom-right. */
  corner?: NotchCorner;
  /** Width of the notch's flat edge, px (the slant is added on its inner side). */
  width: number;
  /** Depth of the notch from the frame's edge, px. */
  depth: number;
  /** Corner radius for every join, px. */
  radius?: number;
  /** Horizontal run of the slanted side, px. */
  slant?: number;
  /** Room beside the notch for the frame's own rounded corner, px. */
  top?: number;
};

const BLEED = 4;

/** One notch as a mask layer, drawn for the bottom-right corner and mirrored into place. */
function notchLayer({
  corner = "bottom-right",
  width,
  depth,
  radius = 24,
  slant = 50,
  top = 32,
}: NotchOptions) {
  const R = radius;
  const len = Math.hypot(slant, depth);
  const ux = slant / len;
  const uy = depth / len;
  const X0 = R;
  const W = X0 + slant + width;
  const H = top + depth;
  const VW = W + BLEED;
  const VH = H + BLEED;
  const shape = [
    `M ${X0 - R} ${H}`,
    `Q ${X0} ${H} ${X0 + R * ux} ${H - R * uy}`,
    `L ${X0 + slant - R * ux} ${top + R * uy}`,
    `Q ${X0 + slant} ${top} ${X0 + slant + R} ${top}`,
    `L ${W - top} ${top}`,
    `Q ${W} ${top} ${W} 0`,
    `L ${VW} 0 L ${VW} ${VH} L ${X0 - R} ${VH} Z`,
  ].join(" ");
  const left = corner.endsWith("left");
  const upper = corner.startsWith("top");
  const flip = `scale(${left ? -1 : 1} ${upper ? -1 : 1}) translate(${left ? -VW : 0} ${upper ? -VH : 0})`;
  const svg = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VW} ${VH}"><path transform="${flip}" d="${shape}"/></svg>`,
  )}")`;
  return {
    image: svg,
    size: `${VW}px ${VH}px`,
    position: `${left ? "left" : "right"} -${BLEED}px ${upper ? "top" : "bottom"} -${BLEED}px`,
    /** Inner box of the notch (inside its edge, beyond its slant), anchored to the corner. */
    inner: { width: width + R, height: depth },
  };
}

/**
 * The Marina panel's notch (Figma "Subtract" 416:2097), as a reusable mask: slanted, fully rounded
 * notches cut from any of a frame's corners. Returns mask styles for the frame plus each notch's
 * inner size (in the order given), so content can be placed inside the gaps. The frame should
 * square off its own radius at the notched corners.
 */
export function notchMask(...notches: NotchOptions[]) {
  const layers = notches.map(notchLayer);
  const image = ["linear-gradient(#000, #000)", ...layers.map((layer) => layer.image)].join(", ");
  const size = ["100% 100%", ...layers.map((layer) => layer.size)].join(", ");
  const position = ["0 0", ...layers.map((layer) => layer.position)].join(", ");
  const style: CSSProperties = {
    maskImage: image,
    WebkitMaskImage: image,
    maskSize: size,
    WebkitMaskSize: size,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: position,
    WebkitMaskPosition: position,
    maskComposite: "exclude",
    WebkitMaskComposite: "xor",
  };
  return { style, inners: layers.map((layer) => layer.inner) };
}
