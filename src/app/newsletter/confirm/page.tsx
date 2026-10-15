import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { confirmNewsletterTokenAction } from '@/app/newsletter/actions';
import {
  CheckCircle2,
  AlertCircle,
  Mail,
  ShieldCheck,
  ArrowRight,
  BookOpen,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Confirm Subscription | Countersign Weekly Digest',
  description: 'Double opt-in confirmation for Countersign human-verified AI work digest.',
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

interface ConfirmPageProps {
  searchParams?: Promise<{ token?: string }>;
}

async function ConfirmationHandler({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const token = params.token;

  if (!token) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-rose-500/30 space-y-4">
        <div className="flex items-center gap-2 text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <h2 className="text-base font-bold">Missing Confirmation Token</h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          This confirmation link is incomplete. Please check the link in your email or enter your address again on our homepage.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const result = await confirmNewsletterTokenAction(token);

  if (!result.success) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-amber-500/30 space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <h2 className="text-base font-bold">Verification Link Expired or Invalid</h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
          {result.message}
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold inline-flex items-center gap-1.5 transition-opacity hover:opacity-90"
          >
            <span>Subscribe on Homepage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Confirmation Success Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 animate-in fade-in">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <h2 className="text-lg sm:text-xl font-bold">Double Opt-in Confirmed!</h2>
        </div>

        <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
          Your email <span className="font-mono font-semibold text-[var(--color-accent)]">{result.email}</span> is now active. You will receive our weekly curated digest of verified remote AI training roles, platform updates, and tactical evaluation guides every Tuesday.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/jobs"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold inline-flex items-center gap-2 shadow-sm hover:opacity-90 transition-opacity"
          >
            <Briefcase className="w-4 h-4" />
            <span>Browse Current Verified Roles</span>
          </Link>

          <Link
            href="/methodology"
            className="px-4 py-2.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] inline-flex items-center gap-2 hover:border-[var(--color-accent)] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Our 10-Point Verification Standard</span>
          </Link>
        </div>
      </div>

      {/* Welcome Email Simulation Preview */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
            <Mail className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Simulated Welcome Email Dispatched</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] text-emerald-400 border border-emerald-500/20">
            Delivered
          </span>
        </div>

        <div className="space-y-3 text-xs sm:text-sm text-[var(--color-text)] leading-relaxed font-sans">
          <div className="font-semibold text-sm">
            Subject: Welcome to Countersign • How we check every listing
          </div>

          <p className="text-xs text-[var(--color-muted)]">
            Hello,
          </p>

          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            Thank you for subscribing to Countersign. We built this hub because remote AI evaluation listings are flooded with unverified brokers, closed roles, and unrealistic pay claims.
          </p>

          <div className="p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] space-y-2 text-xs">
            <div className="font-mono font-semibold text-[var(--color-text)] text-[11px] uppercase tracking-wider">
              Our 3 Rules For Every Email We Send:
            </div>
            <ul className="space-y-1.5 text-[var(--color-muted)]">
              <li>1. <strong>Human-checked within 14 days:</strong> If we haven&apos;t verified an open role in the last 14 days, it never appears in the digest.</li>
              <li>2. <strong>No invented pay:</strong> Compensation is stated only when confirmed by official employer sources.</li>
              <li>3. <strong>Clear country eligibility:</strong> We explicitly indicate which countries are accepted so you never waste time applying where you cannot work.</li>
            </ul>
          </div>

          <p className="text-[11px] text-[var(--color-muted)] pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
            <span>Countersign • Independent Human-Verified AI Work Hub</span>
            <Link
              href={`/newsletter/unsubscribe?token=${encodeURIComponent(token)}`}
              className="text-rose-400 hover:underline"
            >
              Unsubscribe anytime
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmNewsletterPage({ searchParams }: ConfirmPageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
          <ShieldCheck className="w-4 h-4 text-[var(--color-accent)]" />
          <span>Countersign • Double Opt-in Verification</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
          Newsletter Subscription Activation
        </h1>

        <Suspense
          fallback={
            <div className="p-8 text-center text-xs font-mono text-[var(--color-muted)] animate-pulse rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              Verifying security token...
            </div>
          }
        >
          <ConfirmationHandler searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
