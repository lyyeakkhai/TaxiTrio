"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  ArrowLeft,
  Camera,
  ShieldCheck,
  Save,
} from "lucide-react";
import { Link } from "@/i18n/routing";

export default function CustomerProfilePage() {
  const { user, isLoaded } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [initialized, setInitialized] = useState(false);

  if (isLoaded && !initialized) {
    setFirstName(user?.firstName ?? "");
    setLastName(user?.lastName ?? "");
    setPhone(
      user?.phoneNumbers?.[0]?.phoneNumber ?? ""
    );
    setInitialized(true);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({ firstName, lastName });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4 sm:px-6 pb-24">
      <Link
        href="/customer/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">
          My Profile
        </h1>
        <p className="text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Avatar Section */}
      <div className="glass-card p-6 mb-6">
        <div className="flex items-center gap-6">
          {!isLoaded ? (
            <Skeleton className="h-20 w-20 rounded-full" />
          ) : (
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-2 border-primary/30">
                {user?.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-primary" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-primary flex items-center justify-center shadow-lg hover:bg-primary/80 transition-colors"
                title="Change photo"
              >
                <Camera className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          )}
          <div>
            {!isLoaded ? (
              <>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <h2 className="font-display font-semibold text-xl">
                  {user?.fullName || "Traveler"}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-state-success">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Account
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Form */}
      {!isLoaded ? (
        <div className="glass-card p-8 space-y-6">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="glass-card p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-display font-semibold mb-2">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  placeholder="First name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10"
                  placeholder="Last name"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                value={user?.primaryEmailAddress?.emailAddress ?? ""}
                readOnly
                disabled
                className="pl-10 opacity-60 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Email cannot be changed here. Manage it via your account settings.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
                placeholder="+855 xx xxx xxxx"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={isSaving} className="gap-2">
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
