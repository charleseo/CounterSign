import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Referral Disclosure & Neutrality Pledge | Countersign',
  description: 'How Countersign labels direct vs referral links, how we may earn compensation, and our strict pledge that referral earnings never alter ranking, freshness, or verification status.',
};

export default function ReferralDisclosurePage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Transparency & Independence Standard : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Referral & Commercial Disclosure
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          At Countersign, trust is our primary asset. We believe job seekers and enterprise clients deserve complete, upfront clarity regarding how our service is funded and how external platform links are handled.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Audited Policy</span>
        </div>
      </div>

      {/* The Neutrality Pledge */}
      <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-emerald-500/30 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-base font-bold text-[var(--color-text)]">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>The Countersign Neutrality Pledge</span>
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          Referral compensation <strong className="text-[var(--color-text)]">NEVER</strong> alters a role&apos;s search ranking, verification status, freshness badge, or eligibility assessment. We list roles because they are verified opportunities for talent, never because a platform offers a commission.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-sm text-[var(--color-text)] leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">01</span>
            How Links Are Labeled
          </h2>
          <p className="text-[var(--color-muted)]">
            Every outbound link on Countersign is clearly categorized on both the job card and the detail page:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Direct Link */}
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Direct Link
                </span>
                <span className="text-[11px] text-[var(--color-muted)] font-mono">No commission</span>
              </div>
              <p className="text-xs font-semibold text-[var(--color-text)]">
                Direct link. No referral.
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Points directly to the employer&apos;s official careers portal (Ashby, Greenhouse, Lever, or direct site). Countersign receives zero financial compensation if you apply or get hired.
              </p>
            </div>

            {/* Referral Link */}
            <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Referral Link
                </span>
                <span className="text-[11px] text-[var(--color-muted)] font-mono">Bonus possible</span>
              </div>
              <p className="text-xs font-semibold text-[var(--color-text)]">
                Referral link: we may earn a bonus if you qualify. It costs you nothing.
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Where an authorized community referral or talent partner program exists, clicking this link may generate a referral credit or bonus to Countersign if you pass platform screening and complete qualifying work tasks.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">02</span>
            Zero Cost to Candidates Guarantee
          </h2>
          <p className="text-[var(--color-muted)]">
            Using a referral link will <strong className="text-[var(--color-text)]">never</strong> increase fees, decrease your hourly pay rate, or impose any cost on you as a candidate:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[var(--color-muted)]">
            <li>Your compensation is paid 100% by the hiring platform at their standard rates.</li>
            <li>Referral bonuses are paid directly from the platform&apos;s recruiting or community acquisition budget.</li>
            <li>Countersign will never charge you for application access, guides, cheat sheets, or interview tips.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">03</span>
            How Countersign Sustains Itself
          </h2>
          <p className="text-[var(--color-muted)]">
            To ensure editorial independence, Countersign relies on a diversified business model:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="font-semibold text-xs text-[var(--color-text)]">The Evaluation Studio (Primary Revenue)</div>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                We perform paid technical documentation citation audits, RAG evaluation, and benchmark analysis for AI startups. This commercial studio cross-subsidizes our free community job hub.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="font-semibold text-xs text-[var(--color-text)]">Referral Credits (Secondary)</div>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Occasional referral bonuses earned when candidates successfully onboard onto vetted partner platforms.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">04</span>
            Questions or Corrections
          </h2>
          <p className="text-[var(--color-muted)]">
            If you represent an AI training platform and wish to update your referral policy, provide a direct feed, or correct any listing detail, please consult our <Link href="/corrections" className="text-[var(--color-accent)] underline">Corrections Procedure</Link> or email our editorial desk at <a href="mailto:corrections@countersign.ai" className="text-[var(--color-accent)] underline">corrections@countersign.ai</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
