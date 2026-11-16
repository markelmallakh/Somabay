import { routes } from "@/config/routes";
import { image, video } from "@/lib/media";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { Reveal } from "@/components/animations/Reveal";
import { SplitHeading } from "@/components/animations/SplitHeading";
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
    <>
      <section
        aria-labelledby="dining-title"
        data-theme-surface="light"
        className="bg-white text-ink"
      >
        {/* Split screen: the copy and list on the left in the site's margin, the photo filling the
            right half from the top of the section to its foot and out to the screen edge. */}
        <div className="grid lg:min-h-svh lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-8 px-gutter py-section lg:ps-site lg:pe-16">
            <div className="flex max-w-[31.25rem] flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Reveal>
                  <Eyebrow>{dining.eyebrow}</Eyebrow>
                </Reveal>
                {/* The title rises line by line out of its mask. */}
                <SplitHeading id="dining-title" className="text-heading-2">
                  {dining.title}
                </SplitHeading>
              </div>
              <Reveal delay={0.15}>
                <p className="text-body-md text-slate">{dining.description}</p>
              </Reveal>
            </div>

            <div className="flex flex-col gap-4">
              <DiningList places={dining.places} thumb={dining.thumb} />
              <SmartLink
                href={dining.cta.href}
                className="link-underline w-fit pb-0.5 text-body-sm text-slate transition-colors duration-500 ease-out-expo hover:text-ink"
              >
                {dining.more}
              </SmartLink>
            </div>

            <Reveal delay={0.2}>
              <Button href={dining.cta.href} variant="primary" icon="arrow-up-right">
                {dining.cta.label}
              </Button>
            </Reveal>
          </div>

          {/* Entrance: the photo wipes open from the foot while it settles from a zoom, then drifts
                in a clear parallax as the section scrolls. */}
          <ImageReveal
            from="bottom"
            parallax={12}
            delay={0.15}
            className="relative min-h-[32rem] overflow-hidden lg:min-h-0"
          >
            <div className="absolute inset-0">
              <ResponsiveImage asset={dining.image} sizes="(min-width: 1024px) 50vw, 100vw" fill />
            </div>
          </ImageReveal>
        </div>
      </section>
      {/* The Marina: "Somabay / Marina" parted by the film, full width, then its content. */}
      <MarinaPanel {...marina} />
    </>
  );
}
