import { healthcareIntro, healthcareServices } from "@/content/facilities-page";
import { DevelopmentSlider } from "@/components/sections/sustainability/DevelopmentSlider";

/**
 * The Medical Center told like Sustainability's "Designed to Last": the heading leads a row of
 * large photo panels that slides sideways as the page scrolls down, each service's title, line
 * and hours rising in as its panel arrives.
 */
export function HealthcareSection() {
  return (
    <DevelopmentSlider
      id="healthcare"
      headingId="healthcare-title"
      eyebrow={healthcareIntro.eyebrow}
      title={healthcareIntro.title}
      description={healthcareIntro.description}
      tiles={healthcareServices.map((service) => ({
        label: service.title,
        description: service.description,
        image: service.image,
        meta: service.hours,
      }))}
      className="bg-sand-100"
    />
  );
}
