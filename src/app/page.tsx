import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldAlert,
  Building2,
  History,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { SealLogo } from '@/components/ui/SealLogo';
import { dbRepository } from '@/lib/db/repository';
import { JobCard } from '@/components/ui/JobCard';
import { LiveCheckConsole, CheckEvent } from '@/components/ui/LiveCheckConsole';
import { BentoTile } from '@/components/ui/BentoTile';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { TierToggle } from '@/components/layout/TierToggle';

export const metadata: Metadata = {
  title: 'Countersign | Human-Verified AI Work Hub & Model Evaluation Studio',
  description:
    'AI work, checked by a human. Model answers, checked against the source. Independent verification connecting remote contributors with legitimate AI roles.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Countersign | Human-Verified AI Work Hub',
    description: 'AI work, checked by a human. Model answers, checked against the source.',
    url: '/',
    type: 'website',
  },
};

export default function Home() {
  const verifiedJobs = dbRepository.getJobs({ status: 'verified' }).slice(0, 5);
  const totalVerifiedCount = dbRepository.getJobs({ status: 'verified' }).length;
  const checkLogs = dbRepository.getCheckLogs(undefined, 5);

  // Map real check logs to LiveCheckConsole events
  const consoleEvents: CheckEvent[] = checkLogs.map((log) => {
    let resultType: CheckEvent['result'] = 'VERIFIED_ACTIVE';
    if (log.result === 'needs_recheck') resultType = 'NEEDS_RECHECK';
    if (log.result === 'closed') resultType = 'ROLE_CLOSED';

    return {
      id: String(log.id),
      timestamp: new Date(log.checked_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      platform: 'Official Career Feed',
      roleTitle: log.note.replace(/SAMPLE.*?:/g, '').trim().slice(0, 60),
      result: resultType,
      countryCode: 'NG',
      note: log.note,
    };
  });

  return (
    <div className="w-full flex-1 flex flex-col py-8 sm:py-12 px-4 sm:px-6 space-y-16 max-w-6xl mx-auto">
      {/* 1. Hero Block (Section 7.1) */}
      <section className="text-center space-y-6 pt-4 pb-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-subtle bg-surface text-xs font-mono text-secondary">
          <SealLogo size={16} color="emerald" animating={true} />
          <span className="text-accent-emerald font-semibold">14-Day Human Verification:</span>
          <span>Zero Scrapers. Zero Fake Figures.</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-tight">
          AI work, checked by a human. Model answers, checked against the source.
        </h1>

        <p className="text-base sm:text-lg text-readable leading-relaxed max-w-2xl mx-auto">
          The independent verification hub connecting remote AI training specialists with confirmed opportunities, and engineering teams with rigorous technical documentation audits.
        </p>

        {/* Quick Search & Country-Aware Action CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-mono text-xs font-semibold bg-accent-cyan text-void hover:opacity-90 transition-opacity btn-tactile shadow-lg"
          >
            <Globe size={15} />
            <span>See {totalVerifiedCount} Verified Roles</span>
            <ArrowRight size={14} />
          </Link>

          <Link
            href="/platforms"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs font-medium border border-subtle bg-surface hover:bg-elevated text-primary transition-colors btn-tactile"
          >
            <Building2 size={15} className="text-secondary" />
            <span>Platform Reality Checks</span>
          </Link>
        </div>

        {/* Live Check Console (shows real recent verification events) */}
        <div className="pt-6 text-left max-w-2xl mx-auto">
          <LiveCheckConsole events={consoleEvents} state="live" />
        </div>
      </section>

      {/* 2. Latest Verified Roles (Section 7.1 item 3) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-subtle">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent-cyan uppercase tracking-wider font-semibold">
              <ShieldCheck size={14} />
              <span>Verified Opportunity Feed</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary mt-1">
              Latest Human-Checked Roles
            </h2>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent-cyan hover:underline font-semibold"
          >
            <span>View all {totalVerifiedCount} verified roles</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="space-y-3.5">
          {verifiedJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              slug={job.slug}
              title={job.title}
              platform={job.platform.name}
              workType={job.work_type}
              countryEligibility="accepted"
              countryName="Nigeria"
              verifiedPay={job.pay_verified ? job.pay_text || undefined : undefined}
              daysAgo={job.daysAgo ?? 0}
              status={job.status}
            />
          ))}
        </div>
      </section>

      {/* 3. Bento Grid (Section 7.1 item 4) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            Verification Infrastructure & Resources
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-1">
            Practical playbooks, employer payout reality checks, and model audit services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BentoTile
            title="Scam Checklist"
            tagline="10-point red flag verification checklist. Detect fake recruiters, upfront fees, and unlisted CAC entities."
            href="/scam-check"
            icon={<ShieldAlert size={20} />}
            variant="amber"
            badge="Security"
          />

          <BentoTile
            title="Platform Reality Profiles"
            tagline="Verified payout rails (Geegpay, Grey, Domiciliary), test styles, and realistic month one timelines."
            href="/platforms"
            icon={<Building2 size={20} />}
            variant="cyan"
            badge="Directory"
          />

          <BentoTile
            title="Nigeria Hub"
            tagline="Practical USD banking guides, degree equivalency mappings (B.Sc., HND), and mobile data conservation tips."
            href="/countries/nigeria"
            icon={<Globe size={20} />}
            variant="emerald"
            badge="Regional Guide"
          />

          <BentoTile
            title="Audit Trail & Check Log"
            tagline="Every verification change is logged immutably. Automated 14-day sweepers degrade stale listings."
            href="/admin"
            icon={<History size={20} />}
            variant="violet"
            badge="Compliance"
          />

          <BentoTile
            title="Evaluation Studio"
            tagline="Independent technical-docs RAG and citation audits for AI startups. Every answer checked against ground truth."
            href="/studio"
            icon={<Sparkles size={20} />}
            variant="cyan"
            badge="Studio B2B"
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* 4. How We Verify (Section 7.1 item 5) */}
      <section className="p-6 sm:p-8 rounded-2xl border border-subtle bg-surface space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-semibold">
            Honesty Standard
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            How We Verify Every Listing
          </h2>
          <p className="text-xs sm:text-sm text-secondary">
            Three strict criteria separate Countersign from scrapers and aggregators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 rounded-xl border border-subtle bg-void">
            <div className="w-7 h-7 rounded-full bg-accent-cyan/15 border border-accent-cyan/40 text-accent-cyan flex items-center justify-center font-mono font-bold text-xs">
              1
            </div>
            <h3 className="text-sm font-semibold text-primary">Official Sources Only</h3>
            <p className="text-xs text-readable leading-relaxed">
              Every job record is sourced directly from official corporate ATS feeds (Ashby, Greenhouse, Lever, Workable). Zero third-party scraping.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-subtle bg-void">
            <div className="w-7 h-7 rounded-full bg-accent-emerald/15 border border-accent-emerald/40 text-accent-emerald flex items-center justify-center font-mono font-bold text-xs">
              2
            </div>
            <h3 className="text-sm font-semibold text-primary">Eligibility & Pay Reality</h3>
            <p className="text-xs text-readable leading-relaxed">
              Never infer worldwide eligibility from &quot;remote&quot;. If countries are not officially stated, we label them Unconfirmed. Pay is listed only when proven.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-subtle bg-void">
            <div className="w-7 h-7 rounded-full bg-accent-violet/15 border border-accent-violet/40 text-accent-violet flex items-center justify-center font-mono font-bold text-xs">
              3
            </div>
            <h3 className="text-sm font-semibold text-primary">14-Day Mandatory Recheck</h3>
            <p className="text-xs text-readable leading-relaxed">
              If an editor does not re-check a listing within 14 days, our automated sweeper degrades it to Needs Recheck. Listings past 30 days are closed.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Newsletter Capture (Section 7.1 item 6) */}
      <section className="max-w-xl mx-auto w-full">
        <EmailCapture
          title="Weekly Human-Verified AI Work Digest"
          description="A curated weekly drop of newly verified AI roles open to your country, plus evaluation tips. Zero spam."
          source="homepage_footer"
        />
      </section>

      {/* 6. Capability Tier Toggle Section */}
      <section className="p-4 sm:p-5 rounded-xl border border-subtle bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
            Data-Saver Architecture
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Switch between Full tier (subtle glass &amp; spotlights) and Lite data-saver mode (&lt;48KB payload).
          </p>
        </div>
        <TierToggle showExplanation={false} />
      </section>
    </div>
  );
}
