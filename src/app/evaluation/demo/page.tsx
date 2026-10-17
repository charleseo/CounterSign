import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Layers, ShieldCheck, ArrowRight, ChevronRight } from 'lucide-react';
import { AuditDemoClient } from './AuditDemoClient';

export const metadata: Metadata = {
  title: 'Interactive RAG & Grounding Audit Demo | TraceBase Studio',
  description:
    'Test live grounding accuracy and hallucination detection on technical documentation prompts. Interactive evaluation demo by TraceBase Studio for AI teams.',
  alternates: {
    canonical: '/evaluation/demo',
  },
  openGraph: {
    title: 'Interactive RAG & Grounding Audit Demo | TraceBase',
    description:
      'Test live grounding accuracy and hallucination detection on technical documentation prompts. Interactive evaluation demo by TraceBase Studio.',
    url: '/evaluation/demo',
    type: 'website',
  },
};

export default function AuditDemoPage() {
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
          <span className="text-ink font-medium">Live audit demo</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-ink">
          Interactive grounding and hallucination audit demo
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          See how our human evaluation studio verifies technical documentation chatbots. Test prompt-response pairs against primary reference documentation to detect hallucinations and ungrounded statements.
        </p>
      </div>

      {/* Main Interactive Demo Component */}
      <AuditDemoClient />
    </div>
  );
}
