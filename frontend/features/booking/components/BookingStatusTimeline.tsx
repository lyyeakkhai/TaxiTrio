import { BookingDetail } from "../types";
import { CheckCircle2, Clock } from "lucide-react";

export function BookingStatusTimeline({ booking }: { booking: BookingDetail }) {
  const history = [...booking.status_history].sort((a, b) => new Date(a.changed_at).getTime() - new Date(b.changed_at).getTime());
  
  return (
    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {history.map((event, index) => {
        const isLast = index === history.length - 1;
        const isCancelled = event.status === 'cancelled' || event.status === 'rejected';
        
        return (
          <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${isLast && !isCancelled ? 'bg-primary text-primary-foreground' : isCancelled ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
              {isLast && !isCancelled ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-4 rounded-xl shadow-sm">
              <div className="flex items-center justify-between space-x-2 mb-1">
                <div className="font-bold capitalize">{event.status.replace('_', ' ')}</div>
                <time className="text-xs font-medium text-muted-foreground">
                  {new Date(event.changed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </time>
              </div>
              <div className="text-sm text-muted-foreground">
                {new Date(event.changed_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
