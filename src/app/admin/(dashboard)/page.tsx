import React from 'react';
import Link from 'next/link';
import { dbRepository } from '@/lib/db/repository';
import { QuickRecheckCard } from './QuickRecheckCard';
import { MaxLiveRolesControl } from './MaxLiveRolesControl';
import { RechecksPausedControl } from './RechecksPausedControl';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import { connection } from 'next/server';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Briefcase,
  CheckCircle2,
  History,
  ArrowRight,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  await connection();
  const stats = dbRepository.getAdminStats();
  const incidents = dbRepository.getIncidents();
  const recentChecks = dbRepository.getCheckLogs(undefined, 6);
  const recentAudits = dbRepository.getAuditLogs(6);
  const settings = dbRepository.getSettings();

  // Queue of jobs that need attention (14-day SLA window)
  const queueJobs = dbRepository.getRecheckQueue();

  // 72-hour regulatory incident window
  const activeIncident = incidents.find((i) => i.status === 'open');
  const incidentHoursLeft = dbRepository.getActiveIncidentRemainingHours();

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SLA verification engine: Active</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] m-0">
            Operations and compliance
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5 m-0">
            14-day human verification SLA, real-time recheck queue, and audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/jobs/new"
            className="px-3.5 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm min-h-[40px]"
          >
            <span>+ Add verified role</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: 14-Day Compliance Rate */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm">
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-2">
            <span>14-Day SLA</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text)]">
            {stats.complianceRate}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[var(--color-muted)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {stats.verifiedJobs} of {stats.verifiedJobs + stats.needsRecheckJobs} roles fresh
            </span>
          </div>
          {/* Visual SLA meter */}
          <div className="mt-3 w-full bg-[var(--color-surface-hover)] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, stats.complianceRate)}%` }}
            />
          </div>
        </div>

        {/* Card 2: Needs Recheck Queue & Paused Control */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-1">
            <span>Recheck Queue</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text)]">
            {queueJobs.length}
          </div>
          <div className="mt-1 text-[11px] text-[var(--color-muted)]">
            {stats.needsRecheckJobs > 0 ? (
              <span className="text-amber-400 font-medium">
                {stats.needsRecheckJobs} role{stats.needsRecheckJobs === 1 ? '' : 's'} past 14 days
              </span>
            ) : (
              <span className="text-emerald-400 font-medium">All listings compliant</span>
            )}
          </div>
          <div className="pt-2 border-t border-[var(--color-border)]">
            <RechecksPausedControl currentDate={settings.rechecks_paused_until} />
          </div>
        </div>

        {/* Card 3: 72h Incident Clock (NDPA Requirement) */}
        <Link
          href="/admin/incidents"
          className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-amber-500/40 shadow-sm transition-colors group block"
        >
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-2">
            <span className="group-hover:text-[var(--color-text)] transition-colors">Incident SLA (72h)</span>
            <AlertTriangle className={`w-4 h-4 ${activeIncident ? 'text-amber-400' : 'text-[var(--color-muted)]'}`} />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text)]">
            {activeIncident ? `${incidentHoursLeft}h` : 'Clean'}
          </div>
          <div className="mt-2 text-[11px] text-[var(--color-muted)]">
            {activeIncident ? (
              <span className="text-amber-400 font-mono">Report due in {incidentHoursLeft} hours &rarr;</span>
            ) : (
              <span className="text-emerald-400">Zero open security incidents</span>
            )}
          </div>
        </Link>

        {/* Card 4: Total Managed Roles & Capacity Cap */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-muted)] mb-1">
            <span>Capacity / Active</span>
            <Briefcase className="w-4 h-4 text-[var(--color-muted)]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text)]">
              {stats.activeJobs ?? stats.verifiedJobs + stats.needsRecheckJobs}
            </span>
            <span className="text-xs font-mono text-[var(--color-muted)]">
              / {stats.maxLiveRoles ?? 35} cap
            </span>
          </div>
          <div className="mt-2 text-[11px] text-[var(--color-muted)] pt-1">
            <MaxLiveRolesControl currentLimit={stats.maxLiveRoles ?? 35} />
          </div>
        </div>
      </div>

      {/* Capacity Warning Alert */}
      {stats.recheckCapacityWarning && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="text-sm font-bold text-rose-300 block">
              Operational Capacity Warning: Recheck Volume Exceeded
            </strong>
            <p className="text-[var(--color-muted)] leading-relaxed">
              Currently maintaining <span className="text-[var(--color-text)] font-bold">{stats.activeJobs}</span> active roles against a target cap of <span className="text-[var(--color-text)] font-bold">{stats.maxLiveRoles}</span> live roles. Exceeding capacity threatens our 14-day human verification SLA and increases stale listing risk. Consider closing deprecated roles or adjusting the operational cap.
            </p>
          </div>
        </div>
      )}

      {/* Inbound Evaluation Leads Alert */}
      {stats.newLeads !== undefined && stats.newLeads > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              {stats.newLeads}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--color-text)]">
                {stats.newLeads === 1 ? '1 Inbound Evaluation Scope' : `${stats.newLeads} Inbound Evaluation Scopes`}
              </h3>
              <p className="text-[11px] text-[var(--color-muted)]">
                Client evaluation inquiry awaiting review and initial reply.
              </p>
            </div>
          </div>
          <Link
            href="/admin/leads"
            className="px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <span>Review Inbound Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Open Privacy Requests Alert */}
      {stats.openPrivacyRequests > 0 && (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm shrink-0">
              {stats.openPrivacyRequests}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-[var(--color-text)]">
                {stats.openPrivacyRequests === 1 ? '1 Pending Privacy Rights Request' : `${stats.openPrivacyRequests} Pending Privacy Rights Requests`}
              </h3>
              <p className="text-[11px] text-[var(--color-muted)]">
                Data subject access or erasure request pending resolution within 30 days.
              </p>
            </div>
          </div>
          <Link
            href="/admin/privacy"
            className="px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 self-start sm:self-auto shrink-0"
          >
            <span>Manage Privacy Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Immediate Recheck Queue (Target <15s per check) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[var(--color-text)] m-0">
              Fast recheck queue
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Sorted by due date • {queueJobs.length} Priority
            </span>
          </div>
          <Link
            href="/admin/jobs"
            className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View all roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {queueJobs.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-[var(--color-text)]">All roles verified</h3>
            <p className="text-xs text-[var(--color-muted)] max-w-sm mx-auto mt-1">
              Every active role has been human-verified within the required 14-day SLA window.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {queueJobs.map((job) => (
              <QuickRecheckCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Live Queue Health Monitor Widget in Admin */}
      <section className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-bold text-[var(--color-text)] m-0">
              Live platform queue status monitor
            </h3>
          </div>
          <Link
            href="/platforms"
            className="text-xs text-[var(--color-accent)] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Open public radar</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {[
            { name: 'Outlier AI', status: 'Active tasks', emoji: '🟢', tone: 'text-emerald-400' },
            { name: 'DataAnnotation', status: 'Steady flow', emoji: '🟢', tone: 'text-emerald-400' },
            { name: 'Populii AI', status: 'Intermittent', emoji: '🟡', tone: 'text-amber-400' },
            { name: 'Alignerr', status: 'Wave approvals', emoji: '🔵', tone: 'text-sky-400' },
            { name: 'Mercor', status: 'Interviewing', emoji: '🟣', tone: 'text-purple-400' },
            { name: 'Invisible Tech', status: 'Active shifts', emoji: '🟢', tone: 'text-emerald-400' },
          ].map((p) => (
            <div key={p.name} className="p-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[var(--color-text)] text-[11px] truncate">{p.name}</span>
                <span className="text-[10px]">{p.emoji}</span>
              </div>
              <div className={`text-[10px] font-mono ${p.tone}`}>{p.status}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual Activity Stream: Check Logs & Audit Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Check Logs */}
        <section className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2 m-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recent verification checks</span>
            </h3>
            <span className="text-xs font-mono text-[var(--color-muted)]">check_log</span>
          </div>

          <div className="space-y-3">
            {recentChecks.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <StatusBadge status={log.result} size="sm" />
                  <FreshnessStamp daysAgo={log.daysAgo ?? 0} />
                </div>
                <p className="text-[var(--color-text)] font-medium m-0">{log.note}</p>
                <div className="text-[10px] font-mono text-[var(--color-muted)] flex items-center gap-2">
                  <span>ID: #{log.id}</span>
                  {log.checked_by && <span>Actor: {log.checked_by}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Log */}
        <section className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2 m-0">
              <History className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Administrative audit trail</span>
            </h3>
            <Link
              href="/admin/audit"
              className="text-xs text-[var(--color-accent)] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Full log</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAudits.map((audit) => (
              <div
                key={audit.id}
                className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono font-semibold text-[var(--color-accent)]">
                    {audit.action}
                  </span>
                  <FreshnessStamp daysAgo={audit.daysAgo ?? 0} />
                </div>
                <div className="text-[11px] text-[var(--color-muted)]">
                  Entity: <span className="font-mono text-[var(--color-text)]">{audit.entity}</span>
                  {audit.entity_id && (
                    <span className="font-mono ml-2 text-[var(--color-muted)]">
                      ({audit.entity_id.substring(0, 8)}...)
                    </span>
                  )}
                </div>
                {audit.diff && (
                  <pre className="p-2 rounded bg-[var(--color-bg)] text-[10px] font-mono text-[var(--color-muted)] overflow-x-auto max-h-16">
                    {JSON.stringify(audit.diff)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
