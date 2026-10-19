'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Loader2, Award, ShieldCheck } from 'lucide-react';
import { submitEvaluatorApplicationAction, EvaluatorSubmitResult } from '@/lib/actions/evaluators';

interface ManagedRoleApplicationModalProps {
  jobTitle: string;
  jobSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ManagedRoleApplicationModal({
  jobTitle,
  jobSlug,
  isOpen,
  onClose,
}: ManagedRoleApplicationModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EvaluatorSubmitResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formData = new FormData(e.currentTarget);
      formData.set('job_slug', jobSlug);
      const res = await submitEvaluatorApplicationAction(formData);
      if (res.success) {
        setResult(res);
      } else {
        setErrorMsg(res.message || 'Submission failed.');
      }
    } catch {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-rule bg-sheet p-6 sm:p-8 shadow-2xl text-ink space-y-5 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-secondary hover:text-ink hover:bg-surface transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="pr-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-ink)] uppercase tracking-wider">
            <ShieldCheck size={13} />
            <span>TraceBase managed sprint</span>
          </div>
          <h2 id="modal-title" className="text-xl sm:text-2xl font-extrabold text-ink leading-snug">
            Apply for {jobTitle}
          </h2>
          <p className="text-xs text-secondary leading-relaxed m-0">
            Submit your background directly to TraceBase. Applications are reviewed by our operations team.
          </p>
        </div>

        {result ? (
          <div className="rounded-xl border border-teal-500/30 bg-teal-500/10 p-6 text-center space-y-3">
            <CheckCircle2 size={36} className="text-teal-400 mx-auto" />
            <h3 className="text-base font-bold text-ink">Application received</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Your application has been logged for review with reference ID:
            </p>
            <div className="font-mono text-sm font-bold text-teal-300">
              {result.referenceId || 'REF-PENDING'}
            </div>
            <p className="text-[11px] text-muted">
              We will contact you via email if your profile matches the sprint requirements.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="cs-btn cs-btn-primary px-6 py-2 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Honeypot field for anti-bot protection */}
            <input type="text" name="website" aria-label="Do not fill this field" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="space-y-1">
              <label htmlFor="name" className="font-bold text-ink block">
                Full name:
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g. Ebubechukwu Okeke"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="font-bold text-ink block">
                Email address:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="e.g. name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="country_code" className="font-bold text-ink block">
                  Country of residence:
                </label>
                <select
                  id="country_code"
                  name="country_code"
                  defaultValue="NG"
                  className="w-full px-3 py-2.5 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
                >
                  <option value="NG">Nigeria</option>
                  <option value="GH">Ghana</option>
                  <option value="KE">Kenya</option>
                  <option value="ZA">South Africa</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="OTHER">Other / Global</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="domain" className="font-bold text-ink block">
                  Primary domain:
                </label>
                <select
                  id="domain"
                  name="domain"
                  defaultValue="AI Evaluation & RLHF"
                  className="w-full px-3 py-2.5 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
                >
                  <option value="AI Evaluation & RLHF">AI Evaluation &amp; RLHF</option>
                  <option value="Software & Engineering">Software &amp; Engineering</option>
                  <option value="Law & Legal Analysis">Law &amp; Legal Analysis</option>
                  <option value="Medicine & Healthcare">Medicine &amp; Healthcare</option>
                  <option value="Finance & Accounting">Finance &amp; Accounting</option>
                  <option value="Languages & Linguistics">Languages &amp; Linguistics</option>
                  <option value="STEM & Mathematics">STEM &amp; Mathematics</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="certificate_id" className="font-bold text-ink flex items-center justify-between">
                <span>TraceBase Certificate ID (Optional):</span>
                <span className="text-teal-400 font-normal">Preferred for sprints</span>
              </label>
              <div className="relative">
                <input
                  id="certificate_id"
                  name="certificate_id"
                  type="text"
                  placeholder="e.g. CS-2026-A101"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink font-mono focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
                />
                <Award size={14} className="absolute right-3.5 top-3.5 text-muted pointer-events-none" />
              </div>
              <p className="text-[11px] text-muted m-0">
                Completed our evaluation training? Enter your certificate ID to fast-track your review.
              </p>
            </div>

            <div className="space-y-1">
              <label htmlFor="portfolio_url" className="font-bold text-ink block">
                LinkedIn, CV link, or GitHub:
              </label>
              <input
                id="portfolio_url"
                name="portfolio_url"
                type="url"
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink focus:outline-none focus:ring-1 focus:ring-[var(--brand-ink)] min-h-[44px]"
              />
            </div>

            {errorMsg && <p className="text-red-400 text-xs font-semibold m-0">{errorMsg}</p>}

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="px-4 py-2.5 rounded-lg border border-rule bg-surface text-ink font-semibold hover:bg-elevated cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="cs-btn cs-btn-primary px-6 py-2.5 font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit application</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
