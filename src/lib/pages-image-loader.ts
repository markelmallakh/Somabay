/**
 * Image loader for the GitHub Pages build, which has no image optimizer. The post-build step
 * (scripts/pages-postbuild.mjs) writes each photo under /images/ at a few widths to
 * /_img/<width>/images/…; this picks the smallest one at least as wide as the browser asks for,
 * so a 144px card no longer downloads a 4000px original. Anything else (SVGs, other paths) is
 * served as it is.
 */
export const PAGES_IMAGE_WIDTHS = [256, 640, 1080, 1600, 2400] as const;

const base = process.env.NEXT_PUBLIC_PAGES_BASE_PATH ?? "";

export default function pagesImageLoader({ src, width }: { src: string; width: number }) {
  // Content paths may already carry the base path (the post-build step prefixes them).
  const path = base && src.startsWith(`${base}/`) ? src.slice(base.length) : src;
  if (!/^\/images\/.+\.(webp|jpe?g|png)$/i.test(path)) {
    return path.startsWith("/") ? `${base}${path}` : path;
  }
  const size =
    PAGES_IMAGE_WIDTHS.find((candidate) => candidate >= width) ??
    PAGES_IMAGE_WIDTHS[PAGES_IMAGE_WIDTHS.length - 1];
  return `${base}/_img/${size}${path.replace(/\.(jpe?g|png)$/i, ".webp")}`;
}
