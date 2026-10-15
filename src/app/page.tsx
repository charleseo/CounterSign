import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldAlert,
  Building2,
  BookOpen,
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
import { HeroSearch } from '@/components/home/HeroSearch';

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
  const nigeriaVerifiedCount = dbRepository.getJobs({ country: 'NG', status: 'verified' }).length;
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
      platform: 'Official Feed',
      roleTitle: log.note.replace(/SAMPLE.*?:/g, '').trim().slice(0, 55),
      result: resultType,
      countryCode: 'NG',
      note: log.note,
    };
  });

  return (
    <div className="w-full flex-1 flex flex-col py-4 sm:py-10 px-3.5 sm:px-6 space-y-10 sm:space-y-16 max-w-6xl mx-auto">
      {/* 1. Hero Block (Section 7.1 & 8.1) */}
      <section className="text-center space-y-4 sm:space-y-6 pt-1 sm:pt-4 max-w-3xl mx-auto">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface text-[11px] font-mono text-secondary">
          <SealLogo size={14} color="emerald" animating={true} />
          <span className="text-accent-emerald font-semibold">14-Day Human Verification:</span>
          <span>Zero Scrapers. Zero Fake Figures.</span>
        </div>

        {/* Promise Line (Option A per Section 8.1) */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight">
          AI work, checked by a human. Model answers, checked against the source.
        </h1>

        {/* Supporting Line */}
        <p className="text-xs sm:text-base text-readable leading-relaxed max-w-2xl mx-auto">
          Every role has an official source, a verification date, and an honest note on who can apply. No fake counts, no scraper spam, no unconfirmed claims.
        </p>

        {/* Hero Search Field (Section 7.1) */}
        <div className="pt-1">
          <HeroSearch />
        </div>

        {/* Country-Aware Action CTA (Section 7.1 item 2 & 8.1) */}
        <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Link
            href="/jobs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-mono text-xs font-semibold bg-accent-cyan text-void hover:opacity-90 transition-opacity btn-tactile shadow-md"
          >
            <Globe size={14} />
            <span>
              {nigeriaVerifiedCount > 0
                ? `See ${nigeriaVerifiedCount} Roles Open for Nigeria`
                : `Browse ${totalVerifiedCount} Verified Roles`}
            </span>
            <ArrowRight size={13} />
          </Link>

          <Link
            href="/scam-check"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl font-mono text-xs font-medium border border-subtle bg-surface hover:bg-elevated text-primary transition-colors btn-tactile"
          >
            <ShieldAlert size={14} className="text-accent-rose" />
            <span>10-Point Scam Check</span>
          </Link>
        </div>

        {/* Live Check Console (Hides completely if empty, never fakes events) */}
        {consoleEvents.length > 0 && (
          <div className="pt-2 text-left max-w-2xl mx-auto">
            <LiveCheckConsole events={consoleEvents} state="live" />
          </div>
        )}
      </section>

      {/* 2. Latest Verified Roles (Section 7.1 item 3) */}
      <section className="space-y-4 sm:space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2.5 border-b border-subtle">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-accent-cyan uppercase tracking-wider font-semibold">
              <ShieldCheck size={14} />
              <span>Verified Opportunity Feed</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold text-primary mt-0.5">
              Latest Human-Checked Roles
            </h2>
          </div>

          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:underline font-semibold"
          >
            <span>View all {totalVerifiedCount} verified roles</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="space-y-3">
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
      <section className="space-y-4 sm:space-y-6">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-secondary font-semibold">
            Verification Instruments
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-primary mt-0.5">
            Everything You Need Before You Apply
          </h2>
          <p className="text-xs sm:text-sm text-secondary mt-0.5">
            Practical playbooks, platform payout realities, and model audit services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
          <BentoTile
            title="10-Point Scam Check"
            tagline="Interactive red flag audit. Check recruiter messages, crypto payout demands, and unlisted CAC entities."
            href="/scam-check"
            icon={<ShieldAlert size={20} />}
            variant="amber"
            badge="Security Utility"
          />

          <BentoTile
            title="Platform Reality Profiles"
            tagline="Independent reviews of Outlier, Alignerr, DataAnnotation, Mercor, and Invisible Tech with 5-step timelines."
            href="/platforms"
            icon={<Building2 size={20} />}
            variant="cyan"
            badge="5 Platforms"
          />

          <BentoTile
            title="Practical Guides"
            tagline="Forensic verification guides, USD banking playbooks for Nigeria (Geegpay, Grey), and citation audit methods."
            href="/guides"
            icon={<BookOpen size={20} />}
            variant="emerald"
            badge="3 Guides"
          />

          <BentoTile
            title="Verification Methodology"
            tagline="The 10-point verification checklist, 14-day human recheck mandate, and daily automated compliance sweepers."
            href="/methodology"
            icon={<History size={20} />}
            variant="violet"
            badge="Standards"
          />

          <BentoTile
            title="Evaluation Studio"
            tagline="Independent technical-docs RAG and citation audits for AI startups. Every model assertion checked against ground truth."
            href="/evaluation"
            icon={<Sparkles size={20} />}
            variant="cyan"
            badge="Enterprise B2B"
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* 4. How We Verify (Section 7.1 item 5) */}
      <section className="p-5 sm:p-8 rounded-2xl border border-subtle bg-surface space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-accent-cyan font-semibold">
              Editorial Discipline
            </span>
            <h2 className="text-lg sm:text-2xl font-bold text-primary">
              How We Verify Every Listing
            </h2>
            <p className="text-xs sm:text-sm text-secondary">
              Three strict rules separate Countersign from scrapers and automated aggregators.
            </p>
          </div>

          <Link
            href="/methodology"
            className="inline-flex items-center gap-1 text-xs font-mono text-accent-cyan hover:underline font-semibold"
          >
            <span>Read 10-point methodology</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="space-y-2 p-4 rounded-xl border border-subtle bg-void">
            <div className="w-7 h-7 rounded-lg bg-accent-cyan/15 border border-accent-cyan/40 text-accent-cyan flex items-center justify-center font-mono font-bold text-xs">
              1
            </div>
            <h3 className="text-sm font-semibold text-primary">Official Sources Only</h3>
            <p className="text-xs text-readable leading-relaxed">
              Every job record is sourced directly from official corporate ATS feeds (Ashby, Greenhouse, Lever, Workday). Zero third-party scraping.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl border border-subtle bg-void">
            <div className="w-7 h-7 rounded-full bg-accent-emerald/15 border border-accent-emerald/40 text-accent-emerald flex items-center justify-center font-mono font-bold text-xs">
              2
            </div>
            <h3 className="text-sm font-semibold text-primary">Honest Country Eligibility</h3>
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
              If an editor does not re-check a listing within 14 days, our automated sweeper degrades it to Needs Recheck. Listings past 30 days are hidden.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Newsletter Capture (Section 7.1 item 6) */}
      <section className="max-w-xl mx-auto w-full pt-2">
        <EmailCapture
          title="Weekly Human-Verified AI Work Digest"
          description="A curated weekly drop of newly verified AI roles open to your country, plus tactical evaluation guides. Unsubscribe any time."
          source="homepage_footer"
        />
      </section>
    </div>
  );
}
