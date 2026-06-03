"use client";

import { useDriverProfile, useToggleAvailability } from "@/features/auth/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, AlertTriangle, MessageSquare, Star } from "lucide-react";
import { Link } from "@/i18n/routing";

export default function DriverDashboardPage() {
  const { data: profile, isLoading, isError } = useDriverProfile();
  const { mutate: toggleAvailability, isPending } = useToggleAvailability();

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48 mb-8" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load profile</h2>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  const isApproved = profile.verification_status === "approved";

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto pb-24">
      <h1 className="font-display text-3xl font-bold mb-8">Dashboard</h1>

      {!isApproved && (
        <div className="mb-8 p-6 glass-card border-yellow-500/20 bg-yellow-500/5 flex items-start space-x-4">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1 shrink-0" />
          <div>
            <h3 className="font-bold text-yellow-500 mb-1">Account Pending Verification</h3>
            <p className="text-sm text-yellow-500/80">
              Your driver account is currently under review by our admins. You cannot go online or receive bookings until you are approved.
            </p>
          </div>
        </div>
      )}

      <div className="glass-card p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold capitalize mb-1">Status: {profile.is_available ? "Online" : "Offline"}</h2>
          <p className="text-muted-foreground">Toggle your availability to start receiving trips.</p>
        </div>
        
        <div className="flex items-center space-x-4 bg-surface-dim p-4 rounded-xl">
          <Label htmlFor="availability-toggle" className="text-lg font-medium cursor-pointer">
            {profile.is_available ? "Go Offline" : "Go Online"}
          </Label>
          <Switch 
            id="availability-toggle" 
            checked={profile.is_available} 
            disabled={!isApproved || isPending}
            onCheckedChange={(checked) => toggleAvailability(checked)}
            className="scale-125"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6">
          <h3 className="font-semibold text-lg mb-4 text-muted-foreground">Profile Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">License</span>
              <span className="font-medium font-mono">{profile.license_number}</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Rating</span>
              <span className="font-medium flex items-center">
                {profile.rating.toFixed(1)} <Star className="h-4 w-4 text-yellow-500 ml-1 fill-yellow-500" />
              </span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted-foreground">Languages</span>
              <span className="font-medium">{profile.languages.join(", ")}</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-muted-foreground">Telegram Notifications</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {profile.telegram_chat_id 
                ? "Your Telegram account is linked. You will receive booking notifications instantly." 
                : "Link your Telegram account to receive instant booking alerts and manage trips."}
            </p>
          </div>
          
          {profile.telegram_chat_id ? (
            <div className="flex items-center text-green-500 bg-green-500/10 p-4 rounded-xl">
              <CheckCircle2 className="h-5 w-5 mr-3" /> Telegram Linked
            </div>
          ) : (
            <Link href="/driver/telegram-link" className="btn-primary w-full justify-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Link Telegram Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}