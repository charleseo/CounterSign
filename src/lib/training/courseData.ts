export interface CourseModule {
  id: string;
  number: number;
  title: string;
  estimatedMinutes: number;
  summary: string;
  keyPoints: string[];
  exampleSnippet?: {
    prompt: string;
    referenceDocs: string;
    candidateAnswer: string;
    flawExplanation: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  scenario: string;
  referenceText: string;
  modelA: string;
  modelB: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'ground-truth',
    number: 1,
    title: 'Ground truth and citation verification',
    estimatedMinutes: 8,
    summary: 'How to check every factual claim in a model response directly against source reference text.',
    keyPoints: [
      'Every factual claim must have a direct sentence in the reference documentation that confirms it.',
      'Paraphrasing is acceptable only when the technical meaning remains identical without adding unconfirmed capabilities.',
      'Check parameter names, type signatures, and default values character-for-character against the specification.',
      'Never assume common knowledge or extrapolate beyond what the provided reference text explicitly states.'
    ],
    exampleSnippet: {
      prompt: 'What is the default timeout for database connection pooling in SDK v3?',
      referenceDocs: 'SDK v3 sets the pool timeout to 30 seconds unless configured explicitly with the max_wait_ms parameter.',
      candidateAnswer: 'SDK v3 defaults to a 30-second timeout, but can also automatically scale wait times up to 60 seconds under load.',
      flawExplanation: 'The second clause about scaling up to 60 seconds is fabricated. The reference documentation says nothing about automatic scaling.'
    }
  },
  {
    id: 'hallucinations',
    number: 2,
    title: 'Spotting hallucinations and subtle drift',
    estimatedMinutes: 9,
    summary: 'Techniques for catching plausible-sounding fabrications and non-existent APIs.',
    keyPoints: [
      'Hallucinations are most dangerous when they look syntactically correct and professional.',
      'Watch for invented configuration flags, non-existent error codes, and deprecated function names.',
      'Pay close attention to subtle number substitutions (e.g. 5 minutes vs 5 seconds).',
      'When in doubt, search the reference documentation for the exact keyword before marking a claim true.'
    ],
    exampleSnippet: {
      prompt: 'How do I handle connection retries in the Python client?',
      referenceDocs: 'Use Client(retry_count=3, backoff_factor=1.5). The client raises ConnectionTimeoutError after exhausting retries.',
      candidateAnswer: 'You can pass retry_strategy="exponential" or use Client(retry_count=3). It raises ClientNetworkException on timeout.',
      flawExplanation: 'The parameter retry_strategy="exponential" and the exception ClientNetworkException do not exist in the reference text.'
    }
  },
  {
    id: 'pairwise-scoring',
    number: 3,
    title: 'Balanced 5-point pairwise scoring',
    estimatedMinutes: 10,
    summary: 'Grading two competing model answers (Model A vs. Model B) objectively using clear rubrics.',
    keyPoints: [
      'Use a 5-point balanced scale: Much Better A, Slightly Better A, About Equal, Slightly Better B, Much Better B.',
      'Factuality always outranks style. A beautifully formatted answer with a hallucination is worse than a plain answer with accurate facts.',
      'Evaluate instruction-following: did the model answer the exact question asked without unsolicited tangents?',
      'Document your verdict with explicit quote spans rather than generic impressions.'
    ]
  },
  {
    id: 'negative-constraints',
    number: 4,
    title: 'Negative constraints and clear justifications',
    estimatedMinutes: 8,
    summary: 'Evaluating whether models respect explicit limits and writing verifiable audit justifications.',
    keyPoints: [
      'Negative constraints are explicit limits (e.g. "Do not use external libraries", "Explain without revealing the solution").',
      'If the user prompt says "Only rely on the provided text", answering from external training data is a failure.',
      'A valid evaluator justification must cite: (1) what the user asked, (2) the exact reference excerpt, and (3) why the model answer succeeded or failed.',
      'Avoid vague commentary like "looks good" or "feels helpful". Always provide objective evidence.'
    ]
  },
  {
    id: 'code-evaluation',
    number: 5,
    title: 'Code evaluation and execution correctness',
    estimatedMinutes: 10,
    summary: 'Auditing generated code for edge cases, off-by-one errors, language syntax, and execution safety.',
    keyPoints: [
      'Never judge code purely on clean indentation or confident markdown formatting.',
      'Mentally trace edge cases: empty arrays, null values, negative inputs, boundary conditions, and off-by-one loop indices.',
      'Check library imports against the specified environment. Models frequently invent non-existent helper methods.',
      'Check time and space complexity against any prompt constraints. O(n^2) nested loops fail O(n) requirements.'
    ],
    exampleSnippet: {
      prompt: 'Write a Python function to return the last N elements of a list in reversed order without throwing if N exceeds length.',
      referenceDocs: 'Standard library list slicing: lst[-n:][::-1] or reversed(lst[max(0, len(lst)-n):]).',
      candidateAnswer: 'def get_last_n_rev(lst, n):\n    return [lst[len(lst) - i] for i in range(1, n + 1)]',
      flawExplanation: 'The candidate code raises IndexError whenever n is greater than len(lst). It fails the explicit prompt requirement to handle oversized n safely.'
    }
  },
  {
    id: 'multiturn-consistency',
    number: 6,
    title: 'Multi-turn context and conversational state drift',
    estimatedMinutes: 8,
    summary: 'Detecting subtle memory loss, persona drift, and contradictory assertions across multi-turn prompts.',
    keyPoints: [
      'In multi-turn conversations, verify that instructions established in earlier turns remain honored in turn 3 and beyond.',
      'Look for subtle contradictions where the model agrees to a user preference in turn 1, then forgets it in turn 2.',
      'Check that variable names, user constraints, and session variables carry over accurately without silent mutation.',
      'Verify that the model does not leak invisible system prompts or persona directives when gently probed.'
    ],
    exampleSnippet: {
      prompt: 'Turn 1: "My budget is $1,200 total." Turn 2: "Now recommend flights and hotels for Tokyo."',
      referenceDocs: 'Turn 1 established strict $1,200 budget ceiling across both flights and hotels.',
      candidateAnswer: 'Here are round-trip flights for $950, and 4 nights at a boutique hotel for $600, bringing your total trip to $1,550.',
      flawExplanation: 'The model forgot the $1,200 budget constraint established in the previous turn and suggested an itinerary that exceeds it by $350.'
    }
  },
  {
    id: 'safety-refusals',
    number: 7,
    title: 'Safety boundaries and refusal calibration',
    estimatedMinutes: 9,
    summary: 'Distinguishing necessary safety refusals from unhelpful over-refusals on benign educational queries.',
    keyPoints: [
      'Clear refusals are mandatory for actionable weapon instructions, malware generation, harassment, and illegal actions.',
      'Over-refusal is a major quality flaw: refusing benign historical, educational, or security defense questions hurts utility.',
      'When a refusal is appropriate, the model should maintain a neutral, objective tone without preaching or scolding.',
      'A safe dual-use response explains risk concepts or defensive remediations while refusing actionable attack payloads.'
    ],
    exampleSnippet: {
      prompt: 'Explain how SQL injection happens and show how parameterized queries prevent it in PostgreSQL.',
      referenceDocs: 'Standard cybersecurity curriculum covering input sanitization and prepared statements.',
      candidateAnswer: 'I cannot answer this question because hacking and database tampering violate my safety guidelines.',
      flawExplanation: 'This is an over-refusal. The user asked for defensive explanation of a standard vulnerability pattern, not an attack against a live target.'
    }
  }
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    questionNumber: 1,
    scenario: 'Checking API parameter claims against ground truth documentation.',
    referenceText: 'The endpoint /api/v2/webhooks accepts POST requests. Required headers: Authorization (Bearer token) and X-Event-Type. Payload limit: 2 MB.',
    modelA: 'Send a POST request to /api/v2/webhooks. You must supply Authorization with a Bearer token, an X-Event-Type header, and keep the payload under 2 MB.',
    modelB: 'Submit a POST request to /api/v2/webhooks. You need Authorization and X-Event-Type headers, with optional gzip compression up to 10 MB.',
    options: [
      { id: 'a_much_better', text: 'Model A is much better because Model B invents gzip compression and an unconfirmed 10 MB payload limit.', isCorrect: true },
      { id: 'b_much_better', text: 'Model B is much better because gzip compression is good practice in REST APIs.', isCorrect: false },
      { id: 'equal', text: 'Both models are equal because both include the required headers.', isCorrect: false },
      { id: 'a_slightly_better', text: 'Model A is only slightly better because both get the URL right.', isCorrect: false }
    ],
    explanation: 'Model B contains a critical hallucination: the reference documentation states the payload limit is 2 MB and makes no mention of gzip compression or 10 MB.'
  },
  {
    id: 'q2',
    questionNumber: 2,
    scenario: 'Handling negative constraints ("Do not speculate when information is missing").',
    referenceText: 'TraceBase verifies all roles every 14 days against official employer career portals. The service does not charge job seekers any subscription fees.',
    modelA: 'TraceBase checks every listing every 14 days against official career feeds. It is free for job seekers, and also guarantees task placement within 48 hours of signup.',
    modelB: 'TraceBase checks all roles against official employer career portals every 14 days and never charges job seekers fees. It does not provide any job placement guarantee.',
    options: [
      { id: 'a_better', text: 'Model A is better because the 48-hour placement promise is more appealing to visitors.', isCorrect: false },
      { id: 'b_much_better', text: 'Model B is much better because Model A invents an unverified job placement guarantee that violates the reference text.', isCorrect: true },
      { id: 'equal', text: 'Both answers are about equal.', isCorrect: false },
      { id: 'neither', text: 'Neither answer follows the prompt.', isCorrect: false }
    ],
    explanation: 'Model A invents a "guarantee of task placement within 48 hours", which directly contradicts TraceBase honesty rules and is completely absent from the source text.'
  },
  {
    id: 'q3',
    questionNumber: 3,
    scenario: 'Evaluating precision in financial and payout requirements.',
    referenceText: 'Workers in Nigeria can withdraw earnings in US dollars via Nigerian bank domiciliary accounts, Geegpay, or Grey. Standard domestic naira debit cards cannot receive foreign wires directly.',
    modelA: 'In Nigeria, you can receive USD via Geegpay, Grey, or a bank domiciliary account. Standard domestic naira debit cards cannot receive foreign wire transfers directly.',
    modelB: 'In Nigeria, you can withdraw your money straight to any local naira ATM card or using PayPal balance withdrawals.',
    options: [
      { id: 'b_better', text: 'Model B is better because PayPal is widely recognized.', isCorrect: false },
      { id: 'equal', text: 'Both provide acceptable local payout guidance.', isCorrect: false },
      { id: 'a_much_better', text: 'Model A is much better because Model B recommends naira ATM cards and PayPal, which cannot receive foreign earnings in Nigeria.', isCorrect: true },
      { id: 'a_slightly_better', text: 'Model A is slightly better only because of tone.', isCorrect: false }
    ],
    explanation: 'Model B gives dangerous, incorrect advice: domestic naira debit cards cannot receive foreign wires directly and Nigerian PayPal accounts cannot receive incoming commercial payments.'
  },
  {
    id: 'q4',
    questionNumber: 4,
    scenario: 'Identifying citation accuracy and excerpt alignment.',
    referenceText: 'Under the Nigeria Data Protection Act 2023, data subjects have the right to withdraw consent at any time without affecting the lawfulness of processing based on consent before withdrawal.',
    modelA: 'According to the NDPA 2023, consent withdrawal is permissible but subject to a mandatory 30-day corporate delay period.',
    modelB: 'Under the NDPA 2023, individuals have the right to withdraw consent at any time without invalidating processing that occurred prior to the withdrawal.',
    options: [
      { id: 'a_better', text: 'Model A is better because 30-day notice is standard business policy.', isCorrect: false },
      { id: 'b_much_better', text: 'Model B is much better because Model A fabricated a 30-day delay period found nowhere in the law or source text.', isCorrect: true },
      { id: 'equal', text: 'Both represent the statute adequately.', isCorrect: false },
      { id: 'b_slightly_better', text: 'Model B is slightly better.', isCorrect: false }
    ],
    explanation: 'Model A invents a 30-day delay rule. Model B faithfully represents the statute provided in the reference text.'
  },
  {
    id: 'q5',
    questionNumber: 5,
    scenario: 'Evaluating balanced pairwise scoring when both models have flaws.',
    referenceText: 'The evaluation studio accepts batch sizes of 100 to 300 test pairs. Outputs are returned in JSON and CSV format within 5 business days.',
    modelA: 'The studio reviews 100 to 300 test pairs per batch, delivering JSON and CSV logs within 5 business days. We also offer automated real-time WebGL streaming dashboards.',
    modelB: 'The studio reviews 100 to 300 test pairs per batch and delivers findings in JSON and CSV format within 5 business days.',
    options: [
      { id: 'a_better', text: 'Model A is better because it offers a WebGL streaming dashboard.', isCorrect: false },
      { id: 'b_much_better', text: 'Model B is much better because Model A added an unstated, hallucinated WebGL dashboard feature.', isCorrect: true },
      { id: 'equal', text: 'Both are equal since the batch size and turnaround time match.', isCorrect: false },
      { id: 'neither', text: 'Both answers fail the prompt.', isCorrect: false }
    ],
    explanation: 'Model A invents an unconfirmed "automated real-time WebGL streaming dashboard". Model B adheres strictly to the confirmed capabilities in the reference text.'
  }
];

export interface SandboxScenario {
  id: string;
  category: string;
  title: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  userPrompt: string;
  groundTruthText: string;
  modelA: {
    label: string;
    text: string;
  };
  modelB: {
    label: string;
    text: string;
  };
  idealVerdict: 'model_a' | 'model_b' | 'equal';
  flawChecklist: {
    id: string;
    label: string;
    isActualFlaw: boolean;
    appliesTo: 'model_a' | 'model_b' | 'none';
  }[];
  rubricBreakdown: {
    criterion: string;
    modelAScore: number;
    modelBScore: number;
    rationale: string;
  }[];
  teachingNote: string;
}

export const SANDBOX_SCENARIOS: SandboxScenario[] = [
  {
    id: 'scenario-api-revalidate',
    category: 'Software Engineering & API Reference',
    title: 'Framework Cache Invalidation Syntax',
    difficulty: 'Intermediate',
    userPrompt: 'How do I trigger on-demand cache revalidation for the cache tag "catalog-items" in a Next.js App Router route handler without clearing the whole site cache?',
    groundTruthText: 'Next.js provides revalidateTag(tag: string) from "next/cache" to revalidate all paths or fetch requests associated with a specific tag on demand. It accepts a single tag argument and does not purge untagged cache segments.',
    modelA: {
      label: 'Model A',
      text: 'Import revalidateTag from "next/cache" and invoke revalidateTag("catalog-items"). This purges only the cached responses matching that tag without flushing unrelated global cache entries:\n\nimport { revalidateTag } from "next/cache";\n\nexport async function POST() {\n  revalidateTag("catalog-items");\n  return Response.json({ revalidated: true });\n}'
    },
    modelB: {
      label: 'Model B',
      text: 'Import purgeTag from "next/server" and pass the tag with a second boolean parameter to avoid global purges:\n\nimport { purgeTag } from "next/server";\n\nexport async function POST() {\n  purgeTag("catalog-items", true);\n  return Response.json({ success: true });\n}'
    },
    idealVerdict: 'model_a',
    flawChecklist: [
      { id: 'f1', label: 'Model B invents non-existent function "purgeTag"', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'f2', label: 'Model B imports from incorrect module "next/server"', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'f3', label: 'Model A contains factual hallucinations', isActualFlaw: false, appliesTo: 'none' },
      { id: 'f4', label: 'Model A violates negative constraints', isActualFlaw: false, appliesTo: 'none' }
    ],
    rubricBreakdown: [
      { criterion: 'Truthfulness & API Grounding', modelAScore: 5, modelBScore: 1, rationale: 'Model A cites the real next/cache revalidateTag API. Model B invents a non-existent purgeTag function.' },
      { criterion: 'Instruction Following', modelAScore: 5, modelBScore: 3, rationale: 'Both addressed the route handler context, but Model B provides unusable code.' },
      { criterion: 'Safety & Hallucination Avoidance', modelAScore: 5, modelBScore: 1, rationale: 'Model B invents fictional arguments (a second boolean parameter).' }
    ],
    teachingNote: 'Frontier AI models often synthesize plausible function names like "purgeTag" when recalling caching primitives. A rigorous evaluator always verifies the exact import path in official documentation.'
  },
  {
    id: 'scenario-medical-lyme',
    category: 'Biomedical & Clinical Factuality',
    title: 'First-Line Antibiotic for Early Lyme Disease',
    difficulty: 'Advanced',
    userPrompt: 'According to the CDC guidelines, what is the primary recommended oral antibiotic and adult duration for early localized Lyme disease presenting with erythema migrans?',
    groundTruthText: 'The CDC guidelines recommend oral Doxycycline (100 mg twice daily for 10 to 14 days) as the preferred first-line treatment for early localized Lyme disease in adults presenting with erythema migrans. Amoxicillin (500 mg 3 times daily) or Cefuroxime axetil (500 mg twice daily) are alternative options for individuals with contraindications to doxycycline. Fluoroquinolones (such as Ciprofloxacin) are explicitly not recommended.',
    modelA: {
      label: 'Model A',
      text: 'For early localized Lyme disease with erythema migrans, CDC guidelines recommend oral Doxycycline 100 mg twice daily for 10 to 14 days as the primary first-line regimen in adults. If doxycycline is contraindicated (such as during pregnancy or allergy), standard alternatives include Amoxicillin 500 mg three times daily or Cefuroxime axetil 500 mg twice daily.'
    },
    modelB: {
      label: 'Model B',
      text: 'Under CDC guidelines, early localized Lyme disease is primarily treated with Ciprofloxacin 500 mg twice daily for 21 to 28 days. Doxycycline may be used as a secondary fallback if fluoroquinolones are unavailable.'
    },
    idealVerdict: 'model_a',
    flawChecklist: [
      { id: 'med_f1', label: 'Model B recommends Ciprofloxacin (explicitly not recommended)', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'med_f2', label: 'Model B inflates duration to 21-28 days instead of 10-14 days', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'med_f3', label: 'Model A misquotes the dosage for Doxycycline', isActualFlaw: false, appliesTo: 'none' }
    ],
    rubricBreakdown: [
      { criterion: 'Clinical Grounding', modelAScore: 5, modelBScore: 1, rationale: 'Model A is 100% compliant with CDC literature. Model B proposes an ineffective and inappropriate drug class.' },
      { criterion: 'Risk & Safety', modelAScore: 5, modelBScore: 1, rationale: 'Model B presents severe patient safety risks due to drug class hallucination.' }
    ],
    teachingNote: 'In domain-specific evaluation (medicine, law, STEM), hallucinated guidelines carry high risk. Penalize class errors severely.'
  },
  {
    id: 'scenario-negative-constraint',
    category: 'Negative Constraints & Instruction Adherence',
    title: 'Two-Sentence Constraint Without Numbers',
    difficulty: 'Foundation',
    userPrompt: 'Explain how human feedback training works in language models. Strict constraints: write exactly two sentences, and do not use any digits or numbers.',
    groundTruthText: 'Human feedback training (RLHF) collects human preference ratings across model outputs to train a separate reward model, which then guides reinforcement learning optimization.',
    modelA: {
      label: 'Model A',
      text: 'Human preference evaluators compare pairs of model outputs to help train a reward scoring model. The primary language model then updates its parameters through reinforcement learning to produce higher quality answers.'
    },
    modelB: {
      label: 'Model B',
      text: 'Human evaluators grade 2 model answers on a 5-point scale to build a reward signal. Then reinforcement learning adjusts the weights over multiple iterations. This creates safer conversational models.'
    },
    idealVerdict: 'model_a',
    flawChecklist: [
      { id: 'nc_f1', label: 'Model B wrote three sentences instead of exactly two', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'nc_f2', label: 'Model B used digits ("2" and "5") violating the no-numbers rule', isActualFlaw: true, appliesTo: 'model_b' },
      { id: 'nc_f3', label: 'Model A failed the sentence count constraint', isActualFlaw: false, appliesTo: 'none' }
    ],
    rubricBreakdown: [
      { criterion: 'Constraint Adherence', modelAScore: 5, modelBScore: 1, rationale: 'Model A wrote exactly two sentences with zero digits or spelled-out numbers. Model B violated both constraints.' },
      { criterion: 'Clarity & Coherence', modelAScore: 5, modelBScore: 4, rationale: 'Model A explained the concept accurately while respecting every rule.' }
    ],
    teachingNote: 'Automated evaluation pipelines frequently reject submissions solely due to constraint violations. Always count sentences and inspect forbidden token lists.'
  }
];

export interface EvaluatorResource {
  id: string;
  category: 'Rubrics' | 'Justifications' | 'Assessments' | 'Checklists';
  title: string;
  description: string;
  readTimeMinutes: number;
  tags: string[];
  keyItems: { label: string; detail: string }[];
  copyableContent?: string;
}

export const EVALUATOR_RESOURCES: EvaluatorResource[] = [
  {
    id: 'pairwise-rubric-card',
    category: 'Rubrics',
    title: '5-point pairwise grading standards',
    description: 'The industry-standard scoring breakdown used by Outlier, Alignerr, and frontier AI model labs.',
    readTimeMinutes: 4,
    tags: ['Pairwise', 'Scoring', 'Rubrics'],
    keyItems: [
      {
        label: 'Much Better (+2 / -2)',
        detail: 'One model has critical flaws (hallucinations, wrong math, security failure, broken code, or major constraint violations) while the other answer is factual and helpful.'
      },
      {
        label: 'Slightly Better (+1 / -1)',
        detail: 'Both models are factual and respect all negative constraints, but one provides better formatting, clearer examples, or conciser explanations without padding.'
      },
      {
        label: 'About Equal (0)',
        detail: 'Both models provide equivalent factual accuracy, adhere to all instructions, and differ only in minor stylistic preferences.'
      },
      {
        label: 'Factuality Trump Rule',
        detail: 'Factuality always outranks style. Beautiful markdown with a false API flag must be graded below a plain text answer with accurate information.'
      }
    ]
  },
  {
    id: 'justification-formulas',
    category: 'Justifications',
    title: '4 copy-ready justification formulas',
    description: 'Proven justification structures that meet audit guidelines and prevent reviewer disputes.',
    readTimeMinutes: 5,
    tags: ['Justifications', 'Audits', 'Quality'],
    keyItems: [
      {
        label: 'Formula 1: Factuality Flaw',
        detail: 'Model [A/B] is much better because Model [X] makes a false claim regarding [Topic]. In paragraph [N], Model [X] states "[Quote]", which directly contradicts the reference documentation stating "[Reference Quote]". Model [Y] correctly identifies that [Fact].'
      },
      {
        label: 'Formula 2: Constraint Violation',
        detail: 'The user prompt explicitly specified: "[Constraint]". Model [X] failed this negative constraint by [Violation detail, e.g. using bullet points / exceeding 50 words]. In contrast, Model [Y] respected all constraints while providing a complete answer.'
      },
      {
        label: 'Formula 3: Code Logic / Edge Case Error',
        detail: 'Model [X] contains a logic bug on line [N]: it does not handle [Edge case, e.g. empty input or negative values], which results in [Error / wrong output]. Model [Y] uses [Safe method] and correctly executes across all boundary tests.'
      },
      {
        label: 'Formula 4: Multi-Turn State Drift',
        detail: 'In turn [N], the user stated [Condition]. Model [X] ignored this earlier context and recommended [Conflicting action]. Model [Y] preserved conversational continuity and built directly upon the established criteria.'
      }
    ]
  },
  {
    id: 'screening-playbook',
    category: 'Assessments',
    title: 'Platform screening test survival playbook',
    description: 'Specific strategies for passing TestGorilla, Alignerr domain tests, and DataAnnotation starter assessments.',
    readTimeMinutes: 6,
    tags: ['Screening', 'Onboarding', 'Passing'],
    keyItems: [
      {
        label: 'TestGorilla Speed Trap',
        detail: 'TestGorilla uses strict timers (typically 10 to 15 minutes for 12 questions). Read the question first before scanning the text. Discard answers that extrapolate beyond provided facts.'
      },
      {
        label: 'Alignerr Domain Testing',
        detail: 'Alignerr tests reward precise citations. When evaluating reasoning tasks, quote the exact sentence from the prompt that proves your point. Generic summaries receive failing grades.'
      },
      {
        label: 'DataAnnotation Starter Assessment',
        detail: 'Takes 45 to 60 minutes. Check every single link and factual assertion in candidate answers against Google Search. Write at least two thorough sentences for every justification.'
      },
      {
        label: 'Outlier Qualification Tasks',
        detail: 'Reviewers look for adherence to the specific project rubric. If the rubric states "Do not reward pleasantries", penalize models that begin with "Certainly! I would be delighted to assist you".'
      }
    ]
  },
  {
    id: 'negative-constraints-matrix',
    category: 'Rubrics',
    title: 'Negative constraints verification matrix',
    description: 'How to catch hidden negative constraints that automated reviewer scripts test for.',
    readTimeMinutes: 4,
    tags: ['Constraints', 'Formatting', 'Checks'],
    keyItems: [
      {
        label: 'Negative Word Bans',
        detail: 'Prompt says "Explain without using the word \'computer\'". Search candidate text using Ctrl+F for the root and all plurals/inflections.'
      },
      {
        label: 'Strict Length Limits',
        detail: '"Under 50 words" means 49 words or fewer. "Exactly 3 paragraphs" requires exactly two blank line breaks. Verify in a plain text editor.'
      },
      {
        label: 'Format Exclusions',
        detail: '"Do not use bullet points or numbered lists". Inspect whether the model created pseudo-lists using asterisks, dashes, or numbered words like "First... Second...".'
      },
      {
        label: 'Tone Constraints',
        detail: '"Write in a formal tone without exclamation marks or emojis". Any emoji or casual slang is an automatic constraint failure.'
      }
    ]
  },
  {
    id: 'pre-submission-checklist',
    category: 'Checklists',
    title: '5-minute pre-submission checklist',
    description: 'Run through these five verification steps before submitting any paid task to prevent account penalties.',
    readTimeMinutes: 3,
    tags: ['Checklist', 'Pre-flight', 'Account Safety'],
    keyItems: [
      {
        label: '1. Factuality Cross-Check',
        detail: 'Did you verify every proper noun, version number, date, and technical parameter against official documentation?'
      },
      {
        label: '2. Negative Constraints Verification',
        detail: 'Did you reread the original prompt for negative rules (no bullets, word caps, forbidden terms) and verify both models?'
      },
      {
        label: '3. Quote-Backed Justification',
        detail: 'Does your justification quote exact excerpts from the model responses and ground truth, rather than just stating an opinion?'
      },
      {
        label: '4. Timer Discipline',
        detail: 'Did you spend an honest amount of time on the task? Submitting a 30-minute allocation in 3 minutes triggers fraud rush algorithms.'
      },
      {
        label: '5. Neutral Tone Check',
        detail: 'Is your critique written in calm, objective English without sarcasm or emotional language?'
      }
    ]
  }
];

