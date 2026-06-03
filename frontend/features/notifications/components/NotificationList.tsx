"use client";

import { useNotifications, useMarkRead, useMarkAllRead } from "../hooks";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Check, CheckCircle2 } from "lucide-react";
import { Notification } from "../types";

export function NotificationList() {
  const { data: notifications, isLoading } = useNotifications();
  const { mutate: markRead } = useMarkRead();
  const { mutate: markAllRead, isPending: isMarkingAll } = useMarkAllRead();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-24 w-full rounded-2xl" />
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <div className="glass-card py-16 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h2 className="text-xl font-semibold mb-2">All Caught Up!</h2>
        <p className="text-muted-foreground">You have no notifications right now.</p>
      </div>
    );
  }

  const unreadCount = notifications.filter((n: Notification) => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}.</p>
        {unreadCount > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => markAllRead()} 
            disabled={isMarkingAll}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <div className="grid gap-3">
        {notifications.map((notification: Notification) => (
          <div 
            key={notification.id} 
            className={`glass-card p-5 transition-all ${
              !notification.is_read ? 'border-accent-primary/30 bg-accent-primary/5' : 'opacity-70'
            }`}
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className={`text-sm ${!notification.is_read ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(notification.created_at).toLocaleString()}
                </p>
              </div>
              {!notification.is_read && (
                <button 
                  onClick={() => markRead(notification.id)}
                  className="shrink-0 p-2 text-muted-foreground hover:text-accent-primary hover:bg-accent-primary/10 rounded-full transition-colors"
                  title="Mark as read"
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
