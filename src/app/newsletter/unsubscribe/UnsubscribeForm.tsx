'use client';

import React, { useState, useTransition } from 'react';
import { unsubscribeNewsletterAction } from '@/app/newsletter/actions';
import { Mail, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface UnsubscribeFormProps {
  initialIdentifier?: string;
}

export function UnsubscribeForm({ initialIdentifier = '' }: UnsubscribeFormProps) {
  const [identifier, setIdentifier] = useState(initialIdentifier);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) return;

    startTransition(async () => {
      const res = await unsubscribeNewsletterAction(identifier);
      setResult(res);
    });
  };

  if (result?.success) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4 animate-in fade-in">
        <div className="flex items-center gap-2.5 text-emerald-400">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <h2 className="text-base font-bold">Unsubscribed Successfully</h2>
        </div>

        <p className="text-xs sm:text-sm text-[var(--color-text)] leading-relaxed">
          {result.message}
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text)] hover:border-[var(--color-accent)] inline-flex items-center gap-1.5 transition-colors"
          >
            <span>Return to Countersign</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-[var(--color-text)] block">
            Email Address or Unsubscribe Token
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[var(--color-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="name@domain.com or optin_token"
              disabled={isPending}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-xs sm:text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
        </div>

        {result && !result.success && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{result.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !identifier.trim()}
          className="w-full py-2.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isPending ? 'Processing...' : 'Confirm Unsubscribe'}
        </button>
      </form>
    </div>
  );
}
