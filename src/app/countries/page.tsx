import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { ArrowRight, Globe, MapPin } from "lucide-react";
import { absoluteUrl } from "@/lib/utils/siteUrl";

export const metadata: Metadata = {
  title: "Country Hubs: Human-Verified Remote AI Work by Country | TraceBase",
  description:
    "Explore verified AI training and model evaluation opportunities by country. Honest eligibility, payout rails, and local banking advice.",
  alternates: {
    canonical: absoluteUrl("/countries"),
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs text-secondary">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Work Hub
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Country Hubs</span>
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded border border-rule bg-sheet text-xs text-secondary font-medium">
            <Globe className="w-3.5 h-3.5 text-brand-ink" />
            <span>Regional Eligibility & Localized Banking Rail Audits</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-primary">
            Remote AI Work by Country
          </h1>
          <p className="text-sm sm:text-base text-secondary max-w-2xl leading-relaxed">
            Platform eligibility varies by country, banking rails, and tax frameworks. We check each platform against official employer sources so you know before you invest hours in unpaid tests.
          </p>
        </div>
      </div>

      {/* Featured Hub: Nigeria */}
      <div className="p-6 sm:p-8 rounded-xl bg-sheet border border-rule space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="text-3xl sm:text-4xl" role="img" aria-label="Nigeria">
              🇳🇬
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-primary text-lg sm:text-xl">
                  Nigeria Country Hub
                </h2>
                <span className="px-2 py-0.5 rounded text-xs bg-surface border border-rule text-secondary font-medium">
                  Flagship playbook
                </span>
              </div>
              <span className="text-xs text-secondary mt-0.5 block">
                USD Virtual Accounts (Geegpay & Grey), Domiciliary Banking, Degree Mappings
              </span>
            </div>
          </div>
          <Link
            href="/countries/nigeria"
            className="px-4 py-2.5 rounded-lg bg-[#5A35C8] hover:bg-[#4A2AB0] text-white text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 min-h-[44px]"
          >
            <span>Open Nigeria Playbook</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-3xl">
          Comprehensive practical guide for Nigerian candidates: opening ACH virtual bank accounts with NIN, connecting to Deel/Outlier, managing router power with mini DC UPS, and degree recognition tiers.
        </p>
      </div>

      {/* Country Directory Grid */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary flex items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-ink" />
            <span>All Checked Contributor Markets</span>
          </h2>
          <span className="text-xs text-secondary tabular-nums">
            {countryStats.length} Jurisdictions
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {countryStats.map((c) => (
            <div
              key={c.code}
              className="p-4 sm:p-5 rounded-xl bg-sheet border border-rule hover:border-brand-ink transition-colors flex items-center justify-between group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-primary group-hover:text-brand-ink transition-colors">
                    {c.name}
                  </span>
                  <span className="text-xs text-secondary px-1.5 py-0.5 rounded bg-surface border border-rule tabular-nums">
                    {c.code}
                  </span>
                </div>
                <p className="text-xs text-secondary line-clamp-1">
                  {c.notes || "Global contributor market"}
                </p>
              </div>

              <div className="text-right shrink-0 pl-3">
                <div className="text-xs tabular-nums font-semibold text-primary">
                  {c.openRolesCount} verified roles
                </div>
                {c.hasHub ? (
                  <Link
                    href={`/countries/${c.name.toLowerCase()}`}
                    className="text-xs text-brand-ink underline inline-flex items-center gap-1 mt-1 font-medium min-h-[44px]"
                  >
                    <span>Hub Guide</span>
                    <ArrowRight size={11} />
                  </Link>
                ) : (
                  <Link
                    href={`/jobs?country=${c.code}`}
                    className="text-xs text-secondary hover:text-brand-ink hover:underline inline-flex items-center gap-1 mt-1 transition-colors min-h-[44px]"
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
