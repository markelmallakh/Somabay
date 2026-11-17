import { whySomabay } from "@/content/careers";
import { Container } from "@/components/layout/Container";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { ResponsiveImage } from "@/components/media/ResponsiveImage";
import { Eyebrow } from "@/components/ui/Eyebrow";

/** "Why Work at Somabay": a portrait photo on the left, the reasons on the right. */
export function WhySomabay() {
  return (
    <section aria-labelledby="why-title" className="bg-sand-100 py-section text-ink">
      <Container className="grid items-center gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-6">
        <Parallax
          amount={10}
          className="relative aspect-[4/3] overflow-hidden rounded-md sm:aspect-[4/5] lg:col-span-5"
        >
          <div className="absolute inset-0">
            <ResponsiveImage
              asset={whySomabay.image}
              sizes="(min-width: 1024px) 40vw, 100vw"
              fill
            />
          </div>
        </Parallax>
        <Reveal className="flex flex-col gap-2 lg:col-span-6 lg:col-start-7 lg:gap-3">
          <Eyebrow>{whySomabay.eyebrow}</Eyebrow>
          <h2 id="why-title" className="text-heading-2">
            {whySomabay.title}
          </h2>
          <p className="mt-1 text-lead text-slate lg:mt-2">{whySomabay.description}</p>
          <ul className="mt-4 grid gap-x-8 border-t border-line sm:grid-cols-2">
            {whySomabay.points.map((point) => (
              <li
                key={point.title}
                className="flex flex-col gap-1.5 border-b border-line py-4 sm:py-5"
              >
                <h3 className="font-serif text-heading-6">{point.title}</h3>
                <p className="text-body-sm text-slate">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
