import { Review } from "../types";
import { Star, User as UserIcon } from "lucide-react";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
            <UserIcon className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="font-medium text-sm">{review.customer_name || "Unknown Customer"}</p>
            <p className="text-xs text-muted-foreground">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center">
          <span className="font-bold mr-1">{review.rating.toFixed(1)}</span>
          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
        </div>
      </div>
      
      {review.message ? (
        <p className="text-sm text-foreground/90 italic flex-grow">&quot;{review.message}&quot;</p>
      ) : (
        <p className="text-sm text-muted-foreground italic flex-grow">No written feedback provided.</p>
      )}
      
      <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground font-mono text-right">
        Booking: {review.booking_id.substring(0, 8)}
      </div>
    </div>
  );
}
