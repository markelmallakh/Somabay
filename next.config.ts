import type { NextConfig } from "next";

/**
 * GitHub Pages build (`npm run build:pages`): a static export served under the repo's path, with
 * no image optimizer, no response headers and the form server actions swapped for static stand-ins.
 */
const pages = process.env.GITHUB_PAGES === "true";
const pagesBasePath = process.env.PAGES_BASE_PATH ?? "/Somabay";

const nextConfig: NextConfig = {
  // Static export can't run with Cache Components (PPR); Pages keeps only the "use cache" directive.
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages ? { experimental: { useCache: true } } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  // Pages: only .tsx route files, which leaves out robots.ts, sitemap.ts and manifest.ts (the
  // export can't prerender them with Cache Components, and they mean nothing under a subpath).
  ...(pages
    ? { output: "export", basePath: pagesBasePath, trailingSlash: true, pageExtensions: ["tsx"] }
    : {}),
  images: pages
    ? { unoptimized: true }
    : {
        formats: ["image/avif", "image/webp"],
        qualities: [60, 75, 85],
        deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560],
      },
  ...(pages
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:all*(webm|webp|jpg|png|svg)",
              headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
              ],
            },
          ];
        },
      }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
    ...(pages
      ? {
          resolveAlias: {
            "@/lib/actions/enquiry": "./src/lib/actions/static/enquiry.ts",
            "@/lib/actions/newsletter": "./src/lib/actions/static/newsletter.ts",
          },
        }
      : {}),
  },
};

export default nextConfig;
