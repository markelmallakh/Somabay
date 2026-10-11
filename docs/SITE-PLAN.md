# Somabay website plan

Source material: the Figma wireframes (page "Wireframe", read only), the current site at somabay.com,
the Somabay brand guidelines, and the supplied asset library.

## 1. What Somabay is (for copy and structure decisions)

- A private peninsula on Egypt's Red Sea coast, ~10 million m², surrounded by sea on three sides,
  ~45 km south of Hurghada International Airport. Developed by Abu Soma Development Company (1991).
- **Stay** — Kempinski Hotel Somabay (5★), The Cascades Golf Resort, Spa & Thalasso (5★), Robinson Club
  Somabay (5★), Sheraton Somabay (5★), The Breakers Diving & Surfing Lodge (4★), Stayr home rental.
  The Kaktus (hotel + co-working hub, opened 2025) is not in the wireframe hotel list.
- **Live** — residential communities sold through Somaestates: Arc of Soma, Greens Baywest Valley,
  Wadi Soma / Wadi Jebal (+ Extension), Mesca (Golf Edition, Heights), Blanca (Gardens, Gardens II),
  Nautilus, The Lighthouse, Mazeej, Reeftown, Somabreeze, Baycentral, Baywest.
- **Do** — Gary Player 18-hole championship course, floodlit Par 3 course and Scoring Arena, Hidden
  Coves course; diving (house reef, jetty); kitesurfing (7BFT Kite House); Cascades Thalasso
  (7,500 m², 65 treatment rooms); Soma Sports Arena + Aquatics Center; S Tennis Academy; Playpark;
  the Marina (dining, boutiques, Bready, Zouni).
- **Community** — GEMS International School, Kompass Primary School, medical centre, pharmacy,
  limousine, supermarket, laundry. Hotline **16390**. Somabay App on iOS and Android.

## 2. Sitemap → routes

Every URL is declared in `src/config/routes.ts`. ✅ = built.

| Section         | Page (Figma frame)                    | Route                                                      | Template             |
| --------------- | ------------------------------------- | ---------------------------------------------------------- | -------------------- |
| Home            | Home – Desktop ✅                     | `/`                                                        | Home                 |
| About           | About                                 | `/about`                                                   | Editorial story      |
| Contact         | Contact Us – Desktop                  | `/contact`                                                 | Form + map           |
| Facilities      | Facilities & Services – Desktop       | `/facilities-and-services`                                 | Listing + drawer     |
| Reserve Hotel   | Somabay Holidays – Desktop            | `/holidays`                                                | Listing              |
|                 | Single Hotel – Desktop                | `/holidays/[slug]`                                         | Detail               |
| Experience      | Things To Do – List                   | `/things-to-do`                                            | Listing + filters    |
|                 | Single Things To Do / Golf At Somabay | `/things-to-do/[slug]`                                     | Detail               |
|                 | The Marina                            | `/the-marina`                                              | Venue hub            |
|                 | Dining (+ Single Restaurant drawer)   | `/dining`                                                  | Listing + drawer     |
| Live at Somabay | Neighborhood List                     | `/neighborhoods`                                           | Listing + masterplan |
|                 | Single Neighborhood                   | `/neighborhoods/[slug]`                                    | Detail               |
|                 | Resale (+ Single unit)                | `/resale`, `/resale/[unit]`                                | Listing + filters    |
| What's Up Soma  | Events Calendar – Desktop             | `/events`                                                  | Calendar listing     |
|                 | Single Event                          | `/events/[slug]`                                           | Detail               |
|                 | Bay Journal – Desktop                 | `/bay-journal`                                             | Editorial listing    |
|                 | Single Blog                           | `/bay-journal/[slug]`                                      | Article              |
|                 | Sustainability                        | `/sustainability`                                          | Editorial story      |
| Company         | Careers / Single Career               | `/careers`, `/careers/[slug]`                              | Listing + detail     |
| Support         | FAQ – Desktop                         | `/faqs`                                                    | Accordion            |
| Legal           | Footer links                          | `/privacy-policy`, `/terms-of-service`, `/cookie-settings` | Rich text            |

Global UI from the wireframes: transparent header (search, weather, language, hotline, menu),
full-screen menu with second-level panels, footer with app download + newsletter.

## 3. Reusable building blocks

Built for the homepage and ready for the remaining templates:

| Block                          | Reuse on                                                |
| ------------------------------ | ------------------------------------------------------- |
| `HomeHero` / `HeroScenes`      | Any page hero (single scene or Day/Night pair)          |
| `AboutStory` (pinned scrub)    | About, Sustainability, Golf, Single Neighborhood        |
| `HotelsShowcase`               | Holidays listing intro                                  |
| `NeighborhoodsCarousel` + Tabs | Neighborhood list, related neighborhoods, Marina venues |
| `ResaleSection` layout         | Resale intro, Single Neighborhood gallery               |
| `ActivityStack`                | Things To Do listing                                    |
| `FacilitiesSection` bento      | Facilities page                                         |
| `EventsSection` rows           | Events calendar, Single Event "more events"             |
| `JournalCarousel`              | Bay Journal related posts, Sustainability updates       |
| `ContactCta`                   | Closing CTA on every page                               |
| `Dialog`                       | Single Store / Restaurant / Facility / Hotel drawers    |
| `Media` + `playback` modes     | Every image or video slot                               |

## 4. Content to confirm with Somabay

- **Districts**: the wireframe says "5 Districts" — the live site doesn't state a number.
- **Neighborhood status**: which communities are "Living Now" vs "Coming Next" (currently set in
  `src/content/neighborhoods.ts` as a best guess: Blanca Gardens II, Nautilus, The Lighthouse,
  Mazeej and Mesca Heights are "Coming Next").
- **Hotel imagery**: no official Kempinski or Robinson photography was supplied; lifestyle images are
  placeholders (`src/content/hotels.ts`). Stars follow the live site (The Breakers is 4★, Stayr unrated).
- **Neighborhood imagery**: only Mesca, Blanca and Wadi Jebal have their own aerials; the other cards
  use mood images until renders are supplied.
- **Events and journal**: wireframe sample entries are used as-is.
- **Contact**: support@somabay.com (from the wireframe) is not published on the live site — confirm.
  No verified X or LinkedIn accounts were found, so only Facebook, Instagram and YouTube are linked.
- **QR code** for the app (shown in the wireframe footer) needs a single smart link that routes to
  both stores; the footer currently uses two store buttons.
- **Language switcher**: only English exists; the switcher becomes a dropdown automatically when more
  entries are added to `siteConfig.languages`.
- **Fonts**: EstaPro / Alright Sans web licences would replace Newsreader / Source Sans 3.

## 5. Media library notes

- Converted assets live in `public/images/**` (WebP) and `public/videos/**` (WebM, all ≤ 12 MB).
- Hero Day: Asran drone footage of a yacht over the reef. Hero Night: sunset from the bow
  (Insta360 watermark cropped out). About scrub: drone rise revealing the reef. Film: winter campaign
  promo with sound. Marina still: frame from the Marina winter campaign (title cropped out).
- Not yet used and worth keeping for the inner pages: winter campaign films for Sheraton, Breakers,
  Marina and Mesca; underwater clips (turtle, rays, reef); off-road clips; Wadi Jebal Extension
  walkthrough; Kaktus, Zouni, Sports Arena, S Tennis Academy and Bready photography.
