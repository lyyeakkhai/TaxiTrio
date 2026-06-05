import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { LayoutDashboard, Car, Map, Compass, CalendarCheck, MessageSquareWarning, Bell, HelpCircle, UserCircle } from "lucide-react";
import { NotificationBell } from "@/features/notifications/components/NotificationBell";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { UserButton } from "@clerk/nextjs";
import { useTranslations } from "next-intl";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const t = useTranslations("Navigation");
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-surface-dim border-r border-border md:h-screen md:sticky md:top-0 p-4 overflow-y-auto hidden md:block">
        <div className="mb-8 px-4 mt-4">
          <h2 className="font-display text-xl font-bold text-primary">TaxiTrio</h2>
        </div>
        <nav className="space-y-1">
          <Link href="/customer/dashboard" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground" /> {t("dashboard")}
          </Link>
          <Link href="/customer/taxis" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Car className="mr-3 h-5 w-5 text-muted-foreground" /> {t("taxis")}
          </Link>
          <Link href="/customer/routes" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Map className="mr-3 h-5 w-5 text-muted-foreground" /> {t("routes")}
          </Link>
          <Link href="/customer/tours" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Compass className="mr-3 h-5 w-5 text-muted-foreground" /> {t("tours")}
          </Link>
          <Link href="/customer/bookings" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <CalendarCheck className="mr-3 h-5 w-5 text-muted-foreground" /> {t("bookings")}
          </Link>
          <Link href="/customer/complaints" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <MessageSquareWarning className="mr-3 h-5 w-5 text-muted-foreground" /> {t("complaints")}
          </Link>
          <Link href="/customer/notifications" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="mr-3 h-5 w-5 text-muted-foreground" /> {t("notifications")}
          </Link>
          <Link href="/customer/assistance" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <HelpCircle className="mr-3 h-5 w-5 text-muted-foreground" /> {t("assistance")}
          </Link>
          <Link href="/customer/profile" className="flex items-center px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <UserCircle className="mr-3 h-5 w-5 text-muted-foreground" /> Profile
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
            <LocaleSwitcher />
            <ThemeToggle />
            <NotificationBell />
            <UserButton />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
