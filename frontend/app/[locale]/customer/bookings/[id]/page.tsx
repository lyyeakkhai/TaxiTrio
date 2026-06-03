"use client";

import { useParams } from "next/navigation";
import { useBooking, useCancelBooking } from "@/features/booking/hooks";
import { BookingStatusTimeline } from "@/features/booking/components/BookingStatusTimeline";
import { StatusBadge } from "@/features/booking/components/StatusBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, Calendar, Clock, Users, FileText, CreditCard } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";
import { ReviewForm } from "@/features/reviews/components/ReviewForm";

export default function BookingDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: booking, isLoading, isError } = useBooking(id);
  const { mutateAsync: cancelBooking, isPending: isCancelling } = useCancelBooking();

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Skeleton className="h-8 w-32 mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
          <div className="md:col-span-1">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Not Found</h2>
        <p className="text-muted-foreground mb-6">The booking you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/customer/bookings" className="btn-primary">Back to Bookings</Link>
      </div>
    );
  }

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      try {
        await cancelBooking(booking.id);
        toast.success("Booking cancelled successfully.");
      } catch (error) {
        toast.error("Failed to cancel booking.");
      }
    }
  };

  const isPending = booking.status === "pending";

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 pb-24 sm:px-6">
      <Link href="/customer/bookings" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Bookings
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-2 capitalize">{booking.booking_type} Booking</h1>
          <p className="text-muted-foreground text-sm font-mono">ID: {booking.id}</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-6">Trip Details</h2>
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
              <div className="space-y-1">
                <div className="flex items-center text-muted-foreground text-sm gap-2">
                  <CreditCard className="h-4 w-4" /> Payment
                </div>
                <p className="font-medium uppercase">{booking.payment_method}</p>
              </div>
            </div>
            
            {booking.special_notes && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center text-muted-foreground text-sm gap-2 mb-2">
                  <FileText className="h-4 w-4" /> Special Notes
                </div>
                <p className="text-sm bg-surface-dim p-4 rounded-lg">{booking.special_notes}</p>
              </div>
            )}
          </div>

          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-8">Status Timeline</h2>
            <BookingStatusTimeline booking={booking} />
          </div>

          {booking.status === "completed" && (
            <ReviewForm bookingId={booking.id} />
          )}
        </div>

        <div className="md:col-span-1 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-medium mb-4">Payment & Verification</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Check your payment status or proceed to pay via Bakong KHQR.
            </p>
            <Link href={`/customer/payments/${booking.id}`} className="btn-primary w-full justify-center">
              View Payment
            </Link>
          </div>

          {isPending && (
            <div className="glass-card p-6 border-destructive/20 bg-destructive/5">
              <h3 className="font-medium text-destructive mb-2">Cancel Booking</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You can only cancel this booking while it is in pending status.
              </p>
              <Button 
                variant="destructive" 
                className="w-full" 
                onClick={handleCancel}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Cancel Booking"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
