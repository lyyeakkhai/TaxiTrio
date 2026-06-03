"use client";

import { useParams } from "next/navigation";
import { useRoute } from "@/features/route-packages/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, Clock, Car, MapPin, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function RouteDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: route, isLoading, isError } = useRoute(id);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4">
        <Skeleton className="h-[400px] w-full rounded-2xl mb-8" />
        <Skeleton className="h-10 w-2/3 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-8" />
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !route) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Route Not Found</h2>
        <p className="text-muted-foreground mb-6">The route you&apos;re looking for doesn&apos;t exist or is currently unavailable.</p>
        <Link href="/customer/routes" className="btn-primary">Back to Routes</Link>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 pb-24 sm:px-6">
      <Link href="/customer/routes" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Routes
      </Link>

      <div className="glass-card overflow-hidden mb-8">
        <div className="h-[300px] md:h-[400px] w-full relative">
          <img src={route.image} alt={route.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 md:p-10">
            <div>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">{route.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{route.origin} &rarr; {route.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{route.duration_hours} Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">Included Services</h2>
            <div className="grid gap-3">
              {route.included_services.split(',').map((service, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-surface-dim/50 p-4 rounded-xl border border-border">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>{service.trim()}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold mb-4">Recommended Vehicle</h2>
            <div className="flex items-center gap-4 bg-secondary/10 p-5 rounded-xl border border-secondary/20">
              <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <Car className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="font-medium text-lg capitalize">{route.recommended_vehicle}</p>
                <p className="text-sm text-muted-foreground">Optimal comfort for this distance</p>
              </div>
            </div>
          </section>
        </div>

        <div className="md:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-lg font-medium mb-2 text-muted-foreground">Total Price</h3>
            <div className="text-4xl font-bold mb-6">${route.price.toFixed(2)}</div>
            
            <Link href={`/bookings/new?type=route&id=${route.id}`} className="btn-primary w-full justify-center py-3 text-lg">
              Book This Route
            </Link>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Fixed price. No hidden fees. Secure payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
