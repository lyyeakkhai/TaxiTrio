import { ReactNode } from "react";
import { Link } from "@/i18n/routing";
import { Car, LayoutDashboard, Wallet, Star, MessageSquare } from "lucide-react";

export default function DriverLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <aside className="w-full md:w-64 bg-surface-dim border-r border-border md:h-screen md:sticky md:top-0 p-4 overflow-y-auto hidden md:block">
        <div className="mb-8 px-4 mt-4">
          <h2 className="font-display text-xl font-bold text-primary">Driver Portal</h2>
        </div>
        <nav className="space-y-2">
          <Link href="/driver/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <LayoutDashboard className="mr-3 h-5 w-5" /> Dashboard
          </Link>
          <Link href="/driver/trips" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Car className="mr-3 h-5 w-5" /> My Trips
          </Link>
          <Link href="/driver/earnings" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Wallet className="mr-3 h-5 w-5" /> Earnings
          </Link>
          <Link href="/driver/reviews" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <Star className="mr-3 h-5 w-5" /> Reviews
          </Link>
          <Link href="/driver/telegram-link" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors">
            <MessageSquare className="mr-3 h-5 w-5" /> Telegram Link
          </Link>
        </nav>
      </aside>
      <main className="flex-1 w-full max-w-full min-w-0">
        {children}
      </main>
    </div>
  );
}
