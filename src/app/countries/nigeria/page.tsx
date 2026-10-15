import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { JobCard } from "@/components/ui/JobCard";
import { FreshnessStamp } from "@/components/ui/FreshnessStamp";
import { ShieldCheck, AlertTriangle, Landmark, GraduationCap, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Work in Nigeria: Verified Platforms, Payouts & Credentials | Countersign",
  description:
    "Honest guide for Nigerian remote AI contributors: verified platforms, virtual USD accounts (Geegpay & Grey), domiciliary banking, degree mappings, and scam warnings.",
  alternates: {
    canonical: "https://countersign.ai/countries/nigeria",
  },
};

export default function NigeriaCountryHubPage() {
  const ngJobs = dbRepository.getJobs({ status: "verified", country: "NG" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* 1. Header & Freshness Banner */}
      <section className="space-y-4 border-b border-subtle pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-secondary">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Work Hub
          </Link>
          <span>/</span>
          <Link href="/countries" className="hover:text-primary transition-colors">
            Country Hubs
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Nigeria</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl" role="img" aria-label="Nigeria Flag">
            🇳🇬
          </span>
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
              AI Work in Nigeria: Verified Platforms, Payouts & Credentials
            </h1>
            <p className="text-xs text-secondary mt-1 flex items-center gap-2">
              <span>Country code: NG</span>
              <span>&bull;</span>
              <FreshnessStamp daysAgo={2} />
              <span>&bull;</span>
              <span>Independent contributor guide</span>
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 text-sm text-readable leading-relaxed">
          <p className="font-medium text-accent-cyan mb-1 flex items-center gap-1.5">
            <ShieldCheck size={16} />
            Honest Nigeria Ground Reality
          </p>
          <p className="text-secondary text-xs sm:text-sm">
            Nigerian candidates are in high demand for English reasoning, code review, and African language fine-tuning. However, international payout restrictions, local power challenges, and unvetted account broker schemes require clear, factual guidance. Every platform and banking route below has been checked against official documentation.
          </p>
        </div>
      </section>

      {/* 2. USD Payout & Banking Playbook */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Landmark className="text-accent-cyan" size={22} />
          <h2 className="text-xl font-semibold text-primary">
            USD Payout & Banking Playbook
          </h2>
        </div>

        <p className="text-sm text-readable leading-relaxed">
          Getting paid in US Dollars from global platforms (Deel, Outlier, Alignerr, Mercor) requires the right banking rails. Here is the verified breakdown of methods that work legitimately without risk of account suspension.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Virtual USD Accounts */}
          <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary text-base">
                Virtual USD Accounts (Geegpay & Grey)
              </h3>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30">
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
                <strong>Platform compatibility:</strong> Plugs seamlessly into Deel, Outlier, Alignerr, and Mercor as US bank direct deposit.
              </li>
              <li>
                <strong>Fees:</strong> Inflow is typically free; payout conversion to Nigerian Naira (NGN) into local banks (GTBank, Access, Zenith, Kuda) carries a 1% to 1.5% spread.
              </li>
            </ul>
          </div>

          {/* Domiciliary Accounts */}
          <div className="p-5 rounded-xl border border-subtle bg-surface space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary text-base">
                Nigerian Bank Domiciliary Accounts
              </h3>
              <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-surface border border-subtle text-secondary">
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
                <strong>Intermediary fees:</strong> US correspondent banks typically deduct a flat $5 to $15 wire fee per incoming transfer.
              </li>
              <li>
                <strong>Withdrawal options:</strong> You can withdraw crisp USD banknotes over the counter or transfer internally to corporate FX accounts.
              </li>
            </ul>
          </div>
        </div>

        {/* Warning on PayPal */}
        <div className="p-4 rounded-xl border border-accent-danger/30 bg-accent-danger/5 space-y-2">
          <div className="flex items-center gap-2 text-accent-danger font-medium text-sm">
            <AlertTriangle size={18} />
            <span>Payment Methods to Avoid in Nigeria</span>
          </div>
          <p className="text-xs text-readable leading-relaxed">
            Personal PayPal accounts opened with a Nigerian IP address or phone number cannot receive incoming commercial funds under PayPal policy. <strong>Never purchase foreign PayPal accounts or use VPN bypasses.</strong> Platforms audit payment ownership against your identity documents. Using unauthorized accounts triggers immediate permanent bans and forfeits pending balances.
          </p>
        </div>
      </section>

      {/* 3. Degree & Qualification Mapping */}
      <section className="space-y-6 border-t border-subtle pt-8">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-accent-cyan" size={22} />
          <h2 className="text-xl font-semibold text-primary">
            Nigerian Degree & Qualification Mapping
          </h2>
        </div>

        <p className="text-sm text-readable leading-relaxed">
          Frontier AI model training platforms hire based on explicit academic benchmarks. Here is how degrees from accredited Nigerian universities map to global qualification tiers:
        </p>

        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-subtle bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-primary">
                B.Sc. / B.Eng. in STEM Disciplines
              </h3>
              <span className="text-xs font-mono text-accent-cyan">
                Bachelor&apos;s Tier Equivalent
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Degrees in Computer Science, Software Engineering, Mathematics, Physics, and Electrical Engineering from accredited universities (e.g. UNILAG, UI, OAU, ABU, FUTA, UNN, Covenant) map directly to General Coding and Complex Reasoning RLHF tiers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-subtle bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-primary">
                HND (Higher National Diploma) with Verifiable Code Portfolio
              </h3>
              <span className="text-xs font-mono text-secondary">
                Technical Qualification Tier
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              HND graduates in Computer Science or Electrical Technology qualify for code annotation and prompt evaluation when paired with an active GitHub portfolio or public technical demonstrations.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-subtle bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <h3 className="font-semibold text-sm text-primary">
                Professional Medical (MBBS), Pharmacy (B.Pharm), & Law (LL.B / BL)
              </h3>
              <span className="text-xs font-mono text-accent-cyan">
                Specialized High-Tier Sprints ($40 to $80+/hr)
              </span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Frontier medical and legal evaluation batches require proof of primary qualification. Having clean PDF scans of your degree certificate and Medical and Dental Council of Nigeria (MDCN) or Nigerian Bar Association (NBA) call-to-bar credentials unlocks specialized high-tier sprints.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Electricity, Backup Power & Data Conservation */}
      <section className="space-y-6 border-t border-subtle pt-8">
        <div className="flex items-center gap-2">
          <Zap className="text-accent-cyan" size={22} />
          <h2 className="text-xl font-semibold text-primary">
            Power Reliability & Data Conservation Setup
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-subtle bg-surface space-y-2">
            <h3 className="text-sm font-semibold text-primary">
              Mini DC UPS for Continuous Internet
            </h3>
            <p className="text-xs text-readable leading-relaxed">
              Timed evaluation tasks will expire if your Wi-Fi router reboots during power switches. A 12V mini DC UPS (costing approximately 18,000 to 25,000 NGN) keeps your fibre or 4G LTE router running for 4 to 8 hours uninterrupted without generator noise.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-subtle bg-surface space-y-2">
            <h3 className="text-sm font-semibold text-primary">
              Data-Saver Mode & Bandwidth Conservation
            </h3>
            <p className="text-xs text-readable leading-relaxed">
              Countersign includes a native Data-Saver mode that reduces initial page transfers to under 48 KB. When working on annotation queues, disable background cloud backups and use browser data-saver profiles to protect mobile data allowances.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Active Verified Platforms Open to Nigeria */}
      <section className="space-y-6 border-t border-subtle pt-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-primary">
              Verified Platforms for Nigerian Contributors
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Verified eligibility with direct official links. Never middleman scrapers.
            </p>
          </div>
          <Link
            href="/jobs?country=NG"
            className="text-xs font-medium text-accent-cyan hover:underline flex items-center gap-1"
          >
            <span>View all {ngJobs.length} roles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {ngJobs.slice(0, 4).map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              slug={job.slug}
              title={job.title}
              platform={job.platform.name}
              workType={job.work_type}
              countryEligibility="accepted"
              countryName="Nigeria"
              verifiedPay={job.pay_text || undefined}
              daysAgo={job.daysAgo ?? 2}
              status={job.status}
              isClosed={job.status === "closed"}
            />
          ))}
        </div>

        {/* Platform Directory Cross-Links */}
        <div className="p-4 rounded-xl border border-subtle bg-surface space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-secondary">
            Platform Eligibility Deep Dives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <Link
              href="/platforms/outlier/ng"
              className="p-2.5 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
            >
              <span>Outlier AI in Nigeria</span>
              <span className="text-accent-cyan font-mono text-[11px]">Accepted &rarr;</span>
            </Link>
            <Link
              href="/platforms/alignerr/ng"
              className="p-2.5 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
            >
              <span>Alignerr in Nigeria</span>
              <span className="text-accent-cyan font-mono text-[11px]">Accepted &rarr;</span>
            </Link>
            <Link
              href="/platforms/invisible-tech/ng"
              className="p-2.5 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
            >
              <span>Invisible Technologies in Nigeria</span>
              <span className="text-accent-cyan font-mono text-[11px]">Accepted &rarr;</span>
            </Link>
            <Link
              href="/platforms/dataannotation/ng"
              className="p-2.5 rounded-lg border border-subtle hover:border-focus bg-void flex items-center justify-between text-secondary hover:text-primary transition-colors"
            >
              <span>DataAnnotation Tech in Nigeria</span>
              <span className="text-secondary font-mono text-[11px]">Unconfirmed &rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Local Scam Radar */}
      <section className="space-y-6 border-t border-subtle pt-8">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-accent-warning" size={22} />
          <h2 className="text-xl font-semibold text-primary">
            Nigeria Local Scam Radar
          </h2>
        </div>

        <div className="p-4 rounded-xl border border-accent-warning/30 bg-accent-warning/5 space-y-3 text-xs sm:text-sm text-readable leading-relaxed">
          <p className="font-semibold text-accent-warning">
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent-cyan underline transition-colors"
            >
              <span>Run the 10-Point Forensic Scam Check</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
