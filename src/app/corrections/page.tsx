import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { CorrectionForm } from './CorrectionForm';
import { ShieldCheck, Clock, FileCheck, Mail } from 'lucide-react';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const metadata: Metadata = {
  title: 'Platform Takedown & Correction Procedure | TraceBase',
  description: 'How platforms, employers, and researchers submit corrections, updates, or takedown requests. We respond within three working days and publish a fix or explain why not.',
};

export default function CorrectionsPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-sheet text-xs text-secondary font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-ink" />
          <span>Editorial Integrity &amp; Right of Reply : 3-Day SLA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Corrections &amp; Takedowns
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          If something about your company or a role is wrong, tell us. Send the page link, what is wrong, and a source. We respond within three working days and publish a fix or explain why not.
        </p>
      </div>

      {/* SLA & Methodology Info Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Clock className="w-4 h-4 text-brand-ink" />
            <span>3 Working Days</span>
          </div>
          <p className="text-xs text-secondary">
            Standard turnaround time for our editorial team to review and resolve inquiries.
          </p>
        </div>

        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <FileCheck className="w-4 h-4 text-brand-ink" />
            <span>Official Sources</span>
          </div>
          <p className="text-xs text-secondary">
            Factual changes are verified against official company domains or career postings.
          </p>
        </div>

        <div className="bg-sheet border border-rule rounded-xl p-4 space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <Mail className="w-4 h-4 text-brand-ink" />
            <span>Direct Email Desk</span>
          </div>
          <p className="text-xs text-secondary">
            Or email directly: <a href={`mailto:corrections@${getSiteHost()}`} className="text-brand-ink underline">corrections@{getSiteHost()}</a>
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-primary">
          Submit an Editorial Correction
        </h2>
        <CorrectionForm />
      </div>

      {/* Additional Policies */}
      <div className="bg-sheet border border-rule rounded-xl p-5 space-y-3 text-xs text-secondary leading-relaxed">
        <h3 className="font-semibold text-primary">
          Our Verification Standard
        </h3>
        <p>
          TraceBase relies on a strict sourcing mandate: every listing is referenced against official company job boards (Ashby, Greenhouse, Lever, or direct domain pages). When an employer closes a project or updates country requirements, our editorial team immediately updates the listing status to <span className="text-amber-700 dark:text-amber-400 font-semibold">Needs recheck</span> or <span className="text-red-700 dark:text-red-400 font-semibold">Closed</span>, logging a permanent record in our check log.
        </p>
        <p>
          To review our complete verification criteria, see our <Link href="/methodology" className="text-brand-ink underline">Methodology Page</Link>.
        </p>
      </div>
    </div>
  );
}
