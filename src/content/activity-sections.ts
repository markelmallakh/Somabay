import { image, video } from "@/lib/media";
import type { FormId } from "@/lib/forms";
import type { DirectoryItem } from "@/types/content";
import type { ImageAsset, VideoAsset } from "@/types/media";
import {
  directions,
  spaBooking,
  spaBrochure,
  spaPackages,
  spaTreatments,
  sports,
  venuePhotos,
} from "./things-to-do";

/**
 * The sections every Things To Do activity page shows under its hero, one template for all of
 * them (first built for Spa & Thalasso): the overview with its call to action, info rows (the
 * treatments layout), a venue slider with side drawers, a film, the gallery, packages on deep
 * turquoise and the booking form. A page skips any section it has no content for; a page with
 * venues shows them in place of packages, so the same activities never appear twice.
 *
 * Venue text, hours, phones and photos are verbatim from the Somabay directory
 * (somabay.com/directories). Anything written for the site is marked "Draft" for the team to
 * confirm.
 */

export type ActivityContact = { icon: "mail" | "phone" | "pin"; label: string; href?: string };

export type ActivityPackage = {
  id: string;
  title: string;
  description: string;
  image: ImageAsset;
  /** An outside page, or (by default) the booking form on this page. */
  href?: string;
};

export type ActivitySections = {
  /** The overview's eyebrow ("Overview" when not set). */
  overviewEyebrow?: string;
  /** The overview statement (the activity's summary when not set). */
  overview?: string;
  /** Under the overview. Usually glides down to the booking form. */
  cta?: { label: string; href: string };
  /** Rows of photo, number, name and description (the Spa treatments layout). No clicks. */
  rows?: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; image: ImageAsset }[];
    /** A button beside the heading, e.g. a brochure download. */
    aside?: { label: string; href: string };
  };
  /** A slider of venues, each opening a side drawer with its photos and details. */
  venues?: { eyebrow: string; title: string; description?: string; items: DirectoryItem[] };
  /** A film that grows to fill the screen as the page scrolls. */
  film?: {
    video: VideoAsset;
    eyebrow?: string;
    title: string;
    description?: string;
    /** A button under the copy, e.g. gliding down to the booking form. */
    cta?: { label: string; href: string };
  };
  /** The gallery's title ("<Activity> in Pictures" when not set). */
  galleryTitle?: string;
  /** Packages on deep turquoise, as a draggable row of cards. */
  packages?: { title: string; description: string; items: ActivityPackage[] };
  /** The booking card with its enquiry form, over a parallax photo. */
  booking?: {
    formId: FormId;
    eyebrow: string;
    title: string;
    description: string;
    image: ImageAsset;
    /** `teal`: the booking card in deep turquoise with orange touches. */
    tone?: "light" | "teal";
    /** General contacts only; a page with venues keeps each venue's contacts in its own card. */
    contacts?: ActivityContact[];
  };
};

const bookingDescription = "Tell us what you need and we will confirm.";
const sport = (id: string) => sports.find((item) => item.id === id)!;

/* -------------------------------------------------------------------------------------------- */
/* Watersports & Diving                                                                          */
/* -------------------------------------------------------------------------------------------- */

const orcaDiving: DirectoryItem = {
  id: "orca-diving",
  title: "Orca Diving Center",
  chip: "Diving",
  images: venuePhotos("orca-diving", 6, "Diving the Somabay reef with Orca"),
  description:
    "Somabay offers an unparalleled opportunity for beginners and advanced divers alike to wonder at the beautiful sea life and fantastic sites at its renowned house reef that is accessible via a 420-meter-long jetty that stretches over a kilometer. Dive sites includes terrain such as walls, wrecks, coral gardens and drop-offs fitting for all levels of divers.\n\nFor both beginners training and advanced courses, Orca’s team of international and professional instructors provide dedicated training to ensure you can explore the reef with ease and safety. The team brings their specialist technical diving skills to offer IANTD and NRC facilities, including rebreather training and try dives. In addition to its courses, the well-equipped center is always fully stocked with top-of-the-line gear and accessories. There’s no need for divers to carry heavy equipment on long-distance travel.",
  location: "The Breakers Hotel, Somabay",
  hours: "7:00 AM – 5:00 PM",
};

const jetty: DirectoryItem = {
  id: "jetty",
  title: "The Jetty",
  chip: "Snorkeling & House Reef",
  images: venuePhotos("jetty", 5, "The jetty over the Somabay house reef"),
  description:
    "The 420 m long jetty brings you to one of the most beautiful house reefs worldwide. Advanced divers, beginners, or snorkelers – it caters for every level and everyone.\n\nYou will find fish of all kinds and sometimes even bigger inhabitants: turtles, barracudas or rays are regular visitors. If you are really lucky you might even encounter Wally – our whale shark. But there is much more to discover in this area.",
  hours: "Sunrise till Sunset",
  infoLink: directions("https://maps.app.goo.gl/wxGZKfmxKTmRWsUN8"),
};

const boatTrips: DirectoryItem = {
  id: "boat-trips",
  title: "Boat Trips",
  chip: "Boat Trips",
  images: venuePhotos("boat-trips", 7, "A boat trip on the Red Sea"),
  description:
    "Sail through the crystal clear, turquoise waters of the beautiful Red Sea. Explore the astonishing underwater world of Somabay and swim with turtles and further fellows of the sea. Enjoy the most stunning sunsets, everyone unique in their own way, and create memories for life. Offering diversity of boat trips featuring Snorkeling trips, full day trip, discovery trip, classic sunset trips and sunset tours, breakfast trips and customized kiting trips.",
  hours: "8:00 AM – 7:00 PM",
  phones: ["+20 102 045 6528"],
  infoLink: directions("https://maps.app.goo.gl/WdrE68mx8Bo33kFb8"),
};

/* -------------------------------------------------------------------------------------------- */
/* Beaches & Adventure                                                                           */
/* -------------------------------------------------------------------------------------------- */

const scapeBeach: DirectoryItem = {
  id: "scape-beach",
  title: "S.Cape Beach",
  chip: "Beach",
  images: venuePhotos("scape-beach", 6, "S.Cape Beach on the Red Sea"),
  description:
    "S.cape Beach is a stunning sandy beach located along the Red Sea, renowned for its beauty and charm. Offering a plethora of food and beverage services, as well as a variety of family and kids activities, it stands out as a prime destination for both residents and visitors of Somabay. With its picturesque surroundings and array of amenities, S.cape Beach serves as the primary beach hub for Somabay residents, providing a perfect setting for relaxation, recreation, and enjoyment by all ages.",
  hours: "10:00 AM till Sunset",
  phones: ["+20 155 409 4250"],
  infoLink: directions("https://maps.app.goo.gl/w3SRbyvpVyC8rLjKA"),
};

const alexSafari: DirectoryItem = {
  id: "alex-safari",
  title: "Alex Safari",
  chip: "Desert Safari",
  images: venuePhotos("alex-safari", 3, "A desert safari with Alex Safari"),
  description:
    "A safari desert trip is one of the most enjoyable things to do in Somabay, invade the desert with an exciting Quad bike ride or Safari trip like no other in the Red Sea and enjoy your experience",
  hours: "8:00 AM – 5:00 PM",
  phones: ["+20 106 635 2755"],
  infoLink: directions("https://maps.app.goo.gl/Sgh6npXKPgvoSDiS6"),
};

const hopper: DirectoryItem = {
  id: "hopper",
  title: "Hopper",
  chip: "Getting Around",
  images: venuePhotos("hopper", 3, "Golf carts and bikes from Hopper"),
  description:
    "Your ride around Somabay where you can rent a golf cart, bike, electric bike & scooter. Also Taxi services is available.",
  hours: "9:00 AM – 5:00 PM",
  phones: ["+20 127 227 2222"],
  infoLink: directions("https://maps.app.goo.gl/Sgh6npXKPgvoSDiS6"),
};

/* -------------------------------------------------------------------------------------------- */
/* Playpark: the four venues. Their lines come from the Playpark directory text.                */
/* -------------------------------------------------------------------------------------------- */

const somaSplash: DirectoryItem = {
  id: "soma-splash",
  title: "Soma Splash",
  chip: "Aqua Park",
  images: venuePhotos("soma-splash", 4, "Slides at the Soma Splash aqua park"),
  description:
    "For those seeking aquatic adventures, the aqua park promises hours of fun-filled splashing and sliding.",
  hours: "9:00 AM – 5:00 PM",
  phones: ["+20 65 356 2584"],
  infoLink: directions("https://maps.app.goo.gl/nNiiEFZJtSGJ1pZy9"),
};

const somaRaceway: DirectoryItem = {
  id: "soma-raceway",
  title: "Soma Raceway",
  chip: "Go-Karting",
  images: venuePhotos("soma-raceway", 6, "Go-karts on the Soma Raceway"),
  description: "The adrenaline rush of go-karting.",
  hours: "12:00 PM – 12:00 AM",
  phones: ["+20 102 104 6046"],
  infoLink: directions("https://maps.app.goo.gl/pnzQycftfFhP9uad9"),
};

const footgolf: DirectoryItem = {
  id: "footgolf",
  title: "Footgolf",
  chip: "Footgolf",
  images: venuePhotos("footgolf", 6, "Footgolf on the greens"),
  description:
    "Families can bond over games of footgolf, combining soccer skills with the precision of golf.",
  hours: "7:00 AM – 12:00 AM",
  phones: ["+20 122 350 3528"],
  infoLink: directions("https://maps.app.goo.gl/o2GWNdP38Hqt7APu6"),
};

const paintball: DirectoryItem = {
  id: "paintball",
  title: "Paintball",
  chip: "Paintball",
  images: venuePhotos("paintball", 3, "A paintball battle"),
  description: "The thrill of paintball battles.",
  hours: "6:00 PM – 12:00 AM",
  phones: ["+20 127 227 2222"],
  infoLink: directions("https://maps.app.goo.gl/TqZM4vsJxgU9Mem58"),
};

/* -------------------------------------------------------------------------------------------- */
/* Pages                                                                                         */
/* -------------------------------------------------------------------------------------------- */

const dir = (folder: string, number: string, alt: string) =>
  image(
    // Every file here is in the media manifest (generated from public/images).
    `/images/things-to-do/directory/${folder}/${number}.webp` as Parameters<typeof image>[0],
    alt,
  );

// DRAFT COPY: every overview, row, package title and package line marked "Draft" below was
// written for the site from the venues' directory facts; confirm with each operator before launch.

export const activitySections: Record<string, ActivitySections> = {
  "spa-and-thalasso": {
    overviewEyebrow: "Treatments overview",
    overview:
      "Wellness inspired by the Red Sea, designed to restore body, mind, and spirit. Discover tailored treatments, restorative packages, and Thalasso experiences created to help you slow down, recharge, and feel your best.",
    cta: { label: "Book treatment", href: "#booking" },
    rows: {
      eyebrow: "Treatments",
      title: "Our Treatments",
      items: spaTreatments,
      aside: spaBrochure,
    },
    galleryTitle: "Discover Your Retreat",
    packages: {
      title: "Wellness Packages",
      description:
        "Discover thoughtfully designed packages that bring together treatments and experiences for a deeper sense of renewal.",
      items: spaPackages,
    },
    booking: {
      formId: "spa",
      eyebrow: spaBooking.eyebrow,
      title: spaBooking.title,
      description: spaBooking.description,
      image: spaBooking.image,
      contacts: [...spaBooking.contacts],
    },
  },

  "watersports-and-diving": {
    // Draft overview.
    overview:
      "The Red Sea is at its clearest around Somabay. Step off the 420 m jetty onto one of the most beautiful house reefs, learn to dive with Orca, sail out on a boat trip, or ride the steady winds across the bay with 7BFT Kite House.",
    cta: { label: "Book your dive or trip", href: "#booking" },
    rows: {
      eyebrow: "Experiences",
      title: "Ways to Enjoy the Water",
      items: [
        {
          title: "Scuba Diving",
          description:
            "From first try dives to advanced and technical courses with Orca, on walls, wrecks, coral gardens and drop-offs.",
          image: image("/images/library/diving/img-0388.webp", "Divers over the reef"),
        },
        {
          title: "Snorkeling",
          // Draft.
          description:
            "Step off the jetty onto the house reef, where turtles, barracudas and rays are regular visitors.",
          image: dir("jetty", "02", "Stepping down from the jetty into the sea"),
        },
        {
          title: "Kitesurfing",
          // Draft.
          description:
            "Steady winds and a wide, shallow bay, with lessons for first-timers and space for experienced riders.",
          image: image("/images/library/watersports/img-7103.webp", "A kitesurfer on the bay"),
        },
        {
          title: "Boat Trips",
          description:
            "Snorkeling trips, full days, breakfast trips and classic sunset tours on the turquoise water.",
          image: dir("boat-trips", "05", "A boat anchored over the reef"),
        },
        {
          title: "Fun on the Water",
          // Draft.
          description:
            "Banana rides and towables for friends and families, straight from the beach.",
          image: dir("kite-house", "06", "Friends on a banana boat ride"),
        },
      ],
    },
    venues: {
      eyebrow: "Dive, Sail & Kite",
      title: "On and Under the Water",
      description:
        "Dive the house reef, snorkel from the jetty, set sail or learn to kite. Tap any card for hours, contacts and directions.",
      items: [orcaDiving, jetty, boatTrips, sport("kite-surfing")],
    },
    film: {
      video: video({
        label: "Drone view of guests sunbathing on a boat over the turquoise reef",
        poster: image("/images/video/boat-reef-drone-loop-poster.webp", ""),
        sources: [{ src: "/videos/boat-reef-drone-loop.webm", type: "video/webm" }],
      }),
      eyebrow: "Boat Trips",
      title: "Sail the Red Sea",
      description:
        "Sail through the crystal clear, turquoise waters of the beautiful Red Sea. Explore the astonishing underwater world of Somabay and swim with turtles and further fellows of the sea.",
      cta: { label: "Book a boat trip", href: "#booking" },
    },
    booking: {
      formId: "watersports",
      eyebrow: "Booking",
      // Draft title.
      title: "Plan Your Time on the Water",
      description: bookingDescription,
      image: image("/images/library/diving/img-0388.webp", "Divers over the reef"),
    },
  },

  "beaches-and-adventure": {
    // Draft overview.
    overview:
      "Long sandy beaches meet the desert at Somabay. Spend the day at S.Cape Beach, ride into the desert with Alex Safari, take a horse along the shore at sunset with Jasmine Stable, or pick up a bike from Hopper and explore at your own pace.",
    cta: { label: "Plan your adventure", href: "#booking" },
    rows: {
      eyebrow: "Experiences",
      title: "Ways to Spend the Day",
      items: [
        {
          title: "Beach Days",
          description:
            "S.Cape Beach, with food and drink by the sea and family and kids’ activities all day.",
          image: dir("scape-beach", "03", "Swimmers and a kayak at S.Cape Beach"),
        },
        {
          title: "Desert Safari",
          description:
            "An exciting quad bike ride or safari trip into the desert, like no other on the Red Sea.",
          image: dir("alex-safari", "01", "Quad bikes on a desert safari"),
        },
        {
          title: "Horse Riding",
          // Draft.
          description:
            "Rides along the shore with Jasmine Stable, for first-timers and confident riders alike.",
          image: dir("jasmine-stable", "03", "A rider on the beach at sunset"),
        },
        {
          title: "Beach Games",
          // Draft.
          description: "Volleyball and games on the sand as the heat of the day softens.",
          image: image("/images/library/beaches/img-0468-1.webp", "Beach volleyball at sunset"),
        },
        {
          title: "Getting Around",
          description:
            "Rent a golf cart, bike, electric bike or scooter from Hopper to find your own way.",
          image: dir("hopper", "01", "Friends cycling along the promenade"),
        },
      ],
    },
    venues: {
      eyebrow: "Beach & Desert",
      title: "Sand, Sea and Desert Trails",
      description:
        "From a day at S.Cape Beach to safaris, sunset rides and wheels to get around. Tap any card for hours, contacts and directions.",
      items: [scapeBeach, alexSafari, sport("horse-riding"), hopper],
    },
    booking: {
      formId: "adventure",
      eyebrow: "Booking",
      // Draft title.
      title: "Plan Your Day Out",
      description: bookingDescription,
      image: image("/images/library/beaches/img-0382.webp", "Camels on the beach at sunset"),
    },
  },

  playpark: {
    cta: { label: "Plan a family day", href: "#booking" },
    // Draft rows.
    rows: {
      eyebrow: "For Every Age",
      title: "Something for Everyone",
      items: [
        {
          title: "Little Ones",
          description:
            "Splash pools, small slides and the tipping bucket at Soma Splash, made for younger children.",
          image: dir("soma-splash", "04", "Children under the tipping bucket"),
        },
        {
          title: "Thrill Seekers",
          description:
            "Tall slides and tube rides for older children and teens after a bigger splash.",
          image: dir("soma-splash", "01", "A tube ride down the big slide"),
        },
        {
          title: "Racing",
          description:
            "The adrenaline rush of go-karting on the Soma Raceway, open from noon until midnight.",
          image: dir("soma-raceway", "05", "Karts crossing the start line"),
        },
        {
          title: "Games on the Green",
          description:
            "Footgolf, combining soccer skills with the precision of golf, for the whole family.",
          image: dir("footgolf", "03", "Children lining up for footgolf"),
        },
        {
          title: "Night Battles",
          description: "The thrill of paintball battles after dark, for friends and groups.",
          image: dir("paintball", "03", "Paintball teams ready for battle"),
        },
      ],
    },
    venues: {
      eyebrow: "Where fun comes first",
      title: "Four Ways to Play",
      description:
        "Splash, race, kick and battle: tap any card for its photos, hours and contacts.",
      items: [somaSplash, somaRaceway, footgolf, paintball],
    },
    booking: {
      formId: "playpark",
      eyebrow: "Booking",
      // Draft title.
      title: "Book Your Family Day",
      description: bookingDescription,
      image: dir("soma-splash", "04", "Friends at the aqua park"),
    },
  },

  sports: {
    overview:
      "Stay active with sports, fitness, and experiences designed for every level, interest, and pace. Book a court, join a class, train with a coach, or become part of a community that makes sport part of everyday life.",
    cta: { label: "Book a court", href: "#booking" },
    // Draft rows.
    rows: {
      eyebrow: "Sports",
      title: "Choose Your Sport",
      items: [
        {
          title: "Tennis",
          description:
            "Courts at the Tennis Academy, with coaching for every level and floodlights for evening play.",
          image: image("/images/library/tennis/muo-1563.webp", "A player on the academy courts"),
        },
        {
          title: "Padel",
          description: "Fast, social games on the padel courts, for pairs of every level.",
          image: dir("padel", "02", "A padel match"),
        },
        {
          title: "Fitness Studio",
          description: "A fully equipped gym at Bayfit for strength, cardio and recovery.",
          image: dir("bayfit", "02", "The Bayfit fitness studio"),
        },
        {
          title: "Group Classes",
          description: "Classes outdoors and in the studio, from functional training to yoga.",
          image: dir("bayfit", "09", "A group class on the green"),
        },
        {
          title: "Swimming",
          description: "Long lanes in the outdoor aquatics center for training and laps.",
          image: image("/images/library/sports/img-7906.webp", "The aquatics center lanes"),
        },
      ],
    },
    venues: {
      eyebrow: "Courts, Studio & More",
      title: "Find Your Game",
      description:
        "Courts, a fitness studio, kitesurfing and riding. Tap any card for photos, hours, contacts and directions.",
      items: sports,
    },
    booking: {
      formId: "sports",
      eyebrow: "Booking",
      // Draft title.
      title: "Book Your Game",
      description: bookingDescription,
      image: image("/images/library/tennis/muo-1651.webp", "Floodlit courts at night"),
    },
  },

  "coworking-spaces": {
    // Draft overview.
    overview:
      "Work with flexibility, surrounded by the calm and beauty of the Red Sea. At Kaktus, open desks, quiet corners and a bright lounge make it easy to stay focused, with the beach never far away.",
    cta: { label: "Book a desk", href: "#booking" },
    // Draft: the coworking rows are written for the site (no source copy yet).
    rows: {
      eyebrow: "Kaktus",
      title: "Spaces to Work",
      items: [
        {
          title: "Open Desks",
          description:
            "Bright, flexible desks for a few hours of focus, with fast Wi-Fi and views of the bay.",
          image: image("/images/library/kaktus/muo-1601.webp", "Open desks in the Kaktus lounge"),
        },
        {
          title: "Quiet Corners",
          description: "Calm nooks for calls and deep work, away from the buzz of the lounge.",
          image: image("/images/library/kaktus/muo-1606.webp", "A quiet work corner"),
        },
        {
          title: "Lounge",
          description: "Soft seating to read, meet or unwind between sessions, coffee in hand.",
          image: image("/images/library/kaktus/soma-17.webp", "A reading chair in the lounge"),
        },
        {
          title: "Meetings",
          description: "Space to bring the team together, with everything set up for your session.",
          image: image("/images/library/kaktus/muo-1604.webp", "The Kaktus lounge"),
        },
      ],
    },
    // Draft packages.
    packages: {
      title: "Workspace Plans",
      description: "From a single day to a month at the bay: choose how you like to work.",
      items: [
        {
          id: "day-pass",
          title: "Day Pass",
          description: "A desk for the day, Wi-Fi and coffee included.",
          image: image("/images/library/kaktus/muo-1605.webp", "The Kaktus lounge"),
        },
        {
          id: "weekly-desk",
          title: "Weekly Desk",
          description: "Your own spot for the week, ready whenever you are.",
          image: image("/images/library/kaktus/muo-1607.webp", "A quiet seat by the wall"),
        },
        {
          id: "monthly",
          title: "Monthly Membership",
          description:
            "Work from the bay for a month, with access to the lounge and meeting space.",
          image: image("/images/library/kaktus/muo-1599.webp", "The Kaktus building"),
        },
        {
          id: "work-and-swim",
          title: "Work & Swim",
          description: "A day at your desk with a break by the pool between calls.",
          image: image("/images/library/kaktus/soma-23.webp", "Sunbeds by the Kaktus pool"),
        },
      ],
    },
    booking: {
      formId: "coworking",
      eyebrow: "Booking",
      // Draft title.
      title: "Reserve Your Space",
      description: bookingDescription,
      image: image("/images/library/kaktus/muo-1602.webp", "The Kaktus co-working lounge"),
      contacts: [
        { icon: "phone", label: "16390", href: "tel:16390" },
        { icon: "mail", label: "support@somabay.com", href: "mailto:support@somabay.com" },
      ],
    },
  },

  habitat: {
    // Draft overview.
    overview:
      "Discover Somabay’s natural landscapes, wildlife, and unique surroundings: a living house reef, coral gardens, quiet shorelines and the Red Sea Mountains rising behind the bay.",
    cta: { label: "Plan a nature day", href: "#booking" },
    rows: {
      eyebrow: "Wildlife & Landscapes",
      title: "Life Around the Bay",
      items: [
        {
          title: "The House Reef",
          description:
            "You will find fish of all kinds and sometimes even bigger inhabitants: turtles, barracudas or rays are regular visitors. If you are really lucky you might even encounter Wally – our whale shark.",
          image: image("/images/library/diving/img-1070.webp", "Reef fish over the coral"),
        },
        {
          title: "Coral Gardens",
          description:
            "Dive sites includes terrain such as walls, wrecks, coral gardens and drop-offs fitting for all levels of divers.",
          image: image("/images/library/diving/0c5a8241-1.webp", "Fish along a coral wall"),
        },
        {
          title: "The Shoreline",
          // Draft copy, to be confirmed.
          description:
            "Rocky coves, tidal pools and sandy bays where crabs and wading birds gather at sunset.",
          image: image(
            "/images/library/beaches/img-1664-enhanced-nr.webp",
            "Crabs on the shore at sunset",
          ),
        },
        {
          title: "Desert & Mountains",
          // Draft copy, to be confirmed.
          description:
            "The Red Sea Mountains rise behind the bay, glowing gold at sunrise over the open desert.",
          image: image("/images/library/beaches/img-2841.webp", "Sun rising over the mountains"),
        },
      ],
    },
    // Draft packages.
    packages: {
      title: "Nature Experiences",
      description: "Ways to see the reef, the shore and the desert at their best.",
      items: [
        {
          id: "reef-snorkel",
          title: "Guided Reef Snorkel",
          description: "Follow a guide along the jetty and over the house reef, mask on.",
          image: dir("jetty", "04", "The jetty over the reef from above"),
        },
        {
          id: "turtle-trip",
          title: "Turtle Boat Trip",
          description: "Head out by boat to swim with turtles over the shallow reefs.",
          image: dir("boat-trips", "06", "A boat over the turquoise reef"),
        },
        {
          id: "sunrise-shore",
          title: "Sunrise on the Shore",
          description: "An early start to watch the sun rise over the mountains and the sea.",
          image: image("/images/library/beaches/mg-6915.webp", "Sunrise over the mountains"),
        },
        {
          id: "desert-ride",
          title: "Desert Sunset Ride",
          description:
            "Ride out at golden hour with Jasmine Stable, along the shore and the dunes.",
          image: dir("jasmine-stable", "06", "Riders at sunset"),
        },
      ],
    },
    booking: {
      formId: "adventure",
      eyebrow: "Booking",
      // Draft title.
      title: "Plan Your Time in Nature",
      description: bookingDescription,
      image: image("/images/library/golf/hiden-cove-5.webp", "Waves on the rocky coast"),
      contacts: [
        { icon: "phone", label: "16390", href: "tel:16390" },
        { icon: "mail", label: "support@somabay.com", href: "mailto:support@somabay.com" },
      ],
    },
  },
};

export const getActivitySections = (slug: string): ActivitySections => activitySections[slug] ?? {};
