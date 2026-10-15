import React from 'react';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { DigestDraftViewer } from './DigestDraftViewer';
import { Mail, ShieldCheck } from 'lucide-react';
import { connection } from 'next/server';

export const metadata: Metadata = {
  title: 'Weekly Digest Generator | Countersign Admin',
  description: 'Generate and review the weekly human-verified AI work digest draft.',
};

export default async function AdminDigestPage() {
  await connection();
  const draft = dbRepository.generateWeeklyDigestDraft();
  const activeSubscribers = dbRepository.getSubscribers('active').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[var(--color-accent)]" />
            <span>Weekly Digest Draft Generator</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Compiled from live 14-day verified roles. Sent to Jo for editorial review, never auto-dispatched.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-muted)] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Manual Review Mandate</span>
          </div>
        </div>
      </div>

      <DigestDraftViewer draft={draft} subscriberCount={activeSubscribers} />
    </div>
  );
}
