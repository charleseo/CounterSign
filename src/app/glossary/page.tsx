import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ShieldCheck } from 'lucide-react';
import { GlossaryClient } from './GlossaryClient';

export const metadata: Metadata = {
  title: 'AI Evaluation Jargon & Reviewer Feedback Decoder | TraceBase',
  description:
    'Decode RLHF terms, platform acronyms, and reviewer feedback notes. Learn what empty queue, negative constraints, sycophancy, and SFT mean with actionable fixes.',
  alternates: {
    canonical: '/glossary',
  },
  openGraph: {
    title: 'AI Evaluation Jargon & Reviewer Feedback Decoder | TraceBase',
    description:
      'Clear guide to RLHF terms, platform acronyms, and reviewer audit feedback. Learn what auditors look for and how to protect your rating.',
    url: '/glossary',
    type: 'website',
  },
};

export default function GlossaryPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary">
          <BookOpen size={14} className="text-[#5A35C8]" />
          <span>Contributor reference guide</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          AI evaluation jargon and reviewer feedback decoder
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Platform acronyms, model training terms, and real audit feedback notes explained in plain English. Learn what your reviewer meant and how to fix your next task submission.
        </p>
      </div>

      {/* Main Interactive Glossary */}
      <GlossaryClient />
    </div>
  );
}
