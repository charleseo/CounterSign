import React from 'react';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { LeadsListTable } from './LeadsListTable';
import { Inbox, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { connection } from 'next/server';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Evaluation Leads | TraceBase Admin',
  description: 'Manage inbound AI evaluation pilot requests and scope inquiries.',
};

export default async function AdminLeadsPage() {
  await connection();
  const leads = dbRepository.getEvalLeads().sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const newCount = leads.filter((l) => l.status === 'new').length;
  const activePilots = leads.filter((l) => l.status === 'pilot').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)] flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[var(--color-accent)]" />
            <span>Evaluation Studio Leads</span>
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] mt-0.5">
            Inbound scopes from AI engineering teams requesting documentation audits and RAG evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/evaluation/scope"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-surface)] text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1.5"
          >
            <span>Public Scope Form</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
            Total Inbound
          </span>
          <div className="text-2xl font-bold font-mono text-[var(--color-text)]">
            {leads.length}
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">All historical submissions</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
            New Inquiries
          </span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {newCount}
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">Awaiting initial reply</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
            Active Pilots
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {activePilots}
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">Currently under evaluation</p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
          <span className="text-[11px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
            Data Handling SLA
          </span>
          <div className="text-2xl font-bold font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-6 h-6" />
            <span>NDPA</span>
          </div>
          <p className="text-[10px] text-[var(--color-muted)]">Zero unencrypted file uploads</p>
        </div>
      </div>

      {/* Leads Table */}
      <LeadsListTable initialLeads={leads} />
    </div>
  );
}
