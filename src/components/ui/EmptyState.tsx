"use client";

import React, { useState } from "react";
import { SearchX, Bell, Check, Loader2 } from "lucide-react";
import { subscribeNewsletterAction } from "@/app/newsletter/actions";
import { trackEvent } from "@/lib/analytics/tracker";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  filterLabel?: string;
}

/**
 * EmptyState
 * Actionable empty state with inline "Email me when one appears" alert subscription.
 * Follows AGENTS.md rules: sentence case, plain language, no all-caps, no em dashes.
 */
export function EmptyState({
  title = "No verified roles match this filter combination",
  description = "We recheck platforms every 14 days. Clear some filters or set an alert for newly verified roles.",
  actionText = "Clear all active filters",
  onAction,
  className = "",
  filterLabel,
}: EmptyStateProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await subscribeNewsletterAction({
        email: email.trim(),
        workTypes: filterLabel ? [filterLabel] : undefined,
      });
      if (res.success) {
        setStatus("success");
        try {
          trackEvent("alert_subscribe", {
            filter: filterLabel || "general",
          });
        } catch {
          // Non-blocking telemetry
        }
      } else {
        setStatus("error");
        setErrorMessage(res.message || "Failed to set alert.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <div
      className={`rounded-2xl border border-subtle bg-surface p-6 sm:p-10 text-center space-y-4 max-w-lg mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full border border-subtle bg-sheet flex items-center justify-center mx-auto text-secondary">
        <SearchX size={22} aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-ink tracking-tight">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          {description}
        </p>
      </div>

      {!showEmailForm && status !== "success" ? (
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {onAction && (
            <button
              type="button"
              onClick={onAction}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-rule bg-sheet hover:bg-elevated text-xs font-semibold text-ink transition-colors min-h-[44px]"
            >
              {actionText}
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowEmailForm(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--brand-ink)] text-white text-xs font-bold hover:opacity-90 transition-opacity min-h-[44px]"
          >
            <Bell size={13} aria-hidden="true" />
            <span>Email me when one appears</span>
          </button>
        </div>
      ) : status === "success" ? (
        <div className="pt-2 p-3 rounded-xl border border-teal-500/30 bg-teal-500/10 text-teal-200 text-xs flex items-center justify-center gap-2">
          <Check size={15} className="text-teal-400 shrink-0" />
          <span>Alert set. We will email you as soon as a verified role matches this filter.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="pt-2 space-y-2 max-w-sm mx-auto">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === "sending"}
              required
              aria-label="Email address for role alert"
              className="flex-1 px-3 py-2 text-xs rounded-lg border border-rule bg-sheet text-ink placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--brand-ink)] text-white text-xs font-bold hover:opacity-95 transition-opacity min-h-[44px] cursor-pointer shrink-0"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Email me when one appears</span>
              )}
            </button>
          </div>
          {status === "error" && (
            <p className="text-[11px] text-red-400 text-left m-0">{errorMessage}</p>
          )}
          <p className="text-[10px] text-muted text-left m-0">
            Zero spam. Unsubscribe at any time with one click.
          </p>
        </form>
      )}
    </div>
  );
}
