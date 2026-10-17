'use client';

import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  ArrowRight,
  TrendingUp,
  Percent,
  CreditCard,
  Building2,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowDownRight,
} from 'lucide-react';

interface PayoutRail {
  id: string;
  name: string;
  provider: string;
  description: string;
  supportedCountries: string[];
  fixedFeeUsd: number;
  percentageFee: number;
  exchangeRateMultiplier: number; // e.g. parallel market rate NGN per USD
  currencySymbol: string;
  currencyCode: string;
}

const PAYOUT_RAILS: PayoutRail[] = [
  {
    id: 'deel-geegpay-ngn',
    name: 'Deel to Geegpay (Naira)',
    provider: 'Alignerr, Invisible Technologies',
    description: 'Deel contract payout transferred to virtual Geegpay USD account and converted to Naira.',
    supportedCountries: ['NG'],
    fixedFeeUsd: 0,
    percentageFee: 1.5,
    exchangeRateMultiplier: 1650,
    currencySymbol: '₦',
    currencyCode: 'NGN',
  },
  {
    id: 'airtm-ngn',
    name: 'AirTM to Nigerian bank',
    provider: 'Outlier AI',
    description: 'Direct AirTM payout cashed out to local bank accounts via peer cashier network.',
    supportedCountries: ['NG'],
    fixedFeeUsd: 0.4,
    percentageFee: 2.8,
    exchangeRateMultiplier: 1630,
    currencySymbol: '₦',
    currencyCode: 'NGN',
  },
  {
    id: 'dom-account-usd',
    name: 'Nigerian USD domiciliary bank account',
    provider: 'Alignerr, Outlier, Mercor',
    description: 'Direct wire to local Access, GTBank, or Zenith dom account. Cash withdrawn in USD notes.',
    supportedCountries: ['NG'],
    fixedFeeUsd: 5.0,
    percentageFee: 0.5,
    exchangeRateMultiplier: 1670,
    currencySymbol: '₦',
    currencyCode: 'NGN (Parallel market cash)',
  },
  {
    id: 'deel-wise-gbp',
    name: 'Deel or Wise to UK bank account',
    provider: 'Alignerr, Mercor, Invisible',
    description: 'Low-cost bank transfer directly into UK current account in British Pounds.',
    supportedCountries: ['GB', 'UK'],
    fixedFeeUsd: 0,
    percentageFee: 0.6,
    exchangeRateMultiplier: 0.77,
    currencySymbol: '£',
    currencyCode: 'GBP',
  },
  {
    id: 'ach-us',
    name: 'Direct US ACH bank deposit',
    provider: 'All platforms',
    description: 'Direct clearing house transfer into US checking or savings account.',
    supportedCountries: ['US'],
    fixedFeeUsd: 0,
    percentageFee: 0,
    exchangeRateMultiplier: 1.0,
    currencySymbol: '$',
    currencyCode: 'USD',
  },
  {
    id: 'eft-cad',
    name: 'Direct Canadian EFT deposit',
    provider: 'All platforms',
    description: 'Direct transfer into Canadian bank account in Canadian dollars.',
    supportedCountries: ['CA'],
    fixedFeeUsd: 0,
    percentageFee: 1.0,
    exchangeRateMultiplier: 1.38,
    currencySymbol: 'CA$',
    currencyCode: 'CAD',
  },
  {
    id: 'deel-mpesa-kes',
    name: 'Deel to Kenyan M-Pesa',
    provider: 'Alignerr, Invisible',
    description: 'Direct mobile money transfer to Safaricom M-Pesa wallet in Kenya.',
    supportedCountries: ['KE'],
    fixedFeeUsd: 0,
    percentageFee: 1.8,
    exchangeRateMultiplier: 129,
    currencySymbol: 'KSh',
    currencyCode: 'KES',
  },
  {
    id: 'grey-momo-ghs',
    name: 'Grey or Deel to Ghana Mobile Money',
    provider: 'Alignerr, Invisible',
    description: 'Payout routed to MTN or Vodafone MoMo wallet in Ghanaian Cedis.',
    supportedCountries: ['GH'],
    fixedFeeUsd: 0,
    percentageFee: 2.0,
    exchangeRateMultiplier: 16.2,
    currencySymbol: 'GH₵',
    currencyCode: 'GHS',
  },
];

const PRESET_HOURLY_RATES = [15, 20, 25, 30, 40, 50];

export function PayoutCalculatorClient() {
  const [hourlyRate, setHourlyRate] = useState<number>(20);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(20);
  const [selectedRailId, setSelectedRailId] = useState<string>('deel-geegpay-ngn');

  const selectedRail = useMemo(() => {
    return PAYOUT_RAILS.find((r) => r.id === selectedRailId) || PAYOUT_RAILS[0];
  }, [selectedRailId]);

  // Calculations
  const metrics = useMemo(() => {
    const weeklyGrossUsd = hourlyRate * hoursPerWeek;
    const monthlyGrossUsd = weeklyGrossUsd * 4.333; // Average weeks per month

    const calculateNet = (rail: PayoutRail) => {
      const fixedDeduction = rail.fixedFeeUsd;
      const percentDeduction = (monthlyGrossUsd * rail.percentageFee) / 100;
      const totalFeesUsd = fixedDeduction + percentDeduction;
      const netUsd = Math.max(0, monthlyGrossUsd - totalFeesUsd);
      const localNet = netUsd * rail.exchangeRateMultiplier;

      return {
        rail,
        monthlyGrossUsd,
        totalFeesUsd,
        netUsd,
        localNet,
      };
    };

    const currentNet = calculateNet(selectedRail);
    const allRailsComparison = PAYOUT_RAILS.map(calculateNet);

    return {
      weeklyGrossUsd,
      monthlyGrossUsd,
      currentNet,
      allRailsComparison,
    };
  }, [hourlyRate, hoursPerWeek, selectedRail]);

  return (
    <div className="space-y-8">
      {/* Input Controls Panel */}
      <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
          <div className="space-y-1">
            <h2 className="text-sm sm:text-base font-bold text-primary flex items-center gap-2">
              <DollarSign size={18} className="text-emerald-600 dark:text-emerald-400" />
              <span>Earnings and hourly rate inputs</span>
            </h2>
            <p className="text-xs text-secondary">
              Calculate exact take-home pay after deducting withdrawal fees and foreign exchange spreads.
            </p>
          </div>

          <div className="text-xs text-secondary">
            Estimated gross:{' '}
            <span className="font-bold text-primary tabular-nums font-mono text-sm">
              ${metrics.weeklyGrossUsd.toLocaleString()}/wk
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hourly Rate Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-secondary">Hourly pay rate (USD)</label>
              <div className="flex items-center gap-1">
                <span className="text-xs text-secondary font-mono">$</span>
                <input
                  type="number"
                  min={5}
                  max={200}
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-20 text-sm font-bold bg-surface border border-rule rounded-lg p-1.5 text-center font-mono text-primary focus:outline-none focus:border-[var(--brand-ink)]"
                />
                <span className="text-xs text-secondary">/hr</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {PRESET_HOURLY_RATES.map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setHourlyRate(rate)}
                  className={`px-3 py-1 text-xs rounded-lg border font-mono transition-colors ${
                    hourlyRate === rate
                      ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary font-bold'
                      : 'border-rule bg-surface text-secondary hover:text-primary'
                  }`}
                >
                  ${rate}/hr
                </button>
              ))}
            </div>
          </div>

          {/* Hours Per Week Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-secondary">Hours worked per week</label>
              <span className="text-sm font-bold font-mono text-primary">{hoursPerWeek} hrs/week</span>
            </div>

            <input
              type="range"
              min={2}
              max={50}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
              className="w-full accent-[var(--brand-ink)] cursor-pointer"
            />

            <div className="flex justify-between text-[11px] text-secondary font-mono">
              <span>Part-time (10 hrs)</span>
              <span>Standard (20 hrs)</span>
              <span>Full-time (40 hrs)</span>
            </div>
          </div>
        </div>

        {/* Payout Rail Selector Strip */}
        <div className="space-y-3 pt-4 border-t border-rule">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Select payout rail and banking route
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {PAYOUT_RAILS.map((rail) => (
              <button
                key={rail.id}
                type="button"
                onClick={() => setSelectedRailId(rail.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                  selectedRailId === rail.id
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] shadow-sm'
                    : 'border-rule bg-surface hover:border-subtle'
                }`}
              >
                <div>
                  <span className="block font-bold text-xs text-primary">{rail.name}</span>
                  <span className="block text-[11px] text-secondary mt-0.5 line-clamp-1">
                    {rail.provider}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-secondary pt-1 border-t border-rule font-mono">
                  <span>Fee: {rail.percentageFee}%</span>
                  <span className="font-semibold text-primary">{rail.currencyCode}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Display Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Big Number Card */}
        <div className="lg:col-span-2 rounded-2xl border border-emerald-500/30 bg-sheet p-6 sm:p-7 space-y-5">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 size={13} />
              <span>Estimated real monthly take-home</span>
            </div>
            <span className="text-xs text-secondary">{selectedRail.name}</span>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-black text-primary tabular-nums tracking-tight font-mono">
              {selectedRail.currencySymbol}
              {Math.round(metrics.currentNet.localNet).toLocaleString()}
            </div>
            <p className="text-xs sm:text-sm text-secondary">
              Net payout deposited into your account per month (~${Math.round(metrics.currentNet.netUsd).toLocaleString()} USD).
            </p>
          </div>

          {/* Breakdown Rows */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface border border-rule text-center">
            <div>
              <span className="text-[11px] text-secondary block">Gross earnings</span>
              <span className="text-sm font-bold text-primary font-mono tabular-nums">
                ${Math.round(metrics.monthlyGrossUsd).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-secondary block">Estimated fees</span>
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 font-mono tabular-nums">
                -${Math.round(metrics.currentNet.totalFeesUsd).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-secondary block">Effective fee rate</span>
              <span className="text-sm font-bold text-secondary font-mono tabular-nums">
                {((metrics.currentNet.totalFeesUsd / metrics.monthlyGrossUsd) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Context / Tip Card */}
        <div className="rounded-2xl border border-rule bg-sheet p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-primary">
              <Info size={16} className="text-[var(--brand-ink)]" />
              <span>How to maximize take-home pay</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              When working on platforms like Alignerr and Invisible, routing USD through Deel to an official Nigerian USD domiciliary account or Geegpay provides significantly higher net Naira than platforms restricted to PayPal or standard wire fees.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-surface border border-rule text-[11px] text-secondary">
            <span className="font-semibold text-primary block">Exchange rate basis:</span>
            <span>Reflects current market conversion rates. Bank spread calculations updated weekly.</span>
          </div>
        </div>
      </div>

      {/* Comparison Across All Rails Table */}
      <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
        <h3 className="text-sm font-bold text-primary">
          Compare all payout options for your current ${hourlyRate}/hr ({hoursPerWeek} hrs/wk) earnings
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-rule text-secondary">
                <th className="py-2.5 px-3 font-semibold">Payout rail</th>
                <th className="py-2.5 px-3 font-semibold">Typical platform</th>
                <th className="py-2.5 px-3 font-semibold tabular-nums text-right">Gross USD</th>
                <th className="py-2.5 px-3 font-semibold tabular-nums text-right">Fee loss</th>
                <th className="py-2.5 px-3 font-semibold tabular-nums text-right">Net in local currency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule font-mono">
              {metrics.allRailsComparison.map(({ rail, monthlyGrossUsd, totalFeesUsd, localNet }) => (
                <tr
                  key={rail.id}
                  className={`hover:bg-surface/50 transition-colors ${
                    selectedRailId === rail.id ? 'bg-[var(--brand-tint)]' : ''
                  }`}
                >
                  <td className="py-2.5 px-3 font-sans font-bold text-primary">
                    {rail.name}
                  </td>
                  <td className="py-2.5 px-3 font-sans text-secondary">
                    {rail.provider}
                  </td>
                  <td className="py-2.5 px-3 text-right text-secondary tabular-nums">
                    ${Math.round(monthlyGrossUsd).toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-600 dark:text-amber-400 tabular-nums">
                    -${Math.round(totalFeesUsd).toLocaleString()} ({rail.percentageFee}%)
                  </td>
                  <td className="py-2.5 px-3 text-right font-bold text-primary tabular-nums">
                    {rail.currencySymbol}
                    {Math.round(localNet).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
