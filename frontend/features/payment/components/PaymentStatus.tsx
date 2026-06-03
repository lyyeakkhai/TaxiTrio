import { Payment } from "../types";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export function PaymentStatus({ payment }: { payment: Payment }) {
  const isVerified = payment.status === "verified";
  const isRejected = payment.status === "rejected";
  const isPending = payment.status === "pending_verification";
  const isUnpaid = payment.status === "unpaid";

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-col items-center text-center space-y-4 mb-8">
        <div className={`h-16 w-16 rounded-full flex items-center justify-center shadow-lg ${
          isVerified ? "bg-green-500/20 text-green-500" : 
          isRejected ? "bg-red-500/20 text-red-500" : 
          "bg-yellow-500/20 text-yellow-500"
        }`}>
          {isVerified && <CheckCircle2 className="h-8 w-8" />}
          {isRejected && <AlertCircle className="h-8 w-8" />}
          {isPending && <Clock className="h-8 w-8" />}
          {isUnpaid && <AlertCircle className="h-8 w-8 text-yellow-500" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold capitalize mb-1">{payment.status.replace("_", " ")}</h2>
          <p className="text-sm text-muted-foreground font-mono">ID: {payment.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm pt-6 border-t border-border">
        <div>
          <p className="text-muted-foreground mb-1">Amount to pay</p>
          <p className="font-semibold text-xl">${payment.amount.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-muted-foreground mb-1">Payment Method</p>
          <p className="font-semibold text-xl uppercase">{payment.method}</p>
        </div>
      </div>
    </div>
  );
}
