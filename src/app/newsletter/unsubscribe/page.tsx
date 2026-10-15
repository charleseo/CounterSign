import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { UnsubscribeForm } from './UnsubscribeForm';
import { Shield, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Unsubscribe from Newsletter | Countersign',
  description: 'One-click newsletter unsubscription under NDPA 2023 compliance.',
  robots: {
    index: false,
    follow: false,
  },
};

export const instant = false;

interface UnsubscribePageProps {
  searchParams?: Promise<{ token?: string; email?: string }>;
}

async function UnsubscribeContainer({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string; email?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const initialValue = params.token || params.email || '';
  return <UnsubscribeForm initialIdentifier={initialValue} />;
}

export default function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-12 px-4 sm:px-6">
      <div className="max-w-xl mx-auto space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Countersign</span>
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
            <Shield className="w-4 h-4 text-[var(--color-accent)]" />
            <span>NDPA 2023 • Easy One-Click Unsubscribe</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text)]">
            Manage Digest Subscription
          </h1>

          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed">
            We respect your inbox. You can unsubscribe anytime with zero friction. Under our NDPA 2023 data retention policy, unsubscribed addresses are deactivated immediately and fully purged after 30 days.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-8 text-center text-xs font-mono text-[var(--color-muted)] animate-pulse rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              Loading unsubscribe form...
            </div>
          }
        >
          <UnsubscribeContainer searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
