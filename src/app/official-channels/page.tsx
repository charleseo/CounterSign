import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ShieldCheck, AlertOctagon, Globe, Mail, MessageCircle, Send } from "lucide-react";
import { BreadcrumbListJsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl, getSiteHost } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Our Only Official Channels | TraceBase",
  description:
    "Official directory of authentic TraceBase domains, accounts, and broadcast channels. We never message first, charge candidates, or ask for sensitive financial credentials.",
  alternates: {
    canonical: "/official-channels",
  },
};

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0-.01-3.28 1.64 1.64 0 0 0 .01 3.28M5.07 18.5h2.78v-8.37H5.07v8.37z" />
  </svg>
);

export default function OfficialChannelsPage() {
  const siteUrl = getSiteUrl();
  const siteHost = getSiteHost();
  const emailHost = (process.env.EMAIL_FROM || `contact@${siteHost}`).split("@")[1] || siteHost;

  const channels = [
    {
      type: "Website domain",
      handle: siteHost,
      url: siteUrl,
      icon: Globe,
      note: "Our only authentic web platform. Look for the exact domain spelling in your browser address bar.",
    },
    {
      type: "Email domain",
      handle: `@${emailHost}`,
      url: `mailto:contact@${emailHost}`,
      icon: Mail,
      note: "All official automated notices and correspondence originate exclusively from this domain.",
    },
    {
      type: "WhatsApp broadcast channel",
      handle: "TraceBase updates",
      url: process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL_URL || "https://whatsapp.com",
      icon: MessageCircle,
      note: "One-way broadcast updates for verified listings. We never direct-message you on WhatsApp.",
    },
    {
      type: "Telegram broadcast channel",
      handle: "@tracebase_ai",
      url: process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_URL || "https://t.me",
      icon: Send,
      note: "Public broadcast feed. We never initiate private messages or recruit through Telegram.",
    },
    {
      type: "X profile",
      handle: "@tracebase_ai",
      url: "https://x.com",
      icon: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      note: "Public announcements, verification changelog summaries, and platform policy investigations.",
    },
    {
      type: "LinkedIn page",
      handle: "TraceBase",
      url: "https://linkedin.com",
      icon: LinkedInIcon,
      note: "Official company presence for AI evaluation research and benchmark documentation.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-10 w-full min-w-0">
      <BreadcrumbListJsonLd
        items={[
          { name: "Home", item: "/" },
          { name: "Official Channels", item: "/official-channels" },
        ]}
      />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Link href="/" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Home
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">Official Channels</span>
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5A35C8]" />
            <span>Our only official channels</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
            Our only official channels
          </h1>
          <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
            Scammers frequently impersonate remote work platforms and recruiters. Use this verified list to confirm whether a domain, email, or social handle genuinely belongs to TraceBase.
          </p>
        </div>
      </div>

      {/* Plain Language Anti-Scam Statement */}
      <div className="p-6 rounded-2xl border-2 border-[#5A35C8]/40 bg-[#5A35C8]/5 space-y-3">
        <div className="flex items-center gap-2.5 text-ink font-bold text-base sm:text-lg">
          <AlertOctagon className="text-[#5A35C8] shrink-0" size={22} />
          <span>What we promise</span>
        </div>
        <p className="text-base sm:text-lg font-bold text-ink leading-snug">
          We never message you first. We never charge you. We never ask for your ID, BVN, SSN, bank login or card details. Anyone who does is not us.
        </p>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          If someone contacts you claiming to be a TraceBase recruiter offering an instant contract, asking for money, or requesting personal banking tokens, report them immediately on our{" "}
          <Link href="/scam-check" className="text-[#5A35C8] font-semibold hover:underline">
            scam check
          </Link>
          .
        </p>
      </div>

      {/* Channels Directory List */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-ink">
          Official channels list
        </h2>
        <div className="grid grid-cols-1 gap-3.5">
          {channels.map((ch, idx) => {
            const IconComp = ch.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-rule bg-sheet hover:border-[#5A35C8]/40 transition-colors space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-surface border border-rule flex items-center justify-center text-[#5A35C8]">
                      <IconComp size={18} />
                    </div>
                    <div>
                      <span className="text-xs text-secondary font-medium block">
                        {ch.type}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-ink">
                        {ch.handle}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-secondary bg-surface border border-rule px-2 py-0.5 rounded">
                    Official
                  </span>
                </div>
                <p className="text-xs text-secondary leading-relaxed pl-11">
                  {ch.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
