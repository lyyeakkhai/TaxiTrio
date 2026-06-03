import { Complaint } from "../types";
import { MessageSquare, AlertTriangle, ShieldCheck } from "lucide-react";

export function ComplaintCard({ complaint }: { complaint: Complaint }) {
  const statusColors = {
    pending: "text-state-warning bg-state-warning/10 border-state-warning/20",
    reviewed: "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20",
    resolved: "text-state-success bg-state-success/10 border-state-success/20",
  };

  const statusIcons = {
    pending: <AlertTriangle className="h-4 w-4" />,
    reviewed: <MessageSquare className="h-4 w-4" />,
    resolved: <ShieldCheck className="h-4 w-4" />
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">
            {complaint.category.replace("_", " ")}
          </span>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Booking ID: {complaint.booking_id.substring(0, 8)}...
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium capitalize ${statusColors[complaint.status]}`}>
          {statusIcons[complaint.status]}
          {complaint.status}
        </div>
      </div>
      <p className="text-sm mb-4 whitespace-pre-wrap">{complaint.description}</p>
      
      {complaint.admin_reply && (
        <div className="bg-surface-dim p-4 rounded-lg mt-4 border border-border">
          <p className="text-xs font-semibold text-accent-secondary mb-2">Admin Reply:</p>
          <p className="text-sm">{complaint.admin_reply}</p>
        </div>
      )}
      <div className="text-xs text-muted-foreground mt-4">
        Submitted on {new Date(complaint.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
