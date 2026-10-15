'use client';

import React, { useState, useTransition } from 'react';
import type { EvalLead, LeadStatus } from '@/lib/db/types';
import { updateEvalLeadStatusAction } from '@/lib/actions/admin';
import {
  Inbox,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building,
  Calendar,
  Layers,
  CheckCircle2,
} from 'lucide-react';

interface LeadsListTableProps {
  initialLeads: EvalLead[];
}

const STATUS_LABELS: Record<LeadStatus, { label: string; color: string; bg: string; border: string }> = {
  new: {
    label: 'New Lead',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
  },
  replied: {
    label: 'Replied',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  call_booked: {
    label: 'Call Booked',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  pilot: {
    label: 'Pilot Active',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  won: {
    label: 'Closed / Won',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  lost: {
    label: 'Closed / Lost',
    color: 'text-[var(--color-muted)]',
    bg: 'bg-[var(--color-surface-hover)]',
    border: 'border-[var(--color-border)]',
  },
};

export function LeadsListTable({ initialLeads }: LeadsListTableProps) {
  const [leads, setLeads] = useState<EvalLead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter === 'all') return true;
    return lead.status === statusFilter;
  });

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
    startTransition(async () => {
      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );

      const res = await updateEvalLeadStatusAction(leadId, newStatus);
      if (res.success) {
        setToastMessage(res.message);
        setTimeout(() => setToastMessage(null), 4000);
      } else {
        setToastMessage(`Error: ${res.message}`);
        setTimeout(() => setToastMessage(null), 4000);
      }
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] shadow-xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-surface)] p-2 rounded-xl border border-[var(--color-border)]">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] border border-[var(--color-border)]'
                : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            All ({leads.length})
          </button>
          {(['new', 'replied', 'call_booked', 'pilot', 'won', 'lost'] as LeadStatus[]).map(
            (st) => {
              const count = leads.filter((l) => l.status === st).length;
              const config = STATUS_LABELS[st];
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    statusFilter === st
                      ? `${config.bg} ${config.color} border ${config.border}`
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  }`}
                >
                  <span>{config.label}</span>
                  {count > 0 && (
                    <span className="font-mono text-[10px] font-bold opacity-80">
                      ({count})
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>

        <span className="text-xs font-mono text-[var(--color-muted)] px-2">
          {filteredLeads.length} lead{filteredLeads.length === 1 ? '' : 's'} matching
        </span>
      </div>

      {/* Leads Table */}
      {filteredLeads.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
          <Inbox className="w-10 h-10 text-[var(--color-muted)] mx-auto opacity-40" />
          <h3 className="text-sm font-semibold text-[var(--color-text)]">
            No evaluation leads found
          </h3>
          <p className="text-xs text-[var(--color-muted)] max-w-sm mx-auto">
            {statusFilter === 'all'
              ? 'When AI engineering teams submit evaluation scopes via /evaluation/scope, their proposals will appear here immediately.'
              : `There are currently no leads with status "${statusFilter}".`}
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-muted)] font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 pl-4">Ref ID</th>
                  <th className="p-3.5">Client &amp; Company</th>
                  <th className="p-3.5">Service &amp; Scope</th>
                  <th className="p-3.5">Timeline</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredLeads.map((lead) => {
                  const isExpanded = expandedId === lead.id;
                  const stConfig = STATUS_LABELS[lead.status] || STATUS_LABELS.new;

                  return (
                    <React.Fragment key={lead.id}>
                      <tr className="hover:bg-[var(--color-surface-hover)]/40 transition-colors">
                        {/* Reference ID */}
                        <td className="p-3.5 pl-4 font-mono font-bold text-[var(--color-accent)] whitespace-nowrap">
                          <button
                            onClick={() => toggleExpand(lead.id)}
                            className="flex items-center gap-1.5 hover:underline text-left cursor-pointer"
                          >
                            <span>{lead.reference_id}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[var(--color-muted)]" />
                            )}
                          </button>
                          <div className="text-[10px] font-normal text-[var(--color-muted)]">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </div>
                        </td>

                        {/* Client & Company */}
                        <td className="p-3.5">
                          <div className="font-semibold text-[var(--color-text)]">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-[var(--color-muted)] flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3 shrink-0" />
                            <a
                              href={`mailto:${lead.work_email}?subject=Countersign Scope Inquiry [${lead.reference_id}]`}
                              className="hover:text-[var(--color-accent)] hover:underline"
                            >
                              {lead.work_email}
                            </a>
                          </div>
                          {lead.company && (
                            <div className="text-[11px] text-[var(--color-muted)] flex items-center gap-1 mt-0.5">
                              <Building className="w-3 h-3 shrink-0" />
                              <span>{lead.company}</span>
                              {lead.product_url && (
                                <a
                                  href={lead.product_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[var(--color-accent)] hover:underline flex items-center gap-0.5 ml-1"
                                >
                                  <span>link</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </td>

                        {/* Service & Scope */}
                        <td className="p-3.5">
                          <div className="font-medium text-[var(--color-text)]">
                            {lead.service || 'Custom Evaluation'}
                          </div>
                          <div className="text-[11px] text-[var(--color-muted)] flex items-center gap-1 mt-0.5">
                            <Layers className="w-3 h-3 shrink-0" />
                            <span>{lead.volume || 'Volume unspecified'}</span>
                          </div>
                          <div className="text-[10px] text-[var(--color-muted)] font-mono mt-0.5">
                            Sources: {lead.source_type || 'public docs'}
                          </div>
                        </td>

                        {/* Timeline */}
                        <td className="p-3.5 whitespace-nowrap text-[var(--color-muted)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 shrink-0" />
                            <span>{lead.timeline || 'Flexible'}</span>
                          </div>
                          <div className="text-[10px] font-mono mt-0.5">
                            Rubric: {lead.has_rubric ? 'Existing' : 'Design required'}
                          </div>
                        </td>

                        {/* Status Selector */}
                        <td className="p-3.5 whitespace-nowrap">
                          <select
                            value={lead.status}
                            disabled={isPending}
                            onChange={(e) =>
                              handleStatusChange(lead.id, e.target.value as LeadStatus)
                            }
                            className={`text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer bg-[var(--color-surface)] ${stConfig.color} ${stConfig.border}`}
                          >
                            <option value="new">New Lead</option>
                            <option value="replied">Replied</option>
                            <option value="call_booked">Call Booked</option>
                            <option value="pilot">Pilot Active</option>
                            <option value="won">Closed / Won</option>
                            <option value="lost">Closed / Lost</option>
                          </select>
                        </td>

                        {/* Action buttons */}
                        <td className="p-3.5 pr-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={`mailto:${lead.work_email}?subject=Countersign Evaluation Scope [${lead.reference_id}]`}
                              className="px-2.5 py-1 rounded-lg bg-[var(--color-surface-hover)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-fg)] border border-[var(--color-border)] text-xs text-[var(--color-text)] transition-colors flex items-center gap-1.5"
                            >
                              <Mail className="w-3 h-3" />
                              <span>Email</span>
                            </a>
                            <button
                              onClick={() => toggleExpand(lead.id)}
                              className="p-1 rounded-lg text-[var(--color-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
                              title="Toggle full details"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <tr className="bg-[var(--color-surface-hover)]/30">
                          <td colSpan={6} className="p-4 sm:p-6 border-b border-[var(--color-border)]">
                            <div className="space-y-4 max-w-4xl text-xs">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                                    Knowledge Base &amp; Data Sensitivity
                                  </span>
                                  <p className="font-medium text-[var(--color-text)]">
                                    {lead.source_type || 'Unspecified'}
                                  </p>
                                  <p className="text-[11px] text-[var(--color-muted)]">
                                    Sensitivity:{' '}
                                    <span className="font-semibold text-[var(--color-text)]">
                                      {lead.sensitivity || 'Standard'}
                                    </span>
                                  </p>
                                </div>

                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                                    Rubric &amp; Scope Specs
                                  </span>
                                  <p className="font-medium text-[var(--color-text)]">
                                    {lead.has_rubric
                                      ? 'Client has internal rubric draft'
                                      : 'Countersign will design rubric'}
                                  </p>
                                  <p className="text-[11px] text-[var(--color-muted)]">
                                    Target Volume: {lead.volume || 'Custom'}
                                  </p>
                                </div>

                                <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
                                  <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                                    Submission Integrity
                                  </span>
                                  <p className="font-mono text-[11px] text-[var(--color-text)] truncate">
                                    Idempotency: {lead.idempotency_key || 'None'}
                                  </p>
                                  <p className="text-[10px] text-[var(--color-muted)]">
                                    Timestamp: {new Date(lead.created_at).toLocaleString()}
                                  </p>
                                </div>
                              </div>

                              {/* Problem statement / message */}
                              <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1.5">
                                <span className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider">
                                  One-Line Problem / Scope Objective
                                </span>
                                <p className="text-xs text-[var(--color-text)] leading-relaxed font-sans whitespace-pre-wrap">
                                  {lead.message || 'No additional message provided.'}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
