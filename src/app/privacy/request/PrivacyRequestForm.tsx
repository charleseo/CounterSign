'use client';

import React, { useState, useTransition } from 'react';
import { submitPrivacyRequestAction } from '@/lib/actions/privacy';
import { CheckCircle2, AlertCircle, Clock, Lock, Send, RefreshCw } from 'lucide-react';

export function PrivacyRequestForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [receipt, setReceipt] = useState<{
    id: string;
    due_at: string;
    kind: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitPrivacyRequestAction(formData);
      if (!res.success) {
        setError(res.message);
        if (res.errors) setFieldErrors(res.errors);
      } else if (res.data) {
        setReceipt(res.data);
      }
    });
  };

  if (receipt) {
    const formattedDue = new Date(receipt.due_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-emerald-500/30 text-center space-y-6 animate-in fade-in zoom-in-95 shadow-2xl">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(0,229,153,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(0,229,153,0.2)]">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">
            Privacy Rights Request Received
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
            Your request has been logged in our immutable compliance register. In accordance with the Nigeria Data Protection Act (NDPA) 2023, our response is due within 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs">
          <div className="p-3.5 rounded-xl glass-card border border-white/[0.08]">
            <span className="text-secondary block text-[11px]">Request Reference</span>
            <span className="font-mono font-bold text-primary text-sm">{receipt.id}</span>
          </div>
          <div className="p-3.5 rounded-xl glass-card border border-white/[0.08]">
            <span className="text-secondary block text-[11px]">Statutory Deadline</span>
            <span className="font-mono font-bold text-amber-400 text-sm">{formattedDue}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl glass-card border border-white/[0.08] text-xs text-secondary max-w-md mx-auto text-left space-y-1.5">
          <div className="font-semibold text-primary flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent-cyan" />
            <span>What happens next:</span>
          </div>
          <p>
            1. An email confirmation has been dispatched to your address.
          </p>
          <p>
            2. Our Data Protection Lead (Jo) will verify your email ownership.
          </p>
          <p>
            3. Your requested action (access, correction, or permanent deletion) will be executed, with a formal resolution receipt provided.
          </p>
        </div>

        <button
          onClick={() => setReceipt(null)}
          className="text-xs text-accent-cyan underline hover:text-cyan-300 cursor-pointer"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-6 shadow-2xl">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(61,235,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Banner */}
      <div className="flex items-center gap-2 text-xs font-mono text-secondary">
        <Lock className="w-3.5 h-3.5 text-accent-cyan" />
        <span>NDPA 2023 Statutory Rights Portal : 30-Day Response SLA</span>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl glass-panel border border-red-500/30 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Request Type Selector */}
      <div className="space-y-1.5">
        <label htmlFor="kind" className="block text-xs font-semibold text-primary">
          Nature of Request <span className="text-red-400">*</span>
        </label>
        <select
          id="kind"
          name="kind"
          required
          defaultValue="deletion"
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-xs text-primary outline-none transition-all"
        >
          <option value="deletion" className="bg-void text-primary">Right to Erasure : Permanently delete my email and data</option>
          <option value="access" className="bg-void text-primary">Right of Access (SAR) : Request copy of my recorded data</option>
          <option value="withdraw_consent" className="bg-void text-primary">Withdraw Consent : Revoke newsletter / alert consent</option>
          <option value="correction" className="bg-void text-primary">Right to Rectification : Correct my recorded preferences</option>
          <option value="objection" className="bg-void text-primary">Right to Object : Object to specific processing</option>
        </select>
        {fieldErrors.kind && (
          <p className="text-[11px] text-red-400">{fieldErrors.kind[0]}</p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label htmlFor="contact_email" className="block text-xs font-semibold text-primary">
          Your Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          required
          placeholder="contributor@example.com"
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-xs text-primary placeholder:text-secondary/50 outline-none transition-all"
        />
        <p className="text-[11px] text-secondary">
          Must match the email address associated with your newsletter subscription or evaluation lead.
        </p>
        {fieldErrors.contact_email && (
          <p className="text-[11px] text-red-400">{fieldErrors.contact_email[0]}</p>
        )}
      </div>

      {/* Optional Specific Notes */}
      <div className="space-y-1.5">
        <label htmlFor="note" className="block text-xs font-semibold text-primary">
          Specific Instructions or Context (Optional)
        </label>
        <textarea
          id="note"
          name="note"
          rows={3}
          placeholder="Provide any additional details to help our team locate and verify your records quickly."
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface/70 border border-subtle focus:border-cyan-400/60 focus:shadow-[0_0_15px_rgba(61,235,255,0.2)] text-xs text-primary placeholder:text-secondary/50 outline-none transition-all resize-none"
        />
        {fieldErrors.note && (
          <p className="text-[11px] text-red-400">{fieldErrors.note[0]}</p>
        )}
      </div>

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Statutory Notice */}
      <div className="p-3.5 rounded-xl glass-card border border-white/[0.08] text-[11px] text-secondary leading-relaxed">
        <strong className="text-primary">Statutory Notice:</strong> Under Section 34 of the Nigeria Data Protection Act 2023, data controllers must fulfill valid data subject requests without undue delay and at the latest within 30 days of receipt.
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="relative group w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-void text-xs font-bold hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer overflow-hidden"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
        {isPending ? (
          <>
            <RefreshCw className="w-3.5 h-3.5 animate-spin relative z-10" />
            <span className="relative z-10">Submitting to Register...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
            <span className="relative z-10">Submit Formal Request</span>
          </>
        )}
      </button>
    </form>
  );
}
