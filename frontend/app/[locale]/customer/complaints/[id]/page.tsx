"use client";

import { useParams } from "next/navigation";
import { useMyComplaints } from "@/features/complaints/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  AlertCircle,
  MessageSquare,
  Clock,
  CheckCircle2,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import type { Complaint } from "@/features/complaints/types";

const statusConfig: Record<
  Complaint["status"],
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "Pending Review",
    color: "text-state-warning bg-state-warning/10 border-state-warning/20",
    icon: <Clock className="h-4 w-4" />,
  },
  reviewed: {
    label: "Under Review",
    color: "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20",
    icon: <FileSearch className="h-4 w-4" />,
  },
  resolved: {
    label: "Resolved",
    color: "text-state-success bg-state-success/10 border-state-success/20",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
};

const categoryLabels: Record<string, string> = {
  driver_behavior: "Driver Behavior",
  vehicle_condition: "Vehicle Condition",
  pricing: "Pricing Issue",
  service_quality: "Service Quality",
  other: "Other Concern",
};

export default function ComplaintDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: complaints, isLoading, isError } = useMyComplaints();

  const complaint = complaints?.find((c) => c.id === id);

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-6">
        <Skeleton className="h-6 w-32 mb-8" />
        <Skeleton className="h-12 w-full rounded-2xl mb-4" />
        <Skeleton className="h-48 w-full rounded-2xl mb-4" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !complaint) {
    return (
      <div className="container max-w-2xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Complaint Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn&apos;t find this complaint. It may have been removed.
        </p>
        <Link href="/customer/complaints" className="btn-primary">
          Back to Complaints
        </Link>
      </div>
    );
  }

  const status = statusConfig[complaint.status];

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-6 pb-24">
      <Link
        href="/customer/complaints"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Complaints
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-1">
            {categoryLabels[complaint.category] ?? complaint.category}
          </h1>
          <p className="text-muted-foreground text-sm font-mono">
            Booking: {complaint.booking_id.substring(0, 8)}...
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold ${status.color}`}
        >
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Complaint Description */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-display font-semibold text-lg">Your Complaint</h2>
        </div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {complaint.description}
        </p>
        <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
          Submitted on{" "}
          {new Date(complaint.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Admin Reply */}
      {complaint.admin_reply ? (
        <div className="glass-card p-6 border-accent-secondary/30 bg-accent-secondary/5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="h-5 w-5 text-accent-secondary" />
            <h2 className="font-display font-semibold text-lg text-accent-secondary">
              Admin Response
            </h2>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {complaint.admin_reply}
          </p>
        </div>
      ) : (
        <div className="glass-card p-6 text-center border-dashed">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-semibold mb-1">Awaiting Admin Response</p>
          <p className="text-sm text-muted-foreground">
            Our team is reviewing your complaint. We typically respond within 24–48 hours.
          </p>
        </div>
      )}
    </div>
  );
}
