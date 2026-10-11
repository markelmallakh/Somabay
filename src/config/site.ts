const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://somabay.com";

export const siteConfig = {
  name: "Somabay",
  title: "Somabay — Life at the edge of the Red Sea",
  description:
    "Somabay is a luxury Red Sea destination in Egypt: a 10 million m² peninsula surrounded by the sea on three sides, home to world-class hotels, residences, championship golf, wellness and adventure.",
  tagline: "A luxury Red Sea destination in Egypt",
  url: siteUrl.replace(/\/$/, ""),
  locale: "en_US",
  ogImage: {
    src: "/images/og/somabay-og.jpg",
    width: 1200,
    height: 630,
    alt: "Aerial view of the Somabay peninsula surrounded by the Red Sea",
  },
  contact: {
    hotline: "16390",
    hotlineHref: "tel:16390",
    email: "support@somabay.com",
  },
  location: {
    name: "Somabay, Red Sea Governorate, Egypt",
    latitude: 26.8526,
    longitude: 33.9853,
  },
  social: [
    { label: "Facebook", href: "https://www.facebook.com/somabay/", icon: "facebook" },
    { label: "Instagram", href: "https://www.instagram.com/somabayredsea/", icon: "instagram" },
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCB4fqJtu_omg3FQra6J3W6Q",
      icon: "youtube",
    },
  ],
  apps: {
    ios: "https://apps.apple.com/app/somabay-app/id1480983011",
    android: "https://play.google.com/store/apps/details?id=com.moonshot.somaBayApp",
  },
  virtualTour: "https://idvdigital.com/360-vr/somabay/",
  languages: [{ code: "en", label: "English" }],
  credit: "Mitchdesigns",
} as const;

export type SocialIcon = (typeof siteConfig.social)[number]["icon"];
