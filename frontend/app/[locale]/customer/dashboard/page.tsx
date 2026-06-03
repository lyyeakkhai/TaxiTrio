"use client";

import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import { Car, Map, Palmtree, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function CustomerDashboard() {
  const { user, isLoaded } = useUser();

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">
          {!isLoaded ? <Skeleton className="h-9 w-64" /> : `Welcome back, ${user?.firstName || "Traveler"}`}
        </h1>
        <p className="text-muted-foreground">What would you like to book today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/customer/taxis" className="block group h-full cursor-pointer">
          <div className="glass-card p-6 h-full transition-all group-hover:border-primary/50 flex flex-col">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
              <Car className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">Book a Taxi</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">Find verified drivers with transparent pricing for your trips around the city.</p>
            <div className="flex items-center text-primary text-sm font-medium mt-auto">
              Browse Taxis <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
        
        <Link href="/customer/routes" className="block group h-full cursor-pointer">
          <div className="glass-card p-6 h-full transition-all group-hover:border-secondary/50 flex flex-col">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 text-secondary">
              <Map className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-secondary transition-colors duration-200">Intercity Routes</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">Fixed-price intercity travel packages tailored for your convenience.</p>
            <div className="flex items-center text-secondary text-sm font-medium mt-auto">
              Browse Routes <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
        
        <Link href="/customer/tours" className="block group h-full cursor-pointer">
          <div className="glass-card p-6 h-full transition-all group-hover:border-accent/50 flex flex-col">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
              <Palmtree className="h-6 w-6" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors duration-200">Tour Packages</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-1">Curated tour experiences with trusted local guides and vehicles.</p>
            <div className="flex items-center text-accent text-sm font-medium mt-auto">
              Browse Tours <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}