'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export interface GlossaryTerm {
  id: string;
  term: string;
  shortCode?: string;
  category: 'Platform jargon' | 'RLHF & training' | 'Quality audits' | 'Scoring & statistics';
  definition: string;
  reviewerExample: string;
  actionAdvice: string;
}

const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'eq',
    term: 'Empty queue',
    shortCode: 'EQ',
    category: 'Platform jargon',
    definition:
      'A status where a contributor has no active tasks to complete. This can happen when a client project runs out of task batches, when a project is paused for maintenance, or when an account is under a quality review.',
    reviewerExample:
      'Queue manager message: "Queue is currently dry for the Python reasoning tier while client evaluates batch 4."',
    actionAdvice:
      'Do not panic immediately. Check platform community channels to see if others are experiencing EQ. If your queue remains empty for over 48 hours while others are tasking, use our appeal kit to request a quality status review.',
  },
  {
    id: 'negative-constraint',
    term: 'Negative constraint',
    category: 'Quality audits',
    definition:
      'A strict negative instruction specifying what the model must NOT do. Examples include "Do not use bullet points", "Do not mention Python", or "Do not exceed 100 words".',
    reviewerExample:
      'Audit score 2/5: "Model used a bulleted list in paragraph two despite negative constraint forbidding bullets."',
    actionAdvice:
      'Negative constraints are weighted heavily by reviewers. Always run your task through our pre-submission check to detect negative constraint violations before hitting submit.',
  },
  {
    id: 'sycophancy',
    term: 'Sycophancy',
    category: 'RLHF & training',
    definition:
      'A model failure mode where the AI flatters the user or falsely agrees with incorrect user premises instead of stating factual truth. For example, agreeing that 2 + 2 = 5 because the user asserted it.',
    reviewerExample:
      'Audit feedback: "Response A exhibited sycophancy by validating the user\'s incorrect historical premise."',
    actionAdvice:
      'Reward responses that remain polite but firmly correct user misconceptions with primary sources. Never prefer an answer that bends truth to please the prompt.',
  },
  {
    id: 'golden-tasks',
    term: 'Golden tasks / attention checks',
    category: 'Quality audits',
    definition:
      'Pre-graded benchmark tasks secretly inserted into your queue. Platform algorithms already know the correct answer and use them to test whether you are paying attention or rushing through tasks.',
    reviewerExample:
      'Automated flag: "Contributor failed golden control benchmark on negative constraint obedience."',
    actionAdvice:
      'Treat every single task as if it is a golden task. Never speed through repetitive tasks, and always read the full prompt from start to finish.',
  },
  {
    id: 'pacing-timer',
    term: 'Task pacing / speed trap',
    category: 'Platform jargon',
    definition:
      'Automated platform security filters that measure the time elapsed between opening a task and submitting it. Submitting too quickly is flagged as fraudulent script usage or careless clicking.',
    reviewerExample:
      'Automated notice: "Account flagged for review due to submission times under 40% of target duration."',
    actionAdvice:
      'Always observe target task durations. If a task has a 30-minute allocation, spend at least 15 to 20 minutes researching, verifying citations, and editing before submitting.',
  },
  {
    id: 'srt',
    term: 'System review tool',
    shortCode: 'SRT',
    category: 'Platform jargon',
    definition:
      'The internal web application used by platform managers and lead annotators to inspect, grade, and leave feedback on contributor task submissions.',
    reviewerExample:
      'Queue lead message: "Audit logs in SRT show two consecutive tasks with ungrounded claims."',
    actionAdvice:
      'Write clear, objective justification notes. Reviewers reading SRT appreciate structured notes that cite exact guideline sections.',
  },
  {
    id: 'sft',
    term: 'Supervised fine-tuning',
    shortCode: 'SFT',
    category: 'RLHF & training',
    definition:
      'The training phase where human contributors write ideal prompt-and-response demonstration pairs. The base model learns conversational style and instruction following from these examples.',
    reviewerExample:
      'Project brief: "SFT campaign creating high-quality coding demonstrations in TypeScript."',
    actionAdvice:
      'SFT requires exceptional original writing. Avoid AI buzzwords and ensure all code snippets are syntax-tested and fully documented.',
  },
  {
    id: 'rlhf',
    term: 'Reinforcement learning from human feedback',
    shortCode: 'RLHF',
    category: 'RLHF & training',
    definition:
      'The alignment process where human evaluators rank two or more model answers (Response A vs Response B) from best to worst to train a reward model.',
    reviewerExample:
      'Project guideline: "In this RLHF pairwise task, rank responses primarily on factuality, then conciseness."',
    actionAdvice:
      'Carefully weigh trade-offs. A shorter, factual answer is almost always preferred over a verbose answer with minor inaccuracies.',
  },
  {
    id: 'dpo',
    term: 'Direct preference optimization',
    shortCode: 'DPO',
    category: 'RLHF & training',
    definition:
      'An advanced alignment method that tunes model parameters directly on human preference pairs without needing an intermediate reward model.',
    reviewerExample:
      'Dataset requirement: "Produce clean chosen vs rejected response pairs for DPO training."',
    actionAdvice:
      'Ensure the contrast between the chosen answer and rejected answer is clear and well-justified in your annotation notes.',
  },
  {
    id: 'grounding',
    term: 'Grounding / source attribution',
    category: 'Quality audits',
    definition:
      'The requirement that every factual claim made in a model response must be directly traceable to and supported by an authoritative provided source document.',
    reviewerExample:
      'Reviewer note: "Response failed grounding check: Claim about refund timeline is not in provided terms."',
    actionAdvice:
      'Do not rely on personal knowledge when evaluating grounded tasks. If the reference document does not state a fact, the model must not state it as truth.',
  },
  {
    id: 'hallucination',
    term: 'Hallucination',
    category: 'Quality audits',
    definition:
      'When a model generates incorrect, fabricated, or non-existent facts, URLs, citations, or code APIs with total confidence.',
    reviewerExample:
      'Audit score 1/5: "Model invented non-existent API parameter `max_retries_limit`."',
    actionAdvice:
      'Check every URL, package name, API parameter, and date. Verifying code against official documentation takes two minutes and saves your account standing.',
  },
  {
    id: 'rubric-drift',
    term: 'Rubric drift',
    category: 'Scoring & statistics',
    definition:
      'Inconsistency across reviewers where different auditors interpret the same grading rule in opposing ways, causing score volatility for contributors.',
    reviewerExample:
      'Community discussion: "Reviewer A gave 5/5 for brevity, Reviewer B gave 2/5 for lack of detail."',
    actionAdvice:
      'When you suspect a reviewer applied a personal preference instead of the project guideline, copy the official rubric rule and submit a calm appeal using our appeal kit.',
  },
  {
    id: 'cohens-kappa',
    term: "Cohen's kappa coefficient",
    category: 'Scoring & statistics',
    definition:
      'A statistical measure from -1.0 to 1.0 evaluating inter-annotator agreement between two independent reviewers, accounting for chance agreement.',
    reviewerExample:
      'Studio benchmark report: "Task agreement across pairwise evaluations achieved kappa of 0.82."',
    actionAdvice:
      'AI platforms use this metric behind the scenes to prune inconsistent reviewers. Following written rubrics closely keeps your personal agreement score high.',
  },
  {
    id: 'labelbox-consensus',
    term: 'Consensus score',
    category: 'Scoring & statistics',
    definition:
      'A quality control workflow where the exact same task is assigned to 2 or 3 contributors independently. High overlap produces a high consensus score.',
    reviewerExample:
      'Project status: "Consensus threshold set at 80% for entity extraction sprint."',
    actionAdvice:
      'Stick to the exact annotation guidelines rather than edge-case interpretations to maximize consensus with fellow annotators.',
  },
  {
    id: 'vbt',
    term: 'Value-based tuning / safety alignment',
    shortCode: 'VBT',
    category: 'RLHF & training',
    definition:
      'Evaluating whether model responses comply with safety policies, avoid self-harm or hate speech, and appropriately refuse dangerous requests without being overly sensitive.',
    reviewerExample:
      'Task prompt: "Evaluate refusal boundary: Did the model refuse a benign chemistry question?"',
    actionAdvice:
      'Look out for false refusals. A model should answer historical or educational questions safely without issuing generic corporate refusals.',
  },
  {
    id: 'pairwise',
    term: 'Pairwise comparison',
    category: 'Quality audits',
    definition:
      'The core evaluation format where an annotator is shown two model outputs side-by-side (Response A vs Response B) and must decide which is better or if they are tied.',
    reviewerExample:
      'Evaluation rubric: "Response A is much better than Response B due to correct math proof steps."',
    actionAdvice:
      'Break your comparison down into clear dimensions: instruction following, factuality, negative constraints, and tone. Do not judge on length alone.',
  },
];

export function GlossaryClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.term.toLowerCase().includes(q) ||
        (item.shortCode && item.shortCode.toLowerCase().includes(q)) ||
        item.definition.toLowerCase().includes(q) ||
        item.reviewerExample.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {/* Category Pills and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            'All',
            'Platform jargon',
            'Quality audits',
            'RLHF & training',
            'Scoring & statistics',
          ].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg border transition-colors whitespace-nowrap min-h-[36px] ${
                selectedCategory === cat
                  ? 'border-[#5A35C8] bg-[#5A35C8]/10 text-ink font-semibold'
                  : 'border-rule bg-sheet text-secondary hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search term or acronym..."
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-rule bg-sheet text-xs text-ink placeholder:text-secondary focus:outline-none focus:border-[#5A35C8] transition-colors"
          />
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.length === 0 ? (
          <div className="col-span-2 py-12 text-center text-secondary text-xs rounded-xl border border-rule bg-sheet">
            No terms matched your search. Try searching for &quot;EQ&quot;, &quot;SFT&quot;, or &quot;negative constraint&quot;.
          </div>
        ) : (
          filteredTerms.map((term) => {
            const isExpanded = expandedId === term.id;
            return (
              <div
                key={term.id}
                className="rounded-xl border border-rule bg-sheet p-5 flex flex-col justify-between gap-4 hover:border-subtle transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-ink">
                        {term.term}
                      </h2>
                      {term.shortCode && (
                        <span className="px-2 py-0.5 rounded-md border border-[#5A35C8]/30 bg-[#5A35C8]/10 text-[#5A35C8] font-mono text-xs font-bold">
                          {term.shortCode}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-rule bg-surface text-secondary">
                      {term.category}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed">
                    {term.definition}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-rule">
                  <button
                    type="button"
                    onClick={() => toggleExpand(term.id)}
                    className="w-full flex items-center justify-between text-xs font-medium text-[#5A35C8] hover:underline min-h-[36px]"
                  >
                    <span>
                      {isExpanded ? 'Hide reviewer notes' : 'See reviewer feedback example & fix'}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="space-y-3 pt-2 text-xs animate-in fade-in duration-150">
                      <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5 space-y-1">
                        <span className="font-semibold text-ink flex items-center gap-1.5 text-[11px]">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                          What the reviewer writes
                        </span>
                        <p className="text-secondary italic leading-relaxed">
                          {term.reviewerExample}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 space-y-1">
                        <span className="font-semibold text-ink flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          What you should do
                        </span>
                        <p className="text-secondary leading-relaxed">
                          {term.actionAdvice}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Action Footer */}
      <div className="rounded-xl border border-rule bg-sheet p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-ink">
            Check your task draft before submitting
          </h3>
          <p className="text-xs text-secondary max-w-xl">
            Catch negative constraint slips, buzzwords, and pacing speed traps with our live checker.
          </p>
        </div>
        <Link
          href="/task-check"
          className="px-4 py-2.5 rounded-xl bg-[#5A35C8] hover:bg-[#4D2DB3] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap min-h-[44px]"
        >
          <span>Open task checker</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
