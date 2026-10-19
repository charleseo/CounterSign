'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Calendar, Bell, Clock } from 'lucide-react';
import { useSelectedCountry } from '@/components/ui/CountrySelector';
import { getCountryMeta } from '@/lib/utils/country';
import { subscribeNewsletterAction } from '@/app/newsletter/actions';
import { trackEvent } from '@/lib/analytics/tracker';

export function HomeNewsletterSection() {
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'weekly' | 'daily'>('weekly');
  const [categories, setCategories] = useState<string[]>([
    'opportunities',
    'newsletter',
    'scam_alerts',
    'drills',
  ]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmationUrl, setConfirmationUrl] = useState<string | null>(null);

  const selectedCountryCode = useSelectedCountry();
  const countryName = getCountryMeta(selectedCountryCode).name;

  const toggleCategory = (cat: string) => {
    setCategories((prev) =>
      prev.includes(cat)
        ? prev.length > 1
          ? prev.filter((c) => c !== cat)
          : prev
        : [...prev, cat]
    );
  };

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('sending');

    try {
      const res = await subscribeNewsletterAction({
        email,
        countryCode: selectedCountryCode,
        frequency,
        categories,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      if (res.confirmationUrl) {
        setConfirmationUrl(res.confirmationUrl);
      }

      try {
        trackEvent('alert_signup', {
          source: 'home_newsletter_section',
          country: selectedCountryCode,
          frequency,
        });
      } catch {
        // Non-blocking telemetry
      }

      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not complete subscription. Please retry.'
      );
    }
  };

  return (
    <section aria-labelledby="home-newsletter-heading" className="w-full py-12 sm:py-20 border-t border-rule bg-sheet">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="rounded-3xl border border-rule bg-surface p-6 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-tint)] rounded-full blur-3xl opacity-50 pointer-events-none -mr-20 -mt-20"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Heading, Frequency Selector, and Form */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--brand-ink)]/30 bg-[var(--brand-tint)] text-xs font-semibold text-[var(--brand-ink)]">
                  <Sparkles size={13} />
                  <span>Free contributor intelligence</span>
                </div>

                <h2
                  id="home-newsletter-heading"
                  className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink m-0 leading-tight"
                >
                  Get weekly intelligence and daily verified roles in your inbox
                </h2>

                <p className="text-sm sm:text-base text-secondary leading-relaxed m-0 max-w-xl">
                  Choose your delivery cadence. We check every role on the employer&apos;s official page,
                  track community pay rates, and alert you before scam recruiters waste your time.
                </p>
              </div>

              {/* Delivery Frequency Switcher */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                  Delivery schedule
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('weekly')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      frequency === 'weekly'
                        ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)]/40 shadow-xs'
                        : 'border-rule bg-sheet hover:bg-elevated/40'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        frequency === 'weekly'
                          ? 'border-[var(--brand-ink)] bg-[var(--brand-ink)]'
                          : 'border-rule'
                      }`}
                    >
                      {frequency === 'weekly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-ink block">Weekly digest</span>
                      <span className="text-[11px] text-secondary leading-tight block mt-0.5">
                        Mondays at 08:00 UTC. Top verified roles, rate shifts, and platform audit notes.
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFrequency('daily')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      frequency === 'daily'
                        ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)]/40 shadow-xs'
                        : 'border-rule bg-sheet hover:bg-elevated/40'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                        frequency === 'daily'
                          ? 'border-[var(--brand-ink)] bg-[var(--brand-ink)]'
                          : 'border-rule'
                      }`}
                    >
                      {frequency === 'daily' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-ink block">Daily opportunity alerts</span>
                      <span className="text-[11px] text-secondary leading-tight block mt-0.5">
                        Every morning at 08:00 UTC. Immediate alerts for freshly verified openings in {countryName}.
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* What We Include (Category Toggles) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider block">
                  Included in your emails
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'opportunities', label: 'Verified AI roles' },
                    { id: 'newsletter', label: 'Rate benchmarks' },
                    { id: 'scam_alerts', label: 'Scam radar' },
                    { id: 'drills', label: 'Screening test drills' },
                  ].map((cat) => {
                    const isChecked = categories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                          isChecked
                            ? 'bg-[var(--brand-ink)] text-white border-[var(--brand-ink)]'
                            : 'bg-sheet text-secondary border-rule hover:text-ink'
                        }`}
                      >
                        <CheckCircle2 size={13} className={isChecked ? 'opacity-100' : 'opacity-30'} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Subscribe Form */}
              {status === 'success' ? (
                <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-start gap-3 text-xs animate-in fade-in">
                  <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                  <div className="space-y-2 text-ink">
                    <span className="font-bold text-sm block">Check your inbox to confirm.</span>
                    <p className="text-secondary text-xs m-0">
                      We have sent a double opt-in confirmation link to <strong className="text-ink">{email}</strong>.
                      Click it to activate your {frequency === 'daily' ? 'daily alerts' : 'weekly digest'}.
                    </p>
                    {confirmationUrl && (
                      <a
                        href={confirmationUrl}
                        className="inline-flex items-center gap-1 font-mono text-xs text-[var(--brand-ink)] hover:underline pt-1"
                      >
                        <span>Click here to confirm instantly &rarr;</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <Mail
                        size={17}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-rule bg-sheet text-ink text-sm placeholder:text-secondary focus:outline-none focus:border-[var(--brand-ink)] focus:ring-1 focus:ring-[var(--brand-ink)] transition-colors min-h-[46px]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="px-6 py-3 rounded-xl bg-[var(--brand-ink)] hover:opacity-95 text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shrink-0 min-h-[46px] cs-btn-shimmer hover:shadow-lg hover:shadow-[var(--brand-ink)]/20 active:translate-y-0.5"
                    >
                      {status === 'sending' ? (
                        <span>Subscribing...</span>
                      ) : (
                        <>
                          <span>Subscribe free</span>
                          <ArrowRight size={15} />
                        </>
                      )}
                    </button>
                  </div>

                  {status === 'error' && errorMessage && (
                    <p className="text-xs text-rose-500 font-medium m-0">{errorMessage}</p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[11px] text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span>NDPA 2023 compliant. Unsubscribe in one click anytime.</span>
                    </span>
                    <Link href="/newsletter" className="hover:underline text-[var(--brand-ink)] font-medium">
                      Read sample digest &rarr;
                    </Link>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Live Email Preview Mockup */}
            <div className="lg:col-span-5 w-full">
              <div key={frequency} className="rounded-2xl border border-rule bg-sheet p-5 shadow-xs space-y-4 animate-fade-in cs-card-lift">
                <div className="flex items-center justify-between border-b border-subtle pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-ink)]/10 text-[var(--brand-ink)] flex items-center justify-center text-xs font-bold cs-glow-breathe">
                      TB
                    </div>
                    <div>
                      <span className="text-xs font-bold text-ink block leading-tight">
                        TraceBase Intelligence
                      </span>
                      <span className="text-[10px] text-secondary font-mono">
                        alerts@tracebase.org
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface border border-rule text-secondary">
                    {frequency === 'daily' ? 'Daily Alert' : 'Weekly Issue #48'}
                  </span>
                </div>

                {/* Email Subject Line Preview */}
                <div className="p-3 rounded-xl bg-surface border border-subtle text-xs space-y-1">
                  <span className="text-[10px] text-secondary uppercase font-bold tracking-wider block">
                    Subject line
                  </span>
                  <p className="text-xs font-semibold text-ink m-0">
                    {frequency === 'daily'
                      ? `[TraceBase Daily] 3 verified roles open for ${countryName} ($22 - $48/hr)`
                      : `[TraceBase Digest] Outlier rate adjustments, 4 verified roles, and scam domain warning`}
                  </p>
                </div>

                {/* Email Body Snippet */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl border border-rule bg-surface/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-ink">
                        {frequency === 'daily' ? 'AI Coding Specialist' : 'Outlier AI · Reasoning Evaluator'}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                        {frequency === 'daily' ? '$35 - $50/hr' : '$25 - $40/hr'}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary leading-normal m-0">
                      {frequency === 'daily'
                        ? `Human-checked 2 hours ago. Open to applicants from ${countryName}. Python and test suite verification required.`
                        : `Status: Active queue. Unpaid qualification takes about 2 hours. Verified direct application link inside.`}
                    </p>
                    <span className="text-[10px] font-mono text-secondary block">
                      Direct application link · No agency fee
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-rule bg-surface/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-ink">
                        {frequency === 'daily' ? 'Multimodal Image Evaluator' : 'Scam Radar Alert'}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-500">
                        {frequency === 'daily' ? '$20/hr' : 'Watch out'}
                      </span>
                    </div>
                    <p className="text-[11px] text-secondary leading-normal m-0">
                      {frequency === 'daily'
                        ? 'Alignerr workspace. Checks prompt alignment against generated images. Accepting generalists.'
                        : 'New spoof domain pretending to be Remotasks on Telegram. Official channels never charge for training.'}
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-[11px] text-secondary border-t border-subtle">
                  <span className="inline-flex items-center gap-1 font-mono text-[10px]">
                    <Clock size={11} />
                    <span>Delivered at 08:00 UTC</span>
                  </span>
                  <span className="font-mono text-[10px]">One-click unsubscribe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
