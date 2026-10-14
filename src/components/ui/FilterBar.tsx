"use client";

import React, { useState } from "react";
import { Filter, X, RotateCcw, Check } from "lucide-react";

export interface FilterState {
  workTypes: string[];
  domains: string[];
  payBasis: string[];
  freshness: string;
  status: string;
  includeUnconfirmed: boolean;
}

export const DEFAULT_FILTER_STATE: FilterState = {
  workTypes: [],
  domains: [],
  payBasis: [],
  freshness: "any",
  status: "verified",
  includeUnconfirmed: false,
};

export interface FilterBarProps {
  totalCount: number;
  filteredCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
  isDesktopSidebar?: boolean;
}

/**
 * FilterBar & FilterSheet (Section 10.11 & 7.2)
 * Mobile bottom sheet with live result count on apply button.
 * Applied chips row with one-tap removal and Clear all.
 * Desktop sidebar mode (280px width).
 * Zero-count options disabled with counts.
 */
export function FilterBar({
  filteredCount,
  filters,
  onFilterChange,
  className = "",
  isDesktopSidebar = false,
}: FilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const workTypeOptions = [
    { id: "evaluation", label: "Model Evaluation", count: 8 },
    { id: "annotation", label: "RLHF & Annotation", count: 6 },
    { id: "coding", label: "Code Reasoning", count: 5 },
    { id: "writing", label: "Creative & Technical Writing", count: 4 },
    { id: "domain_expert", label: "Domain Specialist", count: 3 },
    { id: "search_rating", label: "Search & Multimodal Rating", count: 0 },
  ];

  const domainOptions = [
    { id: "general", label: "General Knowledge", count: 12 },
    { id: "coding", label: "Software & Python", count: 7 },
    { id: "stem", label: "Mathematics & Physics", count: 5 },
    { id: "medicine", label: "Medicine & Healthcare", count: 2 },
    { id: "law", label: "Legal & Compliance", count: 0 },
  ];

  const freshnessOptions = [
    { id: "7", label: "Within 7 days (Fresh)", count: 9 },
    { id: "14", label: "Within 14 days", count: 14 },
    { id: "any", label: "Any checked date", count: 17 },
  ];

  const toggleWorkType = (id: string) => {
    const exists = filters.workTypes.includes(id);
    const next = exists
      ? filters.workTypes.filter((t) => t !== id)
      : [...filters.workTypes, id];
    onFilterChange({ ...filters, workTypes: next });
  };

  const toggleDomain = (id: string) => {
    const exists = filters.domains.includes(id);
    const next = exists
      ? filters.domains.filter((d) => d !== id)
      : [...filters.domains, id];
    onFilterChange({ ...filters, domains: next });
  };

  const clearAll = () => {
    onFilterChange(DEFAULT_FILTER_STATE);
  };

  const hasActiveFilters =
    filters.workTypes.length > 0 ||
    filters.domains.length > 0 ||
    filters.freshness !== "any" ||
    filters.includeUnconfirmed;

  // Sidebar content (shared between desktop sidebar and mobile bottom sheet)
  const filterControlsContent = (
    <div className="space-y-6 text-xs">
      {/* Work Type Section */}
      <div className="space-y-2.5">
        <div className="font-mono text-secondary font-semibold uppercase tracking-wider text-[11px]">
          Work Type
        </div>
        <div className="space-y-1.5">
          {workTypeOptions.map((opt) => {
            const isChecked = filters.workTypes.includes(opt.id);
            const isDisabled = opt.count === 0 && !isChecked;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-colors ${
                  isChecked
                    ? "bg-accent-cyan/15 border-accent-cyan/40 text-primary"
                    : isDisabled
                    ? "opacity-40 cursor-not-allowed border-transparent text-secondary"
                    : "hover:bg-elevated border-transparent text-readable"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleWorkType(opt.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      isChecked
                        ? "bg-accent-cyan border-accent-cyan text-void"
                        : "border-subtle bg-void"
                    }`}
                  >
                    {isChecked && <Check size={10} className="stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="font-mono text-[11px] text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Domain Section */}
      <div className="space-y-2.5">
        <div className="font-mono text-secondary font-semibold uppercase tracking-wider text-[11px]">
          Specialist Domain
        </div>
        <div className="space-y-1.5">
          {domainOptions.map((opt) => {
            const isChecked = filters.domains.includes(opt.id);
            const isDisabled = opt.count === 0 && !isChecked;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-colors ${
                  isChecked
                    ? "bg-accent-cyan/15 border-accent-cyan/40 text-primary"
                    : isDisabled
                    ? "opacity-40 cursor-not-allowed border-transparent text-secondary"
                    : "hover:bg-elevated border-transparent text-readable"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={() => toggleDomain(opt.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                      isChecked
                        ? "bg-accent-cyan border-accent-cyan text-void"
                        : "border-subtle bg-void"
                    }`}
                  >
                    {isChecked && <Check size={10} className="stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="font-mono text-[11px] text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Freshness Section */}
      <div className="space-y-2.5">
        <div className="font-mono text-secondary font-semibold uppercase tracking-wider text-[11px]">
          Verification Freshness
        </div>
        <div className="space-y-1.5">
          {freshnessOptions.map((opt) => {
            const isSelected = filters.freshness === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-colors ${
                  isSelected
                    ? "bg-accent-cyan/15 border-accent-cyan/40 text-primary font-medium"
                    : "hover:bg-elevated border-transparent text-readable"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="freshness"
                    checked={isSelected}
                    onChange={() => onFilterChange({ ...filters, freshness: opt.id })}
                    className="sr-only"
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${
                      isSelected
                        ? "border-accent-cyan bg-accent-cyan text-void"
                        : "border-subtle bg-void"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-void" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="font-mono text-[11px] text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Unconfirmed Toggle */}
      <div className="pt-2 border-t border-subtle">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-elevated">
          <span className="text-readable">Include unconfirmed country roles</span>
          <input
            type="checkbox"
            checked={filters.includeUnconfirmed}
            onChange={(e) =>
              onFilterChange({ ...filters, includeUnconfirmed: e.target.checked })
            }
            className="w-4 h-4 rounded border-subtle bg-void accent-cyan"
          />
        </label>
      </div>
    </div>
  );

  if (isDesktopSidebar) {
    return (
      <aside
        className={`w-full max-w-[280px] p-4 rounded-xl border border-subtle bg-surface space-y-4 ${className}`}
        aria-label="Filter roles"
      >
        <div className="flex items-center justify-between pb-3 border-b border-subtle">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-accent-cyan" />
            <h2 className="text-sm font-semibold text-primary font-mono">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-[11px] font-mono text-secondary hover:text-accent-cyan flex items-center gap-1"
            >
              <RotateCcw size={11} />
              <span>Clear</span>
            </button>
          )}
        </div>

        {filterControlsContent}
      </aside>
    );
  }

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* Top Bar: Filter Sheet Trigger & Active Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-surface text-xs font-mono text-primary hover:border-focus transition-colors btn-tactile"
            aria-expanded={sheetOpen}
          >
            <Filter size={14} className="text-accent-cyan" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-accent-cyan" aria-hidden="true" />
            )}
          </button>

          {/* Active Chips Row */}
          {filters.workTypes.map((wt) => (
            <span
              key={wt}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-subtle text-xs text-readable font-mono"
            >
              <span>{wt}</span>
              <button
                type="button"
                onClick={() => toggleWorkType(wt)}
                className="hover:text-primary text-secondary"
                aria-label={`Remove ${wt} filter`}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.domains.map((dom) => (
            <span
              key={dom}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-subtle text-xs text-readable font-mono"
            >
              <span>{dom}</span>
              <button
                type="button"
                onClick={() => toggleDomain(dom)}
                className="hover:text-primary text-secondary"
                aria-label={`Remove ${dom} filter`}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-mono text-secondary hover:text-primary transition-colors underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="text-xs font-mono text-secondary">
          <span className="text-primary font-semibold">{filteredCount}</span> roles available
        </div>
      </div>

      {/* Mobile Bottom Sheet Modal */}
      {sheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter options"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm"
        >
          <div className="relative w-full max-h-[85vh] flex flex-col rounded-t-2xl border-t border-subtle bg-surface shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Sheet Header */}
            <div className="p-4 border-b border-subtle flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-accent-cyan" />
                <h3 className="text-base font-semibold text-primary">Filter Roles</h3>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="p-1 rounded text-secondary hover:text-primary"
                aria-label="Close filters sheet"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sheet Scrollable Controls */}
            <div className="p-4 overflow-y-auto flex-1">
              {filterControlsContent}
            </div>

            {/* Sheet Sticky Bottom Apply Button with Live Count */}
            <div className="p-4 border-t border-subtle bg-surface flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-2.5 rounded-lg border border-subtle text-secondary hover:text-primary font-mono text-xs"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-lg bg-accent-cyan text-void font-semibold text-xs font-mono text-center hover:opacity-90 btn-tactile transition-opacity"
              >
                Show {filteredCount} Roles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
