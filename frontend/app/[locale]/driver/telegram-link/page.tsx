"use client";

import { TelegramLinkFlow } from "@/features/telegram-link/components/TelegramLinkFlow";
import { useDriverProfile } from "@/features/auth/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2 } from "lucide-react";

export default function TelegramLinkPage() {
  const { data: profile, isLoading } = useDriverProfile();

  if (isLoading) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <Skeleton className="h-10 w-48 mb-8" />
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    );
  }

  const isLinked = !!profile?.telegram_chat_id;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto pb-24">
      <h1 className="font-display text-3xl font-bold mb-2">Telegram Setup</h1>
      <p className="text-muted-foreground mb-10">Configure your bot notifications.</p>

      {isLinked ? (
        <div className="glass-card p-12 max-w-2xl mx-auto text-center flex flex-col items-center">
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Successfully Linked!</h2>
          <p className="text-muted-foreground max-w-md">
            Your Telegram account is connected to TaxiTrio. You will now receive instant booking assignments and updates directly on your phone.
          </p>
        </div>
      ) : (
        <TelegramLinkFlow />
      )}
    </div>
  );
}
