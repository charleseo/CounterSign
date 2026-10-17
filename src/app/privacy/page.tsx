import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const metadata: Metadata = {
  title: 'Privacy Policy & NDPA 2023 Compliance | TraceBase',
  description: 'How TraceBase protects your personal data under the Nigeria Data Protection Act 2023 and international standards. Minimal collection, zero data selling, and 30-day statutory request handling.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12 w-full min-w-0">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border-default text-xs text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-ink" />
          <span>NDPA 2023 & Global Privacy Standard : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-3xl">
          TraceBase is committed to absolute data minimization, radical transparency, and strict adherence to the Nigeria Data Protection Act (NDPA) 2023. We collect only what is strictly necessary to deliver verified AI job updates and evaluation services. We never sell your data, and we never track you across the web.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-2 border-t border-subtle">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Last Audited: 15 October 2026</span>
        </div>
      </div>

      {/* Draft for Lawyer Review Banner */}
      <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Draft for legal review: multi-country baseline</span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          TraceBase is based in Nigeria and operates with the Nigeria Data Protection Act (NDPA) 2023 as its primary baseline. As we expand access to independent contributors across the United States, United Kingdom, Canada, Ghana, Kenya, South Africa, India, and the Philippines, this policy remains in draft pending final review by qualified local counsel to confirm full alignment with US state privacy statutes (including CCPA and CPRA), UK GDPR, Canada PIPEDA, and EU GDPR.
        </p>
      </div>

      {/* Quick Rights Action Banner */}
      <div className="p-6 rounded-xl border border-rule bg-sheet flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Lock className="w-4 h-4 text-brand-ink" />
            <span>Exercise Your Privacy Rights</span>
          </div>
          <p className="text-xs text-secondary max-w-lg leading-relaxed">
            Request access to, correction of, or permanent deletion of your email and preferences. All requests receive a verified response within 30 days.
          </p>
        </div>
        <Link
          href="/privacy/request"
          className="px-5 py-2.5 rounded-lg bg-[#5A35C8] text-white text-xs font-semibold hover:bg-[#4A2AB0] transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0 min-h-[44px]"
        >
          <span>Submit Rights Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Body Content */}
      <div className="space-y-10 text-sm text-readable leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">01</span>
            Data Controller & Scope
          </h2>
          <p className="text-secondary">
            This Privacy Policy governs your use of TraceBase (<code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-rule text-primary">{getSiteHost()}</code>). TraceBase operates as an independent, human-verified remote AI work directory and specialized AI model evaluation studio managed by Jo (Ebube Okeke).
          </p>
          <p className="text-secondary">
            For inquiries regarding our compliance or data governance, our Data Protection Lead can be contacted directly at <a href={`mailto:privacy@${getSiteHost()}`} className="text-brand-ink underline hover:text-[#4A2AB0]">privacy@{getSiteHost()}</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">02</span>
            What Data We Collect (And What We Strictly Refuse To Collect)
          </h2>
          <p className="text-secondary">
            We operate on a strict data minimization mandate:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>
              <strong className="text-primary">Email Address:</strong> Collected only when you explicitly opt in to our weekly verified digest or submit an evaluation inquiry. Hashed using SHA-256 in our secure consent record.
            </li>
            <li>
              <strong className="text-primary">Country Selection Chip:</strong> Stored locally in your browser storage (<code className="text-xs bg-surface px-1.5 py-0.5 rounded border border-rule text-primary">localStorage</code>) to personalize relevant job eligibility. Never tied to personal profiles or identity trackers on our server.
            </li>
            <li>
              <strong className="text-primary">Evaluation Inquiries:</strong> Work email, organization name, technical documentation link, and project scope submitted by prospective AI evaluation studio clients.
            </li>
            <li>
              <strong className="text-primary">Outbound Click Records:</strong> Aggregated, anonymous click counter recording target platform link types (direct vs referral) and country chip code. No IP addresses, device fingerprints, or advertising identifiers are ever collected or stored.
            </li>
          </ul>

          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold text-amber-800 dark:text-amber-300">Absolute Non-Collection Guarantee:</strong>
              <p className="text-secondary">
                TraceBase never requests or stores Bank Verification Numbers (BVN), National Identity Numbers (NIN), passport scans, passwords, credit card credentials, or keystroke tracking. If you encounter any entity requesting sensitive financial credentials in our name, report them immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">03</span>
            Lawful Bases for Processing under NDPA 2023
          </h2>
          <p className="text-secondary">
            In accordance with Part V of the Nigeria Data Protection Act 2023, every data processing activity is justified by a lawful basis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1.5">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                <span>Explicit Consent (Section 25)</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Newsletter signups utilize double opt-in verification. Checkboxes are never pre-ticked, and consent can be revoked in one click at any time.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1.5">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-ink" />
                <span>Legitimate Interest (Section 25)</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                To maintain directory integrity, verify career links, detect automated bot attacks, and respond to platform correction inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">04</span>
            Data Processors & Cross-Border Transfers
          </h2>
          <p className="text-secondary">
            When data is processed outside Nigeria, it is handled exclusively by verified infrastructure partners under strict data processing agreements:
          </p>
          <div className="border border-rule rounded-xl overflow-x-auto bg-sheet">
            <table className="w-full min-w-[500px] text-left text-xs">
              <thead className="bg-surface border-b border-rule text-secondary font-medium">
                <tr>
                  <th className="py-3 px-3.5">Processor</th>
                  <th className="py-3 px-3.5">Role</th>
                  <th className="py-3 px-3.5">Location</th>
                  <th className="py-3 px-3.5">Data Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-secondary">
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">Vercel Inc.</td>
                  <td className="py-3 px-3.5">Edge Cloud Hosting & CDN</td>
                  <td className="py-3 px-3.5">United States / Global Edge</td>
                  <td className="py-3 px-3.5">Encrypted HTTP requests, temporary server logs</td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">Resend Inc.</td>
                  <td className="py-3 px-3.5">Transactional Email Dispatch</td>
                  <td className="py-3 px-3.5">United States</td>
                  <td className="py-3 px-3.5">Double opt-in confirmation links, scope receipts</td>
                </tr>
                <tr className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">TraceBase System Metrics</td>
                  <td className="py-3 px-3.5">First-Party Analytics</td>
                  <td className="py-3 px-3.5">Encrypted DB Store</td>
                  <td className="py-3 px-3.5">Anonymous event counters (zero cookie / IP tracking)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">05</span>
            Retention & Statutory Purge Limits
          </h2>
          <p className="text-secondary">
            We enforce strict retention horizons. Data is never kept indefinitely:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-secondary">
            <li>
              <strong className="text-primary">Unsubscribed Email Addresses:</strong> Retained for a 30-day grace period to prevent accidental re-subscription, then permanently and irrevocably deleted from our database.
            </li>
            <li>
              <strong className="text-primary">Community Problem Reports:</strong> Anonymized and scrubbed of any contact information after 12 months.
            </li>
            <li>
              <strong className="text-primary">Evaluation Inquiries:</strong> Retained while project discovery is active. If no contract is executed, records are purged within 6 months upon request.
            </li>
            <li>
              <strong className="text-primary">Anonymous Metrics:</strong> Aggregated event counts are retained for 90 days to monitor network performance and regional role demand.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">06</span>
            Your Rights as a Data Subject
          </h2>
          <p className="text-secondary">
            Under Section 34 of the NDPA 2023, you maintain statutory rights over your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1">
              <strong className="text-xs font-semibold text-primary block">Right of Access (SAR)</strong>
              <p className="text-xs text-secondary">Request a complete copy of all data held about your email address.</p>
            </div>
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1">
              <strong className="text-xs font-semibold text-primary block">Right to Rectification</strong>
              <p className="text-xs text-secondary">Correct inaccurate or outdated subscription preferences or lead details.</p>
            </div>
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1">
              <strong className="text-xs font-semibold text-primary block">Right to Erasure (To Be Forgotten)</strong>
              <p className="text-xs text-secondary">Demand immediate deletion of your records across our entire infrastructure.</p>
            </div>
            <div className="p-4 rounded-xl bg-sheet border border-rule space-y-1">
              <strong className="text-xs font-semibold text-primary block">Right to Withdraw Consent</strong>
              <p className="text-xs text-secondary">Revoke newsletter or notification authorization without detriment or penalty.</p>
            </div>
          </div>
          <p className="text-secondary pt-2">
            To exercise any right, submit our <Link href="/privacy/request" className="text-brand-ink underline hover:text-[#4A2AB0]">Online Privacy Rights Form</Link> or email <a href={`mailto:privacy@${getSiteHost()}`} className="text-brand-ink underline hover:text-[#4A2AB0]">privacy@{getSiteHost()}</a>. We provide a full statutory response within 30 days.
          </p>
        </section>

        {/* Section 7: Do Not Sell or Share Personal Information */}
        <section id="do-not-sell" className="space-y-3 scroll-mt-20">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">07</span>
            Do Not Sell or Share My Personal Information
          </h2>
          <p className="text-secondary">
            TraceBase has never sold, rented, leased, traded, or shared personal data with data brokers, advertising networks, or marketing partners. We will never do so in the future.
          </p>
          <div className="p-4 rounded-xl bg-sheet border border-rule space-y-2 text-xs text-secondary leading-relaxed">
            <p>
              Under the California Consumer Privacy Act (CCPA and CPRA) and comparable US state privacy laws, visitors possess the statutory right to opt out of the sale or sharing of their personal information for cross-context behavioral advertising.
            </p>
            <p>
              Because TraceBase strictly refuses to sell data, engage in ad retargeting, or employ third-party tracking pixels, our default operational posture across all visitors is already zero sale and zero cross-site sharing.
            </p>
            <p>
              We also recognize and honor browser-level Global Privacy Control (GPC) opt-out preference signals. When your browser transmits a GPC signal, all optional analytics are suppressed automatically.
            </p>
            <p>
              If you still wish to submit a formal confirmation or record an explicit opt-out preference on file, you may do so at any time using our <Link href="/privacy/request" className="text-brand-ink underline hover:text-[#4A2AB0]">Privacy Rights Request form</Link>.
            </p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">08</span>
            72-hour security incident procedure
          </h2>
          <p className="text-secondary">
            TraceBase maintains an incident runbook. In the event of a verified security incident affecting personal data, our procedure requires formal notification to the Nigeria Data Protection Commission (NDPC) within 72 hours of detection, accompanied by remedial action and direct communication to affected individuals where required by law.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs tabular-nums px-2 py-0.5 rounded border border-rule bg-surface text-secondary font-medium">09</span>
            Contact Our Data Protection Lead
          </h2>
          <p className="text-secondary">
            If you have questions, feedback, or complaints regarding our data practices:
          </p>
          <div className="p-5 rounded-xl bg-sheet border border-rule text-xs text-secondary space-y-1.5">
            <div className="font-semibold text-primary text-sm">TraceBase Legal & Privacy Desk</div>
            <div>Attn: Jo (Ebube Okeke), Data Protection Lead</div>
            <div>Email: <a href={`mailto:privacy@${getSiteHost()}`} className="text-brand-ink underline hover:text-[#4A2AB0]">privacy@{getSiteHost()}</a></div>
            <div>Official Portal: <Link href="/contact" className="text-brand-ink underline hover:text-[#4A2AB0]">{getSiteHost()}/contact</Link></div>
            <div>Lagos, Nigeria</div>
          </div>
        </section>
      </div>
    </div>
  );
}
