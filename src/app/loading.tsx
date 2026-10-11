export default function Loading() {
  return (
    <div className="grid min-h-svh place-items-center" role="status">
      <span className="sr-only">Loading</span>
      <span aria-hidden className="h-px w-24 origin-left animate-pulse bg-turquoise" />
    </div>
  );
}
