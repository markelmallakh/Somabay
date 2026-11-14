import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { KitIconName } from "@/components/ui/KitIcon";
import { SmartLink } from "@/components/ui/SmartLink";
import { DiningList } from "./DiningList";
import { MarinaPanel } from "./MarinaPanel";

/** Figma "Section / Dining" (410:20252): the dining list beside a portrait, then The Marina. */
const dining = {
  eyebrow: "Dining Experience",
  title: "Your Table Awaits",
  description:
    "From casual bites to memorable evenings, discover flavours from Egypt, Italy, Asia and beyond — all by the Red Sea.",
  more: "+ 12 more places to eat & drink around Somabay",
  cta: { label: "Explore dining", href: routes.dining },
  image: image("/images/dining/dining-bar.webp", "A guest raising a glass at a candlelit bar"),
  thumb: image("/images/dining/dining-table-by-sea.webp", "A long table set by the sea"),
  places: [
    { id: "baladina-restaurant", name: "Baladina", tag: "Egyptian" },
    { id: "kokomo", name: "Kokomo", tag: "Italian" },
    { id: "s-cape-beach-club", name: "S.Cape Beach Club", tag: "Asian" },
    { id: "sobar-rooftop", name: "Sobar Rooftop", tag: "Bar" },
    { id: "seven-fortune", name: "Seven Fortune", tag: "Café" },
    { id: "thomas-pizza", name: "Thomas Pizza", tag: "Italian" },
  ],
};

const marina = {
  eyebrow: "The Marina",
  title: "Life by the Water",
  description:
    "A lively waterfront destination where shopping, leisure, and everyday essentials come together.",
  cta: { label: "Explore the Marina", href: routes.marina },
  film: video({
    sources: [
      { src: "/videos/marina-04-scrub.webm", type: "video/webm" },
      { src: "/videos/marina-04-scrub.mp4", type: "video/mp4" },
    ],
    poster: image(
      "/images/video/marina-04-scrub-poster.webp",
      "Yachts moored along The Marina waterfront",
    ),
    label: "The Marina waterfront from the air",
  }),
  categories: [
    { label: "Fashion", icon: "handbag" },
    { label: "Groceries", icon: "cart" },
    { label: "Beauty", icon: "sparkles" },
    { label: "Pharmacy", icon: "medicine" },
    { label: "Dining", icon: "restaurant" },
    { label: "Banking", icon: "bank" },
    { label: "Transport", icon: "bus" },
  ] satisfies { label: string; icon: KitIconName }[],
};

export function DiningSection() {
  return (
    <section
      aria-labelledby="dining-title"
      data-theme-surface="light"
      className="bg-white py-section text-ink"
    >
      <Container className="flex flex-col gap-[3.75rem]">
        <div className="grid gap-8 lg:grid-cols-[800fr_560fr]">
          <div className="flex flex-col gap-8">
            <Reveal className="flex max-w-[31.25rem] flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Eyebrow>{dining.eyebrow}</Eyebrow>
                <h2 id="dining-title" className="text-heading-2">
                  {dining.title}
                </h2>
              </div>
              <p className="text-body-md text-slate">{dining.description}</p>
            </Reveal>

            <div className="flex flex-col gap-4">
              <DiningList places={dining.places} thumb={dining.thumb} />
              <SmartLink
                href={dining.cta.href}
                className="link-underline w-fit pb-0.5 text-body-sm text-slate transition-colors duration-500 ease-out-expo hover:text-ink"
              >
                {dining.more}
              </SmartLink>
            </div>

            <Reveal>
              <Button href={dining.cta.href} variant="primary" icon="arrow-up-right">
                {dining.cta.label}
              </Button>
            </Reveal>
          </div>

          <Reveal className="relative min-h-[28rem] overflow-hidden rounded-md lg:min-h-0">
            <ResponsiveImage asset={dining.image} sizes="(min-width: 1024px) 37vw, 100vw" fill />
          </Reveal>
        </div>

        {/* The Marina: film panel with a quiet line of amenities along its foot. */}
        <MarinaPanel {...marina} />
      </Container>
    </section>
  );
}
