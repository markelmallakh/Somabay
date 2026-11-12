import { image, video } from "@/lib/media";
import type { FormId } from "@/lib/forms";
import type { DirectoryItem } from "@/types/content";
import type { ImageAsset, VideoAsset } from "@/types/media";
import { directions, sports, venuePhotos } from "./things-to-do";

/**
 * The sections each Things To Do activity page adds under its hero and overview, following the
 * Spa & Thalasso page: the call to action under the overview, then (where there is content for
 * them) info rows, a venue slider with side drawers, a film, the gallery, and the booking form.
 *
 * Venue text, hours, phones and photos are verbatim from the Somabay directory
 * (somabay.com/directories). Anything written for the site is marked "Draft" for the team to
 * confirm.
 */

export type ActivityContact = { icon: "mail" | "phone" | "pin"; label: string; href?: string };

export type ActivitySections = {
  /** Under the overview. Usually glides down to the booking form. */
  cta?: { label: string; href: string };
  /** Rows of photo, number, name and description (the Spa treatments layout). No clicks. */
  rows?: {
    eyebrow: string;
    title: string;
    items: { title: string; description: string; image: ImageAsset }[];
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
  /** The booking card with its enquiry form, over a parallax photo. */
  booking?: {
    formId: FormId;
    eyebrow: string;
    title: string;
    description: string;
    image: ImageAsset;
    contacts: ActivityContact[];
  };
};

const bookingDescription = "Tell us what you need and we will confirm.";
const phone = (label: string, number: string): ActivityContact => ({
  icon: "phone",
  label,
  href: `tel:${number.replace(/[^+\d]/g, "")}`,
});
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

export const activitySections: Record<string, ActivitySections> = {
  "watersports-and-diving": {
    cta: { label: "Book your dive or trip", href: "#booking" },
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
      contacts: [
        phone("Boat Trips: +20 102 045 6528", "+201020456528"),
        phone("7BFT Kite House: +20 100 844 8534", "+201008448534"),
        { icon: "pin", label: "Orca Diving Center, The Breakers Hotel, Somabay" },
      ],
    },
  },

  "beaches-and-adventure": {
    cta: { label: "Plan your adventure", href: "#booking" },
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
      contacts: [
        phone("S.Cape Beach: +20 155 409 4250", "+201554094250"),
        phone("Alex Safari: +20 106 635 2755", "+201066352755"),
        phone("Jasmine Stable: +20 106 249 5099", "+201062495099"),
      ],
    },
  },

  playpark: {
    cta: { label: "Plan a family day", href: "#booking" },
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
      image: image(
        "/images/things-to-do/directory/soma-splash/04.webp",
        "Friends at the aqua park",
      ),
      contacts: [
        phone("Soma Splash: +20 65 356 2584", "+20653562584"),
        phone("Soma Raceway: +20 102 104 6046", "+201021046046"),
        phone("Footgolf: +20 122 350 3528", "+201223503528"),
        phone("Paintball: +20 127 227 2222", "+201272272222"),
      ],
    },
  },

  sports: {
    cta: { label: "Book a court", href: "#booking" },
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
      contacts: [
        phone("Courts: +20 122 350 3528", "+201223503528"),
        phone("Bayfit: +20 155 600 5693", "+201556005693"),
      ],
    },
  },

  "coworking-spaces": {
    cta: { label: "Book a desk", href: "#booking" },
    // Draft: the coworking rows are written for the site (no source copy yet).
    rows: {
      eyebrow: "Kaktus",
      title: "Spaces to Work",
      items: [
        {
          title: "Open Desks",
          // Draft copy, to be confirmed.
          description:
            "Bright, flexible desks for a few hours of focus, with fast Wi-Fi and views of the bay.",
          image: image("/images/library/kaktus/muo-1601.webp", "Open desks in the Kaktus lounge"),
        },
        {
          title: "Quiet Corners",
          // Draft copy, to be confirmed.
          description: "Calm nooks for calls and deep work, away from the buzz of the lounge.",
          image: image("/images/library/kaktus/muo-1606.webp", "A quiet work corner"),
        },
        {
          title: "Lounge",
          // Draft copy, to be confirmed.
          description: "Soft seating to read, meet or unwind between sessions, coffee in hand.",
          image: image("/images/library/kaktus/soma-17.webp", "A reading chair in the lounge"),
        },
        {
          title: "Meetings",
          // Draft copy, to be confirmed.
          description: "Space to bring the team together, with everything set up for your session.",
          image: image("/images/library/kaktus/muo-1604.webp", "The Kaktus lounge"),
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
    cta: { label: "Explore the reef", href: "/things-to-do/watersports-and-diving" },
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
  },
};

export const getActivitySections = (slug: string): ActivitySections => activitySections[slug] ?? {};
