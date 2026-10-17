'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Copy,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Mail,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface PlatformSupportInfo {
  id: string;
  name: string;
  channel: string;
  recommendedEscalation: string;
}

const PLATFORMS: PlatformSupportInfo[] = [
  {
    id: 'outlier',
    name: 'Outlier AI',
    channel: 'Support Ticket & Community Slack/Discord QM Escalation',
    recommendedEscalation: 'Submit support ticket under "Tasking & Queue Issues" and contact your project Queue Manager (QM).',
  },
  {
    id: 'alignerr',
    name: 'Alignerr',
    channel: 'In-app Help Desk & Community Discord Team Leads',
    recommendedEscalation: 'Submit ticket via Alignerr support portal and tag designated community managers in project channels.',
  },
  {
    id: 'dataannotation',
    name: 'DataAnnotation Tech',
    channel: 'Platform Support Form (Profile -> Support)',
    recommendedEscalation: 'Submit a concise inquiry via your profile dashboard. Await standard project reallocation.',
  },
  {
    id: 'crowdgen',
    name: 'CrowdGen / Appen',
    channel: 'CrowdGen Zendesk Ticket',
    recommendedEscalation: 'File ticket with exact Project Code and task timestamps.',
  },
];

const DISPUTE_TYPES = [
  {
    id: 'empty_queue',
    label: 'Sudden empty queue (EQ) / project pause',
    desc: 'You were actively tasking with good quality and the queue suddenly emptied without warning.',
  },
  {
    id: 'network_flag',
    label: 'False network / IP location warning',
    desc: 'You received a notification regarding VPN use or location mismatch due to mobile network ISP roaming.',
  },
  {
    id: 'reviewer_dispute',
    label: 'Disputed audit score / reviewer error',
    desc: 'A reviewer docked your task rating, but the reviewer themselves misunderstood project guidelines.',
  },
];

export function AppealsClient() {
  const [platformId, setPlatformId] = useState<string>('outlier');
  const [disputeTypeId, setDisputeTypeId] = useState<string>('empty_queue');
  const [contributorName, setContributorName] = useState<string>('');
  const [workerId, setWorkerId] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('Python Reasoning & Evaluation');
  const [incidentDate, setIncidentDate] = useState<string>('Past 48 hours');
  const [evidenceNotes, setEvidenceNotes] = useState<string>(
    'Maintained strong quality scores across recent sprints. Ensured all negative constraints and guidelines were respected.'
  );
  const [copied, setCopied] = useState<boolean>(false);

  const currentPlatform = useMemo(
    () => PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0],
    [platformId]
  );

  const generatedAppealText = useMemo(() => {
    const name = contributorName.trim() || '[Your Full Name]';
    const id = workerId.trim() || '[Your Worker ID / Registered Email]';

    if (disputeTypeId === 'empty_queue') {
      return `Subject: Request for quality audit and account queue review: ${id} (${currentPlatform.name})

Dear ${currentPlatform.name} Support & Operations Team,

I am writing to respectfully request a status review of my active task allocations on project "${projectName}".

Account details:
- Contributor name: ${name}
- Registered email / ID: ${id}
- Project: ${projectName}
- Queue change observed: ${incidentDate}

Context & tasking record:
I have been actively contributing to ${projectName} and have consistently adhered to all project instructions, negative constraints, and citation guidelines. ${evidenceNotes}

My queue recently transitioned to an empty queue status without an accompanying quality feedback notice. I want to confirm whether this reflects standard project batch availability or if my profile was paused for an audit. If any specific tasks require clarification or review, I welcome the opportunity to examine the reviewer feedback.

Thank you for your time and continued support.

Sincerely,
${name}
${id}`;
    }

    if (disputeTypeId === 'network_flag') {
      return `Subject: Verification of residential location and network clarification: ${id} (${currentPlatform.name})

Dear ${currentPlatform.name} Compliance & Security Team,

I am submitting this clarification regarding a recent network or location notification on my account (${id}).

Account details:
- Contributor name: ${name}
- Registered email / ID: ${id}
- Date observed: ${incidentDate}

Network clarification:
I strictly complete all evaluation tasks from my verified home residence. I do not use commercial VPNs, proxies, or shared remote desktop connections. In my region, local internet service providers (ISPs) dynamically allocate IP subnets across tower nodes, which can occasionally trigger automated location alerts.

I am prepared to provide supporting documentation to verify my identity and residential connection if required by your compliance team.

I kindly request that you review this automated flag so I may resume tasking.

Thank you for your assistance.

Sincerely,
${name}
${id}`;
    }

    // Reviewer dispute
    return `Subject: Request for secondary quality review on task evaluation: ${id} (${currentPlatform.name})

Dear ${currentPlatform.name} Quality Operations Team,

I am requesting a secondary human review of a recent audit score received on project "${projectName}".

Account details:
- Contributor name: ${name}
- Registered email / ID: ${id}
- Project: ${projectName}
- Audit date: ${incidentDate}

Justification for review:
${evidenceNotes}

Per the official project guidelines, my completion adhered strictly to the prompt constraints and ground-truth references. I believe the initial audit reviewer may have misapplied the negative constraint rule or missed the cited documentation excerpt.

I would be grateful if a senior reviewer or queue manager could perform a second pass on this task to ensure my quality metrics accurately reflect project standards.

Thank you for your time and fair review.

Sincerely,
${name}
${id}`;
  }, [platformId, disputeTypeId, contributorName, workerId, projectName, incidentDate, evidenceNotes, currentPlatform]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAppealText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* 3 Critical Golden Rules Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 sm:p-6 space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300">
          <ShieldAlert size={16} className="shrink-0" />
          <span>Before you appeal: 3 golden rules to protect your account</span>
        </div>
        <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1.5 pl-5 list-disc leading-relaxed">
          <li>
            <strong>Never create a second account:</strong> Platform automated biometrics and payment rails will instantly flag both accounts as fraud, triggering an irrevocable ban.
          </li>
          <li>
            <strong>Always remain calm and professional:</strong> Emotional or accusatory messages are routinely closed without escalation. Stick strictly to dates, task IDs, and project rules.
          </li>
          <li>
            <strong>Empty queues are often seasonal:</strong> When a client batch ends, queues empty for everyone simultaneously. Confirm with community peers before assuming you were banned.
          </li>
        </ul>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-5 rounded-2xl border border-rule bg-sheet p-5 sm:p-6">
          <h2 className="text-sm font-bold text-primary border-b border-rule pb-2">
            Appeal parameters
          </h2>

          {/* Select Platform */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-secondary">Target platform</label>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  type="button"
                  onClick={() => setPlatformId(plat.id)}
                  className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                    platformId === plat.id
                      ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary font-bold'
                      : 'border-rule bg-surface text-secondary hover:text-primary'
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted">{currentPlatform.recommendedEscalation}</p>
          </div>

          {/* Select Dispute Type */}
          <div className="space-y-1.5 pt-2 border-t border-rule">
            <label className="text-xs font-semibold text-secondary">Dispute type</label>
            <div className="space-y-2">
              {DISPUTE_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setDisputeTypeId(type.id)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                    disputeTypeId === type.id
                      ? 'border-[var(--brand-ink)] bg-[var(--brand-tint)] text-primary'
                      : 'border-rule bg-surface text-secondary hover:text-primary'
                  }`}
                >
                  <span className="block text-xs font-bold text-primary">{type.label}</span>
                  <span className="block text-[11px] text-secondary mt-0.5">{type.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-3 pt-2 border-t border-rule">
            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Your full name</label>
              <input
                type="text"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Registered email or worker ID</label>
              <input
                type="text"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                placeholder="e.g. contributor@example.com / ID#49201"
                className="w-full text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)] font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Project name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Bulba / Python Evaluation"
                className="w-full text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Date of issue</label>
              <input
                type="text"
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
                placeholder="e.g. 14 October 2026"
                className="w-full text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-secondary font-medium block">Supporting evidence &amp; context</label>
              <textarea
                value={evidenceNotes}
                onChange={(e) => setEvidenceNotes(e.target.value)}
                rows={3}
                placeholder="Specific facts: past quality scores, citations obeying guidelines, etc."
                className="w-full text-xs bg-surface border border-rule rounded-lg p-2 text-primary focus:outline-none focus:border-[var(--brand-ink)] leading-relaxed resize-y"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Generated Letter */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-rule bg-sheet p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[var(--brand-ink)]" />
                <h3 className="text-sm font-bold text-primary">Generated appeal letter</h3>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[var(--brand-ink)] text-white hover:bg-[var(--brand-ink-hover)] text-xs font-semibold transition-colors min-h-[36px]"
              >
                {copied ? (
                  <>
                    <Check size={13} />
                    <span>Copied letter!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy to clipboard</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-surface border border-rule text-xs text-primary font-mono whitespace-pre-wrap leading-relaxed select-all">
              {generatedAppealText}
            </pre>
          </div>

          {/* Submission Guidance Box */}
          <div className="rounded-xl border border-rule bg-surface p-4 text-xs text-secondary space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Info size={14} className="text-[var(--brand-ink)]" />
              <span>Where to send this appeal</span>
            </div>
            <p className="leading-relaxed">
              Copy this text into the platform support portal ({currentPlatform.channel}). If you are part of an official project Slack or Discord channel, you may also message your designated community Queue Manager (QM) or Team Lead with this structured summary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
