import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeAndTierScript } from "@/components/ThemeAndTierScript";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" data-tier="full" suppressHydrationWarning>
      <head>
        <ThemeAndTierScript />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
