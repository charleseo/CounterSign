import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck } from 'lucide-react';
import { InvoiceClient } from './InvoiceClient';

export const metadata: Metadata = {
  title: 'Free Remote Contractor Invoice Generator | TraceBase',
  description:
    'Create clean, professional PDF invoices for international bank foreign exchange clearing. Formatted for remote AI workers on Deel, Outlier, and Alignerr. 100% private and client-side.',
  alternates: {
    canonical: '/invoice',
  },
  openGraph: {
    title: 'Free Remote Contractor Invoice Generator | TraceBase',
    description:
      'Generate printable PDF invoices for bank foreign exchange clearing. Tailored for remote AI contractors on Deel, Outlier, and Mercor.',
    url: '/invoice',
    type: 'website',
  },
};

export default function InvoicePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3 print:hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <FileText size={14} className="text-[#5A35C8]" />
          <span>Contractor banking &amp; compliance tool</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Remote contractor invoice generator
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Need an invoice to clear a USD wire with your local bank? Create a clean, single-page PDF invoice formatted with standard foreign-source tax declarations. Zero data stored on our servers.
        </p>
      </div>

      {/* Main Invoice Client */}
      <InvoiceClient />
    </div>
  );
}
