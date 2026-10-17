'use client';

import React, { useState, useTransition } from 'react';
import { submitPrivacyRequestAction } from '@/lib/actions/privacy';
import { CheckCircle2, AlertCircle, Clock, Lock, Send, RefreshCw } from 'lucide-react';
import { useSelectedCountry, SUPPORTED_COUNTRIES } from '@/components/ui/CountrySelector';

export function PrivacyRequestForm() {
  const selectedCountry = useSelectedCountry();
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
      <div className="p-6 sm:p-8 rounded-xl bg-sheet border border-rule text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-primary">
            Privacy Rights Request Received
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto leading-relaxed">
            Your request has been logged in our compliance register. In accordance with the Nigeria Data Protection Act (NDPA) 2023, our response is due within 30 days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left text-xs">
          <div className="p-3.5 rounded-lg bg-surface border border-rule">
            <span className="text-secondary block text-[11px]">Request Reference</span>
            <span className="tabular-nums font-bold text-primary text-sm">{receipt.id}</span>
          </div>
          <div className="p-3.5 rounded-lg bg-surface border border-rule">
            <span className="text-secondary block text-[11px]">Statutory Deadline</span>
            <span className="tabular-nums font-bold text-amber-700 dark:text-amber-400 text-sm">{formattedDue}</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface border border-rule text-xs text-secondary max-w-md mx-auto text-left space-y-1.5">
          <div className="font-semibold text-primary flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-ink" />
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
          className="text-xs text-brand-ink underline hover:text-[#4A2AB0] cursor-pointer min-h-[44px] inline-flex items-center"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-xl bg-sheet border border-rule space-y-6">
      {/* Top Banner */}
      <div className="flex items-center gap-2 text-xs text-secondary">
        <Lock className="w-3.5 h-3.5 text-brand-ink" />
        <span>NDPA 2023 Statutory Rights Portal : 30-Day Response SLA</span>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-red-500/30 bg-red-500/10 text-xs text-red-700 dark:text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Request Type Selector */}
      <div className="space-y-1.5">
        <label htmlFor="kind" className="block text-xs font-semibold text-primary">
          Nature of Request <span className="text-red-500">*</span>
        </label>
        <select
          id="kind"
          name="kind"
          required
          defaultValue="deletion"
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-all min-h-[44px]"
        >
          <option value="deletion">Right to Erasure : Permanently delete my email and data</option>
          <option value="access">Right of Access (SAR) : Request copy of my recorded data</option>
          <option value="withdraw_consent">Withdraw Consent : Revoke newsletter / alert consent</option>
          <option value="correction">Right to Rectification : Correct my recorded preferences</option>
          <option value="objection">Right to Object : Object to specific processing</option>
        </select>
        {fieldErrors.kind && (
          <p className="text-[11px] text-red-500">{fieldErrors.kind[0]}</p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label htmlFor="contact_email" className="block text-xs font-semibold text-primary">
          Your Email Address <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="contact_email"
          name="contact_email"
          required
          placeholder="contributor@example.com"
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary placeholder:text-secondary/50 outline-none transition-all min-h-[44px]"
        />
        <p className="text-[11px] text-secondary">
          Must match the email address associated with your newsletter subscription or evaluation lead.
        </p>
        {fieldErrors.contact_email && (
          <p className="text-[11px] text-red-500">{fieldErrors.contact_email[0]}</p>
        )}
      </div>

      {/* Country of Residence */}
      <div className="space-y-1.5">
        <label htmlFor="country_code" className="block text-xs font-semibold text-primary">
          Your Country of Residence <span className="text-secondary font-normal">(Optional)</span>
        </label>
        <select
          key={selectedCountry}
          id="country_code"
          name="country_code"
          defaultValue={selectedCountry && selectedCountry !== 'WW' ? selectedCountry : 'NG'}
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary outline-none transition-all min-h-[44px]"
        >
          <option value="">Worldwide / Unspecified</option>
          {SUPPORTED_COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name} ({c.code})
            </option>
          ))}
        </select>
        <p className="text-[11px] text-secondary">
          Helps our Data Protection Lead apply country-specific provisions (such as NDPA 2023, UK GDPR, Canada PIPEDA, or CCPA).
        </p>
        {fieldErrors.country_code && (
          <p className="text-[11px] text-red-500">{fieldErrors.country_code[0]}</p>
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
          className="w-full px-3.5 py-2.5 rounded-lg bg-sheet border border-rule focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] text-xs text-primary placeholder:text-secondary/50 outline-none transition-all resize-none"
        />
        {fieldErrors.note && (
          <p className="text-[11px] text-red-500">{fieldErrors.note[0]}</p>
        )}
      </div>

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Statutory Notice */}
      <div className="p-3.5 rounded-lg bg-surface border border-rule text-[11px] text-secondary leading-relaxed">
        <strong className="text-primary">Statutory Notice:</strong> Under Section 34 of the Nigeria Data Protection Act 2023, data controllers must fulfill valid data subject requests without undue delay and at the latest within 30 days of receipt.
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
            <span>Submitting to Register...</span>
          </>
        ) : (
          <>
            <Send className="w-3.5 h-3.5" />
            <span>Submit Formal Request</span>
          </>
        )}
      </button>
    </form>
  );
}
