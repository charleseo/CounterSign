'use client';

import React, { useState } from 'react';
import {
  FileText,
  Bot,
  Search,
  AlertTriangle,
  FileCheck2,
} from 'lucide-react';

const NODES = [
  {
    id: 'prompt',
    label: '1. Prompt',
    sub: 'Client query',
    icon: FileText,
    color: '#5A35C8',
  },
  {
    id: 'bot_output',
    label: '2. Bot Answer',
    sub: 'RAG generation',
    icon: Bot,
    color: '#4B5363',
  },
  {
    id: 'source_check',
    label: '3. Source Check',
    sub: 'Ground-truth match',
    icon: Search,
    color: '#5A35C8',
  },
  {
    id: 'human_verdict',
    label: '4. Human Verdict',
    sub: 'Domain rubric review',
    icon: AlertTriangle,
    color: '#A8322A',
  },
  {
    id: 'report',
    label: '5. Finding Report',
    sub: 'Root cause & fix',
    icon: FileCheck2,
    color: '#17663F',
  },
];

export function EvaluationGraph() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default on human verdict

  return (
    <div className="w-full rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-rule">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5A35C8]" />
          <span className="text-xs font-semibold text-ink">
            Evaluation Pipeline
          </span>
        </div>
        <span className="text-xs text-secondary">
          Two-person check
        </span>
      </div>

      {/* SVG Pipeline Graph */}
      <div className="relative py-2">
        {/* Desktop / Tablet Horizontal Pipeline */}
        <div className="hidden sm:block">
          <div className="relative">
            {/* SVG Connecting Track */}
            <svg
              className="w-full h-12 overflow-visible"
              viewBox="0 0 500 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Static Background Path */}
              <line
                x1="20"
                y1="24"
                x2="480"
                y2="24"
                stroke="#D9DEE6"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Signal Trace */}
              <line
                x1="20"
                y1="24"
                x2="480"
                y2="24"
                stroke="#5A35C8"
                strokeWidth="2"
                className="eval-signal-line"
              />

              {/* Waypoints */}
              {[20, 135, 250, 365, 480].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy="24"
                  r="5"
                  fill="#FFFFFF"
                  stroke={i <= activeStep ? NODES[i].color : '#D9DEE6'}
                  strokeWidth="2"
                />
              ))}
            </svg>

            {/* Nodes Row */}
            <div className="grid grid-cols-5 gap-2 -mt-3 text-center">
              {NODES.map((node, idx) => {
                const Icon = node.icon;
                const isSelected = activeStep === idx;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`flex flex-col items-center p-2 rounded-xl transition-all text-left focus:outline-none ${
                      isSelected
                        ? 'bg-surface border border-rule'
                        : 'hover:bg-surface/50 border border-transparent'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-colors"
                      style={{
                        backgroundColor: isSelected ? `${node.color}15` : '#F5F6F8',
                        border: `1px solid ${isSelected ? node.color : '#D9DEE6'}`,
                        color: isSelected ? node.color : '#4B5363',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-semibold text-ink truncate max-w-full">
                      {node.label}
                    </span>
                    <span className="text-[11px] text-secondary truncate max-w-full">
                      {node.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Pipeline */}
        <div className="sm:hidden space-y-2">
          {NODES.map((node, idx) => {
            const Icon = node.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-[#5A35C8] bg-surface'
                    : 'border-rule bg-sheet hover:bg-surface'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${node.color}15`,
                    border: `1px solid ${node.color}`,
                    color: node.color,
                  }}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-ink">{node.label}</div>
                  <div className="text-[11px] text-secondary">{node.sub}</div>
                </div>
                {idx < NODES.length - 1 && (
                  <div className="text-xs text-secondary">↓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Decision Trace Card */}
      <div className="mt-4 pt-4 border-t border-rule bg-surface rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#A8322A]/10 text-[#A8322A] border border-[#A8322A]/20">
              Audit Case 001
            </span>
            <span className="text-xs text-secondary hidden sm:inline">
              PostgreSQL 16 Docs
            </span>
          </div>
          <span className="text-xs font-semibold text-[#A8322A]">
            Verdict: Contradicted
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="text-secondary">
            <span className="text-ink font-semibold">Prompt: </span>
            Does READ COMMITTED prevent phantom reads with advisory locks?
          </div>
          <div className="text-[#A8322A] bg-[#A8322A]/5 p-2 rounded border border-[#A8322A]/20">
            <span className="font-semibold">Bot Output: </span>
            &quot;Yes, pg_advisory_xact_lock() ensures transaction-level snapshot isolation...&quot;
          </div>
          <div className="text-secondary leading-relaxed">
            <span className="text-[#17663F] font-semibold">
              Ground Truth (Sec 13.2.1):{' '}
            </span>
            &quot;A SELECT query sees a snapshot as of the instant query begins... phantom reads remain possible.&quot;
          </div>
          <div className="text-xs text-secondary pt-1">
            <span className="text-ink font-semibold">Diagnosis: </span>
            MVCC statement snapshot boundaries conflated with session lock mutexes.
          </div>
        </div>
      </div>

      {/* Embedded CSS for 1-time Signal Trace */}
      <style jsx>{`
        .eval-signal-line {
          stroke-dasharray: 460;
          stroke-dashoffset: 460;
          animation: signalSweep 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes signalSweep {
          0% {
            stroke-dashoffset: 460;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        :global([data-tier='lite']) .eval-signal-line {
          animation: none !important;
          stroke-dashoffset: 0 !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .eval-signal-line {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
