import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldAlert, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use & Service Disclaimers | Countersign',
  description: 'Terms of use for Countersign: independent information service, no guarantee of acceptance, tasks or income, acceptable use, limitation of liability, and governing law.',
};

export default function TermsOfUsePage() {
  return (
    <div className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto space-y-12">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -right-20 w-80 h-80 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-accent-cyan border border-cyan-500/30 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Agreement : Version 1.0</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
          <span className="text-gradient-cyan">Terms of Service</span>
        </h1>
        <p className="text-sm sm:text-base text-readable leading-relaxed max-w-3xl">
          Please read these terms carefully before accessing or using Countersign. By accessing our website, directory, guides, or evaluation tools, you agree to be bound by these terms.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-secondary pt-2 border-t border-subtle">
          <span>Effective Date: 14 October 2026</span>
          <span>&bull;</span>
          <span>Governing Jurisdiction: Lagos, Nigeria</span>
        </div>
      </div>

      {/* Honesty & Independence Alert Box */}
      <div className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-amber-500/30 shadow-xl space-y-3">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Core Independence & Non-Affiliation Pledge</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Countersign is an independent verification directory and specialized evaluation studio. We are not an employer, employment agency, recruiter, or staffing partner of Outlier, Alignerr, DataAnnotation, Mercor, Invisible Technologies, or any platform listed. Listing a role does not guarantee acceptance, ongoing task availability, or income.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10 text-sm text-readable leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">01</span>
            Purpose of the Service
          </h2>
          <p className="text-secondary">
            Countersign provides two primary services:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-xl glass-card space-y-1.5 border border-white/[0.08]">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan" />
                <span>The AI Work Hub</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                An editorial, human-checked directory of remote AI training and model evaluation opportunities with country-by-country eligibility analysis.
              </p>
            </div>
            <div className="p-4 rounded-xl glass-card space-y-1.5 border border-white/[0.08]">
              <div className="font-semibold text-xs text-primary flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-emerald" />
                <span>The Evaluation Studio</span>
              </div>
              <p className="text-xs text-secondary leading-relaxed">
                Technical documentation citation audits, RAG evaluation, and benchmark analysis for frontier AI startups and enterprise development teams.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">02</span>
            No Guarantee of Employment, Tasks, or Earnings
          </h2>
          <p className="text-secondary">
            You acknowledge and agree that:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>
              Countersign does not hire, screen, interview, or make contractual hiring decisions on behalf of external platforms.
            </li>
            <li>
              Stated hourly rates or pay ranges reflect official company career postings or verified public disclosures at the time of review. External platforms may change rates, compensation models, or task availability at their discretion without notice.
            </li>
            <li>
              Passing an onboarding assessment on an external platform does not guarantee continuous task allocations or project assignments. Many AI annotation platforms experience seasonal or project-dependent task fluctuations (empty queues).
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">03</span>
            Acceptable Use Policy
          </h2>
          <p className="text-secondary">
            When using Countersign, you agree NOT to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>
              Use automated bots, scrapers, or crawling scripts to harvest job data or evaluation content without written authorization.
            </li>
            <li>
              Submit fraudulent, defamatory, or intentionally misleading scam reports, reviews, or correction notices.
            </li>
            <li>
              Transmit malicious payloads, bot requests, denial-of-service traffic, or exploit attempt payloads against our API endpoints.
            </li>
            <li>
              Misrepresent yourself as an agent, contractor, or representative of Countersign when contacting platforms or candidates.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">04</span>
            User-Submitted Problem Reports & Reviews
          </h2>
          <p className="text-secondary">
            Where you submit a community problem report, scam alert, or platform feedback:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>
              You warrant that your report represents an authentic, firsthand personal experience.
            </li>
            <li>
              Countersign moderates submissions before publication. We do not publish individual employee names, unverified accusations, or personal identifying data.
            </li>
            <li>
              Platform entities maintain a statutory right of reply and a swift correction path per our <Link href="/corrections" className="text-accent-cyan underline hover:text-cyan-300">Corrections Procedure</Link>.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">05</span>
            Intellectual Property & Trademarks
          </h2>
          <p className="text-secondary">
            The name &ldquo;Countersign&rdquo;, the Seal logo, our custom design tokens, original guides, and our sample audit reports are the proprietary intellectual property of Countersign. Platform names (e.g., Outlier, Alignerr, Mercor) are the registered trademarks of their respective owners and are referenced solely for nominative identification and fair informational reporting.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">06</span>
            Limitation of Liability & Disclaimers
          </h2>
          <p className="text-secondary">
            Countersign is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. To the maximum extent permitted by applicable law, Countersign, its founder, and contributors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-secondary">
            <li>Your reliance on information, job postings, or pay rates published on this site.</li>
            <li>Account bans, terminations, or payout delays instituted by third-party AI work platforms.</li>
            <li>Foreign exchange rate fluctuations or payment processor fees associated with international banking services.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">07</span>
            Governing Law & Dispute Resolution
          </h2>
          <p className="text-secondary">
            These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any dispute, controversy, or claim arising out of or relating to these terms shall be resolved through good-faith negotiation, and failing resolution, through the exclusive jurisdiction of the courts of Lagos State, Nigeria.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded glass-pill text-accent-cyan border border-cyan-500/30">08</span>
            Contact & Notice
          </h2>
          <p className="text-secondary">
            Formal legal notices should be directed to <a href="mailto:privacy@countersign.ai" className="text-accent-cyan underline hover:text-cyan-300">privacy@countersign.ai</a> or submitted through our <Link href="/contact" className="text-accent-cyan underline hover:text-cyan-300">contact portal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
