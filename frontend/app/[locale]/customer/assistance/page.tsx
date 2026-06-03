import { AssistanceSection } from "@/features/tourist-assistance/components/AssistanceSection";
import { WhatsAppButton } from "@/features/tourist-assistance/components/WhatsAppButton";
import { LifeBuoy } from "lucide-react";

export default function AssistancePage() {
  return (
    <div className="container max-w-5xl mx-auto py-10 px-4 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Tourist Assistance</h1>
          <p className="text-muted-foreground">Everything you need for a safe and pleasant journey in Cambodia.</p>
        </div>
        <WhatsAppButton className="w-full md:w-auto" />
      </div>
      
      <div className="bg-accent-primary/10 border border-accent-primary/20 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <LifeBuoy className="h-8 w-8 text-accent-primary shrink-0" />
        <div>
          <h3 className="font-semibold text-accent-primary mb-1">We&apos;re here to help!</h3>
          <p className="text-sm text-muted-foreground">
            Whether you need help with translations, finding the best route, or handling an emergency, our support team and guides are available 24/7.
          </p>
        </div>
      </div>
      
      <AssistanceSection />
    </div>
  );
}
