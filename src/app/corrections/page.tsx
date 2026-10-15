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
        <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
          <span>Editorial Integrity &amp; Right of Reply : 3-Day SLA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gradient-emerald">
          Corrections &amp; Takedowns
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed">
          If something about your company or a role is wrong, tell us. Send the page link, what is wrong, and a source. We respond within three working days and publish a fix or explain why not.
        </p>
      </div>

      {/* SLA & Methodology Info Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-4 space-y-1 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(69,245,197,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-primary relative">
            <Clock className="w-4 h-4 text-[var(--accent-emerald)]" />
            <span>3 Working Days</span>
          </div>
          <p className="text-xs text-secondary relative">
            Guaranteed turnaround time for our editorial team to review and resolve inquiries.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-1 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-primary relative">
            <FileCheck className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span>Official Sources</span>
          </div>
          <p className="text-xs text-secondary relative">
            Factual changes are verified against official company domains or career postings.
          </p>
        </div>

        <div className="glass-card rounded-xl p-4 space-y-1 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-16 h-16 bg-[radial-gradient(circle,rgba(139,124,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="flex items-center gap-2 text-xs font-semibold text-primary relative">
            <Mail className="w-4 h-4 text-[var(--accent-violet)]" />
            <span>Direct Email Desk</span>
          </div>
          <p className="text-xs text-secondary relative">
            Or email directly: <a href="mailto:corrections@countersign.ai" className="text-[var(--accent-cyan)] underline">corrections@countersign.ai</a>
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
      <div className="glass-panel rounded-2xl p-5 space-y-3 text-xs text-secondary leading-relaxed relative overflow-hidden">
        <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[radial-gradient(circle,rgba(61,235,255,0.04)_0%,transparent_70%)] pointer-events-none" />

        <h3 className="font-semibold text-primary relative">
          Our Verification Standard
        </h3>
        <p className="relative">
          Countersign relies on a strict sourcing mandate: every listing is referenced against official company job boards (Ashby, Greenhouse, Lever, or direct domain pages). When an employer closes a project or updates country requirements, our editorial team immediately updates the listing status to <span className="text-[var(--accent-amber)] font-mono">Needs recheck</span> or <span className="text-[var(--accent-danger)] font-mono">Closed</span>, logging a permanent record in our check log.
        </p>
        <p className="relative">
          To review our complete verification criteria, see our <Link href="/methodology" className="text-[var(--accent-cyan)] underline">Methodology Page</Link>.
        </p>
      </div>
    </div>
  );
}
