import { image } from "@/lib/media";
import type { IconName } from "@/components/ui/Icon";

export const contactHero = {
  eyebrow: "Contact Us",
  title: "Let’s Talk",
  image: image(
    "/images/library/beaches/mg-8344.webp",
    "The Somabay swing in the sea under an evening sky",
  ),
};

export const contactChannels: {
  icon: IconName;
  label: string;
  lines: string[];
  href?: string;
}[] = [
  { icon: "phone", label: "Hotline", lines: ["16390"], href: "tel:16390" },
  { icon: "mail", label: "Email", lines: ["info@somabay.com"], href: "mailto:info@somabay.com" },
  {
    icon: "pin",
    label: "Giza Office",
    lines: ["26th of July Corridor, 1st Floor, Sheikh Zayed", "Sun – Thu | 9:00am to 4:00pm"],
  },
  {
    // The wireframe labels both offices "Giza Office"; this one is on the Red Sea — confirm the name.
    icon: "pin",
    label: "Somabay Office",
    lines: ["KM 48, Hurghada–Safaga Road, Red Sea", "Sun – Thu | 9:00am to 4:00pm"],
  },
];

export const contactStripImage = image(
  "/images/library/beaches/december-back.webp",
  "Aerial view of the Somabay peninsula",
);
