"use client";

import { useTours } from "@/features/tour-packages/hooks";
import { TourCard } from "@/features/tour-packages/components/TourCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function ToursPage() {
  const { data: tours, isLoading, isError } = useTours();

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Tour Packages</h1>
        <p className="text-muted-foreground">Curated tour experiences with trusted local guides and vehicles.</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card overflow-hidden h-[360px]">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 flex flex-col gap-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-auto" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Failed to load tours</h3>
          <p className="text-muted-foreground">Please try again later or contact support.</p>
        </div>
      )}

      {tours && tours.length === 0 && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-xl font-semibold mb-2">No tours available</h3>
          <p className="text-muted-foreground">We couldn&apos;t find any active tours at the moment.</p>
        </div>
      )}

      {tours && tours.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour, index) => (
            <div key={tour.id} className="reveal visible" style={{ animationDelay: `${index * 100}ms` }}>
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
