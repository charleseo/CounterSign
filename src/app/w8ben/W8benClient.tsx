'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Globe,
} from 'lucide-react';

interface CountryTaxInfo {
  code: string;
  name: string;
  ftinName: string;
  ftinFormat: string;
  treatyStatus: string;
  notes: string;
}

const COUNTRIES_TAX: CountryTaxInfo[] = [
  {
    code: 'NG',
    name: 'Nigeria',
    ftinName: 'National Identification Number (NIN) or FIRS Tax ID (TIN)',
    ftinFormat: '11 digits (NIN) or 10-12 digits (JTB/FIRS TIN)',
    treatyStatus: 'No formal bilateral tax treaty, but 0% withholding applies',
    notes:
      'Because all evaluation work is performed physically outside the United States, your income is classified as foreign-source under US Internal Revenue Code Sections 861 and 862. Completing W-8BEN confirms you are a non-US person, ensuring Deel and Outlier withhold 0% US tax.',
  },
  {
    code: 'KE',
    name: 'Kenya',
    ftinName: 'KRA Personal Identification Number (PIN)',
    ftinFormat: '11 characters starting with A and ending with a letter (e.g. A012345678Z)',
    treatyStatus: 'No bilateral treaty; 0% foreign-source withholding applies',
    notes:
      'Enter your standard KRA PIN in Line 6a. Your remote contractor earnings are subject to local Kenyan income tax, not US tax withholding.',
  },
  {
    code: 'GH',
    name: 'Ghana',
    ftinName: 'Ghana Card PIN (TIN)',
    ftinFormat: 'GHA-XXXXXXXXX-X format',
    treatyStatus: 'Foreign-source income exemption (0% US withholding)',
    notes:
      'The Ghana Revenue Authority recognizes the Ghana Card PIN as the official Taxpayer Identification Number. Enter this in Line 6a.',
  },
  {
    code: 'ZA',
    name: 'South Africa',
    ftinName: 'SARS Tax Reference Number or 13-digit National ID',
    ftinFormat: '10 digits (SARS) or 13 digits (National ID)',
    treatyStatus: 'US-South Africa Tax Treaty (Article 14 independent services)',
    notes:
      'South Africa has an active tax treaty with the US. Independent personal services performed outside the US are exempt from US withholding.',
  },
  {
    code: 'IN',
    name: 'India',
    ftinName: 'Permanent Account Number (PAN)',
    ftinFormat: '10 alphanumeric characters (e.g. ABCDE1234F)',
    treatyStatus: 'US-India Tax Treaty (Article 15 independent personal services)',
    notes:
      'Enter your 10-character PAN card number in Line 6a. Deel and Outlier require PAN validation to approve contractor profiles.',
  },
  {
    code: 'PH',
    name: 'Philippines',
    ftinName: 'Bureau of Internal Revenue (BIR) TIN',
    ftinFormat: '9 to 12 digits',
    treatyStatus: 'US-Philippines Tax Treaty (Article 15 independent services)',
    notes:
      'Enter your BIR TIN in Line 6a. Work completed remotely from the Philippines is exempt from US federal withholding tax.',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    ftinName: 'National Insurance Number (NINO) or Unique Taxpayer Reference (UTR)',
    ftinFormat: '2 letters, 6 numbers, 1 letter (NINO) or 10 digits (UTR)',
    treatyStatus: 'US-UK Double Taxation Treaty (Article 14)',
    notes:
      'UK residents claim 0% US withholding under the comprehensive US-UK double taxation agreement by citing their UTR or NINO.',
  },
  {
    code: 'CA',
    name: 'Canada',
    ftinName: 'Social Insurance Number (SIN)',
    ftinFormat: '9 digits (e.g. 123-456-789)',
    treatyStatus: 'US-Canada Tax Treaty (Article VII business profits)',
    notes:
      'Canadian sole proprietors and contractors provide their 9-digit SIN. Services performed from Canadian soil are exempt from US withholding.',
  },
];

export function W8benClient() {
  const [selectedCountry, setSelectedCountry] = useState<string>('NG');

  const countryInfo =
    COUNTRIES_TAX.find((c) => c.code === selectedCountry) || COUNTRIES_TAX[0];

  return (
    <div className="space-y-8">
      {/* Country Switcher */}
      <div className="rounded-xl border border-rule bg-sheet p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="text-xs font-bold text-ink flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-[#5A35C8]" />
              Select your country of residence:
            </span>
            <p className="text-xs text-secondary">
              See the exact foreign tax ID document and treaty rules for your country.
            </p>
          </div>

          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-2 rounded-xl border border-rule bg-surface text-xs text-ink font-medium focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
          >
            {COUNTRIES_TAX.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} ({c.code})
              </option>
            ))}
          </select>
        </div>

        {/* Selected Country Summary Box */}
        <div className="p-4 rounded-xl border border-[#5A35C8]/30 bg-[#5A35C8]/5 space-y-2 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-secondary text-[11px]">What to enter in Line 6a (Foreign Tax ID):</span>
              <div className="text-sm font-bold text-ink">{countryInfo.ftinName}</div>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold self-start sm:self-auto">
              0% US withholding applies
            </span>
          </div>

          <p className="text-secondary leading-relaxed pt-1 border-t border-rule">
            {countryInfo.notes}
          </p>
        </div>
      </div>

      {/* Line-by-Line Form W-8BEN Breakdown */}
      <div className="rounded-xl border border-rule bg-sheet p-6 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-ink">
            Line-by-line Form W-8BEN instructions
          </h2>
          <p className="text-xs text-secondary">
            Follow this guide when completing the digital W-8BEN form inside Deel, Outlier, or Alignerr.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          {/* Line 1 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Line 1: Name of individual</span>
              <span className="text-[10px] text-[#5A35C8] font-mono">Part I</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Enter your full legal name exactly as it appears on your passport, national identity card, or driver&apos;s license. It must match the name on your platform payout account (e.g. your Deel profile or Geegpay account).
            </p>
          </div>

          {/* Line 2 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Line 2: Country of citizenship</span>
              <span className="text-[10px] text-[#5A35C8] font-mono">Part I</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Enter your legal country of citizenship (e.g. &quot;Nigeria&quot;, &quot;Kenya&quot;, &quot;Ghana&quot;, &quot;United Kingdom&quot;). Do not enter the United States.
            </p>
          </div>

          {/* Line 3 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Line 3: Permanent residence address</span>
              <span className="text-[10px] text-[#5A35C8] font-mono">Part I</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Enter your genuine physical home address in your home country. Never enter a PO Box, virtual office address, forwarding agent address, or US address. Entering a US address will trigger mandatory IRS tax withholding.
            </p>
          </div>

          {/* Line 5 */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Line 5: US taxpayer identification number (SSN / ITIN)</span>
              <span className="text-[10px] text-amber-500 font-semibold">Leave blank</span>
            </div>
            <p className="text-secondary leading-relaxed">
              <strong className="text-ink">Leave this line blank!</strong> As a non-US resident working remotely from outside the US, you do not have and do not need a US Social Security Number or ITIN.
            </p>
          </div>

          {/* Line 6a */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5 border-l-4 border-l-[#5A35C8]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Line 6a: Foreign tax identifying number (FTIN)</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Required</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Enter your local national tax identification number. For {countryInfo.name}, enter your <strong className="text-ink">{countryInfo.ftinName}</strong>. If your country does not issue tax numbers to individuals, check box 6b (&quot;FTIN not legally required&quot;), but providing your national ID prevents onboarding delays.
            </p>
          </div>

          {/* Part II */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Part II: Claim of tax treaty benefits (Lines 9 & 10)</span>
              <span className="text-[10px] text-[#5A35C8] font-mono">Part II</span>
            </div>
            <p className="text-secondary leading-relaxed">
              On Deel and Outlier, the digital form automatically populates treaty claims based on your citizenship. If your country has a treaty (e.g. South Africa, UK, India), it selects the independent personal services article. If your country does not have a formal treaty (e.g. Nigeria, Kenya), the platform applies the statutory 0% foreign-source income exclusion under IRC Section 861/862 because all work is physically completed outside US territory.
            </p>
          </div>

          {/* Part III */}
          <div className="p-4 rounded-xl border border-rule bg-surface/50 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Part III: Certification and digital signature</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Sign & date</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Check the certification boxes confirming that you are not a US citizen or resident alien, and type your legal name to apply your digital signature. Form W-8BEN remains valid for three full calendar years from the date of signing.
            </p>
          </div>
        </div>
      </div>

      {/* Three Costly Mistakes to Avoid */}
      <div className="rounded-xl border border-rule bg-sheet p-5 space-y-4">
        <h3 className="text-base font-bold text-ink flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Three critical mistakes that delay onboarding
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg border border-rule bg-surface/50 space-y-1.5">
            <span className="font-semibold text-ink">1. Name mismatch</span>
            <p className="text-secondary leading-relaxed">
              Your name on Form W-8BEN must match your ID and payout bank account character-for-character. If your bank uses a middle name, include it on your W-8BEN.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-rule bg-surface/50 space-y-1.5">
            <span className="font-semibold text-ink">2. Entering a VPN address</span>
            <p className="text-secondary leading-relaxed">
              Never enter a US or foreign address on Line 3. Platforms cross-check your residential address with your bank location. Contradictions result in fraud flags.
            </p>
          </div>
          <div className="p-3.5 rounded-lg border border-rule bg-surface/50 space-y-1.5">
            <span className="font-semibold text-ink">3. Confusing W-8BEN with W-9</span>
            <p className="text-secondary leading-relaxed">
              If a platform asks you to fill out Form W-9, stop immediately. Form W-9 is strictly for US citizens and green card holders. Request Form W-8BEN instead.
            </p>
          </div>
        </div>
      </div>

      {/* Payout Calculator Banner */}
      <div className="rounded-xl border border-rule bg-sheet p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-ink">
            Now calculate your net earnings after bank transfer fees
          </h3>
          <p className="text-xs text-secondary max-w-xl">
            Compare 8 payout rails across Deel, Geegpay, AirTM, and USD domiciliary accounts.
          </p>
        </div>
        <Link
          href="/payout-calculator"
          className="px-4 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap min-h-[44px]"
        >
          <span>Open payout calculator</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
