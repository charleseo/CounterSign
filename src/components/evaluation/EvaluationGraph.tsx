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
    accent: 'cyan',
    color: '#3DEBFF',
  },
  {
    id: 'bot_output',
    label: '2. Bot Answer',
    sub: 'RAG generation',
    icon: Bot,
    accent: 'violet',
    color: '#8B7CFF',
  },
  {
    id: 'source_check',
    label: '3. Source Check',
    sub: 'Ground-truth match',
    icon: Search,
    accent: 'cyan',
    color: '#3DEBFF',
  },
  {
    id: 'human_verdict',
    label: '4. Human Verdict',
    sub: 'Domain rubric review',
    icon: AlertTriangle,
    accent: 'rose',
    color: '#FF6B6B',
  },
  {
    id: 'report',
    label: '5. Finding Report',
    sub: 'Root cause & fix',
    icon: FileCheck2,
    accent: 'emerald',
    color: '#45F5C5',
  },
];

export function EvaluationGraph() {
  const [activeStep, setActiveStep] = useState<number>(3); // Default on human verdict

  return (
    <div className="w-full rounded-3xl glass-panel p-6 sm:p-7 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(61,235,255,0.18)] border border-cyan-500/25">
      {/* Background Decorative Ambient Glow */}
      <div
        className="absolute top-0 right-0 w-72 h-72 bg-accent-cyan/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-accent-violet/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-accent-cyan radar-dot" />
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-accent-cyan flex items-center gap-1.5">
            Evaluation Nexus Pipeline
          </span>
        </div>
        <span className="text-[11px] font-mono text-secondary">
          Methodology: Section 10.2a
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
                stroke="var(--color-border-subtle)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Luminous Animated Signal Trace (Runs once via stroke-dashoffset) */}
              <line
                x1="20"
                y1="24"
                x2="480"
                y2="24"
                stroke="#3DEBFF"
                strokeWidth="2.5"
                className="eval-signal-line"
              />

              {/* Waypoints */}
              {[20, 135, 250, 365, 480].map((cx, i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy="24"
                  r="5"
                  fill="#070B16"
                  stroke={i <= activeStep ? NODES[i].color : 'var(--color-border-subtle)'}
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
                    className={`flex flex-col items-center p-2 rounded-xl transition-all text-left focus:outline-none focus:ring-1 focus:ring-accent-cyan ${
                      isSelected
                        ? 'bg-elevated border border-accent-cyan/40 scale-105'
                        : 'hover:bg-elevated/50 border border-transparent'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5 transition-colors"
                      style={{
                        backgroundColor: isSelected ? `${node.color}20` : 'var(--color-bg)',
                        border: `1px solid ${isSelected ? node.color : 'var(--color-border-subtle)'}`,
                        color: isSelected ? node.color : 'var(--color-text-secondary)',
                      }}
                    >
                      <Icon size={16} />
                    </div>
                    <span className="text-xs font-semibold text-primary truncate max-w-full">
                      {node.label}
                    </span>
                    <span className="text-[10px] text-secondary font-mono truncate max-w-full">
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
                    ? 'border-accent-cyan bg-elevated'
                    : 'border-subtle bg-surface/50 hover:bg-elevated/40'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${node.color}20`,
                    border: `1px solid ${node.color}`,
                    color: node.color,
                  }}
                >
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-primary">{node.label}</div>
                  <div className="text-[10px] font-mono text-secondary">{node.sub}</div>
                </div>
                {idx < NODES.length - 1 && (
                  <div className="text-xs font-mono text-secondary">↓</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real Decision Trace Card (From Sample Audit Case 1) */}
      <div className="mt-4 pt-4 border-t border-subtle bg-void/60 rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FF6B6B]/20 text-[#FF6B6B] border border-[#FF6B6B]/40">
              AUDIT CASE CS-AUD-001
            </span>
            <span className="text-[11px] font-mono text-secondary hidden sm:inline">
              PostgreSQL 16 Docs
            </span>
          </div>
          <span className="text-[10px] font-mono text-accent-cyan">
            Verdict: Contradicted
          </span>
        </div>

        <div className="space-y-1.5 text-xs">
          <div className="text-secondary font-mono text-[11px]">
            <span className="text-primary font-semibold">Prompt: </span>
            Does READ COMMITTED prevent phantom reads with advisory locks?
          </div>
          <div className="text-[#FF6B6B] font-mono text-[11px] bg-[#FF6B6B]/10 p-2 rounded border border-[#FF6B6B]/20">
            <span className="font-bold">Bot Output: </span>
            &quot;Yes, pg_advisory_xact_lock() ensures transaction-level snapshot isolation...&quot;
          </div>
          <div className="text-readable text-[11px] leading-relaxed">
            <span className="text-accent-emerald font-semibold font-mono">
              Ground Truth (Sec 13.2.1):{' '}
            </span>
            &quot;A SELECT query sees a snapshot as of the instant query begins... phantom reads remain possible.&quot;
          </div>
          <div className="text-[11px] text-secondary font-mono pt-1">
            <span className="text-primary font-semibold">Diagnosis: </span>
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
