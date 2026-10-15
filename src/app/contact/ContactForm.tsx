'use client';

import React, { useState, useTransition } from 'react';
import { submitContactAction } from '@/lib/actions/privacy';
import { CheckCircle2, AlertCircle, RefreshCw, Send, MessageSquare } from 'lucide-react';

export function ContactForm() {
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
      const res = await submitContactAction(formData);
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
            Message Sent Successfully
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-muted)] max-w-md mx-auto">
            Thanks for writing. We read every message and reply within two working days.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-[var(--color-accent)] underline hover:opacity-80 cursor-pointer"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-5 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)]">
        <MessageSquare className="w-3.5 h-3.5 text-[var(--color-accent)]" />
        <span>Direct Contact Desk : Response Within Two Working Days</span>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold text-[var(--color-text)]">
            Your Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. Ebube Okeke"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          />
          {fieldErrors.name && (
            <p className="text-[11px] text-red-400">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold text-[var(--color-text)]">
            Your Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
          />
          {fieldErrors.email && (
            <p className="text-[11px] text-red-400">{fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-1.5">
        <label htmlFor="topic" className="block text-xs font-semibold text-[var(--color-text)]">
          Inquiry Topic <span className="text-red-400">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue="general"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors"
        >
          <option value="general">General Inquiries & Community Questions</option>
          <option value="pilot">Evaluation Studio Pilots & Enterprise Audits</option>
          <option value="editorial">Editorial Sourcing & Job Verification</option>
          <option value="corrections">Listing Corrections & Platform Takedowns</option>
          <option value="privacy">Privacy, Data Protection & NDPA Inquiries</option>
        </select>
        {fieldErrors.topic && (
          <p className="text-[11px] text-red-400">{fieldErrors.topic[0]}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold text-[var(--color-text)]">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help? Please be specific. For evaluation inquiries, describe your model or documentation stack."
          className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] focus:border-[var(--color-accent)] text-xs text-[var(--color-text)] outline-none transition-colors resize-none"
        />
        {fieldErrors.message && (
          <p className="text-[11px] text-red-400">{fieldErrors.message[0]}</p>
        )}
      </div>

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="url_address" tabIndex={-1} autoComplete="off" />
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
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Send Direct Message</span>
          </>
        )}
      </button>
    </form>
  );
}
