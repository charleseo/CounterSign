import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeAndTierScript } from "@/components/ThemeAndTierScript";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Countersign | Human-Verified AI Work Hub & Model Evaluation Studio",
  description:
    "AI work, checked by a human. Model answers, checked against the source. Independent verification for remote AI trainers and enterprise AI teams.",
  metadataBase: new URL("https://countersign.ai"),
  openGraph: {
    title: "Countersign | Human-Verified AI Work Hub & Model Evaluation Studio",
    description:
      "AI work, checked by a human. Model answers, checked against the source.",
    type: "website",
    locale: "en_US",
  },
};

import React, { Suspense } from "react";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { OfflineBanner } from "@/components/layout/OfflineBanner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" data-tier="full" suppressHydrationWarning>
      <head>
        <ThemeAndTierScript />
        <OrganizationAndWebsiteJsonLd />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        {/* Ambient CSS Aurora Glow (Disabled automatically in Lite/Basic tier) */}
        <div className="ambient-aurora" aria-hidden="true">
          <div className="aurora-orb-cyan" />
          <div className="aurora-orb-violet" />
          <div className="aurora-orb-emerald" />
        </div>
        <OfflineBanner />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
