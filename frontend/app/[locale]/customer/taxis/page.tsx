import { TaxiGrid } from "@/features/taxi-browser/components/TaxiGrid";
import { getTranslations } from "next-intl/server";

export default async function TaxisPage() {
  const t = await getTranslations();

  return (
    <div className="container max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Browse Taxis</h1>
        <p className="text-muted-foreground">Find the perfect vehicle and verified driver for your trip.</p>
      </div>
      
      <TaxiGrid />
    </div>
  );
}
