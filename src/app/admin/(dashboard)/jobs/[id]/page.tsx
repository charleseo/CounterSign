import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import { dbRepository } from '@/lib/db/repository';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import { QuickRecheckCard } from '../../QuickRecheckCard';
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  History,
} from 'lucide-react';

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const job = dbRepository.getJobById(id);

  if (!job) {
    notFound();
  }

  const checkLogs = dbRepository.getCheckLogs(job.id);
  const countries = dbRepository.getCountries();

  return (
    <div className="space-y-8 animate-in fade-in">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/jobs"
          className="p-2 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          title="Back to Jobs List"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--color-accent)]">{job.platform.name}</span>
            <span className="text-xs text-[var(--color-muted)]">•</span>
            <span className="text-xs text-[var(--color-muted)]">{job.work_type}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
            {job.title}
          </h1>
        </div>
      </div>

      {/* Main Grid: Recheck Action & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Eligibility */}
        <div className="lg:col-span-2 space-y-6">
          {/* Editorial Summary */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
            <h2 className="text-sm font-bold text-[var(--color-text)]">Editorial Summary</h2>
            <p className="text-xs text-[var(--color-text)] leading-relaxed">{job.summary}</p>
            {job.requirements && (
              <div className="pt-3 border-t border-[var(--color-border)]">
                <span className="text-xs font-semibold text-[var(--color-muted)] block mb-1">
                  Key Prerequisites
                </span>
                <p className="text-xs text-[var(--color-muted)]">{job.requirements}</p>
              </div>
            )}
          </div>

          {/* Country Eligibility Table */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Country Eligibility Matrix</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {countries.map((c) => {
                const elig = job.eligibility.find((e) => e.country_code === c.code);
                const status = elig ? elig.status : 'unconfirmed';

                return (
                  <div
                    key={c.code}
                    className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono font-bold text-[var(--color-text)] mr-1.5">{c.code}</span>
                      <span className="text-[var(--color-muted)]">{c.name}</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        status === 'accepted'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : status === 'not_accepted'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verification Audit Trail for this role */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
            <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
              <History className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Verification History (check_log)</span>
            </h2>

            <div className="space-y-3">
              {checkLogs.length === 0 ? (
                <p className="text-xs text-[var(--color-muted)]">No check logs recorded yet.</p>
              ) : (
                checkLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <StatusBadge status={log.result} size="sm" />
                      <FreshnessStamp daysAgo={log.daysAgo ?? 0} />
                    </div>
                    <p className="text-[var(--color-text)]">{log.note}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Quick Recheck & Metadata */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-bold text-[var(--color-text)]">Instant Verification Action</h2>
            <QuickRecheckCard job={job} />
          </div>

          {/* Metadata Card */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs space-y-3">
            <h3 className="font-bold text-[var(--color-text)]">Listing Metadata</h3>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted)]">Status</span>
                <StatusBadge status={job.status} size="sm" />
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted)]">Link Attribution</span>
                <span className="font-mono capitalize text-[var(--color-text)]">{job.link}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted)]">Pay Verification</span>
                <span className={job.pay_verified ? 'text-emerald-400 font-medium' : 'text-[var(--color-muted)]'}>
                  {job.pay_verified ? 'Admin Verified' : 'Unconfirmed'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]">
                <span className="text-[var(--color-muted)]">Application URL</span>
                <a
                  href={job.apply_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-accent)] hover:underline inline-flex items-center gap-1 font-mono"
                >
                  <span>Direct Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
