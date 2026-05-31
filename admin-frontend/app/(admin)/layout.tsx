import { UserButton } from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-56 border-r flex flex-col gap-1 p-4 shrink-0">
        <span className="font-semibold text-sm mb-4">TaxiTrio Admin</span>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="/dashboard" className="hover:underline">Dashboard</a>
          <a href="/dashboard/users" className="hover:underline">Users</a>
          <a href="/dashboard/drivers" className="hover:underline">Drivers</a>
          <a href="/dashboard/taxis" className="hover:underline">Taxis</a>
          <a href="/dashboard/bookings" className="hover:underline">Bookings</a>
          <a href="/dashboard/payments" className="hover:underline">Payments</a>
          <a href="/dashboard/routes" className="hover:underline">Routes</a>
          <a href="/dashboard/tours" className="hover:underline">Tours</a>
          <a href="/dashboard/complaints" className="hover:underline">Complaints</a>
          <a href="/dashboard/analytics" className="hover:underline">Analytics</a>
        </nav>
        <div className="mt-auto">
          <UserButton />
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
