'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

type LogoCategory = 'all' | 'ai-companies' | 'competitors';

interface LogoItem {
  id: string;
  name: string;
  category: 'ai-companies' | 'competitors';
  badge: string;
  href: string;
  lightSrc: string;
  darkSrc: string;
}

// 7 Top AI Companies with genuine brand logos
const AI_COMPANIES: LogoItem[] = [
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/claude.svg',
    darkSrc: '/images/logos/claude-dark.svg',
  },
  {
    id: 'openai',
    name: 'OpenAI',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/openai.svg',
    darkSrc: '/images/logos/openai-dark.svg',
  },
  {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/google-deepmind.svg',
    darkSrc: '/images/logos/google-deepmind-dark.svg',
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/mistral.svg',
    darkSrc: '/images/logos/mistral-dark.svg',
  },
  {
    id: 'cohere',
    name: 'Cohere',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/cohere.svg',
    darkSrc: '/images/logos/cohere-dark.svg',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/perplexity.svg',
    darkSrc: '/images/logos/perplexity-dark.svg',
  },
  {
    id: 'meta-ai',
    name: 'Meta AI',
    category: 'ai-companies',
    badge: 'Audited model',
    href: '/evaluation',
    lightSrc: '/images/logos/meta.svg',
    darkSrc: '/images/logos/meta-dark.svg',
  },
];

// 7 Top Platforms and Partners with genuine brand logos (sourced directly from Tailscale & brand kits)
const COMPETITORS: LogoItem[] = [
  {
    id: 'scale',
    name: 'Scale AI',
    category: 'competitors',
    badge: 'Platform verified',
    href: '/database',
    lightSrc: '/images/logos/scale.svg',
    darkSrc: '/images/logos/scale-dark.svg',
  },
  {
    id: 'telus',
    name: 'TELUS International',
    category: 'competitors',
    badge: 'Platform verified',
    href: '/database',
    lightSrc: '/images/logos/telus.svg',
    darkSrc: '/images/logos/telus-dark.svg',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'competitors',
    badge: 'Partner tool',
    href: '/database',
    lightSrc: '/images/logos/cursor.svg',
    darkSrc: '/images/logos/cursor-dark.svg',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'competitors',
    badge: 'Enterprise client',
    href: '/database',
    lightSrc: '/images/logos/microsoft.svg',
    darkSrc: '/images/logos/microsoft-dark.svg',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    category: 'competitors',
    badge: 'Enterprise client',
    href: '/database',
    lightSrc: '/images/logos/nvidia.svg',
    darkSrc: '/images/logos/nvidia-dark.svg',
  },
  {
    id: 'duolingo',
    name: 'Duolingo',
    category: 'competitors',
    badge: 'Enterprise client',
    href: '/database',
    lightSrc: '/images/logos/duolingo.svg',
    darkSrc: '/images/logos/duolingo-dark.svg',
  },
  {
    id: 'instacart',
    name: 'Instacart',
    category: 'competitors',
    badge: 'Enterprise client',
    href: '/database',
    lightSrc: '/images/logos/instacart.svg',
    darkSrc: '/images/logos/instacart-dark.svg',
  },
];

const ALL_ITEMS = [...AI_COMPANIES, ...COMPETITORS];

export function TailscaleLogoGrid() {
  const [filter, setFilter] = useState<LogoCategory>('all');

  const showAi = filter === 'all' || filter === 'ai-companies';
  const showCompetitors = filter === 'all' || filter === 'competitors';

  return (
    <section id="directory" aria-labelledby="directory-heading" className="w-full pt-16 sm:pt-20 pb-12 sm:pb-16 border-b border-rule bg-surface/30 scroll-mt-28 sm:scroll-mt-32">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rule bg-sheet text-xs font-mono text-secondary mb-3 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Benchmark and verification directory</span>
          </div>
          <h2 id="directory-heading" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink m-0 scroll-mt-32 sm:scroll-mt-36">
            Top AI companies and alternative work platforms.
          </h2>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed mt-2.5 max-w-xl mx-auto m-0">
            We evaluate answers from leading foundation model labs, and independently track queue status and pay rates across alternative work platforms.
          </p>

          {/* Filter Pills (Tailscale Style) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6">
            {(
              [
                { key: 'all', label: `All organizations (${ALL_ITEMS.length})` },
                { key: 'ai-companies', label: `Top AI companies (${AI_COMPANIES.length})` },
                { key: 'competitors', label: `Alternative platforms (${COMPETITORS.length})` },
              ] as const
            ).map((tab) => {
              const active = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                    active
                      ? 'bg-ink text-canvas shadow-xs'
                      : 'bg-sheet text-secondary hover:text-ink hover:bg-surface border border-rule'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Top AI Companies Sub-Grid */}
        {showAi && (
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                Top AI model labs we evaluate ({AI_COMPANIES.length})
              </span>
              <Link href="/evaluation" className="text-xs text-[#5A35C8] font-semibold hover:underline">
                View evaluation methodology &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {AI_COMPANIES.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center h-[72px] sm:h-[82px] px-4 rounded-xl border border-rule bg-sheet hover:bg-surface hover:border-ink/25 hover:-translate-y-0.5 transition-all duration-150 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5A35C8] ${
                    idx === 6 ? 'col-span-2 sm:col-span-1 max-sm:max-w-[280px] max-sm:mx-auto max-sm:w-full' : ''
                  }`}
                  title={`${item.name} (${item.badge})`}
                >
                  <div className="flex items-center justify-center w-full px-2">
                    {/* Light theme logo */}
                    <img
                      src={item.lightSrc}
                      alt={item.name}
                      className="logo-light h-6 sm:h-7 w-auto max-h-7 max-w-[130px] sm:max-w-[150px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    {/* Dark theme logo */}
                    <img
                      src={item.darkSrc}
                      alt={item.name}
                      className="logo-dark h-6 sm:h-7 w-auto max-h-7 max-w-[130px] sm:max-w-[150px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute bottom-1.5 text-[9.5px] font-mono text-secondary/0 group-hover:text-secondary transition-all duration-150">
                    {item.badge} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Competitor Platforms Sub-Grid */}
        {showCompetitors && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-semibold text-secondary uppercase tracking-wider">
                Alternative platforms and partners we track ({COMPETITORS.length})
              </span>
              <Link href="/compare" className="text-xs text-[#5A35C8] font-semibold hover:underline">
                Compare platform pay and queues &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {COMPETITORS.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center h-[72px] sm:h-[82px] px-4 rounded-xl border border-rule bg-sheet hover:bg-surface hover:border-ink/25 hover:-translate-y-0.5 transition-all duration-150 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#5A35C8] ${
                    idx === 6 ? 'col-span-2 sm:col-span-1 max-sm:max-w-[280px] max-sm:mx-auto max-sm:w-full' : ''
                  }`}
                  title={`${item.name} (${item.badge})`}
                >
                  <div className="flex items-center justify-center w-full px-2">
                    {/* Light theme logo */}
                    <img
                      src={item.lightSrc}
                      alt={item.name}
                      className="logo-light h-6 sm:h-7 w-auto max-h-7 max-w-[130px] sm:max-w-[150px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                    {/* Dark theme logo */}
                    <img
                      src={item.darkSrc}
                      alt={item.name}
                      className="logo-dark h-6 sm:h-7 w-auto max-h-7 max-w-[130px] sm:max-w-[150px] object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute bottom-1.5 text-[9.5px] font-mono text-secondary/0 group-hover:text-secondary transition-all duration-150">
                    {item.badge} &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Verification Note */}
        <div className="flex items-center justify-center gap-2 text-xs text-secondary mt-8 pt-6 border-t border-rule/60 text-center">
          <CheckCircle2 size={13} className="text-emerald-800 dark:text-emerald-400 shrink-0" />
          <span>Independent coverage: TraceBase is not affiliated with or sponsored by any of the platforms or companies listed.</span>
        </div>

      </div>
    </section>
  );
}
