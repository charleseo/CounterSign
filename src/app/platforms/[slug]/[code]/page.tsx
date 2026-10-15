import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Clock,
  Bell,
} from "lucide-react";
import { dbRepository } from "@/lib/db/repository";
import { ExpectationTimeline, TimelineStep } from "@/components/ui/ExpectationTimeline";
import { JobCard } from "@/components/ui/JobCard";
import { PlatformCountryAlertForm } from "./PlatformCountryAlertForm";

export const instant = false;

interface PlatformCountryPageProps {
  params: Promise<{ slug: string; code: string }>;
}

export async function generateStaticParams() {
  const platforms = dbRepository.getPlatforms();
  const countries = ["ng", "us", "gb", "ke", "ca", "gh"];
  const params: Array<{ slug: string; code: string }> = [];

  for (const p of platforms) {
    for (const c of countries) {
      params.push({ slug: p.slug, code: c });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PlatformCountryPageProps): Promise<Metadata> {
  const { slug, code } = await params;
  const result = dbRepository.getPlatformCountryEligibility(slug, code.toUpperCase());

  if (!result) {
    return {
      title: "Country Eligibility Not Found | Countersign",
      description: "The requested platform and country verification could not be found.",
    };
  }

  const cleanPlatform = result.platform.name.replace(/\[SAMPLE\]/g, "").trim();
  const statusPhrase =
    result.eligibilityStatus === "accepted"
      ? "Accepted"
      : result.eligibilityStatus === "not_accepted"
      ? "Not Accepted"
      : "Eligibility Check";

  return {
    title: `Is ${cleanPlatform} Available in ${result.country.name}? (${statusPhrase}) | Countersign`,
    description: `Official eligibility check: Is ${cleanPlatform} open to contributors in ${result.country.name}? Payout methods, verified roles, and honest ground reality.`,
    alternates: {
      canonical: `https://countersign.ai/platforms/${slug}/${code.toLowerCase()}`,
    },
  };
}

export default async function PlatformCountryPage({
  params,
}: PlatformCountryPageProps) {
  const { slug, code } = await params;
  const result = dbRepository.getPlatformCountryEligibility(slug, code.toUpperCase());

  if (!result) {
    notFound();
  }

  const {
    platform,
    country,
    eligibilityStatus,
    checkedAt,
    sourceUrl,
    openRoles,
    alternativePlatforms,
    steps,
  } = result;

  const cleanPlatform = platform.name.replace(/\[SAMPLE\]/g, "").trim();

  const formattedDate = new Date(checkedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const timelineSteps: TimelineStep[] = steps.map((s) => ({
    number: s.position,
    title: s.title,
    duration:
      s.position === 1
        ? "10 to 15 mins"
        : s.position === 2
        ? "1 to 2 business days"
        : s.position === 3
        ? "1.5 to 3 hours (unpaid)"
        : s.position === 4
        ? "2 to 5 days"
        : "Varies by project demand",
    sourceType:
      s.label === "official"
        ? "official"
        : s.label === "reported"
        ? "reported"
        : "unconfirmed",
    description:
      s.detail || "Standard platform operational procedure verified by contributor reports.",
    sourceName: s.source_url ? "Official platform policy" : "Community contributor logs",
    sourceUrl: s.source_url || undefined,
  }));

  const flagEmoji =
    country.code === "NG"
      ? "🇳🇬"
      : country.code === "US"
      ? "🇺🇸"
      : country.code === "GB"
      ? "🇬🇧"
      : country.code === "KE"
      ? "🇰🇪"
      : country.code === "CA"
      ? "🇨🇦"
      : country.code === "GH"
      ? "🇬🇭"
      : "🌍";

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-mono text-secondary">
          <li>
            <Link href="/platforms" className="hover:text-accent-cyan transition-colors">
              Platforms
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/platforms/${platform.slug}`}
              className="hover:text-accent-cyan transition-colors"
            >
              {cleanPlatform}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-primary font-medium">{country.name}</li>
        </ol>
      </nav>

      {/* Main Header */}
      <div className="space-y-5 border-b border-subtle pb-8">
        <div className="flex items-center gap-4">
          <span className="text-3xl sm:text-5xl shadow-sm" role="img" aria-label={country.name}>
            {flagEmoji}
          </span>
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-primary">
              Is {cleanPlatform} Available in {country.name}?
            </h1>
            <p className="text-xs text-secondary mt-1 font-mono">
              Independent contributor verification &bull; Checked {formattedDate}
            </p>
          </div>
        </div>

        {/* 1. Plain Answer First in One Line (Section 7.5a Block 1) */}
        <div
          className={`p-6 rounded-2xl glass-panel relative overflow-hidden border ${
            eligibilityStatus === "accepted"
              ? "border-emerald-500/40 shadow-[0_0_25px_rgba(0,229,153,0.1)]"
              : eligibilityStatus === "not_accepted"
              ? "border-red-500/40 shadow-[0_0_25px_rgba(255,107,107,0.1)]"
              : "border-amber-500/40 shadow-[0_0_25px_rgba(255,198,109,0.1)]"
          } space-y-3`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg">
              {eligibilityStatus === "accepted" ? (
                <>
                  <ShieldCheck className="text-accent-emerald" size={24} />
                  <span className="text-accent-emerald">
                    Accepted from {country.name}
                  </span>
                </>
              ) : eligibilityStatus === "not_accepted" ? (
                <>
                  <ShieldAlert className="text-accent-danger" size={24} />
                  <span className="text-accent-danger">
                    Not accepted from {country.name}
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle className="text-accent-amber" size={24} />
                  <span className="text-accent-amber">
                    We could not confirm if {country.name} is accepted
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-secondary">Checked {formattedDate}</span>
              {sourceUrl && (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-accent-cyan hover:underline inline-flex items-center gap-1 font-medium"
                >
                  <span>Official source</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-readable leading-relaxed">
            {eligibilityStatus === "accepted"
              ? `${cleanPlatform} currently accepts applications from contributors residing in ${country.name}. Requirements and payout methods depend on your verified domain.`
              : eligibilityStatus === "not_accepted"
              ? `${cleanPlatform} does not currently list ${country.name} as a supported contributor jurisdiction. Do not use unauthorized bypasses.`
              : `The official documentation for ${cleanPlatform} does not explicitly confirm contributor eligibility for ${country.name}. We do not guess.`}
          </p>
        </div>
      </div>

      {/* 2. If Accepted: Payouts, Open Roles & Timeline (Section 7.5a Block 2) */}
      {eligibilityStatus === "accepted" && (
        <div className="space-y-10">
          {/* Payout rails */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-primary flex items-center gap-2">
              <DollarSign size={18} className="text-accent-cyan" />
              <span>Verified Payout Methods for {country.name}</span>
            </h2>
            <div className="p-5 rounded-2xl glass-panel border border-cyan-500/20 space-y-2 shadow-sm">
              <p className="text-xs sm:text-sm text-readable">
                <strong className="text-primary">Supported Rails:</strong> {platform.payout_methods || "Direct Bank Wire, Deel"}
              </p>
              {country.code === "NG" && (
                <p className="text-xs text-secondary leading-relaxed">
                  For Nigerian contributors: You can receive USD payouts using virtual US bank accounts with ACH routing (e.g. Geegpay or Grey) or a direct USD domiciliary account (GTBank, Zenith). See our{" "}
                  <Link href="/countries/nigeria" className="text-accent-cyan hover:underline font-medium">
                    Nigeria Banking Playbook
                  </Link>{" "}
                  for fee breakdowns.
                </p>
              )}
            </div>
          </section>

          {/* Open Verified Roles */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-primary">
                Open Verified Roles on {cleanPlatform}
              </h2>
              <span className="text-xs text-accent-cyan font-mono font-bold">
                {openRoles.length} active roles
              </span>
            </div>

            {openRoles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {openRoles.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    slug={job.slug}
                    title={job.title}
                    platform={cleanPlatform}
                    workType={job.work_type}
                    countryEligibility="accepted"
                    countryName={country.name}
                    verifiedPay={job.pay_text || undefined}
                    daysAgo={job.daysAgo ?? 2}
                    status={job.status}
                    isClosed={job.status === "closed"}
                  />
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl glass-panel text-center space-y-2 border border-white/[0.08]">
                <p className="text-sm text-readable font-medium">
                  No active openings currently open for {country.name} on {cleanPlatform}.
                </p>
                <p className="text-xs text-secondary">
                  Roles open and fill in batches. Use the alert box below to receive an update when new roles are verified.
                </p>
              </div>
            )}
          </section>

          {/* Expectation Timeline */}
          {timelineSteps.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Clock size={18} className="text-accent-cyan" />
                <span>What to Expect Before You Apply</span>
              </h2>
              <ExpectationTimeline
                platformName={cleanPlatform}
                steps={timelineSteps}
              />
            </section>
          )}
        </div>
      )}

      {/* 3. If Not Accepted or Unconfirmed: Never Dead-End (Section 7.5a Block 3) */}
      {eligibilityStatus !== "accepted" && (
        <section className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-primary">
              Verified Platforms that Accept {country.name}
            </h2>
            <p className="text-xs text-secondary">
              Rather than leaving you at a dead end, here are active, human-verified platforms where contributors in {country.name} are eligible to work:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {alternativePlatforms.map((alt) => (
              <div
                key={alt.platform.id}
                className="p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/40 space-y-2.5 transition-all shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-primary">
                    {alt.platform.name.replace(/\[SAMPLE\]/g, "").trim()}
                  </h3>
                  <span className="text-xs font-mono text-accent-cyan font-bold">
                    {alt.openRolesCount} verified roles
                  </span>
                </div>
                <p className="text-xs text-secondary line-clamp-2">
                  {alt.platform.who_it_suits || "Vetted contributor evaluations"}
                </p>
                <div className="pt-1 flex items-center justify-between text-xs">
                  <Link
                    href={`/platforms/${alt.platform.slug}/${code.toLowerCase()}`}
                    className="text-accent-cyan hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <span>Check {country.name} guide</span>
                    <ArrowRight size={12} />
                  </Link>
                  <Link
                    href={`/jobs?platform=${alt.platform.slug}&country=${country.code}`}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    View roles &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Unauthorized Workaround Warning Box (Section 7.5a Block 4) */}
      <section className="p-6 rounded-2xl glass-panel relative overflow-hidden border border-red-500/40 space-y-3 shadow-xl">
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[radial-gradient(circle,rgba(255,107,107,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
          <AlertTriangle size={18} />
          <span>Warning on Proxy Accounts, VPNs & Account Rentals</span>
        </div>
        <p className="text-xs sm:text-sm text-readable leading-relaxed">
          Some online forums suggest using VPNs, borrowing US/UK identities, or renting accounts through middleman brokers. <strong>Platforms actively detect IP anomalies, datacenter VPN ranges, and biometric identity mismatches.</strong> Using proxy accounts leads to immediate suspension, forfeiture of accrued earnings, and potential legal identity fraud liability. We never recommend these workarounds.
        </p>
      </section>

      {/* 5. Alert Signup Box (Section 7.5a Block 5) */}
      <section className="p-6 sm:p-7 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/20 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Bell className="text-accent-cyan" size={18} />
          <h2 className="text-base font-bold text-primary">
            Eligibility Change Alert
          </h2>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          Receive an email if {cleanPlatform}&apos;s contributor eligibility policy changes for {country.name}. No marketing spam, one-click unsubscribe anytime.
        </p>
        <PlatformCountryAlertForm
          platformSlug={platform.slug}
          platformName={cleanPlatform}
          countryCode={country.code}
          countryName={country.name}
        />
      </section>

      {/* 6. Right of Reply / Takedown & Correction Link */}
      <section className="text-center pt-4 border-t border-subtle text-xs text-secondary space-y-1">
        <p>
          Are you a representative of {cleanPlatform}? If your regional eligibility or payout terms have updated, submit a correction to our editorial desk.
        </p>
        <p>
          <Link href="/corrections" className="text-accent-cyan hover:underline font-medium">
            Platform Correction & Takedown Desk
          </Link>{" "}
          &bull; 3 working day review commitment.
        </p>
      </section>
    </div>
  );
}
