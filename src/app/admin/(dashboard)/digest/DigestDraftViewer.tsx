'use client';

import React, { useState, useTransition } from 'react';
import type { DigestDraft } from '@/lib/db/types';
import { sendDigestReviewAction } from '@/lib/actions/admin';
import {
  Copy,
  CheckCircle2,
  Send,
  Eye,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';
import { getSiteHost } from '@/lib/utils/siteUrl';

interface DigestDraftViewerProps {
  draft: DigestDraft;
  subscriberCount: number;
}

export function DigestDraftViewer({ draft, subscriberCount }: DigestDraftViewerProps) {
  const [viewMode, setViewMode] = useState<'html' | 'markdown'>('html');
  const [copiedType, setCopiedType] = useState<'html' | 'markdown' | null>(null);
  const [isPending, startTransition] = useTransition();
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  const handleCopy = (text: string, type: 'html' | 'markdown') => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleSendReview = () => {
    startTransition(async () => {
      const res = await sendDigestReviewAction();
      setSendStatus(res.message);
      setTimeout(() => setSendStatus(null), 5000);
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {sendStatus && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{sendStatus}</span>
        </div>
      )}

      {/* Meta Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Draft (Issue #{draft.issueNumber})
            </span>
            <span className="text-xs text-[var(--color-muted)]">
              Week of {draft.weekStarting}
            </span>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-[var(--color-text)]">
            {draft.subject}
          </h2>
          <p className="text-xs text-[var(--color-muted)]">
            Active verified recipients: <span className="font-mono font-semibold text-[var(--color-text)]">{subscriberCount} subscribers</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[var(--color-surface-hover)] p-1 rounded-xl border border-[var(--color-border)] text-xs">
            <button
              onClick={() => setViewMode('html')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'html'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>HTML Preview</span>
            </button>
            <button
              onClick={() => setViewMode('markdown')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'markdown'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={() =>
              handleCopy(
                viewMode === 'html' ? draft.htmlContent : draft.markdownContent,
                viewMode
              )
            }
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-surface)] text-xs font-mono text-[var(--color-text)] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedType === viewMode ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Copy {viewMode.toUpperCase()}</span>
              </>
            )}
          </button>

          {/* Send to Jo */}
          <button
            onClick={handleSendReview}
            disabled={isPending}
            className="px-3.5 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isPending ? 'Sending...' : 'Send Review to Jo'}</span>
          </button>
        </div>
      </div>

      {/* Draft Content Display */}
      {viewMode === 'html' ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden shadow-sm">
          {/* Simulated Email Client Header */}
          <div className="p-3 bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-muted)] font-mono">
            <span>From: TraceBase Digest &lt;digest@{getSiteHost()}&gt;</span>
            <span>Subject: {draft.subject}</span>
          </div>

          <div className="p-6 sm:p-8 max-w-2xl mx-auto space-y-8 bg-white text-zinc-900 rounded-b-2xl">
            {/* Digest Header */}
            <div className="space-y-1 border-b border-zinc-200 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 font-bold">
                  TraceBase Weekly Digest
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  Issue #{draft.issueNumber}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                {draft.subject}
              </h1>
              <p className="text-xs text-zinc-500">
                Week of {draft.weekStarting} • Delivered to verified talent
              </p>
            </div>

            {/* Section 1: Fresh Roles */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-zinc-950 border-b border-zinc-200 pb-1.5">
                1. Human-Verified Roles Fresh This Week
              </h2>

              <div className="space-y-4">
                {draft.rolesByCountry.map((group) => (
                  <div key={group.country} className="space-y-2">
                    <h3 className="text-xs font-bold font-mono text-zinc-700 uppercase tracking-wider">
                      [{group.flag}] {group.country}
                    </h3>

                    <div className="space-y-2">
                      {group.roles.map((role) => (
                        <div
                          key={role.slug}
                          className="p-3 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <Link
                              href={`/jobs/${role.slug}`}
                              className="font-semibold text-cyan-700 hover:underline"
                            >
                              {role.title}
                            </Link>
                            <div className="text-[11px] text-zinc-500">
                              Platform: {role.platform}
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-emerald-700 whitespace-nowrap">
                            {role.payText}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 2: Guide of the Week */}
            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <h2 className="text-base font-bold text-zinc-950">
                2. Practical Guide of the Week
              </h2>
              <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1.5">
                <Link
                  href={`/guides/${draft.featuredGuide.slug}`}
                  className="font-bold text-xs text-cyan-700 hover:underline block"
                >
                  {draft.featuredGuide.title}
                </Link>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {draft.featuredGuide.summary}
                </p>
              </div>
            </div>

            {/* Section 3: Scam Radar */}
            <div className="space-y-2 border-t border-zinc-200 pt-4">
              <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5 text-amber-700">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>3. Scam Radar Warning</span>
              </h2>
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {draft.scamRadarNote}
              </div>
            </div>

            {/* Digest Footer */}
            <div className="border-t border-zinc-200 pt-6 text-center space-y-2 text-[11px] text-zinc-500">
              <p>
                TraceBase • Independent Human-Verified AI Work Hub &amp; Evaluation Studio
              </p>
              <p>
                You received this digest because you confirmed your double opt-in subscription on {getSiteHost()}.
              </p>
              <p>
                <Link
                  href="/newsletter/unsubscribe"
                  className="text-zinc-600 underline hover:text-zinc-900"
                >
                  Unsubscribe anytime
                </Link>{' '}
                in one click. Protected under NDPA 2023.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] font-mono pb-2 border-b border-[var(--color-border)]">
            <span>Markdown Content (Ready for Newsletter Dispatcher)</span>
            <span>{draft.markdownContent.length} chars</span>
          </div>
          <pre className="p-4 rounded-xl bg-[var(--color-bg)] font-mono text-xs text-[var(--color-text)] whitespace-pre-wrap overflow-x-auto leading-relaxed border border-[var(--color-border)]">
            {draft.markdownContent}
          </pre>
        </div>
      )}
    </div>
  );
}
