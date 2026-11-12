import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ContactCta } from "@/components/sections/shared/ContactCta";
import { HomeEventsSection } from "@/components/sections/home/HomeEventsSection";
import { DiningSection } from "@/components/sections/home/DiningSection";
import { FacilitiesSection } from "@/components/sections/home/FacilitiesSection";
import { HolidaysSection } from "@/components/sections/home/HolidaysSection";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { JournalSection } from "@/components/sections/home/JournalSection";
import { JourneyMap } from "@/components/sections/home/JourneyMap";
import { NeighborhoodsSection } from "@/components/sections/home/NeighborhoodsSection";
import { ResaleSection } from "@/components/sections/home/ResaleSection";
import { ThingsToDoSection } from "@/components/sections/home/ThingsToDoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import { hotels } from "@/content/hotels";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  alternates: { canonical: "/" },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  image: `${siteConfig.url}${siteConfig.ogImage.src}`,
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.location.latitude,
    longitude: siteConfig.location.longitude,
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Red Sea Governorate",
    addressCountry: "EG",
  },
  telephone: siteConfig.contact.hotline,
  sameAs: siteConfig.social.map((item) => item.href),
  includesAttraction: hotels.map((hotel) => ({ "@type": "Hotel", name: hotel.name })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      {/* The hero stays pinned while the About story slides up over it. */}
      <div className="relative">
        <HomeHero />
        <AboutSection />
      </div>
      <HolidaysSection />
      <JourneyMap />
      <NeighborhoodsSection />
      <ResaleSection />
      <ThingsToDoSection />
      <DiningSection />
      <FacilitiesSection />
      <HomeEventsSection />
      <JournalSection />
      <ContactCta />
    </>
  );
}
