'use client';

import React, { useState } from 'react';
import { AuditLog } from '@/lib/db/types';
import { FreshnessStamp } from '@/components/ui/FreshnessStamp';
import { Search, ChevronDown, ChevronUp, Terminal } from 'lucide-react';

export function AuditLogViewer({ initialLogs }: { initialLogs: AuditLog[] }) {
  const [filterEntity, setFilterEntity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredLogs = initialLogs.filter((log) => {
    if (filterEntity !== 'all') {
      if (filterEntity === 'sweeper') {
        if (!log.action.startsWith('sweeper')) return false;
      } else if (log.entity !== filterEntity) {
        return false;
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchAction = log.action.toLowerCase().includes(q);
      const matchEntity = log.entity.toLowerCase().includes(q);
      const matchActor = (log.actor || '').toLowerCase().includes(q);
      const matchDiff = log.diff ? JSON.stringify(log.diff).toLowerCase().includes(q) : false;
      return matchAction || matchEntity || matchActor || matchDiff;
    }
    return true;
  });

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Entity Tabs */}
        <div className="flex items-center gap-1 bg-[var(--color-surface)] p-1 rounded-xl border border-[var(--color-border)] overflow-x-auto">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'jobs', label: 'Jobs' },
            { id: 'platforms', label: 'Platforms' },
            { id: 'sweeper', label: 'Sweeper Bot' },
            { id: 'auth', label: 'Auth & Sessions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterEntity(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                filterEntity === tab.id
                  ? 'bg-[var(--color-surface-hover)] text-[var(--color-text)] shadow-sm'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--color-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, actor, or payload..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Audit Log Entries List */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-3">
        <div className="flex items-center justify-between text-xs text-[var(--color-muted)] pb-2 border-b border-[var(--color-border)]">
          <span className="font-semibold">Audit trail (audit_log)</span>
          <span className="font-mono">{filteredLogs.length} records</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-[var(--color-muted)]">
            No audit records match the current filter.
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLogs.map((log) => {
              const isExpanded = expandedId === log.id;
              return (
                <div
                  key={log.id}
                  className="rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] overflow-hidden transition-all text-xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleExpand(log.id)}
                    className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-[var(--color-surface-active)] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Terminal className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono font-bold text-[var(--color-accent)]">
                            {log.action}
                          </span>
                          <span className="text-[var(--color-muted)] font-mono">
                            [{log.entity}]
                          </span>
                          {log.actor && (
                            <span className="text-[11px] text-[var(--color-muted)]">
                              by {log.actor}
                            </span>
                          )}
                        </div>
                        {log.entity_id && (
                          <div className="text-[11px] font-mono text-[var(--color-muted)] truncate">
                            Target ID: {log.entity_id}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <FreshnessStamp daysAgo={log.daysAgo ?? 0} />
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[var(--color-muted)]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[var(--color-muted)]" />
                      )}
                    </div>
                  </button>

                  {isExpanded && log.diff && (
                    <div className="p-3 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
                      <div className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-wider mb-1">
                        Recorded Diff / Payload
                      </div>
                      <pre className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] font-mono text-[var(--color-text)] overflow-x-auto">
                        {JSON.stringify(log.diff, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
