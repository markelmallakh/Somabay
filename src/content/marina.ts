import { image, video } from "@/lib/media";
import type { DirectoryItem, SectionIntro, SequenceStep } from "@/types/content";

export const marinaFilm = video({
  label: "Moments from Somabay Marina",
  poster: image("/images/video/marina-loop-poster.webp", ""),
  sources: [{ src: "/videos/marina-loop.webm", type: "video/webm" }],
});

/** Drone loop for the scroll-expanding boat film further down the Marina page. */
export const marinaBoatFilm = video({
  label: "Drone view of a yacht moored over the Red Sea reef",
  poster: image("/images/video/yacht-reef-loop-poster.webp", ""),
  sources: [{ src: "/videos/yacht-reef-loop.webm", type: "video/webm" }],
});

export const marinaSteps: SequenceStep[] = [
  {
    eyebrow: "Experience Somabay",
    title: "The Marina",
    // DRAFT COPY: the line under the title, lengthened to three lines for the split hero.
    description:
      "Elevated living by the Red Sea: a waterfront of restaurants, shops and everyday services, where boats come and go and the day slows down by the bay.",
    placement: "split",
  },
  {
    title: "Everything you need, by Somabay",
    description:
      "Set along the Red Sea, Somabay Marina is a vibrant waterfront destination for dining, shopping, leisure, and life by the water. Explore its collection of restaurants, retail experiences, and essential services, or simply enjoy the marina atmosphere and watch the day unfold by the bay.",
    placement: "bottom-left",
  },
  {
    title: "Different boat experience",
    description:
      "Take to the Red Sea and experience Somabay from a different perspective. From relaxed cruises and private boat trips to fishing, snorkeling, and unforgettable days on the water, the marina is your starting point for discovering the sea.",
    placement: "right",
  },
];

export const retailIntro: SectionIntro = {
  eyebrow: "Retail & Shops",
  title: "Life by the Water",
  description:
    "A lively waterfront destination where shopping, leisure, and everyday essentials come together.",
};

type StoreDetails = {
  /** Working hours, verbatim from the shop's page on somabay.com/explore-somabay. */
  hours: string;
  /** Phone numbers, verbatim from the same page (none listed for Bazar Market). */
  phones?: string[];
  description: string;
  /** What kind of place it is, shown as the card's badge. */
  category: string;
  /** How many photos the shop has in public/images/marina/shops (from its somabay.com page). */
  photos?: number;
};

const store = (id: string, title: string, details: StoreDetails): DirectoryItem => {
  return {
    id,
    title,
    description: details.description,
    chip: details.category,
    location: "Marina, Somabay",
    hours: details.hours,
    phones: details.phones,
    images: Array.from({ length: details.photos ?? 1 }, (_, index) =>
      image(
        // Every file here is in the media manifest (generated from public/images).
        `/images/marina/shops/${id}-${String(index + 1).padStart(2, "0")}.webp` as Parameters<
          typeof image
        >[0],
        `${title} at Somabay Marina`,
      ),
    ),
    infoLink: {
      label: "Get directions",
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${title} Somabay Marina`)}`,
      external: true,
    },
  };
};

/**
 * The Marina's retail and services, as listed on somabay.com/directories. Hours, phones and the
 * location are verbatim from each shop's page there. DRAFT COPY: the descriptions are written for
 * the site (the source pages have none); confirm with each tenant. Photos are each shop's own from
 * its somabay.com page, except Beauty Salon and the two pharmacies, whose pages have none of
 * their own: they show the Marina's courtyards until the tenants supply photography.
 */
export const marinaStores: DirectoryItem[] = [
  store("bazar-market", "Bazar Market", {
    category: "Market",
    photos: 2,
    hours: "9:00 AM – 7:00 PM",
    description:
      "Everyday essentials and convenient shopping, right at the Marina. Pick up groceries, snacks and household basics for your stay, a few steps from the boats and the promenade.",
  }),
  store("price-choice-supermarket", "Price Choice Supermarket", {
    category: "Supermarket",
    photos: 2,
    hours: "10:00 AM – 12:00 AM",
    phones: ["+20 128 939 7800"],
    description:
      "A well-stocked supermarket for fresh produce, pantry staples and everyday essentials. Open late into the evening, it keeps homes and holidays at the bay supplied.",
  }),
  store("malika", "Malika", {
    category: "Fashion",
    photos: 2,
    hours: "11:00 AM – 9:00 PM",
    phones: ["+20 102 637 0891"],
    description:
      "A stylish fashion destination at Somabay Marina, offering a curated selection of contemporary pieces and accessories. Drop by to discover something new while enjoying the waterfront atmosphere.",
  }),
  store("canvas", "Canvas", {
    category: "Art Gallery",
    photos: 2,
    hours: "12:00 PM – 6:00 PM",
    phones: ["+20 100 311 3257"],
    description:
      "Explore creative pieces and unique finds to take home. A small gallery of art, local crafts and design objects, each chosen to help you carry a little of the Red Sea back with you.",
  }),
  store("valu", "Valu", {
    category: "Financial Services",
    hours: "9:00 AM – 9:00 PM",
    phones: ["+20 106 101 3168"],
    description:
      "Convenient financial services, right in the heart of the Marina. Drop in for flexible payment plans and everyday financial support, close to the shops and cafés.",
  }),
  store("beauty-salon", "Beauty Salon", {
    category: "Beauty Salon",
    hours: "11:00 AM – 6:00 PM",
    phones: ["+20 128 939 7800"],
    description:
      "Beauty and personal-care services for a little time to yourself. From hair styling and nails to grooming before an evening out, all just a short stroll from the waterfront and the boats.",
  }),
  store("pharmacy", "Pharmacy", {
    category: "Pharmacy",
    hours: "8:00 AM – 12:00 AM",
    phones: ["+20 127 897 1384"],
    description:
      "Everyday healthcare essentials, conveniently available at the Marina. Prescriptions, sun care and first-aid supplies, open from early morning until midnight.",
  }),
  store("natural-pharmacy", "Natural Pharmacy", {
    category: "Pharmacy",
    hours: "10:00 AM – 10:00 PM",
    phones: ["+20 127 897 1384"],
    description:
      "Natural wellness products and everyday health essentials. Herbal remedies, skincare and supplements, with friendly advice to help you feel your best by the sea.",
  }),
  store("seda-fabrics-and-curtains", "Seda Fabrics & Curtains", {
    category: "Fabrics & Curtains",
    hours: "10:00 AM – 7:00 PM",
    phones: ["+20 122 649 7975"],
    description:
      "Fabrics, curtains and soft furnishings for homes at the bay. Choose from a wide range of materials and finishes to dress your rooms, with made-to-measure tailoring to fit your windows and your style.",
  }),
  store("ebony-and-ivory", "Ebony & Ivory", {
    category: "Home Décor",
    photos: 2,
    hours: "9:00 AM – 9:00 PM",
    phones: ["+20 100 721 3323"],
    description:
      "Discover a curated retail experience at the Marina. A considered mix of pieces for you and your home, gathered for those who like to find something a little different.",
  }),
  store("bonhomia", "Bonhomia", {
    category: "Lifestyle Boutique",
    hours: "9:00 AM – 5:00 PM",
    phones: ["+20 106 744 3380", "+20 120 884 1448"],
    description:
      "A distinctive shopping experience with unique lifestyle finds. Browse homeware, gifts and accessories that bring an easy, coastal feel to everyday living.",
  }),
  store("concrete", "Concrete", {
    category: "Fashion",
    hours: "10:00 AM – 11:00 PM",
    phones: ["+20 100 990 9579", "+20 100 727 2711"],
    description:
      "Contemporary fashion and style, right by the waterfront. Clean lines and everyday essentials for men and women, open late for an evening walk along the Marina.",
  }),
  store("cheers-egypt", "Cheers Egypt", {
    category: "Beverages",
    photos: 2,
    hours: "10:00 AM – 10:00 PM",
    phones: ["+20 121 168 8816"],
    description:
      "A convenient retail stop for your everyday needs. Find a good selection of drinks and party supplies for relaxed evenings at home, sunset gatherings with friends and celebrations at the bay.",
  }),
  store("black-welders", "Black Welders", {
    category: "Furniture",
    photos: 2,
    hours: "9:00 AM – 7:00 PM",
    phones: ["+20 127 734 8000"],
    description:
      "Outdoor furniture made for life by the sea. Loungers, dining sets and terrace pieces built to handle the sun, ready to furnish gardens, roofs and balconies across Somabay.",
  }),
  store("go-bus", "Go Bus", {
    category: "Bus Station",
    hours: "9:00 AM – 5:00 PM",
    phones: ["19567"],
    description:
      "Convenient transportation services connecting Somabay with your journey. Book comfortable coach travel to Hurghada, Cairo and destinations beyond, with tickets available right here at the Marina.",
  }),
];

export const marinaGallery = [
  image("/images/experience/marina.webp", "Yachts moored in the marina"),
  image("/images/library/lifestyle/067a2820.webp", "The marina promenade at sunset"),
  image("/images/library/zouni/soma-60.webp", "A thatched terrace at dusk"),
  image("/images/library/boat/dji-0014.webp", "A yacht anchored in turquoise water"),
  image("/images/library/lifestyle/067a2648.webp", "Lunch on a terrace"),
  image("/images/library/zouni/1p8a5433.webp", "Sculpture against the blue sky"),
  image("/images/library/beaches/the-breakers-jetty-01.webp", "A jetty over the water"),
];
