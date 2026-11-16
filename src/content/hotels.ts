import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import type { DirectoryItem, Hotel, HotelReview, HotelTheme } from "@/types/content";

export const hotelThemes: { value: HotelTheme; label: string }[] = [
  { value: "adults-only", label: "Adults only" },
  { value: "golfers", label: "Golfers" },
  { value: "families", label: "Families" },
  { value: "luxury", label: "Luxury" },
  { value: "beachfront", label: "Beachfront" },
  { value: "all-inclusive", label: "All Inclusive" },
];

/** Facility overviews other than the spa's are draft copy, to be confirmed by Somabay. */
const kempinskiFacilities: DirectoryItem[] = [
  {
    id: "beach-front",
    title: "Beach-Front",
    description:
      "Step straight from the hotel onto soft sand and clear Red Sea water. The beach is made for slow mornings, sunset swims, and long, easy days by the sea, with shade and loungers always close at hand.",
    images: [image("/images/library/beaches/mg-8909.webp", "The beach in front of the hotel")],
  },
  {
    id: "five-pools",
    title: "Five Pools",
    description:
      "Five pools set across the grounds, each with its own mood, from lively family afternoons to quiet corners for a peaceful swim. Wherever you are in the hotel, a refreshing dip is never far away.",
    images: [image("/images/library/kaktus/soma-21.webp", "A resort pool")],
  },
  {
    id: "jacuzzi",
    title: "Jacuzzi",
    description:
      "Warm, bubbling water to ease tired muscles after a day of sun, sport, or exploring. A calm place to unwind, alone or together, as the day slows down.",
    images: [image("/images/library/kaktus/soma-23.webp", "Sun loungers at the edge of a pool")],
  },
  {
    id: "two-floor-spa",
    title: "Two-floor Spa",
    description:
      "Spread across two tranquil floors, the spa offers a complete wellness experience designed to help you relax, restore, and recharge. Discover dedicated treatment spaces, soothing rituals, and a serene atmosphere made for leaving the everyday behind.",
    images: [
      image("/images/things-to-do/spa.webp", "The thalasso pool beneath Moorish arches"),
      image("/images/library/kaktus/muo-1605.webp", "A quiet relaxation lounge"),
    ],
  },
  {
    id: "three-bars",
    title: "Three Bars",
    description:
      "Three bars, each with its own atmosphere, for a fresh juice by the pool, a sundowner over the sea, or a relaxed drink after dinner.",
    images: [image("/images/library/lifestyle/067a2745.webp", "A guest at the hotel bar")],
  },
  {
    id: "four-restaurants",
    title: "Four Restaurants",
    description:
      "Four restaurants bring together Egyptian, Mediterranean, and international flavours, from relaxed beachside lunches to memorable dinners under the stars.",
    images: [image("/images/library/beaches/dsc03390.webp", "A dinner table set by the sea")],
  },
  {
    id: "golf-access",
    title: "Golf Course Access",
    description:
      "Enjoy easy access to Somabay’s championship golf, with fairways that run alongside the Red Sea. A round here pairs a real challenge with some of the most beautiful views on the coast.",
    images: [image("/images/library/golf/hidden-cove-12th.webp", "A seaside golf hole at sunset")],
  },
  {
    id: "gym",
    title: "Gym",
    description:
      "A bright, fully equipped fitness space for keeping up your routine on holiday, with cardio and strength equipment for an energising start to the day or a workout before sunset.",
    images: [image("/images/library/sports/sportsss-15.webp", "A fitness studio")],
  },
  {
    id: "medical-center",
    title: "Medical Center",
    description:
      "On-site medical care for peace of mind throughout your stay, with professional support close at hand whenever you or your family need it.",
    images: [image("/images/library/kaktus/soma-15.webp", "A calm, bright interior")],
  },
];

const roomAmenities = ["Private Beach", "Wi-Fi", "All-Inclusive", "Housekeeping", "Smart TV"];

const kempinskiRooms: Hotel["rooms"] = [
  {
    name: "Deluxe Seaview Room",
    type: "room",
    view: "sea",
    guests: 2,
    amenities: roomAmenities,
    image: image("/images/library/lifestyle/067a0335.webp", "A bright sea-view room"),
  },
  {
    name: "Double Room",
    type: "room",
    view: "pool",
    guests: 2,
    amenities: roomAmenities,
    image: image(
      "/images/library/beaches/shehrgssgr-313239-executive-suite-sea-vi.webp",
      "A double room opening to the terrace",
    ),
  },
  {
    name: "Deluxe Royal Suite",
    type: "suite",
    view: "sea",
    guests: 4,
    amenities: roomAmenities,
    image: image("/images/library/lifestyle/067a2088.webp", "A suite lounge in soft light"),
  },
  {
    name: "Royal Suite",
    type: "suite",
    view: "golf",
    guests: 2,
    amenities: roomAmenities,
    image: image(
      "/images/library/lifestyle/067a0444.webp",
      "A private balcony overlooking the coast",
    ),
  },
];

/** The Breakers' film, shown on every hotel page for now until each hotel has its own. */
const sharedFilm = video({
  label: "Moments at Somabay",
  poster: image("/images/video/breakers-loop-poster.webp", ""),
  sources: [{ src: "/videos/breakers-loop.webm", type: "video/webm" }],
});

/**
 * Placeholder sections for hotels whose own facilities, film and rooms haven't been supplied yet:
 * cloned from Kempinski so every hotel page has the same sections. Replace per hotel when the
 * real data arrives (a hotel's own value always wins).
 */
const placeholderSections = {
  facilities: kempinskiFacilities,
  film: sharedFilm,
  rooms: kempinskiRooms,
};

/**
 * Descriptions follow the hotels' own published facts. Themes and room views are an initial
 * mapping to confirm with each hotel; nightly rates and review scores are not shown until
 * live data is connected.
 */
export const hotels: Hotel[] = [
  {
    slug: "kempinski-hotel-somabay",
    cover: image(
      "/images/hotels/showcase-kempinski.webp",
      "Three friends sharing lunch on a sunlit terrace above the sea",
    ),
    name: "Kempinski Hotel Somabay",
    tagline: "Pure Luxury",
    stars: 5,
    themes: ["luxury", "beachfront"],
    website: "https://www.kempinski.com/de/soma-bay/hotel-soma-bay/",
    description:
      "A refined beachfront retreat where European luxury, Egyptian hospitality, and the natural beauty of the Red Sea come together for an unforgettable stay.",
    overview:
      "Nestled on the shores of Somabay, Kempinski Hotel Somabay combines timeless Moorish-inspired architecture with modern comfort and attentive service. With 325 elegantly appointed rooms and suites, a private sandy beach, expansive pools, and a wealth of experiences, it offers an effortless escape for couples, families, and those seeking a more refined way to experience the Red Sea.",
    images: [
      image(
        "/images/hotels/kempinski-1.webp",
        "Guests relaxing on a shaded terrace overlooking the sea",
      ),
      image("/images/hotels/kempinski-2.webp", "A guest unwinding in a sunlit hotel lounge"),
      image("/images/hotels/kempinski-3.webp", "Sunrise yoga on a deck above the Red Sea"),
    ],
    gallery: [
      image(
        "/images/hotels/kempinski-1.webp",
        "Guests relaxing on a shaded terrace overlooking the sea",
      ),
      image("/images/hotels/kempinski-2.webp", "A guest unwinding in a sunlit hotel lounge"),
      image("/images/hotels/kempinski-3.webp", "Sunrise yoga on a deck above the Red Sea"),
      image(
        "/images/library/lifestyle/067a0444.webp",
        "A couple breakfasting on a sea-view balcony",
      ),
      image("/images/library/beaches/mg-8909.webp", "The beach at sunset"),
      image("/images/library/lifestyle/067a2745.webp", "Evening at the hotel bar"),
      image("/images/library/beaches/dsc03390.webp", "A table set in the sea"),
      image("/images/library/lifestyle/067a1105-final.webp", "Sunset over the Red Sea"),
    ],
    film: sharedFilm,
    facilities: kempinskiFacilities,
    rooms: kempinskiRooms,
  },
  {
    ...placeholderSections,
    slug: "the-cascades",
    cover: image(
      "/images/hotels/showcase-cascades.webp",
      "A golfer mid-swing on the fairway below The Cascades",
    ),
    name: "The Cascades",
    tagline: "Golf Resort, Spa & Thalasso",
    stars: 5,
    themes: ["golfers", "luxury"],
    website: "https://thecascadeshotel.com/",
    description:
      "Set on the peninsula’s highest point, The Cascades pairs the Gary Player championship course with one of the region’s largest thalasso centres.",
    images: [
      image(
        "/images/hotels/cascades-1.webp",
        "A golfer teeing off in front of The Cascades resort",
      ),
      image("/images/hotels/cascades-2.webp", "The thalasso pool beneath Moorish arches"),
      image("/images/hotels/cascades-3.webp", "A seaside green at sunset"),
    ],
    gallery: [
      image(
        "/images/hotels/cascades-1.webp",
        "A golfer teeing off in front of The Cascades resort",
      ),
      image("/images/hotels/cascades-2.webp", "The thalasso pool beneath Moorish arches"),
      image("/images/hotels/cascades-3.webp", "A seaside green at sunset"),
      image("/images/library/lifestyle/067a2927.webp", "A golfer on the fairway"),
      image("/images/library/golf/hidden-cove-4.webp", "The course at golden hour"),
    ],
  },
  {
    ...placeholderSections,
    slug: "robinson-club-somabay",
    cover: image(
      "/images/hotels/showcase-robinson.webp",
      "Friends leaping on the beach against the sunset",
    ),
    name: "Robinson Club Somabay",
    tagline: "Entertainment Resort",
    stars: 5,
    themes: ["families", "all-inclusive", "beachfront"],
    website: "https://www.robinson.com/de/de/cluburlaub/aegypten/soma-bay/detailseite/",
    description:
      "A lively club resort on 500 metres of coastline, with sport, entertainment and all-inclusive dining from morning to night.",
    images: [
      image(
        "/images/hotels/robinson-1.webp",
        "Friends jumping on the beach against the setting sun",
      ),
      image("/images/hotels/robinson-2.webp", "Beach volleyball at golden hour"),
      image("/images/hotels/robinson-3.webp", "Catamarans lined up on the shore"),
    ],
    gallery: [
      image(
        "/images/hotels/robinson-1.webp",
        "Friends jumping on the beach against the setting sun",
      ),
      image("/images/hotels/robinson-2.webp", "Beach volleyball at golden hour"),
      image("/images/hotels/robinson-3.webp", "Catamarans lined up on the shore"),
      image("/images/library/beaches/dsc-0660.webp", "Guests celebrating on the beach"),
      image("/images/library/beaches/dsc02942.webp", "Beach games by the sea"),
    ],
  },
  {
    ...placeholderSections,
    slug: "sheraton-somabay",
    cover: image(
      "/images/hotels/showcase-sheraton.webp",
      "The Sheraton beach and pools facing the Red Sea mountains",
    ),
    name: "Sheraton Somabay",
    tagline: "Unique & Monumental",
    stars: 5,
    themes: ["families", "beachfront"],
    website: "https://www.marriott.com/hotels/travel/hrgss-sheraton-soma-bay-resort/",
    description:
      "Inspired by the grandeur of Luxor’s Karnak Temple, Sheraton Somabay blends ancient Egyptian heritage with a relaxed five-star experience. With 326 rooms and an 800-metre sandy beach, it offers the perfect setting to unwind, reconnect, and enjoy the Red Sea.",
    images: [
      image("/images/hotels/sheraton-1.webp", "A sea-view executive suite opening onto the coast"),
      image("/images/hotels/sheraton-2.webp", "Water slides at the resort aqua park"),
      image("/images/hotels/sheraton-3.webp", "Sunlit balconies of the resort facade"),
    ],
    gallery: [
      image("/images/hotels/sheraton-1.webp", "A sea-view executive suite opening onto the coast"),
      image("/images/hotels/sheraton-2.webp", "Water slides at the resort aqua park"),
      image("/images/hotels/sheraton-3.webp", "Sunlit balconies of the resort facade"),
      image("/images/library/lifestyle/067a2757.webp", "Evening drinks at the bar"),
      image("/images/library/beaches/mg-6915.webp", "Sunset behind the mountains"),
    ],
    film: sharedFilm,
  },
  {
    ...placeholderSections,
    slug: "the-breakers",
    cover: image(
      "/images/hotels/showcase-breakers.webp",
      "The Breakers jetty stretching out over the reef",
    ),
    name: "The Breakers",
    tagline: "Lifestyle Hotel",
    stars: 4,
    themes: ["beachfront"],
    website: "https://www.thebreakers-somabay.com/",
    description:
      "Egypt’s first watersports lifestyle hotel, made for kiters and divers — with a jetty out to the house reef, a rooftop sauna and an open-air cinema.",
    images: [
      image("/images/hotels/breakers-1.webp", "The jetty stretching out over the reef"),
      image("/images/hotels/breakers-2.webp", "A kite flying above the beachfront kite house"),
      image("/images/hotels/breakers-3.webp", "A guest waking up in a bright, airy room"),
    ],
    gallery: [
      image("/images/hotels/breakers-1.webp", "The jetty stretching out over the reef"),
      image("/images/hotels/breakers-2.webp", "A kite flying above the beachfront kite house"),
      image("/images/hotels/breakers-3.webp", "A guest waking up in a bright, airy room"),
      image("/images/library/watersports/kiters.webp", "Kites over the bay"),
      image("/images/library/diving/img-0386.webp", "Divers exploring the reef"),
    ],
    film: video({
      label: "Moments from The Breakers",
      poster: image("/images/video/breakers-loop-poster.webp", ""),
      sources: [{ src: "/videos/breakers-loop.webm", type: "video/webm" }],
    }),
  },
  {
    ...placeholderSections,
    slug: "stayr",
    name: "Stayr",
    tagline: "Bay Life Home Rental",
    themes: ["families"],
    description:
      "Serviced villas, chalets and apartments across Somabay, with concierge service for stays that feel like home.",
    images: [
      image("/images/hotels/stayr-1.webp", "Open-plan living room with sea views"),
      image("/images/hotels/stayr-2.webp", "A furnished villa living room"),
      image("/images/hotels/stayr-3.webp", "A private pool on a villa terrace"),
    ],
    gallery: [
      image("/images/hotels/stayr-1.webp", "Open-plan living room with sea views"),
      image("/images/hotels/stayr-2.webp", "A furnished villa living room"),
      image("/images/hotels/stayr-3.webp", "A private pool on a villa terrace"),
      image(
        "/images/library/residences/patio-212/2026-02-04-at-2-06-06-pm.webp",
        "A villa garden terrace",
      ),
      image(
        "/images/library/residences/villa-103/2025-05-15-at-5-22-39-pm-1.webp",
        "A pool facing the sea",
      ),
    ],
  },
];

export { hotelPrice, PRICE_PLACEHOLDER } from "@/lib/price";

/**
 * Guest reviews: the first three from the Single Hotel wireframe ("Testimonial / 3", 157:15703),
 * the last two draft placeholders. Shown on every hotel page until each hotel's own reviews are
 * connected.
 */
export const placeholderReviews: HotelReview[] = [
  {
    rating: 5,
    quote:
      "From the stunning setting to the thoughtful service, everything felt effortless. The beach, pools, and views made every day feel like a holiday.",
    author: "Ali M.",
  },
  {
    rating: 5,
    quote:
      "The hotel combines beautiful design with genuinely warm hospitality. We loved the food, the atmosphere, and having so many experiences right outside the hotel.",
    author: "Sarah A.",
  },
  {
    rating: 5,
    quote:
      "Perfect for a relaxing family getaway. The spacious rooms, beautiful pools, and easy access to the beach made it a stay we’ll remember.",
    author: "Elenore J.",
  },
  // Draft reviews (Omar K., Laura M.), written as placeholders to make five per hotel.
  {
    rating: 5,
    quote:
      "Waking up to the sea every morning was unforgettable. The staff remembered our names from the first day, and every detail felt considered.",
    author: "Omar K.",
  },
  {
    rating: 4,
    quote:
      "A calm, beautiful place to switch off. Between the spa, the long walks on the beach, and the sunsets over the mountains, we left completely recharged.",
    author: "Laura M.",
  },
];

export const hotelHref = (hotel: Hotel) => routes.hotel(hotel.slug);

export const getHotel = (slug: string) => hotels.find((hotel) => hotel.slug === slug);

export const themeLabel = (theme: HotelTheme) =>
  hotelThemes.find((option) => option.value === theme)?.label ?? theme;
