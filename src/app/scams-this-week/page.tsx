import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { ShieldAlert, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import { SampleBadge } from '@/components/ui/SampleBadge';

export const metadata: Metadata = {
  title: 'Scams we saw this week | TraceBase',
  description:
    'Real recruitment and AI training job scams reported by applicants, human-checked and stripped of personal data. Warning signs and what to do.',
  alternates: {
    canonical: '/scams-this-week',
  },
};

export default function ScamsThisWeekPage() {
  const posts = dbRepository.getWeeklyScams();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Scams we saw this week', item: '/scams-this-week' },
        ]}
      />

      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-rule">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rose-500/30 text-xs text-rose-400 bg-rose-500/10 font-medium">
          <ShieldAlert size={14} />
          <span>Verified scam warnings</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Scams we saw this week
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          Recruitment schemes, advance-fee requests, and impersonation attempts reported by applicants, verified by our human editors, and stripped of personal data.
        </p>
      </div>

      {/* List of Weekly Scam Posts or Honest Empty State */}
      {posts.length === 0 ? (
        <div className="p-8 sm:p-12 text-center rounded-2xl border border-rule bg-sheet space-y-4">
          <ShieldAlert className="w-8 h-8 text-secondary mx-auto" />
          <h2 className="text-base sm:text-lg font-bold text-primary">
            No confirmed scam reports this week
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
            When job seekers report suspicious outreach and our checks confirm a deceptive pattern, our human team verifies and publishes a sanitized warning here to protect the community.
          </p>
          <div className="pt-2">
            <Link
              href="/scam-check"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-brand-ink text-white font-medium text-xs hover:opacity-90"
            >
              <span>Check an offer</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/scams-this-week/${post.slug}`}
              className="block p-5 sm:p-6 rounded-xl border border-rule bg-sheet hover:border-brand-ink/40 transition-colors group space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="tabular-nums text-secondary">
                  Reported {post.reported_date}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  <AlertTriangle size={12} />
                  <span>{post.warning_signs.length} warning signs</span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-bold text-primary group-hover:text-brand-ink transition-colors">
                    {post.title.replace(/\[SAMPLE\]/gi, '').trim()}
                  </h2>
                  {post.title.includes('[SAMPLE]') && <SampleBadge />}
                </div>
                <p className="text-xs sm:text-sm text-secondary line-clamp-2 mt-2 leading-relaxed">
                  {post.message_paraphrased}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-brand-ink font-medium border-t border-rule">
                <span>Read breakdown and prevention steps</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Trust & Action Strip */}
      <div className="p-5 rounded-xl border border-rule bg-sheet/50 space-y-3 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-semibold text-primary">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>Received a suspicious message yourself?</span>
        </div>
        <p className="text-secondary leading-relaxed">
          Check the outreach against our 10-point checklist before responding. We never charge you and never ask for sensitive credentials.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href="/scam-check"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-ink text-white font-medium text-xs hover:opacity-90 transition-opacity"
          >
            <span>Check an offer</span>
            <ArrowRight size={13} />
          </Link>
          <Link
            href="/official-channels"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rule text-primary font-medium text-xs hover:bg-surface transition-colors"
          >
            <span>Our only official channels</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
