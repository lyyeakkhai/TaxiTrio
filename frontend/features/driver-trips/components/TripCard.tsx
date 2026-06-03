import { Booking } from "../types";
import { Link } from "@/i18n/routing";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Users, ChevronRight } from "lucide-react";

export function TripCard({ booking }: { booking: Booking }) {
  return (
    <Link href={`/driver/trips/${booking.id}`} className="block group">
      <div className="glass-card p-5 transition-all group-hover:border-primary/50 relative overflow-hidden">
        {booking.status === "assigned" && (
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
             <div className="absolute top-4 -right-8 bg-blue-500 text-white text-[10px] font-bold py-1 px-8 transform rotate-45">NEW</div>
          </div>
        )}
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg capitalize">{booking.booking_type} Trip</h3>
            <p className="text-sm text-muted-foreground">ID: {booking.id.substring(0, 8)}...</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{booking.travel_date} at {booking.travel_time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 shrink-0" />
            <span>{booking.passenger_count} Passengers</span>
          </div>
        </div>
        
        <div className="border-t border-border pt-3 flex justify-between items-center text-primary text-sm font-medium">
          <span>Manage trip</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
