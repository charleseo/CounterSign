import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & NDPA 2023 Compliance | Countersign',
  description: 'How Countersign protects your personal data under the Nigeria Data Protection Act 2023 and international standards. Minimal collection, zero data selling, and 30-day statutory request handling.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-emerald-400 border border-emerald-500/20 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>NDPA 2023 & Global Privacy Standard : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
          <span className="text-gradient-cyan">Privacy Policy</span>
        </h1>
        <p className="text-sm sm:text-base text-readable leading-relaxed max-w-3xl">
          Countersign is committed to absolute data minimization, radical transparency, and strict adherence to the Nigeria Data Protection Act (NDPA) 2023. We collect only what is strictly necessary to deliver verified AI job updates and evaluation services. We never sell your data, and we never track you across the web.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-2 border-t border-subtle">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Last Audited: 15 October 2026</span>
        </div>
      </div>

      {/* Quick Rights Action Banner */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[radial-gradient(circle,rgba(61,235,255,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 text-sm font-semibold text-primary">
            <Lock className="w-4 h-4 text-accent-cyan" />
            <span>Exercise Your Privacy Rights</span>
          </div>
          <p className="text-xs text-secondary max-w-lg leading-relaxed">
            Request access to, correction of, or permanent deletion of your email and preferences. All requests receive a verified response within 30 days.
          </p>
        </div>
        <Link
          href="/privacy/request"
          className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-void text-xs font-bold hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all flex items-center gap-2 self-start sm:self-auto shrink-0 overflow-hidden"
        >
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
          <span className="relative z-10">Submit Rights Request</span>
          <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Body Content */}
      <div className="space-y-10 text-sm text-readable leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">01</span>
            Data Controller & Scope
          </h2>
          <p className="text-secondary">
            This Privacy Policy governs your use of Countersign (<code className="text-xs font-mono bg-surface px-1.5 py-0.5 rounded border border-subtle text-accent-cyan">countersign.ai</code>, <code className="text-xs font-mono bg-surface px-1.5 py-0.5 rounded border border-subtle text-accent-cyan">countersign.ng</code>). Countersign operates as an independent, human-verified remote AI work directory and specialized AI model evaluation studio managed by Jo (Ebube Okeke).
          </p>
          <p className="text-secondary">
            For inquiries regarding our compliance or data governance, our Data Protection Lead can be contacted directly at <a href="mailto:privacy@countersign.ai" className="text-accent-cyan underline hover:text-cyan-300">privacy@countersign.ai</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">02</span>
            What Data We Collect (And What We Strictly Refuse To Collect)
          </h2>
          <p className="text-secondary">
            We operate on a strict data minimization mandate:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>
              <strong className="text-primary">Email Address:</strong> Collected only when you explicitly opt in to our weekly verified digest or submit an evaluation inquiry. Hashed using SHA-256 in our immutable consent ledger.
            </li>
            <li>
              <strong className="text-primary">Country Selection Chip:</strong> Stored locally in your browser storage (<code className="text-xs font-mono text-accent-cyan">localStorage</code>) to personalize relevant job eligibility. Never tied to personal profiles or identity trackers on our server.
            </li>
            <li>
              <strong className="text-primary">Evaluation Inquiries:</strong> Work email, organization name, technical documentation link, and project scope submitted by prospective AI evaluation studio clients.
            </li>
            <li>
              <strong className="text-primary">Outbound Click Telemetry:</strong> Aggregated, anonymous click counter recording target platform link types (direct vs referral) and country chip code. No IP addresses, device fingerprints, or advertising identifiers are ever collected or stored.
            </li>
          </ul>

          <div className="p-4 rounded-xl glass-panel border border-amber-500/30 text-xs text-amber-200 flex items-start gap-3 shadow-lg">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold text-amber-300">Absolute Non-Collection Guarantee:</strong>
              <p className="text-secondary">
                Countersign never requests or stores Bank Verification Numbers (BVN), National Identity Numbers (NIN), passport scans, passwords, credit card credentials, or keystroke telemetry. If you encounter any entity requesting sensitive financial credentials in our name, report them immediately.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">03</span>
            Lawful Bases for Processing under NDPA 2023
          </h2>
          <p className="text-secondary">
            In accordance with Part V of the Nigeria Data Protection Act 2023, every data processing activity is justified by a lawful basis:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl glass-card space-y-1.5 border border-white/[0.08]">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                <span>Explicit Consent (Section 25)</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Newsletter signups utilize double opt-in verification. Checkboxes are never pre-ticked, and consent can be revoked in one click at any time.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-card space-y-1.5 border border-white/[0.08]">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" />
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
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">04</span>
            Data Processors & Cross-Border Transfers
          </h2>
          <p className="text-secondary">
            When data is processed outside Nigeria, it is handled exclusively by verified infrastructure partners under strict data processing agreements:
          </p>
          <div className="border border-subtle rounded-xl overflow-hidden glass-panel">
            <table className="w-full text-left text-xs">
              <thead className="bg-void/60 border-b border-subtle text-secondary font-mono">
                <tr>
                  <th className="py-3 px-3.5">Processor</th>
                  <th className="py-3 px-3.5">Role</th>
                  <th className="py-3 px-3.5">Location</th>
                  <th className="py-3 px-3.5">Data Handled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-secondary">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">Vercel Inc.</td>
                  <td className="py-3 px-3.5">Edge Cloud Hosting & CDN</td>
                  <td className="py-3 px-3.5">United States / Global Edge</td>
                  <td className="py-3 px-3.5">Encrypted HTTP requests, temporary server logs</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">Resend Inc.</td>
                  <td className="py-3 px-3.5">Transactional Email Dispatch</td>
                  <td className="py-3 px-3.5">United States</td>
                  <td className="py-3 px-3.5">Double opt-in confirmation links, scope receipts</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3.5 font-medium text-primary">Countersign Telemetry</td>
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
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">05</span>
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
              <strong className="text-primary">Anonymous Telemetry:</strong> Aggregated event counts are retained for 90 days to monitor network performance and regional role demand.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">06</span>
            Your Rights as a Data Subject
          </h2>
          <p className="text-secondary">
            Under Section 34 of the NDPA 2023, you maintain statutory rights over your personal data:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl glass-card space-y-1 border border-white/[0.08]">
              <strong className="text-xs font-semibold text-primary block">Right of Access (SAR)</strong>
              <p className="text-xs text-secondary">Request a complete copy of all data held about your email address.</p>
            </div>
            <div className="p-4 rounded-xl glass-card space-y-1 border border-white/[0.08]">
              <strong className="text-xs font-semibold text-primary block">Right to Rectification</strong>
              <p className="text-xs text-secondary">Correct inaccurate or outdated subscription preferences or lead details.</p>
            </div>
            <div className="p-4 rounded-xl glass-card space-y-1 border border-white/[0.08]">
              <strong className="text-xs font-semibold text-primary block">Right to Erasure (To Be Forgotten)</strong>
              <p className="text-xs text-secondary">Demand immediate deletion of your records across our entire infrastructure.</p>
            </div>
            <div className="p-4 rounded-xl glass-card space-y-1 border border-white/[0.08]">
              <strong className="text-xs font-semibold text-primary block">Right to Withdraw Consent</strong>
              <p className="text-xs text-secondary">Revoke newsletter or notification authorization without detriment or penalty.</p>
            </div>
          </div>
          <p className="text-secondary pt-2">
            To exercise any right, submit our <Link href="/privacy/request" className="text-accent-cyan underline hover:text-cyan-300">Online Privacy Rights Form</Link> or email <a href="mailto:privacy@countersign.ai" className="text-accent-cyan underline hover:text-cyan-300">privacy@countersign.ai</a>. We provide a full statutory response within 30 days.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">07</span>
            72-Hour Security Incident Protocol
          </h2>
          <p className="text-secondary">
            Countersign maintains an incident runbook. In the event of a verified security incident affecting personal data, our protocol requires formal notification to the Nigeria Data Protection Commission (NDPC) within 72 hours of detection, accompanied by remedial action and direct communication to affected individuals where required by law.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">08</span>
            Contact Our Data Protection Lead
          </h2>
          <p className="text-secondary">
            If you have questions, feedback, or complaints regarding our data practices:
          </p>
          <div className="p-5 rounded-2xl glass-card border border-white/[0.08] text-xs text-secondary space-y-1.5">
            <div className="font-semibold text-primary text-sm">Countersign Legal & Privacy Desk</div>
            <div>Attn: Jo (Ebube Okeke), Data Protection Lead</div>
            <div>Email: <a href="mailto:privacy@countersign.ai" className="text-accent-cyan underline hover:text-cyan-300">privacy@countersign.ai</a></div>
            <div>Official Portal: <Link href="/contact" className="text-accent-cyan underline hover:text-cyan-300">countersign.ai/contact</Link></div>
            <div>Lagos, Nigeria</div>
          </div>
        </section>
      </div>
    </div>
  );
}
