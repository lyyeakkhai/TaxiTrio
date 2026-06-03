import { useGenerateTelegramCode } from "../hooks";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MessageSquare, Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function TelegramLinkFlow() {
  const { mutateAsync: generate, isPending } = useGenerateTelegramCode();
  const [code, setCode] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!expiresAt) return;
    
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
      setTimeLeft(diff);
      if (diff === 0) {
        setCode(null);
        setExpiresAt(null);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleGenerate = async () => {
    try {
      const result = await generate();
      setCode(result.code);
      setExpiresAt(new Date(result.expires_at));
      setTimeLeft(10 * 60);
      setCopied(false);
    } catch {
      // error handled by hook
    }
  };

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(`/link ${code}`);
      setCopied(true);
      toast.success("Command copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="glass-card p-6 md:p-8 max-w-2xl mx-auto text-center relative overflow-hidden">
      <div className="h-16 w-16 bg-[#0088cc]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <MessageSquare className="h-8 w-8 text-[#0088cc]" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Connect TaxiTrio Bot</h2>
      <p className="text-muted-foreground mb-8">
        Link your Telegram account to instantly receive new trip assignments and manage your bookings directly from Telegram.
      </p>

      {!code ? (
        <div className="bg-surface-dim p-8 rounded-2xl border border-border">
          <h3 className="font-medium mb-4 text-lg">Step 1: Generate Link Code</h3>
          <Button onClick={handleGenerate} disabled={isPending} className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white w-full max-w-sm">
            {isPending ? "Generating..." : "Generate Link Code"}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-surface-dim p-6 rounded-2xl border border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Step 2: Send this command to the bot</h3>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="bg-background border border-border px-6 py-4 rounded-xl text-3xl font-mono tracking-widest font-bold">
                /link {code}
              </div>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl shrink-0" onClick={handleCopy}>
                {copied ? <CheckCircle2 className="h-6 w-6 text-green-500" /> : <Copy className="h-6 w-6" />}
              </Button>
            </div>
            
            <div className="text-sm text-yellow-500 font-medium">
              Code expires in {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>

          <div className="bg-[#0088cc]/5 p-6 rounded-2xl border border-[#0088cc]/20">
            <h3 className="font-medium text-[#0088cc] mb-2">Step 3: Open Telegram</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Search for <strong>@TaxiTrioDriverBot</strong> on Telegram and send the command above.
            </p>
            <a 
              href="https://t.me/TaxiTrioDriverBot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#0088cc] text-primary-foreground shadow hover:bg-[#0088cc]/90 h-10 px-6 py-2"
            >
              Open Telegram Bot
            </a>
          </div>

          <Button variant="ghost" onClick={handleGenerate} className="text-xs text-muted-foreground">
            <RefreshCw className="mr-2 h-3 w-3" /> Generate new code
          </Button>
        </div>
      )}
    </div>
  );
}
