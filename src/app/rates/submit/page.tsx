import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { DollarSign, ChevronRight } from 'lucide-react';
import { RateSubmitClient } from './RateSubmitClient';

export const metadata: Metadata = {
  title: 'Submit Contributor Pay Rate | Anonymous Report | TraceBase',
  description:
    'Help maintain honest, transparent pay rate data for AI annotators and evaluators. Anonymously report your hourly earnings and payment rail.',
  alternates: {
    canonical: '/rates/submit',
  },
  openGraph: {
    title: 'Submit Contributor Pay Rate | TraceBase',
    description:
      'Anonymous community pay rate submission for remote AI evaluators and annotators.',
    url: '/rates/submit',
    type: 'website',
  },
};

export default function RateSubmitPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-secondary overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/rates" className="hover:text-ink">
            Pay rates
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-ink font-medium">Submit pay rate</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Submit your verified contributor pay rate
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Report your real hourly earnings to help fellow contributors know fair market rates. All submissions are 100% anonymous and never tied to personal identity.
        </p>
      </div>

      {/* Main Submit Client */}
      <RateSubmitClient />
    </div>
  );
}
