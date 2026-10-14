'use client';

import React, { useState, useTransition } from 'react';
import { Platform, PlatformStep, LabelKind, ReferralStatus } from '@/lib/db/types';
import { updatePlatformAction } from '@/lib/actions/admin';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Save,
} from 'lucide-react';

interface PlatformEditorProps {
  initialPlatforms: Platform[];
  initialSteps: Record<string, PlatformStep[]>;
}

export function PlatformEditor({ initialPlatforms, initialSteps }: PlatformEditorProps) {
  const [selectedId, setSelectedId] = useState(initialPlatforms[0]?.id || '');
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [stepsMap, setStepsMap] = useState(initialSteps);

  const activePlatform = platforms.find((p) => p.id === selectedId) || platforms[0];
  const activeSteps = stepsMap[selectedId] || [];

  // Form states for the selected platform
  const [name, setName] = useState(activePlatform?.name || '');
  const [officialUrl, setOfficialUrl] = useState(activePlatform?.official_url || '');
  const [description, setDescription] = useState(activePlatform?.description || '');
  const [whoItSuits, setWhoItSuits] = useState(activePlatform?.who_it_suits || '');
  const [payoutMethods, setPayoutMethods] = useState(activePlatform?.payout_methods || '');
  const [assessmentStyle, setAssessmentStyle] = useState(activePlatform?.assessment_style || '');
  const [referral, setReferral] = useState<ReferralStatus>(activePlatform?.referral || 'not_found');
  const [referralTermsUrl, setReferralTermsUrl] = useState(activePlatform?.referral_terms_url || '');

  // 5 Steps state
  const [steps, setSteps] = useState<PlatformStep[]>(() => {
    return activeSteps.sort((a, b) => a.position - b.position);
  });

  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Switch active platform
  const handleSelectPlatform = (pId: string) => {
    setSelectedId(pId);
    setMessage(null);
    const p = platforms.find((item) => item.id === pId);
    if (p) {
      setName(p.name);
      setOfficialUrl(p.official_url);
      setDescription(p.description || '');
      setWhoItSuits(p.who_it_suits || '');
      setPayoutMethods(p.payout_methods || '');
      setAssessmentStyle(p.assessment_style || '');
      setReferral(p.referral);
      setReferralTermsUrl(p.referral_terms_url || '');
      const s = stepsMap[pId] || [];
      setSteps([...s].sort((a, b) => a.position - b.position));
    }
  };

  const handleStepChange = (pos: number, field: keyof PlatformStep, value: unknown) => {
    setSteps((prev) =>
      prev.map((s) => (s.position === pos ? { ...s, [field]: value } : s))
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const payload = {
      name,
      official_url: officialUrl,
      description,
      who_it_suits: whoItSuits,
      payout_methods: payoutMethods,
      assessment_style: assessmentStyle,
      referral,
      referral_terms_url: referralTermsUrl || null,
      steps: steps.map((s) => ({
        position: s.position,
        title: s.title,
        detail: s.detail || null,
        label: s.label,
        source_url: s.source_url || null,
      })),
    };

    startTransition(async () => {
      const res = await updatePlatformAction(selectedId, payload);
      if (res.success) {
        setMessage({ type: 'success', text: res.message });
        // Update local state
        setPlatforms((prev) =>
          prev.map((p) => (p.id === selectedId ? (res.data as Platform) : p))
        );
        setStepsMap((prev) => ({
          ...prev,
          [selectedId]: steps,
        }));
      } else {
        setMessage({ type: 'error', text: res.message });
      }
    });
  };

  const stepPositionNames: Record<number, string> = {
    1: 'Step 1: Application Submission',
    2: 'Step 2: Identity & Compliance Verification',
    3: 'Step 3: Domain Qualification Assessment',
    4: 'Step 4: Training Benchmark / Workspace Onboarding',
    5: 'Step 5: First Production Task Allocation',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar platform picker */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider mb-2">
          Evaluation Platforms
        </h2>
        <div className="space-y-1">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleSelectPlatform(p.id)}
              className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                p.id === selectedId
                  ? 'bg-[var(--color-surface-hover)] border-[var(--color-accent)] text-[var(--color-text)] shadow-sm'
                  : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }`}
            >
              <span className="font-semibold">{p.name}</span>
              <span className="font-mono text-[10px] text-[var(--color-muted)]">
                {p.slug}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Platform & 5-Step Editor */}
      <div className="lg:col-span-3 space-y-6">
        {message && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}
          >
            {message.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Platform Details */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text)] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Platform Profile &amp; Policies</span>
              </h2>
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--color-accent)] hover:underline inline-flex items-center gap-1"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Platform Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Official Portal URL
                </label>
                <input
                  type="url"
                  required
                  value={officialUrl}
                  onChange={(e) => setOfficialUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                Editorial Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Payout Rails (e.g. PayPal, AirTM, Deel)
                </label>
                <input
                  type="text"
                  value={payoutMethods}
                  onChange={(e) => setPayoutMethods(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Assessment Style
                </label>
                <input
                  type="text"
                  value={assessmentStyle}
                  onChange={(e) => setAssessmentStyle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Referral Program Status
                </label>
                <select
                  value={referral}
                  onChange={(e) => setReferral(e.target.value as ReferralStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                >
                  <option value="public">Public (Open referral program)</option>
                  <option value="invitation_only">Invitation Only</option>
                  <option value="not_found">Not Found (No public program)</option>
                  <option value="unavailable">Unavailable</option>
                  <option value="confirmed_partner">Confirmed Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--color-muted)] mb-1.5">
                  Referral Terms URL (Disclosed)
                </label>
                <input
                  type="url"
                  value={referralTermsUrl}
                  onChange={(e) => setReferralTermsUrl(e.target.value)}
                  placeholder="https://platform.com/terms"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>
            </div>
          </div>

          {/* 5-Step Expectation Timeline Editor */}
          <div className="p-5 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text)]">
                  5-Step Expectation Timeline
                </h2>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">
                  Document onboarding friction transparently. Every step must have a source label.
                </p>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                5 Positions Required
              </span>
            </div>

            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.position}
                  className="p-4 rounded-xl bg-[var(--color-surface-hover)] border border-[var(--color-border)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-accent)]">
                      {stepPositionNames[step.position] || `Position ${step.position}`}
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="text-[11px] text-[var(--color-muted)]">Evidence:</label>
                      <select
                        value={step.label}
                        onChange={(e) =>
                          handleStepChange(step.position, 'label', e.target.value as LabelKind)
                        }
                        className="px-2 py-1 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[11px] text-[var(--color-text)] font-semibold"
                      >
                        <option value="official">Official Platform FAQ</option>
                        <option value="reported">Community Reported</option>
                        <option value="unknown">Unknown</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-[var(--color-muted)] mb-1">
                        Step Headline
                      </label>
                      <input
                        type="text"
                        required
                        value={step.title}
                        onChange={(e) =>
                          handleStepChange(step.position, 'title', e.target.value)
                        }
                        className="w-full px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-[var(--color-muted)] mb-1">
                        Source Evidence URL
                      </label>
                      <input
                        type="url"
                        value={step.source_url || ''}
                        onChange={(e) =>
                          handleStepChange(step.position, 'source_url', e.target.value)
                        }
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[var(--color-muted)] mb-1">
                      Detailed Friction, Requirements &amp; Assessment Time
                    </label>
                    <textarea
                      rows={2}
                      value={step.detail || ''}
                      onChange={(e) =>
                        handleStepChange(step.position, 'detail', e.target.value)
                      }
                      className="w-full px-3 py-1.5 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="py-2.5 px-6 rounded-xl bg-[var(--color-accent)] text-[var(--color-accent-fg)] font-semibold text-xs hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? 'Saving Platform...' : 'Save Platform & Timeline (Logs to Audit)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
