import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dbRepository, shouldShowSampleData } from '@/lib/db/repository';
import { AlertCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Launch Preview (Development Only) | TraceBase',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LaunchPreviewPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const showSample = shouldShowSampleData();
  const sampleJobs = dbRepository.getJobs({ status: 'all', includeSample: true });
  const liveJobs = dbRepository.getJobs({ status: 'all', includeSample: false });
  const livePlatforms = dbRepository.getPlatforms({ includeSample: false });
  const checkLogs = dbRepository.getCheckLogs(undefined, 20, { includeSample: false });
  const settings = dbRepository.getSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-200 text-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <AlertCircle size={16} className="text-amber-400 shrink-0" />
          <span>
            <strong>Dev-only route.</strong> This preview tool returns 404 in production builds.
          </span>
        </div>
        <span className="font-mono text-[11px] bg-amber-500/20 px-2 py-0.5 rounded">
          NODE_ENV: {process.env.NODE_ENV}
        </span>
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-ink tracking-tight">
          Launch-day state preview
        </h1>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Verify how TraceBase behaves without sample data and test empty or low-content states before launch.
        </p>
      </div>

      {/* State Switchers and Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">
              SHOW_SAMPLE_DATA flag
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                showSample ? 'bg-amber-500/15 text-amber-400' : 'bg-emerald-500/15 text-emerald-400'
              }`}
            >
              {showSample ? 'Active (Sample data visible)' : 'Hidden (Launch state)'}
            </span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            In production, seed listings marked [SAMPLE] are omitted by default unless SHOW_SAMPLE_DATA=true is set in the environment.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-secondary">
              Rechecks paused setting
            </span>
            <span
              className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                settings.rechecks_paused_until ? 'bg-amber-500/15 text-amber-400' : 'bg-slate-500/15 text-muted'
              }`}
            >
              {settings.rechecks_paused_until ? `Paused until ${settings.rechecks_paused_until}` : 'Active (Running)'}
            </span>
          </div>
          <p className="text-xs text-secondary leading-relaxed">
            When paused, a calm banner informs visitors on /jobs and role pages without alarming them.
          </p>
        </div>
      </div>

      {/* Counts Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-rule bg-surface text-center space-y-1">
          <div className="text-2xl font-bold font-mono text-ink tabular-nums">
            {liveJobs.length}
          </div>
          <div className="text-[11px] text-secondary">Live roles</div>
        </div>
        <div className="p-4 rounded-xl border border-rule bg-surface text-center space-y-1">
          <div className="text-2xl font-bold font-mono text-muted tabular-nums">
            {sampleJobs.length}
          </div>
          <div className="text-[11px] text-secondary">Sample seed roles</div>
        </div>
        <div className="p-4 rounded-xl border border-rule bg-surface text-center space-y-1">
          <div className="text-2xl font-bold font-mono text-ink tabular-nums">
            {livePlatforms.length}
          </div>
          <div className="text-[11px] text-secondary">Live platforms</div>
        </div>
        <div className="p-4 rounded-xl border border-rule bg-surface text-center space-y-1">
          <div className="text-2xl font-bold font-mono text-ink tabular-nums">
            {checkLogs.length}
          </div>
          <div className="text-[11px] text-secondary">Verified check logs</div>
        </div>
      </div>

      {/* Test Scenarios Links */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-ink">
          Test launch scenarios
        </h2>
        <div className="divide-y divide-rule border border-rule rounded-xl bg-sheet overflow-hidden text-xs sm:text-sm">
          <Link
            href="/jobs"
            className="p-4 flex items-center justify-between hover:bg-surface transition-colors"
          >
            <div>
              <div className="font-semibold text-ink">Role directory (/jobs)</div>
              <div className="text-xs text-secondary">
                {liveJobs.length === 0
                  ? 'Currently in 0 roles empty state'
                  : liveJobs.length <= 10
                  ? `Currently in low-count state (${liveJobs.length} roles)`
                  : `Normal list view (${liveJobs.length} roles)`}
              </div>
            </div>
            <ArrowRight size={15} className="text-secondary" />
          </Link>

          <Link
            href="/changes"
            className="p-4 flex items-center justify-between hover:bg-surface transition-colors"
          >
            <div>
              <div className="font-semibold text-ink">Change log (/changes)</div>
              <div className="text-xs text-secondary">
                {checkLogs.length === 0
                  ? 'Currently in empty change log state'
                  : `Showing ${checkLogs.length} check log entries`}
              </div>
            </div>
            <ArrowRight size={15} className="text-secondary" />
          </Link>

          <Link
            href="/platforms/outlier/ng"
            className="p-4 flex items-center justify-between hover:bg-surface transition-colors"
          >
            <div>
              <div className="font-semibold text-ink">Platform by country page (/platforms/outlier/ng)</div>
              <div className="text-xs text-secondary">
                Tests platform country verification status and alternative platforms
              </div>
            </div>
            <ArrowRight size={15} className="text-secondary" />
          </Link>

          <Link
            href="/admin/metrics"
            className="p-4 flex items-center justify-between hover:bg-surface transition-colors"
          >
            <div>
              <div className="font-semibold text-ink">Admin metrics dashboard (/admin/metrics)</div>
              <div className="text-xs text-secondary">
                7-day and 30-day cookieless funnel metrics and conversion rates
              </div>
            </div>
            <ArrowRight size={15} className="text-secondary" />
          </Link>
        </div>
      </div>
    </div>
  );
}
