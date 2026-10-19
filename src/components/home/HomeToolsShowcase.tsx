'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileCheck,
  DollarSign,
  Activity,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ToolItem {
  id: string;
  title: string;
  tag: string;
  tagTone: 'brand' | 'emerald' | 'amber' | 'blue';
  description: string;
  href: string;
  emoji: string;
  icon: React.ReactNode;
  actionText: string;
}

const TOOLS: ToolItem[] = [
  {
    id: 'task-check',
    title: 'Task pre-submission check',
    tag: 'Quality guard',
    tagTone: 'brand',
    description:
      'Audit your model evaluation answer before submitting. Live word count limits, negative constraint scanner, and anti-rushing pacing timer.',
    href: '/task-check',
    emoji: '🎯',
    icon: <FileCheck className="w-5 h-5 text-[var(--brand-ink)]" />,
    actionText: 'Check a task draft',
  },
  {
    id: 'payout-calculator',
    title: 'Real payout & take-home calculator',
    tag: 'Fee estimator',
    tagTone: 'emerald',
    description:
      'Calculate exact take-home earnings across Deel, Geegpay, AirTM, and domiciliary accounts after processor fees and currency exchange spreads.',
    href: '/payout-calculator',
    emoji: '🧮',
    icon: <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    actionText: 'Calculate net pay',
  },
  {
    id: 'queue-radar',
    title: 'Platform queue health radar',
    tag: 'Live status',
    tagTone: 'emerald',
    description:
      'Community crowdsourced task queue monitor for Outlier AI, Alignerr, and DataAnnotation. Check which platforms have active batches today.',
    href: '/platforms',
    emoji: '⚡',
    icon: <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    actionText: 'View queue status',
  },
  {
    id: 'cv-builder',
    title: 'AI contributor CV builder',
    tag: 'ATS format',
    tagTone: 'brand',
    description:
      'Create an ATS-friendly single-page resume built specifically for AI evaluation. Embed your verified TraceBase credential and export to PDF.',
    href: '/cv-builder',
    emoji: '📄',
    icon: <FileText className="w-5 h-5 text-[var(--brand-ink)]" />,
    actionText: 'Build evaluator CV',
  },
  {
    id: 'mock-simulator',
    title: 'Mock screening test simulator',
    tag: 'Practice test',
    tagTone: 'blue',
    description:
      'Practice realistic 5-minute timed screening tests for Alignerr (TestGorilla) and Outlier before risking your real onboarding application.',
    href: '/training',
    emoji: '🛡️',
    icon: <ShieldCheck className="w-5 h-5 text-sky-500" />,
    actionText: 'Try mock test',
  },
  {
    id: 'pay-rates',
    title: 'Pay rate & role benchmark',
    tag: 'Transparency',
    tagTone: 'emerald',
    description:
      'Compare verified hourly rates across Coding ($40-$65/hr), science and math, and General RLHF. Review penalty policies and payout frequencies.',
    href: '/platforms?tab=rates',
    emoji: '💵',
    icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
    actionText: 'Compare pay rates',
  },
  {
    id: 'appeals-kit',
    title: 'Account dispute & appeal kit',
    tag: 'Advocacy',
    tagTone: 'amber',
    description:
      'Generate evidence-backed appeal letters for sudden empty queues, false location alerts, or disputed reviewer ratings with one-click copy.',
    href: '/appeals',
    emoji: '⚖️',
    icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
    actionText: 'Generate appeal letter',
  },
  {
    id: 'model-benchmark',
    title: 'Model constraint benchmark',
    tag: 'Open data',
    tagTone: 'brand',
    description:
      'Explore our human-audited evaluation leaderboard tracking Claude 3.5 Sonnet, OpenAI o1, and Gemini 2.0 on negative constraints and truth adherence.',
    href: '/benchmark',
    emoji: '🔮',
    icon: <Sparkles className="w-5 h-5 text-[var(--brand-ink)]" />,
    actionText: 'View leaderboard',
  },
];

export function HomeToolsShowcase() {
  return (
    <section aria-labelledby="tools-showcase-heading" className="w-full border-t border-rule bg-canvas py-14 sm:py-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs text-secondary font-medium">
              <Sparkles size={13} className="text-[var(--brand-ink)]" />
              <span>Independent contributor workbench</span>
            </div>
            <h2 id="tools-showcase-heading" className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Tools built to protect and verify your AI work
            </h2>
            <p className="text-base sm:text-lg text-secondary leading-relaxed">
              Everything you need to verify tasks, estimate local take-home pay, pass onboarding tests, and defend your contributor standing. 100% free with zero ads.
            </p>
          </div>

          <Link
            href="/task-check"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-ink)] hover:underline shrink-0"
          >
            <span>Open quality checker</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="rounded-2xl border border-rule bg-sheet p-6 flex flex-col justify-between gap-5 cs-card-lift group min-h-[44px] hover:border-[var(--brand-ink)]/60 transition-all hover:shadow-xl hover:shadow-[var(--brand-ink)]/10"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-rule flex items-center justify-center text-lg group-hover:scale-115 group-hover:-rotate-6 transition-transform duration-200 shadow-xs">
                    <span role="img" aria-label={tool.title}>{tool.emoji}</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors group-hover:border-[var(--brand-ink)]/40 ${
                      tool.tagTone === 'brand'
                        ? 'border-[var(--brand-ink)]/30 bg-[var(--brand-tint)] text-[var(--brand-ink)]'
                        : tool.tagTone === 'emerald'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                        : tool.tagTone === 'amber'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                        : 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300'
                    }`}
                  >
                    {tool.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink group-hover:text-[var(--brand-ink)] transition-colors">
                  {tool.title}
                </h3>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="pt-3 border-t border-rule flex items-center justify-between text-xs font-bold text-primary group-hover:text-[var(--brand-ink)] transition-colors">
                <span>{tool.actionText}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-200" />
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Reference Strip */}
        <div className="pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-secondary">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-ink">More contributor resources:</span>
            <Link href="/glossary" className="text-[#5A35C8] hover:underline font-medium min-h-[36px] inline-flex items-center">
              AI evaluation glossary &amp; acronyms
            </Link>
            <span aria-hidden="true">&bull;</span>
            <Link href="/w8ben" className="text-[#5A35C8] hover:underline font-medium min-h-[36px] inline-flex items-center">
              W-8BEN tax walkthrough
            </Link>
          </div>
          <Link href="/evaluation/demo" className="text-secondary hover:text-ink font-medium min-h-[36px] inline-flex items-center">
            For AI teams: Try live audit demo &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
