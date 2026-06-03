import { Booking } from "../types";
import { Link } from "@/i18n/routing";
import { StatusBadge } from "./StatusBadge";
import { Calendar, Users, ChevronRight } from "lucide-react";

interface BookingCardProps {
  booking: Booking;
}

export function BookingCard({ booking }: BookingCardProps) {
  return (
    <Link href={`/customer/bookings/${booking.id}`} className="block group cursor-pointer">
      <div className="glass-card p-5 transition-all group-hover:border-primary/50">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-display font-semibold text-lg capitalize">{booking.booking_type} Booking</h3>
            <p className="text-sm text-muted-foreground">ID: {booking.id.substring(0, 8)}...</p>
          </div>
          <StatusBadge status={booking.status} />
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{booking.travel_date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{booking.passenger_count} Pax</span>
          </div>
        </div>
        
        <div className="border-t border-border pt-3 flex justify-between items-center text-primary text-sm font-medium">
          <span>View details</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
