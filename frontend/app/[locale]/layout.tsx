import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { getMessages } from 'next-intl/server';
import { Providers } from '../providers';
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaxiTrio — Trusted Rides & Tours Across Cambodia",
  description:
    "Book verified taxis, intercity routes, and guided tour packages in Cambodia. Transparent pricing, real-time tracking, and multilingual support for international travelers.",
  keywords: [
    "Cambodia taxi",
    "Phnom Penh to Siem Reap",
    "Angkor Wat tour",
    "tourist transport Cambodia",
    "book taxi Cambodia",
    "KHQR payment",
  ],
  openGraph: {
    title: "TaxiTrio — Trusted Rides & Tours Across Cambodia",
    description: "Verified drivers, transparent pricing, intercity travel — without the scams.",
    type: "website",
  },
};


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfair.variable} ${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#e11d48",
              colorBackground: "#09090b",
              colorForeground: "#fafafa",
              colorMutedForeground: "#a1a1aa",
              colorInputForeground: "#fafafa",
              colorNeutral: "#27272a",
              borderRadius: "0.75rem",
              fontFamily: "Work Sans, system-ui, sans-serif",
              fontSize: "0.9375rem",
            },
          }}
        >
          <Providers locale={locale} messages={messages}>
            {children}
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
