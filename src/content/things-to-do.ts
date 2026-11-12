import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import type { Cta, DirectoryItem, Highlight, SectionIntro } from "@/types/content";
import type { ImageAsset, MediaAsset } from "@/types/media";
import { highlights } from "./experiences";

export const thingsToDoHero = {
  eyebrow: "Experience Somabay",
  title: "Things To Do in Somabay",
  image: image(
    "/images/library/watersports/img-7103.webp",
    "A kitesurfer riding the bay beneath a sky of kites",
    { position: "50% 45%" },
  ),
  /** The activities scattered around the title, drifting apart as the photo opens. */
  scatter: [
    image("/images/things-to-do/ttd-golf.webp", "A golfer on the green by the sea"),
    image("/images/library/diving/0c5a8241-1.webp", "Fish along a coral wall"),
    image("/images/things-to-do/ttd-spa.webp", "The thalasso spa"),
    image("/images/things-to-do/ttd-beaches.webp", "The beach at Somabay"),
    image("/images/library/tennis/muo-1476.webp", "A player serving at the tennis academy"),
    image("/images/things-to-do/ttd-watersports.webp", "Watersports on the bay"),
    image("/images/things-to-do/ttd-playpark.webp", "Children at the play park"),
    image("/images/library/beaches/mg-8327.webp", "The Somabay swing in the sea at sunset"),
    image("/images/things-to-do/ttd-sports.webp", "Sports at Somabay"),
    image("/images/things-to-do/ttd-habitat.webp", "The habitat garden"),
  ] satisfies ImageAsset[],
  overview: {
    eyebrow: "Overview",
    title: "Something for Every Kind of Day",
    description:
      "From the calm of a morning by the sea to the thrill of exploring beneath it, Somabay brings together experiences for every mood and every pace. Dive into the Red Sea, play a round of golf, recharge at the spa, stay active, or simply slow down and enjoy the bay.",
  } satisfies SectionIntro,
};

/** Drone loop for the scroll-expanding film on the Things To Do page. */
export const thingsToDoFilm = video({
  label: "Drone view of a yacht over the Red Sea reef",
  poster: image("/images/video/reef-boat-loop-poster.webp", ""),
  sources: [{ src: "/videos/reef-boat-loop.webm", type: "video/webm" }],
});

export const golfTeaser = {
  title: "Golf At Somabay",
  subtitle: "Play Where the Sea Meets the Greens",
  statement:
    "Set against the Red Sea and surrounded by breathtaking landscapes, Somabay offers a distinctive 18-hole golf experience for every level. Discover exceptional courses, refine your game with expert coaching, compete in events, or simply enjoy a round in one of Egypt’s most memorable settings.",
  wide: image(
    "/images/library/golf/hidden-cove.webp",
    "The golf course running along the Red Sea at sunset",
  ),
  links: [
    {
      title: "Tee Booking",
      description: "Choose your preferred course and tee time, then book your round with ease.",
      href: `${routes.activity("golf")}#tee-booking`,
    },
    {
      title: "Golf Courses",
      description:
        "Explore Somabay’s courses and discover a variety of layouts, from championship golf to shorter rounds, all shaped by the natural beauty of the bay.",
      href: `${routes.activity("golf")}#courses`,
    },
    {
      title: "Golf Academy",
      description:
        "From first swings to advanced coaching, learn from experienced professionals and find a program that matches your goals.",
      href: `${routes.activity("golf")}#academy`,
    },
    {
      title: "Golf Events",
      description:
        "Discover tournaments, recurring activations, and golf events that bring players together throughout the year.",
      href: `${routes.activity("golf")}#golf-events`,
    },
  ],
  cta: { label: "Explore Soma Golf", href: routes.activity("golf") } satisfies Cta,
};

export const sportsIntro: SectionIntro & { cta: Cta } = {
  title: "Sports at Somabay",
  description:
    "Book a court, join a class, train with a coach, or become part of a community that makes sport part of everyday life.",
  cta: { label: "Explore", href: routes.activity("sports") },
};

/**
 * Each sport's details (shown in its side drawer) are verbatim from its somabay.com directory
 * page (somabay.com/directories). The 7BFT Kite House page exists only in German: its
 * description here is an English translation. Crossfit opens Bayfit, the fitness studio whose
 * classes include functional training. Horse riding has no supplied photography yet; it uses a
 * desert-sunset placeholder.
 */
/** Photos from the venue's own somabay.com directory page, saved full size as WebP. */
export const venuePhotos = (folder: string, count: number, alt: string) =>
  Array.from({ length: count }, (_, index) =>
    image(
      // Every file here is in the media manifest (generated from public/images).
      `/images/things-to-do/directory/${folder}/${String(index + 1).padStart(2, "0")}.webp` as Parameters<
        typeof image
      >[0],
      alt,
    ),
  );

export const directions = (url: string) => ({ label: "Get directions", href: url, external: true });

export const sports: DirectoryItem[] = [
  {
    id: "padel-tennis",
    // Draft tagline, to be confirmed.
    kicker: "Fast rallies with Red Sea views",
    title: "Padel Tennis",
    chip: "Padel Tennis",
    images: [
      image("/images/library/tennis/muo-2568.webp", "Players on a hard court"),
      ...venuePhotos("padel", 6, "Padel tennis at Somabay"),
    ],
    description:
      "Somabay offers an exhilarating sporting experience against the backdrop of stunning Red Sea views. Combining elements of tennis and squash, this fast-paced game is perfect for players of all skill levels. Whether you’re a seasoned pro or a beginner, Somabay’s Padel Tennis courts provide the ideal setting for a fun and exciting match with friends or family. Enjoy the thrill of the game while soaking up the beautiful surroundings, making Padel Tennis at Somabay a must-try activity for visitors and residents alike.",
    hours: "7:00 AM – 12:00 AM",
    phones: ["+20 122 350 3528"],
    infoLink: directions("https://maps.app.goo.gl/qMmGnYs8Asuyqou26"),
  },
  {
    id: "squash",
    // Draft tagline, to be confirmed.
    kicker: "Quick, intense games on indoor courts",
    title: "Squash",
    chip: "Squash",
    images: [
      image("/images/library/sports/sportsss-16.webp", "The indoor sports hall"),
      ...venuePhotos("squash", 1, "The squash courts"),
    ],
    description:
      "Offering two state-of-the-art squash courts, designed to challenge and inspire players of all levels. Whether you are a seasoned squash enthusiast or a newcomer to the game, our courts offer the perfect space to refine your skills and enjoy exhilarating matches with friends or fellow guests.",
    hours: "7:00 AM – 12:00 AM",
    phones: ["+20 122 350 3528"],
    infoLink: directions("https://maps.app.goo.gl/39uUBxQjyGvHrTB58"),
  },
  {
    id: "kite-surfing",
    // Draft tagline, to be confirmed.
    kicker: "Steady winds over flat, shallow water",
    title: "7BFT Kite House",
    chip: "Kite Surfing",
    images: [
      image("/images/library/watersports/kiters.webp", "Kites over the bay"),
      ...venuePhotos("kite-house", 6, "Kitesurfing at the 7BFT Kite House"),
    ],
    description:
      "The 7BFT Kite House is one of the best kite spots in the world, with fantastic kitesurfing conditions all year round. The 7BFT school offers training for beginners and advanced riders, as well as VDWS licences up to “Instructor” level. Every afternoon there is a free introductory lesson to get closer to kiting and learn to love it.",
    location: "7BFT Kite House, Somabay",
    hours: "Station 8:00 – 18:30 · Water 8:30 – 17:00",
    phones: ["+20 100 844 8534"],
  },
  {
    id: "horse-riding",
    // Draft tagline, to be confirmed.
    kicker: "Desert and beach rides at sunset",
    title: "Jasmine Horse Stable",
    chip: "Horse Riding",
    images: [
      image("/images/library/lifestyle/067a1105-final.webp", "Desert sunset over the coast"),
      ...venuePhotos("jasmine-stable", 9, "Riding with Jasmine Horse Stable"),
    ],
    description:
      "Enjoy horseback riding during Somabay’s beautiful sunset on our sandy beaches. Jasmine stable also offers horseback riding desert trips for individuals and groups.",
    location: "Somabay Main Gate",
    hours: "8:00 AM – 7:00 PM",
    phones: ["+20 106 249 5099 (EN/AR)", "+20 127 306 4113 (EN/GR)"],
  },
  {
    id: "tennis",
    // Draft tagline, to be confirmed.
    kicker: "Courts and coaching for every level",
    title: "Tennis",
    chip: "Tennis",
    images: [
      image("/images/library/tennis/muo-1476.webp", "A player serving at the tennis academy"),
      ...venuePhotos("tennis", 3, "The tennis courts"),
    ],
    description:
      "Experience the ultimate in tennis luxury at Somabay with our four premium grass courts, meticulously maintained to ensure a top-notch playing surface. Whether you are a casual player looking for a friendly match or a serious competitor honing your skills, our courts provide the perfect environment for your game. And when it is time to refuel and recharge, our healthy food and beverage corner has you covered, offering a delectable selection of nutritious options to keep you energized and refreshed throughout your stay. From freshly squeezed juices to wholesome salads and light bites, we are dedicated to helping you maintain a healthy lifestyle while enjoying all that Somabay has to offer.",
    hours: "7:00 AM – 12:00 AM",
    phones: ["+20 122 350 3528"],
    infoLink: directions("https://maps.app.goo.gl/Dazgha7j1MtUa4hL9"),
  },
  {
    id: "crossfit",
    // Draft tagline, to be confirmed.
    kicker: "Functional training with a sea view",
    title: "Bayfit",
    chip: "Crossfit",
    images: [
      image("/images/library/sports/sportsss-14.webp", "A fitness studio with sea views"),
      ...venuePhotos("bayfit", 9, "Training at Bayfit"),
    ],
    description:
      "Bayfit is featuring a fitness studio with top notch sports equipment and adrenaline, pumping classes such as dance, yoga, HIIT, functional training, boxing and other exercise for physical wellbeing.",
    hours: "7:00 AM – 10:00 PM",
    phones: ["+20 155 600 5693"],
    infoLink: directions("https://maps.app.goo.gl/tVizhQis3iWq86DP6"),
  },
];

export type ActivityDetail = {
  slug: string;
  title: string;
  eyebrow: string;
  heroTitle: string;
  summary: string;
  description: string;
  card: ImageAsset;
  hero: MediaAsset;
  gallery: ImageAsset[];
};

export const activityDetails: ActivityDetail[] = [
  {
    slug: "spa-and-thalasso",
    title: "Spa & Thalasso",
    eyebrow: "Spa & Thalasso",
    heroTitle: "Reconnect with yourself",
    summary:
      "Wellness experiences inspired by the healing power of the Red Sea, designed to restore your body, mind, and spirit.",
    description:
      "Wellness inspired by the Red Sea, designed to restore body, mind, and spirit. Discover tailored treatments, restorative packages, and Thalasso experiences created to help you slow down, recharge, and feel your best.",
    card: image("/images/things-to-do/spa.webp", "A guest in the thalasso pool beneath arches"),
    hero: image("/images/things-to-do/spa.webp", "The thalasso pool beneath Moorish arches", {
      position: "50% 70%",
    }),
    gallery: [
      image("/images/things-to-do/spa.webp", "The thalasso pool"),
      image("/images/library/kaktus/muo-1605.webp", "A relaxation lounge"),
      image("/images/library/beaches/mg-7758.webp", "Sunrise yoga by the sea"),
      image("/images/library/kaktus/soma-17.webp", "A quiet seating corner"),
      image("/images/library/kaktus/muo-1607.webp", "Natural textures in the lounge"),
      image("/images/library/beaches/img-1663.webp", "The sea at golden hour"),
    ],
  },
  {
    slug: "watersports-and-diving",
    title: "Watersports & Diving",
    eyebrow: "Into the Blue",
    heroTitle: "Watersports & Diving",
    summary: "Dive into the Red Sea and enjoy unforgettable watersports, diving, and adventures.",
    description:
      "Explore vibrant reefs, crystal waters, and endless ways to experience the Red Sea above and beneath the surface.",
    card: image(
      "/images/things-to-do/watersports.webp",
      "A diver beside a sea fan on a coral reef",
    ),
    hero: video({
      label: "Underwater footage of turtles, dolphins and the Somabay reef",
      poster: image("/images/video/into-the-blue-loop-poster.webp", ""),
      sources: [{ src: "/videos/into-the-blue-loop.webm", type: "video/webm" }],
    }),
    gallery: [
      image("/images/library/diving/0c5a8241-1.webp", "Fish along a coral wall"),
      image("/images/library/diving/img-0388.webp", "Divers over the reef"),
      image("/images/library/watersports/img-7103.webp", "A kitesurfer on the bay"),
      image("/images/library/diving/image00003.webp", "A freediver in blue water"),
      image("/images/library/watersports/img-1006.webp", "A jet ski crossing the bay"),
      image("/images/library/watersports/13kitehouse2.webp", "The kite house on the beach"),
    ],
  },
  {
    slug: "beaches-and-adventure",
    title: "Beaches & Adventure",
    eyebrow: "Things To Do",
    heroTitle: "Beaches & Adventure",
    summary:
      "Sun-soaked beaches and outdoor adventures, all set against the beauty of the Red Sea.",
    description:
      "Sun-soaked beaches and outdoor adventures, all set against the beauty of the Red Sea.",
    card: image("/images/library/beaches/mg-8327.webp", "The Somabay swing in the sea at sunset"),
    hero: video({
      label: "The Somabay swing in the sea at sunset",
      poster: image("/images/video/sunset-swing-loop-poster.webp", ""),
      sources: [{ src: "/videos/sunset-swing-loop.webm", type: "video/webm" }],
    }),
    gallery: [
      image("/images/library/beaches/somabay-may324.webp", "A family on the beach"),
      image("/images/library/beaches/img-0382.webp", "Camels on the beach at sunset"),
      image("/images/library/beaches/dsc-0648.webp", "Friends jumping on the beach"),
      image("/images/library/beaches/img-0468-1.webp", "Beach volleyball at sunset"),
      image("/images/library/beaches/dsc07223.webp", "The Simply Somabay sign by the sea"),
    ],
  },
  {
    slug: "coworking-spaces",
    title: "Coworking Spaces",
    eyebrow: "Things To Do",
    heroTitle: "Coworking Spaces",
    summary: "Work with flexibility, surrounded by the calm and beauty of the Red Sea.",
    description: "Work with flexibility, surrounded by the calm and beauty of the Red Sea.",
    card: image("/images/library/kaktus/muo-1602.webp", "The Kaktus co-working lounge"),
    hero: image("/images/library/kaktus/muo-1604.webp", "The Kaktus lounge"),
    gallery: [
      image("/images/library/kaktus/muo-1601.webp", "Lounge seating"),
      image("/images/library/kaktus/muo-1606.webp", "A quiet work corner"),
      image("/images/library/kaktus/soma-17.webp", "A reading chair"),
      image("/images/library/kaktus/muo-1599.webp", "The Kaktus facade"),
    ],
  },
  {
    slug: "habitat",
    title: "Habitat",
    eyebrow: "Things To Do",
    heroTitle: "Habitat",
    summary: "Discover Somabay’s natural landscapes, wildlife, and unique surroundings.",
    description: "Discover Somabay’s natural landscapes, wildlife, and unique surroundings.",
    card: image("/images/library/beaches/img-2841.webp", "Sun rising over the mountains"),
    hero: video({
      label: "Drone view over the Somabay reef and its turquoise shallows",
      poster: image("/images/video/yacht-reef-loop-poster.webp", ""),
      sources: [{ src: "/videos/yacht-reef-loop.webm", type: "video/webm" }],
    }),
    gallery: [
      image("/images/library/diving/img-1070.webp", "Reef fish"),
      image("/images/library/beaches/img-1664-enhanced-nr.webp", "Crabs on the shore at sunset"),
      image("/images/library/golf/hiden-cove-5.webp", "Waves on the rocky coast"),
      image("/images/library/beaches/the-jetty-1.webp", "The jetty crossing the reef"),
    ],
  },
  {
    slug: "playpark",
    title: "Playpark",
    eyebrow: "Where fun comes first",
    heroTitle: "Playpark",
    summary:
      "Playpark offers a diverse range of family and kid’s activities, ensuring an exciting experience for all. From the thrill of paintball battles to the adrenaline rush of go-karting, there is something for everyone.",
    description: "Give little ones room to play, explore, and make memories at the bay.",
    card: image("/images/library/watersports/img-1005.webp", "Water slides at the aqua park"),
    hero: image("/images/things-to-do/directory/soma-splash/03.webp", "The Soma Splash aqua park"),
    gallery: [
      image("/images/things-to-do/directory/soma-splash/01.webp", "A tube ride down the big slide"),
      image("/images/things-to-do/directory/soma-raceway/03.webp", "The Soma Raceway from above"),
      image("/images/things-to-do/directory/soma-raceway/04.webp", "Karts lined up at the start"),
      image("/images/things-to-do/directory/paintball/02.webp", "Paintball behind the barricades"),
      image("/images/things-to-do/directory/footgolf/03.webp", "Children lining up for footgolf"),
      image(
        "/images/things-to-do/directory/soma-splash/02.webp",
        "The splash tower at Soma Splash",
      ),
    ],
  },
  {
    slug: "sports",
    title: "Sports",
    eyebrow: "Move Your Way",
    heroTitle: "Sports at Somabay",
    summary:
      "Stay active with sports, fitness, and experiences designed for every level, interest, and pace.",
    description:
      "Book a court, join a class, train with a coach, or become part of a community that makes sport part of everyday life.",
    card: image(
      "/images/things-to-do/sports.webp",
      "A tennis player serving at the tennis academy",
    ),
    hero: image("/images/library/tennis/muo-1435.webp", "The tennis academy courts"),
    gallery: [
      image("/images/library/sports/img-7906.webp", "The aquatics center"),
      image("/images/library/tennis/muo-2568.webp", "Doubles on court"),
      image("/images/library/sports/sportsss-15.webp", "The fitness studio"),
      image("/images/library/tennis/muo-1651.webp", "Floodlit courts at night"),
      image("/images/library/sports/img-7922.webp", "Training lanes"),
    ],
  },
];

/** Order of the experience grid on the Things To Do page. */
export const experienceGrid = [
  "spa-and-thalasso",
  "watersports-and-diving",
  "beaches-and-adventure",
  "coworking-spaces",
  "habitat",
  "playpark",
];

export const getActivity = (slug: string) => activityDetails.find((item) => item.slug === slug);

export const moreToExperienceIntro: SectionIntro = {
  title: "More To Experience",
  description:
    "From waterfront dining to vibrant marina life, discover even more ways to experience Somabay.",
};

const marinaHighlight = highlights.find((item) => item.href === routes.marina);
const diningHighlight = highlights.find((item) => item.href === routes.dining);

export const thingsToDoHighlight: Highlight = {
  title: "Things To Do",
  description: "",
  href: routes.thingsToDo,
  image: image("/images/library/watersports/kiters.webp", "Kites over the bay"),
};

export const moreFromThingsToDo = [marinaHighlight, diningHighlight].filter(
  (item): item is Highlight => Boolean(item),
);
export const moreFromMarina = [thingsToDoHighlight, diningHighlight].filter(
  (item): item is Highlight => Boolean(item),
);
export const moreFromDining = [thingsToDoHighlight, marinaHighlight].filter(
  (item): item is Highlight => Boolean(item),
);

export const spaTreatments = [
  {
    title: "Massages",
    description:
      "Classic, deep-tissue and aromatherapy massages to release tension and restore balance.", // Draft copy, to be confirmed by the spa.
    image: image("/images/library/kaktus/muo-1605.webp", "A calm treatment lounge"),
  },
  {
    title: "Slimming",
    description:
      "Targeted treatments that tone, firm and refine, paired with guidance from our therapists.", // Draft copy, to be confirmed by the spa.
    image: image("/images/library/beaches/mg-7758.webp", "Morning yoga by the sea"),
  },
  {
    title: "Body Scrubs",
    description: "Gentle exfoliation with Red Sea salts and natural oils for soft, renewed skin.", // Draft copy, to be confirmed by the spa.
    image: image("/images/library/kaktus/muo-1607.webp", "Natural textures and soft light"),
  },
  {
    title: "Body Wraps",
    description: "Mineral-rich wraps that detoxify, hydrate and leave the body deeply relaxed.", // Draft copy, to be confirmed by the spa.
    image: image("/images/library/kaktus/soma-17.webp", "A quiet relaxation corner"),
  },
  {
    title: "Specialized Beauty Treatment",
    description: "Expert treatments tailored to your skin and needs, from brightening to firming.", // Draft copy, to be confirmed by the spa.
    image: image("/images/library/lifestyle/067a2088.webp", "A guest relaxing in a robe"),
  },
  {
    title: "Facials",
    description: "Cleansing, hydrating and anti-ageing facials for a fresh, radiant complexion.", // Draft copy, to be confirmed by the spa.
    image: image("/images/things-to-do/spa.webp", "The thalasso pool"),
  },
];

/**
 * The Cascades SPA & Thalasso packages, verbatim from thecascadesspa.com/packages (text and
 * photos). Each links to its full page there. No prices (confirmed by the spa at booking).
 */
export const spaPackages = [
  {
    id: "thalasso-de-stress-relax",
    title: "Thalasso De-Stress & Relax",
    description:
      "All treatments are designed to restore your mind and body back to its full health. Feel the tension wash away. Our holidays and vacation are also times for us to cleanse ourselves of the daily pressures of everyday life and just relax!",
    image: image(
      "/images/things-to-do/packages/thalasso-de-stress-relax.webp",
      "A therapist massaging a guest\u2019s shoulders",
    ),
    href: "https://thecascadesspa.com/packages/thalasso-de-stress-relax/",
  },
  {
    id: "thalasso-total-luxury",
    title: "Thalasso Total Luxury",
    description:
      "Healing through water, is the core definition of spa and thalasso. Enjoy submerging your body in all forms of water therapy, all in results of pure relaxation.",
    image: image(
      "/images/things-to-do/packages/thalasso-total-luxury.webp",
      "Oils and petals being prepared in a stone mortar",
    ),
    href: "https://thecascadesspa.com/packages/thalasso-total-luxury/",
  },
  {
    id: "thalasso-slimming",
    title: "Thalasso Slimming",
    description:
      "Specifically for those who want to detox or slim down during their stay. Each day is packed with a series of treatments to improve circulation and stimulate the body to get it ready for the powerful wraps and slimming massages offered.",
    image: image(
      "/images/things-to-do/packages/thalasso-slimming.webp",
      "A warm rolled towel placed on a guest\u2019s back",
    ),
    href: "https://thecascadesspa.com/packages/thalasso-slimming/",
  },
  {
    id: "thalasso-experience",
    title: "Thalasso Experience",
    description:
      "Pamper yourself with our unique treatments promoting, revitalization and relaxation.",
    image: image(
      "/images/things-to-do/packages/thalasso-experience.webp",
      "The thalasso pool beneath Moorish arches",
    ),
    href: "https://thecascadesspa.com/packages/thalasso-experience/",
  },
  {
    id: "the-cascades-experience",
    title: "The Cascades Experience",
    description: "A one-of-a-kind experience.",
    image: image(
      "/images/things-to-do/packages/the-cascades-experience.webp",
      "A sea-salt scrub being applied to a guest\u2019s back",
    ),
    href: "https://thecascadesspa.com/packages/the-cascades-experience/",
  },
  {
    id: "golfer-experience",
    title: "Golfer Experience",
    description: "Specifically designed for those wishing to relax and unwind.",
    image: image(
      "/images/things-to-do/packages/golfer-experience.webp",
      "A therapist massaging a guest\u2019s legs",
    ),
    href: "https://thecascadesspa.com/packages/golfer-experience/",
  },
];

/** Spa brochure download. The PDF has not been supplied yet, so the link is a placeholder. */
export const spaBrochure = { label: "Download brochure", href: "#" };

export const spaBooking = {
  /** Background behind the booking card, drifting in parallax. */
  image: image("/images/library/beaches/mg-7758.webp", "Sunrise yoga by the sea"),
  eyebrow: "Booking",
  title: "Your Wellness Starts Here",
  description: "Tell us what you need and we will confirm.",
  contacts: [
    { icon: "mail", label: "spa@somabay.com", href: "mailto:spa@somabay.com" },
    { icon: "phone", label: "+20 65 326 0000", href: "tel:+20653260000" },
    { icon: "pin", label: "Spa & Thalasso, Somabay, Red Sea, Egypt" },
  ] as const,
};
