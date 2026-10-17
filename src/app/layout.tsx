import type { Metadata } from "next";
import "./globals.css";
import { ThemeAndTierScript } from "@/components/ThemeAndTierScript";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OrganizationAndWebsiteJsonLd } from "@/components/seo/JsonLd";
import React, { Suspense } from "react";
import { AnalyticsTracker } from "@/components/analytics/AnalyticsTracker";
import { OfflineBanner } from "@/components/layout/OfflineBanner";

import { getSiteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "TraceBase | Human-verified AI work hub and model evaluation studio",
  description:
    "AI work, checked by a human. Model answers, checked against the source. Independent verification for remote AI trainers and enterprise AI teams.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "TraceBase | Human-verified AI work hub and model evaluation studio",
    description:
      "AI work, checked by a human. Model answers, checked against the source.",
    type: "website",
    locale: "en_US",
    siteName: "TraceBase",
  },
};

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
      <body className="antialiased">
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
