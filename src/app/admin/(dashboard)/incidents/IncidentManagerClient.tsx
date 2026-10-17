'use client';

import React, { useState, useTransition } from 'react';
import type { IncidentLog, IncidentStatus } from '@/lib/db/types';
import { logIncidentAction, updateIncidentStatusAction } from '@/lib/actions/privacy';
import {
  AlertTriangle,
  CheckCircle2,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';

export function IncidentManagerClient({
  initialIncidents,
  nowMs,
}: {
  initialIncidents: IncidentLog[];
  nowMs: number;
}) {
  const [incidents, setIncidents] = useState<IncidentLog[]>(initialIncidents);
  const [showLogForm, setShowLogForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [banner, setBanner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeIncident = incidents.find((i) => i.status === 'open');

  // Compute countdown for active incident using passed nowMs
  const getRemainingTime = (reportDueAt: string, baseMs: number) => {
    const diffMs = new Date(reportDueAt).getTime() - baseMs;
    if (diffMs <= 0) return { hours: 0, minutes: 0, isPastDue: true };
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes, isPastDue: false };
  };

  const handleCreateIncident = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await logIncidentAction(formData);
      if (res.success && res.data) {
        setIncidents((prev) => [res.data as IncidentLog, ...prev]);
        setShowLogForm(false);
        setBanner(res.message);
        setTimeout(() => setBanner(null), 4000);
      } else {
        setError(res.message);
      }
    });
  };

  const handleStatusChange = (id: string, newStatus: IncidentStatus) => {
    startTransition(async () => {
      const res = await updateIncidentStatusAction(id, newStatus);
      if (res.success && res.data) {
        setIncidents((prev) =>
          prev.map((i) => (i.id === id ? (res.data as IncidentLog) : i))
        );
        setBanner(res.message);
        setTimeout(() => setBanner(null), 4000);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      {banner && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{banner}</span>
        </div>
      )}

      {/* Prominent 72-Hour Regulatory Clock Display */}
      {activeIncident ? (
        (() => {
          const { hours, minutes, isPastDue } = getRemainingTime(activeIncident.report_due_at, nowMs);
          return (
            <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <span className="font-mono text-xs font-bold text-amber-400">
                      Active 72-hour breach clock: NDPA 2023 mandatory procedure
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[var(--color-text)]">
                    Active Incident Requires Regulatory Review
                  </h2>
                  <p className="text-xs text-[var(--color-muted)] max-w-xl">
                    Under the Nigeria Data Protection Act 2023, confirmed security incidents affecting personal data must be reported to the NDPC within 72 hours of detection.
                  </p>
                </div>

                {/* Clock Readout */}
                <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-amber-500/30 text-center shrink-0 min-w-[160px]">
                  <span className="text-[10px] font-mono text-[var(--color-muted)] block uppercase">
                    Regulatory Time Remaining
                  </span>
                  <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight mt-0.5">
                    {isPastDue ? '00h 00m' : `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m`}
                  </div>
                  <span className={`text-[10px] font-mono font-bold block mt-1 ${isPastDue ? 'text-red-400' : 'text-amber-400'}`}>
                    {isPastDue ? 'OVERDUE FOR NDPC FILING' : 'Within Statutory Window'}
                  </span>
                </div>
              </div>

              {/* 4-Step Runbook Guidance */}
              <div className="pt-3 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <span className="font-mono font-bold text-amber-400 block text-[11px]">Step 1: Contain</span>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">Isolate compromised tokens, rotate edge API keys, and revoke unauthorized sessions.</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <span className="font-mono font-bold text-amber-400 block text-[11px]">Step 2: Assess Scope</span>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">Audit log files to determine whether personal data (emails) were accessed.</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <span className="font-mono font-bold text-amber-400 block text-[11px]">Step 3: Notify NDPC</span>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">File statutory breach notice with the Nigeria Data Protection Commission (reports@ndpc.gov.ng).</p>
                </div>
                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
                  <span className="font-mono font-bold text-amber-400 block text-[11px]">Step 4: Close & Audit</span>
                  <p className="text-[11px] text-[var(--color-muted)] mt-1">Document post-incident remediation report and archive audit log.</p>
                </div>
              </div>

              {/* Active Incident Controls */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleStatusChange(activeIncident.id, 'reported')}
                  disabled={isPending}
                  className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  Mark Reported to NDPC
                </button>
                <button
                  onClick={() => handleStatusChange(activeIncident.id, 'closed')}
                  disabled={isPending}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black text-xs font-semibold hover:opacity-90 disabled:opacity-50 cursor-pointer"
                >
                  Mark Resolved & Closed
                </button>
              </div>
            </div>
          );
        })()
      ) : (
        <div className="p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Open Incidents : 72-Hour SLA Status Clean</span>
            </div>
            <p className="text-xs text-[var(--color-muted)] max-w-lg">
              No active security incidents or near-misses. The 72-hour regulatory clock will automatically activate upon logging any security breach.
            </p>
          </div>
          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="px-3.5 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] font-medium hover:border-[var(--color-accent)] transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Log Security Event / Near-Miss</span>
          </button>
        </div>
      )}

      {/* Log New Incident Form */}
      {showLogForm && (
        <form
          onSubmit={handleCreateIncident}
          className="p-6 rounded-2xl bg-[var(--color-surface)] border border-amber-500/30 space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--color-text)]">
              Log New Security Incident / Near-Miss
            </h3>
            <button
              type="button"
              onClick={() => setShowLogForm(false)}
              className="text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[var(--color-text)]">
              Incident Summary & Context <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="summary"
              required
              placeholder="e.g. Unusual spike in failed token validation attempts detected on edge route"
              className="w-full px-3.5 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--color-text)]">
                Data Categories Involved (comma-separated) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="data_categories"
                required
                placeholder="e.g. Session Tokens, Email Hashes"
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[var(--color-text)]">
                Estimated People Affected
              </label>
              <input
                type="number"
                name="people_affected_estimate"
                defaultValue={0}
                min={0}
                className="w-full px-3.5 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold hover:opacity-90 disabled:opacity-50 cursor-pointer flex items-center gap-2"
          >
            {isPending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>Record Incident & Start 72-Hour Clock</span>
          </button>
        </form>
      )}

      {/* Incident History Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[var(--color-text)]">
          Incident Register & Compliance Audit Trail
        </h3>

        <div className="space-y-3">
          {incidents.map((inc) => (
            <div
              key={inc.id}
              className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-text)]">
                    {inc.id}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                      inc.status === 'open'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : inc.status === 'reported'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {inc.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {inc.status !== 'closed' && (
                    <button
                      onClick={() => handleStatusChange(inc.id, 'closed')}
                      disabled={isPending}
                      className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] hover:border-emerald-500/40 text-[11px] text-emerald-400 cursor-pointer"
                    >
                      Close Incident
                    </button>
                  )}
                  {inc.status === 'open' && (
                    <button
                      onClick={() => handleStatusChange(inc.id, 'reported')}
                      disabled={isPending}
                      className="px-2.5 py-1 rounded-lg border border-[var(--color-border)] hover:border-blue-500/40 text-[11px] text-blue-400 cursor-pointer"
                    >
                      Mark Reported
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-[var(--color-text)] leading-relaxed font-medium">
                {inc.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-[var(--color-muted)] pt-2 border-t border-[var(--color-border)]">
                <span>Categories: {inc.data_categories.join(', ') || 'None'}</span>
                <span>&bull;</span>
                <span>Affected: {inc.people_affected_estimate ?? 0}</span>
                <span>&bull;</span>
                <span>Detected: {new Date(inc.detected_at).toLocaleString()}</span>
                {inc.reported_at && (
                  <>
                    <span>&bull;</span>
                    <span className="text-blue-400">
                      Reported to NDPC: {new Date(inc.reported_at).toLocaleString()}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
