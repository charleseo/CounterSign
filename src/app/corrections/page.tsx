import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CorrectionForm } from './CorrectionForm';
import { ShieldCheck, Clock, FileCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Platform Takedown & Correction Procedure | Countersign',
  description: 'How platforms, employers, and researchers submit corrections, updates, or takedown requests. We respond within three working days and publish a fix or explain why not.',
};

export default function CorrectionsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Editorial Integrity & Right of Reply : 3-Day SLA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Corrections & Takedowns
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          If something about your company or a role is wrong, tell us. Send the page link, what is wrong, and a source. We respond within three working days and publish a fix or explain why not.
        </p>
      </div>

      {/* SLA & Methodology Info Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text)]">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>3 Working Days</span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Guaranteed turnaround time for our editorial team to review and resolve inquiries.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text)]">
            <FileCheck className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Official Sources</span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Factual changes are verified against official company domains or career postings.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-text)]">
            <Mail className="w-4 h-4 text-purple-400" />
            <span>Direct Email Desk</span>
          </div>
          <p className="text-xs text-[var(--color-muted)]">
            Or email directly: <a href="mailto:corrections@countersign.ai" className="text-[var(--color-accent)] underline">corrections@countersign.ai</a>
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[var(--color-text)]">
          Submit an Editorial Correction
        </h2>
        <CorrectionForm />
      </div>

      {/* Additional Policies */}
      <div className="p-5 rounded-2xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-3 text-xs text-[var(--color-muted)] leading-relaxed">
        <h3 className="font-semibold text-[var(--color-text)]">
          Our Verification Standard
        </h3>
        <p>
          Countersign relies on a strict sourcing mandate: every listing is referenced against official company job boards (Ashby, Greenhouse, Lever, or direct domain pages). When an employer closes a project or updates country requirements, our editorial team immediately updates the listing status to <span className="text-amber-400 font-mono">Needs recheck</span> or <span className="text-red-400 font-mono">Closed</span>, logging a permanent record in our check log.
        </p>
        <p>
          To review our complete verification criteria, see our <Link href="/methodology" className="text-[var(--color-accent)] underline">Methodology Page</Link>.
        </p>
      </div>
    </div>
  );
}
