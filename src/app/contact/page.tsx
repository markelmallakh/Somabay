import { ContactChannels } from "@/components/sections/contact/ContactChannels";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { routes } from "@/config/routes";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Somabay about homes, holidays, events and services. Call the 16390 hotline or send us a message.",
  path: routes.contact,
});

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactChannels />
    </>
  );
}
