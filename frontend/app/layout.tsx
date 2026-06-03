import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
    description:
      "Verified drivers, transparent pricing, intercity travel — without the scams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
