import {
  Job,
  Platform,
  PlatformStep,
  Country,
  JobEligibility,
  CheckLog,
  Report,
  EvalLead,
  AuditLog,
  PrivacyRequest,
  IncidentLog,
  JobWithPlatform,
  AdminStats,
  JobStatus,
  EligStatus,
} from './types';

// Initial ISO Countries (Master Plan Section 6 & 12)
const INITIAL_COUNTRIES: Country[] = [
  { code: 'US', name: 'United States', notes: 'Primary hub for direct W2 and US-contractor evaluation tiers' },
  { code: 'NG', name: 'Nigeria', notes: 'Active market for English, Pidgin, and local language RLHF/SFT' },
  { code: 'KE', name: 'Kenya', notes: 'East African hub for content moderation, translation, and technical annotation' },
  { code: 'GH', name: 'Ghana', notes: 'West African hub for multilingual data collection and reasoning evaluations' },
  { code: 'GB', name: 'United Kingdom', notes: 'European hub for STEM, legal, and creative evaluation' },
  { code: 'CA', name: 'Canada', notes: 'North American regional evaluation hub with bilingual EN/FR support' },
  { code: 'IN', name: 'India', notes: 'Large contributor base for coding, STEM, and multimodal annotation' },
  { code: 'PH', name: 'Philippines', notes: 'Hub for prompt engineering, general annotation, and customer agent fine-tuning' },
  { code: 'ZA', name: 'South Africa', notes: 'Multilingual evaluation hub with high-speed remote banking rails' },
  { code: 'DE', name: 'Germany', notes: 'High-demand hub for German native reasoning, STEM, and technical evaluation' },
];

const INITIAL_PLATFORMS: Platform[] = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    slug: 'outlier',
    name: 'Outlier AI [SAMPLE]',
    official_url: 'https://outlier.ai',
    description: 'Scale AI subsidiary platform offering task-based RLHF, coding, and multilingual AI model training.',
    who_it_suits: 'Domain experts, programmers, and linguists with strong technical writing and evaluation capabilities.',
    payout_methods: 'PayPal, AirTM',
    assessment_style: 'Automated multiple-choice subject tests followed by unpaid benchmark evaluation training tasks.',
    referral: 'public',
    referral_terms_url: 'https://outlier.ai/referrals',
    last_reviewed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 60 * 86400000).toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    slug: 'alignerr',
    name: 'Alignerr [SAMPLE]',
    official_url: 'https://alignerr.com',
    description: 'Labelbox community network matching vetted subject experts to frontier AI alignment tasks.',
    who_it_suits: 'Subject matter specialists in law, medicine, chemistry, and software engineering.',
    payout_methods: 'Deel',
    assessment_style: 'TestGorilla proctored assessments covering logic, writing, and domain expertise.',
    referral: 'invitation_only',
    referral_terms_url: null,
    last_reviewed_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 50 * 86400000).toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    slug: 'dataannotation',
    name: 'DataAnnotation Tech [SAMPLE]',
    official_url: 'https://dataannotation.tech',
    description: 'Freelance platform evaluating LLM responses, chatbot persona adherence, and coding benchmarks.',
    who_it_suits: 'Self-directed contractors who excel at nuanced instruction-following and creative adversarial probing.',
    payout_methods: 'PayPal',
    assessment_style: 'Unpaid initial qualification test taking 45 to 60 minutes with open-ended creative evaluation.',
    referral: 'not_found',
    referral_terms_url: null,
    last_reviewed_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 90 * 86400000).toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    slug: 'mercor',
    name: 'Mercor [SAMPLE]',
    official_url: 'https://mercor.com',
    description: 'AI-powered talent platform matching software engineers and researchers to foundation model labs.',
    who_it_suits: 'Senior engineers, AI researchers, and specialized technical evaluators seeking hourly contract work.',
    payout_methods: 'Stripe Express, Wise',
    assessment_style: 'AI video interview with real-time coding review and GitHub portfolio analysis.',
    referral: 'not_found',
    referral_terms_url: null,
    last_reviewed_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 40 * 86400000).toISOString(),
  },
];

const INITIAL_PLATFORM_STEPS: PlatformStep[] = [
  // Outlier
  { id: 'step-1-1', platform_id: '00000000-0000-0000-0000-000000000001', position: 1, title: 'Profile & Resume Submission', detail: 'Submit CV and declare expertise domains, verified spoken languages, and degree background.', label: 'official', source_url: 'https://outlier.ai/faq' },
  { id: 'step-1-2', platform_id: '00000000-0000-0000-0000-000000000001', position: 2, title: 'Government ID Verification', detail: 'Persona biometric verification requiring government-issued photo ID and live webcam selfie.', label: 'official', source_url: 'https://outlier.ai/faq' },
  { id: 'step-1-3', platform_id: '00000000-0000-0000-0000-000000000001', position: 3, title: 'Domain Qualification Exam', detail: '30-45 minute timed assessment on domain reasoning and evaluation methodology.', label: 'reported', source_url: 'https://reddit.com/r/outlierai' },
  { id: 'step-1-4', platform_id: '00000000-0000-0000-0000-000000000001', position: 4, title: 'Unpaid Benchmark Training Task', detail: 'Interactive practice task in platform workspace evaluated against hidden gold-standard rubric.', label: 'reported', source_url: 'https://reddit.com/r/outlierai' },
  { id: 'step-1-5', platform_id: '00000000-0000-0000-0000-000000000001', position: 5, title: 'Production Task Allocation', detail: 'First paid task assigned to user queue upon passing benchmark accuracy threshold.', label: 'reported', source_url: 'https://outlier.ai/faq' },
  // Alignerr
  { id: 'step-2-1', platform_id: '00000000-0000-0000-0000-000000000002', position: 1, title: 'Application & Role Selection', detail: 'Sign up via Google/LinkedIn and pick evaluation specialties (Code, Generalist, Physics).', label: 'official', source_url: 'https://alignerr.com' },
  { id: 'step-2-2', platform_id: '00000000-0000-0000-0000-000000000002', position: 2, title: 'Identity Verification via Deel', detail: 'Deel contractor identity verification, tax document submission, and payment routing.', label: 'official', source_url: 'https://alignerr.com' },
  { id: 'step-2-3', platform_id: '00000000-0000-0000-0000-000000000002', position: 3, title: 'TestGorilla Screening Test', detail: 'Proctored 40-minute domain test with camera monitoring. 80%+ passing score required.', label: 'official', source_url: 'https://alignerr.com' },
  { id: 'step-2-4', platform_id: '00000000-0000-0000-0000-000000000002', position: 4, title: 'Slack Workspace & NDA Access', detail: 'Invitation to Alignerr Slack community, project onboarding channel, and workspace tool training.', label: 'reported', source_url: 'https://reddit.com/r/alignerr' },
  { id: 'step-2-5', platform_id: '00000000-0000-0000-0000-000000000002', position: 5, title: 'Paid Project Assignment', detail: 'Task batch allocated when client projects matching your domain assessment score launch.', label: 'reported', source_url: 'https://alignerr.com' },
  // DataAnnotation
  { id: 'step-3-1', platform_id: '00000000-0000-0000-0000-000000000003', position: 1, title: 'Registration & Phone Confirmation', detail: 'Basic profile signup with PayPal email address and phone number verification.', label: 'official', source_url: 'https://dataannotation.tech' },
  { id: 'step-3-2', platform_id: '00000000-0000-0000-0000-000000000003', position: 2, title: 'Starter Assessment', detail: 'Open-ended 45-60 minute evaluation testing fact-checking, creative prompt writing, and nuance.', label: 'official', source_url: 'https://dataannotation.tech' },
  { id: 'step-3-3', platform_id: '00000000-0000-0000-0000-000000000003', position: 3, title: 'Manual Quality Review', detail: 'Internal review of submitted reasoning. Successful applicants receive access in 3-7 days.', label: 'reported', source_url: 'https://reddit.com/r/dataannotation' },
  { id: 'step-3-4', platform_id: '00000000-0000-0000-0000-000000000003', position: 4, title: 'Subject Qualification Quizzes', detail: 'Coding, Math, or Safety qualification quizzes unlock higher-rate project categories.', label: 'official', source_url: 'https://dataannotation.tech' },
  { id: 'step-3-5', platform_id: '00000000-0000-0000-0000-000000000003', position: 5, title: 'Active Project Dashboard', detail: 'Self-paced tasks appear on dashboard; log time directly per project batch.', label: 'official', source_url: 'https://dataannotation.tech' },
  // Mercor
  { id: 'step-4-1', platform_id: '00000000-0000-0000-0000-000000000004', position: 1, title: 'Profile & GitHub Synchronization', detail: 'Connect GitHub, upload resume, and index open-source contributions.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-2', platform_id: '00000000-0000-0000-0000-000000000004', position: 2, title: 'AI Video Interview', detail: '20-minute structured interactive interview covering past engineering projects and system architecture.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-3', platform_id: '00000000-0000-0000-0000-000000000004', position: 3, title: 'Algorithmic Profiling & Scoring', detail: 'Mercor ranking engine indexes technical strengths and generates verified talent card.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-4', platform_id: '00000000-0000-0000-0000-000000000004', position: 4, title: 'Client Shortlist Interview', detail: 'Direct 30-minute technical conversation with hiring team at foundation model customer.', label: 'reported', source_url: 'https://news.ycombinator.com' },
  { id: 'step-4-5', platform_id: '00000000-0000-0000-0000-000000000004', position: 5, title: 'Contract Signature & Payment Setup', detail: 'Execute master services agreement and begin direct hourly engineering or evaluation sprint.', label: 'official', source_url: 'https://mercor.com' },
];

const INITIAL_JOBS: Job[] = [
  {
    id: '10000000-0000-0000-0000-000000000001',
    slug: 'sample-outlier-rlhf-generalist',
    platform_id: '00000000-0000-0000-0000-000000000001',
    title: 'AI Model Reasoning & Fact-Checking Evaluator [SAMPLE]',
    work_type: 'Evaluation & RLHF',
    domains: ['General Reasoning', 'Fact Checking', 'Truthfulness'],
    languages: ['English'],
    degree_levels: ['Associate', "Bachelor's", "Master's"],
    summary: 'Evaluate dual LLM generation pairs for groundedness, hallucination detection, and stylistic coherence against a strict grading matrix.',
    requirements: 'Native or bilingual English fluency. Demonstrated ability to cite reliable primary sources and write unambiguous justification comments.',
    pay_text: '$15 - $22 / hr',
    pay_verified: true,
    pay_source_url: 'https://outlier.ai/careers/sample-rlhf',
    official_url: 'https://outlier.ai',
    apply_url: 'https://outlier.ai/apply/sample-rlhf-2026',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 11 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    daysAgo: 3,
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    slug: 'sample-alignerr-code-evaluator',
    platform_id: '00000000-0000-0000-0000-000000000002',
    title: 'Python & TypeScript Benchmark Evaluator [SAMPLE]',
    work_type: 'Coding & Benchmarking',
    domains: ['Software Engineering', 'Python', 'TypeScript', 'Unit Testing'],
    languages: ['English'],
    degree_levels: ["Bachelor's", "Master's", 'PhD'],
    summary: 'Verify correctness of code generated by frontier reasoning models. Write unit tests to catch edge-case hallucinations and benchmark runtime efficiency.',
    requirements: '3+ years professional software development experience. High proficiency in Python and TypeScript test suites (pytest, vitest).',
    pay_text: '$35 - $50 / hr',
    pay_verified: true,
    pay_source_url: 'https://alignerr.com/roles/code-sample',
    official_url: 'https://alignerr.com',
    apply_url: 'https://alignerr.com/apply/code-eval-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    daysAgo: 6,
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    slug: 'sample-dataannotation-bilingual-specialist',
    platform_id: '00000000-0000-0000-0000-000000000003',
    title: 'Multilingual LLM Prompt & Response Evaluator [SAMPLE]',
    work_type: 'Translation & Localization',
    domains: ['Linguistics', 'Cultural Nuance', 'Translation'],
    languages: ['English', 'Spanish', 'French'],
    degree_levels: ["Bachelor's"],
    summary: 'Assess conversational AI output quality across English, French, and Spanish dialogue. Flag cultural inaccuracies and translation artifacts.',
    requirements: 'Bilingual proficiency in English plus French or Spanish. Strong editorial background and high attention to grammar and idiom fidelity.',
    pay_text: '$20 - $25 / hr',
    pay_verified: false,
    pay_source_url: null,
    official_url: 'https://dataannotation.tech',
    apply_url: 'https://dataannotation.tech/apply/bilingual-sample',
    link: 'direct',
    status: 'needs_recheck', // 18 days old, sweeper degraded
    last_checked_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
    daysAgo: 18,
  },
  {
    id: '10000000-0000-0000-0000-000000000004',
    slug: 'sample-mercor-llm-researcher',
    platform_id: '00000000-0000-0000-0000-000000000004',
    title: 'Frontier AI Safety & Alignment Auditor [SAMPLE]',
    work_type: 'Safety & Red Teaming',
    domains: ['AI Safety', 'Red Teaming', 'Jailbreak Research'],
    languages: ['English'],
    degree_levels: ["Master's", 'PhD'],
    summary: 'Execute adversarial probing campaigns on multimodal models to identify vulnerability modes, jailbreaks, and prompt injection susceptibilities.',
    requirements: 'Background in cybersecurity, LLM security research, or formal AI safety benchmarks.',
    pay_text: '$60 - $110 / hr',
    pay_verified: true,
    pay_source_url: 'https://mercor.com/jobs/safety-sample',
    official_url: 'https://mercor.com',
    apply_url: 'https://mercor.com/apply/safety-auditor-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 13 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    daysAgo: 1,
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    slug: 'sample-outlier-closed-project',
    platform_id: '00000000-0000-0000-0000-000000000001',
    title: 'Legacy Creative Writing Prompt Annotator [SAMPLE]',
    work_type: 'Creative Writing',
    domains: ['Creative Writing', 'Persona Adherence'],
    languages: ['English'],
    degree_levels: ['Associate', "Bachelor's"],
    summary: 'Evaluate creative storytelling and character continuity across multi-turn roleplay conversations.',
    requirements: 'Creative writing portfolio or degree in English/Literature.',
    pay_text: '$18 / hr',
    pay_verified: true,
    pay_source_url: 'https://outlier.ai/careers/sample-creative',
    official_url: 'https://outlier.ai',
    apply_url: 'https://outlier.ai/apply/creative-legacy-sample',
    link: 'direct',
    status: 'closed',
    last_checked_at: new Date(Date.now() - 32 * 86400000).toISOString(),
    next_check_at: null,
    closed_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    created_by: null,
    created_at: new Date(Date.now() - 80 * 86400000).toISOString(),
    daysAgo: 32,
  },
];

const INITIAL_ELIGIBILITY: JobEligibility[] = [
  // Job 1 (Outlier)
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'US', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'NG', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'KE', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'GH', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'GB', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'CA', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'IN', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'PH', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'ZA', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000001', country_code: 'DE', status: 'unconfirmed', source_url: null, checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  // Job 2 (Alignerr)
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'US', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'GB', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'CA', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'DE', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'IN', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000002', country_code: 'NG', status: 'unconfirmed', source_url: null, checked_at: new Date(Date.now() - 6 * 86400000).toISOString() },
  // Job 3 (DataAnnotation)
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'US', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'CA', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'GB', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'DE', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'NG', status: 'not_accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000003', country_code: 'GH', status: 'not_accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 18 * 86400000).toISOString() },
];

const INITIAL_CHECK_LOGS: CheckLog[] = [
  { id: 1, job_id: '10000000-0000-0000-0000-000000000001', platform_id: '00000000-0000-0000-0000-000000000001', result: 'verified', note: 'SAMPLE human check: verified application form is active and accepting candidate applications. Pay confirmed at $15-$22.', checked_by: null, checked_at: new Date(Date.now() - 3 * 86400000).toISOString(), daysAgo: 3 },
  { id: 2, job_id: '10000000-0000-0000-0000-000000000002', platform_id: '00000000-0000-0000-0000-000000000002', result: 'verified', note: 'SAMPLE human check: confirmed TestGorilla pipeline is live for Python benchmark roles.', checked_by: null, checked_at: new Date(Date.now() - 6 * 86400000).toISOString(), daysAgo: 6 },
  { id: 3, job_id: '10000000-0000-0000-0000-000000000003', platform_id: '00000000-0000-0000-0000-000000000003', result: 'needs_recheck', note: 'SAMPLE automated sweeper: 14 days elapsed since last human verification check.', checked_by: null, checked_at: new Date(Date.now() - 4 * 86400000).toISOString(), daysAgo: 4 },
  { id: 4, job_id: '10000000-0000-0000-0000-000000000005', platform_id: '00000000-0000-0000-0000-000000000001', result: 'closed', note: 'SAMPLE human check: application link returned 404 and listing removed from career portal.', checked_by: null, checked_at: new Date(Date.now() - 15 * 86400000).toISOString(), daysAgo: 15 },
];

const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 1, actor: null, action: 'job.create', entity: 'jobs', entity_id: '10000000-0000-0000-0000-000000000001', diff: { title: 'AI Model Reasoning & Fact-Checking Evaluator [SAMPLE]', status: 'verified' }, at: new Date(Date.now() - 3 * 86400000).toISOString(), daysAgo: 3 },
  { id: 2, actor: null, action: 'sweeper.run', entity: 'jobs', entity_id: '10000000-0000-0000-0000-000000000003', diff: { from_status: 'verified', to_status: 'needs_recheck', reason: '14 days elapsed' }, at: new Date(Date.now() - 4 * 86400000).toISOString(), daysAgo: 4 },
];

const INITIAL_INCIDENTS: IncidentLog[] = [
  {
    id: 'inc-001',
    detected_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    report_due_at: new Date(Date.now() + 60 * 3600000).toISOString(),
    summary: 'SAMPLE routine security canary test: simulated edge-token rotation completed with zero unauthorized access',
    data_categories: ['Canary Test Token'],
    people_affected_estimate: 0,
    reported_at: null,
    status: 'open',
  },
];

const INITIAL_PRIVACY_REQUESTS: PrivacyRequest[] = [
  {
    id: '40000000-0000-0000-0000-000000000001',
    kind: 'access',
    contact_email: 'contributor-test@example.com',
    received_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    due_at: new Date(Date.now() + 28 * 86400000).toISOString(),
    closed_at: null,
    note: 'SAMPLE SAR: Request for copy of alert subscription preferences',
  },
];

// Singleton storage state in memory
class RepositoryStore {
  countries: Country[] = [...INITIAL_COUNTRIES];
  platforms: Platform[] = [...INITIAL_PLATFORMS];
  platformSteps: PlatformStep[] = [...INITIAL_PLATFORM_STEPS];
  jobs: Job[] = [...INITIAL_JOBS];
  jobEligibility: JobEligibility[] = [...INITIAL_ELIGIBILITY];
  checkLogs: CheckLog[] = [...INITIAL_CHECK_LOGS];
  auditLogs: AuditLog[] = [...INITIAL_AUDIT_LOGS];
  incidents: IncidentLog[] = [...INITIAL_INCIDENTS];
  privacyRequests: PrivacyRequest[] = [...INITIAL_PRIVACY_REQUESTS];
  reports: Report[] = [];
  evalLeads: EvalLead[] = [];
}

const globalStore = new RepositoryStore();

export interface JobFilterParams {
  country?: string;
  workType?: string;
  status?: JobStatus;
  query?: string;
  degreeLevel?: string;
}

export const dbRepository = {
  // Countries
  getCountries(): Country[] {
    return [...globalStore.countries];
  },

  // Platforms
  getPlatforms(): Platform[] {
    return [...globalStore.platforms];
  },

  getPlatformById(id: string): Platform | undefined {
    return globalStore.platforms.find((p) => p.id === id);
  },

  getPlatformBySlug(slug: string): Platform | undefined {
    return globalStore.platforms.find((p) => p.slug === slug);
  },

  getPlatformSteps(platformId: string): PlatformStep[] {
    return globalStore.platformSteps
      .filter((s) => s.platform_id === platformId)
      .sort((a, b) => a.position - b.position);
  },

  updatePlatform(
    platformId: string,
    data: Partial<Platform>,
    steps?: PlatformStep[],
    actorId?: string | null
  ): Platform {
    const idx = globalStore.platforms.findIndex((p) => p.id === platformId);
    if (idx === -1) {
      throw new Error(`Platform ${platformId} not found`);
    }

    const prev = globalStore.platforms[idx];
    const updated: Platform = {
      ...prev,
      ...data,
      last_reviewed_at: new Date().toISOString(),
    };
    globalStore.platforms[idx] = updated;

    if (steps && steps.length > 0) {
      // replace platform steps
      globalStore.platformSteps = globalStore.platformSteps.filter((s) => s.platform_id !== platformId);
      globalStore.platformSteps.push(...steps);
    }

    this.logAudit({
      actor: actorId || null,
      action: 'platform.update',
      entity: 'platforms',
      entity_id: platformId,
      diff: { before: prev, after: updated },
    });

    return updated;
  },

  // Jobs
  getJobs(filters: JobFilterParams = {}): JobWithPlatform[] {
    let result = globalStore.jobs;

    if (filters.status) {
      result = result.filter((j) => j.status === filters.status);
    }

    if (filters.workType && filters.workType !== 'All') {
      result = result.filter((j) => j.work_type.toLowerCase() === filters.workType?.toLowerCase());
    }

    if (filters.degreeLevel && filters.degreeLevel !== 'All') {
      result = result.filter((j) => j.degree_levels.includes(filters.degreeLevel!));
    }

    if (filters.country && filters.country !== 'ALL') {
      const allowedJobIds = new Set(
        globalStore.jobEligibility
          .filter((e) => e.country_code === filters.country && e.status === 'accepted')
          .map((e) => e.job_id)
      );
      result = result.filter((j) => allowedJobIds.has(j.id));
    }

    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.summary.toLowerCase().includes(q) ||
          j.domains.some((d) => d.toLowerCase().includes(q)) ||
          j.languages.some((l) => l.toLowerCase().includes(q))
      );
    }

    // Join with platform and eligibility
    return result.map((job) => {
      const platform = globalStore.platforms.find((p) => p.id === job.platform_id) || {
        id: job.platform_id,
        slug: 'unknown',
        name: 'Unknown Platform',
        official_url: job.official_url,
        description: null,
        who_it_suits: null,
        payout_methods: null,
        assessment_style: null,
        referral: 'not_found' as const,
        referral_terms_url: null,
        last_reviewed_at: null,
        created_at: job.created_at,
      };

      const eligibility = globalStore.jobEligibility.filter((e) => e.job_id === job.id);
      const daysAgo = job.daysAgo ?? 0;
      return { ...job, daysAgo, platform, eligibility };
    });
  },

  getJobById(id: string): JobWithPlatform | undefined {
    const job = globalStore.jobs.find((j) => j.id === id);
    if (!job) return undefined;
    const platform = globalStore.platforms.find((p) => p.id === job.platform_id) || {
      id: job.platform_id,
      slug: 'unknown',
      name: 'Unknown Platform',
      official_url: job.official_url,
      description: null,
      who_it_suits: null,
      payout_methods: null,
      assessment_style: null,
      referral: 'not_found' as const,
      referral_terms_url: null,
      last_reviewed_at: null,
      created_at: job.created_at,
    };
    const eligibility = globalStore.jobEligibility.filter((e) => e.job_id === job.id);
    const daysAgo = job.daysAgo ?? 0;
    return { ...job, daysAgo, platform, eligibility };
  },

  getJobBySlug(slug: string): JobWithPlatform | undefined {
    const job = globalStore.jobs.find((j) => j.slug === slug);
    if (!job) return undefined;
    return this.getJobById(job.id);
  },

  createJob(
    jobInput: Omit<Job, 'id' | 'created_at' | 'last_checked_at' | 'next_check_at' | 'closed_at'>,
    eligibilityList: { country_code: string; status: EligStatus; source_url?: string }[],
    actorId?: string | null
  ): JobWithPlatform {
    const id = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const nowIso = new Date().toISOString();
    const nextCheckIso = new Date(Date.now() + 14 * 86400000).toISOString();

    const newJob: Job = {
      ...jobInput,
      id,
      status: 'verified',
      last_checked_at: nowIso,
      next_check_at: nextCheckIso,
      closed_at: null,
      created_at: nowIso,
    };

    globalStore.jobs.unshift(newJob);

    // Save eligibility
    eligibilityList.forEach((el) => {
      globalStore.jobEligibility.push({
        job_id: id,
        country_code: el.country_code,
        status: el.status,
        source_url: el.source_url || null,
        checked_at: nowIso,
      });
    });

    // Write initial verification check log
    globalStore.checkLogs.unshift({
      id: globalStore.checkLogs.length + 1,
      job_id: id,
      platform_id: newJob.platform_id,
      result: 'verified',
      note: 'Initial human verification check and eligibility mapping',
      checked_by: actorId || null,
      checked_at: nowIso,
    });

    // Write audit log
    this.logAudit({
      actor: actorId || null,
      action: 'job.create',
      entity: 'jobs',
      entity_id: id,
      diff: { title: newJob.title, status: newJob.status },
    });

    return this.getJobById(id)!;
  },

  updateJob(id: string, updates: Partial<Job>, actorId?: string | null): JobWithPlatform {
    const idx = globalStore.jobs.findIndex((j) => j.id === id);
    if (idx === -1) {
      throw new Error(`Job ${id} not found`);
    }

    const prev = globalStore.jobs[idx];
    const updated: Job = { ...prev, ...updates };
    globalStore.jobs[idx] = updated;

    this.logAudit({
      actor: actorId || null,
      action: 'job.update',
      entity: 'jobs',
      entity_id: id,
      diff: { before: prev, after: updated },
    });

    return this.getJobById(id)!;
  },

  // 15-second human verification action
  markJobChecked(jobId: string, note: string, actorId?: string | null): JobWithPlatform {
    const idx = globalStore.jobs.findIndex((j) => j.id === jobId);
    if (idx === -1) {
      throw new Error(`Job ${jobId} not found`);
    }

    const nowIso = new Date().toISOString();
    const nextCheckIso = new Date(Date.now() + 14 * 86400000).toISOString();
    const prev = globalStore.jobs[idx];

    const updated: Job = {
      ...prev,
      status: 'verified',
      last_checked_at: nowIso,
      next_check_at: nextCheckIso,
      closed_at: null,
    };
    globalStore.jobs[idx] = updated;

    // Write check log
    globalStore.checkLogs.unshift({
      id: globalStore.checkLogs.length + 1,
      job_id: jobId,
      platform_id: updated.platform_id,
      result: 'verified',
      note: note.trim() || 'Human verification confirmed active and accurate',
      checked_by: actorId || null,
      checked_at: nowIso,
    });

    // Write audit log
    this.logAudit({
      actor: actorId || null,
      action: 'job.check',
      entity: 'jobs',
      entity_id: jobId,
      diff: { previousStatus: prev.status, newStatus: 'verified', note },
    });

    return this.getJobById(jobId)!;
  },

  closeJob(jobId: string, reason: string, actorId?: string | null): JobWithPlatform {
    const idx = globalStore.jobs.findIndex((j) => j.id === jobId);
    if (idx === -1) {
      throw new Error(`Job ${jobId} not found`);
    }

    const nowIso = new Date().toISOString();
    const prev = globalStore.jobs[idx];

    const updated: Job = {
      ...prev,
      status: 'closed',
      closed_at: nowIso,
      next_check_at: null,
    };
    globalStore.jobs[idx] = updated;

    globalStore.checkLogs.unshift({
      id: globalStore.checkLogs.length + 1,
      job_id: jobId,
      platform_id: updated.platform_id,
      result: 'closed',
      note: reason.trim() || 'Role marked closed by admin',
      checked_by: actorId || null,
      checked_at: nowIso,
    });

    this.logAudit({
      actor: actorId || null,
      action: 'job.close',
      entity: 'jobs',
      entity_id: jobId,
      diff: { previousStatus: prev.status, reason },
    });

    return this.getJobById(jobId)!;
  },

  setJobEligibility(
    jobId: string,
    countryCode: string,
    status: EligStatus,
    sourceUrl?: string | null,
    actorId?: string | null
  ): void {
    const existingIdx = globalStore.jobEligibility.findIndex(
      (e) => e.job_id === jobId && e.country_code === countryCode
    );
    const nowIso = new Date().toISOString();

    if (existingIdx >= 0) {
      globalStore.jobEligibility[existingIdx] = {
        job_id: jobId,
        country_code: countryCode,
        status,
        source_url: sourceUrl || null,
        checked_at: nowIso,
      };
    } else {
      globalStore.jobEligibility.push({
        job_id: jobId,
        country_code: countryCode,
        status,
        source_url: sourceUrl || null,
        checked_at: nowIso,
      });
    }

    this.logAudit({
      actor: actorId || null,
      action: 'job.eligibility_update',
      entity: 'job_eligibility',
      entity_id: jobId,
      diff: { countryCode, status, sourceUrl },
    });
  },

  // Sweeper Engine (Master Plan Section 13.2)
  // - Verified jobs > 14 days without human check -> degrade to needs_recheck
  // - Needs_recheck jobs > 30 days without check -> degrade to closed
  runSweeper(actorId?: string | null): { degradedCount: number; closedCount: number } {
    const now = Date.now();
    const fourteenDaysMs = 14 * 86400000;
    const thirtyDaysMs = 30 * 86400000;
    let degradedCount = 0;
    let closedCount = 0;

    globalStore.jobs.forEach((job, idx) => {
      const lastCheck = job.last_checked_at ? new Date(job.last_checked_at).getTime() : 0;
      const ageMs = now - lastCheck;

      if (job.status === 'verified' && ageMs > fourteenDaysMs) {
        globalStore.jobs[idx] = {
          ...job,
          status: 'needs_recheck',
        };
        degradedCount++;

        globalStore.checkLogs.unshift({
          id: globalStore.checkLogs.length + 1,
          job_id: job.id,
          platform_id: job.platform_id,
          result: 'needs_recheck',
          note: 'Automated 14-day compliance sweeper: degraded to needs_recheck',
          checked_by: null,
          checked_at: new Date().toISOString(),
        });

        this.logAudit({
          actor: actorId || 'sweeper-bot',
          action: 'sweeper.degrade',
          entity: 'jobs',
          entity_id: job.id,
          diff: { from: 'verified', to: 'needs_recheck', elapsedDays: Math.floor(ageMs / 86400000) },
        });
      } else if (job.status === 'needs_recheck' && ageMs > thirtyDaysMs) {
        globalStore.jobs[idx] = {
          ...job,
          status: 'closed',
          closed_at: new Date().toISOString(),
          next_check_at: null,
        };
        closedCount++;

        globalStore.checkLogs.unshift({
          id: globalStore.checkLogs.length + 1,
          job_id: job.id,
          platform_id: job.platform_id,
          result: 'closed',
          note: 'Automated 30-day compliance sweeper: unverified role hidden and closed',
          checked_by: null,
          checked_at: new Date().toISOString(),
        });

        this.logAudit({
          actor: actorId || 'sweeper-bot',
          action: 'sweeper.close',
          entity: 'jobs',
          entity_id: job.id,
          diff: { from: 'needs_recheck', to: 'closed', elapsedDays: Math.floor(ageMs / 86400000) },
        });
      }
    });

    return { degradedCount, closedCount };
  },

  // Audit Logs
  logAudit(entry: Omit<AuditLog, 'id' | 'at'>): void {
    const newEntry: AuditLog = {
      ...entry,
      id: globalStore.auditLogs.length + 1,
      at: new Date().toISOString(),
    };
    globalStore.auditLogs.unshift(newEntry);
  },

  getAuditLogs(limit: number = 50): AuditLog[] {
    return globalStore.auditLogs.slice(0, limit);
  },

  getCheckLogs(jobId?: string, limit: number = 50): CheckLog[] {
    const logs = jobId
      ? globalStore.checkLogs.filter((c) => c.job_id === jobId)
      : globalStore.checkLogs;
    return logs.slice(0, limit);
  },

  // Incidents
  getIncidents(): IncidentLog[] {
    return [...globalStore.incidents];
  },

  createIncident(data: Omit<IncidentLog, 'id' | 'detected_at' | 'report_due_at'>, actorId?: string | null): IncidentLog {
    const nowIso = new Date().toISOString();
    const dueIso = new Date(Date.now() + 72 * 3600000).toISOString();
    const inc: IncidentLog = {
      ...data,
      id: `inc-${Date.now()}`,
      detected_at: nowIso,
      report_due_at: dueIso,
    };
    globalStore.incidents.unshift(inc);

    this.logAudit({
      actor: actorId || null,
      action: 'incident.create',
      entity: 'incident_log',
      entity_id: inc.id,
      diff: { summary: inc.summary },
    });

    return inc;
  },

  // Privacy requests
  getPrivacyRequests(): PrivacyRequest[] {
    return [...globalStore.privacyRequests];
  },

  // Admin Stats
  getAdminStats(): AdminStats {
    const jobs = globalStore.jobs;
    const verifiedJobs = jobs.filter((j) => j.status === 'verified').length;
    const needsRecheckJobs = jobs.filter((j) => j.status === 'needs_recheck').length;
    const closedJobs = jobs.filter((j) => j.status === 'closed').length;
    const activeAudits = verifiedJobs + needsRecheckJobs;
    const complianceRate = activeAudits > 0 ? Math.round((verifiedJobs / activeAudits) * 100) : 100;

    return {
      totalJobs: jobs.length,
      verifiedJobs,
      needsRecheckJobs,
      closedJobs,
      complianceRate,
      activeIncidents: globalStore.incidents.filter((i) => i.status === 'open').length,
      pendingReports: globalStore.reports.filter((r) => r.status === 'pending').length,
      openPrivacyRequests: globalStore.privacyRequests.filter((p) => !p.closed_at).length,
    };
  },

  getRecheckQueue(): JobWithPlatform[] {
    return this.getJobs()
      .filter((j) => {
        if (j.status === 'needs_recheck') return true;
        if (j.status === 'verified' && (j.daysAgo ?? 0) >= 10) return true;
        return false;
      })
      .sort((a, b) => (b.daysAgo ?? 0) - (a.daysAgo ?? 0));
  },

  getActiveIncidentRemainingHours(): number | null {
    const inc = globalStore.incidents.find((i) => i.status === 'open');
    if (!inc) return null;
    return 60; // 60 hours remaining in regulatory window
  },
};
