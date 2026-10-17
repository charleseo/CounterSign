import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Award,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { FAQPageJsonLd } from '@/components/seo/JsonLd';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const metadata: Metadata = {
  title: 'About TraceBase & Jo (Ebube Okeke) | Independent AI Work Hub',
  description:
    'Why TraceBase exists: human verification for remote AI evaluation work and precision RAG model audits. Read our independence pledge and editorial principles.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About TraceBase | Human-Verified AI Work Hub',
    description:
      'Independent verification for remote AI training work and enterprise model evaluation. Founded by Jo (Ebube Okeke).',
    url: '/about',
    type: 'website',
  },
};

const FAQS = [
  {
    q: 'Do you charge people to use this site?',
    a: 'No. Never. TraceBase is 100% free for job seekers. If anyone ever requests payment or fees in our name, it is an impersonation and not us.',
  },
  {
    q: 'Is this an official site of the platforms you list?',
    a: 'No. We are entirely independent and not affiliated with, sponsored by, or operated by any platform we review or list.',
  },
  {
    q: 'How do you check roles?',
    a: 'A real person manually accesses the employer official applicant portal, tests the application URL, verifies stated country eligibility, and logs the check date. Every role is rechecked within 14 days.',
  },
  {
    q: 'Why do some listings say "not confirmed"?',
    a: 'Because the employer official page is silent regarding that specific fact (such as pay rates or specific regional eligibility). We never guess or fabricate details.',
  },
  {
    q: 'Do you earn money from referral links?',
    a: 'Occasionally, where a platform operates a standard public referral program. Every referral link is explicitly labeled Referral next to the apply button. Referral links never alter a role ranking, verification status, or editorial review.',
  },
  {
    q: 'Can you get me a job?',
    a: 'No. We provide verified intelligence, realistic onboarding timelines, and honest country eligibility. All hiring decisions rest entirely with the respective platforms.',
  },
  {
    q: 'A role I saw is closed. Why?',
    a: 'AI evaluation projects fluctuate rapidly based on client sprint volumes. If a role has closed, please tap "Something wrong? Tell us" on the listing so we can update it immediately.',
  },
  {
    q: 'How do I report a scam?',
    a: 'Use the interactive checklist and report form on our dedicated Scam Check page (/scam-check). Our team inspects every report by hand.',
  },
  {
    q: 'Can a platform correct something about itself?',
    a: `Yes. Platform operators can submit verifiable evidence to corrections@${getSiteHost()}. We reply within three working days and publish a correction or explain our editorial rationale.`,
  },
  {
    q: 'Do you sell my data?',
    a: 'No. Never. We collect the absolute minimum required data (anonymous outbound click counts and opt-in newsletter emails) and never sell, broker, or share user data with third parties.',
  },
];

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* 1. Header */}
      <div className="space-y-4 pb-6 border-b border-[var(--border-subtle)]">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border-default text-xs text-secondary">
          <ShieldCheck size={14} className="text-brand-ink" />
          <span>Foundation &amp; Principles</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
          About TraceBase
        </h1>
        <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
          TraceBase is an independent, human-verified remote AI work hub and precision model evaluation studio. We bring rigorous human verification to remote AI contracting and rigorous citation audits to frontier RAG systems.
        </p>
      </div>

      {/* 2. The Meaning & Why We Exist */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-primary tracking-tight">
          What &quot;TraceBase&quot; Means
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p>
            To <strong>countersign</strong> means to add a second signature confirming that an original document is genuine.
          </p>
          <p>
            On the talent side, every job listing is countersigned: verified by a human evaluator directly against official employer portals before it is published. We state true country eligibility, confirmed pay rates, and realistic month-one expectations.
          </p>
          <p>
            On the enterprise studio side, every model assertion is countersigned: audited by domain specialists against primary ground-truth documentation to isolate hallucinations and negative-constraint failures.
          </p>
        </div>
      </section>

      {/* 3. Who Runs TraceBase (Founder Layout & Placeholders) */}
      <section className="border border-rule bg-sheet rounded-xl p-5 sm:p-6 space-y-5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#5A35C8]">
          <Award size={16} />
          <span>Leadership &amp; Verification</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 items-start">
          {/* Founder Photo Slot */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl border-2 border-dashed border-border-default bg-surface flex flex-col items-center justify-center text-center p-2 shrink-0">
            <span className="text-xs font-mono font-bold text-secondary">JO</span>
            <span className="text-[10px] text-tertiary mt-1 leading-tight font-mono">
              [Photo Placeholder]
            </span>
          </div>

          {/* Founder Profile & Bio Placeholder */}
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-ink">
                Jo (Ebube Okeke)
              </h3>
              <p className="text-xs text-secondary font-mono">
                Founder, TraceBase
              </p>
            </div>

            <div className="p-3.5 rounded-lg border border-border-default bg-surface/50 text-xs sm:text-sm text-secondary leading-relaxed">
              <span className="text-[11px] font-mono text-[#5A35C8] font-semibold block mb-1">
                [Founder Bio: Placeholder to be filled by Jo]
              </span>
              <p className="text-secondary italic">
                Background, areas of evaluation focus, and editorial rationale for building human verification standards across remote AI contractor platforms and frontier model evaluation.
              </p>
            </div>

            {/* Verified Contact & Channel Links */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono">
              <a
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-[#5A35C8] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#0A66C2]" />
                <span className="font-medium underline underline-offset-2">LinkedIn Profile [Placeholder]</span>
              </a>

              <a
                href={`mailto:contact@${getSiteHost()}`}
                className="inline-flex items-center gap-1.5 text-ink hover:text-[#5A35C8] transition-colors"
              >
                <Mail size={13} className="text-[#5A35C8]" />
                <span className="font-medium underline underline-offset-2">contact@{getSiteHost()}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Independence Pledge */}
      <section className="border border-rule bg-sheet rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#17663F]">
          <ShieldCheck size={16} />
          <span>Our Independence Pledge</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-ink">
          Our Four Commitments to Honesty
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="bg-surface border border-rule rounded-xl p-3.5 space-y-1.5 text-xs">
            <span className="font-semibold text-ink block">
              1. Never Invent Data
            </span>
            <p className="text-secondary leading-relaxed">
              We never fabricate user counts, employer logos, earnings claims, or testimonial quotes. If a data point is unconfirmed, we label it plainly as Not Confirmed.
            </p>
          </div>

          <div className="bg-surface border border-rule rounded-xl p-3.5 space-y-1.5 text-xs">
            <span className="font-semibold text-ink block">
              2. Zero Pay-to-Rank Placement
            </span>
            <p className="text-secondary leading-relaxed">
              No platform can pay to be featured, verified, or ranked higher. Listings are ranked solely by verification freshness and relevancy to your selected country.
            </p>
          </div>

          <div className="bg-surface border border-rule rounded-xl p-3.5 space-y-1.5 text-xs">
            <span className="font-semibold text-ink block">
              3. Transparent Referral Disclosure
            </span>
            <p className="text-secondary leading-relaxed">
              If an official application link uses a referral tag, it is clearly marked Referral alongside a full disclosure. It costs the applicant nothing and never influences review content.
            </p>
          </div>

          <div className="bg-surface border border-rule rounded-xl p-3.5 space-y-1.5 text-xs">
            <span className="font-semibold text-ink block">
              4. Mandatory 14-Day Recheck Cycle
            </span>
            <p className="text-secondary leading-relaxed">
              Every active listing is revisited every 14 days. If a role reaches 14 days without a human check, it is marked Needs Recheck; at 30 days, it is hidden automatically.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/methodology"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5A35C8] hover:underline"
          >
            <span>Read our complete 10-point verification methodology</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-secondary">
            Plain answers to the most common questions regarding our listings, business model, and reviews.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <details
              key={index}
              className="border border-rule bg-sheet rounded-xl p-4 sm:p-5 group"
            >
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-ink flex items-center justify-between select-none">
                <span>{faq.q}</span>
                <span className="text-[#5A35C8] text-xs group-open:rotate-180 transition-transform">
                  &darr;
                </span>
              </summary>
              <div className="pt-3 mt-3 border-t border-rule text-xs sm:text-sm text-secondary leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 6. Corrections & Right-of-Reply Contact */}
      <section className="border border-rule bg-sheet rounded-xl p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink">
          <Mail size={15} className="text-[#5A35C8]" />
          <span>Right of Reply &amp; Corrections Policy</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          If something published about your company or a specific role listing is inaccurate, tell us. Send the specific page URL, what is inaccurate, and verifiable documentation to{' '}
          <a
            href={`mailto:corrections@${getSiteHost()}`}
            className="text-[#5A35C8] hover:underline font-medium"
          >
            corrections@{getSiteHost()}
          </a>
          .
        </p>
        <p className="text-xs text-secondary leading-relaxed">
          Standard turnaround: We respond within three working days and publish a correction or explain our editorial position.
        </p>
      </section>

      {/* Structured Data: FAQPage */}
      <FAQPageJsonLd faqs={FAQS} />
    </div>
  );
}
