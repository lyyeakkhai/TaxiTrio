"use client";

import { useMyComplaints } from "@/features/complaints/hooks";
import { ComplaintCard } from "@/features/complaints/components/ComplaintCard";
import { Link } from "@/i18n/routing";
import { Plus, MessageSquareWarning } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComplaintsPage() {
  const { data: complaints, isLoading } = useMyComplaints();

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">My Complaints</h1>
          <p className="text-muted-foreground">View and manage your support tickets.</p>
        </div>
        <Link href="/customer/complaints/new" className="btn-primary flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Complaint
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      ) : complaints?.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <MessageSquareWarning className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Complaints Found</h2>
          <p className="text-muted-foreground">You haven't submitted any complaints yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {complaints?.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
