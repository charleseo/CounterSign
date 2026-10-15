import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { ArrowRight, Globe, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Country Hubs: Human-Verified Remote AI Work by Country | Countersign",
  description:
    "Explore verified AI training and model evaluation opportunities by country. Honest eligibility, payout rails, and local banking advice.",
  alternates: {
    canonical: "https://countersign.ai/countries",
  },
};

export default function CountriesIndexPage() {
  const countries = dbRepository.getCountries();
  const allJobs = dbRepository.getJobs({ status: "verified" });

  const countryStats = countries.map((c) => {
    const roles = allJobs.filter((j) =>
      j.eligibility.some((e) => e.country_code === c.code && e.status === "accepted")
    );
    return {
      ...c,
      openRolesCount: roles.length,
      hasHub: c.code === "NG",
    };
  });

  return (
    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 -left-20 w-80 h-80 bg-[radial-gradient(circle,rgba(61,235,255,0.06)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-96 h-96 bg-[radial-gradient(circle,rgba(0,229,153,0.05)_0%,transparent_70%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-secondary">
          <Link href="/jobs" className="hover:text-accent-cyan transition-colors">
            Work Hub
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Country Hubs</span>
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium glass-pill text-accent-cyan border border-cyan-500/30">
            <Globe className="w-3.5 h-3.5" />
            <span>Regional Eligibility & Localized Banking Rail Audits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
            <span className="text-gradient-cyan">Remote AI Work by Country</span>
          </h1>
          <p className="text-sm sm:text-base text-readable max-w-2xl leading-relaxed">
            Platform eligibility varies by country, banking rails, and tax frameworks. We check each platform against official employer sources so you know before you invest hours in unpaid tests.
          </p>
        </div>
      </div>

      {/* Featured Hub: Nigeria */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel relative overflow-hidden border border-cyan-500/30 shadow-2xl space-y-4 group">
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-[radial-gradient(circle,rgba(61,235,255,0.15)_0%,transparent_70%)] pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-4xl shadow-sm" role="img" aria-label="Nigeria">
              🇳🇬
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-primary text-lg sm:text-xl">
                  Nigeria Country Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent-cyan/10 text-accent-cyan border border-cyan-500/30">
                  FLAGSHIP PLAYBOOK
                </span>
              </div>
              <span className="text-xs text-secondary mt-0.5 block">
                USD Virtual Accounts (Geegpay & Grey), Domiciliary Banking, Degree Mappings
              </span>
            </div>
          </div>
          <Link
            href="/countries/nigeria"
            className="relative group px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-void text-xs font-bold hover:shadow-[0_0_20px_rgba(61,235,255,0.4)] transition-all flex items-center gap-2 shrink-0 overflow-hidden"
          >
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <span className="relative z-10">Open Nigeria Playbook</span>
            <ArrowRight size={14} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-readable leading-relaxed relative z-10 max-w-3xl">
          Comprehensive practical guide for Nigerian candidates: opening ACH virtual bank accounts with NIN, connecting to Deel/Outlier, managing router power with mini DC UPS, and degree recognition tiers.
        </p>
      </div>

      {/* Country Directory Grid */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-cyan" />
            <span>All Checked Contributor Markets</span>
          </h2>
          <span className="text-xs font-mono text-secondary">
            {countryStats.length} Jurisdictions
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {countryStats.map((c) => (
            <div
              key={c.code}
              className="p-4 sm:p-5 rounded-2xl glass-card border border-white/[0.08] hover:border-cyan-400/40 transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-primary group-hover:text-accent-cyan transition-colors">
                    {c.name}
                  </span>
                  <span className="font-mono text-xs text-secondary px-1.5 py-0.5 rounded bg-surface border border-subtle">
                    {c.code}
                  </span>
                </div>
                <p className="text-xs text-secondary line-clamp-1">
                  {c.notes || "Global contributor market"}
                </p>
              </div>

              <div className="text-right shrink-0 pl-3">
                <div className="text-xs font-mono font-bold text-accent-cyan">
                  {c.openRolesCount} verified roles
                </div>
                {c.hasHub ? (
                  <Link
                    href={`/countries/${c.name.toLowerCase()}`}
                    className="text-[11px] text-accent-cyan hover:underline inline-flex items-center gap-1 mt-1 font-medium"
                  >
                    <span>Hub Guide</span>
                    <ArrowRight size={11} />
                  </Link>
                ) : (
                  <Link
                    href={`/jobs?country=${c.code}`}
                    className="text-[11px] text-secondary hover:text-accent-cyan hover:underline inline-flex items-center gap-1 mt-1 transition-colors"
                  >
                    <span>Browse roles</span>
                    <ArrowRight size={11} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
