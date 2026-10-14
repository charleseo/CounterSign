import React from "react";
import { SearchX, Bell, ArrowRight } from "lucide-react";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * EmptyState (Section 10.11 & 7.2)
 * Friendly, actionable empty state: "No verified roles match. Get an alert when one lands."
 */
export function EmptyState({
  title = "No verified roles match this filter combination",
  description = "We recheck platforms every 14 days. Clear some filters or set an alert for newly verified roles.",
  actionText = "Clear all active filters",
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-8 sm:p-12 text-center space-y-4 max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full border border-subtle bg-void flex items-center justify-center mx-auto text-secondary">
        <SearchX size={22} aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-semibold text-primary tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          {description}
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        {onAction && (
          <button
            type="button"
            onClick={onAction}
            className="px-4 py-2 rounded-lg border border-subtle bg-void hover:border-focus text-xs font-mono text-primary btn-tactile transition-colors"
          >
            {actionText}
          </button>
        )}

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-accent-cyan text-void text-xs font-mono font-semibold hover:opacity-90 btn-tactile transition-opacity"
        >
          <Bell size={13} aria-hidden="true" />
          <span>Set Alert for This Filter</span>
          <ArrowRight size={12} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
