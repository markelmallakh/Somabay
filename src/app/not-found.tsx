import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[80svh] flex-col justify-center pt-(--header-height) pb-24">
      <Stack gap="md" align="start">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="max-w-3xl text-h1">This part of the bay is still being charted.</h1>
        <p className="max-w-xl text-lead text-slate">
          The page you are looking for doesn’t exist yet or has moved. Let’s get you back to the
          shoreline.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button href={routes.home} variant="solid">
            Back to home
          </Button>
          <Button href={routes.contact} variant="outline">
            Contact us
          </Button>
        </div>
      </Stack>
    </Container>
  );
}
