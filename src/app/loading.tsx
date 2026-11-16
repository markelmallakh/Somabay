/**
 * Shown while a page's content streams in: a skeleton of the page (hero block, then heading and
 * card placeholders) with the same soft shimmer the photos use, so the wait reads as the page
 * assembling rather than a blank screen.
 */
export default function Loading() {
  return (
    <div role="status" className="min-h-svh bg-white">
      <span className="sr-only">Loading</span>
      <div aria-hidden>
        <div data-skeleton className="h-[72svh] min-h-[28rem]" />
        <div className="mx-auto flex max-w-site flex-col gap-10 px-gutter py-section">
          <div className="flex flex-col gap-4">
            <div data-skeleton className="h-3 w-32 rounded-md" />
            <div data-skeleton className="h-10 w-[min(28rem,80%)] rounded-md" />
            <div data-skeleton className="h-4 w-[min(36rem,90%)] rounded-md" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div data-skeleton className="aspect-[4/5] rounded-md" />
            <div data-skeleton className="aspect-[4/5] rounded-md" />
            <div data-skeleton className="aspect-[4/5] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
