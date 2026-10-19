'use client';

import React, { useState, useTransition } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Send,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { submitReportAction } from '@/lib/actions/report';
import { ShareButton } from '@/components/ui/ShareButton';
import { useSelectedCountry } from '@/components/ui/CountrySelector';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { trackEvent } from '@/lib/analytics/tracker';

interface ChecklistItem {
  id: string;
  number: number;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'warning';
  actionTip: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'upfront-payment',
    number: 1,
    title: 'Upfront Payment Demanded',
    description: 'They ask for money for training materials, hardware kits, software licenses, or account activation fees.',
    severity: 'critical',
    actionTip: 'Automatic high risk. Real employers pay you; legitimate AI platforms never charge candidates.',
  },
  {
    id: 'crypto-payouts',
    number: 2,
    title: 'Crypto or Gift Card Payouts',
    description: 'Payments offered exclusively via Bitcoin, USDT to private wallets, or Amazon gift cards instead of recognized payroll rails.',
    severity: 'critical',
    actionTip: 'Regulated AI labs disburse payments through formal payroll rails like Deel, direct ACH, or licensed fintechs.',
  },
  {
    id: 'sensitive-credentials',
    number: 3,
    title: 'Sensitive Financial Credential Requests',
    description: 'The recruiter asks for your Social Security number, National Insurance number or SIN, Bank Verification Number (BVN), ATM PIN, online banking password, or card OTP.',
    severity: 'critical',
    actionTip: 'Critical danger. Never disclose your national tax ID, card details, or banking passwords to any recruiter before formal hire.',
  },
  {
    id: 'missing-cac-reg',
    number: 4,
    title: 'Missing Official Corporate Registration',
    description: 'The recruiting business cannot be found in national or state company registries (such as state business filings, Companies House, or CAC).',
    severity: 'high',
    actionTip: 'Search official corporate registries. If a recruiter has no registered corporate identity, treat with caution.',
  },
  {
    id: 'messaging-app-only',
    number: 5,
    title: 'Exclusive Messaging App Recruitment',
    description: 'Communication is conducted exclusively via WhatsApp, Telegram, or Signal with no email from an official corporate domain.',
    severity: 'high',
    actionTip: 'Legitimate corporate talent teams initiate outreach from verifiable corporate email domains, not anonymous phone numbers.',
  },
  {
    id: 'free-or-lookalike-domain',
    number: 6,
    title: 'Free Webmail or Lookalike Domain',
    description: 'The recruiter contacts you from a free email provider (gmail.com, hotmail.com) or a lookalike domain (e.g. outlier-work-portal.com).',
    severity: 'high',
    actionTip: 'Always check the domain WHOIS age and verify the email domain against the authentic corporate career site.',
  },
  {
    id: 'unrealistic-pay',
    number: 7,
    title: 'Unrealistic Compensation Promises',
    description: 'Promises of $80 to $120+ per hour for basic text typing, CAPTCHA solving, or data entry requiring zero qualifications.',
    severity: 'warning',
    actionTip: 'Market rates for entry-level data annotation typically range from $12 to $25/hr. Triple-digit rates require advanced degrees.',
  },
  {
    id: 'instant-offer-no-test',
    number: 8,
    title: 'Instant Job Offer Without Skills Testing',
    description: 'You are offered an immediate paid contract without any benchmark assessment, portfolio check, or technical interview.',
    severity: 'high',
    actionTip: 'Authentic AI evaluation platforms require proctored screening (TestGorilla, automated rubric tests) before onboarding.',
  },
  {
    id: 'high-pressure-urgency',
    number: 9,
    title: 'High-Pressure Urgency & Threat of Loss',
    description: 'The recruiter demands immediate contract signing or payment within minutes, threatening that your spot will be cancelled.',
    severity: 'warning',
    actionTip: 'Manufactured urgency is a classic social engineering tactic designed to prevent candidates from verifying claims.',
  },
  {
    id: 'absent-from-official-ats',
    number: 10,
    title: 'Role Absent from Official Career Site',
    description: 'You cannot locate the job requisition on the company official careers portal (Ashby, Greenhouse, Lever, or Workday).',
    severity: 'warning',
    actionTip: 'If a listing exists only on a social media screenshot and not on the employer career page, treat it as unconfirmed.',
  },
];

interface RegionQuestion {
  id: string;
  countryCode: string;
  title: string;
  description: string;
  actionTip: string;
  isSample: boolean;
}

const REGION_QUESTIONS: RegionQuestion[] = [
  {
    id: 'us-check-deposit',
    countryCode: 'US',
    title: 'Asked you to deposit a check and send money back [SAMPLE]',
    description: 'Recruiter sends an advance check to deposit for home office equipment, requesting a return wire or Zelle transfer.',
    actionTip: 'Fake check scams are common in the US. The check will bounce after you send real funds.',
    isSample: true,
  },
  {
    id: 'uk-dbs-fee',
    countryCode: 'GB',
    title: 'Asked you to pay for a DBS check or equipment upfront [SAMPLE]',
    description: 'Recruiter demands payment for a background check or shipping an evaluation laptop upfront.',
    actionTip: 'Legitimate UK employers pay for required DBS checks directly and never ask candidates to wire money.',
    isSample: true,
  },
  {
    id: 'ca-advance-cheque',
    countryCode: 'CA',
    title: 'Asked you to deposit an advance cheque for office setup [SAMPLE]',
    description: 'Recruiter asks you to deposit a cheque into your Canadian bank account and buy supplies from an unauthorized vendor.',
    actionTip: 'Cheque overpayment fraud is prevalent in Canada. Never transfer funds against uncleared cheques.',
    isSample: true,
  },
  {
    id: 'ng-bvn-request',
    countryCode: 'NG',
    title: 'Asked for your BVN to verify your application [SAMPLE]',
    description: 'Recruiter asks for your Bank Verification Number or bank token before job offer issuance.',
    actionTip: 'No legitimate international AI contractor requires your BVN. Only share NUBAN or virtual USD details.',
    isSample: true,
  },
  {
    id: 'in-task-unlock',
    countryCode: 'IN',
    title: 'Asked you to pay a deposit for tasks [SAMPLE]',
    description: 'Demanding an advance deposit, VIP membership, or task recharge to access daily annotation batches.',
    actionTip: 'Task deposit schemes are widespread in India and Southeast Asia. Legitimate platforms never charge workers.',
    isSample: true,
  },
  {
    id: 'ph-task-unlock',
    countryCode: 'PH',
    title: 'Asked you to pay a deposit for tasks [SAMPLE]',
    description: 'Demanding an advance deposit, VIP membership, or task recharge to release completed annotation payouts.',
    actionTip: 'Task deposit schemes are widespread in the Philippines. Legitimate platforms never charge workers.',
    isSample: true,
  },
];

export function ScamCheckClient() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [inquiryText, setInquiryText] = useState<string>('');
  const countryCode = useSelectedCountry();

  // Report Form State
  const [isPending, startTransition] = useTransition();
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

  const handleToggle = (id: string) => {
    setCheckedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        trackEvent('scam_check_complete', {
          flagCount: next.length,
          hasFlags: next.length > 0,
          country: countryCode,
        });
      } catch {
        // Non-blocking telemetry
      }
      return next;
    });
  };

  const handleReset = () => {
    setCheckedIds([]);
    setInquiryText('');
  };

  const flagCount = checkedIds.length;

  // Determine Risk Category (Never shown by color alone per AGENTS.md)
  let riskLevel = 'Low Risk';
  let riskBadgeColor = 'border-[#17663F]/30 bg-[#17663F]/10 text-[#17663F]';
  let riskSummary =
    'No structural red flags checked. The opportunity appears consistent with standard hiring practices, but always authenticate the role on the official career portal before submitting personal documents.';

  if (flagCount === 1) {
    riskLevel = 'Moderate Caution';
    riskBadgeColor = 'border-[#8A5300]/30 bg-[#8A5300]/10 text-[#8A5300]';
    riskSummary =
      '1 warning flag detected. Do not share payment details, passwords, or identity documents until you have verified the recruiter corporate email domain directly.';
  } else if (flagCount >= 2) {
    riskLevel = 'Critical High Risk';
    riskBadgeColor = 'border-[#A8322A]/30 bg-[#A8322A]/10 text-[#A8322A]';
    riskSummary =
      'Multiple critical red flags detected. This outreach strongly resembles known advance-fee fraud or credential harvesting schemes. Do not send funds, do not provide BVN/banking details, and cease communication.';
  }

  // Handle Report Form Submit
  const handleReportSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setReportError(null);
    setReportSuccess(null);
    setValidationErrors({});

    const formData = new FormData(e.currentTarget);
    const payload = {
      reason: 'scam' as const,
      urlOrRole: (formData.get('urlOrRole') as string) || inquiryText || 'Suspicious Outreach',
      details: (formData.get('details') as string) || '',
      contactEmail: (formData.get('contactEmail') as string) || '',
      mathAnswer: (formData.get('mathAnswer') as string) || '',
      honeypot: (formData.get('honeypot') as string) || '',
    };

    startTransition(async () => {
      const res = await submitReportAction(payload);
      if (res.success) {
        setReportSuccess(res.message);
      } else {
        setReportError(res.message);
        if (res.errors) {
          setValidationErrors(res.errors);
        }
      }
    });
  };

  return (
    <div className="space-y-10">
      {/* 1. Quick Inquiry Input */}
      <div className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label
            htmlFor="inquiry-input"
            className="text-xs font-semibold text-ink block"
          >
            Target Opportunity or Recruiter Details (Optional)
          </label>
          <p className="text-xs text-secondary leading-relaxed">
            Paste the suspicious job link, recruiter email, WhatsApp message, or hiring entity name to keep your review organized.
          </p>
        </div>

        <input
          id="inquiry-input"
          type="text"
          value={inquiryText}
          onChange={(e) => setInquiryText(e.target.value)}
          placeholder="e.g., https://example-remote-careers.com or recruiter@gmail.com"
          className="w-full rounded-xl border border-rule bg-surface p-3 text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all min-h-[44px]"
        />
      </div>

      {/* 2. Interactive 10-Point Checklist */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
              10-Point Verification Checklist
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Check every statement that matches the outreach or job listing you received.
            </p>
          </div>

          {flagCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-secondary hover:text-ink transition-colors underline min-h-[44px] inline-flex items-center"
            >
              Clear all checks ({flagCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checkedIds.includes(item.id);

            return (
              <label
                key={item.id}
                htmlFor={`check-${item.id}`}
                className={`rounded-xl border p-4 flex items-start gap-3.5 cursor-pointer transition-all select-none ${
                  isChecked
                    ? 'border-[#A8322A]/40 bg-[#A8322A]/5'
                    : 'border-rule bg-sheet hover:border-[#5A35C8]'
                }`}
              >
                <input
                  type="checkbox"
                  id={`check-${item.id}`}
                  checked={isChecked}
                  onChange={() => handleToggle(item.id)}
                  className="mt-1 h-4 w-4 rounded border-rule text-[#A8322A] focus:ring-[#A8322A] accent-[#A8322A] cursor-pointer"
                />

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-ink">
                      {item.number}. {item.title}
                    </span>
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded capitalize ${
                        item.severity === 'critical'
                          ? 'bg-[#A8322A]/10 text-[#A8322A] border border-[#A8322A]/20'
                          : item.severity === 'high'
                          ? 'bg-[#8A5300]/10 text-[#8A5300] border border-[#8A5300]/20'
                          : 'bg-surface text-secondary border border-rule'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-readable leading-relaxed">
                    {item.description}
                  </p>

                  {isChecked && (
                    <p className="text-xs text-[#A8322A] pt-1 border-t border-rule">
                      <strong>Warning:</strong> {item.actionTip}
                    </p>
                  )}
                </div>
              </label>
            );
          })}
          {/* Region-Specific Warning Indicators (Marked SAMPLE, hidden in production until filled) */}
          {process.env.NODE_ENV !== 'production' &&
            REGION_QUESTIONS.filter(
              (q) => q.countryCode === countryCode || (countryCode === 'WW' && ['US', 'GB', 'CA'].includes(q.countryCode))
            ).map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <label
                  key={item.id}
                  htmlFor={`check-${item.id}`}
                  className={`rounded-xl border p-4 flex items-start gap-3.5 cursor-pointer transition-all select-none ${
                    isChecked
                      ? 'border-[#A8322A]/40 bg-[#A8322A]/5'
                      : 'border-rule bg-sheet hover:border-[#5A35C8]'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={`check-${item.id}`}
                    checked={isChecked}
                    onChange={() => handleToggle(item.id)}
                    className="mt-1 h-4 w-4 rounded border-rule text-[#A8322A] focus:ring-[#A8322A] accent-[#A8322A] cursor-pointer"
                  />

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-ink">
                        {item.title}
                      </span>
                      <SampleBadge />
                    </div>

                    <p className="text-readable leading-relaxed">
                      {item.description}
                    </p>

                    {isChecked && (
                      <p className="text-xs text-[#A8322A] pt-1 border-t border-rule">
                        <strong>Warning:</strong> {item.actionTip}
                      </p>
                    )}
                  </div>
                </label>
              );
            })}
        </div>
      </div>

      {/* 3. Real-Time Risk Score Analysis Card */}
      <section
        role="region"
        aria-label="Risk analysis score"
        className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 space-y-4 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-rule">
          <div className="space-y-0.5">
            <span className="text-xs text-secondary font-medium">
              Objective Risk Assessment
            </span>
            <div className="text-sm font-semibold text-ink tabular-nums">
              {flagCount} structural warning flags detected
            </div>
          </div>

          {/* Status Badge with Text & Icon (Never color alone) */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${riskBadgeColor}`}
          >
            {flagCount === 0 ? (
              <ShieldCheck size={16} />
            ) : flagCount === 1 ? (
              <AlertTriangle size={16} />
            ) : (
              <ShieldAlert size={16} />
            )}
            <span>{riskLevel}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          {riskSummary}
        </p>

        {/* Share Check Results */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-rule">
          <span className="text-xs text-secondary">
            Share these check results with others before they reply
          </span>
          <ShareButton
            title="Job Offer Scam Check | TraceBase"
            shareText={`I checked a job offer on TraceBase: ${flagCount === 1 ? '1 warning sign' : `${flagCount} warning signs`}. Check yours before you reply:`}
            url="/scam-check"
            pageType="scam-check"
            buttonText="Share result"
          />
        </div>

        {/* Legal Defamation Safeguard Notice */}
        <div className="p-3.5 rounded-xl border border-rule bg-surface flex items-start gap-2.5 text-xs text-secondary leading-relaxed">
          <Info size={16} className="text-[#5A35C8] shrink-0 mt-0.5" />
          <div>
            <strong className="text-ink font-semibold text-xs block mb-0.5">
              Defamation &amp; Neutrality Safeguard
            </strong>
            TraceBase analyzes verifiable structural signals and objective hiring criteria. We do not maintain unmoderated public blacklists, nor do we issue automated defamatory declarations. If an opportunity shows multiple flags, we advise verifying directly through official corporate channels before taking action.
          </div>
        </div>
      </section>

      {/* 4. Scam Reporting Form */}
      <section className="rounded-xl border border-rule bg-sheet p-5 sm:p-6 space-y-5 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#A8322A]">
            <ShieldAlert size={15} />
            <span>Submit a Suspicious Listing for Human Moderation</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-ink">
            Flag a Recruiter or Suspicious Job Offer
          </h3>
          <p className="text-xs text-secondary leading-relaxed">
            Encountered an active scam targeting remote AI evaluators? Submit the details below. Our staff reviews every report by hand before adding warning notes to public search.
          </p>
        </div>

        {reportSuccess ? (
          <div className="p-4 rounded-xl border border-[#17663F]/30 bg-[#17663F]/10 text-[#17663F] text-xs flex items-center gap-2">
            <CheckCircle2 size={16} />
            <span>{reportSuccess}</span>
          </div>
        ) : (
          <form onSubmit={handleReportSubmit} className="space-y-4">
            {reportError && (
              <div className="p-3 rounded-xl border border-[#A8322A]/30 bg-[#A8322A]/10 text-[#A8322A] text-xs flex items-center gap-2">
                <AlertTriangle size={15} />
                <span>{reportError}</span>
              </div>
            )}

            {/* Target URL or Entity */}
            <div className="space-y-1">
              <label
                htmlFor="urlOrRole"
                className="text-xs font-semibold text-secondary block"
              >
                Suspicious Link, Company, or Contact *
              </label>
              <input
                id="urlOrRole"
                name="urlOrRole"
                type="text"
                required
                defaultValue={inquiryText}
                placeholder="e.g., https://fake-platform-eval.com or WhatsApp recruiter +234..."
                className="w-full rounded-xl border border-rule bg-surface p-3 text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all min-h-[44px]"
              />
              {validationErrors.urlOrRole && (
                <p className="text-xs text-[#A8322A]">
                  {validationErrors.urlOrRole[0]}
                </p>
              )}
            </div>

            {/* What Happened / Details */}
            <div className="space-y-1">
              <label
                htmlFor="details"
                className="text-xs font-semibold text-secondary block"
              >
                What happened? (Describe fees demanded, messaging app used, or domain issues) *
              </label>
              <textarea
                id="details"
                name="details"
                rows={3}
                required
                placeholder="Explain the red flags you encountered (minimum 10 characters)..."
                className="w-full rounded-xl border border-rule bg-surface p-3 text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all"
              />
              {validationErrors.details && (
                <p className="text-xs text-[#A8322A]">
                  {validationErrors.details[0]}
                </p>
              )}
            </div>

            {/* Optional Email & Challenge Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label
                  htmlFor="contactEmail"
                  className="text-xs font-semibold text-secondary block"
                >
                  Your Email (Optional, for investigation updates)
                </label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-rule bg-surface p-2.5 text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all min-h-[44px]"
                />
              </div>

              {/* Bot Challenge (4 + 3 = 7) */}
              <div className="space-y-1">
                <label
                  htmlFor="mathAnswer"
                  className="text-xs font-semibold text-secondary block"
                >
                  Verification Challenge: 4 + 3 = ? *
                </label>
                <input
                  id="mathAnswer"
                  name="mathAnswer"
                  type="text"
                  required
                  placeholder="Answer"
                  className="w-full rounded-xl border border-rule bg-surface p-2.5 text-xs sm:text-sm text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] focus:ring-1 focus:ring-[#5A35C8] transition-all min-h-[44px]"
                />
                {validationErrors.mathAnswer && (
                  <p className="text-xs text-[#A8322A]">
                    {validationErrors.mathAnswer[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Honeypot field (hidden from humans) */}
            <input
              type="text"
              name="honeypot"
              aria-label="Do not fill this field"
              tabIndex={-1}
              autoComplete="off"
              className="opacity-0 absolute -z-10 h-0 w-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#5A35C8] text-white font-medium text-xs hover:bg-[#4927AB] transition-colors min-h-[44px] disabled:opacity-50"
              >
                {isPending ? (
                  <span>Submitting report...</span>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Submit suspicious listing for review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
