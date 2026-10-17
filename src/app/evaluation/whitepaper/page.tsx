import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { WhitepaperClient } from './WhitepaperClient';

export const metadata: Metadata = {
  title: 'State of Technical Documentation RAG & Hallucinations | TraceBase Research',
  description:
    'An empirical human evaluation audit of 500 frontier model engineering queries across PostgreSQL, Stripe, Next.js, and Amazon Bedrock specifications.',
  alternates: {
    canonical: '/evaluation/whitepaper',
  },
  openGraph: {
    title: 'The State of Technical Documentation RAG | TraceBase',
    description:
      'Human audit of 500 frontier model technical documentation queries. Line-by-line citation and hallucination findings.',
    url: '/evaluation/whitepaper',
    type: 'website',
  },
};

export default function WhitepaperPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-secondary overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <Link href="/evaluation" className="hover:text-ink">
            Evaluation studio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-ink font-medium">Research briefing</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          The state of technical documentation RAG and model hallucinations
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          An independent audit of 500 engineering queries across PostgreSQL, Stripe, Next.js, and Amazon Bedrock specifications. Line-by-line citation and negative constraint findings.
        </p>
      </div>

      {/* Main Whitepaper Client */}
      <WhitepaperClient />
    </div>
  );
}
