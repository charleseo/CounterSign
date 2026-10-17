'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Layers,
  ChevronDown,
  Info,
  Calendar,
} from 'lucide-react';

interface AuditSample {
  id: string;
  name: string;
  domain: string;
  prompt: string;
  referenceDoc: string;
  modelAnswer: string;
  groundingScore: number;
  hallucinationCount: number;
  unsupportedClaims: string[];
}

const SAMPLE_CASES: AuditSample[] = [
  {
    id: 'stripe-idempotency',
    name: 'Stripe webhook idempotency',
    domain: 'Fintech API',
    prompt:
      'How should a backend service handle duplicate Stripe webhook event deliveries according to Stripe engineering specs?',
    referenceDoc:
      'Stripe webhooks can occasionally be delivered more than once for the same event. Your server should guard against duplicated event receipts by making your event processing idempotent. One way to do this is logging the events you have processed, and then not processing already-logged events. Event objects contain a unique `id` attribute (e.g., `evt_123`). Check your local database for this ID before taking business action. Return a 200 HTTP status response as quickly as possible, ideally offloading long-running jobs to an asynchronous queue.',
    modelAnswer:
      'To handle duplicate Stripe webhooks, your server must implement idempotent event processing. When a webhook arrives, inspect the unique event `id` attribute (such as `evt_123`) and verify whether this ID has already been recorded in your database. If it exists, acknowledge the webhook immediately with a 200 response without re-processing. Additionally, Stripe automatically retries failed events with a built-in exponential backoff header called `Stripe-Retry-Count-Max-5` which client servers can monitor.',
    groundingScore: 78,
    hallucinationCount: 1,
    unsupportedClaims: [
      'Stripe automatically retries failed events with a built-in exponential backoff header called `Stripe-Retry-Count-Max-5` (Invented header not in Stripe specs).',
    ],
  },
  {
    id: 'nextjs-params',
    name: 'Next.js dynamic route parameters',
    domain: 'Full-stack Framework',
    prompt:
      'How do you access route parameters in Next.js App Router server components according to current documentation?',
    referenceDoc:
      'In Next.js App Router, dynamic route segments are passed as the `params` prop to page, layout, and route handlers. In recent releases, `params` is an asynchronous Promise that must be awaited before accessing properties (e.g. `const { slug } = await params`). Server Components handle this naturally using standard async/await syntax. Accessing properties synchronously without awaiting triggers runtime warnings in development.',
    modelAnswer:
      'In Next.js App Router, dynamic route segments are passed to your page components via the `params` prop. In modern versions, `params` is a Promise, so your Server Component function must be marked `async` and you must await `params` before destructuring route properties. Accessing parameters synchronously without awaiting causes runtime errors.',
    groundingScore: 100,
    hallucinationCount: 0,
    unsupportedClaims: [],
  },
  {
    id: 'postgres-isolation',
    name: 'PostgreSQL repeatable read isolation',
    domain: 'Database Systems',
    prompt:
      'Can phantom reads occur in PostgreSQL under the Repeatable Read transaction isolation level?',
    referenceDoc:
      'The PostgreSQL Repeatable Read implementation prevents dirty reads, non-repeatable reads, and phantom reads. Even though SQL-92 allows phantom reads under Repeatable Read, PostgreSQL’s implementation uses snapshot isolation, which prevents phantom reads altogether. A transaction sees a snapshot of the database taken at the start of the first non-transaction-control query, not the start of the current query.',
    modelAnswer:
      'Under PostgreSQL Repeatable Read, phantom reads are impossible because PostgreSQL uses snapshot isolation for this level. However, if two concurrent transactions update the same row, PostgreSQL will automatically wait up to 30 seconds before killing the second transaction with a LockTimeout error.',
    groundingScore: 72,
    hallucinationCount: 1,
    unsupportedClaims: [
      'PostgreSQL automatically waits up to 30 seconds before killing the second transaction with a LockTimeout error (Invented 30-second default timeout; serialization failures raise 40001 immediately without a 30-second wait).',
    ],
  },
];

export function AuditDemoClient() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('stripe-idempotency');
  const [promptText, setPromptText] = useState<string>(SAMPLE_CASES[0].prompt);
  const [referenceDoc, setReferenceDoc] = useState<string>(SAMPLE_CASES[0].referenceDoc);
  const [modelAnswer, setModelAnswer] = useState<string>(SAMPLE_CASES[0].modelAnswer);
  const [hasRun, setHasRun] = useState<boolean>(true);

  const activeCase = useMemo(
    () => SAMPLE_CASES.find((c) => c.id === selectedCaseId) || SAMPLE_CASES[0],
    [selectedCaseId]
  );

  const handleSelectCase = (caseItem: AuditSample) => {
    setSelectedCaseId(caseItem.id);
    setPromptText(caseItem.prompt);
    setReferenceDoc(caseItem.referenceDoc);
    setModelAnswer(caseItem.modelAnswer);
    setHasRun(true);
  };

  // Sentence analysis
  const sentenceAnalysis = useMemo(() => {
    const sentences = modelAnswer
      .split(/(?<=[.!?])\s+/)
      .filter((s) => s.trim().length > 0);

    return sentences.map((sentence, index) => {
      // Check against unsupported claims in active case
      const isHallucination = activeCase.unsupportedClaims.some((claim) =>
        claim.toLowerCase().includes(sentence.toLowerCase().slice(0, 30))
      );

      // Check if keywords exist in reference doc
      const words = sentence
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length > 4);

      const matchCount = words.filter((w) =>
        referenceDoc.toLowerCase().includes(w)
      ).length;

      const ratio = words.length > 0 ? matchCount / words.length : 1;

      let status: 'grounded' | 'unsupported' | 'partial' = 'grounded';
      if (isHallucination) {
        status = 'unsupported';
      } else if (ratio < 0.45 && words.length > 3) {
        status = 'partial';
      }

      return {
        id: index,
        text: sentence,
        status,
      };
    });
  }, [modelAnswer, referenceDoc, activeCase]);

  const stats = useMemo(() => {
    const total = sentenceAnalysis.length;
    const grounded = sentenceAnalysis.filter((s) => s.status === 'grounded').length;
    const unsupported = sentenceAnalysis.filter((s) => s.status === 'unsupported').length;
    const partial = sentenceAnalysis.filter((s) => s.status === 'partial').length;

    const score = total > 0 ? Math.round((grounded / total) * 100) : 100;
    return {
      total,
      grounded,
      unsupported,
      partial,
      score,
    };
  }, [sentenceAnalysis]);

  return (
    <div className="space-y-8">
      {/* Sample Presets */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-secondary">
          Select an illustrative technical documentation case:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectCase(item)}
              className={`px-3 py-2 rounded-xl border text-xs font-medium transition-colors text-left min-h-[44px] ${
                selectedCaseId === item.id
                  ? 'border-[#5A35C8] bg-[#5A35C8]/10 text-ink font-semibold'
                  : 'border-rule bg-sheet text-secondary hover:text-ink'
              }`}
            >
              <div className="text-ink font-bold">{item.name}</div>
              <div className="text-[10px] text-secondary">{item.domain}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Reference Document */}
        <div className="rounded-xl border border-rule bg-sheet p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-[#5A35C8]" />
                Ground-truth reference excerpt
              </span>
              <span className="text-[11px] text-secondary">Primary documentation</span>
            </div>
            <textarea
              rows={8}
              value={referenceDoc}
              onChange={(e) => setReferenceDoc(e.target.value)}
              className="w-full p-3 rounded-lg border border-rule bg-surface text-xs text-ink font-mono focus:outline-none focus:border-[#5A35C8] leading-relaxed resize-y"
              placeholder="Paste primary documentation excerpt here..."
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-rule">
            <span className="text-[11px] font-semibold text-secondary">Test prompt:</span>
            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-rule bg-surface text-xs text-ink focus:outline-none focus:border-[#5A35C8]"
            />
          </div>
        </div>

        {/* Right: Model Answer */}
        <div className="rounded-xl border border-rule bg-sheet p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI-generated response under audit
              </span>
              <span className="text-[11px] text-secondary">Candidate answer</span>
            </div>
            <textarea
              rows={8}
              value={modelAnswer}
              onChange={(e) => setModelAnswer(e.target.value)}
              className="w-full p-3 rounded-lg border border-rule bg-surface text-xs text-ink font-mono focus:outline-none focus:border-[#5A35C8] leading-relaxed resize-y"
              placeholder="Paste candidate model answer to audit..."
            />
          </div>

          <div className="pt-2 border-t border-rule flex items-center justify-between">
            <span className="text-[11px] text-secondary">
              Click run to perform sentence-level grounding check
            </span>
            <button
              type="button"
              onClick={() => setHasRun(true)}
              className="px-4 py-2 rounded-lg bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors min-h-[38px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Run audit check</span>
            </button>
          </div>
        </div>
      </div>

      {/* Audit Output Breakdown */}
      {hasRun && (
        <div className="rounded-xl border border-rule bg-sheet p-6 space-y-6 animate-in fade-in duration-200">
          {/* Metrics Summary Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-rule">
            <div>
              <h2 className="text-lg font-bold text-ink">
                Audit findings: {activeCase.name}
              </h2>
              <span className="text-xs text-secondary">
                Audited against verified technical documentation specification
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-ink tabular-nums">
                  {stats.score}%
                </div>
                <div className="text-[10px] text-secondary">Grounding accuracy</div>
              </div>
              <div
                className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${
                  stats.unsupported === 0
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                }`}
              >
                {stats.unsupported === 0 ? 'Passed audit' : `${stats.unsupported} hallucination found`}
              </div>
            </div>
          </div>

          {/* Sentence-by-Sentence Highlight View */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-ink">
              Sentence-level grounding inspection:
            </span>
            <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-2.5 text-xs leading-relaxed">
              {sentenceAnalysis.map((item) => (
                <div
                  key={item.id}
                  className={`p-2.5 rounded-lg border flex items-start gap-2.5 transition-colors ${
                    item.status === 'grounded'
                      ? 'border-emerald-500/20 bg-emerald-500/5 text-ink'
                      : item.status === 'unsupported'
                      ? 'border-red-500/30 bg-red-500/10 text-ink'
                      : 'border-amber-500/20 bg-amber-500/5 text-ink'
                  }`}
                >
                  {item.status === 'grounded' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {item.status === 'unsupported' && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  {item.status === 'partial' && (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  )}

                  <div className="space-y-1">
                    <p>{item.text}</p>
                    <span className="text-[10px] font-mono text-secondary">
                      {item.status === 'grounded'
                        ? 'Grounded: Supported by reference documentation'
                        : item.status === 'unsupported'
                        ? 'Hallucination: Invented technical detail not in reference'
                        : 'Partial: Broad claim with weak direct citation support'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Root-Cause Taxonomy Box */}
          {activeCase.unsupportedClaims.length > 0 && (
            <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-2">
              <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Root-cause error analysis
              </span>
              <ul className="list-disc list-inside space-y-1 text-xs text-secondary">
                {activeCase.unsupportedClaims.map((claim, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {claim}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Commercial CTA for AI Teams */}
          <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-ink">
                Need rigorous evaluation for your enterprise docs bot or RAG system?
              </h3>
              <p className="text-[11px] text-secondary">
                We run multi-annotator sprints with Cohen&apos;s Kappa verification and root-cause taxonomies.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/evaluation/estimator"
                className="px-3.5 py-2 rounded-lg border border-rule bg-surface text-ink text-xs font-semibold hover:border-[#5A35C8] transition-colors min-h-[38px] inline-flex items-center"
              >
                Sprint estimator
              </Link>
              <Link
                href="/evaluation/scope"
                className="px-3.5 py-2 rounded-lg bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors min-h-[38px]"
              >
                <span>Scope an audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
