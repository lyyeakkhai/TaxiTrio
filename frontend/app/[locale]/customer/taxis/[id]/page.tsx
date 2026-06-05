"use client";

import { useParams } from "next/navigation";
import { useTaxis } from "@/features/taxi-browser/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import {
  ArrowLeft,
  AlertCircle,
  Car,
  Users,
  Luggage,
  Star,
  Languages,
  ShieldCheck,
  Clock,
  Tag,
  ArrowRight,
} from "lucide-react";
import { type Taxi } from "@/features/taxi-browser/types";

const comfortColors: Record<string, string> = {
  Standard: "text-accent-secondary bg-accent-secondary/10 border-accent-secondary/20",
  Premium: "text-accent-primary bg-accent-primary/10 border-accent-primary/20",
  VIP: "text-primary bg-primary/10 border-primary/20",
};

const taxiTypeLabels: Record<string, string> = {
  Sedan: "Sedan",
  SUV: "SUV",
  Van: "Van",
  Minibus: "Minibus",
};

export default function TaxiDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: taxis, isLoading, isError } = useTaxis();

  const taxi: Taxi | undefined = taxis?.find((t) => t.id === id);

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <Skeleton className="h-6 w-32 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="h-72 w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-5 w-1/2 rounded-lg" />
            <Skeleton className="h-32 w-full rounded-xl" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !taxi) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Taxi Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The vehicle you&apos;re looking for doesn&apos;t exist or is no longer available.
        </p>
        <Link href="/customer/taxis" className="btn-primary">
          Back to Taxis
        </Link>
      </div>
    );
  }

  const { driver } = taxi;

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6 pb-24">
      <Link
        href="/customer/taxis"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Taxis
      </Link>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Vehicle Photo */}
        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={taxi.photo}
            alt={taxi.model}
            className="w-full h-72 object-cover"
          />
          <div className="p-4 bg-surface-dim border-t border-border flex items-center justify-between">
            <span className="text-sm font-mono text-muted-foreground">
              {taxi.plate_number}
            </span>
            <span
              className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                comfortColors[taxi.comfort_category] ?? ""
              }`}
            >
              {taxi.comfort_category}
            </span>
          </div>
        </div>

        {/* Vehicle Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-1">
              {taxi.model}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Car className="h-4 w-4" />
              {taxiTypeLabels[taxi.type] ?? taxi.type}
            </div>
          </div>

          {/* Capacity */}
          <div className="glass-card p-5 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <Users className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Passengers</p>
                <p className="font-semibold">{taxi.passenger_capacity}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                <Luggage className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Luggage</p>
                <p className="font-semibold">{taxi.luggage_capacity} bags</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Tag className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Category</p>
                <p className="font-semibold">{taxi.comfort_category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                  taxi.is_active
                    ? "bg-state-success/10 text-state-success"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Availability</p>
                <p className="font-semibold">
                  {taxi.is_active ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>

          {/* Driver Info */}
          <div className="glass-card p-5">
            <h2 className="font-display font-semibold text-base mb-4">
              Assigned Driver
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {driver.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">{driver.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck
                    className={`h-4 w-4 ${
                      driver.verification_status === "approved"
                        ? "text-state-success"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className="text-xs capitalize text-muted-foreground">
                    {driver.verification_status}
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1 bg-accent-primary/10 px-3 py-1.5 rounded-full">
                <Star className="h-4 w-4 fill-accent-primary text-accent-primary" />
                <span className="font-bold text-sm text-accent-primary">
                  {driver.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-border text-sm text-muted-foreground">
              <Languages className="h-4 w-4 shrink-0" />
              <span>Speaks: {driver.languages.join(", ")}</span>
            </div>
          </div>

          {/* Book CTA */}
          <Link
            href={`/customer/bookings/new?taxiId=${taxi.id}`}
            className="btn-primary w-full justify-center flex items-center gap-2"
          >
            Book This Taxi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
