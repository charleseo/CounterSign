import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, ShieldCheck, ArrowRight, Calculator } from 'lucide-react';
import { RatesClient } from './RatesClient';

export const metadata: Metadata = {
  title: 'Real AI Contributor Pay Rates | Platform & Domain Benchmark | TraceBase',
  description:
    'Verified hourly pay rates and payment models across Outlier, Alignerr, DataAnnotation, Mercor, and Invisible. Honest breakdown of screening formats, review penalties, and payout schedules.',
  alternates: {
    canonical: '/rates',
  },
  openGraph: {
    title: 'Real AI Contributor Pay Rates | TraceBase',
    description:
      'Verified hourly pay rates across Outlier, Alignerr, DataAnnotation, Mercor, and Invisible. Independent breakdown of screening formats and review penalties.',
    url: '/rates',
    type: 'website',
  },
};

export default function RatesPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <DollarSign size={14} className="text-[#5A35C8]" />
          <span>Pay rate & earnings benchmark</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Real pay rate comparison by platform and domain
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Reported hourly pay rates, assessment policies, and review penalty standards across top AI evaluation platforms. All figures reflect verified contributor reports.
        </p>
      </div>

      {/* Main Interactive Rates Explorer */}
      <RatesClient />

      {/* Cross-linking Banner to Payout Calculator & Appeals */}
      <div className="rounded-xl border border-rule bg-sheet p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-ink">
            Want to see your exact take-home pay after fees?
          </h3>
          <p className="text-xs text-secondary max-w-xl">
            Compare 8 payment rails across Deel, Geegpay, AirTM, and bank transfers to find the lowest fee route.
          </p>
        </div>
        <Link
          href="/payout-calculator"
          className="px-4 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap min-h-[44px]"
        >
          <span>Open payout calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
