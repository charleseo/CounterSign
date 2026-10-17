import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';
import { DrillsClient } from './DrillsClient';

export const metadata: Metadata = {
  title: '2-Minute Daily Screening Drills | Practice AI Prompts | TraceBase',
  description:
    'Test your skills with rapid 2-minute drills on negative constraints, sycophancy, and citation checks. Practice avoiding the traps that lead to reviewer penalties.',
  alternates: {
    canonical: '/training/drills',
  },
  openGraph: {
    title: '2-Minute Daily Screening Drills | TraceBase',
    description:
      'Quick daily practice drills for AI evaluators. Master negative constraints, citation checks, and pacing rules.',
    url: '/training/drills',
    type: 'website',
  },
};

export default function DrillsPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-secondary overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/training" className="hover:text-ink">
            Training &amp; certificates
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-ink font-medium">Daily practice drills</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          2-minute daily screening drills
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Quick interactive scenarios to test your eye for sneaky reviewer traps. Practice catching word count limits, negative constraints, and fake citations in under two minutes.
        </p>
      </div>

      {/* Main Drills Client */}
      <DrillsClient />
    </div>
  );
}
