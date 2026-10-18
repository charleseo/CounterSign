'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Printer,
  Copy,
  Check,
  SearchX,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { getCertificateById } from '@/lib/training/certificates';

interface CertificateVerifyClientProps {
  id: string;
}

export function CertificateVerifyClient({ id }: CertificateVerifyClientProps) {
  const rawId = id || '';
  const cert = rawId ? getCertificateById(rawId) : null;
  const [copied, setCopied] = useState<boolean>(false);


  const handleCopyLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard fallback
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };


  if (!cert) {
    return (
      <div className="min-h-screen bg-canvas text-ink pt-32 pb-20">
        <div className="max-w-md mx-auto px-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-full border border-subtle bg-surface flex items-center justify-center mx-auto text-secondary">
            <SearchX size={26} />
          </div>
          <h1 className="text-2xl font-bold text-ink">Certificate not found</h1>
          <p className="text-xs text-secondary leading-relaxed">
            Record ID <span className="font-mono text-ink font-semibold">{rawId.toUpperCase()}</span> was not found in our public verification registry.
          </p>
          <div className="pt-4 flex flex-col gap-2">
            <Link
              href="/training"
              className="cs-btn cs-btn-primary py-2.5 text-xs font-bold inline-flex items-center justify-center gap-2"
            >
              <span>Take evaluation training</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/"
              className="px-4 py-2 text-xs font-semibold text-secondary hover:text-ink transition-colors"
            >
              Return to TraceBase home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const issuedDate = new Date(cert.issuedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-canvas text-ink pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs font-semibold text-secondary print:hidden">
          <div className="flex items-center gap-2">
            <Link href="/training" className="hover:text-ink transition-colors">
              Evaluation training
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">Verification</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rule bg-sheet text-xs font-semibold text-ink hover:bg-surface cursor-pointer"
            >
              {copied ? <Check size={13} className="text-teal-400" /> : <Copy size={13} />}
              <span>{copied ? 'Copied link' : 'Copy link'}</span>
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--brand-ink)] text-white text-xs font-bold hover:opacity-90 cursor-pointer"
            >
              <Printer size={13} />
              <span>Print or save PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Paper Sheet */}
        <article className="rounded-2xl border-2 border-[var(--brand-ink)]/30 bg-sheet p-8 sm:p-12 shadow-2xl relative overflow-hidden space-y-8 text-center print:border-black print:shadow-none print:p-6">
          {/* Watermark seal */}
          <div className="absolute -top-16 -right-16 w-56 h-56 text-[var(--brand-ink)]/5 pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 200 200" width="100%" height="100%">
              <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="8" />
              <path d="M78 100l14 14 30-32" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Header Seal */}
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full border border-[var(--brand-ink)]/40 bg-[var(--brand-ink)]/10 text-[var(--brand-ink)] mx-auto flex items-center justify-center">
              <Award size={32} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[11px] font-bold text-teal-300">
              <ShieldCheck size={13} />
              <span>Verified credential on TraceBase registry</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold tracking-wide text-ink m-0">
              Certificate of competency
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-medium m-0">
              AI model evaluation and citation accuracy
            </p>
          </div>

          {/* Recipient Details */}
          <div className="py-4 border-y border-subtle space-y-1">
            <span className="text-xs text-secondary block">Awarded to</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-ink font-serif tracking-tight">
              {cert.recipientName}
            </div>
            <p className="text-xs text-readable max-w-md mx-auto pt-1 m-0">
              For passing the independent competency evaluation with an accuracy score of{' '}
              <strong className="text-ink font-bold tabular-nums">{cert.scorePercent}%</strong>.
            </p>
          </div>

          {/* Competency Pillars */}
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold text-ink block text-center">
              Verified evaluation competencies
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-secondary">
              {cert.competencies.map((comp, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg border border-subtle bg-surface">
                  <CheckCircle2 size={14} className="text-teal-400 shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Record Footer */}
          <div className="pt-4 border-t border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary text-left">
            <div>
              <span className="block text-muted text-[10px] font-bold">Verification ID</span>
              <span className="font-mono font-bold text-ink text-sm">{cert.id}</span>
            </div>
            <div className="sm:text-right">
              <span className="block text-muted text-[10px] font-bold">Date issued</span>
              <span className="font-semibold text-ink">{issuedDate}</span>
            </div>
          </div>
        </article>

        {/* Honest Placement Disclaimer */}
        <p className="text-[11px] text-muted text-center leading-relaxed print:hidden">
          TraceBase verifies that the individual named completed the evaluation rubric assessment.
          TraceBase does not promise or guarantee third-party job placements or task volumes.
        </p>
      </div>
    </div>
  );
}
