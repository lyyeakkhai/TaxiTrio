const fs = require('fs');
const path = require('path');

const frontendDir = path.join(__dirname);

// 1. Move existing app files to app/[locale]
const appDir = path.join(frontendDir, 'app');
const localeDir = path.join(appDir, '[locale]');
if (!fs.existsSync(localeDir)) {
    fs.mkdirSync(localeDir, { recursive: true });
}
const filesToMove = ['favicon.ico', 'globals.css', 'layout.tsx', 'page.tsx', 'sign-in', 'sign-up'];
filesToMove.forEach(file => {
    const src = path.join(appDir, file);
    const dest = path.join(localeDir, file);
    if (fs.existsSync(src)) {
        fs.renameSync(src, dest);
    }
});

// 2. Create customer and driver folders inside [locale]
const customerDir2 = path.join(localeDir, 'customer', 'dashboard');
const driverDir2 = path.join(localeDir, 'driver', 'dashboard');
fs.mkdirSync(customerDir2, { recursive: true });
fs.mkdirSync(driverDir2, { recursive: true });
fs.writeFileSync(path.join(customerDir2, 'page.tsx'), `export default function CustomerDashboard() { return <div className="p-8"><h1 className="text-2xl font-bold">Customer Dashboard</h1></div>; }`);
fs.writeFileSync(path.join(driverDir2, 'page.tsx'), `export default function DriverDashboard() { return <div className="p-8"><h1 className="text-2xl font-bold">Driver Dashboard</h1></div>; }`);

// 3. i18n setup
const i18nDir = path.join(frontendDir, 'i18n');
fs.mkdirSync(i18nDir, { recursive: true });
fs.writeFileSync(path.join(i18nDir, 'routing.ts'), `import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'km', 'zh', 'ja', 'ko', 'fr'],
  defaultLocale: 'en'
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);
`);

fs.writeFileSync(path.join(i18nDir, 'request.ts'), `import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(\`../messages/\${locale}.json\`)).default
  };
});
`);

// Messages
const messagesDir = path.join(frontendDir, 'messages');
fs.mkdirSync(messagesDir, { recursive: true });
['en', 'km', 'zh', 'ja', 'ko', 'fr'].forEach(lang => {
    fs.writeFileSync(path.join(messagesDir, `${lang}.json`), `{"Index": {"title": "TaxiTrio"}}`);
});

// Update next.config.ts
const nextConfigPath = path.join(frontendDir, 'next.config.ts');
fs.writeFileSync(nextConfigPath, `import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
`);

// 4. Shared Infrastructure
const libDir = path.join(frontendDir, 'lib');
fs.mkdirSync(libDir, { recursive: true });

// lib/api.ts
fs.writeFileSync(path.join(libDir, 'api.ts'), `import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});
`);

// lib/queryClient.ts
fs.writeFileSync(path.join(libDir, 'queryClient.ts'), `import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});
`);

// app/providers.tsx
fs.writeFileSync(path.join(appDir, 'providers.tsx'), `'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export function Providers({ children, messages, locale }: { children: ReactNode, messages: any, locale: string }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </NextIntlClientProvider>
  );
}
`);

// features and components scaffolding
const featuresDir = path.join(frontendDir, 'features');
fs.mkdirSync(featuresDir, { recursive: true });

const componentsDir = path.join(frontendDir, 'components');
fs.mkdirSync(componentsDir, { recursive: true });
fs.writeFileSync(path.join(componentsDir, 'StatusBadge.tsx'), `export function StatusBadge({ status }: { status: string }) { return <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">{status}</span>; }`);
fs.writeFileSync(path.join(componentsDir, 'PageHeader.tsx'), `export function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) { return <div className="mb-6"><h1 className="text-3xl font-bold text-foreground">{title}</h1>{subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}</div>; }`);
fs.writeFileSync(path.join(componentsDir, 'EmptyState.tsx'), `export function EmptyState({ message }: { message: string }) { return <div className="p-8 text-center text-muted-foreground bg-muted/20 rounded-lg">{message}</div>; }`);
fs.writeFileSync(path.join(componentsDir, 'LoadingSpinner.tsx'), `import { Loader2 } from 'lucide-react';\nexport function LoadingSpinner() { return <div className="flex justify-center p-4"><Loader2 className="animate-spin text-primary size-6" /></div>; }`);

console.log('Scaffolding complete.');
