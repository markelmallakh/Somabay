import { Container } from "./Container";

/** Quiet placeholder shown while a detail page streams in after an instant navigation. */
export function PageSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="pt-[calc(var(--header-height)+3rem)] pb-section"
    >
      <Container className="flex animate-pulse flex-col gap-6">
        <div className="h-4 w-40 bg-sand-200" />
        <div className="h-14 w-full max-w-2xl bg-sand-200" />
        <div className="aspect-[2/1] w-full bg-sand-200" />
      </Container>
    </div>
  );
}
