/* eslint-disable @next/next/no-img-element */
import { Taxi } from "../types";
import { User, Star, Globe, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";

interface TaxiCardProps {
  taxi: Taxi;
}

export function TaxiCard({ taxi }: TaxiCardProps) {
  return (
    <Link href={`/customer/taxis/${taxi.id}`} className="block group h-full cursor-pointer">
      <div className="glass-card overflow-hidden h-full flex flex-col">
        <div className="relative h-48 w-full bg-muted">
          <img 
            src={taxi.photo} 
            alt={taxi.model} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
          <div className="absolute top-3 right-3 flex gap-2">
            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-none">
              {taxi.comfort_category}
            </Badge>
            {taxi.driver.is_available && (
              <Badge className="bg-green-500/80 text-white backdrop-blur-md border-none hover:bg-green-500">
                Available
              </Badge>
            )}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col gap-4">
          <div>
            <h3 className="font-display text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
              {taxi.model}
            </h3>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <span className="capitalize">{taxi.type}</span> • {taxi.passenger_capacity} Seats • {taxi.luggage_capacity} Luggage
            </p>
          </div>
          
          <div className="bg-white/5 dark:bg-black/20 rounded-lg p-3 border border-border flex items-start gap-3 mt-auto">
            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <p className="font-medium text-sm truncate">{taxi.driver.name}</p>
                {taxi.driver.verification_status === 'verified' && (
                  <ShieldCheck className="h-3.5 w-3.5 text-green-400 shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span>{taxi.driver.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 truncate">
                  <Globe className="h-3.5 w-3.5" />
                  <span className="truncate">{taxi.driver.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
