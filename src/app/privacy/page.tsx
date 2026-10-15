import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, ArrowRight, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & NDPA 2023 Compliance | Countersign',
  description: 'How Countersign protects your personal data under the Nigeria Data Protection Act 2023 and international standards. Minimal collection, zero data selling, and 30-day statutory request handling.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NDPA 2023 & Global Privacy Standard : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-text)]">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
          Countersign is committed to absolute data minimization, radical transparency, and strict adherence to the Nigeria Data Protection Act (NDPA) 2023. We collect only what is strictly necessary to deliver verified AI job updates and evaluation services. We never sell your data, and we never track you across the web.
        </p>
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--color-muted)] pt-2 border-t border-[var(--color-border)]">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Last Audited: 15 October 2026</span>
        </div>
      </div>

      {/* Quick Rights Action Banner */}
      <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
            <Lock className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Exercise Your Privacy Rights</span>
          </div>
          <p className="text-xs text-[var(--color-muted)] max-w-lg">
            Request access to, correction of, or permanent deletion of your email and preferences. All requests receive a verified response within 30 days.
          </p>
        </div>
        <Link
          href="/privacy/request"
          className="px-4 py-2 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm"
        >
          <span>Submit Rights Request</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Body Content */}
      <div className="space-y-10 text-sm text-[var(--color-text)] leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">01</span>
            Data Controller & Scope
          </h2>
          <p className="text-[var(--color-muted)]">
            This Privacy Policy governs your use of Countersign (<code className="text-xs font-mono bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">countersign.ai</code>, <code className="text-xs font-mono bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">countersign.ng</code>). Countersign operates as an independent, human-verified remote AI work directory and specialized AI model evaluation studio managed by Jo (Ebube Okeke).
          </p>
          <p className="text-[var(--color-muted)]">
            For inquiries regarding our compliance or data governance, our Data Protection Lead can be contacted directly at <a href="mailto:privacy@countersign.ai" className="text-[var(--color-accent)] underline hover:opacity-80">privacy@countersign.ai</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">02</span>
            What Data We Collect (And What We Strictly Refuse To Collect)
          </h2>
          <p className="text-[var(--color-muted)]">
            We operate on a strict data minimization mandate:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-[var(--color-muted)]">
            <li>
              <strong className="text-[var(--color-text)]">Email Address:</strong> Collected only when you explicitly opt in to our weekly verified digest or submit an evaluation inquiry. Hashed using SHA-256 in our immutable consent ledger.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Country Selection Chip:</strong> Stored locally in your browser storage (<code className="text-xs font-mono">localStorage</code>) to personalize relevant job eligibility. Never tied to personal profiles or identity trackers on our server.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Evaluation Inquiries:</strong> Work email, organization name, technical documentation link, and project scope submitted by prospective AI evaluation studio clients.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Outbound Click Telemetry:</strong> Aggregated, anonymous click counter recording target platform link types (direct vs referral) and country chip code. No IP addresses, device fingerprints, or advertising identifiers are ever collected or stored.
            </li>
          </ul>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold">Absolute Non-Collection Guarantee:</strong>
              <p className="text-[var(--color-muted)]">
                Countersign never requests or stores Bank Verification Numbers (BVN), National Identity Numbers (NIN), passport scans, passwords, credit card credentials, or keystroke telemetry. If you encounter any entity requesting sensitive financial credentials in our name, report them immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">03</span>
            Lawful Bases for Processing under NDPA 2023
          </h2>
          <p className="text-[var(--color-muted)]">
            In accordance with Part V of the Nigeria Data Protection Act 2023, every data processing activity is justified by a lawful basis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="font-semibold text-xs text-[var(--color-text)]">Explicit Consent (Section 25)</div>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                Newsletter signups utilize double opt-in verification. Checkboxes are never pre-ticked, and consent can be revoked in one click at any time.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <div className="font-semibold text-xs text-[var(--color-text)]">Legitimate Interest (Section 25)</div>
              <p className="text-xs text-[var(--color-muted)] mt-1">
                To maintain directory integrity, verify career links, detect automated bot attacks, and respond to platform correction inquiries.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">04</span>
            Data Processors & Cross-Border Transfers
          </h2>
          <p className="text-[var(--color-muted)]">
            When data is processed outside Nigeria, it is handled exclusively by verified infrastructure partners under strict data processing agreements:
          </p>
          <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[var(--color-surface-hover)] border-b border-[var(--color-border)] text-[var(--color-muted)]">
                <tr>
                  <th className="py-2.5 px-3">Processor</th>
                  <th className="py-2.5 px-3">Role</th>
                  <th className="py-2.5 px-3">Location</th>
                  <th className="py-2.5 px-3">Data Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)] text-[var(--color-muted)]">
                <tr>
                  <td className="py-2.5 px-3 font-medium text-[var(--color-text)]">Vercel Inc.</td>
                  <td className="py-2.5 px-3">Edge Cloud Hosting & CDN</td>
                  <td className="py-2.5 px-3">United States / Global Edge</td>
                  <td className="py-2.5 px-3">Encrypted HTTP requests, temporary server logs</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-[var(--color-text)]">Resend Inc.</td>
                  <td className="py-2.5 px-3">Transactional Email Dispatch</td>
                  <td className="py-2.5 px-3">United States</td>
                  <td className="py-2.5 px-3">Double opt-in confirmation links, scope receipts</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-medium text-[var(--color-text)]">Countersign Telemetry</td>
                  <td className="py-2.5 px-3">First-Party Analytics</td>
                  <td className="py-2.5 px-3">Encrypted DB Store</td>
                  <td className="py-2.5 px-3">Anonymous event counters (zero cookie / IP tracking)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">05</span>
            Retention & Statutory Purge Limits
          </h2>
          <p className="text-[var(--color-muted)]">
            We enforce strict retention horizons. Data is never kept indefinitely:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[var(--color-muted)]">
            <li>
              <strong className="text-[var(--color-text)]">Unsubscribed Email Addresses:</strong> Retained for a 30-day grace period to prevent accidental re-subscription, then permanently and irrevocably deleted from our database.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Community Problem Reports:</strong> Anonymized and scrubbed of any contact information after 12 months.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Evaluation Inquiries:</strong> Retained while project discovery is active. If no contract is executed, records are purged within 6 months upon request.
            </li>
            <li>
              <strong className="text-[var(--color-text)]">Anonymous Telemetry:</strong> Aggregated event counts are retained for 90 days to monitor network performance and regional role demand.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">06</span>
            Your Rights as a Data Subject
          </h2>
          <p className="text-[var(--color-muted)]">
            Under Section 34 of the NDPA 2023, you maintain statutory rights over your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <strong className="text-xs font-semibold text-[var(--color-text)]">Right of Access (SAR)</strong>
              <p className="text-xs text-[var(--color-muted)]">Request a complete copy of all data held about your email address.</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <strong className="text-xs font-semibold text-[var(--color-text)]">Right to Rectification</strong>
              <p className="text-xs text-[var(--color-muted)]">Correct inaccurate or outdated subscription preferences or lead details.</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <strong className="text-xs font-semibold text-[var(--color-text)]">Right to Erasure (To Be Forgotten)</strong>
              <p className="text-xs text-[var(--color-muted)]">Demand immediate deletion of your records across our entire infrastructure.</p>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-1">
              <strong className="text-xs font-semibold text-[var(--color-text)]">Right to Withdraw Consent</strong>
              <p className="text-xs text-[var(--color-muted)]">Revoke newsletter or notification authorization without detriment or penalty.</p>
            </div>
          </div>
          <p className="text-[var(--color-muted)] pt-2">
            To exercise any right, submit our <Link href="/privacy/request" className="text-[var(--color-accent)] underline hover:opacity-80">Online Privacy Rights Form</Link> or email <a href="mailto:privacy@countersign.ai" className="text-[var(--color-accent)] underline hover:opacity-80">privacy@countersign.ai</a>. We provide a full statutory response within 30 days.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">07</span>
            72-Hour Security Incident Protocol
          </h2>
          <p className="text-[var(--color-muted)]">
            Countersign maintains an incident runbook. In the event of a verified security incident affecting personal data, our protocol requires formal notification to the Nigeria Data Protection Commission (NDPC) within 72 hours of detection, accompanied by remedial action and direct communication to affected individuals where required by law.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[var(--color-text)] flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)]">08</span>
            Contact Our Data Protection Lead
          </h2>
          <p className="text-[var(--color-muted)]">
            If you have questions, feedback, or complaints regarding our data practices:
          </p>
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-muted)] space-y-1">
            <div className="font-semibold text-[var(--color-text)]">Countersign Legal & Privacy Desk</div>
            <div>Attn: Jo (Ebube Okeke), Data Protection Lead</div>
            <div>Email: <a href="mailto:privacy@countersign.ai" className="text-[var(--color-accent)] underline">privacy@countersign.ai</a></div>
            <div>Official Portal: <Link href="/contact" className="text-[var(--color-accent)] underline">countersign.ai/contact</Link></div>
            <div>Lagos, Nigeria</div>
          </div>
        </section>
      </div>
    </div>
  );
}
