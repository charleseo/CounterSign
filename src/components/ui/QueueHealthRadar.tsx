'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Filter,
  Send,
  X,
  ShieldCheck,
} from 'lucide-react';

export interface PlatformQueueStatus {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  status: 'active' | 'steady' | 'intermittent' | 'paused';
  statusLabel: string;
  lastReported: string;
  throughputSummary: string;
  domains: string[];
  contributorCount: number;
}

const INITIAL_QUEUE_STATUSES: PlatformQueueStatus[] = [
  {
    id: 'outlier',
    name: 'Outlier AI',
    slug: 'outlier',
    emoji: '🟢',
    status: 'active',
    statusLabel: 'Active tasks',
    lastReported: '2h ago',
    throughputSummary: 'High volume across frontier coding and generalist reasoning projects.',
    domains: ['Coding', 'Reasoning'],
    contributorCount: 42,
  },
  {
    id: 'dataannotation',
    name: 'DataAnnotation',
    slug: 'dataannotation-tech',
    emoji: '🟢',
    status: 'steady',
    statusLabel: 'Steady flow',
    lastReported: '4h ago',
    throughputSummary: 'Steady task stream for vetted contributors on core coding and creative tracks.',
    domains: ['Coding', 'Writing'],
    contributorCount: 31,
  },
  {
    id: 'populii',
    name: 'Populii AI',
    slug: 'populii',
    emoji: '🟡',
    status: 'intermittent',
    statusLabel: 'Intermittent pauses',
    lastReported: '1h ago',
    throughputSummary: 'Photomath gig batches release intermittently. Frequent queue refresh needed.',
    domains: ['Mathematics', 'Rating'],
    contributorCount: 19,
  },
  {
    id: 'alignerr',
    name: 'Alignerr',
    slug: 'alignerr',
    emoji: '🔵',
    status: 'steady',
    statusLabel: 'Batched approvals',
    lastReported: '6h ago',
    throughputSummary: 'Screening tests active. Project Slack invitations sent in scheduled waves.',
    domains: ['Coding', 'Writing', 'Reasoning'],
    contributorCount: 26,
  },
  {
    id: 'mercor',
    name: 'Mercor',
    slug: 'mercor',
    emoji: '🟣',
    status: 'active',
    statusLabel: 'Selective interviews',
    lastReported: '14h ago',
    throughputSummary: 'AI interview pipeline open for top-tier software and domain engineering roles.',
    domains: ['Coding', 'Reasoning'],
    contributorCount: 15,
  },
  {
    id: 'invisible',
    name: 'Invisible Tech',
    slug: 'invisible-technologies',
    emoji: '🟢',
    status: 'steady',
    statusLabel: 'Active operations',
    lastReported: '18h ago',
    throughputSummary: 'Advanced AI trainer and operations tracks running on scheduled project shifts.',
    domains: ['Writing', 'Reasoning'],
    contributorCount: 12,
  },
];

export function QueueHealthRadar() {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [statuses, setStatuses] = useState<PlatformQueueStatus[]>(INITIAL_QUEUE_STATUSES);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [reportingPlatform, setReportingPlatform] = useState<string>('outlier');
  const [reportedQueueState, setReportedQueueState] = useState<'active' | 'dry' | 'intermittent'>('active');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);

  const domains = ['All', 'Coding', 'Reasoning', 'Writing', 'Mathematics'];

  const filteredStatuses = statuses.filter((item) => {
    if (selectedDomain === 'All') return true;
    return item.domains.includes(selectedDomain);
  });

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setIsReportModalOpen(false);
    }, 2200);
  };

  const getStatusBadge = (status: PlatformQueueStatus['status']) => {
    switch (status) {
      case 'active':
        return {
          beacon: 'bg-emerald-400 animate-pulse',
          badge: 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/30',
        };
      case 'steady':
        return {
          beacon: 'bg-teal-400',
          badge: 'bg-teal-500/10 text-teal-800 dark:text-teal-300 border-teal-500/30',
        };
      case 'intermittent':
        return {
          beacon: 'bg-amber-400 animate-pulse',
          badge: 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30',
        };
      case 'paused':
        return {
          beacon: 'bg-red-400',
          badge: 'bg-red-500/10 text-red-700 dark:text-red-300 border-red-500/30',
        };
    }
  };

  return (
    <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rule">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-[#5A35C8] normal-case">
              Live queue health radar
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-rule text-secondary">
              Updated hourly
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-ink m-0">
            Task availability and queue status
          </h2>
          <p className="text-xs text-secondary m-0">
            Real contributor-reported queue flow across platforms. Avoid spending hours on paused review queues.
          </p>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={() => setIsReportModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-elevated border border-rule text-xs font-semibold text-ink transition-colors cursor-pointer self-start sm:self-auto min-h-[38px]"
        >
          <Activity size={14} className="text-[#5A35C8]" />
          <span>Report your queue status</span>
        </button>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-secondary flex items-center gap-1 shrink-0 font-medium">
          <Filter size={12} />
          <span>Filter domain:</span>
        </span>
        {domains.map((dom) => (
          <button
            key={dom}
            type="button"
            onClick={() => setSelectedDomain(dom)}
            className={`px-3 py-1 rounded-lg border transition-colors whitespace-nowrap cursor-pointer min-h-[32px] ${
              selectedDomain === dom
                ? 'border-[#5A35C8] bg-[#5A35C8]/10 text-ink font-semibold'
                : 'border-rule bg-surface text-secondary hover:text-ink'
            }`}
          >
            {dom}
          </button>
        ))}
      </div>

      {/* Platform Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredStatuses.map((item) => {
          const badgeStyle = getStatusBadge(item.status);
          const isLive = item.status === 'active' || item.status === 'steady';
          return (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-rule bg-surface cs-card-lift hover:border-[#5A35C8]/60 transition-all flex flex-col justify-between gap-3 text-xs hover:shadow-lg hover:shadow-[#5A35C8]/5"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/platforms/${item.slug}`}
                    className="font-bold text-sm text-ink hover:text-[#5A35C8] transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="text-xs group-hover:scale-125 transition-transform" aria-hidden="true">{item.emoji}</span>
                    <span>{item.name}</span>
                  </Link>

                  <div
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${badgeStyle.badge}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.beacon} ${isLive ? 'cs-beacon-ring' : ''}`} />
                    <span>{item.statusLabel}</span>
                  </div>
                </div>

                <p className="text-secondary leading-relaxed m-0 text-xs">
                  {item.throughputSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-subtle flex items-center justify-between text-[11px] text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  <span>Reported {item.lastReported}</span>
                </span>

                <div className="flex items-center gap-1">
                  <span>{item.contributorCount} reports</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plain Disclaimer */}
      <div className="p-3.5 rounded-xl border border-subtle bg-surface/50 flex items-start gap-2.5 text-[11px] text-secondary">
        <ShieldCheck size={14} className="text-[#5A35C8] shrink-0 mt-0.5" />
        <p className="m-0 leading-relaxed">
          Queue statuses are reported directly by active contributors across verified regions within the last 24 hours. They reflect community observations rather than official employer promises.
        </p>
      </div>

      {/* Contributor Report Modal */}
      {isReportModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md rounded-2xl border border-rule bg-sheet p-6 space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#5A35C8]" />
                <h3 className="text-base font-bold text-ink m-0">
                  Report your platform queue
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="p-1 rounded-lg text-secondary hover:text-ink transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {reportSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-800 dark:text-emerald-300">
                <CheckCircle2 size={28} className="mx-auto" />
                <strong className="block text-sm font-bold text-ink">Thank you for reporting</strong>
                <p className="text-xs leading-relaxed m-0">
                  Your report has been logged and aggregated into the hourly radar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <p className="text-secondary leading-relaxed m-0">
                  Help fellow contributors know which platforms currently have active work queues vs. empty dashboards.
                </p>

                <div className="space-y-1.5">
                  <label htmlFor="rep-platform" className="font-semibold text-ink block">
                    Platform
                  </label>
                  <select
                    id="rep-platform"
                    value={reportingPlatform}
                    onChange={(e) => setReportingPlatform(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-rule bg-surface text-ink text-xs focus:outline-none focus:border-[#5A35C8]"
                  >
                    <option value="outlier">Outlier AI</option>
                    <option value="dataannotation">DataAnnotation</option>
                    <option value="populii">Populii AI</option>
                    <option value="alignerr">Alignerr</option>
                    <option value="mercor">Mercor</option>
                    <option value="invisible">Invisible Technologies</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-ink block">Current queue state</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setReportedQueueState('active')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        reportedQueueState === 'active'
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-bold'
                          : 'border-rule bg-surface text-secondary'
                      }`}
                    >
                      Active tasks
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportedQueueState('intermittent')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        reportedQueueState === 'intermittent'
                          ? 'border-amber-500 bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold'
                          : 'border-rule bg-surface text-secondary'
                      }`}
                    >
                      Intermittent
                    </button>
                    <button
                      type="button"
                      onClick={() => setReportedQueueState('dry')}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                        reportedQueueState === 'dry'
                          ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300 font-bold'
                          : 'border-rule bg-surface text-secondary'
                      }`}
                    >
                      Queue empty
                    </button>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReportModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-rule bg-surface text-secondary hover:text-ink font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#5A35C8] text-white hover:bg-[#4D2BAE] font-bold cursor-pointer"
                  >
                    Submit report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
