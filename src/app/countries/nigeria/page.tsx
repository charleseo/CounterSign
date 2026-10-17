import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { JobCard } from "@/components/ui/JobCard";
import { SampleBadge } from "@/components/ui/SampleBadge";
import { ShieldCheck, AlertTriangle, Landmark, GraduationCap, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Work in Nigeria: Verified Platforms, Payouts & Credentials | TraceBase",
  description:
    "Honest guide for Nigerian remote AI contributors: verified platforms, virtual USD accounts (Geegpay & Grey), domiciliary banking, degree mappings, and scam warnings.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/countries/nigeria",
  },
};

export default function NigeriaCountryHubPage() {
  const ngJobs = dbRepository.getJobs({ status: "verified", country: "NG" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Draft Notice */}
      <div className="p-3.5 sm:p-4 rounded-xl border border-border-default bg-surface/50 flex items-center justify-between gap-3 text-xs text-secondary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true" />
          <span>Draft hub: in review. Excluded from search engines and sitemap until approved.</span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-subtle border border-rule">
          Draft
        </span>
      </div>

      {/* 1. Header & Freshness Banner */}
      <section className="space-y-4 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
          <Link href="/jobs" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Work Hub
          </Link>
          <span>/</span>
          <span className="text-secondary">Country Hubs</span>
          <span>/</span>
          <span className="text-ink font-medium">Nigeria</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl" role="img" aria-label="Nigeria Flag">
            🇳🇬
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
                AI Work in Nigeria: Verified Platforms, Payouts & Credentials
              </h1>
              <SampleBadge />
            </div>
            <p className="text-xs text-secondary mt-1 flex items-center gap-2">
              <span>Country code: NG</span>
              <span>&bull;</span>
              <span>Independent contributor guide</span>
            </p>
          </div>
        </div>

        {/* Global SAMPLE Warning */}
        <div className="p-3.5 rounded-xl border border-rule bg-surface text-secondary text-xs flex items-start gap-2.5">
          <SampleBadge />
          <p className="leading-relaxed">
            All banking fees, payment provider policies, degree mappings, and pay claims on this country hub are unverified sample placeholders pending primary source documentation.
          </p>
        </div>

        <div className="p-5 rounded-xl border border-rule bg-sheet text-sm text-readable leading-relaxed shadow-sm">
          <p className="font-semibold text-ink mb-1.5 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#5A35C8]" />
            Honest Nigeria Ground Reality
          </p>
          <p className="text-secondary text-xs sm:text-sm">
            Nigerian candidates are in high demand for English reasoning, code review, and African language fine-tuning. However, international payout restrictions, local power challenges, and unvetted account broker schemes require clear, factual guidance. Every platform and banking route below is currently an unverified sample guide pending primary source documentation.
          </p>
        </div>
      </section>

      {/* 2. USD Payout & Banking Playbook */}
      <section className="space-y-6">
        <div className="flex items-center gap-2.5">
          <Landmark className="text-[#5A35C8]" size={24} />
          <h2 className="text-xl sm:text-2xl font-bold text-ink">
            USD Payout & Banking Playbook
          </h2>
        </div>

        <p className="text-sm text-secondary leading-relaxed">
          Getting paid in US Dollars from global platforms (Deel, Outlier, Alignerr, Mercor) requires the right banking rails. Here is the verified breakdown of methods that work legitimately without risk of account suspension.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual USD Accounts */}
          <div className="p-6 rounded-xl border border-rule bg-sheet space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink text-base">
                Virtual USD Accounts (Geegpay & Grey)
              </h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#5A35C8]/10 text-[#5A35C8] border border-[#5A35C8]/30">
                Recommended
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Provides legitimate US domestic routing numbers (ACH) and account numbers registered directly in your legal name.
            </p>
            <ul className="text-xs text-readable space-y-2 list-disc pl-4">
              <li>
                <strong>Verification:</strong> Verified using Nigerian NIN (National Identification Number) or International Passport.
              </li>
              <li>
                <strong>Platform compatibility:</strong> Plugs into Deel, Outlier, Alignerr, and Mercor as US bank direct deposit (Sample).
              </li>
              <li>
                <strong>Fees:</strong> Inflow is typically free; payout conversion to Nigerian Naira (NGN) into local banks carries an estimated spread (Sample).
              </li>
            </ul>
          </div>

          {/* Domiciliary Accounts */}
          <div className="p-6 rounded-xl border border-rule bg-sheet space-y-3.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ink text-base">
                Nigerian Bank Domiciliary Accounts
              </h3>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-surface border border-rule text-secondary">
                For Large Sprints
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Traditional USD domiciliary accounts opened at Nigerian commercial banks (GTBank, Zenith Bank, First Bank).
            </p>
            <ul className="text-xs text-readable space-y-2 list-disc pl-4">
              <li>
                <strong>SWIFT wire transfers:</strong> Requires international SWIFT code, routing bank, and your 10-digit NUBAN domiciliary account number.
              </li>
              <li>
                <strong>Intermediary fees:</strong> US correspondent banks typically deduct an estimated wire fee per incoming transfer (Sample).
              </li>
              <li>
                <strong>Withdrawal options:</strong> You can withdraw USD banknotes over the counter or transfer internally to corporate FX accounts.
              </li>
            </ul>
          </div>
        </div>

        {/* Warning on PayPal */}
        <div className="p-4 rounded-xl border border-[#A8322A]/30 bg-[#A8322A]/5 space-y-2">
          <div className="flex items-center gap-2 text-[#A8322A] font-medium text-sm">
            <AlertTriangle size={18} />
            <span>Payment Methods to Avoid in Nigeria</span>
          </div>
          <p className="text-xs text-readable leading-relaxed">
            Personal PayPal accounts opened with a Nigerian IP address or phone number cannot receive incoming commercial funds under standard platform policy. <strong>Never purchase foreign PayPal accounts or use VPN bypasses.</strong> Platforms audit payment ownership against identity documents. Using unauthorized accounts triggers immediate permanent bans and forfeits pending balances.
          </p>
        </div>
      </section>

      {/* 3. Degree & Qualification Mapping */}
      <section className="space-y-6 border-t border-rule pt-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-[#5A35C8]" size={22} />
          <h2 className="text-xl font-semibold text-ink">
            Nigerian Degree &amp; Qualification Mapping
          </h2>
        </div>

        <p className="text-sm text-secondary leading-relaxed">
          Frontier AI model training platforms hire based on explicit academic benchmarks. The mappings below are sample placeholders pending primary source verification:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-rule bg-sheet">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-ink">
                B.Sc. / B.Eng. in STEM Disciplines
              </h3>
              <span className="text-xs text-[#5A35C8] flex items-center gap-1.5 font-medium">
                Bachelor&apos;s Tier Equivalent
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Degrees in Computer Science, Software Engineering, Mathematics, Physics, and Electrical Engineering from accredited universities map to General Coding and Complex Reasoning RLHF tiers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-ink">
                HND (Higher National Diploma) with Verifiable Code Portfolio
              </h3>
              <span className="text-xs text-secondary flex items-center gap-1.5 font-medium">
                Technical Qualification Tier
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              HND graduates in Computer Science or Electrical Technology qualify for code annotation and prompt evaluation when paired with an active GitHub portfolio or public technical demonstrations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-ink">
                Professional Medical (MBBS), Pharmacy (B.Pharm), &amp; Law (LL.B / BL)
              </h3>
              <span className="text-xs text-[#5A35C8] flex items-center gap-1.5 font-medium">
                Specialized Sprints
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Frontier medical and legal evaluation batches require proof of primary qualification. Having clean PDF scans of your degree certificate and credentials unlocks specialized high-tier sprints.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Electricity, Backup Power & Data Conservation */}
      <section className="space-y-6 border-t border-rule pt-8">
        <div className="flex items-center gap-2">
          <Zap className="text-[#5A35C8]" size={22} />
          <h2 className="text-xl font-semibold text-ink">
            Power Reliability &amp; Data Conservation Setup
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <h3 className="text-sm font-semibold text-ink">
              Mini DC UPS for Continuous Internet
            </h3>
            <p className="text-xs text-readable leading-relaxed">
              Timed evaluation tasks will expire if your Wi-Fi router reboots during power switches. A 12V mini DC UPS keeps your fibre or 4G LTE router running for 4 to 8 hours uninterrupted without generator noise.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-2">
            <h3 className="text-sm font-semibold text-ink">
              Data-Saver Mode & Bandwidth Conservation
            </h3>
            <p className="text-xs text-readable leading-relaxed">
              TraceBase includes a native Data-Saver mode that reduces initial page transfers to under 48 KB. When working on annotation queues, disable background cloud backups and use browser data-saver profiles to protect mobile data allowances.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Active Verified Platforms Open to Nigeria */}
      <section className="space-y-6 border-t border-rule pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink">
              Verified Platforms for Nigerian Contributors
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Verified eligibility with direct official links. Never middleman scrapers.
            </p>
          </div>
          <Link
            href="/jobs?country=NG"
            className="text-xs font-medium text-[#5A35C8] hover:underline flex items-center gap-1 min-h-[44px]"
          >
            <span>View all {ngJobs.length} roles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {ngJobs.slice(0, 4).map((job) => {
            const jobLogs = dbRepository.getCheckLogs(job.id);
            const elig = job.eligibility?.find((e) => e.country_code === "NG");
            const hasCheckLog = jobLogs.length > 0;
            const hasSourceUrl = Boolean(elig?.source_url || job.apply_url);
            const isVerified = hasCheckLog && hasSourceUrl && !job.title.includes("[SAMPLE]") && !job.is_sample;
            return (
              <JobCard
                key={job.id}
                id={job.id}
                slug={job.slug}
                title={job.title}
                platform={job.platform.name}
                workType={job.work_type}
                countryEligibility={isVerified ? "accepted" : "unconfirmed"}
                countryName="Nigeria"
                countryCode="NG"
                verifiedPay={job.pay_text || undefined}
                daysAgo={job.daysAgo ?? 2}
                status={job.status}
                isClosed={job.status === "closed"}
              />
            );
          })}
        </div>

        {/* Platform Directory Cross-Links */}
        <div className="p-4 rounded-xl border border-rule bg-sheet space-y-3">
          <h3 className="text-xs font-semibold text-secondary">
            Platform Eligibility Deep Dives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { slug: "outlier", name: "Outlier AI in Nigeria" },
              { slug: "alignerr", name: "Alignerr in Nigeria" },
              { slug: "invisible-tech", name: "Invisible Technologies in Nigeria" },
              { slug: "dataannotation", name: "DataAnnotation Tech in Nigeria" },
            ].map((item) => {
              const p = dbRepository.getPlatformBySlug(item.slug);
              const elig = p ? dbRepository.getPlatformCountryEligibility(p.slug, "NG") : null;
              const pLogs = p ? dbRepository.getCheckLogs().filter((c) => c.platform_id === p.id) : [];
              const hasCheck = pLogs.length > 0;
              const hasSource = Boolean(elig?.sourceUrl || p?.official_url);
              const isAccepted = elig?.eligibilityStatus === "accepted";

              let label = "Unconfirmed";
              let color = "text-secondary";
              if (isAccepted) {
                if (hasCheck && hasSource) {
                  label = "Accepted";
                  color = "text-[#17663F]";
                } else {
                  label = "Sample entry";
                  color = "text-secondary";
                }
              }

              return (
                <Link
                  key={item.slug}
                  href={`/platforms/${item.slug}/ng`}
                  className="p-3 rounded-lg border border-rule hover:border-[#5A35C8] bg-surface flex items-center justify-between text-secondary hover:text-ink transition-colors min-h-[44px]"
                >
                  <span>{item.name}</span>
                  <span className={`${color} font-medium text-xs`}>{label} &rarr;</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Local Scam Radar */}
      <section className="space-y-6 border-t border-rule pt-8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-[#A8322A]" size={22} />
          <h2 className="text-xl font-semibold text-ink">
            Nigeria Local Scam Radar
          </h2>
        </div>

        <div className="p-4 rounded-xl border border-[#A8322A]/30 bg-[#A8322A]/5 space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p className="font-semibold text-[#A8322A]">
            High-Risk Tactics Targeting Nigerian Job Seekers
          </p>
          <ul className="space-y-2 list-disc pl-4 text-xs">
            <li>
              <strong>Account Sellers & Brokers:</strong> Telegram and WhatsApp groups claiming to sell &quot;verified Outlier or Remotasks accounts&quot;. These are stolen or rented accounts. Once biometric reverification is triggered, the account is permanently banned and all money inside is confiscated.
            </li>
            <li>
              <strong>Upfront &quot;Training Fees&quot;:</strong> Any recruiter demanding payment for onboarding manuals, special evaluation software, or interview scheduling is fraudulent. Legitimate platforms never charge candidates.
            </li>
            <li>
              <strong>BVN & Banking Credential Theft:</strong> No genuine international evaluation client requires your Bank Verification Number (BVN) or ATM card details. Only share standard NUBAN account numbers or virtual USD ACH details for payout.
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/scam-check"
              className="inline-flex items-center min-h-[44px] py-2 text-xs font-semibold text-[#5A35C8] hover:underline transition-colors"
            >
              <span>Run the 10-Point Scam Check &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
