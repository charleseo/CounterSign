'use client';

import React, { useState, useTransition } from 'react';
import type { PrivacyRequest } from '@/lib/db/types';
import { closePrivacyRequestAction } from '@/lib/actions/privacy';
import {
  CheckCircle2,
  Clock,
  Mail,
  Check,
  RefreshCw,
} from 'lucide-react';

export function PrivacyQueueClient({
  initialRequests,
  nowMs,
}: {
  initialRequests: PrivacyRequest[];
  nowMs: number;
}) {
  const [requests, setRequests] = useState<PrivacyRequest[]>(initialRequests);
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('open');
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [isPending, startTransition] = useTransition();
  const [banner, setBanner] = useState<string | null>(null);

  const filtered = requests.filter((r) => {
    if (filter === 'open') return !r.closed_at;
    if (filter === 'closed') return !!r.closed_at;
    return true;
  });

  const handleClose = (id: string) => {
    startTransition(async () => {
      const res = await closePrivacyRequestAction(id, resolutionNote);
      if (res.success && res.data) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? (res.data as PrivacyRequest) : r))
        );
        setResolvingId(null);
        setResolutionNote('');
        setBanner(res.message);
        setTimeout(() => setBanner(null), 4000);
      }
    });
  };

  const getDaysRemaining = (dueAt: string) => {
    const diffMs = new Date(dueAt).getTime() - nowMs;
    return Math.ceil(diffMs / 86400000);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      {banner && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{banner}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs">
          <button
            onClick={() => setFilter('open')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'open'
                ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] font-semibold shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Pending ({requests.filter((r) => !r.closed_at).length})
          </button>
          <button
            onClick={() => setFilter('closed')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'closed'
                ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] font-semibold shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Resolved ({requests.filter((r) => !!r.closed_at).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] font-semibold shadow-sm'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            All ({requests.length})
          </button>
        </div>

        <div className="text-xs font-mono text-[var(--color-muted)]">
          <span>NDPA 2023 Statutory Horizon: 30 Days</span>
        </div>
      </div>

      {/* Request Table / List */}
      {filtered.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center text-xs text-[var(--color-muted)]">
          No privacy requests match this filter.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => {
            const daysLeft = getDaysRemaining(req.due_at);
            const isOverdue = daysLeft < 0;
            const isResolved = !!req.closed_at;

            return (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--color-text)]">
                        {req.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                          req.kind === 'deletion'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : req.kind === 'access'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}
                      >
                        {req.kind.replace('_', ' ')}
                      </span>
                      {isResolved ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>Resolved</span>
                        </span>
                      ) : (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 ${
                            isOverdue
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{isOverdue ? 'Overdue' : `${daysLeft} days remaining`}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[var(--color-text)]">
                      <Mail className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                      <span className="font-medium">{req.contact_email}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {!isResolved && (
                    <div>
                      {resolvingId === req.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Resolution notes (e.g. email purged)..."
                            value={resolutionNote}
                            onChange={(e) => setResolutionNote(e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                          />
                          <button
                            onClick={() => handleClose(req.id)}
                            disabled={isPending}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center gap-1"
                          >
                            {isPending ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                            <span>Confirm</span>
                          </button>
                          <button
                            onClick={() => {
                              setResolvingId(null);
                              setResolutionNote('');
                            }}
                            className="px-2 py-1.5 rounded-lg text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setResolvingId(req.id)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-emerald-500/40 bg-[var(--color-surface-hover)] text-xs text-emerald-400 font-medium transition-colors cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {req.note && (
                  <div className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-muted)]">
                    <span className="font-semibold text-[var(--color-text)]">User Note: </span>
                    {req.note}
                  </div>
                )}

                <div className="flex items-center gap-4 text-[11px] font-mono text-[var(--color-muted)] pt-2 border-t border-[var(--color-border)]">
                  <span>Received: {new Date(req.received_at).toLocaleDateString()}</span>
                  <span>&bull;</span>
                  <span>Statutory Due: {new Date(req.due_at).toLocaleDateString()}</span>
                  {req.closed_at && (
                    <>
                      <span>&bull;</span>
                      <span className="text-emerald-400">
                        Closed: {new Date(req.closed_at).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
