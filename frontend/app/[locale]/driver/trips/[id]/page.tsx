"use client";

import { useParams } from "next/navigation";
import { useDriverBooking } from "@/features/driver-trips/hooks";
import { TripActions } from "@/features/driver-trips/components/TripActions";
import { StatusBadge } from "@/features/driver-trips/components/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle, Calendar, Clock, Users, FileText, Phone, User as UserIcon } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function DriverTripDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: booking, isLoading, isError } = useDriverBooking(id);

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-6 w-32 mb-8" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Trip Not Found</h2>
        <p className="text-muted-foreground mb-6">The trip you are looking for does not exist or has been removed.</p>
        <Link href="/driver/trips" className="btn-primary">Back to Trips</Link>
      </div>
    );
  }

  const isCompletedOrCancelled = ["completed", "cancelled", "rejected"].includes(booking.status);

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto pb-24">
      <Link href="/driver/trips" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Trips
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2 capitalize">{booking.booking_type} Trip</h1>
          <p className="text-muted-foreground text-sm font-mono">ID: {booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6 md:p-8">
            <h2 className="font-semibold text-lg mb-6 border-b border-border pb-2">Itinerary</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <Calendar className="h-4 w-4" /> Date
                </div>
                <p className="font-medium">{booking.travel_date}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <Clock className="h-4 w-4" /> Time
                </div>
                <p className="font-medium">{booking.travel_time}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <Users className="h-4 w-4" /> Passengers
                </div>
                <p className="font-medium">{booking.passenger_count}</p>
              </div>
            </div>
            
            {booking.special_notes && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center text-muted-foreground text-sm gap-2 mb-2">
                  <FileText className="h-4 w-4" /> Customer Notes
                </div>
                <p className="text-sm bg-surface-dim p-4 rounded-lg">{booking.special_notes}</p>
              </div>
            )}
          </div>

          <div className="glass-card p-6 md:p-8">
            <h2 className="font-semibold text-lg mb-6 border-b border-border pb-2">Customer Info</h2>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-medium">{booking.customer_name || "Unknown Customer"}</p>
                  <p className="text-sm text-muted-foreground">Customer</p>
                </div>
              </div>
              {booking.customer_phone && (
                <a href={`tel:${booking.customer_phone}`} className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors text-primary">
                  <Phone className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-1 space-y-6">
          {!isCompletedOrCancelled && (
            <div className="glass-card p-6 border-primary/20 bg-primary/5">
              <h3 className="font-semibold mb-4 text-primary">Action Required</h3>
              <TripActions bookingId={booking.id} status={booking.status} />
            </div>
          )}
          
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 text-muted-foreground">Payment Information</h3>
            <p className="text-sm mb-1">Method: <span className="font-bold uppercase">{booking.payment_method}</span></p>
            {booking.payment_method === 'cash' && (
              <p className="text-xs text-yellow-500 bg-yellow-500/10 p-2 rounded mt-2">
                Collect cash from customer at the end of the trip.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
