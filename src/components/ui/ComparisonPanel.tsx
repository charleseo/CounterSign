"use client";

import React, { useState, useId } from "react";
import { MessageSquare, Bot, FileText, CheckSquare } from "lucide-react";

export interface ComparisonPanelProps {
  promptText: string;
  answerText: string;
  sourceText: string;
  verdictText: string;
  className?: string;
}

/**
 * ComparisonPanel (Section 10.11 & 7.9)
 * Accessible tabbed comparison panel allowing rapid switching between Prompt, Model Answer,
 * Source Ground-Truth, and Evaluator Verdict.
 * Fully navigable with keyboard arrow keys.
 */
export function ComparisonPanel({
  promptText,
  answerText,
  sourceText,
  verdictText,
  className = "",
}: ComparisonPanelProps) {
  const [activeTab, setActiveTab] = useState<"prompt" | "answer" | "source" | "verdict">("prompt");
  const tabListId = useId();

  const tabs = [
    { id: "prompt" as const, label: "Prompt", icon: MessageSquare },
    { id: "answer" as const, label: "Model Answer", icon: Bot },
    { id: "source" as const, label: "Source Context", icon: FileText },
    { id: "verdict" as const, label: "Evaluator Verdict", icon: CheckSquare },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (e.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[nextIndex].id);
    } else if (e.key === "ArrowLeft") {
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[prevIndex].id);
    }
  };

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-5 sm:p-6 space-y-4 ${className}`}
    >
      {/* Accessible Tab List */}
      <div
        role="tablist"
        aria-label="Evaluation inspection tabs"
        id={tabListId}
        onKeyDown={handleKeyDown}
        className="flex items-center gap-1.5 p-1 rounded-xl border border-subtle bg-void overflow-x-auto text-xs font-mono"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                isSelected
                  ? "bg-surface text-primary border border-subtle shadow-sm font-semibold"
                  : "text-secondary hover:text-primary hover:bg-surface/50"
              }`}
            >
              <Icon size={14} className={isSelected ? "text-accent-cyan" : "text-secondary"} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="min-h-[160px] p-4 rounded-xl border border-subtle bg-void text-xs sm:text-sm font-mono leading-relaxed">
        {activeTab === "prompt" && (
          <div
            id="panel-prompt"
            role="tabpanel"
            aria-labelledby="tab-prompt"
            className="space-y-2 animate-in fade-in duration-100"
          >
            <span className="text-[11px] text-secondary uppercase tracking-wider block">
              Evaluator Instruction & User Prompt:
            </span>
            <p className="text-primary font-sans">{promptText}</p>
          </div>
        )}

        {activeTab === "answer" && (
          <div
            id="panel-answer"
            role="tabpanel"
            aria-labelledby="tab-answer"
            className="space-y-2 animate-in fade-in duration-100"
          >
            <span className="text-[11px] text-secondary uppercase tracking-wider block">
              AI Generation Output:
            </span>
            <p className="text-readable font-sans">{answerText}</p>
          </div>
        )}

        {activeTab === "source" && (
          <div
            id="panel-source"
            role="tabpanel"
            aria-labelledby="tab-source"
            className="space-y-2 animate-in fade-in duration-100"
          >
            <span className="text-[11px] text-secondary uppercase tracking-wider block">
              Reference Document (Ground-Truth Excerpt):
            </span>
            <p className="text-readable font-sans">{sourceText}</p>
          </div>
        )}

        {activeTab === "verdict" && (
          <div
            id="panel-verdict"
            role="tabpanel"
            aria-labelledby="tab-verdict"
            className="space-y-2 animate-in fade-in duration-100"
          >
            <span className="text-[11px] text-secondary uppercase tracking-wider block">
              Human Evaluation Verdict & Annotation Rationale:
            </span>
            <p className="text-primary font-sans">{verdictText}</p>
          </div>
        )}
      </div>

      <div className="text-[11px] font-mono text-secondary flex items-center justify-between">
        <span>Use &larr; / &rarr; keys to switch tabs</span>
        <span>Audited against immutable rubric</span>
      </div>
    </div>
  );
}
