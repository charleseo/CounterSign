'use client';

import React, { useState } from 'react';
import {
  FileText,
  Bot,
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Wrench,
  ShieldAlert,
} from 'lucide-react';
import { SAMPLE_AUDIT_CASES } from '@/content/evaluation/sample-audit';

export function InteractiveComparisonPanel() {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('CS-AUD-001');
  const [activeTab, setActiveTab] = useState<'prompt' | 'output' | 'source' | 'verdict'>('verdict');

  const currentCase =
    SAMPLE_AUDIT_CASES.find((c) => c.id === selectedCaseId) || SAMPLE_AUDIT_CASES[0];

  return (
    <div className="w-full rounded-2xl border border-subtle bg-surface p-5 sm:p-7 space-y-6 shadow-xl">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-subtle">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
            <span>From our sample audit</span>
            <span>•</span>
            <span>Run: 14 Oct 2026</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-primary">
            Interactive Diagnostic Comparison Panel
          </h3>
        </div>

        {/* Case Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {SAMPLE_AUDIT_CASES.slice(0, 3).map((item) => {
            const isCurrent = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCaseId(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-elevated text-accent-cyan border border-accent-cyan/50 font-bold'
                    : 'bg-void text-secondary hover:text-primary border border-subtle'
                }`}
              >
                Case #{item.caseNumber}: {item.source.documentTitle.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Header Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-void/80 border border-subtle text-xs font-mono">
        <div>
          <span className="text-secondary block text-[10px] uppercase">Evaluated Model:</span>
          <span className="text-primary font-semibold">{currentCase.model.name}</span>
          <span className="text-secondary block text-[10px] truncate">{currentCase.model.version}</span>
        </div>
        <div>
          <span className="text-secondary block text-[10px] uppercase">Target Documentation:</span>
          <a
            href={currentCase.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-cyan hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>{currentCase.source.documentTitle}</span>
            <ExternalLink size={11} />
          </a>
          <span className="text-secondary block text-[10px] truncate">{currentCase.source.section}</span>
        </div>
        <div>
          <span className="text-secondary block text-[10px] uppercase">Verdict &amp; Severity:</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                currentCase.verdict === 'supported'
                  ? 'bg-accent-emerald/20 text-accent-emerald border border-accent-emerald/40'
                  : 'bg-accent-danger/20 text-accent-danger border border-accent-danger/40'
              }`}
            >
              {currentCase.verdictLabel}
            </span>
            <span className="text-secondary text-[11px] capitalize">({currentCase.severity})</span>
          </div>
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="flex border-b border-subtle text-xs font-mono gap-1 overflow-x-auto pb-0">
        <button
          type="button"
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
            activeTab === 'prompt'
              ? 'border-accent-cyan text-accent-cyan bg-elevated/40'
              : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          <FileText size={14} />
          <span>1. Prompt Query</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('output')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
            activeTab === 'output'
              ? 'border-accent-violet text-accent-violet bg-elevated/40'
              : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          <Bot size={14} />
          <span>2. Bot Output</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('source')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
            activeTab === 'source'
              ? 'border-accent-cyan text-accent-cyan bg-elevated/40'
              : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          <Search size={14} />
          <span>3. Source Excerpt</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('verdict')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
            activeTab === 'verdict'
              ? 'border-accent-emerald text-accent-emerald bg-elevated/40'
              : 'border-transparent text-secondary hover:text-primary'
          }`}
        >
          <CheckCircle2 size={14} />
          <span>4. Evaluator Verdict</span>
        </button>
      </div>

      {/* Tab Panels Content */}
      <div className="min-h-[220px] p-4 rounded-xl bg-void border border-subtle text-xs sm:text-sm leading-relaxed">
        {activeTab === 'prompt' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-secondary">
              <span>Client Technical Inquiry</span>
              <span>Input Tokens: ~45</span>
            </div>
            <div className="p-3.5 rounded-lg bg-surface border border-subtle font-mono text-primary leading-relaxed">
              {currentCase.prompt}
            </div>
            <p className="text-secondary text-xs">
              This prompt tests whether the AI assistant correctly interprets documentation concurrency and configuration boundaries without hallucinating unwarranted developer shortcuts.
            </p>
          </div>
        )}

        {activeTab === 'output' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-secondary">
              <span>Raw Model Completion ({currentCase.model.name})</span>
              <span className="text-[#FF6B6B]">Unchecked Output</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#FF6B6B]/10 border border-[#FF6B6B]/30 font-mono text-primary leading-relaxed">
              {currentCase.modelOutput}
            </div>
            <div className="flex items-start gap-2 text-xs text-[#FF6B6B]">
              <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
              <span>
                Risk Flag: Emits confident technical assertions that directly contradict official library mechanics or invent SLA guarantees.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-secondary">
              <span>Authoritative Source Excerpt (Ground Truth)</span>
              <span>Accessed: {currentCase.source.accessDate}</span>
            </div>
            <blockquote className="p-3.5 rounded-lg bg-accent-cyan/10 border-l-2 border-accent-cyan text-readable italic leading-relaxed">
              &quot;{currentCase.source.excerpt}&quot;
            </blockquote>
            <div className="flex items-center justify-between text-xs font-mono text-secondary pt-1">
              <span className="truncate">Source: {currentCase.source.section}</span>
              <a
                href={currentCase.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline inline-flex items-center gap-1 flex-shrink-0 ml-2"
              >
                <span>Read official docs</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'verdict' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-subtle/60">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-accent-danger" />
                <span className="font-mono font-semibold text-primary">
                  Jo Okeke&apos;s Forensic Verdict: {currentCase.verdictLabel}
                </span>
              </div>
              <span className="text-[11px] font-mono text-secondary">
                Rubric {currentCase.rubricVersion}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-mono text-xs font-semibold text-secondary uppercase block mb-1">
                  Root Cause Diagnosis:
                </span>
                <p className="text-readable leading-relaxed bg-surface p-3 rounded-lg border border-subtle">
                  {currentCase.rootCause}
                </p>
              </div>

              <div>
                <span className="font-mono text-xs font-semibold text-accent-cyan uppercase block mb-1">
                  Recommended Engineering Fix:
                </span>
                <div className="flex items-start gap-2 bg-accent-cyan/10 p-3 rounded-lg border border-accent-cyan/30 text-readable">
                  <Wrench size={16} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">{currentCase.recommendedFix}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
