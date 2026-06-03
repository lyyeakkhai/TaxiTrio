import { BookingForm } from "@/features/booking/components/BookingForm";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewBookingPage() {
  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <Suspense fallback={<Skeleton className="h-[600px] w-full max-w-2xl mx-auto rounded-2xl" />}>
        <BookingForm />
      </Suspense>
    </div>
  );
}
