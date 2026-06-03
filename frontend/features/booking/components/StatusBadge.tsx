import { Badge } from "@/components/ui/badge";
import { BookingStatusEnum } from "../types";
import { z } from "zod";

type BookingStatus = z.infer<typeof BookingStatusEnum>;

const statusMap: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 border-yellow-500/50" },
  assigned: { label: "Driver Assigned", className: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 border-blue-500/50" },
  accepted: { label: "Accepted", className: "bg-indigo-500/20 text-indigo-500 hover:bg-indigo-500/30 border-indigo-500/50" },
  driver_arrived: { label: "Driver Arrived", className: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 border-purple-500/50" },
  in_progress: { label: "In Progress", className: "bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 border-orange-500/50" },
  completed: { label: "Completed", className: "bg-green-500/20 text-green-500 hover:bg-green-500/30 border-green-500/50" },
  cancelled: { label: "Cancelled", className: "bg-red-500/20 text-red-500 hover:bg-red-500/30 border-red-500/50" },
  rejected: { label: "Rejected", className: "bg-destructive/20 text-destructive hover:bg-destructive/30 border-destructive/50" },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = statusMap[status] || { label: status, className: "bg-muted text-muted-foreground border-muted" };
  
  return (
    <Badge variant="outline" className={`${config.className} px-2.5 py-0.5 rounded-full font-medium`}>
      {config.label}
    </Badge>
  );
}
