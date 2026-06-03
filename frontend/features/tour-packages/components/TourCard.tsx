import { TourPackage } from "../types";
import { MapPin, Clock, Car } from "lucide-react";
/* eslint-disable @next/next/no-img-element */
import { Link } from "@/i18n/routing";

interface TourCardProps {
  tour: TourPackage;
}

export function TourCard({ tour }: TourCardProps) {
  return (
    <div className="glass-card overflow-hidden flex flex-col h-full">
      <Link href={`/customer/tours/${tour.id}`} className="block relative h-48 w-full bg-muted group overflow-hidden">
        <img 
          src={tour.image} 
          alt={tour.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
          <h3 className="font-display text-xl font-semibold text-white leading-tight">{tour.name}</h3>
        </div>
      </Link>
      
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-start gap-1.5 text-muted-foreground text-sm">
          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
          <span className="line-clamp-1">{tour.location}</span>
        </div>
        
        <div className="flex items-center justify-between text-muted-foreground text-sm">
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{tour.duration_hours}h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car className="h-4 w-4" />
            <span className="capitalize truncate max-w-[100px]">{tour.vehicle_type}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">${tour.price.toFixed(2)}</span>
          </div>
          <Link href={`/bookings/new?type=tour&id=${tour.id}`} className="btn-primary py-2 px-4 text-sm">
            Book
          </Link>
        </div>
      </div>
    </div>
  );
}
