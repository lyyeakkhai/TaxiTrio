import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          appearance={{
            variables: {
              colorPrimary: "#D4AF37",
              colorBackground: "#1D1B19",
              colorForeground: "#E7E2DD",
              colorMutedForeground: "#A39E93",
              colorInputForeground: "#E7E2DD",
              colorNeutral: "#99907C",
              borderRadius: "0.875rem",
              fontFamily: "Outfit, system-ui, sans-serif",
              fontSize: "0.9375rem",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
