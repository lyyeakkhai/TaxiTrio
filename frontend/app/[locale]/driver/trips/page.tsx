"use client";

import { useDriverBookings } from "@/features/driver-trips/hooks";
import { TripCard } from "@/features/driver-trips/components/TripCard";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, MapPin } from "lucide-react";

export default function DriverTripsPage() {
  const { data: trips, isLoading, isError } = useDriverBookings();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto pb-24">
      <h1 className="font-display text-3xl font-bold mb-2">My Trips</h1>
      <p className="text-muted-foreground mb-8">Manage your assigned and ongoing trips.</p>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-5 h-[180px]">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="font-bold text-xl mb-2">Failed to load trips</h3>
          <p className="text-muted-foreground">There was an error fetching your trips. Please try again.</p>
        </div>
      )}

      {trips && trips.length === 0 && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
            <MapPin className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="font-bold text-xl mb-2">No trips assigned</h3>
          <p className="text-muted-foreground">You don&apos;t have any assigned or active trips at the moment. Ensure you are online to receive bookings.</p>
        </div>
      )}

      {trips && trips.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard key={trip.id} booking={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
