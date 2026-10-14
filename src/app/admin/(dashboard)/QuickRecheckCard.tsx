'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { JobWithPlatform } from '@/lib/db/types';
import { markJobCheckedAction, closeJobAction } from '@/lib/actions/admin';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import { CheckCircle2, XCircle, ExternalLink, ShieldAlert, ArrowRight } from 'lucide-react';

export function QuickRecheckCard({ job }: { job: JobWithPlatform }) {
  const [note, setNote] = useState('Confirmed application portal active and pay terms match.');
  const [closeReason, setCloseReason] = useState('Application closed by platform.');
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    startTransition(async () => {
      const res = await markJobCheckedAction(job.id, note);
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  const handleClose = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    startTransition(async () => {
      const res = await closeJobAction(job.id, closeReason);
      setShowCloseModal(false);
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  return (
    <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-semibold text-[var(--color-accent)]">{job.platform.name}</span>
            <span className="text-xs text-[var(--color-muted)]">•</span>
            <span className="text-xs text-[var(--color-muted)]">{job.work_type}</span>
          </div>
          <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">{job.title}</h3>
        </div>
        <StatusBadge status={job.status} size="sm" />
      </div>

      <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] mb-3 flex-wrap">
        <FreshnessStamp daysAgo={job.daysAgo ?? 0} prefix="Verified" />
        {job.pay_text && (
          <span className="font-mono text-emerald-400 font-medium">
            {job.pay_text} {job.pay_verified && '✓'}
          </span>
        )}
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
        >
          <span>Test Link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {feedback && (
        <div
          className={`mb-3 p-2.5 rounded-lg text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <ShieldAlert className="w-4 h-4 shrink-0" />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 15-second Verification Action Form */}
      <form onSubmit={handleVerify} className="space-y-2">
        <div>
          <label htmlFor={`recheck-note-${job.id}`} className="sr-only">
            Verification Check Note
          </label>
          <input
            id={`recheck-note-${job.id}`}
            type="text"
            required
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Verification note (e.g., application link verified)"
            className="w-full px-3 py-1.5 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isPending ? 'Verifying...' : 'Mark Verified (14 Days)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCloseModal(true)}
            disabled={isPending}
            className="py-1.5 px-3 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 font-medium text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>

          <Link
            href={`/admin/jobs/${job.id}`}
            className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] text-xs"
            title="Edit Full Details"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </form>

      {/* Close Reason Modal */}
      {showCloseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 shadow-2xl">
            <h4 className="text-sm font-bold text-[var(--color-text)] mb-2">Close Job Listing</h4>
            <p className="text-xs text-[var(--color-muted)] mb-3">
              Marking this role closed will remove it from the active public index.
            </p>
            <form onSubmit={handleClose} className="space-y-3">
              <input
                type="text"
                required
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                placeholder="Reason for closing (e.g. application form closed)"
                className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCloseModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs disabled:opacity-50"
                >
                  Confirm Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
