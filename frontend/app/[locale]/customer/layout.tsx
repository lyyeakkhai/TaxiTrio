import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Car, Map, Compass, CalendarCheck, MessageSquareWarning, Bell, HelpCircle } from "lucide-react";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { UserButton } from "@clerk/nextjs";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-surface-dim border-r border-border md:h-screen md:sticky md:top-0 p-4 overflow-y-auto hidden md:block">
        <div className="mb-8 px-4 mt-4">
          <h2 className="font-display text-xl font-bold text-primary">TaxiTrio</h2>
        </div>
        <nav className="space-y-1">
          <Link href="/customer/dashboard" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground" /> Dashboard
          </Link>
          <Link href="/customer/taxis" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Car className="mr-3 h-5 w-5 text-muted-foreground" /> Taxis
          </Link>
          <Link href="/customer/routes" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Map className="mr-3 h-5 w-5 text-muted-foreground" /> Route Packages
          </Link>
          <Link href="/customer/tours" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Compass className="mr-3 h-5 w-5 text-muted-foreground" /> Tour Packages
          </Link>
          <Link href="/customer/bookings" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <CalendarCheck className="mr-3 h-5 w-5 text-muted-foreground" /> My Bookings
          </Link>
          <Link href="/customer/complaints" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <MessageSquareWarning className="mr-3 h-5 w-5 text-muted-foreground" /> Complaints
          </Link>
          <Link href="/customer/notifications" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="mr-3 h-5 w-5 text-muted-foreground" /> Notifications
          </Link>
          <Link href="/customer/assistance" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <HelpCircle className="mr-3 h-5 w-5 text-muted-foreground" /> Assistance
          </Link>
        </nav>
      </aside>
      
      <div className="flex-1 flex flex-col min-w-0 md:h-screen overflow-y-auto">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border h-16 flex items-center justify-between px-6">
          <div className="md:hidden">
            <h2 className="font-display font-bold text-lg">TaxiTrio</h2>
          </div>
          <div className="hidden md:block" />
          
          <div className="flex items-center gap-4">
            <NotificationBell />
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
