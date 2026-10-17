'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Info,
} from 'lucide-react';

interface PlatformQueueStatus {
  id: string;
  name: string;
  status: 'active' | 'slow' | 'empty';
  statusLabel: string;
  detail: string;
  activeCount: number;
  emptyCount: number;
  lastUpdated: string;
}

const INITIAL_QUEUE_DATA: PlatformQueueStatus[] = [
  {
    id: 'outlier',
    name: 'Outlier AI',
    status: 'active',
    statusLabel: 'Active queue',
    detail: 'Coding and STEM evaluation batches active. Generalist queues report occasional throttling.',
    activeCount: 38,
    emptyCount: 7,
    lastUpdated: '18 minutes ago',
  },
  {
    id: 'alignerr',
    name: 'Alignerr',
    status: 'active',
    statusLabel: 'Active queue',
    detail: 'Python and technical writing projects receiving active task allocations.',
    activeCount: 29,
    emptyCount: 4,
    lastUpdated: '34 minutes ago',
  },
  {
    id: 'dataannotation',
    name: 'DataAnnotation Tech',
    status: 'slow',
    statusLabel: 'Slow queue',
    detail: 'Selective project assignments. Coding projects active; general queues moving slowly.',
    activeCount: 16,
    emptyCount: 11,
    lastUpdated: '1 hour ago',
  },
  {
    id: 'mercor',
    name: 'Mercor',
    status: 'active',
    statusLabel: 'Active hiring',
    detail: 'Candidate sourcing active for frontier AI client roles and domain specialists.',
    activeCount: 22,
    emptyCount: 2,
    lastUpdated: '2 hours ago',
  },
  {
    id: 'invisible-tech',
    name: 'Invisible Technologies',
    status: 'active',
    statusLabel: 'Active queue',
    detail: 'Direct enterprise client workflows active for vetted operational contributors.',
    activeCount: 19,
    emptyCount: 3,
    lastUpdated: '3 hours ago',
  },
  {
    id: 'prolific',
    name: 'Prolific',
    status: 'active',
    statusLabel: 'Active studies',
    detail: 'Academic and model testing studies posting on normal hourly cycles.',
    activeCount: 44,
    emptyCount: 1,
    lastUpdated: '12 minutes ago',
  },
];

export function QueueHealthRadar() {
  const [queues, setQueues] = useState<PlatformQueueStatus[]>(INITIAL_QUEUE_DATA);
  const [userVotes, setUserVotes] = useState<Record<string, 'active' | 'empty'>>({});

  useEffect(() => {
    try {
      const savedVotes = localStorage.getItem('tracebase_queue_votes');
      if (savedVotes) {
        setUserVotes(JSON.parse(savedVotes));
      }
    } catch {
      // Ignore localStorage issues
    }
  }, []);

  const handleVote = (platformId: string, type: 'active' | 'empty') => {
    if (userVotes[platformId]) return;

    setUserVotes((prev) => {
      const next = { ...prev, [platformId]: type };
      try {
        localStorage.setItem('tracebase_queue_votes', JSON.stringify(next));
      } catch {}
      return next;
    });

    setQueues((prev) =>
      prev.map((q) => {
        if (q.id === platformId) {
          return {
            ...q,
            activeCount: type === 'active' ? q.activeCount + 1 : q.activeCount,
            emptyCount: type === 'empty' ? q.emptyCount + 1 : q.emptyCount,
            lastUpdated: 'Just now',
          };
        }
        return q;
      })
    );
  };

  return (
    <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-bold text-primary">
              Platform queue health radar
            </h2>
          </div>
          <p className="text-xs text-secondary">
            Live task availability reported by active contributors across major evaluation platforms.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-secondary">
          <Clock size={13} />
          <span>Updated continuously</span>
        </div>
      </div>

      {/* Grid of Platform Queue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {queues.map((item) => {
          const hasVoted = Boolean(userVotes[item.id]);
          const userChoice = userVotes[item.id];

          return (
            <div
              key={item.id}
              className="rounded-xl border border-rule bg-surface p-4 flex flex-col justify-between gap-3.5 hover:border-subtle transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-primary">{item.name}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                      item.status === 'active'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                        : item.status === 'slow'
                        ? 'border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-300'
                        : 'border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.status === 'active'
                          ? 'bg-emerald-600 dark:bg-emerald-400'
                          : item.status === 'slow'
                          ? 'bg-amber-600 dark:bg-amber-400'
                          : 'bg-red-500'
                      }`}
                    />
                    {item.statusLabel}
                  </span>
                </div>

                <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                  {item.detail}
                </p>
              </div>

              {/* Reporting & Feedback Row */}
              <div className="pt-2 border-t border-rule space-y-2">
                <div className="flex items-center justify-between text-[11px] text-secondary">
                  <span>Last report: {item.lastUpdated}</span>
                  <span className="tabular-nums font-mono">
                    {item.activeCount} active / {item.emptyCount} EQ
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={hasVoted}
                    onClick={() => handleVote(item.id, 'active')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      userChoice === 'active'
                        ? 'border-emerald-600 bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold'
                        : hasVoted
                        ? 'border-rule bg-sheet text-muted opacity-50 cursor-not-allowed'
                        : 'border-rule bg-sheet text-secondary hover:text-primary hover:border-emerald-500/40'
                    }`}
                  >
                    <ThumbsUp size={12} />
                    <span>Tasks flowing</span>
                  </button>

                  <button
                    type="button"
                    disabled={hasVoted}
                    onClick={() => handleVote(item.id, 'empty')}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      userChoice === 'empty'
                        ? 'border-amber-600 bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold'
                        : hasVoted
                        ? 'border-rule bg-sheet text-muted opacity-50 cursor-not-allowed'
                        : 'border-rule bg-sheet text-secondary hover:text-primary hover:border-amber-500/40'
                    }`}
                  >
                    <ThumbsDown size={12} />
                    <span>Empty queue</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory footer note */}
      <div className="flex items-center gap-2 text-xs text-secondary pt-2">
        <Info size={14} className="text-secondary shrink-0" />
        <span>
          Empty queues (EQ) are standard across project-based AI annotation. Reporting task status helps other contributors prioritize active platforms.
        </span>
      </div>
    </div>
  );
}
