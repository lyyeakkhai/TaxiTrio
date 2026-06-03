import { Earning } from "../types";
import { Wallet, TrendingUp, Calendar } from "lucide-react";

export function EarningsSummary({ earnings }: { earnings: Earning[] }) {
  const total = earnings.reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = earnings
    .filter(e => new Date(e.created_at).getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="glass-card p-6 flex flex-col items-center text-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet className="h-16 w-16" />
        </div>
        <p className="text-muted-foreground mb-2">Total Earnings</p>
        <h3 className="text-4xl font-bold font-display text-primary">${total.toFixed(2)}</h3>
      </div>
      <div className="glass-card p-6 flex flex-col items-center text-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Calendar className="h-16 w-16" />
        </div>
        <p className="text-muted-foreground mb-2">This Month</p>
        <h3 className="text-3xl font-bold font-display">${thisMonth.toFixed(2)}</h3>
      </div>
      <div className="glass-card p-6 flex flex-col items-center text-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <TrendingUp className="h-16 w-16" />
        </div>
        <p className="text-muted-foreground mb-2">Completed Trips</p>
        <h3 className="text-3xl font-bold font-display">{earnings.length}</h3>
      </div>
    </div>
  );
}
