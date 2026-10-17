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
    <div className="w-full rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-6">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-rule">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-medium bg-[#8A5300]/10 text-[#8A5300] border border-[#8A5300]/20">
            <span>Illustrative, not real runs</span>
            <span>•</span>
            <span>Sample benchmark rubric</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-ink">
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
                className={`px-3 py-1.5 rounded-lg text-xs transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#5A35C8] text-white font-medium'
                    : 'bg-surface text-secondary hover:text-ink border border-rule'
                }`}
              >
                Case #{item.caseNumber}: {item.source.documentTitle.split(' ')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Case Header Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface border border-rule text-xs">
        <div>
          <span className="text-secondary block text-[11px]">Evaluated Model:</span>
          <span className="text-ink font-semibold">{currentCase.model.name}</span>
          <span className="text-secondary block text-[11px] truncate">{currentCase.model.version}</span>
        </div>
        <div>
          <span className="text-secondary block text-[11px]">Target Documentation:</span>
          <a
            href={currentCase.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5A35C8] hover:underline inline-flex items-center gap-1 font-semibold"
          >
            <span>{currentCase.source.documentTitle}</span>
            <ExternalLink size={11} />
          </a>
          <span className="text-secondary block text-[11px] truncate">{currentCase.source.section}</span>
        </div>
        <div>
          <span className="text-secondary block text-[11px]">Verdict &amp; Severity:</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                currentCase.verdict === 'supported'
                  ? 'bg-[#17663F]/10 text-[#17663F] border border-[#17663F]/30'
                  : 'bg-[#A8322A]/10 text-[#A8322A] border border-[#A8322A]/30'
              }`}
            >
              {currentCase.verdictLabel}
            </span>
            <span className="text-secondary text-xs capitalize">({currentCase.severity})</span>
          </div>
        </div>
      </div>

      {/* Step Tabs Navigation */}
      <div className="flex border-b border-rule text-xs gap-1 overflow-x-auto pb-0">
        <button
          type="button"
          onClick={() => setActiveTab('prompt')}
          className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-all ${
            activeTab === 'prompt'
              ? 'border-[#5A35C8] text-[#5A35C8] bg-surface'
              : 'border-transparent text-secondary hover:text-ink'
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
              ? 'border-[#5A35C8] text-[#5A35C8] bg-surface'
              : 'border-transparent text-secondary hover:text-ink'
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
              ? 'border-[#5A35C8] text-[#5A35C8] bg-surface'
              : 'border-transparent text-secondary hover:text-ink'
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
              ? 'border-[#17663F] text-[#17663F] bg-surface'
              : 'border-transparent text-secondary hover:text-ink'
          }`}
        >
          <CheckCircle2 size={14} />
          <span>4. Evaluator Verdict</span>
        </button>
      </div>

      {/* Tab Panels Content */}
      <div className="min-h-[220px] p-4 rounded-xl bg-surface border border-rule text-xs sm:text-sm leading-relaxed text-ink">
        {activeTab === 'prompt' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-secondary">
              <span>Client Technical Inquiry</span>
              <span>Input Tokens: ~45</span>
            </div>
            <div className="p-3.5 rounded-lg bg-sheet border border-rule text-ink leading-relaxed">
              {currentCase.prompt}
            </div>
            <p className="text-secondary text-xs">
              This prompt tests whether the AI assistant correctly interprets documentation concurrency and configuration boundaries without hallucinating unwarranted developer shortcuts.
            </p>
          </div>
        )}

        {activeTab === 'output' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-secondary">
              <span>Raw Model Completion ({currentCase.model.name})</span>
              <span className="text-[#A8322A]">Unchecked Output</span>
            </div>
            <div className="p-3.5 rounded-lg bg-[#A8322A]/5 border border-[#A8322A]/20 text-ink leading-relaxed">
              {currentCase.modelOutput}
            </div>
            <div className="flex items-start gap-2 text-xs text-[#A8322A]">
              <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
              <span>
                Risk Flag: Emits confident technical assertions that directly contradict official library mechanics or invent SLA guarantees.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'source' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-secondary">
              <span>Authoritative Source Excerpt (Ground Truth)</span>
              <span>Accessed: {currentCase.source.accessDate}</span>
            </div>
            <blockquote className="p-3.5 rounded-lg bg-sheet border-l-2 border-[#5A35C8] text-ink italic leading-relaxed">
              &quot;{currentCase.source.excerpt}&quot;
            </blockquote>
            <div className="flex items-center justify-between text-xs text-secondary pt-1">
              <span className="truncate">Source: {currentCase.source.section}</span>
              <a
                href={currentCase.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5A35C8] hover:underline inline-flex items-center gap-1 flex-shrink-0 ml-2 font-medium"
              >
                <span>Read official docs</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'verdict' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-[#A8322A]" />
                <span className="font-semibold text-ink">
                  Jo Okeke&apos;s Evaluation Verdict: {currentCase.verdictLabel}
                </span>
              </div>
              <span className="text-xs text-secondary">
                Rubric {currentCase.rubricVersion}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-secondary block mb-1">
                  Root Cause Diagnosis:
                </span>
                <p className="text-ink leading-relaxed bg-sheet p-3 rounded-lg border border-rule">
                  {currentCase.rootCause}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-[#5A35C8] block mb-1">
                  Recommended Engineering Fix:
                </span>
                <div className="flex items-start gap-2 bg-sheet p-3 rounded-lg border border-rule text-ink">
                  <Wrench size={16} className="text-[#5A35C8] flex-shrink-0 mt-0.5" />
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
