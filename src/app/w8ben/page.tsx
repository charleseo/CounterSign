import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldCheck } from 'lucide-react';
import { W8benClient } from './W8benClient';

export const metadata: Metadata = {
  title: 'W-8BEN Guide for Remote AI Contractors | 0% US Withholding | TraceBase',
  description:
    'Step-by-step IRS Form W-8BEN guide for international contractors on Deel, Outlier, and Alignerr. Learn how to complete Line 6a Foreign Tax ID and avoid 30% US withholding.',
  alternates: {
    canonical: '/w8ben',
  },
  openGraph: {
    title: 'Form W-8BEN Guide for Remote AI Contractors | TraceBase',
    description:
      'Clear, line-by-line Form W-8BEN instructions for remote workers outside the US. Avoid 30% tax withholding on Deel and Outlier.',
    url: '/w8ben',
    type: 'website',
  },
};

export default function W8benPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <FileText size={14} className="text-[#5A35C8]" />
          <span>Remote contractor tax walkthrough</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Form W-8BEN instructions for remote AI contractors
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          How international remote workers on Deel, Outlier, and Alignerr complete US tax forms correctly. Learn what to enter in Line 6a to avoid automatic 30% US tax withholding.
        </p>
      </div>

      {/* Main Interactive W-8BEN Guide */}
      <W8benClient />
    </div>
  );
}
