"use client";

import { useTaxis } from "../hooks";
import { TaxiCard } from "./TaxiCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export function TaxiGrid() {
  const { data: taxis, isLoading, isError } = useTaxis();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="glass-card overflow-hidden h-[380px]">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="p-5 flex flex-col gap-4">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full mt-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-10 w-10 text-destructive mb-4" />
        <h3 className="font-display text-xl font-semibold mb-2">Failed to load taxis</h3>
        <p className="text-muted-foreground">Please try again later or contact support.</p>
      </div>
    );
  }

  if (!taxis || taxis.length === 0) {
    return (
      <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
        <h3 className="font-display text-xl font-semibold mb-2">No taxis available</h3>
        <p className="text-muted-foreground">We couldn&apos;t find any active taxis at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {taxis.map((taxi, index) => (
        <div key={taxi.id} className="reveal visible" style={{ animationDelay: `${index * 100}ms` }}>
          <TaxiCard taxi={taxi} />
        </div>
      ))}
    </div>
  );
}
