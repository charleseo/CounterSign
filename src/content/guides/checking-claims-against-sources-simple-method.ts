import { Guide } from './types';

export const guideThree: Guide = {
  slug: 'checking-claims-against-sources-simple-method',
  title: 'Checking Claims Against Sources: A Simple Verification Method',
  subtitle: 'How human evaluators audit AI model citations, isolate hallucinations, and write audit-grade justifications that score in the 95th percentile on qualification tests.',
  readingTime: '7 min read',
  lastUpdated: '2026-10-14',
  lastCheckedDate: '12 Oct 2026',
  checkedBy: 'Ebubechukwu Okeke',
  published: true,
  author: {
    name: 'Ebubechukwu Okeke',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['AI Evaluation', 'Fact-Checking', 'RLHF', 'Rubrics'],
  summaryPoints: [
    'A citation is only valid if the exact asserted fact is explicitly supported by the cited text: plausible inference is treated as an unsupported claim in strict RLHF.',
    'Watch out for temporal mismatch: an AI model frequently cites a 2021 statute or older research paper to support a 2026 legal or technical claim.',
    'Strict negative constraints (such as "limit your rationale to 2 to 3 sentences" or "do not use technical jargon") are the leading cause of automated grading failures.',
    'Write justifications quoting direct text excerpts rather than summarizing general impressions.',
  ],
  sections: [
    {
      id: 'the-gold-standard-of-factuality',
      heading: '1. The gold standard of AI factuality evaluation',
      content: `When foundation model builders evaluate model responses for Retrieval-Augmented Generation (RAG) and reinforcement learning from human feedback (RLHF), factual accuracy is non-negotiable.

In novice evaluation, people often read an AI answer, notice that it sounds plausible and fluent, and give it top marks. In professional evaluation, fluency is largely irrelevant: every specific claim must be checked against the provided ground-truth source document.

The core principle is strict textual entailment:
- Fully Supported: The cited passage directly states the fact without requiring speculative leaps.
- Partially Supported: The source hints at the fact or provides related context, but does not confirm the specific number, date, or causal link asserted.
- Hallucinated or Contradicted: The source either contradicts the claim, or is completely silent regarding the assertion.`,
      callout: {
        type: 'info',
        title: 'The Plausibility Trap',
        text: 'Language models excel at generating plausible-sounding falsehoods. If a model cites page 14 of an API manual for a configuration flag, you must open page 14 and verify the exact flag name and syntax.',
      },
    },
    {
      id: 'three-step-citation-audit',
      heading: '2. The three-step citation audit workflow',
      content: `Whenever an evaluation task asks you to rate a model response with sources, execute this three-step sequence:

Step 1: Atomize the model response into discrete factual assertions.
Break compound paragraphs into atomic claims:
- Claim A: Entity X was founded in 2018.
- Claim B: Entity X acquired Company Y for $40 million.
- Claim C: Entity X currently operates in 14 countries.

Step 2: Inspect the cited source document for each atomic assertion.
Search the provided reference text for the specific keywords. If Claim B cites paragraph 4, confirm that both "Company Y" and "$40 million" appear in that exact context. If the source states "$40 million in combined assets" rather than an acquisition price, the claim is inaccurate.

Step 3: Document the exact textual discrepancy in your rationale.
Avoid vague comments like "Answer seems somewhat inaccurate." Professional reviewers expect exact quotes: "Claim B states the acquisition price was $40M, but Source 2 paragraph 4 states only that combined assets reached $40M. The assertion is unsupported."`,
    },
    {
      id: 'handling-negative-constraints',
      heading: '3. Mastering negative constraints and formatting rules',
      content: `In rubric assessments, "negative constraints" are instructions that prohibit specific behaviors:
- "Do not use bullet points."
- "Limit your explanation to exactly 2 to 3 sentences."
- "Do not mention the company name."
- "Avoid technical jargon."

Evaluation platforms use automated linters to grade human raters on benchmark tasks. If the prompt specifies "2 to 3 sentences" and you submit a 4-sentence rationale, an automated rule marks your assessment as failed regardless of how insightful your analysis was.

Always count your sentences and words before submitting. Check every negative constraint like a checklist item.`,
      callout: {
        type: 'warning',
        title: 'Automated Linter Discipline',
        text: 'Automated reviewer linters flag human reviewers who overlook length limits or forbidden words. Strict constraint adherence is what separates top-tier evaluators from rejected applicants.',
      },
    },
    {
      id: 'writing-bulletproof-justifications',
      heading: '4. How to write audit-grade justifications',
      content: `A high-scoring justification follows a repeatable four-part architecture:
1. Verdict: State clearly which model response is superior (or whether both are unacceptable).
2. Primary flaw: Identify the exact hallucination, omission, or constraint failure in the losing response.
3. Citation evidence: Quote the exact contradictory or missing phrase from the source document.
4. Constraint check: Confirm that the winning response adhered to all formatting and style instructions.

By structuring your comments with clear evidence, your ratings can be audited by quality assurance leads without confusion, ensuring your task queues stay active and well-compensated.`,
    },
  ],
  sources: [
    {
      title: 'Stanford Center for Research on Foundation Models: Factual Evaluation Frameworks',
      url: 'https://crfm.stanford.edu',
      label: 'official',
      notes: 'Academic benchmarking standards for measuring hallucination rates and citation precision in language models.',
    },
    {
      title: 'Outlier AI Evaluation Quality Guidelines',
      url: 'https://outlier.ai/faq',
      label: 'official',
      notes: 'Rubric criteria for rater justification structure, atomic claim verification, and benchmark grading.',
    },
    {
      title: 'TraceBase Studio Methodology: RAG & Citation Audits',
      url: '/methodology',
      label: 'official',
      notes: 'Our internal rubric for checking ground-truth text alignment and negative constraint compliance.',
    },
  ],
  practiceExercise: {
    id: 'ex-3-audit-citation-hallucination',
    title: 'Interactive Practice: Audit a Model Citation Pair',
    scenario: 'You are grading two model answers that cite a provided technical support policy document.',
    prompt: `Source Document:
"TraceBase provides standard human verification checks on all active listings every 14 days. If a listing cannot be re-verified within 30 days, it is automatically hidden from public search until re-checked."

User Question: "What happens to a job listing if it is not checked for 25 days?"

Evaluate the two model responses below:`,
    optionA: {
      label: 'Response A',
      text: 'According to the policy, the listing remains visible on public search but carries an amber Needs Recheck status, because the listing is only hidden if 30 days elapse without a check.',
    },
    optionB: {
      label: 'Response B',
      text: 'The listing is permanently deleted from the platform database and the company account is suspended immediately.',
    },
    targetConstraint: {
      minSentences: 2,
      maxSentences: 3,
      instructionText: 'Write a 2 to 3 sentence rationale explaining why Response A is accurate and Response B is a hallucination.',
    },
    modelAnswer: {
      preferredOption: 'A',
      rationale: 'Response A correctly reflects the provided policy by noting that a 25-day lapse exceeds the 14-day check window but falls short of the 30-day removal threshold. In contrast, Response B introduces severe hallucinations regarding permanent deletion and account suspension that are entirely absent from the source document. Response A is fully grounded and adheres strictly to the source text.',
      keyAuditPrinciple: 'Never award points for dramatic fabricated consequences. When a model asserts actions unmentioned in the source document, rate it as ungrounded.',
    },
  },
  relatedWorkTypes: ['Evaluation & RLHF', 'Model Evaluation', 'Domain Specialist'],
};
