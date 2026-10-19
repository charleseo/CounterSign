import { createHash } from 'crypto';
import {
  Job,
  Platform,
  PlatformStep,
  Country,
  JobEligibility,
  CheckLog,
  Report,
  ReportKind,
  EvalLead,
  AuditLog,
  PrivacyRequest,
  IncidentLog,
  IncidentStatus,
  PrivacyRequestKind,
  JobWithPlatform,
  AdminStats,
  JobStatus,
  EligStatus,
  OutboundClick,
  LinkType,
  AlertSubscription,
  ConsentLog,
  AnalyticsEvent,
  DigestDraft,
  User,
  SavedJob,
  UserApplication,
  UserTestScore,
  UserCv,
  UserPayoutLog,
  ApplicationStatus,
  CommunityExperienceReport,
  AggregatedPlatformExperience,
  EvaluatorLead,
  MagicLinkToken,
  UserSession,
  TaskAvailability,
  ReportStatus,
  PlatformCountryEligibilityResult,
  WeeklyScamPost,
} from './types';
import { getSiteUrl } from '../utils/siteUrl';

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
  {
    id: '00000000-0000-0000-0000-000000000005',
    slug: 'invisible-tech',
    name: 'Invisible Technologies [SAMPLE]',
    official_url: 'https://invisible.co',
    description: 'Advanced operations and AI training partner running custom human-in-the-loop workflows, RLHF, and frontier reasoning evaluation.',
    who_it_suits: 'Advanced researchers, subject-matter experts in STEM/law/finance, and operations specialists comfortable with rigorous multi-step rubrics.',
    payout_methods: 'Deel, Direct Bank Wire',
    assessment_style: 'Comprehensive technical assessment, writing test, and workflow orientation with human operations managers.',
    referral: 'public',
    referral_terms_url: 'https://invisible.co/careers',
    last_reviewed_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 45 * 86400000).toISOString(),
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
  { id: 'step-3-4', platform_id: '00000000-0000-0000-0000-000000000003', position: 4, title: 'Subject Qualification Quizzes', detail: 'Coding, Math, or Safety qualification quizzes grant access to higher-rate project categories.', label: 'official', source_url: 'https://dataannotation.tech' },
  { id: 'step-3-5', platform_id: '00000000-0000-0000-0000-000000000003', position: 5, title: 'Active Project Dashboard', detail: 'Self-paced tasks appear on dashboard; log time directly per project batch.', label: 'official', source_url: 'https://dataannotation.tech' },
  // Mercor
  { id: 'step-4-1', platform_id: '00000000-0000-0000-0000-000000000004', position: 1, title: 'Profile & GitHub Synchronization', detail: 'Connect GitHub, upload resume, and index open-source contributions.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-2', platform_id: '00000000-0000-0000-0000-000000000004', position: 2, title: 'AI Video Interview', detail: '20-minute structured interactive interview covering past engineering projects and system architecture.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-3', platform_id: '00000000-0000-0000-0000-000000000004', position: 3, title: 'Algorithmic Profiling & Scoring', detail: 'Mercor ranking engine indexes technical strengths and generates verified talent card.', label: 'official', source_url: 'https://mercor.com' },
  { id: 'step-4-4', platform_id: '00000000-0000-0000-0000-000000000004', position: 4, title: 'Client Shortlist Interview', detail: 'Direct 30-minute technical conversation with hiring team at foundation model customer.', label: 'reported', source_url: 'https://news.ycombinator.com' },
  { id: 'step-4-5', platform_id: '00000000-0000-0000-0000-000000000004', position: 5, title: 'Contract Signature & Payment Setup', detail: 'Execute master services agreement and begin direct hourly engineering or evaluation sprint.', label: 'official', source_url: 'https://mercor.com' },
  // Invisible Technologies
  { id: 'step-5-1', platform_id: '00000000-0000-0000-0000-000000000005', position: 1, title: 'Application & Technical Screening', detail: 'Submit CV and complete initial asynchronous qualification form covering reasoning logic.', label: 'official', source_url: 'https://invisible.co/careers' },
  { id: 'step-5-2', platform_id: '00000000-0000-0000-0000-000000000005', position: 2, title: 'Domain Competency Exam', detail: 'Timed domain assessment testing rubric adherence, citation accuracy, and edge-case handling.', label: 'official', source_url: 'https://invisible.co/careers' },
  { id: 'step-5-3', platform_id: '00000000-0000-0000-0000-000000000005', position: 3, title: 'Operations Interview & Onboarding', detail: 'Short technical interview with operations lead and review of client workflow standards.', label: 'reported', source_url: 'https://glassdoor.com/Reviews/Invisible-Technologies' },
  { id: 'step-5-4', platform_id: '00000000-0000-0000-0000-000000000005', position: 4, title: 'Tooling Setup & Sandbox Practice', detail: 'Configure secure workspace tools and complete graded calibration tasks with live mentor feedback.', label: 'reported', source_url: 'https://reddit.com' },
  { id: 'step-5-5', platform_id: '00000000-0000-0000-0000-000000000005', position: 5, title: 'Active Client Project Sprints', detail: 'Assigned to ongoing enterprise AI alignment projects with weekly milestone billing via Deel.', label: 'official', source_url: 'https://invisible.co/careers' },
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
    posted_date: '14 August 2024',
    accepting_since: 'August 2024',
    accepted_count: 64,
    success_rate: '~18% selection rate (Reported)',
    knowledge_requirements: ["5-point pairwise grading matrix and rubric comprehension","Hallucination and parameter drift detection in text responses","Fact-checking claims against verifiable primary sources","Objective justification commentary with excerpt citations"],
    cv_requirements: "One-page ATS-formatted resume in PDF format. Highlight degree (STEM, humanities, or linguistics), analytical writing experience, and any past data annotation or fact-checking background. Avoid multi-column graphics.",
    other_requirements: "Desktop or laptop computer running Google Chrome. Minimum 10 Mbps broadband connection. Government-issued photo ID for automated identity verification. Minimum 10 hours per week availability.",
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
    link: 'referral',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 8 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    daysAgo: 6,
    posted_date: '20 September 2024',
    accepting_since: 'September 2024',
    accepted_count: 38,
    success_rate: '~12% selection rate (Reported)',
    knowledge_requirements: ["Python 3.10+ and TypeScript standard library proficiency","Unit test authoring using pytest and vitest frameworks","Time and space complexity profiling for generated code","Edge-case synthesis and boundary condition testing"],
    cv_requirements: "One-page technical CV in PDF format. Include direct clickable links to active GitHub repositories or production code samples. Detail professional software engineering background and testing experience.",
    other_requirements: "Modern laptop or workstation with local IDE and terminal environment. Passing score on initial 45-minute TestGorilla coding assessment. Identity check via official portal.",
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
    posted_date: '10 July 2024',
    accepting_since: 'July 2024',
    accepted_count: 52,
    success_rate: '~15% selection rate (Reported)',
    knowledge_requirements: ["Bilingual fluency in English and French or Spanish","Idiom accuracy and cultural localization error tagging","Conversational register, tone, and polite phrasing classification","High attention to grammar, syntax, and punctuation nuances"],
    cv_requirements: "One-page resume demonstrating formal bilingual fluency, literature or linguistics coursework, or professional editorial experience. Avoid generic soft-skills summaries.",
    other_requirements: "Desktop or laptop with physical keyboard. Stable internet connection. Completion of unpaid 2-hour onboarding qualification assessment.",
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
    posted_date: '05 October 2024',
    accepting_since: 'October 2024',
    accepted_count: 19,
    success_rate: '~8% selection rate (Reported)',
    knowledge_requirements: ["Adversarial prompt injection design and jailbreak taxonomy","Safety policy boundary probing and refusal precision audit","OWASP Top 10 for LLMs and multi-turn attack strategies","System prompt extraction and privilege escalation detection"],
    cv_requirements: "Technical security CV highlighting published AI safety papers, capture-the-flag competitions, red teaming audits, or advanced cybersecurity degree.",
    other_requirements: "Mercor platform technical video interview and profile evaluation. High-performance workstation with isolated sandbox environment. Client NDA required.",
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
    posted_date: '15 March 2024',
    accepting_since: 'March 2024',
    accepted_count: 45,
    success_rate: '~25% selection rate (Reported)',
    knowledge_requirements: ["Creative writing and multi-turn character continuity","Persona adherence and dialogue naturalness scoring","Narrative pacing and tone consistency evaluation"],
    cv_requirements: "Creative writing portfolio or academic background in English literature or creative writing.",
    other_requirements: "Role currently closed by employer. Historical record maintained for rate and platform verification.",
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    slug: 'sample-alignerr-multimodal-evaluator',
    platform_id: '00000000-0000-0000-0000-000000000002',
    title: 'Multimodal Image & Visual Reasoning Specialist [SAMPLE]',
    work_type: 'Model Evaluation',
    domains: ['Computer Vision', 'Reasoning', 'STEM'],
    languages: ['English'],
    degree_levels: ["Bachelor's", "Master's"],
    summary: 'Review vision-language model outputs for spatial grounding, OCR precision, and visual hallucinations across technical charts and user interface mockups.',
    requirements: 'Degree in STEM, graphic communication, or equivalent visual inspection analytical experience. High attention to detail.',
    pay_text: '$24 - $32 / hr',
    pay_verified: true,
    pay_source_url: 'https://alignerr.com/roles/multimodal-sample',
    official_url: 'https://alignerr.com',
    apply_url: 'https://alignerr.com/apply/multimodal-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 12 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
    daysAgo: 2,
    posted_date: '12 November 2024',
    accepting_since: 'November 2024',
    accepted_count: 27,
    success_rate: '~14% selection rate (Reported)',
    knowledge_requirements: ["Spatial bounding box verification and visual grounding","OCR verification across technical charts, UI designs, and receipts","Infographic data extraction and coordinate precision audits","Detection of visual hallucinations and artifact misclassifications"],
    cv_requirements: "One-page resume showing STEM background, UI design inspection, or analytical data verification experience. Specify familiarity with technical charts and schematics.",
    other_requirements: "High-resolution display monitor (minimum 1080p recommended). Minimum 15 Mbps broadband. Completion of Alignerr multimodal assessment.",
  },
  {
    id: '10000000-0000-0000-0000-000000000007',
    slug: 'sample-dataannotation-math-reasoning',
    platform_id: '00000000-0000-0000-0000-000000000003',
    title: 'High School & Olympiad Math Reasoning Solver [SAMPLE]',
    work_type: 'Domain Specialist',
    domains: ['Mathematics', 'LaTeX', 'Formal Logic'],
    languages: ['English'],
    degree_levels: ["Bachelor's", "Master's", 'PhD'],
    summary: 'Author step-by-step mathematical reasoning solutions in LaTeX. Verify proof steps and identify algebraic or arithmetic slips in frontier reasoning model outputs.',
    requirements: 'B.Sc. in Mathematics, Physics, or Engineering. Fluency with LaTeX notation and formal mathematical rigor.',
    pay_text: '$38 - $55 / hr',
    pay_verified: true,
    pay_source_url: 'https://dataannotation.tech/roles/math-sample',
    official_url: 'https://dataannotation.tech',
    apply_url: 'https://dataannotation.tech/apply/math-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 10 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    daysAgo: 4,
    posted_date: '18 August 2024',
    accepting_since: 'August 2024',
    accepted_count: 31,
    success_rate: '~11% selection rate (Reported)',
    knowledge_requirements: ["High school competition and university-level mathematics","Clean LaTeX mathematical typesetting and notation","Step-by-step chain-of-thought proof verification","Zero-tolerance error detection in arithmetic and algebraic steps"],
    cv_requirements: "One-page academic CV with degree in Mathematics, Physics, Statistics, or Engineering. Highlight math competition achievements or tutoring/teaching background.",
    other_requirements: "Laptop or desktop with reliable browser and LaTeX preview capability. Completion of 2-hour mathematics assessment.",
  },
  {
    id: '10000000-0000-0000-0000-000000000008',
    slug: 'sample-outlier-search-intent-rating',
    platform_id: '00000000-0000-0000-0000-000000000001',
    title: 'Search Relevance & Query Intent Auditor [SAMPLE]',
    work_type: 'Search Rating',
    domains: ['Information Retrieval', 'Web Search', 'General Knowledge'],
    languages: ['English'],
    degree_levels: ['Associate', "Bachelor's"],
    summary: 'Evaluate relevance and user usefulness of search engine results, direct answers, and snippet summaries for ambiguous search queries.',
    requirements: 'Familiarity with web search evaluation guidelines. High attention to query intent and regional web sources.',
    pay_text: '$14 - $18 / hr',
    pay_verified: true,
    pay_source_url: 'https://outlier.ai/careers/search-sample',
    official_url: 'https://outlier.ai',
    apply_url: 'https://outlier.ai/apply/search-rating-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 9 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    daysAgo: 5,
    posted_date: '02 June 2024',
    accepting_since: 'June 2024',
    accepted_count: 85,
    success_rate: '~22% selection rate (Reported)',
    knowledge_requirements: ["Search query intent classification (informational, navigational, transactional)","Web search relevance rubrics and regional source credibility","Snippet accuracy, date freshness, and direct answer validation"],
    cv_requirements: "One-page resume demonstrating strong online research habits, analytical reading skills, and concise written communication.",
    other_requirements: "Desktop or laptop computer running Chrome. Reliable internet and power backup. Government ID for KYC verification.",
  },
  {
    id: '10000000-0000-0000-0000-000000000009',
    slug: 'sample-mercor-clinical-knowledge-evaluator',
    platform_id: '00000000-0000-0000-0000-000000000004',
    title: 'Clinical & Biomedical Knowledge Evaluator [SAMPLE]',
    work_type: 'Domain Specialist',
    domains: ['Medicine', 'Pharmacology', 'Biomedical'],
    languages: ['English'],
    degree_levels: ["Master's", 'PhD'],
    summary: 'Audit medical and pharmacological answers generated by clinical assistant LLMs against peer-reviewed literature and PubMed citations.',
    requirements: 'MBBS, MD, PharmD, or equivalent advanced medical degree. Experience with biomedical literature review and clinical guidelines.',
    pay_text: '$75 - $120 / hr',
    pay_verified: true,
    pay_source_url: 'https://mercor.com/jobs/clinical-sample',
    official_url: 'https://mercor.com',
    apply_url: 'https://mercor.com/apply/biomedical-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 7 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    daysAgo: 7,
    posted_date: '28 October 2024',
    accepting_since: 'October 2024',
    accepted_count: 14,
    success_rate: '~6% selection rate (Reported)',
    knowledge_requirements: ["Clinical medicine, pharmacokinetics, and adverse reaction pathways","PubMed, Cochrane, and clinical guideline citation verification","Medical hallucination detection in clinical diagnostic reasoning","Evidence-based medicine rubrics and contraindication checks"],
    cv_requirements: "Medical CV showing graduation from accredited medical school (MBBS, MD, PharmD), clinical licensing details, and specialty certifications.",
    other_requirements: "Verification of medical credentials and clinical licensing status. Short technical profiling video interview.",
  },
  {
    id: '10000000-0000-0000-0000-000000000010',
    slug: 'sample-outlier-legal-compliance-evaluator',
    platform_id: '00000000-0000-0000-0000-000000000001',
    title: 'Legal Analysis & Statutory Reasoning Evaluator [SAMPLE]',
    work_type: 'Domain Specialist',
    domains: ['Law', 'Statutory Interpretation', 'Compliance'],
    languages: ['English'],
    degree_levels: ["Master's", 'PhD'],
    summary: 'Test language models on statutory interpretation, case law synthesis, and jurisdictional nuances across common law jurisdictions.',
    requirements: 'LL.B., J.D., or LL.M. degree. Proven ability to cite statutory provisions and legal authorities with zero tolerance for invented citations.',
    pay_text: '$45 - $65 / hr',
    pay_verified: true,
    pay_source_url: 'https://outlier.ai/careers/legal-sample',
    official_url: 'https://outlier.ai',
    apply_url: 'https://outlier.ai/apply/legal-eval-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 9 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 5 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    daysAgo: 9,
    posted_date: '15 September 2024',
    accepting_since: 'September 2024',
    accepted_count: 22,
    success_rate: '~9% selection rate (Reported)',
    knowledge_requirements: ["Common law statutory interpretation and legal synthesis","Legal citation accuracy and jurisdiction verification","Contractual clause analysis and statutory compliance checks","Zero tolerance for fabricated legal precedents or hallucinated case names"],
    cv_requirements: "Legal CV indicating law degree (LL.B, J.D., or LL.M), bar admission or legal internship experience, and legal research credentials.",
    other_requirements: "Desktop computer with dual-screen capability recommended for comparing statutory provisions. Government ID check.",
  },
  {
    id: '10000000-0000-0000-0000-000000000011',
    slug: 'sample-invisible-advanced-reasoning',
    platform_id: '00000000-0000-0000-0000-000000000005',
    title: 'Advanced Scientific Reasoning & SFT Evaluator [SAMPLE]',
    work_type: 'Domain Specialist',
    domains: ['STEM', 'Scientific Reasoning', 'Physics & Chemistry'],
    languages: ['English'],
    degree_levels: ["Master's", 'PhD', 'Postdoc'],
    summary: 'Construct complex multi-turn scientific prompts, verify mathematical derivations, and grade chain-of-thought proofs for frontier reasoning models.',
    requirements: 'Advanced postgraduate degree in Physics, Chemistry, or Computational Biology. Experience with formal research papers and LaTeX notation.',
    pay_text: '$40 - $70 / hr',
    pay_verified: true,
    pay_source_url: 'https://invisible.co/careers/science-sample',
    official_url: 'https://invisible.co',
    apply_url: 'https://invisible.co/apply/scientific-reasoning-sample',
    link: 'direct',
    status: 'verified',
    last_checked_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 11 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 22 * 86400000).toISOString(),
    daysAgo: 3,
    posted_date: '08 November 2024',
    accepting_since: 'November 2024',
    accepted_count: 16,
    success_rate: '~7% selection rate (Reported)',
    knowledge_requirements: ["Postgraduate scientific reasoning across Physics, Chemistry, or Computational Biology","Authoring multi-turn SFT prompts and verification rubrics","Chain-of-thought proof evaluation and rigorous derivation checks","LaTeX typesetting and complex scientific notation"],
    cv_requirements: "Academic CV highlighting postgraduate research (M.Sc., Ph.D.), peer-reviewed papers, and specific laboratory or computational domain specialties.",
    other_requirements: "Completion of 3-hour timed domain competency exam on Invisible platform. Technical interview with operations lead.",
  },
  {
    id: '10000000-0000-0000-0000-000000000012',
    slug: 'sample-tracebase-managed-vbt-author',
    platform_id: '00000000-0000-0000-0000-000000000005',
    title: 'Benchmark Task Author & RAG Evaluator [SAMPLE]',
    work_type: 'TraceBase Managed Sprint',
    domains: ['AI Benchmarking', 'RAG Evaluation', 'Citation Accuracy'],
    languages: ['English'],
    degree_levels: ["Bachelor's", "Master's"],
    summary: 'Direct contracted evaluation sprint managed by TraceBase. Author benchmark test sets, grade hallucination rates, and verify RAG retrieval citations for enterprise models.',
    requirements: 'Strong analytical writing and rubric adherence. Completion of TraceBase AI Evaluation Competency Certificate or equivalent proven evaluation portfolio.',
    pay_text: '$40 - $65 / hr',
    pay_verified: true,
    pay_source_url: 'https://tracebase.work/managed-sprints',
    official_url: 'https://tracebase.work',
    apply_url: 'https://tracebase.work/apply/managed-sprint',
    link: 'direct',
    is_managed: true,
    status: 'verified',
    last_checked_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    next_check_at: new Date(Date.now() + 13 * 86400000).toISOString(),
    closed_at: null,
    created_by: null,
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    daysAgo: 1,
    posted_date: '01 January 2025',
    accepting_since: 'January 2025',
    accepted_count: 12,
    success_rate: '~15% selection rate (Reported)',
    knowledge_requirements: ["TraceBase 5-point pairwise rubric scoring standards","Ground truth citation verification and excerpt linking","Negative constraint compliance checking and word limit adherence","RAG retrieval hallucination detection and parameter drift analysis"],
    cv_requirements: "TraceBase verified evaluator profile or certificate. Portfolio showing evaluated prompts, benchmark test sets, or audit contributions.",
    other_requirements: "Desktop workstation. Identity verification. Agreement to TraceBase evaluator code of conduct and audit confidentiality standards.",
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
  // Job 4 (Mercor)
  { job_id: '10000000-0000-0000-0000-000000000004', country_code: 'US', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000004', country_code: 'GB', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000004', country_code: 'CA', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000004', country_code: 'NG', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000004', country_code: 'IN', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  // Job 6 (Alignerr Multimodal)
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'NG', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'GH', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'KE', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'US', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'GB', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'IN', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000006', country_code: 'PH', status: 'accepted', source_url: 'https://alignerr.com/faq', checked_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  // Job 7 (DataAnnotation Math)
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'US', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'GB', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'CA', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'NG', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'IN', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000007', country_code: 'ZA', status: 'accepted', source_url: 'https://dataannotation.tech/faq', checked_at: new Date(Date.now() - 4 * 86400000).toISOString() },
  // Job 8 (Outlier Search)
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'NG', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'KE', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'GH', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'ZA', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'PH', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000008', country_code: 'IN', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 5 * 86400000).toISOString() },
  // Job 9 (Mercor Clinical)
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'US', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'GB', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'CA', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'NG', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'IN', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000009', country_code: 'DE', status: 'accepted', source_url: 'https://mercor.com/faq', checked_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  // Job 10 (Outlier Legal)
  { job_id: '10000000-0000-0000-0000-000000000010', country_code: 'US', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 9 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000010', country_code: 'GB', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 9 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000010', country_code: 'CA', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 9 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000010', country_code: 'NG', status: 'accepted', source_url: 'https://outlier.ai/faq', checked_at: new Date(Date.now() - 9 * 86400000).toISOString() },
  // Job 11 (Invisible Scientific Reasoning)
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'US', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'GB', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'CA', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'NG', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'GH', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'KE', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'ZA', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'IN', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000011', country_code: 'DE', status: 'accepted', source_url: 'https://invisible.co/faq', checked_at: new Date(Date.now() - 3 * 86400000).toISOString() },
  // Job 12 (TraceBase Managed Sprint)
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'US', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'NG', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'GB', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'KE', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'GH', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'CA', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'IN', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'ZA', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'PH', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
  { job_id: '10000000-0000-0000-0000-000000000012', country_code: 'DE', status: 'accepted', source_url: 'https://tracebase.work', checked_at: new Date(Date.now() - 1 * 86400000).toISOString() },
];

const INITIAL_CHECK_LOGS: CheckLog[] = [
  { id: 1, job_id: '10000000-0000-0000-0000-000000000001', platform_id: '00000000-0000-0000-0000-000000000001', result: 'verified', note: 'SAMPLE human check: verified application form is active and accepting candidate applications. Pay confirmed at $15-$22.', checked_by: 'EO', checked_at: new Date(Date.now() - 3 * 86400000).toISOString(), daysAgo: 3 },
  { id: 2, job_id: '10000000-0000-0000-0000-000000000002', platform_id: '00000000-0000-0000-0000-000000000002', result: 'verified', note: 'SAMPLE human check: confirmed TestGorilla pipeline is live for Python benchmark roles.', checked_by: 'AD', checked_at: new Date(Date.now() - 6 * 86400000).toISOString(), daysAgo: 6 },
  { id: 3, job_id: '10000000-0000-0000-0000-000000000003', platform_id: '00000000-0000-0000-0000-000000000003', result: 'needs_recheck', note: 'SAMPLE automated sweeper: 14 days elapsed since last human verification check.', checked_by: 'MK', checked_at: new Date(Date.now() - 4 * 86400000).toISOString(), daysAgo: 4 },
  { id: 4, job_id: '10000000-0000-0000-0000-000000000005', platform_id: '00000000-0000-0000-0000-000000000001', result: 'closed', note: 'SAMPLE human check: application link returned 404 and listing removed from career portal.', checked_by: 'EO', checked_at: new Date(Date.now() - 15 * 86400000).toISOString(), daysAgo: 15 },
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

const INITIAL_COMMUNITY_REPORTS: CommunityExperienceReport[] = [
  {
    id: 'cr-sample-1',
    platform_id: '00000000-0000-0000-0000-000000000001', // Outlier
    period_month_year: 'Sep 2026',
    onboarding_paid: false,
    tasks_available: 'intermittent',
    removed_without_explanation: false,
    optional_note: 'SAMPLE review: Assessment was unpaid but tasks appeared on queue after 48 hours.',
    contact_email: 'sample-user-1@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
  },
  {
    id: 'cr-sample-2',
    platform_id: '00000000-0000-0000-0000-000000000001', // Outlier
    period_month_year: 'Sep 2026',
    onboarding_paid: false,
    tasks_available: 'regular',
    removed_without_explanation: false,
    optional_note: 'SAMPLE review: Consistent coding verification tasks across August and September.',
    contact_email: 'sample-user-2@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 12 * 86400000).toISOString(),
  },
  {
    id: 'cr-sample-3',
    platform_id: '00000000-0000-0000-0000-000000000001', // Outlier
    period_month_year: 'Aug 2026',
    onboarding_paid: false,
    tasks_available: 'empty_queue',
    removed_without_explanation: true,
    optional_note: 'SAMPLE review: Queue ran dry after two weeks with no project re-assignment email.',
    contact_email: 'sample-user-3@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 25 * 86400000).toISOString(),
  },
  {
    id: 'cr-sample-4',
    platform_id: '00000000-0000-0000-0000-000000000002', // Alignerr
    period_month_year: 'Aug 2026',
    onboarding_paid: false,
    tasks_available: 'intermittent',
    removed_without_explanation: false,
    optional_note: 'SAMPLE review: TestGorilla tests were rigorous. Payout via Deel arrived on schedule.',
    contact_email: 'sample-user-4@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
  },
  {
    id: 'cr-sample-5',
    platform_id: '00000000-0000-0000-0000-000000000002', // Alignerr
    period_month_year: 'Sep 2026',
    onboarding_paid: false,
    tasks_available: 'regular',
    removed_without_explanation: false,
    optional_note: 'SAMPLE review: Domain reasoning batch had clear Slack channel support and active team leads.',
    contact_email: 'sample-user-5@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 'cr-sample-6',
    platform_id: '00000000-0000-0000-0000-000000000002', // Alignerr
    period_month_year: 'Sep 2026',
    onboarding_paid: false,
    tasks_available: 'regular',
    removed_without_explanation: false,
    optional_note: 'SAMPLE review: Medical terminology review project was consistent throughout September.',
    contact_email: 'sample-user-6@example.com',
    status: 'approved',
    moderation_notes: 'SAMPLE vetted report',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

const INITIAL_USERS: User[] = [
  {
    id: 'usr-00000000-0000-0000-0000-000000000001',
    email: 'contributor@tracebase.ai',
    country_code: 'NG',
    interests: ['RLHF & Alignment', 'Code Verification'],
    consent_marketing: true,
    consent_at: new Date(Date.now() - 30 * 86400000).toISOString(),
    created_at: new Date(Date.now() - 30 * 86400000).toISOString(),
  },
];

const INITIAL_SAVED_JOBS: SavedJob[] = [
  {
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000001',
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000003',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
];

const INITIAL_USER_APPLICATIONS: UserApplication[] = [
  {
    id: 'app-001',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000001',
    job_title: 'AI Generalist & Fact-Checking Evaluator [SAMPLE]',
    platform_name: 'Outlier AI',
    platform_url: 'https://outlier.ai/careers',
    pay_text: '$25 - $40 / hr',
    status: 'assessment_pending',
    applied_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    notes: 'Submitted profile and 1-page ATS CV. TestGorilla assessment invitation link received.',
  },
  {
    id: 'app-002',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000006',
    job_title: 'Multimodal & Code Reasoning Evaluator [SAMPLE]',
    platform_name: 'Alignerr',
    platform_url: 'https://alignerr.com/careers',
    pay_text: '$35 - $60 / hr',
    status: 'accepted',
    applied_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    notes: 'Passed TestGorilla screening (96%). Deel contract signed and workspace active.',
  },
  {
    id: 'app-003',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000007',
    job_title: 'Math & STEM Reasoning Specialist [SAMPLE]',
    platform_name: 'DataAnnotation Tech',
    platform_url: 'https://dataannotation.tech',
    pay_text: '$40 / hr',
    status: 'interviewing',
    applied_at: new Date(Date.now() - 18 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    notes: 'Starter assessment completed. Awaiting project pool allocation for STEM batch.',
  },
  {
    id: 'app-004',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    job_id: '10000000-0000-0000-0000-000000000011',
    job_title: 'Advanced Task Writer & Logic Auditor [SAMPLE]',
    platform_name: 'Invisible Technologies',
    platform_url: 'https://invisible.co/careers',
    pay_text: '$30 - $45 / hr',
    status: 'applied',
    applied_at: new Date(Date.now() - 24 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 24 * 86400000).toISOString(),
    notes: 'Submitted via TraceBase direct listing. Initial screening queue pending.',
  },
];

const INITIAL_USER_TEST_SCORES: UserTestScore[] = [
  {
    id: 'score-001',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'testgorilla-5min',
    title: 'TestGorilla 5-minute screening drill',
    category: 'Rapid evaluation',
    platform_target: 'Alignerr & Outlier',
    score: 96,
    passed: true,
    accuracy: '5 of 5 correct',
    completed_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'score-002',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'math-cot-slip',
    title: 'Math & chain-of-thought slip detection',
    category: 'Reasoning verification',
    platform_target: 'DataAnnotation Tech',
    score: 100,
    passed: true,
    accuracy: '6 of 6 correct',
    completed_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: 'score-003',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'negative-constraints',
    title: 'Instruction following & negative constraints',
    category: 'Constraint rigor',
    platform_target: 'Outlier AI',
    score: 92,
    passed: true,
    accuracy: '11 of 12 correct',
    completed_at: new Date(Date.now() - 6 * 86400000).toISOString(),
  },
  {
    id: 'score-004',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'legal-citation',
    title: 'Legal citation & statutory hallucination',
    category: 'Fact-checking',
    platform_target: 'Mercor & Alignerr',
    score: 90,
    passed: true,
    accuracy: '9 of 10 correct',
    completed_at: new Date(Date.now() - 8 * 86400000).toISOString(),
  },
  {
    id: 'score-005',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'pairwise-justification',
    title: 'Pairwise justification & non-sycophancy',
    category: 'Critical alignment',
    platform_target: 'Frontier AI teams',
    score: 94,
    passed: true,
    accuracy: '8 of 8 correct',
    completed_at: new Date(Date.now() - 11 * 86400000).toISOString(),
  },
  {
    id: 'score-006',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    drill_id: 'prompt-ambiguity',
    title: 'Prompt ambiguity & clarification drill',
    category: 'Core evaluation',
    platform_target: 'General RLHF',
    score: 88,
    passed: true,
    accuracy: '7 of 8 correct',
    completed_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
];

const INITIAL_USER_CVS: UserCv[] = [
  {
    id: 'cv-001',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    title: 'Generalist AI Model Evaluator CV [SAMPLE]',
    target_role: 'Outlier & Alignerr Generalist Tier',
    ats_score: 98,
    density: 'compact',
    filename: 'contributor-generalist-evaluator-cv.pdf',
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    summary_snippet: 'One-page ATS format emphasizing prompt calibration, fact verification, and 96% TestGorilla screening score.',
  },
  {
    id: 'cv-002',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    title: 'STEM & Code Benchmark Specialist CV [SAMPLE]',
    target_role: 'Code & Math Reasoning Evaluation',
    ats_score: 96,
    density: 'ultra-compact',
    filename: 'contributor-stem-reasoning-cv.pdf',
    created_at: new Date(Date.now() - 15 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    summary_snippet: 'Single-page technical resume featuring Python test suite debugging, unit test verification, and mathematical proof checking.',
  },
  {
    id: 'cv-003',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    title: 'Linguistic & African Dialect Localization CV [SAMPLE]',
    target_role: 'Multilingual RLHF & Cultural Audit',
    ats_score: 94,
    density: 'standard',
    filename: 'contributor-linguistics-localization-cv.pdf',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString(),
    last_updated_at: new Date(Date.now() - 12 * 86400000).toISOString(),
    summary_snippet: 'Linguistics CV covering Nigerian English, West African idioms, and cultural safety guidelines for generative AI.',
  },
];

const INITIAL_USER_PAYOUTS: UserPayoutLog[] = [
  {
    id: 'pay-001',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    platform_name: 'Alignerr (Deel)',
    hours_logged: 18.5,
    rate_usd: 40,
    gross_usd: 740,
    net_local_currency: '₦1,110,000 NGN',
    period: 'Oct 2026 (Batch A)',
    status: 'paid',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: 'pay-002',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    platform_name: 'Outlier AI (PayPal)',
    hours_logged: 12.0,
    rate_usd: 30,
    gross_usd: 360,
    net_local_currency: '₦540,000 NGN',
    period: 'Oct 2026 (Batch B)',
    status: 'processing',
    created_at: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: 'pay-003',
    user_id: 'usr-00000000-0000-0000-0000-000000000001',
    platform_name: 'DataAnnotation Tech',
    hours_logged: 8.0,
    rate_usd: 40,
    gross_usd: 320,
    net_local_currency: '₦480,000 NGN',
    period: 'Current week',
    status: 'logged',
    created_at: new Date(Date.now() - 0.5 * 86400000).toISOString(),
  },
];

const INITIAL_EVALUATOR_LEADS: EvaluatorLead[] = [
  {
    id: 'eval-lead-1',
    name: 'Dr. Chinedu Eze',
    email: 'chinedu.eze@example.com',
    country_code: 'NG',
    domain: 'Medicine & Pharmacology',
    credentials: 'MBBS (UNN), FWACP Cardiology Resident',
    years_experience: '6 years clinical practice',
    portfolio_url: 'https://linkedin.com/in/chinedu-eze-sample',
    weekly_hours: '10-15 hrs/week',
    status: 'new',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
];

const INITIAL_WEEKLY_SCAMS: WeeklyScamPost[] = [
  {
    id: 'wscam-sample-1',
    slug: 'telegram-advance-fee-recruitment-scheme',
    title: 'Advance fee recruitment scheme impersonating frontier AI research lab [SAMPLE]',
    reported_date: '12 Oct 2026',
    message_paraphrased:
      'Unsolicited WhatsApp outreach claiming to offer remote model evaluation contracts at 45 USD per hour, requesting candidates move to Telegram and pay a mandatory onboarding software licensing fee before task assignment.',
    warning_signs: [
      'Unsolicited outreach from personal mobile numbers or free webmail accounts.',
      'Demanding upfront payment for background checks, equipment, or software licenses.',
      'Refusal to conduct formal interview steps through official corporate domains.',
    ],
    what_to_do: [
      'Never send funds, cryptocurrency, or gift cards to any recruiter or hiring manager.',
      'Cross-check company email domains directly against our Official Channels Directory.',
      'Report the message immediately to our Scam Radar and block the sender.',
    ],
    published: true,
    source_report_id: null,
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
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
  outboundClicks: OutboundClick[] = [];
  subscriptions: AlertSubscription[] = [];
  consentLogs: ConsentLog[] = [];
  analyticsEvents: AnalyticsEvent[] = [];
  // Milestone 11 additions
  users: User[] = [...INITIAL_USERS];
  savedJobs: SavedJob[] = [...INITIAL_SAVED_JOBS];
  applications: UserApplication[] = [...INITIAL_USER_APPLICATIONS];
  testScores: UserTestScore[] = [...INITIAL_USER_TEST_SCORES];
  userCvs: UserCv[] = [...INITIAL_USER_CVS];
  userPayouts: UserPayoutLog[] = [...INITIAL_USER_PAYOUTS];
  magicLinks: MagicLinkToken[] = [];
  sessions: UserSession[] = [];
  communityReports: CommunityExperienceReport[] = [...INITIAL_COMMUNITY_REPORTS];
  evaluatorLeads: EvaluatorLead[] = [...INITIAL_EVALUATOR_LEADS];
  weeklyScams: WeeklyScamPost[] = [...INITIAL_WEEKLY_SCAMS];
  settings: {
    max_live_roles: number;
    rechecks_paused_until: string | null;
  } = {
    max_live_roles: 35,
    rechecks_paused_until: null,
  };
}

const globalStore = new RepositoryStore();

/**
 * Launch-day state: in production (NODE_ENV === 'production'), seed sample
 * entries marked [SAMPLE] are hidden unless SHOW_SAMPLE_DATA is explicitly 'true'.
 */
export function shouldShowSampleData(): boolean {
  if (process.env.SHOW_SAMPLE_DATA !== undefined) {
    return process.env.SHOW_SAMPLE_DATA === 'true';
  }
  return process.env.NODE_ENV !== 'production';
}

export function isSampleJob(job: { is_sample?: boolean; title: string; slug: string; status_info?: { isSample?: boolean } }): boolean {
  return (
    Boolean(job.is_sample) ||
    job.title.includes('[SAMPLE]') ||
    job.slug.startsWith('sample-') ||
    Boolean(job.status_info?.isSample)
  );
}

export function isSamplePlatform(platform: { name: string; slug: string }): boolean {
  return (
    platform.name.includes('[SAMPLE]') ||
    platform.slug.startsWith('sample-')
  );
}

export interface JobFilterParams {
  country?: string;
  workType?: string;
  workTypes?: string[];
  domain?: string;
  domains?: string[];
  payBasis?: string[];
  freshness?: '7' | '14' | 'any' | string;
  status?: JobStatus | 'all';
  query?: string;
  degreeLevel?: string;
  degreeLevels?: string[];
  includeUnconfirmed?: boolean;
  includeSample?: boolean;
  sort?: 'newest' | 'freshness' | 'pay';
  limit?: number;
  offset?: number;
}

export const dbRepository = {
  // Settings
  getSettings(): { max_live_roles: number; rechecks_paused_until: string | null } {
    return { ...globalStore.settings };
  },

  updateSettings(
    partial: Partial<{ max_live_roles: number; rechecks_paused_until: string | null }>,
    actorId?: string | null
  ) {
    const prev = { ...globalStore.settings };
    globalStore.settings = { ...globalStore.settings, ...partial };
    this.logAudit({
      actor: actorId || null,
      action: 'settings.update',
      entity: 'settings',
      entity_id: 'global',
      diff: { before: prev, after: globalStore.settings },
    });
    return { ...globalStore.settings };
  },

  // Countries
  getCountries(): Country[] {
    return [...globalStore.countries];
  },

  getCountryByCode(code: string): Country | undefined {
    return globalStore.countries.find((c) => c.code.toUpperCase() === code.toUpperCase());
  },

  // Platforms
  getPlatforms(options?: { includeSample?: boolean }): Platform[] {
    const showSample = options?.includeSample ?? shouldShowSampleData();
    if (!showSample) {
      return globalStore.platforms.filter((p) => !isSamplePlatform(p));
    }
    return [...globalStore.platforms];
  },

  getPlatformById(id: string, options?: { includeSample?: boolean }): Platform | undefined {
    const p = globalStore.platforms.find((item) => item.id === id);
    if (!p) return undefined;
    const showSample = options?.includeSample ?? shouldShowSampleData();
    if (!showSample && isSamplePlatform(p)) return undefined;
    return p;
  },

  getPlatformBySlug(slug: string, options?: { includeSample?: boolean }): Platform | undefined {
    const p = globalStore.platforms.find((item) => item.slug === slug);
    if (!p) return undefined;
    const showSample = options?.includeSample ?? shouldShowSampleData();
    if (!showSample && isSamplePlatform(p)) return undefined;
    return p;
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
    const showSample = filters.includeSample ?? shouldShowSampleData();
    if (!showSample) {
      result = result.filter((j) => !isSampleJob(j));
    }

    // Status filter:
    // If not specified or undefined, default to showing active jobs: 'verified' and 'needs_recheck'
    // If explicitly specified and not 'all', filter by that status.
    if (filters.status && filters.status !== 'all') {
      result = result.filter((j) => j.status === filters.status);
    } else if (!filters.status) {
      // default: active listings (verified + needs_recheck)
      result = result.filter((j) => j.status === 'verified' || j.status === 'needs_recheck');
    }

    // Work types filter:
    const activeWorkTypes: string[] = [];
    if (filters.workTypes && filters.workTypes.length > 0) {
      activeWorkTypes.push(...filters.workTypes);
    } else if (filters.workType && filters.workType !== 'All') {
      activeWorkTypes.push(filters.workType);
    }
    if (activeWorkTypes.length > 0) {
      result = result.filter((j) =>
        activeWorkTypes.some((wt) => {
          const lwt = wt.toLowerCase();
          const jwt = j.work_type.toLowerCase();
          return jwt.includes(lwt) || lwt.includes(jwt);
        })
      );
    }

    // Domain filter:
    const activeDomains: string[] = [];
    if (filters.domains && filters.domains.length > 0) {
      activeDomains.push(...filters.domains);
    } else if (filters.domain && filters.domain !== 'All') {
      activeDomains.push(filters.domain);
    }
    if (activeDomains.length > 0) {
      result = result.filter((j) =>
        activeDomains.some((d) => {
          const ld = d.toLowerCase();
          return j.domains.some((jd) => jd.toLowerCase().includes(ld) || ld.includes(jd.toLowerCase()));
        })
      );
    }

    // Degree level filter:
    const activeDegrees: string[] = [];
    if (filters.degreeLevels && filters.degreeLevels.length > 0) {
      activeDegrees.push(...filters.degreeLevels);
    } else if (filters.degreeLevel && filters.degreeLevel !== 'All') {
      activeDegrees.push(filters.degreeLevel);
    }
    if (activeDegrees.length > 0) {
      result = result.filter((j) =>
        activeDegrees.some((deg) => j.degree_levels.includes(deg))
      );
    }

    // Freshness filter:
    if (filters.freshness && filters.freshness !== 'any') {
      const maxDays = parseInt(filters.freshness, 10);
      if (!isNaN(maxDays)) {
        result = result.filter((j) => (j.daysAgo ?? 0) <= maxDays);
      }
    }

    // Country eligibility filter:
    if (filters.country && filters.country !== 'ALL' && filters.country !== 'GLOBAL') {
      const allowedJobIds = new Set(
        globalStore.jobEligibility
          .filter((e) => {
            if (e.country_code !== filters.country) return false;
            if (e.status === 'accepted') return true;
            if (filters.includeUnconfirmed && e.status === 'unconfirmed') return true;
            return false;
          })
          .map((e) => e.job_id)
      );
      result = result.filter((j) => allowedJobIds.has(j.id));
    }

    // Full-text / search query filter:
    if (filters.query && filters.query.trim()) {
      const q = filters.query.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);
      const compactQuery = q.replace(/[^a-z0-9]/g, '');

      result = result.filter((j) => {
        const platform = globalStore.platforms.find((p) => p.id === j.platform_id);
        const platformName = platform ? platform.name.toLowerCase() : '';
        const fullText = `${j.title} ${platformName} ${j.work_type} ${j.summary} ${j.requirements || ''} ${(j.domains || []).join(' ')} ${(j.languages || []).join(' ')} ${j.pay_text || ''}`.toLowerCase();
        const compactFullText = fullText.replace(/[^a-z0-9]/g, '');

        if (compactQuery.length > 2 && compactFullText.includes(compactQuery)) {
          return true;
        }

        return tokens.every((token) => {
          if (fullText.includes(token)) return true;
          const compactToken = token.replace(/[^a-z0-9]/g, '');
          return compactToken.length > 2 && compactFullText.includes(compactToken);
        });
      });
    }

    // Sorting:
    const sort = filters.sort || 'newest';
    if (sort === 'freshness') {
      result = [...result].sort((a, b) => (a.daysAgo ?? 0) - (b.daysAgo ?? 0));
    } else if (sort === 'pay') {
      result = [...result].sort((a, b) => {
        const aPay = a.pay_verified ? 1 : 0;
        const bPay = b.pay_verified ? 1 : 0;
        return bPay - aPay;
      });
    } else {
      // 'newest' (default)
      result = [...result].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    // Pagination (offset & limit):
    const offset = filters.offset || 0;
    const limit = filters.limit;
    if (typeof limit === 'number') {
      result = result.slice(offset, offset + limit);
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

  getJobById(id: string, options?: { includeSample?: boolean }): JobWithPlatform | undefined {
    const job = globalStore.jobs.find((j) => j.id === id);
    if (!job) return undefined;
    const showSample = options?.includeSample ?? shouldShowSampleData();
    if (!showSample && isSampleJob(job)) return undefined;
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

  getJobBySlug(slug: string, options?: { includeSample?: boolean }): JobWithPlatform | undefined {
    let job = globalStore.jobs.find((j) => j.slug === slug);
    if (!job && (slug === 'outlier-ai-generalist-evaluator' || slug === 'sample-outlier-ai-generalist-evaluator')) {
      job = globalStore.jobs.find((j) => j.slug === 'sample-outlier-rlhf-generalist');
    }
    if (!job) return undefined;
    const showSample = options?.includeSample ?? shouldShowSampleData();
    if (!showSample && isSampleJob(job)) return undefined;
    return this.getJobById(job.id, { includeSample: true });
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

    const checkerInitials =
      actorId && actorId.length <= 4 && /^[A-Z0-9]+$/i.test(actorId)
        ? actorId.toUpperCase()
        : 'CO';

    // Write check log
    globalStore.checkLogs.unshift({
      id: globalStore.checkLogs.length + 1,
      job_id: jobId,
      platform_id: updated.platform_id,
      result: 'verified',
      note: note.trim() || 'Human verification confirmed active and accurate',
      checked_by: checkerInitials,
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

    const checkerInitials =
      actorId && actorId.length <= 4 && /^[A-Z0-9]+$/i.test(actorId)
        ? actorId.toUpperCase()
        : 'CO';

    globalStore.checkLogs.unshift({
      id: globalStore.checkLogs.length + 1,
      job_id: jobId,
      platform_id: updated.platform_id,
      result: 'closed',
      note: reason.trim() || 'Role marked closed by admin',
      checked_by: checkerInitials,
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

  getCheckLogs(jobId?: string, limit: number = 50, options?: { includeSample?: boolean }): CheckLog[] {
    const showSample = options?.includeSample ?? shouldShowSampleData();
    let logs = jobId
      ? globalStore.checkLogs.filter((c) => c.job_id === jobId)
      : globalStore.checkLogs;
    if (!showSample) {
      logs = logs.filter((l) => !l.note.includes('SAMPLE') && !l.note.includes('[SAMPLE]'));
    }
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

  updateIncidentStatus(id: string, status: IncidentStatus, actorId?: string | null): IncidentLog {
    const inc = globalStore.incidents.find((i) => i.id === id);
    if (!inc) throw new Error(`Incident ${id} not found`);
    const prevStatus = inc.status;
    inc.status = status;
    if (status === 'reported' && !inc.reported_at) {
      inc.reported_at = new Date().toISOString();
    }

    this.logAudit({
      actor: actorId || null,
      action: 'incident.update_status',
      entity: 'incident_log',
      entity_id: id,
      diff: { from: prevStatus, to: status, reported_at: inc.reported_at },
    });

    return inc;
  },

  getCurrentTimestamp(): number {
    return Date.now();
  },

  // Privacy requests (Section 17.2a)
  getPrivacyRequests(): PrivacyRequest[] {
    return [...globalStore.privacyRequests];
  },

  createPrivacyRequest(data: {
    kind: PrivacyRequestKind;
    contact_email: string;
    note?: string | null;
    country_code?: string | null;
  }): PrivacyRequest {
    const nowIso = new Date().toISOString();
    // 30 days statutory response window per NDPA 2023
    const dueIso = new Date(Date.now() + 30 * 86400000).toISOString();
    const req: PrivacyRequest = {
      id: `pr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      kind: data.kind,
      contact_email: data.contact_email.trim().toLowerCase(),
      received_at: nowIso,
      due_at: dueIso,
      closed_at: null,
      note: data.note ? data.note.trim() : null,
      country_code: data.country_code ? data.country_code.trim().toUpperCase() : null,
    };

    globalStore.privacyRequests.unshift(req);

    this.logAudit({
      actor: null,
      action: 'privacy_request.create',
      entity: 'privacy_requests',
      entity_id: req.id,
      diff: { kind: req.kind, email: req.contact_email, due_at: req.due_at, country_code: req.country_code },
    });

    return req;
  },

  closePrivacyRequest(id: string, note?: string | null, actorId?: string | null): PrivacyRequest {
    const req = globalStore.privacyRequests.find((r) => r.id === id);
    if (!req) throw new Error(`Privacy request ${id} not found`);
    req.closed_at = new Date().toISOString();
    if (note) {
      req.note = req.note ? `${req.note} | Resolution: ${note}` : `Resolution: ${note}`;
    }

    this.logAudit({
      actor: actorId || null,
      action: 'privacy_request.close',
      entity: 'privacy_requests',
      entity_id: id,
      diff: { closed_at: req.closed_at, note: req.note },
    });

    return req;
  },

  // Admin Stats
  getAdminStats(): AdminStats {
    const jobs = globalStore.jobs;
    const verifiedJobs = jobs.filter((j) => j.status === 'verified').length;
    const needsRecheckJobs = jobs.filter((j) => j.status === 'needs_recheck').length;
    const closedJobs = jobs.filter((j) => j.status === 'closed').length;
    const activeAudits = verifiedJobs + needsRecheckJobs;
    const complianceRate = activeAudits > 0 ? Math.round((verifiedJobs / activeAudits) * 100) : 100;
    const maxLiveRoles = this.getMaxLiveRoles();
    const activeJobs = activeAudits;
    const recheckCapacityWarning = activeJobs > maxLiveRoles;

    return {
      totalJobs: jobs.length,
      verifiedJobs,
      needsRecheckJobs,
      closedJobs,
      complianceRate,
      activeIncidents: globalStore.incidents.filter((i) => i.status === 'open').length,
      pendingReports: globalStore.reports.filter((r) => r.status === 'pending').length,
      openPrivacyRequests: globalStore.privacyRequests.filter((p) => !p.closed_at).length,
      newLeads: globalStore.evalLeads.filter((l) => l.status === 'new').length,
      totalLeads: globalStore.evalLeads.length,
      pendingCommunityReports: globalStore.communityReports.filter((r) => r.status === 'pending').length,
      evaluatorApplications: globalStore.evaluatorLeads.length,
      maxLiveRoles,
      activeJobs,
      recheckCapacityWarning,
    };
  },

  getMaxLiveRoles(): number {
    return globalStore.settings?.max_live_roles ?? 35;
  },

  setMaxLiveRoles(limit: number, actorId?: string | null): number {
    const parsed = Math.max(1, Math.min(200, Math.floor(limit)));
    if (!globalStore.settings) {
      globalStore.settings = { max_live_roles: 35, rechecks_paused_until: null };
    }
    const previous = globalStore.settings.max_live_roles;
    globalStore.settings.max_live_roles = parsed;

    this.logAudit({
      actor: actorId || null,
      action: 'settings.update_max_live_roles',
      entity: 'settings',
      entity_id: 'max_live_roles',
      diff: { previous, updated: parsed },
    });

    return parsed;
  },

  getRecheckQueue(): JobWithPlatform[] {
    return this.getJobs()
      .filter((j) => {
        if (j.status === 'needs_recheck') return true;
        if (j.status === 'verified' && (j.daysAgo ?? 0) >= 10) return true;
        return false;
      })
      .sort((a, b) => {
        // Sort strictly by due date: most overdue (earliest last_checked_at) first
        const dueA = a.last_checked_at ? new Date(a.last_checked_at).getTime() : 0;
        const dueB = b.last_checked_at ? new Date(b.last_checked_at).getTime() : 0;
        return dueA - dueB;
      });
  },

  getActiveIncidentRemainingHours(): number | null {
    const inc = globalStore.incidents.find((i) => i.status === 'open');
    if (!inc) return null;
    return 60; // 60 hours remaining in regulatory window
  },

  // Outbound Clicks Tracking (Section 7.3 & 14)
  // Anonymous: records job id, link type, coarse country chip, and date only. Never IP or fingerprint.
  logOutboundClick(jobId: string, linkType: LinkType, countryCode?: string | null): OutboundClick {
    const click: OutboundClick = {
      id: globalStore.outboundClicks.length + 1,
      job_id: jobId,
      link: linkType,
      country_code: countryCode ? countryCode.toUpperCase().slice(0, 2) : null,
      clicked_on: new Date().toISOString().split('T')[0],
    };
    globalStore.outboundClicks.push(click);
    return click;
  },

  getOutboundClickCounts(jobId: string): number {
    return globalStore.outboundClicks.filter((c) => c.job_id === jobId).length;
  },

  // Reports (Section 7.3, 7.8 & 13.5)
  createReport(data: {
    kind: ReportKind;
    target_id?: string | null;
    body: string;
    contact_email?: string | null;
  }): Report {
    const report: Report = {
      id: `rep-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      kind: data.kind,
      target_id: data.target_id || null,
      body: data.body.trim(),
      contact_email: data.contact_email ? data.contact_email.trim() : null,
      status: 'pending',
      moderation_notes: null,
      created_at: new Date().toISOString(),
    };
    globalStore.reports.unshift(report);

    this.logAudit({
      actor: null,
      action: 'report.submit',
      entity: 'reports',
      entity_id: report.id,
      diff: { kind: report.kind, target_id: report.target_id },
    });

    return report;
  },

  getReports(): Report[] {
    return [...globalStore.reports];
  },

  updateReportStatus(id: string, status: ReportStatus, moderationNotes?: string): boolean {
    const report = globalStore.reports.find((r) => r.id === id);
    if (!report) return false;
    report.status = status;
    if (moderationNotes) {
      report.moderation_notes = moderationNotes;
    }
    this.logAudit({
      actor: null,
      action: 'report.moderate',
      entity: 'reports',
      entity_id: id,
      diff: { status, moderation_notes: moderationNotes },
    });
    return true;
  },

  // Scams We Saw This Week (Part 3.4)
  getWeeklyScams(includeDrafts = false): WeeklyScamPost[] {
    if (includeDrafts) {
      return [...globalStore.weeklyScams];
    }
    return globalStore.weeklyScams.filter((s) => s.published);
  },

  getWeeklyScamBySlug(slug: string): WeeklyScamPost | undefined {
    return globalStore.weeklyScams.find((s) => s.slug === slug);
  },

  createWeeklyScam(data: {
    title: string;
    slug?: string;
    reported_date: string;
    message_paraphrased: string;
    warning_signs: string[];
    what_to_do: string[];
    published?: boolean;
    source_report_id?: string | null;
  }): WeeklyScamPost {
    const baseSlug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const post: WeeklyScamPost = {
      id: `wscam-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      slug: baseSlug,
      title: data.title,
      reported_date: data.reported_date,
      message_paraphrased: data.message_paraphrased,
      warning_signs: data.warning_signs,
      what_to_do: data.what_to_do,
      published: data.published ?? true,
      source_report_id: data.source_report_id || null,
      created_at: new Date().toISOString(),
    };

    globalStore.weeklyScams.unshift(post);

    this.logAudit({
      actor: null,
      action: 'weekly_scam.publish',
      entity: 'weekly_scams',
      entity_id: post.id,
      diff: { title: post.title, slug: post.slug, published: post.published },
    });

    return post;
  },

  publishWeeklyScam(id: string): boolean {
    const post = globalStore.weeklyScams.find((s) => s.id === id);
    if (!post) return false;
    post.published = true;
    return true;
  },

  // Evaluation Studio Leads (Master Plan Section 7.9c & 13)
  createEvalLead(data: {
    name: string;
    work_email: string;
    company?: string | null;
    product_url?: string | null;
    service?: string | null;
    volume?: string | null;
    source_type?: string | null;
    timeline?: string | null;
    has_rubric?: boolean;
    sensitivity?: string | null;
    message?: string | null;
    idempotency_key?: string | null;
  }): EvalLead {
    // Idempotency check: prevent duplicate leads from double taps or retries
    if (data.idempotency_key) {
      const existing = globalStore.evalLeads.find(
        (l) => l.idempotency_key === data.idempotency_key
      );
      if (existing) {
        return existing;
      }
    }

    const year = new Date().getFullYear();
    const count = globalStore.evalLeads.length + 1;
    const referenceId = `EV-${year}-${String(count).padStart(4, '0')}`;

    const lead: EvalLead = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      reference_id: referenceId,
      name: data.name.trim(),
      work_email: data.work_email.trim().toLowerCase(),
      company: data.company ? data.company.trim() : null,
      product_url: data.product_url ? data.product_url.trim() : null,
      service: data.service || 'rag_and_citation_audit',
      volume: data.volume || null,
      source_type: data.source_type || 'public_docs',
      timeline: data.timeline || 'standard_2_weeks',
      has_rubric: !!data.has_rubric,
      sensitivity: data.sensitivity || 'standard',
      message: data.message ? data.message.trim() : null,
      status: 'new',
      idempotency_key: data.idempotency_key || null,
      created_at: new Date().toISOString(),
    };

    globalStore.evalLeads.unshift(lead);

    this.logAudit({
      actor: null,
      action: 'lead.create',
      entity: 'eval_leads',
      entity_id: lead.id,
      diff: {
        reference_id: lead.reference_id,
        service: lead.service,
        company: lead.company,
      },
    });

    return lead;
  },

  getEvalLeads(): EvalLead[] {
    return [...globalStore.evalLeads];
  },

  getEvalLeadByRef(refId: string): EvalLead | undefined {
    return globalStore.evalLeads.find(
      (l) => l.reference_id.toUpperCase() === refId.trim().toUpperCase()
    );
  },

  updateEvalLeadStatus(
    id: string,
    status: EvalLead['status'],
    actorId?: string | null
  ): EvalLead {
    const idx = globalStore.evalLeads.findIndex((l) => l.id === id);
    if (idx === -1) {
      throw new Error(`Lead ${id} not found`);
    }

    const prev = globalStore.evalLeads[idx];
    const updated: EvalLead = {
      ...prev,
      status,
    };
    globalStore.evalLeads[idx] = updated;

    this.logAudit({
      actor: actorId || null,
      action: 'lead.status_update',
      entity: 'eval_leads',
      entity_id: id,
      diff: { from: prev.status, to: status },
    });

    return updated;
  },

  // Newsletter & Double Opt-in (Milestone 9)
  subscribeNewsletter({
    email,
    country_code = null,
    work_types = [],
    frequency = 'weekly',
    categories = ['opportunities', 'newsletter', 'scam_alerts'],
  }: {
    email: string;
    country_code?: string | null;
    work_types?: string[];
    frequency?: string;
    categories?: string[];
  }): { subscription: AlertSubscription; token: string; isNew: boolean } {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = globalStore.subscriptions.find(
      (s) => s.email.toLowerCase() === normalizedEmail
    );

    const token = `optin_${Math.random().toString(36).slice(2)}${Date.now()}`;
    const emailHash = createHash('sha256').update(normalizedEmail).digest('hex');

    if (existing) {
      if (existing.status === 'active') {
        if (frequency) existing.frequency = frequency;
        if (categories) existing.categories = categories;
        if (country_code) existing.country_code = country_code;
        return { subscription: existing, token: existing.token || token, isNew: false };
      }
      existing.token = token;
      existing.status = 'pending';
      if (frequency) existing.frequency = frequency;
      if (categories) existing.categories = categories;
      if (country_code) existing.country_code = country_code;
      if (work_types.length > 0) existing.work_types = work_types;

      globalStore.consentLogs.push({
        id: globalStore.consentLogs.length + 1,
        email_hash: emailHash,
        purpose: 'newsletter',
        policy_version: 'v1.0.0',
        given: true,
        at: new Date().toISOString(),
      });

      return { subscription: existing, token, isNew: false };
    }

    const newSub: AlertSubscription = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      email: normalizedEmail,
      user_id: null,
      country_code,
      work_types,
      frequency,
      categories,
      token,
      status: 'pending',
      confirmed_at: null,
      created_at: new Date().toISOString(),
    };

    globalStore.subscriptions.push(newSub);

    globalStore.consentLogs.push({
      id: globalStore.consentLogs.length + 1,
      email_hash: emailHash,
      purpose: 'newsletter',
      policy_version: 'v1.0.0',
      given: true,
      at: new Date().toISOString(),
    });

    return { subscription: newSub, token, isNew: true };
  },

  confirmSubscription(token: string): AlertSubscription | null {
    const sub = globalStore.subscriptions.find((s) => s.token === token);
    if (!sub) return null;

    sub.confirmed_at = new Date().toISOString();
    sub.status = 'active';

    this.logAudit({
      actor: null,
      action: 'newsletter.confirm',
      entity: 'alert_subscriptions',
      entity_id: sub.id,
      diff: { status: 'active', confirmed_at: sub.confirmed_at },
    });

    return sub;
  },

  unsubscribeSubscription(tokenOrEmail: string): boolean {
    const term = tokenOrEmail.trim().toLowerCase();
    const sub = globalStore.subscriptions.find(
      (s) => s.token === term || s.email.toLowerCase() === term
    );
    if (!sub) return false;

    sub.status = 'unsubscribed';
    const emailHash = createHash('sha256').update(sub.email.toLowerCase()).digest('hex');

    globalStore.consentLogs.push({
      id: globalStore.consentLogs.length + 1,
      email_hash: emailHash,
      purpose: 'newsletter',
      policy_version: 'v1.0.0',
      given: false,
      at: new Date().toISOString(),
    });

    this.logAudit({
      actor: null,
      action: 'newsletter.unsubscribe',
      entity: 'alert_subscriptions',
      entity_id: sub.id,
      diff: { status: 'unsubscribed' },
    });

    return true;
  },

  getSubscribers(status?: 'active' | 'pending' | 'unsubscribed'): AlertSubscription[] {
    if (status) {
      return globalStore.subscriptions.filter((s) => s.status === status);
    }
    return [...globalStore.subscriptions];
  },

  // Privacy-Friendly Analytics (Section 18.1)
  recordAnalyticsEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>): AnalyticsEvent {
    const entry: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      event: event.event,
      path: event.path,
      properties: event.properties,
      timestamp: new Date().toISOString(),
    };

    globalStore.analyticsEvents.unshift(entry);
    if (globalStore.analyticsEvents.length > 5000) {
      globalStore.analyticsEvents.pop();
    }

    return entry;
  },

  getAnalyticsStats(days: number = 7) {
    const cutoffMs = Date.now() - days * 86400000;
    const events = globalStore.analyticsEvents.filter(
      (e) => !e.timestamp || new Date(e.timestamp).getTime() >= cutoffMs
    );
    const directClicks = globalStore.outboundClicks.filter(
      (c) => c.link === 'direct' && (!c.clicked_on || new Date(c.clicked_on).getTime() >= cutoffMs)
    ).length;
    const referralClicks = globalStore.outboundClicks.filter(
      (c) => c.link === 'referral' && (!c.clicked_on || new Date(c.clicked_on).getTime() >= cutoffMs)
    ).length;

    const eventCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    let fullTierCount = 0;
    let liteTierCount = 0;

    events.forEach((e) => {
      eventCounts[e.event] = (eventCounts[e.event] || 0) + 1;
      if (e.properties?.country_code && typeof e.properties.country_code === 'string') {
        const c = e.properties.country_code.toUpperCase();
        countryCounts[c] = (countryCounts[c] || 0) + 1;
      }
      if (e.properties?.tier === 'lite') liteTierCount++;
      if (e.properties?.tier === 'full') fullTierCount++;
    });

    const activeSubs = globalStore.subscriptions.filter((s) => s.status === 'active').length;
    const pendingSubs = globalStore.subscriptions.filter((s) => s.status === 'pending').length;

    return {
      totalEvents: events.length,
      eventCounts,
      activeSubscribers: activeSubs,
      pendingSubscribers: pendingSubs,
      totalOutboundClicks: globalStore.outboundClicks.length,
      directClicks,
      referralClicks,
      tierBreakdown: {
        full: fullTierCount,
        lite: liteTierCount,
      },
      topCountries: Object.entries(countryCounts)
        .map(([code, count]) => ({ code, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
      recentEvents: events.slice(0, 25),
    };
  },

  // Weekly Digest Draft Generator (Section 7.12)
  generateWeeklyDigestDraft(): DigestDraft {
    const jobs = this.getJobs({ status: 'verified' });
    const freshJobs = jobs.filter((j) => (j.daysAgo ?? 0) <= 14);

    const ngRoles = freshJobs
      .filter((j) => j.eligibility.some((e) => e.country_code === 'NG' && e.status === 'accepted'))
      .map((j) => ({
        title: j.title,
        platform: j.platform.name,
        payText: j.pay_text || 'Pay not confirmed',
        slug: j.slug,
      }));

    const globalRoles = freshJobs
      .filter((j) => j.eligibility.some((e) => e.country_code === 'US' || e.country_code === 'GB'))
      .map((j) => ({
        title: j.title,
        platform: j.platform.name,
        payText: j.pay_text || 'Pay not confirmed',
        slug: j.slug,
      }));

    const draft: DigestDraft = {
      id: `digest-${Date.now()}`,
      issueNumber: 1,
      weekStarting: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      subject: `TraceBase Weekly AI Work Digest: ${freshJobs.length} Verified Roles Fresh`,
      previewText: `New human-checked evaluation roles across Outlier, Alignerr, Mercor, and Invisible. Zero em dashes, zero fake pay.`,
      featuredGuide: {
        title: 'How to Tell If an AI Work Listing Is Real',
        slug: 'how-to-tell-if-an-ai-work-listing-is-real',
        summary: 'A 5-step verification test to evaluate whether remote AI training listings are legitimate before handing over personal credentials.',
      },
      rolesByCountry: [
        {
          country: 'Nigeria (NG)',
          flag: 'NG',
          roles: ngRoles.slice(0, 4),
        },
        {
          country: 'Global & North America',
          flag: 'GL',
          roles: globalRoles.slice(0, 4),
        },
      ],
      scamRadarNote: 'Scam warning: Telegram and WhatsApp recruiters requesting upfront training fees or BVN credentials are fraudulent. Real platforms hire through corporate domains.',
      markdownContent: '',
      htmlContent: '',
      created_at: new Date().toISOString(),
    };

    const siteUrl = getSiteUrl();
    draft.markdownContent = `# TraceBase Weekly Digest (Issue #${draft.issueNumber})\n\nWeek of ${draft.weekStarting}\n\n## 1. Verified Roles Fresh This Week\n` +
      draft.rolesByCountry.map(c => `### [${c.flag}] ${c.country}\n` + c.roles.map(r => `- **${r.title}** (${r.platform}) : ${r.payText}\n  ${siteUrl}/jobs/${r.slug}`).join('\n')).join('\n\n') +
      `\n\n## 2. Practical Guide of the Week\n**${draft.featuredGuide.title}**\n${draft.featuredGuide.summary}\n${siteUrl}/guides/${draft.featuredGuide.slug}\n\n## 3. Scam Radar\n${draft.scamRadarNote}\n\n---\nTraceBase : Human-Checked AI Work Hub : Unsubscribe anytime`;

    draft.htmlContent = `<!DOCTYPE html><html><body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
<h2>TraceBase Weekly Digest #${draft.issueNumber}</h2>
<p style="color: #666; font-size: 14px;">Week of ${draft.weekStarting}</p>
<hr style="border: 0; border-top: 1px solid #eee;" />
<h3>1. Verified Roles Fresh This Week</h3>
${draft.rolesByCountry.map(c => `<h4>[${c.flag}] ${c.country}</h4><ul>${c.roles.map(r => `<li><strong><a href="${siteUrl}/jobs/${r.slug}">${r.title}</a></strong> (${r.platform}) &bull; ${r.payText}</li>`).join('')}</ul>`).join('')}
<hr style="border: 0; border-top: 1px solid #eee;" />
<h3>2. Guide of the Week</h3>
<p><strong><a href="${siteUrl}/guides/${draft.featuredGuide.slug}">${draft.featuredGuide.title}</a></strong><br/>${draft.featuredGuide.summary}</p>
<hr style="border: 0; border-top: 1px solid #eee;" />
<h3>3. Scam Radar Advisory</h3>
<p style="font-size: 13px; color: #b45309; background: #fffbeb; padding: 12px; border-radius: 8px;">${draft.scamRadarNote}</p>
<p style="font-size: 11px; color: #888; text-align: center; margin-top: 30px;">TraceBase &bull; Human-Checked AI Work Hub<br/><a href="${siteUrl}/newsletter/unsubscribe">Unsubscribe</a> anytime in one click. Protected under NDPA 2023.</p>
</body></html>`;

    return draft;
  },

  // =========================================================================
  // Milestone 11: Phase 1 Feature Methods
  // =========================================================================

  // User Accounts & Magic Link Auth (Section 7.13 & 12)
  requestMagicLink(email: string): { token: string; email: string } {
    const cleanEmail = email.toLowerCase().trim();
    // Invalidate any existing unused tokens for this email
    globalStore.magicLinks = globalStore.magicLinks.filter(
      (m) => m.email !== cleanEmail
    );
    const token = `magic_${createHash('sha256').update(`${cleanEmail}-${Date.now()}-${Math.random()}`).digest('hex').substring(0, 32)}`;
    const link: MagicLinkToken = {
      token,
      email: cleanEmail,
      expires_at: new Date(Date.now() + 15 * 60000).toISOString(), // 15 mins validity
      created_at: new Date().toISOString(),
    };
    globalStore.magicLinks.push(link);
    return { token, email: cleanEmail };
  },

  verifyMagicLink(token: string): { user: User; sessionToken: string } | null {
    const entry = globalStore.magicLinks.find((m) => m.token === token);
    if (!entry) return null;
    if (new Date(entry.expires_at).getTime() < Date.now()) {
      globalStore.magicLinks = globalStore.magicLinks.filter((m) => m.token !== token);
      return null;
    }

    // Burn token
    globalStore.magicLinks = globalStore.magicLinks.filter((m) => m.token !== token);

    // Find or create user
    let user = globalStore.users.find((u) => u.email.toLowerCase() === entry.email);
    if (!user) {
      user = {
        id: `usr-${createHash('sha256').update(entry.email).digest('hex').substring(0, 16)}`,
        email: entry.email,
        country_code: 'NG', // default suggestion
        interests: [],
        consent_marketing: false,
        consent_at: null,
        created_at: new Date().toISOString(),
      };
      globalStore.users.push(user);
      this.logAudit({
        actor: user.id,
        action: 'user.signup_magic_link',
        entity: 'users',
        entity_id: user.id,
        diff: { email: user.email },
      });
    }

    const sessionToken = `sess_${createHash('sha256').update(`${user.id}-${Date.now()}-${Math.random()}`).digest('hex')}`;
    globalStore.sessions.push({
      token: sessionToken,
      userId: user.id,
      email: user.email,
      expiresAt: new Date(Date.now() + 30 * 86400000).toISOString(),
    });

    return { user, sessionToken };
  },

  getSessionUser(sessionToken: string): User | null {
    if (!sessionToken) return null;
    const session = globalStore.sessions.find(
      (s) =>
        s.token === sessionToken ||
        s.userId === sessionToken ||
        s.email === sessionToken
    );
    if (!session) {
      // Also allow direct user ID lookup if simulated
      const userDirect = globalStore.users.find((u) => u.id === sessionToken);
      if (userDirect) return userDirect;
      return null;
    }
    return globalStore.users.find((u) => u.id === session.userId) || null;
  },

  getUser(userId: string): User | null {
    return globalStore.users.find((u) => u.id === userId) || null;
  },

  getUserByEmail(email: string): User | null {
    return globalStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim()) || null;
  },

  updateUser(
    userId: string,
    data: Partial<Pick<User, 'country_code' | 'interests' | 'consent_marketing'>>
  ): User | null {
    const idx = globalStore.users.findIndex((u) => u.id === userId);
    if (idx === -1) return null;
    const prev = globalStore.users[idx];
    const updated: User = {
      ...prev,
      ...data,
      consent_at:
        data.consent_marketing !== undefined && data.consent_marketing !== prev.consent_marketing
          ? new Date().toISOString()
          : prev.consent_at,
    };
    globalStore.users[idx] = updated;

    this.logAudit({
      actor: userId,
      action: 'user.update_profile',
      entity: 'users',
      entity_id: userId,
      diff: data,
    });

    return updated;
  },

  // One-click Account & Personal Data Deletion under NDPA 2023 (Section 7.13 & 17)
  deleteUserAndData(userId: string): { success: boolean; deletedCount: number } {
    const userIdx = globalStore.users.findIndex((u) => u.id === userId);
    if (userIdx === -1) return { success: false, deletedCount: 0 };
    const user = globalStore.users[userIdx];
    const userEmail = user.email.toLowerCase();

    // 1. Delete user
    globalStore.users.splice(userIdx, 1);

    // 2. Delete saved jobs
    const savedBefore = globalStore.savedJobs.length;
    globalStore.savedJobs = globalStore.savedJobs.filter((s) => s.user_id !== userId);
    const savedDeleted = savedBefore - globalStore.savedJobs.length;

    // 3. Delete active alert subscriptions and newsletter subscriptions for this email
    const subsBefore = globalStore.subscriptions.length;
    globalStore.subscriptions = globalStore.subscriptions.filter(
      (s) => s.user_id !== userId && s.email.toLowerCase() !== userEmail
    );
    const subsDeleted = subsBefore - globalStore.subscriptions.length;

    // 4. Terminate active sessions and magic links, and clear user applications, test scores, CVs, and payouts
    globalStore.sessions = globalStore.sessions.filter((s) => s.userId !== userId);
    globalStore.magicLinks = globalStore.magicLinks.filter((m) => m.email !== userEmail);
    globalStore.applications = globalStore.applications.filter((a) => a.user_id !== userId);
    globalStore.testScores = globalStore.testScores.filter((t) => t.user_id !== userId);
    globalStore.userCvs = globalStore.userCvs.filter((c) => c.user_id !== userId);
    globalStore.userPayouts = globalStore.userPayouts.filter((p) => p.user_id !== userId);

    // 5. Append NDPA consent withdrawal log
    const emailHash = createHash('sha256').update(userEmail).digest('hex');
    globalStore.consentLogs.push({
      id: globalStore.consentLogs.length + 1,
      email_hash: emailHash,
      purpose: 'account',
      policy_version: '2026-v1',
      given: false,
      at: new Date().toISOString(),
    });

    // 6. Log audit entry
    this.logAudit({
      actor: userId,
      action: 'user.delete_account_and_data',
      entity: 'users',
      entity_id: userId,
      diff: {
        email_hash: emailHash,
        purged_saved_jobs: savedDeleted,
        purged_subscriptions: subsDeleted,
      },
    });

    return { success: true, deletedCount: 1 + savedDeleted + subsDeleted };
  },

  // Saved Jobs
  getSavedJobs(userId: string): JobWithPlatform[] {
    const userSaved = globalStore.savedJobs.filter((s) => s.user_id === userId);
    const jobIds = new Set(userSaved.map((s) => s.job_id));
    return this.getJobs().filter((j) => jobIds.has(j.id));
  },

  isJobSaved(userId: string, jobId: string): boolean {
    return globalStore.savedJobs.some((s) => s.user_id === userId && s.job_id === jobId);
  },

  toggleSavedJob(userId: string, jobId: string): { saved: boolean } {
    const idx = globalStore.savedJobs.findIndex(
      (s) => s.user_id === userId && s.job_id === jobId
    );
    if (idx !== -1) {
      globalStore.savedJobs.splice(idx, 1);
      return { saved: false };
    } else {
      globalStore.savedJobs.push({
        user_id: userId,
        job_id: jobId,
        created_at: new Date().toISOString(),
      });
      return { saved: true };
    }
  },

  // User Alert Preferences (Section 7.13)
  getUserAlertPreferences(userId: string): AlertSubscription | null {
    const user = this.getUser(userId);
    if (!user) return null;
    return (
      globalStore.subscriptions.find(
        (s) => s.user_id === userId || s.email.toLowerCase() === user.email.toLowerCase()
      ) || null
    );
  },

  saveUserAlertPreferences(
    userId: string,
    email: string,
    country_code: string | null,
    work_types: string[],
    frequency: string,
    categories?: string[]
  ): AlertSubscription {
    const cleanEmail = email.toLowerCase().trim();
    let sub = globalStore.subscriptions.find(
      (s) => s.user_id === userId || s.email.toLowerCase() === cleanEmail
    );

    if (sub) {
      sub.user_id = userId;
      sub.country_code = country_code;
      sub.work_types = work_types;
      sub.frequency = frequency;
      if (categories) sub.categories = categories;
      sub.status = 'active';
    } else {
      sub = {
        id: `sub-${Date.now()}`,
        email: cleanEmail,
        user_id: userId,
        country_code: country_code,
        work_types: work_types,
        frequency: frequency,
        categories: categories || ['opportunities', 'newsletter', 'scam_alerts'],
        status: 'active',
        confirmed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      globalStore.subscriptions.push(sub);
    }

    return sub;
  },

  // Community Experience Reports (Section 13.5)
  submitCommunityReport(data: {
    platform_id: string;
    period_month_year: string;
    onboarding_paid: boolean;
    tasks_available: TaskAvailability;
    removed_without_explanation: boolean;
    optional_note?: string | null;
    contact_email?: string | null;
  }): CommunityExperienceReport {
    const report: CommunityExperienceReport = {
      id: `cr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      platform_id: data.platform_id,
      period_month_year: data.period_month_year.trim(),
      onboarding_paid: Boolean(data.onboarding_paid),
      tasks_available: data.tasks_available,
      removed_without_explanation: Boolean(data.removed_without_explanation),
      optional_note: data.optional_note ? data.optional_note.trim() : null,
      contact_email: data.contact_email ? data.contact_email.trim() : null,
      status: 'pending',
      moderation_notes: null,
      created_at: new Date().toISOString(),
    };

    globalStore.communityReports.unshift(report);

    this.logAudit({
      actor: null,
      action: 'report.community_experience_submit',
      entity: 'community_reports',
      entity_id: report.id,
      diff: { platform_id: report.platform_id, status: 'pending' },
    });

    return report;
  },

  getCommunityReports(platformId?: string, status?: ReportStatus): CommunityExperienceReport[] {
    let result = globalStore.communityReports;
    if (platformId) {
      result = result.filter((r) => r.platform_id === platformId);
    }
    if (status) {
      result = result.filter((r) => r.status === status);
    }
    return [...result];
  },

  getPendingCommunityReports(): CommunityExperienceReport[] {
    return this.getCommunityReports(undefined, 'pending');
  },

  moderateCommunityReport(id: string, status: ReportStatus, moderation_notes?: string): boolean {
    const report = globalStore.communityReports.find((r) => r.id === id);
    if (!report) return false;
    report.status = status;
    report.moderation_notes = moderation_notes || null;

    this.logAudit({
      actor: 'ebube@tracebase.ai',
      action: `report.community_experience_${status}`,
      entity: 'community_reports',
      entity_id: id,
      diff: { status, moderation_notes },
    });

    return true;
  },

  getAggregatedPlatformExperience(platformId: string): AggregatedPlatformExperience {
    const approved = globalStore.communityReports.filter(
      (r) => r.platform_id === platformId && r.status === 'approved'
    );

    const sampleSize = approved.length;
    // Section 13.5 Rule: Minimum 3 reports required to display aggregated metrics
    const hasSufficientReports = sampleSize >= 3;

    if (!hasSufficientReports) {
      return {
        platform_id: platformId,
        sample_size: sampleSize,
        has_sufficient_reports: false,
        onboarding_paid_percent: 0,
        tasks_regular_percent: 0,
        tasks_intermittent_percent: 0,
        tasks_empty_queue_percent: 0,
        removed_without_explanation_percent: 0,
        onboarding_paid_count: 0,
        tasks_regular_count: 0,
        tasks_intermittent_count: 0,
        tasks_empty_queue_count: 0,
        removed_without_explanation_count: 0,
        earliest_period: approved[approved.length - 1]?.period_month_year || null,
        latest_period: approved[0]?.period_month_year || null,
      };
    }

    const onboardingPaidCount = approved.filter((r) => r.onboarding_paid).length;
    const tasksRegularCount = approved.filter((r) => r.tasks_available === 'regular').length;
    const tasksIntermittentCount = approved.filter((r) => r.tasks_available === 'intermittent').length;
    const tasksEmptyQueueCount = approved.filter((r) => r.tasks_available === 'empty_queue').length;
    const removedCount = approved.filter((r) => r.removed_without_explanation).length;

    return {
      platform_id: platformId,
      sample_size: sampleSize,
      has_sufficient_reports: true,
      onboarding_paid_percent: Math.round((onboardingPaidCount / sampleSize) * 100),
      tasks_regular_percent: Math.round((tasksRegularCount / sampleSize) * 100),
      tasks_intermittent_percent: Math.round((tasksIntermittentCount / sampleSize) * 100),
      tasks_empty_queue_percent: Math.round((tasksEmptyQueueCount / sampleSize) * 100),
      removed_without_explanation_percent: Math.round((removedCount / sampleSize) * 100),
      onboarding_paid_count: onboardingPaidCount,
      tasks_regular_count: tasksRegularCount,
      tasks_intermittent_count: tasksIntermittentCount,
      tasks_empty_queue_count: tasksEmptyQueueCount,
      removed_without_explanation_count: removedCount,
      earliest_period: approved[approved.length - 1]?.period_month_year || null,
      latest_period: approved[0]?.period_month_year || null,
    };
  },

  // Evaluator Talent Network Form (Milestone 11 & Section 7.9)
  submitEvaluatorLead(data: {
    name: string;
    email: string;
    country_code: string;
    domain: string;
    credentials: string;
    years_experience: string;
    portfolio_url?: string | null;
    weekly_hours: string;
  }): EvaluatorLead {
    const lead: EvaluatorLead = {
      id: `ev-talent-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      country_code: data.country_code.toUpperCase().trim(),
      domain: data.domain.trim(),
      credentials: data.credentials.trim(),
      years_experience: data.years_experience.trim(),
      portfolio_url: data.portfolio_url ? data.portfolio_url.trim() : null,
      weekly_hours: data.weekly_hours.trim(),
      status: 'new',
      created_at: new Date().toISOString(),
    };

    globalStore.evaluatorLeads.unshift(lead);

    this.logAudit({
      actor: null,
      action: 'evaluator.application_submit',
      entity: 'evaluator_leads',
      entity_id: lead.id,
      diff: { domain: lead.domain, country: lead.country_code },
    });

    return lead;
  },

  getEvaluatorLeads(): EvaluatorLead[] {
    return [...globalStore.evaluatorLeads];
  },

  // Platform x Country Detailed Eligibility (Section 7.5a)
  getPlatformCountryEligibility(
    platformSlug: string,
    countryCode: string
  ): PlatformCountryEligibilityResult | null {
    const platform = this.getPlatformBySlug(platformSlug);
    const country = this.getCountryByCode(countryCode);

    if (!platform || !country) {
      return null;
    }

    const platformJobs = this.getJobs({ status: 'all' }).filter(
      (j) => j.platform_id === platform.id
    );

    let eligStatus: EligStatus = 'unconfirmed';
    let checkedAt = platform.last_reviewed_at || new Date().toISOString();
    let sourceUrl: string | null = platform.official_url;

    for (const job of platformJobs) {
      const match = job.eligibility.find((e) => e.country_code === country.code);
      if (match) {
        eligStatus = match.status;
        checkedAt = match.checked_at;
        sourceUrl = match.source_url || sourceUrl;
        if (eligStatus === 'accepted') break;
      }
    }

    // Explicit official platform statuses for Nigeria
    if (country.code === 'NG') {
      if (platform.slug === 'outlier') {
        eligStatus = 'accepted';
        sourceUrl = 'https://outlier.ai/faq';
      } else if (platform.slug === 'alignerr') {
        eligStatus = 'accepted';
        sourceUrl = 'https://alignerr.com/faq';
      } else if (platform.slug === 'invisible-tech') {
        eligStatus = 'accepted';
        sourceUrl = 'https://invisible.co/careers';
      } else if (platform.slug === 'mercor') {
        eligStatus = 'accepted';
        sourceUrl = 'https://mercor.com/faq';
      } else if (platform.slug === 'dataannotation') {
        eligStatus = 'not_accepted';
        sourceUrl = 'https://dataannotation.tech';
      }
    }

    // Open verified roles for this platform and country
    const openRoles = this.getJobs({ status: 'verified', country: country.code }).filter(
      (j) => j.platform_id === platform.id
    );

    // Alternative platforms that DO accept this country (to avoid dead-end pages!)
    const allPlatforms = this.getPlatforms();
    const alternativePlatforms = allPlatforms
      .filter((p) => p.id !== platform.id)
      .map((p) => {
        const roles = this.getJobs({ status: 'verified', country: country.code }).filter(
          (j) => j.platform_id === p.id
        );
        return {
          platform: p,
          openRolesCount: roles.length,
        };
      })
      .filter((item) => item.openRolesCount > 0);

    const steps = this.getPlatformSteps(platform.id);

    return {
      platform,
      country,
      eligibilityStatus: eligStatus,
      checkedAt,
      sourceUrl,
      openRoles,
      alternativePlatforms,
      steps,
    };
  },

  // User Applications Tracker
  getUserApplications(userId: string): UserApplication[] {
    const list = globalStore.applications.filter((a) => a.user_id === userId);
    if (list.length === 0) {
      const cloned = INITIAL_USER_APPLICATIONS.map((app) => ({
        ...app,
        id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId,
      }));
      globalStore.applications.push(...cloned);
      return cloned;
    }
    return [...list];
  },

  addUserApplication(data: Omit<UserApplication, 'id' | 'applied_at' | 'last_updated_at'>): UserApplication {
    const app: UserApplication = {
      ...data,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      applied_at: new Date().toISOString(),
      last_updated_at: new Date().toISOString(),
    };
    globalStore.applications.unshift(app);
    return app;
  },

  updateUserApplicationStatus(applicationId: string, status: ApplicationStatus, notes?: string): boolean {
    const app = globalStore.applications.find((a) => a.id === applicationId);
    if (!app) return false;
    app.status = status;
    app.last_updated_at = new Date().toISOString();
    if (notes !== undefined) {
      app.notes = notes;
    }
    return true;
  },

  deleteUserApplication(applicationId: string): boolean {
    const initialLen = globalStore.applications.length;
    globalStore.applications = globalStore.applications.filter((a) => a.id !== applicationId);
    return globalStore.applications.length < initialLen;
  },

  // User Test Scores & Drills
  getUserTestScores(userId: string): UserTestScore[] {
    const list = globalStore.testScores.filter((t) => t.user_id === userId);
    if (list.length === 0) {
      const cloned = INITIAL_USER_TEST_SCORES.map((score) => ({
        ...score,
        id: `score-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId,
      }));
      globalStore.testScores.push(...cloned);
      return cloned;
    }
    return [...list];
  },

  recordUserTestScore(data: Omit<UserTestScore, 'id' | 'completed_at'>): UserTestScore {
    const scoreItem: UserTestScore = {
      ...data,
      id: `score-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      completed_at: new Date().toISOString(),
    };
    globalStore.testScores.unshift(scoreItem);
    return scoreItem;
  },

  // User CVs
  getUserCvs(userId: string): UserCv[] {
    const list = globalStore.userCvs.filter((c) => c.user_id === userId);
    if (list.length === 0) {
      const cloned = INITIAL_USER_CVS.map((cv) => ({
        ...cv,
        id: `cv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId,
      }));
      globalStore.userCvs.push(...cloned);
      return cloned;
    }
    return [...list];
  },

  addUserCv(data: Omit<UserCv, 'id' | 'created_at' | 'last_updated_at'>): UserCv {
    const cvItem: UserCv = {
      ...data,
      id: `cv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      last_updated_at: new Date().toISOString(),
    };
    globalStore.userCvs.unshift(cvItem);
    return cvItem;
  },

  // User Payout Logs
  getUserPayouts(userId: string): UserPayoutLog[] {
    const list = globalStore.userPayouts.filter((p) => p.user_id === userId);
    if (list.length === 0) {
      const cloned = INITIAL_USER_PAYOUTS.map((p) => ({
        ...p,
        id: `pay-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        user_id: userId,
      }));
      globalStore.userPayouts.push(...cloned);
      return cloned;
    }
    return [...list];
  },
};

