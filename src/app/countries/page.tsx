import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { dbRepository } from "@/lib/db/repository";
import { ArrowRight } from "lucide-react";

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-secondary">
          <Link href="/jobs" className="hover:text-primary transition-colors">
            Work Hub
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">Country Hubs</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary">
          Remote AI Work by Country
        </h1>
        <p className="text-sm text-readable max-w-2xl leading-relaxed">
          Platform eligibility varies by country, banking rails, and tax frameworks. We check each platform against official employer sources so you know before you invest hours in unpaid tests.
        </p>
      </div>

      {/* Featured Hub: Nigeria */}
      <div className="p-6 rounded-xl border border-accent-cyan/30 bg-accent-cyan/5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl" role="img" aria-label="Nigeria">
              🇳🇬
            </span>
            <div>
              <h2 className="font-semibold text-primary text-base">
                Nigeria Country Hub
              </h2>
              <span className="text-xs text-secondary">
                USD Virtual Accounts (Geegpay & Grey), Domiciliary Banking, Degree Mappings
              </span>
            </div>
          </div>
          <Link
            href="/countries/nigeria"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-accent-cyan text-[#04080F] hover:bg-accent-cyan/90 transition-colors"
          >
            <span>Open Nigeria Playbook</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-xs text-readable leading-relaxed">
          Comprehensive practical guide for Nigerian candidates: opening ACH virtual bank accounts with NIN, connecting to Deel/Outlier, managing router power with mini DC UPS, and degree recognition tiers.
        </p>
      </div>

      {/* Country Directory Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-primary">
          All Checked Countries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {countryStats.map((c) => (
            <div
              key={c.code}
              className="p-4 rounded-xl border border-subtle bg-surface hover:border-focus transition-colors flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-primary">
                    {c.name}
                  </span>
                  <span className="font-mono text-xs text-secondary">
                    ({c.code})
                  </span>
                </div>
                <p className="text-xs text-secondary line-clamp-1">
                  {c.notes || "Global contributor market"}
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs font-mono font-medium text-accent-cyan">
                  {c.openRolesCount} verified roles
                </div>
                {c.hasHub ? (
                  <Link
                    href={`/countries/${c.name.toLowerCase()}`}
                    className="text-[11px] text-accent-cyan hover:underline inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>Hub Guide</span>
                    <ArrowRight size={10} />
                  </Link>
                ) : (
                  <Link
                    href={`/jobs?country=${c.code}`}
                    className="text-[11px] text-secondary hover:text-primary hover:underline inline-flex items-center gap-0.5 mt-0.5"
                  >
                    <span>Browse roles</span>
                    <ArrowRight size={10} />
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
