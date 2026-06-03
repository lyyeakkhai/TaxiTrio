"use client";

import { useRoutes } from "@/features/route-packages/hooks";
import { RouteCard } from "@/features/route-packages/components/RouteCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function RoutesPage() {
  const { data: routes, isLoading, isError } = useRoutes();

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Intercity Routes</h1>
        <p className="text-muted-foreground">Fixed-price intercity travel packages tailored for your convenience.</p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card overflow-hidden h-[340px]">
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-5 flex flex-col gap-4">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-10 w-full mt-auto" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Failed to load routes</h3>
          <p className="text-muted-foreground">Please try again later or contact support.</p>
        </div>
      )}

      {routes && routes.length === 0 && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <h3 className="font-display text-xl font-semibold mb-2">No routes available</h3>
          <p className="text-muted-foreground">We couldn&apos;t find any active routes at the moment.</p>
        </div>
      )}

      {routes && routes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((route, index) => (
            <div key={route.id} className="reveal visible" style={{ animationDelay: `${index * 100}ms` }}>
              <RouteCard route={route} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
