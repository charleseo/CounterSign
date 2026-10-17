'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Info,
  Building2,
  Globe,
} from 'lucide-react';

export function RateSubmitClient() {
  const [platform, setPlatform] = useState('Outlier AI');
  const [domain, setDomain] = useState('Software engineering & coding');
  const [hourlyRate, setHourlyRate] = useState('40');
  const [paymentRail, setPaymentRail] = useState('Deel');
  const [country, setCountry] = useState('Nigeria');
  const [hoursPerWeek, setHoursPerWeek] = useState('20');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Privacy Pledge Banner */}
      <div className="p-4 rounded-xl border border-rule bg-sheet text-xs text-secondary flex items-start gap-3">
        <Lock className="w-4 h-4 text-[#5A35C8] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-ink">100% anonymous and private:</strong> We do not log IP addresses, names, or account credentials. Your report is aggregated into our public pay rate directory to protect fellow contributors from unfair pay cuts and hidden processor fees.
        </p>
      </div>

      {submitted ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-sheet p-8 text-center space-y-4 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-ink">Thank you for reporting</h2>
            <p className="text-xs sm:text-sm text-secondary max-w-md mx-auto">
              Your report helps independent contributors know their market worth. Our team aggregates community submissions weekly to update the public directory.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rates"
              className="px-5 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <span>Back to pay rates directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-6"
        >
          <div className="space-y-1 border-b border-rule pb-4">
            <h2 className="text-base sm:text-lg font-bold text-ink">
              Submit your verified contributor pay rate
            </h2>
            <p className="text-xs text-secondary">
              Report your real hourly rate to help us maintain transparent pay benchmark data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            {/* Platform Selection */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Hiring platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
              >
                <option value="Outlier AI">Outlier AI</option>
                <option value="Alignerr">Alignerr</option>
                <option value="DataAnnotation Tech">DataAnnotation Tech</option>
                <option value="Mercor">Mercor</option>
                <option value="Invisible Technologies">Invisible Technologies</option>
                <option value="CrowdGen / Appen">CrowdGen / Appen</option>
                <option value="Prolific">Prolific</option>
                <option value="Other verified platform">Other verified platform</option>
              </select>
            </div>

            {/* Domain */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Project domain</label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
              >
                <option value="Software engineering & coding">Software engineering &amp; coding</option>
                <option value="Advanced mathematics & STEM">Advanced mathematics &amp; STEM</option>
                <option value="General RLHF & conversation">General RLHF &amp; conversation</option>
                <option value="Multilingual & translation">Multilingual &amp; translation</option>
                <option value="Factuality & citation auditing">Factuality &amp; citation auditing</option>
              </select>
            </div>

            {/* Hourly Pay Rate */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Hourly pay rate (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary font-bold">$</span>
                <input
                  type="number"
                  min="5"
                  max="150"
                  required
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
                />
              </div>
            </div>

            {/* Payment Rail */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Payment rail used</label>
              <select
                value={paymentRail}
                onChange={(e) => setPaymentRail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
              >
                <option value="Deel (ACH / Bank)">Deel (ACH / Bank)</option>
                <option value="Deel to Geegpay (NGN)">Deel to Geegpay (NGN)</option>
                <option value="Deel to M-Pesa (KES)">Deel to M-Pesa (KES)</option>
                <option value="Deel to MTN MoMo (GHS)">Deel to MTN MoMo (GHS)</option>
                <option value="PayPal (USD)">PayPal (USD)</option>
                <option value="AirTM (USD / Local)">AirTM (USD / Local)</option>
                <option value="Direct Wire (USD Domiciliary)">Direct Wire (USD Domiciliary)</option>
                <option value="Stripe / Wise">Stripe / Wise</option>
              </select>
            </div>

            {/* Country */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Your country of residence</label>
              <input
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. Nigeria, Kenya, Ghana, India, United States"
                className="w-full px-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
              />
            </div>

            {/* Weekly Hours */}
            <div className="space-y-1.5">
              <label className="text-secondary font-medium block">Average hours tasking per week</label>
              <input
                type="number"
                min="1"
                max="80"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] min-h-[44px]"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5 text-xs">
            <label className="text-secondary font-medium block">
              Contributor notes &amp; review feedback (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Tasks flow consistently on weekdays. Screening test took 45 minutes on TestGorilla."
              className="w-full p-3 rounded-xl border border-rule bg-surface text-ink focus:outline-none focus:border-[#5A35C8] resize-y"
            />
          </div>

          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors min-h-[44px]"
            >
              <span>Submit anonymous report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
