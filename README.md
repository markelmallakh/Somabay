# Somabay — corporate website

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · GSAP 3 · Framer Motion · Lenis.

The site plan, page templates and open content questions live in [docs/SITE-PLAN.md](docs/SITE-PLAN.md).

## Commands

| Task                   | Command                  |
| ---------------------- | ------------------------ |
| Development server     | `npm run dev`            |
| Type checking          | `npm run typecheck`      |
| Linting                | `npm run lint`           |
| Formatting (write)     | `npm run format`         |
| Formatting (check)     | `npm run format:check`   |
| All checks             | `npm run check`          |
| Production build       | `npm run build`          |
| Serve production build | `npm run start`          |
| Regenerate media sizes | `npm run media:manifest` |

Husky runs lint-staged on every commit (ESLint + Prettier on staged files).

Copy `.env.example` to `.env.local` and fill in the values you need.

## Architecture

```text
src/
├── app/                  Routes, root layout, metadata files (robots, sitemap, manifest, icons), error/404
├── components/
│   ├── animations/       Reveal (Framer Motion), SplitHeading / ImageReveal (GSAP), SmoothScroll (Lenis)
│   ├── layout/           Container, Section, Stack, Grid, SectionHeading, SiteHeader, SiteFooter
│   ├── media/            ResponsiveImage, Video, ScrollScrubVideo, Media, FilmDialog
│   ├── navigation/       Header bar, menu overlay, search dialog
│   ├── sections/home/    Homepage sections (one file per section)
│   ├── seo/              JSON-LD
│   └── ui/               Button, TextLink, Icon, Logo, Dialog, Tabs, DragCursor…
├── config/               site.ts (brand + contact), routes.ts (every sitemap URL), navigation.ts
├── content/              Typed content data (hotels, neighborhoods, activities, events, journal, home copy)
├── hooks/                useGsap, useReducedMotion, useInView, useDragScroll
├── lib/                  cn(), media helpers, GSAP registration, weather, server actions
└── types/                Media, content and navigation types
```

- **Server Components by default.** Client boundaries are limited to interactive or animated leaves
  (header bar, hero scenes, carousels, pinned scroll stories, dialogs).
- **Content is separate from presentation.** Sections render from `src/content/*`, so copy and media
  can move to a CMS later without touching components.
- **Routes are centralised** in `src/config/routes.ts`. `publishedRoutes` feeds `sitemap.ts`; add a
  route there when its page ships.

### Design tokens

All brand decisions live in `src/app/globals.css` (`@theme`): brand colours from the Somabay
guidelines (Sea Turquoise `#00B2BA`, Cool Gray `#53565A`, Warm Gray, Twilight Blue), fluid type scale
(`text-display` … `text-eyebrow`), spacing (`px-gutter`, `py-section`), container widths, radii and
easing curves. Fonts are self-hosted through `next/font`: **Newsreader** (display serif, standing in
for EstaPro) and **Source Sans 3** (humanist sans, standing in for Alright Sans). Swap them in
`src/app/layout.tsx` once licensed web fonts are supplied.

### Animation responsibilities

| Library       | Used for                                                                                                                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Framer Motion | Entrance reveals, staggered groups, dialog / menu presence, tab transitions, drag cursor                                         |
| GSAP          | Scroll-driven work: split-line headings, clip-path image reveals, pinned About story, hotels showcase, card stack, hero parallax |
| Lenis         | Inertial scrolling (desktop, fine pointers only), driven by the GSAP ticker so ScrollTrigger stays in sync                       |

GSAP always runs through `useGsap`, which scopes selectors to the component and reverts every tween
and ScrollTrigger on unmount. Everything honours `prefers-reduced-motion`: Framer Motion via
`MotionConfig reducedMotion="user"`, GSAP setups skip or simplify, Lenis is disabled, and looping
videos show their poster until the visitor presses play.

## Media

All media is optimised before it enters `public/`:

- **Images** → WebP (quality ≈ 76, max 2400 px on the long edge), then `npm run media:manifest` records
  their sizes and blur placeholders in `src/content/media-manifest.ts`. Reference them with
  `image("/images/…", "alt text")` — the path is type-checked against the manifest.
- **Videos** → WebM (VP9), **25 MB maximum**, no audio unless the clip is a film with sound.

```bash
# Background loop (hero) — 2-pass, ~4 Mbps, 1080p, no audio
ffmpeg -i input.mp4 -t 20 -vf "scale=1920:-2,fps=25" -an -c:v libvpx-vp9 -b:v 4M -maxrate 6M -bufsize 8M -row-mt 1 -pass 1 -f webm /dev/null
ffmpeg -i input.mp4 -t 20 -vf "scale=1920:-2,fps=25" -an -c:v libvpx-vp9 -b:v 4M -maxrate 6M -bufsize 8M -row-mt 1 -pass 2 public/videos/name.webm

# Scroll-scrub clip — short keyframe interval (-g 5) so seeking follows the scroll smoothly
ffmpeg -i input.mp4 -t 14 -vf "scale=1280:-2,fps=25" -an -c:v libvpx-vp9 -b:v 4.5M -g 5 -keyint_min 5 -row-mt 1 public/videos/name-scrub.webm

# Film with sound
ffmpeg -i input.mov -vf "scale=1920:-2" -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 -c:a libopus -b:a 128k public/videos/film.webm
```

### Video playback options

Every video slot takes a `VideoAsset` plus a `playback` mode, so a slot can change behaviour from
content alone:

| `playback`     | Behaviour                                                             |
| -------------- | --------------------------------------------------------------------- |
| `autoplay`     | Muted loop that starts immediately (hero). Includes a pause control.  |
| `in-view`      | Muted loop that loads near the viewport and only plays while visible. |
| `scroll-scrub` | Playback position follows the scroll position.                        |
| `manual`       | Native controls; nothing downloads until the visitor presses play.    |

Example — the About story (`src/content/home.ts`) uses `playback: "scroll-scrub"` inside a pinned
timeline that opens the frame to full bleed; change it to `"in-view"` for a plain looping video, or
replace `media` with an `image(...)` and the section keeps working. Hero scenes (Day / Night) are a
list of `HeroScene` objects, each with its own video and poster.

## Environment variables

| Variable                 | Scope  | Purpose                                                                        |
| ------------------------ | ------ | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`   | Public | Canonical origin for metadata, sitemap and robots                              |
| `NEWSLETTER_WEBHOOK_URL` | Server | Receives footer newsletter signups; the form reports unavailability when unset |

The header temperature comes from Open-Meteo (no key), cached for an hour with `"use cache"`.
