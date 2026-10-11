import { image } from "@/lib/media";
import type { Facility } from "@/types/content";

export const facilities: Facility[] = [
  {
    title: "Education & Schools",
    description:
      "Quality learning within a close-knit coastal community, with schools designed to help children learn, grow, and thrive.",
    image: image("/images/facilities/education.webp", "Children building sandcastles on the beach"),
  },
  {
    title: "Medical Centers",
    description:
      "Accessible healthcare and professional medical support for residents and visitors, whenever you need it.",
    icon: "medical",
  },
  {
    title: "Maintenance",
    description:
      "Reliable maintenance services to keep your home comfortable, cared for, and running smoothly, from everyday repairs to essential home services.",
    icon: "maintenance",
  },
  {
    title: "Mobility & Transfers",
    description:
      "Convenient transportation and transfer services that make getting around Somabay simple and seamless.",
    image: image("/images/facilities/mobility.webp", "A palm-lined arrival court at Somabay"),
  },
];
