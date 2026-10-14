'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Platform, Country, EligStatus } from '@/lib/db/types';
import { createJobAction } from '@/lib/actions/admin';
import {
  Briefcase,
  Globe,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

interface JobFormProps {
  platforms: Platform[];
  countries: Country[];
}

export function JobForm({ platforms, countries }: JobFormProps) {
  const [platformId, setPlatformId] = useState(platforms[0]?.id || '');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [workType, setWorkType] = useState('Evaluation & RLHF');
  const [domainsText, setDomainsText] = useState('General Reasoning, Fact Checking');
  const [languagesText, setLanguagesText] = useState('English');
  const [degreeLevels, setDegreeLevels] = useState<string[]>(["Bachelor's"]);
  const [summary, setSummary] = useState('');
  const [requirements, setRequirements] = useState('');
  const [payText, setPayText] = useState('$20 - $35 / hr');
  const [payVerified, setPayVerified] = useState(true);
  const [paySourceUrl, setPaySourceUrl] = useState('');
  const [officialUrl, setOfficialUrl] = useState(platforms[0]?.official_url || 'https://outlier.ai');
  const [applyUrl, setApplyUrl] = useState('');
  const [linkType, setLinkType] = useState<'direct' | 'referral'>('direct');

  // Country eligibility map: country_code -> { status, source_url }
  const [eligibility, setEligibility] = useState<Record<string, { status: EligStatus; sourceUrl: string }>>(
    () => {
      const init: Record<string, { status: EligStatus; sourceUrl: string }> = {};
      countries.forEach((c) => {
        // default US, NG, KE to accepted, others to unconfirmed
        const isDefaultAccepted = ['US', 'NG', 'KE', 'GB', 'CA'].includes(c.code);
        init[c.code] = {
          status: isDefaultAccepted ? 'accepted' : 'unconfirmed',
          sourceUrl: '',
        };
      });
      return init;
    }
  );

  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[]> | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generated);
    }
  };

  const handlePlatformChange = (pId: string) => {
    setPlatformId(pId);
    const selected = platforms.find((p) => p.id === pId);
    if (selected) {
      setOfficialUrl(selected.official_url);
    }
  };

  const setCountryStatus = (code: string, status: EligStatus) => {
    setEligibility((prev) => ({
      ...prev,
      [code]: { ...prev[code], status },
    }));
  };

  // Quick Presets
  const applyPreset = (preset: 'all-accepted' | 'western-only' | 'africa-only') => {
    setEligibility((prev) => {
      const updated = { ...prev };
      countries.forEach((c) => {
        if (preset === 'all-accepted') {
          updated[c.code] = { ...updated[c.code], status: 'accepted' };
        } else if (preset === 'western-only') {
          const isWest = ['US', 'GB', 'CA', 'DE'].includes(c.code);
          updated[c.code] = { ...updated[c.code], status: isWest ? 'accepted' : 'not_accepted' };
        } else if (preset === 'africa-only') {
          const isAfr = ['NG', 'KE', 'GH', 'ZA'].includes(c.code);
          updated[c.code] = { ...updated[c.code], status: isAfr ? 'accepted' : 'unconfirmed' };
        }
      });
      return updated;
    });
  };

  const toggleDegreeLevel = (deg: string) => {
    setDegreeLevels((prev) =>
      prev.includes(deg) ? prev.filter((d) => d !== deg) : [...prev, deg]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setGeneralError(null);

    const domains = domainsText
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);
    const languages = languagesText
      .split(',')
      .map((l) => l.trim())
      .filter(Boolean);

    const eligibilityList = Object.entries(eligibility).map(([code, data]) => ({
      country_code: code,
      status: data.status,
      source_url: data.sourceUrl || undefined,
    }));

    const payload = {
      platform_id: platformId,
      title: title.trim(),
      slug: slug.trim(),
      work_type: workType,
      domains: domains.length ? domains : ['General'],
      languages: languages.length ? languages : ['English'],
      degree_levels: degreeLevels,
      summary: summary.trim(),
      requirements: requirements.trim() || undefined,
      pay_text: payText.trim() || undefined,
      pay_verified: payVerified,
      pay_source_url: paySourceUrl.trim() || undefined,
      official_url: officialUrl.trim(),
      apply_url: applyUrl.trim(),
      link: linkType,
      eligibility: eligibilityList,
    };

    startTransition(async () => {
      const res = await createJobAction(payload);
      if (!res.success) {
        if (res.errors) {
          setErrors(res.errors);
        }
        setGeneralError(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {generalError && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      {/* Section 1: Role Core Identity */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
        <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[var(--color-accent)]" />
          <span>Role Identity & Platform</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="job-platform" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Platform *
            </label>
            <select
              id="job-platform"
              value={platformId}
              onChange={(e) => handlePlatformChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="job-work-type" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Work Type Category *
            </label>
            <select
              id="job-work-type"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="Evaluation & RLHF">Evaluation &amp; RLHF</option>
              <option value="Coding & Benchmarking">Coding &amp; Benchmarking</option>
              <option value="Translation & Localization">Translation &amp; Localization</option>
              <option value="Safety & Red Teaming">Safety &amp; Red Teaming</option>
              <option value="STEM & Reasoning">STEM &amp; Reasoning</option>
              <option value="Creative Writing">Creative Writing</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="job-title" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Role Title *
            </label>
            <input
              id="job-title"
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Python Benchmark Evaluator [SAMPLE]"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            {errors?.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="job-slug" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              URL Slug *
            </label>
            <input
              id="job-slug"
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. sample-python-benchmark-evaluator"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            {errors?.slug && <p className="text-[11px] text-rose-400 mt-1">{errors.slug[0]}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="job-domains" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Domains (comma separated) *
            </label>
            <input
              id="job-domains"
              type="text"
              value={domainsText}
              onChange={(e) => setDomainsText(e.target.value)}
              placeholder="Python, Unit Testing, Hallucination Detection"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div>
            <label htmlFor="job-languages" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Languages (comma separated) *
            </label>
            <input
              id="job-languages"
              type="text"
              value={languagesText}
              onChange={(e) => setLanguagesText(e.target.value)}
              placeholder="English, French"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
            Degree Levels Required / Accepted
          </label>
          <div className="flex flex-wrap gap-2">
            {['None', 'Associate', "Bachelor's", "Master's", 'PhD'].map((deg) => (
              <button
                key={deg}
                type="button"
                onClick={() => toggleDegreeLevel(deg)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                  degreeLevels.includes(deg)
                    ? 'bg-[var(--color-accent)] text-[var(--color-accent-fg)] border-[var(--color-accent)]'
                    : 'bg-[var(--color-surface-hover)] text-[var(--color-muted)] border-[var(--color-border)] hover:text-[var(--color-text)]'
                }`}
              >
                {deg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 2: Editorial Summary & Requirements */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
        <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center justify-between">
          <span>Editorial Assessment &amp; Summary</span>
          <span className="text-[11px] font-normal text-amber-400">
            Write original editorial analysis. Never paste employer copy.
          </span>
        </h2>

        <div>
          <label htmlFor="job-summary" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
            Role Summary (Original Human Analysis) *
          </label>
          <textarea
            id="job-summary"
            required
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Independent summary of daily tasks, assessment friction, grading strictness, and evaluator expectations."
            className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
          {errors?.summary && <p className="text-[11px] text-rose-400 mt-1">{errors.summary[0]}</p>}
        </div>

        <div>
          <label htmlFor="job-requirements" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
            Key Prerequisites &amp; Verification Checks
          </label>
          <textarea
            id="job-requirements"
            rows={2}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. 3+ years software engineering experience. Verified GitHub repository required."
            className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
          />
        </div>
      </div>

      {/* Section 3: Compensation & Direct URLs */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
        <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Pay &amp; Application Links</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="job-pay-text" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Hourly / Project Rate
            </label>
            <input
              id="job-pay-text"
              type="text"
              value={payText}
              onChange={(e) => setPayText(e.target.value)}
              placeholder="$35 - $50 / hr"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] cursor-pointer">
              <input
                type="checkbox"
                checked={payVerified}
                onChange={(e) => setPayVerified(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded"
              />
              <span className="text-xs font-medium text-[var(--color-text)]">
                Pay Verified by Admin
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="job-pay-source" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Pay Source Proof URL
            </label>
            <input
              id="job-pay-source"
              type="url"
              value={paySourceUrl}
              onChange={(e) => setPaySourceUrl(e.target.value)}
              placeholder="https://outlier.ai/careers/sample"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="job-apply-url" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Direct Application URL *
            </label>
            <input
              id="job-apply-url"
              type="url"
              required
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              placeholder="https://outlier.ai/apply/sample-role"
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            />
            {errors?.apply_url && <p className="text-[11px] text-rose-400 mt-1">{errors.apply_url[0]}</p>}
          </div>

          <div>
            <label htmlFor="job-link-type" className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
              Link Attribution Type
            </label>
            <select
              id="job-link-type"
              value={linkType}
              onChange={(e) => setLinkType(e.target.value as 'direct' | 'referral')}
              className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="direct">Direct Link (No referral code)</option>
              <option value="referral">Disclosed Referral Link</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Country Eligibility Matrix */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Country Eligibility Matrix</span>
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-0.5">
              Explicit status for every market. Status is never inferred or assumed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset('all-accepted')}
              className="px-2 py-1 rounded-lg text-[10px] font-medium bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] cursor-pointer"
            >
              All Accepted
            </button>
            <button
              type="button"
              onClick={() => applyPreset('western-only')}
              className="px-2 py-1 rounded-lg text-[10px] font-medium bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] cursor-pointer"
            >
              Western Hubs
            </button>
            <button
              type="button"
              onClick={() => applyPreset('africa-only')}
              className="px-2 py-1 rounded-lg text-[10px] font-medium bg-[var(--color-surface-hover)] hover:bg-[var(--color-border)] text-[var(--color-text)] border border-[var(--color-border)] cursor-pointer"
            >
              African Hubs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {countries.map((c) => {
            const currentStatus = eligibility[c.code]?.status || 'unconfirmed';
            return (
              <div
                key={c.code}
                className="p-3 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] flex items-center justify-between gap-2"
              >
                <div>
                  <span className="font-mono font-bold text-xs text-[var(--color-text)] mr-1.5">
                    {c.code}
                  </span>
                  <span className="text-xs text-[var(--color-muted)]">{c.name}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCountryStatus(c.code, 'accepted')}
                    title="Mark Accepted"
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      currentStatus === 'accepted'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-emerald-400'
                    }`}
                  >
                    ✓ Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setCountryStatus(c.code, 'not_accepted')}
                    title="Mark Not Accepted"
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      currentStatus === 'not_accepted'
                        ? 'bg-rose-600 text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-rose-400'
                    }`}
                  >
                    ✗ No
                  </button>
                  <button
                    type="button"
                    onClick={() => setCountryStatus(c.code, 'unconfirmed')}
                    title="Mark Unconfirmed"
                    className={`px-2 py-1 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                      currentStatus === 'unconfirmed'
                        ? 'bg-zinc-600 text-white'
                        : 'bg-[var(--color-surface)] text-[var(--color-muted)] hover:text-zinc-300'
                    }`}
                  >
                    ?
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Submission Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <Link
          href="/admin/jobs"
          className="px-4 py-2 rounded-xl border border-[var(--color-border)] text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="py-2.5 px-6 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isPending ? 'Publishing & Verifying...' : 'Publish Verified Role (14-Day SLA Starts)'}</span>
        </button>
      </div>
    </form>
  );
}
