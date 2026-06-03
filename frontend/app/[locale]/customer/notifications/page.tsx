import { NotificationList } from "@/features/notifications/components/NotificationList";

export default function NotificationsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">Stay updated on your bookings and account.</p>
      </div>
      
      <NotificationList />
    </div>
  );
}
