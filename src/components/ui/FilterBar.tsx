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

export interface FilterOption {
  id: string;
  label: string;
  count: number;
}

export interface FilterBarProps {
  totalCount: number;
  filteredCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
  isDesktopSidebar?: boolean;
  workTypeOptions?: FilterOption[];
  domainOptions?: FilterOption[];
  freshnessOptions?: FilterOption[];
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
  workTypeOptions: customWorkTypes,
  domainOptions: customDomains,
  freshnessOptions: customFreshness,
}: FilterBarProps) {
  const [sheetOpen, setSheetOpen] = useState(false);

  const defaultWorkTypeOptions = [
    { id: "evaluation", label: "Model Evaluation", count: 8 },
    { id: "annotation", label: "RLHF & Annotation", count: 6 },
    { id: "coding", label: "Code Reasoning", count: 5 },
    { id: "writing", label: "Creative & Technical Writing", count: 4 },
    { id: "domain_expert", label: "Domain Specialist", count: 3 },
    { id: "search_rating", label: "Search & Multimodal Rating", count: 0 },
  ];

  const defaultDomainOptions = [
    { id: "general", label: "General Knowledge", count: 12 },
    { id: "coding", label: "Software & Python", count: 7 },
    { id: "stem", label: "Mathematics & Physics", count: 5 },
    { id: "medicine", label: "Medicine & Healthcare", count: 2 },
    { id: "law", label: "Legal & Compliance", count: 0 },
  ];

  const defaultFreshnessOptions = [
    { id: "7", label: "Within 7 days (Fresh)", count: 9 },
    { id: "14", label: "Within 14 days", count: 14 },
    { id: "any", label: "Any checked date", count: 17 },
  ];

  const workTypeOptions = customWorkTypes || defaultWorkTypeOptions;
  const domainOptions = customDomains || defaultDomainOptions;
  const freshnessOptions = customFreshness || defaultFreshnessOptions;

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
    <div className="space-y-6 text-xs text-readable">
      {/* Work Type Section */}
      <div className="space-y-2.5">
        <div className="text-secondary font-medium text-xs">
          Work type
        </div>
        <div className="space-y-1">
          {workTypeOptions.map((opt) => {
            const isChecked = filters.workTypes.includes(opt.id);
            const isDisabled = opt.count === 0 && !isChecked;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-colors ${
                  isChecked
                    ? "bg-[#5A35C8]/10 border-[#5A35C8]/30 text-ink font-medium"
                    : isDisabled
                    ? "opacity-40 cursor-not-allowed border-transparent text-secondary"
                    : "hover:bg-surface border-transparent text-readable"
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
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "bg-[#5A35C8] border-[#5A35C8] text-white"
                        : "border-rule bg-sheet"
                    }`}
                  >
                    {isChecked && <Check size={11} className="stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="tabular-nums text-xs text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Domain Section */}
      <div className="space-y-2.5">
        <div className="text-secondary font-medium text-xs">
          Specialist domain
        </div>
        <div className="space-y-1">
          {domainOptions.map((opt) => {
            const isChecked = filters.domains.includes(opt.id);
            const isDisabled = opt.count === 0 && !isChecked;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-colors ${
                  isChecked
                    ? "bg-[#5A35C8]/10 border-[#5A35C8]/30 text-ink font-medium"
                    : isDisabled
                    ? "opacity-40 cursor-not-allowed border-transparent text-secondary"
                    : "hover:bg-surface border-transparent text-readable"
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
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      isChecked
                        ? "bg-[#5A35C8] border-[#5A35C8] text-white"
                        : "border-rule bg-sheet"
                    }`}
                  >
                    {isChecked && <Check size={11} className="stroke-[3]" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="tabular-nums text-xs text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Freshness Section */}
      <div className="space-y-2.5">
        <div className="text-secondary font-medium text-xs">
          Verification freshness
        </div>
        <div className="space-y-1">
          {freshnessOptions.map((opt) => {
            const isSelected = filters.freshness === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-colors ${
                  isSelected
                    ? "bg-[#5A35C8]/10 border-[#5A35C8]/30 text-ink font-medium"
                    : "hover:bg-surface border-transparent text-readable"
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
                    className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                      isSelected
                        ? "border-[#5A35C8] bg-[#5A35C8] text-white"
                        : "border-rule bg-sheet"
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span>{opt.label}</span>
                </div>
                <span className="tabular-nums text-xs text-secondary">({opt.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Unconfirmed Toggle */}
      <div className="pt-3 border-t border-rule">
        <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-surface transition-colors">
          <span className="text-readable">Include unconfirmed country roles</span>
          <input
            type="checkbox"
            checked={filters.includeUnconfirmed}
            onChange={(e) =>
              onFilterChange({ ...filters, includeUnconfirmed: e.target.checked })
            }
            className="w-4 h-4 rounded border-rule accent-[#5A35C8]"
          />
        </label>
      </div>
    </div>
  );

  if (isDesktopSidebar) {
    return (
      <aside
        className={`w-full max-w-[280px] p-4 rounded-xl border border-rule bg-sheet space-y-4 ${className}`}
        aria-label="Filter roles"
      >
        <div className="flex items-center justify-between pb-3 border-b border-rule">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-[#5A35C8]" />
            <h2 className="text-sm font-semibold text-ink">Filters</h2>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs text-secondary hover:text-[#5A35C8] flex items-center gap-1 transition-colors"
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
            className="inline-flex items-center justify-center gap-2 px-3 py-2 min-h-[44px] rounded-xl border border-rule bg-sheet text-xs text-ink hover:border-[#5A35C8] transition-colors"
            aria-expanded={sheetOpen}
          >
            <Filter size={14} className="text-[#5A35C8]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#5A35C8]" aria-hidden="true" />
            )}
          </button>

          {/* Active Chips Row */}
          {filters.workTypes.map((wt) => (
            <span
              key={wt}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-rule text-xs text-readable"
            >
              <span>{wt}</span>
              <button
                type="button"
                onClick={() => toggleWorkType(wt)}
                className="hover:text-ink text-secondary p-0.5"
                aria-label={`Remove ${wt} filter`}
              >
                <X size={12} />
              </button>
            </span>
          ))}

          {filters.domains.map((dom) => (
            <span
              key={dom}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface border border-rule text-xs text-readable"
            >
              <span>{dom}</span>
              <button
                type="button"
                onClick={() => toggleDomain(dom)}
                className="hover:text-ink text-secondary p-0.5"
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
              className="text-xs text-secondary hover:text-[#5A35C8] transition-colors underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="text-xs text-secondary">
          <span className="text-ink font-semibold tabular-nums">{filteredCount}</span> roles available
        </div>
      </div>

      {/* Mobile Bottom Sheet Modal */}
      {sheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter options"
          className="fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-sm"
        >
          <div className="relative w-full max-h-[85vh] flex flex-col rounded-t-2xl border-t border-rule bg-sheet shadow-2xl animate-in slide-in-from-bottom duration-200">
            {/* Sheet Header */}
            <div className="p-4 border-b border-rule flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-[#5A35C8]" />
                <h3 className="text-base font-semibold text-ink">Filter Roles</h3>
              </div>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="p-1.5 rounded-lg text-secondary hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
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
            <div className="p-4 border-t border-rule bg-sheet flex items-center gap-3">
              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-2.5 rounded-xl border border-rule text-secondary hover:text-ink text-xs min-h-[44px] transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#5A35C8] text-white font-medium text-xs text-center hover:bg-[#4927AB] transition-colors min-h-[44px]"
              >
                Show <span className="tabular-nums">{filteredCount}</span> Roles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
