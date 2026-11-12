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
    description: "Elevated Living by the Red Sea",
    placement: "center",
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

const pool = [
  image("/images/experience/marina.webp", "Yachts in Somabay Marina"),
  image("/images/library/lifestyle/067a2820.webp", "The marina at sunset"),
  image("/images/library/bready/bready-img-5500.webp", "A shopfront at the marina"),
  image("/images/library/lifestyle/067a2648.webp", "Friends at a marina terrace"),
  image("/images/library/bready/bready-img-5503.webp", "A marina storefront"),
];

const store = (id: string, title: string, description?: string): DirectoryItem => {
  const index = id.length % pool.length;
  return {
    id,
    title,
    description,
    location: "The Marina",
    images: [pool[index], pool[(index + 1) % pool.length]],
  };
};

/** Store imagery is placeholder until each tenant supplies photography. */
export const marinaStores: DirectoryItem[] = [
  store(
    "bazar-market",
    "Bazar Market",
    "Everyday essentials and convenient shopping, right at the Marina.",
  ),
  store(
    "price-choice-supermarket",
    "Price Choice Supermarket",
    "Everyday essentials and convenient shopping, right at the Marina.",
  ),
  {
    ...store("malika", "Malika"),
    description:
      "A stylish fashion destination at Somabay Marina, offering a curated selection of contemporary pieces and accessories. Drop by to discover something new while enjoying the waterfront atmosphere.",
  },
  store("canvas", "Canvas", "Explore creative pieces and unique finds to take home."),
  store("valu", "Valu", "Convenient financial services, right in the heart of the Marina."),
  store(
    "beauty-salon",
    "Beauty Salon",
    "Beauty and personal-care services for a little time to yourself.",
  ),
  store(
    "pharmacy",
    "Pharmacy",
    "Everyday healthcare essentials, conveniently available at the Marina.",
  ),
  store(
    "natural-pharmacy",
    "Natural Pharmacy",
    "Natural wellness products and everyday health essentials.",
  ),
  store("seda-fabrics-and-curtains", "Seda Fabrics & Curtains"),
  store("ebony-and-ivory", "Ebony & Ivory", "Discover a curated retail experience at the Marina."),
  store("bonhomia", "Bonhomia", "A distinctive shopping experience with unique lifestyle finds."),
  store("concrete", "Concrete", "Contemporary fashion and style, right by the waterfront."),
  store("cheers-egypt", "Cheers Egypt", "A convenient retail stop for your everyday needs."),
  store(
    "black-welders",
    "Black Welders",
    "Practical services supporting the everyday needs of the community.",
  ),
  store(
    "go-bus",
    "Go Bus",
    "Convenient transportation services connecting Somabay with your journey.",
  ),
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
