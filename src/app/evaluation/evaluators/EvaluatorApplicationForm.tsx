"use client";

import React, { useState } from "react";
import { submitEvaluatorApplicationAction, EvaluatorSubmitResult } from "@/lib/actions/evaluators";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

export function EvaluatorApplicationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [result, setResult] = useState<EvaluatorSubmitResult | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const res = await submitEvaluatorApplicationAction(formData);

    if (res.success) {
      setStatus("success");
      setResult(res);
    } else {
      setStatus("error");
      setResult(res);
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 rounded-xl border border-accent-emerald/40 bg-accent-emerald/5 space-y-4">
        <div className="flex items-center gap-2 text-accent-emerald font-semibold text-base">
          <CheckCircle2 size={20} />
          <span>Application Received</span>
        </div>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          {result?.message} When a relevant domain audit or model evaluation sprint matches your profile, Jo will reach out directly with scope details and compensation terms.
        </p>
        {result?.referenceId && (
          <div className="p-3 rounded-lg border border-subtle bg-void font-mono text-xs text-secondary">
            Application Reference: <span className="text-primary font-bold">{result.referenceId}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot anti-bot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Full Name <span className="text-accent-cyan">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Dr. Ebube Okeke"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Professional Email <span className="text-accent-cyan">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="name@university.edu or name@work.com"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Country */}
        <div className="space-y-1.5">
          <label
            htmlFor="country_code"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Country of Residence <span className="text-accent-cyan">*</span>
          </label>
          <select
            id="country_code"
            name="country_code"
            required
            defaultValue="NG"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
          >
            <option value="NG">Nigeria (NG)</option>
            <option value="US">United States (US)</option>
            <option value="GB">United Kingdom (GB)</option>
            <option value="KE">Kenya (KE)</option>
            <option value="GH">Ghana (GH)</option>
            <option value="CA">Canada (CA)</option>
            <option value="IN">India (IN)</option>
            <option value="ZA">South Africa (ZA)</option>
          </select>
        </div>

        {/* Domain Specialization */}
        <div className="space-y-1.5">
          <label
            htmlFor="domain"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Primary Evaluation Domain <span className="text-accent-cyan">*</span>
          </label>
          <select
            id="domain"
            name="domain"
            required
            defaultValue="Software Engineering & Systems"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
          >
            <option value="Software Engineering & Systems">Software Engineering & Systems</option>
            <option value="Medicine, Healthcare & Pharmacology">Medicine, Healthcare & Pharmacology</option>
            <option value="Law, Contracts & Regulatory Compliance">Law, Contracts & Regulatory Compliance</option>
            <option value="Finance, Economics & Accounting">Finance, Economics & Accounting</option>
            <option value="Mathematics, Statistics & Quantitative Logic">Mathematics, Statistics & Quantitative Logic</option>
            <option value="Linguistics, African Languages & Translation">Linguistics, African Languages & Translation</option>
            <option value="Physics, Chemistry & Life Sciences">Physics, Chemistry & Life Sciences</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Degree & Credentials */}
        <div className="space-y-1.5">
          <label
            htmlFor="credentials"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Highest Degree / License <span className="text-accent-cyan">*</span>
          </label>
          <input
            id="credentials"
            name="credentials"
            type="text"
            required
            placeholder="e.g. MBBS (UNN), B.Eng. Computer Engineering, LL.B"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
          />
        </div>

        {/* Years of Experience */}
        <div className="space-y-1.5">
          <label
            htmlFor="years_experience"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Years in Domain <span className="text-accent-cyan">*</span>
          </label>
          <select
            id="years_experience"
            name="years_experience"
            required
            defaultValue="3-5 years"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
          >
            <option value="1-2 years">1 to 2 years</option>
            <option value="3-5 years">3 to 5 years</option>
            <option value="6-10 years">6 to 10 years</option>
            <option value="10+ years">10+ years (Senior / Principal)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LinkedIn or Portfolio URL */}
        <div className="space-y-1.5">
          <label
            htmlFor="portfolio_url"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            LinkedIn Profile or Portfolio Link
          </label>
          <input
            id="portfolio_url"
            name="portfolio_url"
            type="url"
            placeholder="https://linkedin.com/in/your-profile"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary placeholder:text-secondary text-xs sm:text-sm focus:outline-none focus:border-focus"
          />
        </div>

        {/* Weekly Hours Availability */}
        <div className="space-y-1.5">
          <label
            htmlFor="weekly_hours"
            className="block text-xs font-mono font-medium text-secondary uppercase tracking-wider"
          >
            Weekly Availability <span className="text-accent-cyan">*</span>
          </label>
          <select
            id="weekly_hours"
            name="weekly_hours"
            required
            defaultValue="5-10 hours/week"
            disabled={status === "submitting"}
            className="w-full px-3 py-2 rounded-lg border border-subtle bg-void text-primary text-xs sm:text-sm focus:outline-none focus:border-focus"
          >
            <option value="5-10 hours/week">5 to 10 hours/week (Evenings/Weekends)</option>
            <option value="10-20 hours/week">10 to 20 hours/week (Part-Time)</option>
            <option value="20-40 hours/week">20 to 40 hours/week (Full Sprint Availability)</option>
          </select>
        </div>
      </div>

      {status === "error" && (
        <div className="p-3 rounded-lg border border-accent-danger/30 bg-accent-danger/5 text-xs text-accent-danger flex items-center gap-2">
          <AlertCircle size={15} />
          <span>{result?.message || "That did not send. Your text is still here. Try again."}</span>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors flex items-center justify-center gap-2"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Submitting Profile...</span>
            </>
          ) : (
            <>
              <span>Join Evaluator Network</span>
              <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>

      <p className="text-[11px] text-secondary">
        We respect your privacy. Under NDPA 2023, your details are used solely to match you with verified evaluation projects. We never sell contact information or share credentials without explicit prior agreement.
      </p>
    </form>
  );
}
