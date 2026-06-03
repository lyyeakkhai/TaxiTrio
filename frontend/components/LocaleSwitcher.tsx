"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Globe } from "lucide-react";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative inline-flex items-center">
      <Globe className="absolute left-2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <select
        value={locale}
        onChange={handleLocaleChange}
        className="h-9 w-full appearance-none bg-transparent pl-8 pr-4 text-sm font-medium hover:bg-surface-dim rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        <option value="en">EN</option>
        <option value="km">KM</option>
        <option value="zh">ZH</option>
        <option value="ja">JA</option>
        <option value="ko">KO</option>
        <option value="fr">FR</option>
      </select>
    </div>
  );
}
