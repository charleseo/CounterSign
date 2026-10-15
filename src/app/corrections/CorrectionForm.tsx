'use client';

import React, { useState, useTransition } from 'react';
import { submitCorrectionAction } from '@/lib/actions/privacy';
import { CheckCircle2, AlertCircle, RefreshCw, Send, Clock } from 'lucide-react';

export function CorrectionForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitCorrectionAction(formData);
      if (!res.success) {
        setError(res.message);
        if (res.errors) setFieldErrors(res.errors);
      } else {
        setSubmitted(true);
      }
    });
  };

  if (submitted) {
    return (
      <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-emerald-500/30 text-center space-y-4 animate-in fade-in">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--color-text)]">
            Correction Request Received
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-md mx-auto">
            Thank you for bringing this to our attention. Our editorial team reviews every submission against the official source provided. We respond within three working days and publish a fix or explain why not.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[var(--color-accent)] underline hover:opacity-80 cursor-pointer"
          >
            Submit another correction
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-6 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
        <Clock className="w-3.5 h-3.5 text-emerald-400" />
        <span>3-Working-Day Editorial SLA : Guaranteed Human Review</span>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Platform Name & Contact Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="platform_name" className="block text-xs font-semibold text-[var(--color-text)]">
            Platform / Company Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="platform_name"
            name="platform_name"
            required
            placeholder="e.g. Outlier AI, Alignerr, Mercor"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          />
          {fieldErrors.platform_name && (
            <p className="text-[11px] text-red-400">{fieldErrors.platform_name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="contact_email" className="block text-xs font-semibold text-[var(--color-text)]">
            Your Official Work Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            required
            placeholder="editor@company.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          />
          {fieldErrors.contact_email && (
            <p className="text-[11px] text-red-400">{fieldErrors.contact_email[0]}</p>
          )}
        </div>
      </div>

      {/* Disputed URL & Issue Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="disputed_url" className="block text-xs font-semibold text-[var(--color-text)]">
            Countersign Page URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            id="disputed_url"
            name="disputed_url"
            required
            placeholder="https://countersign.ai/jobs/sample-slug"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          />
          {fieldErrors.disputed_url && (
            <p className="text-[11px] text-red-400">{fieldErrors.disputed_url[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="issue_type" className="block text-xs font-semibold text-[var(--color-text)]">
            Category of Correction <span className="text-red-400">*</span>
          </label>
          <select
            id="issue_type"
            name="issue_type"
            required
            defaultValue="closed_role"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          >
            <option value="closed_role">Role or project is closed / no longer hiring</option>
            <option value="wrong_eligibility">Country eligibility changed or inaccurate</option>
            <option value="incorrect_pay">Pay basis or compensation figure changed</option>
            <option value="trademark_concern">Trademark, brand name or description update</option>
            <option value="other">Other factual inaccuracy</option>
          </select>
          {fieldErrors.issue_type && (
            <p className="text-[11px] text-red-400">{fieldErrors.issue_type[0]}</p>
          )}
        </div>
      </div>

      {/* Official Source URL */}
      <div className="space-y-1.5">
        <label htmlFor="source_url" className="block text-xs font-semibold text-[var(--color-text)]">
          Official Verification Source URL <span className="text-red-400">*</span>
        </label>
        <input
          type="url"
          id="source_url"
          name="source_url"
          required
          placeholder="https://company.com/careers/posting-link"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
        />
        <p className="text-[11px] text-[var(--color-muted)]">
          Link to the official company careers page, press announcement, or documentation proving the correction.
        </p>
        {fieldErrors.source_url && (
          <p className="text-[11px] text-red-400">{fieldErrors.source_url[0]}</p>
        )}
      </div>

      {/* Specific Details */}
      <div className="space-y-1.5">
        <label htmlFor="details" className="block text-xs font-semibold text-[var(--color-text)]">
          Specific Details of Correction <span className="text-red-400">*</span>
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={4}
          placeholder="Please describe exactly what needs to be changed and why, quoting the relevant official source text."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors resize-none"
        />
        {fieldErrors.details && (
          <p className="text-[11px] text-red-400">{fieldErrors.details[0]}</p>
        )}
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="corporate_pin" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-sm"
      >
        {isPending ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Submitting Correction...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Submit Correction Request</span>
          </>
        )}
      </button>
    </form>
  );
}
