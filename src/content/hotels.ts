import { routes } from "@/config/routes";
import { image } from "@/lib/media";
import type { Hotel } from "@/types/content";

export const hotels: Hotel[] = [
  {
    slug: "kempinski-hotel-somabay",
    name: "Kempinski Hotel Somabay",
    tagline: "Pure Luxury",
    stars: 5,
    images: [
      image(
        "/images/hotels/kempinski-1.webp",
        "Guests relaxing on a shaded terrace overlooking the sea",
      ),
      image("/images/hotels/kempinski-2.webp", "A guest unwinding in a sunlit hotel lounge"),
      image("/images/hotels/kempinski-3.webp", "Sunrise yoga on a deck above the Red Sea"),
    ],
  },
  {
    slug: "the-cascades",
    name: "The Cascades",
    tagline: "Golf Resort, Spa & Thalasso",
    stars: 5,
    images: [
      image(
        "/images/hotels/cascades-1.webp",
        "A golfer teeing off in front of The Cascades resort",
      ),
      image("/images/hotels/cascades-2.webp", "The thalasso pool beneath Moorish arches"),
      image("/images/hotels/cascades-3.webp", "A seaside green at sunset"),
    ],
  },
  {
    slug: "robinson-club-somabay",
    name: "Robinson Club Somabay",
    tagline: "Entertainment Resort",
    stars: 5,
    images: [
      image(
        "/images/hotels/robinson-1.webp",
        "Friends jumping on the beach against the setting sun",
      ),
      image("/images/hotels/robinson-2.webp", "Beach volleyball at golden hour"),
      image("/images/hotels/robinson-3.webp", "Catamarans lined up on the shore"),
    ],
  },
  {
    slug: "sheraton-somabay",
    name: "Sheraton Somabay",
    tagline: "Unique & Monumental",
    stars: 5,
    images: [
      image("/images/hotels/sheraton-1.webp", "A sea-view executive suite opening onto the coast"),
      image("/images/hotels/sheraton-2.webp", "Water slides at the resort aqua park"),
      image("/images/hotels/sheraton-3.webp", "Sunlit balconies of the resort facade"),
    ],
  },
  {
    slug: "the-breakers",
    name: "The Breakers",
    tagline: "Lifestyle Hotel",
    stars: 4,
    images: [
      image("/images/hotels/breakers-1.webp", "The jetty stretching out over the reef"),
      image("/images/hotels/breakers-2.webp", "A kite flying above the beachfront kite house"),
      image("/images/hotels/breakers-3.webp", "A guest waking up in a bright, airy room"),
    ],
  },
  {
    slug: "stayr",
    name: "Stayr",
    tagline: "Bay Life Home Rental",
    images: [
      image("/images/hotels/stayr-1.webp", "Open-plan living room with sea views"),
      image("/images/hotels/stayr-2.webp", "A furnished villa living room"),
      image("/images/hotels/stayr-3.webp", "A private pool on a villa terrace"),
    ],
  },
];

export const hotelHref = (hotel: Hotel) => routes.hotel(hotel.slug);
