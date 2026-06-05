"use client";

import { useState } from "react";
import {
  useDriverProfile,
  useUpdateDriverProfile,
  useToggleAvailability,
} from "@/features/auth/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  User,
  Star,
  ShieldCheck,
  ShieldX,
  Clock,
  Languages,
  Save,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
  IdCard,
} from "lucide-react";

const LANGUAGE_OPTIONS = [
  "Khmer",
  "English",
  "Chinese",
  "Japanese",
  "Korean",
  "French",
];

const verificationConfig = {
  pending: {
    label: "Pending Verification",
    color: "text-state-warning",
    icon: <Clock className="h-4 w-4" />,
  },
  approved: {
    label: "Verified Driver",
    color: "text-state-success",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
  rejected: {
    label: "Verification Rejected",
    color: "text-destructive",
    icon: <ShieldX className="h-4 w-4" />,
  },
};

export default function DriverProfilePage() {
  const { data: profile, isLoading, isError } = useDriverProfile();
  const { mutateAsync: updateProfile, isPending: isSaving } = useUpdateDriverProfile();
  const { mutateAsync: toggleAvailability, isPending: isToggling } = useToggleAvailability();

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (profile && !initialized) {
    setSelectedLanguages(profile.languages ?? []);
    setInitialized(true);
  }

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleSave = async () => {
    if (selectedLanguages.length === 0) {
      toast.error("Please select at least one language.");
      return;
    }
    await updateProfile({ languages: selectedLanguages });
  };

  const handleAvailabilityToggle = async () => {
    if (!profile) return;
    await toggleAvailability(!profile.is_available);
  };

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-6">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-64 mb-8" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="p-10 flex flex-col items-center justify-center text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Failed to load profile</h2>
        <p className="text-muted-foreground">Please try refreshing the page.</p>
      </div>
    );
  }

  const verification = verificationConfig[profile.verification_status];

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto pb-24">
      <h1 className="font-display text-3xl font-bold mb-2">My Profile</h1>
      <p className="text-muted-foreground mb-8">
        Manage your driver profile and availability settings.
      </p>

      {/* Status Card */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-7 w-7" />
            </div>
            <div>
              <div className={`flex items-center gap-2 font-semibold ${verification.color}`}>
                {verification.icon}
                {verification.label}
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="h-4 w-4 fill-accent-primary text-accent-primary" />
                <span className="text-sm font-medium">
                  {profile.rating.toFixed(1)} rating
                </span>
              </div>
            </div>
          </div>

          {/* Online/Offline Toggle */}
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Availability
            </span>
            <button
              onClick={handleAvailabilityToggle}
              disabled={isToggling}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border font-semibold text-sm transition-all ${
                profile.is_available
                  ? "bg-state-success/10 border-state-success/30 text-state-success hover:bg-state-success/20"
                  : "bg-surface-dim border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              {profile.is_available ? (
                <>
                  <ToggleRight className="h-5 w-5" /> Online
                </>
              ) : (
                <>
                  <ToggleLeft className="h-5 w-5" /> Offline
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* License Info */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <IdCard className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-display font-semibold text-lg">
            Driver Information
          </h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="license">License Number</Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="license"
                value={profile.license_number}
                readOnly
                disabled
                className="pl-10 opacity-60 cursor-not-allowed font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              License number cannot be changed. Contact admin if incorrect.
            </p>
          </div>
        </div>
      </div>

      {/* Language Selection */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Languages className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-display font-semibold text-lg">
            Languages Spoken
          </h2>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Select all languages you can communicate in with passengers.
        </p>
        <div className="flex flex-wrap gap-3">
          {LANGUAGE_OPTIONS.map((lang) => {
            const isSelected = selectedLanguages.includes(lang);
            return (
              <button
                key={lang}
                type="button"
                onClick={() => toggleLanguage(lang)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm scale-105"
                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full gap-2"
        size="lg"
      >
        <Save className="h-4 w-4" />
        {isSaving ? "Saving..." : "Save Profile"}
      </Button>
    </div>
  );
}
