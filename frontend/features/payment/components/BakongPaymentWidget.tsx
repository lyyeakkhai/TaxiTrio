import { useInitiatePayment } from "../hooks";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { QrCode, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function BakongPaymentWidget({ bookingId, amount }: { bookingId: string, amount: number }) {
  const { mutateAsync: initiatePayment, isPending } = useInitiatePayment();
  const [initiated, setInitiated] = useState(false);

  const handleInitiate = async () => {
    try {
      // await initiatePayment(bookingId);
      // Simulating API call for SDK initialization
      await new Promise(resolve => setTimeout(resolve, 1000));
      setInitiated(true);
      toast.success("Payment initiated successfully.");
    } catch (error) {
      toast.error("Failed to initiate payment.");
    }
  };

  return (
    <div className="border-2 border-dashed border-red-500/50 rounded-xl p-8 bg-red-500/5 flex flex-col items-center justify-center text-center space-y-4">
      <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
        <QrCode className="h-6 w-6 text-red-500" />
      </div>
      
      <div>
        <h3 className="font-bold text-lg text-red-500 mb-1">Bakong KHQR SDK Placeholder</h3>
        <p className="text-sm text-red-500/80 max-w-md mx-auto">
          The pre-built Bakong KHQR component will be injected here. Users will scan the QR code to pay.
        </p>
      </div>
      
      <div className="text-sm font-mono bg-background p-3 rounded-lg text-muted-foreground w-full max-w-xs text-left my-4 shadow-sm border border-border">
        <div className="flex justify-between mb-1"><span>Booking ID:</span> <span>{bookingId.substring(0, 8)}...</span></div>
        <div className="flex justify-between font-bold text-foreground"><span>Amount:</span> <span>${amount.toFixed(2)}</span></div>
      </div>

      {!initiated ? (
        <Button onClick={handleInitiate} disabled={isPending} className="bg-red-500 hover:bg-red-600 text-white border-none">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test Payment Initiation
        </Button>
      ) : (
        <div className="p-4 bg-background rounded-lg border border-border w-full max-w-xs shadow-sm">
          <div className="aspect-square bg-muted flex items-center justify-center rounded-md mb-3 border border-dashed border-border">
            <span className="text-muted-foreground text-sm font-medium">[ QR Code Rendered Here ]</span>
          </div>
          <p className="text-xs text-muted-foreground">Waiting for payment confirmation via webhook...</p>
        </div>
      )}
    </div>
  );
}
