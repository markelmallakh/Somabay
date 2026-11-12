"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Stack } from "@/components/layout/Stack";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { siteConfig } from "@/config/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[80svh] flex-col justify-center pt-(--header-height) pb-24">
      <Stack gap="md" align="start">
        <Eyebrow>Something went wrong</Eyebrow>
        <h1 className="max-w-3xl text-h1">We couldn’t load this page.</h1>
        <p className="max-w-xl text-lead text-slate">
          Please try again. If the problem continues, our team is one call away on{" "}
          {siteConfig.contact.hotline}.
        </p>
        <div className="mt-4">
          <Button onClick={reset} variant="solid">
            Try again
          </Button>
        </div>
      </Stack>
    </Container>
  );
}
