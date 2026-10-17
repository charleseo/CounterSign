'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Send,
  Lock,
} from 'lucide-react';
import { submitEvaluationScope, ScopeFormInput } from '@/app/evaluation/actions';
import { trackEvent } from '@/lib/analytics/tracker';

interface EvaluationLeadScopeFormProps {
  initialService?: string;
}

export function EvaluationLeadScopeForm({
  initialService = 'rag_and_citation_audit',
}: EvaluationLeadScopeFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submissionReceipt, setSubmissionReceipt] = useState<{
    referenceId: string;
    email: string;
    name: string;
  } | null>(null);

  // Generate stable idempotency token on mount
  const [idempotencyKey] = useState<string>(() => `idem-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    work_email: '',
    company: '',
    product_url: '',
    service: initialService,
    volume: '100_to_300_pairs',
    source_type: 'public_docs' as 'public_docs' | 'private_docs',
    timeline: 'standard_2_weeks',
    has_rubric: false,
    sensitivity: 'standard',
    message: '',
    consent: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setError(null);
  };

  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!formData.work_email.trim() || !formData.work_email.includes('@')) {
        setError('Please enter a valid business/work email.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setError('You must confirm the privacy and confidential data notice before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload: ScopeFormInput = {
      ...formData,
      idempotency_key: idempotencyKey,
    };

    try {
      const result = await submitEvaluationScope(payload);
      if (result.success && result.referenceId) {
        try {
          trackEvent('scope_submit', {
            service: formData.service,
            timeline: formData.timeline,
          });
        } catch {
          // Non-blocking telemetry
        }
        setSubmissionReceipt({
          referenceId: result.referenceId,
          email: formData.work_email,
          name: formData.name,
        });
      } else {
        setError(result.error || 'Failed to submit scope request. Please try again.');
      }
    } catch {
      setError('A connection error occurred. Your details were preserved. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // On-Page Confirmation Receipt View
  if (submissionReceipt) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl border border-rule bg-sheet space-y-6 shadow-sm animate-in fade-in">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#17663F]/10 border border-[#17663F]/20 flex items-center justify-center text-[#17663F]">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-semibold bg-[#17663F]/10 text-[#17663F] border border-[#17663F]/20">
              Receipt Confirmed
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-ink mt-1">
              Scope Request Received
            </h2>
          </div>
        </div>

        {/* Reference ID Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-surface border border-rule space-y-2">
          <div className="text-xs text-secondary font-medium">Official Audit Reference Number</div>
          <div className="text-2xl sm:text-3xl font-bold text-[#5A35C8] tracking-wider tabular-nums">
            {submissionReceipt.referenceId}
          </div>
          <p className="text-sm text-secondary leading-relaxed pt-1">
            Got it, {submissionReceipt.name}. Your reference is{' '}
            <span className="text-ink font-semibold">
              {submissionReceipt.referenceId}
            </span>
            . I review every submission personally and reply within two working days.
          </p>
        </div>

        {/* What Happens Next Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold text-secondary">
            What happens next:
          </h3>
          <ul className="space-y-2.5 text-xs text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-[#17663F] font-bold mt-0.5">1.</span>
              <span>
                <strong className="text-ink">Confirmation Notice:</strong> An auto-reply has been queued for{' '}
                <span className="text-ink font-medium">{submissionReceipt.email}</span> with your reference ID.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#17663F] font-bold mt-0.5">2.</span>
              <span>
                <strong className="text-ink">Sample Extraction:</strong> If you have 5 to 10 sample prompt-and-answer pairs (non-confidential), replying directly to the email allows me to draft a preliminary failure taxonomy before our call.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#17663F] font-bold mt-0.5">3.</span>
              <span>
                <strong className="text-ink">Secure Vault Setup:</strong> If private documentation or customer logs are required for evaluation, we provide a mutual NDA and secure, short-lived transmission vault.
              </span>
            </li>
          </ul>
        </div>

        <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-secondary">
          <span>Evaluator: Jo (Ebube) Okeke</span>
          <span className="text-[#5A35C8] font-medium">TraceBase Studio Ops</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-6">
      {/* Step Indicator Header */}
      <div className="space-y-3 pb-4 border-b border-rule">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#5A35C8]" />
            <span className="text-xs font-semibold text-ink">
              Scope an audit
            </span>
          </div>
          <span className="text-xs text-secondary">Step {step} of 3</span>
        </div>

        {/* Progress Bar */}
        <div className="grid grid-cols-3 gap-2">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 1 ? 'bg-[#5A35C8]' : 'bg-surface border border-rule'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step >= 2 ? 'bg-[#5A35C8]' : 'bg-surface border border-rule'
            }`}
          />
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === 3 ? 'bg-[#17663F]' : 'bg-surface border border-rule'
            }`}
          />
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl border border-[#A8322A]/20 bg-[#A8322A]/5 text-xs text-[#A8322A] flex items-start gap-2 animate-in fade-in">
          <AlertTriangle size={15} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* STEP 1: YOU */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-ink">1. Your Details &amp; Application</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Tell us who you are and which AI system you are deploying to production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs text-secondary block font-medium">
                Your Full Name <span className="text-[#5A35C8]">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ada Lovelace"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="work_email" className="text-xs text-secondary block font-medium">
                Work Email <span className="text-[#5A35C8]">*</span>
              </label>
              <input
                id="work_email"
                name="work_email"
                type="email"
                required
                value={formData.work_email}
                onChange={handleChange}
                placeholder="ada@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-xs text-secondary block font-medium">
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme AI Technologies"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="product_url" className="text-xs text-secondary block font-medium">
                Product / Docs URL
              </label>
              <input
                id="product_url"
                name="product_url"
                type="url"
                value={formData.product_url}
                onChange={handleChange}
                placeholder="https://docs.acme.ai"
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="service" className="text-xs text-secondary block font-medium">
              Evaluation Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
            >
              <option value="rag_and_citation_audit">RAG &amp; Citation Accuracy Audit (Primary)</option>
              <option value="technical_docs_truth">Technical Documentation Truth &amp; Hallucination Check</option>
              <option value="negative_constraint_analysis">Negative-Constraint &amp; Refusal Boundary Analysis</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="text-xs text-secondary block font-medium">
              One-Line Problem Description
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Bot answers questions using deprecated v2 endpoints instead of v3 docs."
              className="w-full px-3.5 py-2 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8] transition-colors"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] transition-all shadow-sm"
            >
              <span>Continue to Scope</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SCOPE */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-ink">2. Project Scope &amp; Target Artifacts</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Define the evaluation corpus, test volume, and delivery timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="volume" className="text-xs text-secondary block font-medium">
                Evaluation Batch Volume
              </label>
              <select
                id="volume"
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8]"
              >
                <option value="50_to_100_pairs">50 to 100 test pairs (Quick Diagnostic)</option>
                <option value="100_to_300_pairs">100 to 300 test pairs (Standard Pilot)</option>
                <option value="300_to_500_pairs">300 to 500 test pairs (Full Audit)</option>
                <option value="500_plus_enterprise">500+ custom enterprise batch</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="source_type" className="text-xs text-secondary block font-medium">
                Ground-Truth Source Type
              </label>
              <select
                id="source_type"
                name="source_type"
                value={formData.source_type}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8]"
              >
                <option value="public_docs">Public Web / API Documentation</option>
                <option value="private_docs">Private / Internal Technical Knowledge Base</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="timeline" className="text-xs text-secondary block font-medium">
                Target Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8]"
              >
                <option value="standard_2_weeks">Standard (2 weeks)</option>
                <option value="fast_track_5_days">Fast-Track Sprint (5 business days)</option>
                <option value="exploratory">Exploratory / Planning phase</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="sensitivity" className="text-xs text-secondary block font-medium">
                Confidentiality Requirement
              </label>
              <select
                id="sensitivity"
                name="sensitivity"
                value={formData.sensitivity}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-rule bg-surface text-ink text-sm focus:outline-none focus:border-[#5A35C8]"
              >
                <option value="standard">Standard (Public documentation)</option>
                <option value="nda_required">Mutual NDA required before data exchange</option>
              </select>
            </div>
          </div>

          {/* Existing Rubric Toggle */}
          <div className="p-3.5 rounded-xl border border-rule bg-surface flex items-center justify-between">
            <div className="space-y-0.5 pr-4">
              <div className="text-xs font-semibold text-ink">Do you have an existing rubric?</div>
              <div className="text-[11px] text-secondary">
                If no, we will provide our version-locked Rubric v1.0 standard.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="has_rubric"
                checked={formData.has_rubric}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#D9DEE6] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5A35C8]"></div>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-secondary hover:text-ink text-xs font-medium"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNextStep}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] transition-all shadow-sm"
            >
              <span>Review Scope</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: REVIEW & SUBMIT */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-ink">3. Review Scope &amp; Submit</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Verify your scope details. A formal reference ID will be generated upon submission.
            </p>
          </div>

          {/* Summary Box */}
          <div className="p-4 rounded-xl bg-surface border border-rule space-y-2.5 text-xs">
            <div className="flex justify-between pb-2 border-b border-rule">
              <span className="text-secondary">Applicant:</span>
              <span className="text-ink font-semibold">{formData.name} ({formData.work_email})</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-rule">
              <span className="text-secondary">Company:</span>
              <span className="text-ink">{formData.company || 'Not specified'}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-rule">
              <span className="text-secondary">Service:</span>
              <span className="text-[#5A35C8] font-semibold">
                {formData.service === 'rag_and_citation_audit' ? 'RAG & Citation Accuracy' : formData.service}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-rule">
              <span className="text-secondary">Volume:</span>
              <span className="text-ink">{formData.volume.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-secondary">Confidentiality:</span>
              <span className="text-[#17663F] font-medium">
                {formData.sensitivity === 'nda_required' ? 'Mutual NDA Required' : 'Standard (Public)'}
              </span>
            </div>
          </div>

          {/* Mandatory Confidential Data Notice */}
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3 text-xs leading-relaxed">
            <Lock size={16} className="text-[#8A5300] flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-secondary">
              <div className="font-semibold text-ink">Zero Confidential Data Policy</div>
              <p>
                Please do not send proprietary documents, credentials, or private client queries through this public form. We set up an encrypted, access-controlled transmission channel after our initial scoping conversation.
              </p>
            </div>
          </div>

          {/* Un-ticked Consent Checkbox */}
          <div className="p-3.5 rounded-xl border border-rule bg-surface">
            <label className="flex items-start gap-2.5 cursor-pointer text-xs leading-relaxed text-secondary">
              <input
                type="checkbox"
                name="consent"
                required
                checked={formData.consent}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-rule text-[#5A35C8] focus:ring-[#5A35C8]"
              />
              <span>
                I agree to the scoping submission terms and confirm that no classified, regulated, or sensitive personal data is included in this form.
              </span>
            </label>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-secondary hover:text-ink text-xs font-medium"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#5A35C8] text-white font-medium text-xs tracking-normal hover:bg-[#4D2BAE] disabled:opacity-50 transition-all shadow-sm"
            >
              {isSubmitting ? (
                <span>Generating Reference...</span>
              ) : (
                <>
                  <span>Submit Scope Request</span>
                  <Send size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
