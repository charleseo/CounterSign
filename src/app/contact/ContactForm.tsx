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
      <div className="p-6 sm:p-8 rounded-xl bg-sheet border border-emerald-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-primary">
            Message Sent Successfully
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto">
            Thanks for writing. We read every message and reply within two working days.
          </p>
        </div>
        <div className="pt-2">
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-brand-ink underline hover:text-[#4A2AB0] cursor-pointer min-h-[44px] inline-flex items-center"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-sheet border border-rule space-y-5">
      <div className="flex items-center gap-2 text-xs text-secondary">
        <MessageSquare className="w-3.5 h-3.5 text-brand-ink" />
        <span>Direct Contact Desk : Response Within Two Working Days</span>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold text-primary">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="e.g. Ebubechukwu Okeke"
            className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-colors min-h-[44px]"
          />
          {fieldErrors.name && (
            <p className="text-[11px] text-red-500">{fieldErrors.name[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold text-primary">
            Your Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-colors min-h-[44px]"
          />
          {fieldErrors.email && (
            <p className="text-[11px] text-red-500">{fieldErrors.email[0]}</p>
          )}
        </div>
      </div>

      {/* Topic */}
      <div className="space-y-1.5">
        <label htmlFor="topic" className="block text-xs font-semibold text-primary">
          Inquiry Topic <span className="text-red-500">*</span>
        </label>
        <select
          id="topic"
          name="topic"
          required
          defaultValue="general"
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-colors min-h-[44px]"
        >
          <option value="general">General Inquiries & Community Questions</option>
          <option value="pilot">Evaluation Studio Pilots & Enterprise Audits</option>
          <option value="editorial">Editorial Sourcing & Job Verification</option>
          <option value="corrections">Listing Corrections & Platform Takedowns</option>
          <option value="privacy">Privacy, Data Protection & NDPA Inquiries</option>
        </select>
        {fieldErrors.topic && (
          <p className="text-[11px] text-red-500">{fieldErrors.topic[0]}</p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold text-primary">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="How can we help? Please be specific. For evaluation inquiries, describe your model or documentation stack."
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-colors resize-none"
        />
        {fieldErrors.message && (
          <p className="text-[11px] text-red-500">{fieldErrors.message[0]}</p>
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
        className="w-full py-3 rounded-lg bg-[#5A35C8] hover:bg-[#4A2AB0] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-h-[44px]"
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
