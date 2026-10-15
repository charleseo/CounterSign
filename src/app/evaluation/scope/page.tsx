import { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { EvaluationLeadScopeForm } from '@/components/evaluation/EvaluationLeadScopeForm';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Scope an AI Model Audit | Evaluation Studio | Countersign',
  description:
    'Define your evaluation batch volume, documentation type, and timeline. Receive an immediate reference ID and preliminary failure taxonomy.',
  alternates: {
    canonical: '/evaluation/scope',
  },
  openGraph: {
    title: 'Scope an AI Model Audit | Countersign Studio',
    description:
      'Submit your AI evaluation project scope. Idempotent submission with formal reference ID generation.',
    url: '/evaluation/scope',
    type: 'website',
  },
};

export const instant = false;

interface ScopePageProps {
  searchParams?: Promise<{ service?: string }>;
}

async function ScopeFormContainer({
  searchParams,
}: {
  searchParams?: Promise<{ service?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const initialService = params.service || 'rag_and_citation_audit';
  return <EvaluationLeadScopeForm initialService={initialService} />;
}

export default function ScopePage({ searchParams }: ScopePageProps) {

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Back Link */}
      <div>
        <Link
          href="/evaluation"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-secondary hover:text-accent-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Evaluation Studio</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-subtle">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
          <ShieldCheck size={14} className="text-accent-cyan" />
          <span>Section 7.9c Project Initiation</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-primary">
          Scope an AI Model Audit
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Define your project volume, documentation format, and timeline in three steps. You will receive an official audit reference ID and a personalized scoping reply within two working days.
        </p>
      </div>

      <Suspense
        fallback={
          <div className="w-full max-w-2xl mx-auto h-96 rounded-2xl bg-surface animate-pulse p-8" />
        }
      >
        <ScopeFormContainer searchParams={searchParams} />
      </Suspense>

      {/* Structured Data: Breadcrumbs */}
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Evaluation Studio', item: '/evaluation' },
          { name: 'Scope an Audit', item: '/evaluation/scope' },
        ]}
      />
    </div>
  );
}
