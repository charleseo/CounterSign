'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Clock,
  FileSpreadsheet,
  Cpu,
  Layers,
} from 'lucide-react';

interface ServiceOption {
  id: string;
  name: string;
  shortDesc: string;
  deliverables: string[];
}

const SERVICES: ServiceOption[] = [
  {
    id: 'rag_and_citation_audit',
    name: 'RAG & citation grounding audit',
    shortDesc: 'Verify whether model claims and excerpts match your actual source documentation.',
    deliverables: [
      'Sentence-level hallucination taxonomy',
      'Citation faithfulness score (0 to 100)',
      'Raw JSON benchmark dataset with ground-truth links',
    ],
  },
  {
    id: 'negative_constraints',
    name: 'Negative constraints & refusal boundaries',
    shortDesc: 'Test model adherence to strict formatting caps, forbidden words, and prompt limits.',
    deliverables: [
      'Negative constraint violation rate',
      'Edge-case refusal failure catalogue',
      'Automated regex test suite based on findings',
    ],
  },
  {
    id: 'technical_documentation',
    name: 'Technical documentation truth audit',
    shortDesc: 'Audit code examples and API parameters for subtle syntax errors and parameter drift.',
    deliverables: [
      'Executable code test suite validation',
      'Hallucinated parameter inventory',
      'Engineer-written correction rationales',
    ],
  },
];

const VOLUMES = [
  { id: 'pilot_250', label: '250 pairs', count: 250, desc: 'Pilot sprint for early testing' },
  { id: 'standard_1000', label: '1,000 pairs', count: 1000, desc: 'Recommended release baseline' },
  { id: 'deep_5000', label: '5,000 pairs', count: 5000, desc: 'Comprehensive model audit' },
];

const TIMELINES = [
  { id: 'express', label: '3-day express sprint', multiplier: 1.3, days: 3 },
  { id: 'standard', label: '7-day standard sprint', multiplier: 1.0, days: 7 },
  { id: 'thorough', label: '14-day deep audit', multiplier: 0.9, days: 14 },
];

export function StudioSprintEstimator() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('rag_and_citation_audit');
  const [selectedVolumeId, setSelectedVolumeId] = useState<string>('standard_1000');
  const [selectedTimelineId, setSelectedTimelineId] = useState<string>('standard');

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0],
    [selectedServiceId]
  );

  const selectedVolume = useMemo(
    () => VOLUMES.find((v) => v.id === selectedVolumeId) || VOLUMES[1],
    [selectedVolumeId]
  );

  const selectedTimeline = useMemo(
    () => TIMELINES.find((t) => t.id === selectedTimelineId) || TIMELINES[1],
    [selectedTimelineId]
  );

  // Calculated estimates
  const estimates = useMemo(() => {
    const evaluatorsNeeded = Math.max(2, Math.ceil(selectedVolume.count / 350));
    const totalEvaluationHours = Math.round((selectedVolume.count * 12) / 60); // 12 mins per dual review
    const agreementTarget = selectedVolume.count >= 1000 ? "Cohen's Kappa κ ≥ 0.82" : "Cohen's Kappa κ ≥ 0.78";

    return {
      evaluatorsNeeded,
      totalEvaluationHours,
      agreementTarget,
      turnaroundDays: selectedTimeline.days,
    };
  }, [selectedVolume, selectedTimeline]);

  return (
    <div className="rounded-2xl border border-rule bg-sheet p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2 border-b border-rule pb-5">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--brand-ink)]/30 bg-[var(--brand-tint)] text-xs text-[var(--brand-ink)] font-semibold">
          <Calculator size={13} />
          <span>Interactive Sprint Estimator</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
          Scope an Evaluation Sprint in 3 Steps
        </h2>
        <p className="text-xs sm:text-sm text-secondary max-w-2xl leading-relaxed">
          Estimate team capacity, review depth, and deliverables for your AI documentation bot or model deployment.
        </p>
      </div>

      {/* 3 Step Inputs */}
      <div className="space-y-6">
        {/* Step 1: Select Service */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Step 1: Evaluation objective
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SERVICES.map((serv) => (
              <button
                key={serv.id}
                type="button"
                onClick={() => setSelectedServiceId(serv.id)}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between gap-2.5 ${
                  selectedServiceId === serv.id
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] shadow-sm'
                    : 'border-rule bg-surface hover:border-subtle'
                }`}
              >
                <div>
                  <span className="font-bold text-xs sm:text-sm text-primary block">{serv.name}</span>
                  <span className="text-[11px] text-secondary mt-1 block leading-relaxed">
                    {serv.shortDesc}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-[var(--brand-ink)] pt-1 border-t border-rule">
                  {selectedServiceId === serv.id ? '✓ Selected' : 'Select option'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Sample Size */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Step 2: Sample volume (prompt-response pairs)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {VOLUMES.map((vol) => (
              <button
                key={vol.id}
                type="button"
                onClick={() => setSelectedVolumeId(vol.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedVolumeId === vol.id
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)]'
                    : 'border-rule bg-surface hover:border-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary font-mono">{vol.label}</span>
                  {selectedVolumeId === vol.id && (
                    <CheckCircle2 size={14} className="text-[var(--brand-ink)]" />
                  )}
                </div>
                <span className="text-[11px] text-secondary mt-0.5 block">{vol.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Turnaround Speed */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-secondary uppercase tracking-wider block">
            Step 3: Target delivery timeline
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIMELINES.map((time) => (
              <button
                key={time.id}
                type="button"
                onClick={() => setSelectedTimelineId(time.id)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedTimelineId === time.id
                    ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)]'
                    : 'border-rule bg-surface hover:border-subtle'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs sm:text-sm text-primary">{time.label}</span>
                  {selectedTimelineId === time.id && (
                    <CheckCircle2 size={14} className="text-[var(--brand-ink)]" />
                  )}
                </div>
                <span className="text-[11px] text-secondary mt-0.5 block font-mono">
                  {time.days} business days
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Estimated Architecture Output */}
      <div className="rounded-2xl border border-[var(--brand-ink)]/30 bg-surface p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
          <div>
            <h3 className="text-base font-bold text-primary">Estimated Sprint Architecture</h3>
            <span className="text-xs text-secondary">
              Based on {selectedVolume.label} across {selectedTimeline.label}
            </span>
          </div>

          <div className="text-xs px-3 py-1 rounded-full border border-rule bg-sheet font-mono text-primary font-semibold">
            Target SLA: {estimates.turnaroundDays} Days
          </div>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <Users size={14} className="text-[var(--brand-ink)]" />
              <span>Reviewer capacity</span>
            </div>
            <div className="text-lg font-bold text-primary font-mono">
              {estimates.evaluatorsNeeded} Evaluators + 1 Meta-Reviewer
            </div>
            <p className="text-[11px] text-muted">Double-blind evaluation</p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>Statistical rigor</span>
            </div>
            <div className="text-lg font-bold text-primary font-mono">
              {estimates.agreementTarget}
            </div>
            <p className="text-[11px] text-muted">Inter-annotator agreement</p>
          </div>

          <div className="p-4 rounded-xl border border-rule bg-sheet space-y-1">
            <div className="flex items-center gap-1.5 text-secondary">
              <Clock size={14} className="text-[var(--brand-ink)]" />
              <span>Estimated human hours</span>
            </div>
            <div className="text-lg font-bold text-primary font-mono">
              ~{estimates.totalEvaluationHours} Hours
            </div>
            <p className="text-[11px] text-muted">Ground-truth verification</p>
          </div>
        </div>

        {/* Deliverables List */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-primary block">Included Sprint Deliverables:</span>
          <ul className="space-y-1.5 text-xs text-secondary pl-0 list-none m-0">
            {selectedService.deliverables.map((del, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{del}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-secondary">
            Ready to initiate this sprint? Submit your scope for immediate review.
          </span>

          <Link
            href={`/evaluation/scope?service=${selectedServiceId}&volume=${selectedVolumeId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-bold transition-all min-h-[44px]"
          >
            <span>Proceed with this sprint scope</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
