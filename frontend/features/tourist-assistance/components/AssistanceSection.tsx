"use client";

import { useAssistance } from "../hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { HelpCircle, Phone, Languages, Map, HeadphonesIcon } from "lucide-react";

export function AssistanceSection() {
  const { data: assistanceItems, isLoading } = useAssistance();

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  const items = assistanceItems || [];

  const categoryConfig = {
    emergency: { title: "Emergency Support", icon: <Phone className="h-5 w-5 text-state-error" /> },
    language: { title: "Language Support", icon: <Languages className="h-5 w-5 text-accent-secondary" /> },
    route: { title: "Route Assistance", icon: <Map className="h-5 w-5 text-accent-primary" /> },
    support: { title: "General Support", icon: <HeadphonesIcon className="h-5 w-5 text-muted-foreground" /> },
  };

  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Object.entries(categoryConfig).map(([key, config]) => {
        const categoryItems = grouped[key] || [];
        
        return (
          <div key={key} className="glass-card p-6 h-full">
            <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
              <div className="p-2 bg-surface-dim rounded-full">
                {config.icon}
              </div>
              <h3 className="font-display font-semibold text-lg">{config.title}</h3>
            </div>
            
            {categoryItems.length === 0 ? (
              <p className="text-muted-foreground text-sm flex items-center justify-center h-20 opacity-50">
                <HelpCircle className="h-4 w-4 mr-2" /> No info available
              </p>
            ) : (
              <div className="space-y-4">
                {categoryItems.filter((i: any) => i.is_active).map((item: any) => (
                  <div key={item.id} className="bg-surface-dim/50 rounded-lg p-4 hover:bg-surface-dim transition-colors">
                    <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{item.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
