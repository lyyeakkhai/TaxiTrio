"use client";

import { useNotifications } from "../hooks";
import { Bell } from "lucide-react";
import { Link } from "@/i18n/routing";

export function NotificationBell() {
  const { data: notifications } = useNotifications();
  const unreadCount = notifications?.filter(n => !n.is_read).length || 0;

  return (
    <Link href="/customer/notifications" className="relative p-2 rounded-full hover:bg-surface-dim transition-colors group">
      <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-primary text-[10px] font-bold text-background border-2 border-background">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </Link>
  );
}
