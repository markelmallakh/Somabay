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

Every URL is declared in `src/config/routes.ts`; all pages below are built and listed in the sitemap.

| Section         | Page                                  | Route                                                      |
| --------------- | ------------------------------------- | ---------------------------------------------------------- |
| Home            | Home                                  | `/`                                                        |
| About           | About                                 | `/about`                                                   |
| Contact         | Contact Us                            | `/contact`                                                 |
| Facilities      | Facilities & Services                 | `/facilities-and-services`                                 |
| Book Hotel      | Somabay Holidays (list / map)         | `/holidays`                                                |
|                 | Single Hotel (+ facility drawers)     | `/holidays/[slug]`                                         |
| Experience      | Things To Do                          | `/things-to-do`                                            |
|                 | Golf at Somabay                       | `/things-to-do/golf`                                       |
|                 | Single Things To Do (Spa template)    | `/things-to-do/[slug]`                                     |
|                 | The Marina (+ store drawers)          | `/the-marina`                                              |
|                 | Dining (+ restaurant drawers)         | `/dining`                                                  |
| Live at Somabay | Neighborhoods                         | `/neighborhoods`                                           |
|                 | Single Neighborhood (map, masterplan) | `/neighborhoods/[slug]`                                    |
|                 | Resale                                | `/resale`                                                  |
|                 | Single Unit                           | `/resale/[slug]`                                           |
| What's Up Soma  | Events (grid / calendar)              | `/events`                                                  |
|                 | Single Event                          | `/events/[slug]`                                           |
|                 | Bay Journal                           | `/bay-journal`                                             |
|                 | Single Article                        | `/bay-journal/[slug]`                                      |
|                 | Sustainability                        | `/sustainability`                                          |
| Company         | Careers / Single Career               | `/careers`, `/careers/[slug]`                              |
| Support         | FAQs                                  | `/faqs`                                                    |
| Legal           | Footer links (no design/content yet)  | `/privacy-policy`, `/terms-of-service`, `/cookie-settings` |

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

- **FAQs** are drafted from live-site facts (the wireframe entries are placeholders) — `src/content/faqs.ts`.
- **Hotel themes, room views and rates**: themes are an initial mapping; nightly rates, review scores
  and testimonials are not shown until real data is connected.
- **Spa packages** show "Price on request"; **golf**: the Reef Course description is pending.
- **Neighborhoods**: list/status follow the Neighborhood List wireframe; only Wadi Jebal has full
  detail (stats, concept); others use shared sections.
- **Resale units** are the wireframe's sample listings until live inventory is connected.
- **Events and journal** dates are the wireframe dates; only one article has full body copy.
- **Stores, restaurants, medical centre**: placeholder photography; opening hours and phone numbers
  were placeholders in the wireframe and are omitted.
- **Leadership and golf pros** show monograms until portraits are supplied.
- **Contact**: the second office is labelled "Somabay Office" (the wireframe labels both "Giza Office").
- **Careers**: "Apply now" emails info@somabay.com until a careers address or ATS link exists.

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
