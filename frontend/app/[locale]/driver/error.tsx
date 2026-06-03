"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DriverError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="glass-card py-16 px-4 text-center mt-10 max-w-lg mx-auto">
      <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Oops! Something broke.</h2>
      <p className="text-muted-foreground mb-6">
        We couldn&apos;t load this part of your dashboard. Please try again.
      </p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
