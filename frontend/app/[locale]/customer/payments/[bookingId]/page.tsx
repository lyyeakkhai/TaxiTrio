"use client";

import { useParams } from "next/navigation";
import { usePayment } from "@/features/payment/hooks";
import { PaymentStatus } from "@/features/payment/components/PaymentStatus";
import { BakongPaymentWidget } from "@/features/payment/components/BakongPaymentWidget";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function PaymentPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const { data: payment, isLoading, isError } = usePayment(bookingId);

  if (isLoading) {
    return (
      <div className="container max-w-3xl mx-auto py-10 px-4">
        <Skeleton className="h-8 w-32 mb-8" />
        <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
      </div>
    );
  }

  if (isError || !payment) {
    return (
      <div className="container max-w-3xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Details Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn&apos;t load the payment details for this booking.</p>
        <Link href={`/customer/bookings/${bookingId}`} className="btn-primary">Back to Booking</Link>
      </div>
    );
  }

  const isUnpaid = payment.status === "unpaid";

  return (
    <div className="container max-w-3xl mx-auto py-10 px-4 pb-24 sm:px-6">
      <Link href={`/customer/bookings/${bookingId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Booking
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Payment</h1>
        <p className="text-muted-foreground">Complete your payment securely via Bakong KHQR.</p>
      </div>

      <div className="space-y-8">
        <PaymentStatus payment={payment} />
        
        {isUnpaid && (
          <div className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-6">Make a Payment</h2>
            <BakongPaymentWidget bookingId={payment.booking_id} amount={payment.amount} />
          </div>
        )}
      </div>
    </div>
  );
}
