import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Search,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Verification Methodology & Status Standards | TraceBase',
  description:
    'How TraceBase checks remote AI jobs: the 10-point verification standard, 14-day recheck cycles, automated status sweepers, and honest country eligibility.',
  alternates: {
    canonical: '/methodology',
  },
  openGraph: {
    title: 'Verification Methodology & Status Standards | TraceBase',
    description:
      'How we check AI training jobs, confirm country eligibility, and audit platform onboarding timelines.',
    url: '/methodology',
    type: 'article',
  },
};

const VERIFICATION_STEPS = [
  {
    num: 1,
    title: 'Direct Official Source Access',
    description: 'We access the employer primary careers domain or verified ATS link (Ashby, Greenhouse, Lever, Workday) directly. We never scrape third-party aggregators or rely on secondhand screenshots.',
  },
  {
    num: 2,
    title: 'Live Application Endpoint Testing',
    description: 'We verify that the application submission endpoint is active, accepting new candidate submissions, and not returning 404 or project pause notices.',
  },
  {
    num: 3,
    title: 'Explicit Country Eligibility Recording',
    description: 'We record eligible territories exactly as the employer official terms dictate. If the employer listing is silent regarding a country, we record it strictly as Unconfirmed. We never guess.',
  },
  {
    num: 4,
    title: 'Pay Rate & Currency Basis Verification',
    description: 'We record compensation figures only if the official requisition specifies them. We copy the exact basis (hourly, per task, or fixed sprint). If pay is absent, it reads "Not confirmed".',
  },
  {
    num: 5,
    title: 'Onboarding Pipeline Documentation',
    description: 'We identify all stated pre-work requirements: identity verification providers (Persona, Veriff), proctored domain assessments (TestGorilla), and unpaid training modules.',
  },
  {
    num: 6,
    title: 'Domain & Corporate Registry Authentication',
    description: 'We verify the corporate domain registration age and check local entity registers (such as the Nigeria CAC public portal) to confirm the hiring entity exists.',
  },
  {
    num: 7,
    title: 'Advance-Fee & Red Flag Sweep',
    description: 'We audit the listing against our 10-point scam checklist. If fees are demanded, payouts are offered in cryptocurrency, or interviews occur via WhatsApp only, the listing is rejected.',
  },
  {
    num: 8,
    title: 'Original Human Summary Authoring',
    description: 'We write a short, original summary highlighting key project focus areas. We never paste the employer generic marketing text.',
  },
  {
    num: 9,
    title: '14-day recheck scheduling and change logging',
    description: 'The check timestamp, checker initials, and findings are recorded into the check log. The next check is scheduled 14 days out. Every event is published to our change log (/changes).',
  },
  {
    num: 10,
    title: 'Status changes and note updates',
    description: 'If any verification requirement fails during recheck, the status changes immediately to Needs Recheck or Closed, and a clear reason is logged.',
  },
];

export default function MethodologyPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-4 pb-6 border-b border-border-default">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border-default text-xs text-secondary">
          <ShieldCheck size={14} className="text-brand-ink" />
          <span>How we check a role</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
          Verification Methodology
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          The 10-point standard we apply to every listing. How we verify country eligibility, maintain the 14-day recheck cycle, and eliminate stale information.
        </p>
      </div>

      {/* 2. The Status Transition Engine */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
          The Four Status Standards
        </h2>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          TraceBase uses an automated daily compliance sweeper paired with mandatory human rechecks. Every status communicates a verified operational state:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Verified */}
          <div className="bg-sheet border border-rule rounded-xl p-5 space-y-2 border-l-4 border-l-emerald-600 dark:border-l-emerald-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400"></span>
              <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                Verified (Fresh)
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Checked by a human evaluator within the last 14 days. Application endpoint confirmed open, country rules validated, and no red flags detected.
            </p>
          </div>

          {/* Needs Recheck */}
          <div className="bg-sheet border border-rule rounded-xl p-5 space-y-2 border-l-4 border-l-amber-600 dark:border-l-amber-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 dark:bg-amber-400"></span>
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                Needs Recheck (Aging)
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Between 14 and 30 days since the last human verification pass. The page displays an amber warning banner advising candidates to check official requisitions before applying.
            </p>
          </div>

          {/* Closed */}
          <div className="bg-sheet border border-rule rounded-xl p-5 space-y-2 border-l-4 border-l-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <span className="text-xs font-semibold text-secondary">
                Closed (Historical)
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Application endpoint returned 404 or employer closed hiring. The URL remains active to prevent dead links, displays a prominent closed banner, and hides Apply buttons.
            </p>
          </div>

          {/* Unconfirmed / Hidden */}
          <div className="bg-sheet border border-rule rounded-xl p-5 space-y-2 border-l-4 border-l-red-600 dark:border-l-red-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 dark:bg-red-400"></span>
              <span className="text-xs font-semibold text-red-800 dark:text-red-300">
                Hidden at 30 Days
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              If an active listing reaches 30 days without human re-verification, the daily status sweeper automatically hides it from public search until re-checked.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The 10-Point Verification Standard (Section 9.4) */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
            The 10-Point Verification Standard
          </h2>
          <p className="text-xs sm:text-sm text-secondary">
            Every role listed on TraceBase must pass this complete checklist before publication:
          </p>
        </div>

        <div className="space-y-3">
          {VERIFICATION_STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-sheet border border-rule rounded-xl p-4 flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-lg border border-rule bg-surface flex items-center justify-center font-bold text-brand-ink text-xs shrink-0 mt-0.5 tabular-nums">
                {step.num}
              </div>

              <div className="space-y-1 text-xs">
                <h3 className="font-bold text-primary text-xs sm:text-sm">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Country Eligibility Standard */}
      <section className="bg-sheet border border-rule rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-ink">
          <Search size={16} />
          <span>Country Eligibility Standard</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-primary">
          How We Determine Who Can Apply
        </h3>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          The remote work market suffers from misleading &quot;worldwide&quot; claims that waste candidates time. At TraceBase, country status follows strict rules:
        </p>

        <ul className="space-y-2 text-xs text-secondary leading-relaxed pt-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 size={14} className="text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-primary">Accepted:</strong> The official application dropdown or employer documentation explicitly lists the country as eligible for payout and identity verification.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-primary">Unconfirmed:</strong> The employer listing is silent regarding the specific country. We display an honest note explaining that eligibility could not be confirmed.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <XCircle size={14} className="text-red-700 dark:text-red-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-primary">Not Accepted:</strong> The employer explicitly excludes the territory due to compliance, tax, or payroll corridor constraints.
            </span>
          </li>
        </ul>
      </section>

      {/* 5. Audit Log & Public Traceability */}
      <section className="bg-sheet border border-rule rounded-xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-ink">
          <FileText size={15} />
          <span>Verification record</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Every check conducted by our staff creates a permanent record in our check log with the exact date, check result, and observation note. You can view the verification check history on every individual job detail page.
        </p>
        <div className="pt-2">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-ink hover:underline"
          >
            <span>Browse currently verified roles</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>
    </div>
  );
}
