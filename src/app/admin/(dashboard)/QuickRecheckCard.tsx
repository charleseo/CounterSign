'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { JobWithPlatform, EligStatus } from '@/lib/db/types';
import {
  fastRecheckJobAction,
  updateJobEligibilityAction,
} from '@/lib/actions/admin';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Globe,
  Edit3,
  Clock,
  RefreshCw,
} from 'lucide-react';

const RECHECK_COUNTRIES: Array<{ code: string; flag: string; name: string }> = [
  { code: 'US', flag: '🇺🇸', name: 'US' },
  { code: 'GB', flag: '🇬🇧', name: 'UK' },
  { code: 'CA', flag: '🇨🇦', name: 'CA' },
  { code: 'NG', flag: '🇳🇬', name: 'NG' },
  { code: 'GH', flag: '🇬🇭', name: 'GH' },
  { code: 'KE', flag: '🇰🇪', name: 'KE' },
  { code: 'ZA', flag: '🇿🇦', name: 'ZA' },
  { code: 'IN', flag: '🇮🇳', name: 'IN' },
  { code: 'PH', flag: '🇵🇭', name: 'PH' },
];

export function QuickRecheckCard({ job }: { job: JobWithPlatform }) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [expandedMode, setExpandedMode] = useState<'changed' | 'closed' | 'countries' | null>(null);
  const [checkerInitials, setCheckerInitials] = useState('CO');

  // Quick edit state for "Changed"
  const [payText, setPayText] = useState(job.pay_text || '');
  const [changeNote, setChangeNote] = useState('Confirmed active; pay or terms updated during recheck.');

  // Quick close state
  const [closeReason, setCloseReason] = useState('Application portal closed by platform.');

  // Local eligibility map
  const [eligibilityMap, setEligibilityMap] = useState<Record<string, EligStatus>>(() => {
    const map: Record<string, EligStatus> = {};
    if (job.eligibility) {
      job.eligibility.forEach((e) => {
        map[e.country_code] = e.status;
      });
    }
    return map;
  });

  const daysAgo = job.daysAgo ?? 0;
  const daysOverdue = daysAgo - 14;
  const isOverdue = daysOverdue > 0;

  // One-tap: Still Open
  const handleStillOpen = () => {
    setFeedback(null);
    startTransition(async () => {
      const res = await fastRecheckJobAction(job.id, 'still_open', { initials: checkerInitials });
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  // One-tap: Changed
  const handleSaveChanged = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    startTransition(async () => {
      const res = await fastRecheckJobAction(job.id, 'changed', {
        note: changeNote,
        pay_text: payText,
        initials: checkerInitials,
      });
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
        setExpandedMode(null);
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  // One-tap: Closed
  const handleConfirmClose = (reasonToUse?: string) => {
    const finalReason = reasonToUse || closeReason;
    setFeedback(null);
    startTransition(async () => {
      const res = await fastRecheckJobAction(job.id, 'closed', {
        reason: finalReason,
        initials: checkerInitials,
      });
      if (res.success) {
        setFeedback({ type: 'success', text: res.message });
        setExpandedMode(null);
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  // Multi-country eligibility cycle: unconfirmed -> accepted -> not_accepted -> unconfirmed
  const handleCycleCountry = (countryCode: string) => {
    const current = eligibilityMap[countryCode] || 'unconfirmed';
    let next: EligStatus = 'accepted';
    if (current === 'unconfirmed') next = 'accepted';
    else if (current === 'accepted') next = 'not_accepted';
    else if (current === 'not_accepted') next = 'unconfirmed';

    setEligibilityMap((prev) => ({ ...prev, [countryCode]: next }));

    startTransition(async () => {
      const res = await updateJobEligibilityAction(job.id, countryCode, next);
      if (res.success) {
        setFeedback({ type: 'success', text: `${countryCode} status: ${next}` });
        setTimeout(() => setFeedback(null), 3000);
      } else {
        setFeedback({ type: 'error', text: res.message });
      }
    });
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all space-y-3.5 shadow-xs">
      {/* Top Meta Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-[#5A35C8]">{job.platform.name}</span>
            <span className="text-xs text-[var(--color-muted)]">•</span>
            <span className="text-xs text-[var(--color-muted)]">{job.work_type}</span>
            <span className="text-xs text-[var(--color-muted)]">•</span>
            {isOverdue ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Overdue ({daysOverdue}d)</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Due in {14 - daysAgo}d</span>
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-[var(--color-text)] truncate">{job.title}</h3>
        </div>
        <StatusBadge status={job.status} size="sm" />
      </div>

      {/* Pay Text, Freshness & Apply Link */}
      <div className="flex items-center gap-3 text-xs text-[var(--color-muted)] flex-wrap">
        <FreshnessStamp daysAgo={daysAgo} prefix="Last checked" />
        {job.pay_text && (
          <span className="font-mono text-emerald-400 font-medium">
            {job.pay_text} {job.pay_verified && '✓'}
          </span>
        )}
        <a
          href={job.apply_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#5A35C8] hover:underline inline-flex items-center gap-1 min-h-[32px]"
        >
          <span>Test portal link</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Multi-Country Eligibility Quick Grid */}
      <div className="pt-2 border-t border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-[var(--color-muted)] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#5A35C8]" />
            <span>Country Eligibility (tap to cycle)</span>
          </span>
          <span className="text-[10px] text-[var(--color-muted)]">
            🟢 Yes • 🔴 No • ⚪ Sample
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5">
          {RECHECK_COUNTRIES.map((c) => {
            const st = eligibilityMap[c.code] || 'unconfirmed';
            const isAccepted = st === 'accepted';
            const isNotAccepted = st === 'not_accepted';

            return (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCycleCountry(c.code)}
                disabled={isPending}
                className={`py-1.5 px-2 rounded-lg border text-xs font-mono font-medium flex items-center justify-center gap-1 transition-all cursor-pointer min-h-[44px] ${
                  isAccepted
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                    : isNotAccepted
                    ? 'bg-red-500/15 border-red-500/40 text-red-400 line-through'
                    : 'bg-[var(--color-surface-hover)] border-[var(--color-border)] text-[var(--color-muted)]'
                }`}
                title={`${c.name}: ${st}. Tap to cycle.`}
              >
                <span>{c.flag}</span>
                <span>{c.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checker Initials Selector */}
      <div className="flex items-center justify-between text-xs pt-1">
        <span className="text-[11px] text-[var(--color-muted)] font-medium">Checked by:</span>
        <div className="flex items-center gap-1.5">
          {['CO', 'EO', 'JD', 'MK'].map((init) => (
            <button
              key={init}
              type="button"
              onClick={() => setCheckerInitials(init)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-colors cursor-pointer min-h-[32px] ${
                checkerInitials === init
                  ? 'bg-[#5A35C8] text-white shadow-xs'
                  : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {init}
            </button>
          ))}
          <input
            type="text"
            maxLength={3}
            placeholder="..."
            aria-label="Custom checker initials"
            value={['CO', 'EO', 'JD', 'MK'].includes(checkerInitials) ? '' : checkerInitials}
            onChange={(e) => {
              if (e.target.value) setCheckerInitials(e.target.value.toUpperCase());
            }}
            className="w-10 px-1 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[11px] font-mono font-bold text-center uppercase outline-none focus:border-[#5A35C8]"
          />
        </div>
      </div>

      {/* Phone-Friendly Fast One-Tap Action Buttons (min-h-[44px]) */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {/* Button 1: Still open */}
        <button
          type="button"
          onClick={handleStillOpen}
          disabled={isPending}
          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer min-h-[44px] shadow-xs"
        >
          {isPending ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5" />
          )}
          <span>Still open</span>
        </button>

        {/* Button 2: Changed */}
        <button
          type="button"
          onClick={() => setExpandedMode(expandedMode === 'changed' ? null : 'changed')}
          disabled={isPending}
          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
            expandedMode === 'changed'
              ? 'bg-amber-500 text-black border-amber-500'
              : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10'
          }`}
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Changed</span>
        </button>

        {/* Button 3: Closed */}
        <button
          type="button"
          onClick={() => setExpandedMode(expandedMode === 'closed' ? null : 'closed')}
          disabled={isPending}
          className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px] ${
            expandedMode === 'closed'
              ? 'bg-rose-600 text-white border-rose-600'
              : 'border-rose-500/40 text-rose-400 hover:bg-rose-500/10'
          }`}
        >
          <XCircle className="w-3.5 h-3.5" />
          <span>Closed</span>
        </button>
      </div>

      {/* Inline Drawer: Changed */}
      {expandedMode === 'changed' && (
        <form onSubmit={handleSaveChanged} className="p-3.5 rounded-xl bg-[var(--color-surface-hover)] border border-amber-500/30 space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[var(--color-text)]">
              Updated Pay Terms (employer currency, e.g. $25/hr)
            </label>
            <input
              type="text"
              value={payText}
              onChange={(e) => setPayText(e.target.value)}
              placeholder="e.g. $25 - $35 / hr (USD)"
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-[var(--color-text)]">
              Recheck Verification Note
            </label>
            <input
              type="text"
              required
              value={changeNote}
              onChange={(e) => setChangeNote(e.target.value)}
              placeholder="What changed? (e.g. pay updated, new test added)"
              className="w-full px-3 py-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-amber-500 min-h-[44px]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setExpandedMode(null)}
              className="px-3 py-2 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-muted)] min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs min-h-[44px]"
            >
              Save Changes (14 Days)
            </button>
          </div>
        </form>
      )}

      {/* Inline Drawer: Closed */}
      {expandedMode === 'closed' && (
        <div className="p-3.5 rounded-xl bg-[var(--color-surface-hover)] border border-rose-500/30 space-y-3">
          <div className="text-[11px] font-semibold text-rose-400">
            One-tap quick close reason:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleConfirmClose('Application portal closed by platform')}
              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium text-left min-h-[44px]"
            >
              Portal Closed
            </button>
            <button
              type="button"
              onClick={() => handleConfirmClose('Listing removed / 404 broken link')}
              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium text-left min-h-[44px]"
            >
              404 Broken Link
            </button>
            <button
              type="button"
              onClick={() => handleConfirmClose('Country no longer accepted')}
              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-medium text-left min-h-[44px]"
            >
              Geo Restricted
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={closeReason}
              onChange={(e) => setCloseReason(e.target.value)}
              placeholder="Or enter custom reason..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none min-h-[44px]"
            />
            <button
              type="button"
              onClick={() => handleConfirmClose(closeReason)}
              disabled={isPending}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs min-h-[44px]"
            >
              Confirm Close
            </button>
          </div>

          <div className="pt-2 border-t border-[var(--color-border)] flex items-center justify-between">
            <Link
              href={`/admin/jobs/${job.id}`}
              className="text-xs text-[#5A35C8] hover:underline flex items-center gap-1 min-h-[44px]"
            >
              <span>Full job editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setExpandedMode(null)}
              className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-muted)] min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
