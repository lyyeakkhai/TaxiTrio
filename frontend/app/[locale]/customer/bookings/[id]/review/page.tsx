"use client";

import { useParams } from "next/navigation";
import { useBooking } from "@/features/booking/hooks";
import { ReviewForm } from "@/features/reviews/components/ReviewForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

export default function BookingReviewPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: booking, isLoading, isError } = useBooking(id);

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-6">
        <Skeleton className="h-6 w-32 mb-8" />
        <Skeleton className="h-40 w-full rounded-2xl mb-6" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find this booking.
        </p>
        <Link href="/customer/bookings" className="btn-primary">
          Back to Bookings
        </Link>
      </div>
    );
  }

  if (booking.status !== "completed") {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Trip Not Yet Completed</h2>
        <p className="text-muted-foreground mb-6">
          You can only leave a review after your trip has been completed.
        </p>
        <Link href={`/customer/bookings/${id}`} className="btn-primary">
          View Booking Status
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-6 pb-24">
      <Link
        href={`/customer/bookings/${id}`}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Booking
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          <Star className="h-7 w-7 text-accent-primary fill-accent-primary" />
          Rate Your Trip
        </h1>
        <p className="text-muted-foreground">
          Your feedback helps us maintain quality service and support our drivers.
        </p>
      </div>

      {/* Trip Summary Card */}
      <div className="glass-card p-6 mb-6 border-state-success/30 bg-state-success/5">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="h-5 w-5 text-state-success shrink-0" />
          <span className="font-semibold text-state-success">Trip Completed</span>
        </div>
        <div className="grid grid-cols-2 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Type: </span>
            <span className="font-medium capitalize">{booking.booking_type}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Date: </span>
            <span className="font-medium">{booking.travel_date}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Time: </span>
            <span className="font-medium">{booking.travel_time}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Passengers: </span>
            <span className="font-medium">{booking.passenger_count}</span>
          </div>
        </div>
      </div>

      {/* Review Form — reuses existing component */}
      <ReviewForm bookingId={id} />
    </div>
  );
}
