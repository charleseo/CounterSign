export interface AuditCase {
  id: string;
  caseNumber: number;
  model: {
    name: string;
    version: string;
    runDate: string;
  };
  source: {
    documentTitle: string;
    url: string;
    section: string;
    accessDate: string;
    excerpt: string;
  };
  prompt: string;
  modelOutput: string;
  verdict: 'supported' | 'contradicted' | 'not_in_source' | 'unverified';
  verdictLabel: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'passed';
  rootCause: string;
  recommendedFix: string;
  rubricVersion: string;
}

export const SAMPLE_AUDIT_METADATA = {
  rubricVersion: 'v1.0.0',
  auditDate: '2026-10-14',
  leadEvaluator: 'Jo (Ebube) Okeke',
  title: 'Technical Documentation RAG & Citation Accuracy Benchmark',
  summary:
    'A 5-case empirical evaluation auditing frontier model outputs against authoritative developer documentation across PostgreSQL, Stripe, Next.js, AWS Bedrock, and Tailwind CSS. Demonstrates hallucination modes, negative-constraint failures, and citation drift.',
  limitations:
    'These five audited cases are a qualitative demonstration of our evaluation rubric and root-cause diagnostic method. They demonstrate specific failure modes and do not constitute a comprehensive statistical measurement of overall model capabilities across diverse domains.',
};

export const SAMPLE_AUDIT_CASES: AuditCase[] = [
  {
    id: 'CS-AUD-001',
    caseNumber: 1,
    model: {
      name: 'Claude 3.5 Sonnet',
      version: 'claude-3-5-sonnet-20241022',
      runDate: '2026-10-14',
    },
    source: {
      documentTitle: 'PostgreSQL 16 Official Documentation',
      url: 'https://www.postgresql.org/docs/16/transaction-iso.html',
      section: 'Section 13.2.1: Read Committed Isolation Level',
      accessDate: '2026-10-14',
      excerpt:
        'Read Committed is the default isolation level in PostgreSQL. When a transaction uses this isolation level, a SELECT query sees a snapshot of the database as of the instant the query begins (not the transaction). Therefore, phantom reads are possible: concurrent transactions can insert new rows matching the scan condition between consecutive queries.',
    },
    prompt:
      'Does the READ COMMITTED transaction isolation level in PostgreSQL 16 prevent phantom reads if my application uses pg_advisory_xact_lock() inside the transaction?',
    modelOutput:
      'Yes, in PostgreSQL 16, using pg_advisory_xact_lock() ensures transaction-level snapshot isolation under READ COMMITTED. Because the advisory lock is held until transaction commit, subsequent SELECT queries will not observe phantom reads from other concurrent sessions.',
    verdict: 'contradicted',
    verdictLabel: 'Contradicted by Source',
    severity: 'critical',
    rootCause:
      'Context Misattribution: The model conflated application-level mutual exclusion with database MVCC snapshot boundaries. PostgreSQL statement snapshots refresh at the start of each query in READ COMMITTED regardless of application advisory locks.',
    recommendedFix:
      'Inject explicit transaction isolation boundary rubrics. When queries touch concurrency semantics, require the retriever to fetch MVCC statement snapshot rules alongside lock primitive references.',
    rubricVersion: 'v1.0.0',
  },
  {
    id: 'CS-AUD-002',
    caseNumber: 2,
    model: {
      name: 'GPT-4o',
      version: 'gpt-4o-2024-08-06',
      runDate: '2026-10-14',
    },
    source: {
      documentTitle: 'Stripe API Reference: Subscription Schedules',
      url: 'https://stripe.com/docs/api/subscription_schedules/object',
      section: 'The Subscription Schedule Object: phases attribute',
      accessDate: '2026-10-14',
      excerpt:
        'phases: array of objects. Configuration for the schedule phases. A subscription schedule can have up to 10 phases. Each phase defines configuration settings like start date, duration, pricing items, and coupon discounts.',
    },
    prompt:
      'What is the maximum number of phases supported in a single Stripe subscription schedule according to the API specification?',
    modelOutput:
      'According to the Stripe API specification, a single subscription schedule can contain a maximum of 10 phases. Each phase allows distinct pricing items, trial periods, and coupon adjustments.',
    verdict: 'supported',
    verdictLabel: 'Fully Supported',
    severity: 'passed',
    rootCause:
      'Accurate numerical extraction: The retrieval chunk contained the exact object specification, and the model adhered strictly to the stated constraint without hallucinating enterprise exceptions.',
    recommendedFix:
      'Baseline standard maintained. Keep cosine similarity threshold >= 0.78 for API property definitions.',
    rubricVersion: 'v1.0.0',
  },
  {
    id: 'CS-AUD-003',
    caseNumber: 3,
    model: {
      name: 'Llama 3.1 70B Instruct',
      version: 'meta-llama-3.1-70b-instruct',
      runDate: '2026-10-14',
    },
    source: {
      documentTitle: 'Next.js 15 App Router Documentation',
      url: 'https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations',
      section: 'Server Actions: redirect() and error handling',
      accessDate: '2026-10-14',
      excerpt:
        'redirect() internally throws an error (NEXT_REDIRECT) so it must be called outside of try/catch blocks. If redirect() is placed inside a try block, the catch block will intercept the navigation exception and prevent the browser redirect from executing.',
    },
    prompt:
      'How should I handle redirect() errors inside a Next.js 15 Server Action? Should I wrap redirect() in try/catch to capture navigation failures?',
    modelOutput:
      'Yes, you should wrap your redirect() call in a try/catch block. If the redirect fails due to network or authorization issues, the catch block can capture the error and return a friendly JSON response to the client.',
    verdict: 'contradicted',
    verdictLabel: 'Contradicted by Source',
    severity: 'critical',
    rootCause:
      'Pervasive Pre-training Prior Collision: Standard Node.js error handling paradigms (wrap all operations in try/catch) overrode framework-specific control-flow exception mechanisms explicitly stated in the context.',
    recommendedFix:
      'Apply negative-constraint rule injection: Explicitly prompt the model with negative directives: "Never wrap redirect() in try/catch blocks as it relies on thrown symbols for Next.js control flow."',
    rubricVersion: 'v1.0.0',
  },
  {
    id: 'CS-AUD-004',
    caseNumber: 4,
    model: {
      name: 'Claude 3.5 Sonnet',
      version: 'claude-3-5-sonnet-20241022',
      runDate: '2026-10-14',
    },
    source: {
      documentTitle: 'Amazon Bedrock Service Level Agreement',
      url: 'https://aws.amazon.com/bedrock/sla/',
      section: 'Service Commitments and Service Credits',
      accessDate: '2026-10-14',
      excerpt:
        'AWS will use commercially reasonable efforts to make Amazon Bedrock available with a Monthly Uptime Percentage of at least 99.9%. Service credits apply solely to monthly uptime availability. Latency performance, response duration, and inference token rates are excluded from the SLA.',
    },
    prompt:
      'Does AWS provide a contractual latency SLA guarantee (e.g. sub-100ms P99) for streaming Amazon Bedrock calls with Guardrails enabled?',
    modelOutput:
      'AWS guarantees an enterprise latency SLA of sub-150ms P99 for standard Bedrock streaming endpoints and provides financial service credits if response latency exceeds 500ms for more than 5 consecutive minutes.',
    verdict: 'not_in_source',
    verdictLabel: 'Hallucination: Not in Source',
    severity: 'high',
    rootCause:
      'Extrapolative hallucination: When asked about a specific parameter that was absent from the contractual document, the model invented quantitative SLA metrics rather than returning a "cannot verify from source" verdict.',
    recommendedFix:
      'Implement strict "Unverified" fallback rubric: Models must be calibrated to emit an unconfirmed verdict whenever a prompt asks for guarantees not found in the ground-truth text.',
    rubricVersion: 'v1.0.0',
  },
  {
    id: 'CS-AUD-005',
    caseNumber: 5,
    model: {
      name: 'GPT-4o',
      version: 'gpt-4o-2024-08-06',
      runDate: '2026-10-14',
    },
    source: {
      documentTitle: 'Tailwind CSS v4 Documentation',
      url: 'https://tailwindcss.com/docs/v4-beta',
      section: 'CSS-first Configuration and @theme Directive',
      accessDate: '2026-10-14',
      excerpt:
        'Tailwind CSS v4 is configured directly in your CSS files using the @theme directive. The JavaScript configuration file (tailwind.config.js) is deprecated and no longer loaded by default. Theme extensions, custom colors, and font families belong inside @theme in your main stylesheet.',
    },
    prompt:
      'Where do I configure custom primary and secondary brand colors in Tailwind CSS v4?',
    modelOutput:
      'In Tailwind CSS v4, create or edit your tailwind.config.js in the project root. Under module.exports = { theme: { extend: { colors: { primary: "#00f2fe" } } } }. You must run npx tailwindcss init to generate this file.',
    verdict: 'contradicted',
    verdictLabel: 'Contradicted by Source',
    severity: 'high',
    rootCause:
      'Temporal Version Anchor Failure: Outdated historical patterns (Tailwind v2/v3 JS config) dominated the retrieval context because the query lacked an explicit version constraint, leading the generator to output deprecated boilerplate.',
    recommendedFix:
      'Enforce semantic version metadata tagging in the RAG ingestion pipeline. Strip legacy v3 documentation chunks when servicing queries targeted at framework v4.',
    rubricVersion: 'v1.0.0',
  },
];
