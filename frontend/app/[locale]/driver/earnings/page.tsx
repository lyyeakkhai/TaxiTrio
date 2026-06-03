"use client";

import { useDriverEarnings } from "@/features/driver-earnings/hooks";
import { EarningsSummary } from "@/features/driver-earnings/components/EarningsSummary";
import { EarningsTable } from "@/features/driver-earnings/components/EarningsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function DriverEarningsPage() {
  const { data: earnings, isLoading, isError } = useDriverEarnings();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto pb-24">
      <h1 className="font-display text-3xl font-bold mb-2">Earnings</h1>
      <p className="text-muted-foreground mb-8">Track your income from completed trips.</p>

      {isLoading && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
            <Skeleton className="h-32 w-full rounded-2xl" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </div>
      )}

      {isError && (
        <div className="glass-card p-10 flex flex-col items-center justify-center text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="font-bold text-xl mb-2">Failed to load earnings</h3>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      )}

      {earnings && (
        <>
          <EarningsSummary earnings={earnings} />
          <h2 className="text-xl font-semibold mb-4">Earnings History</h2>
          <EarningsTable earnings={earnings} />
        </>
      )}
    </div>
  );
}
