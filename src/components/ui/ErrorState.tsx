import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * ErrorState (Section 10.11 & 7.2)
 * Kind, specific error presentation with clear retry action.
 */
export function ErrorState({
  title = "Connection interrupted",
  message = "Could not load verification records. If you are on mobile data or a slow network, try reloading or enabling Data-Saver mode.",
  onRetry,
  className = "",
}: ErrorStateProps) {
  return (
    <div
      className={`rounded-2xl border border-accent-danger/30 bg-accent-danger/5 p-6 sm:p-8 text-center space-y-4 max-w-md mx-auto ${className}`}
      role="alert"
    >
      <div className="w-12 h-12 rounded-full border border-accent-danger/30 bg-accent-danger/10 flex items-center justify-center mx-auto text-[#FF6B6B]">
        <AlertCircle size={22} aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base font-semibold text-primary">{title}</h3>
        <p className="text-xs text-readable leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-subtle hover:border-focus text-xs font-mono text-primary btn-tactile transition-colors"
          >
            <RefreshCw size={13} aria-hidden="true" />
            <span>Retry Connection</span>
          </button>
        </div>
      )}
    </div>
  );
}
