import { Badge } from "@/components/ui/badge";
import { BookingStatus } from "../types";

const statusMap: Record<BookingStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-500/20 text-yellow-500 border-yellow-500/50" },
  assigned: { label: "Assigned to You", className: "bg-blue-500/20 text-blue-500 border-blue-500/50" },
  accepted: { label: "Accepted", className: "bg-indigo-500/20 text-indigo-500 border-indigo-500/50" },
  driver_arrived: { label: "Arrived", className: "bg-purple-500/20 text-purple-500 border-purple-500/50" },
  in_progress: { label: "In Progress", className: "bg-orange-500/20 text-orange-500 border-orange-500/50" },
  completed: { label: "Completed", className: "bg-green-500/20 text-green-500 border-green-500/50" },
  cancelled: { label: "Cancelled", className: "bg-red-500/20 text-red-500 border-red-500/50" },
  rejected: { label: "Rejected", className: "bg-destructive/20 text-destructive border-destructive/50" },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const config = statusMap[status] || { label: status, className: "bg-muted text-muted-foreground" };
  
  return (
    <Badge variant="outline" className={`${config.className} px-2.5 py-0.5 rounded-full font-medium`}>
      {config.label}
    </Badge>
  );
}
