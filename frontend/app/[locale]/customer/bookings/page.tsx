"use client";

import { useMyBookings } from "@/features/booking/hooks";
import { BookingCard } from "@/features/booking/components/BookingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function BookingsPage() {
  const { data: bookings, isLoading, isError } = useMyBookings();

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Manage and track all your travel bookings.</p>
        </div>
        <Link href="/customer/dashboard" className="btn-primary text-sm hidden md:flex">
          New Booking
        </Link>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-5 h-[160px]">
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="font-display text-xl font-semibold mb-2">Failed to load bookings</h3>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      )}

      {bookings && bookings.length === 0 && (
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
            <Car className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">No bookings yet</h3>
          <p className="text-muted-foreground max-w-md mb-6">You haven&apos;t made any bookings. Start exploring our taxis, routes, and tours!</p>
          <Link href="/customer/dashboard" className="btn-primary">Explore Options</Link>
        </div>
      )}

      {bookings && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div key={booking.id} className="reveal visible" style={{ animationDelay: `${index * 50}ms` }}>
              <BookingCard booking={booking} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
