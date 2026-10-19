-- ============================================================================
-- TraceBase Master Seed Data (SAMPLE DATA ONLY)
-- Section 12 & 13 of Master Plan v5
-- All sample records are explicitly labeled SAMPLE
-- ============================================================================

-- 1. ISO-3166 Common Countries
insert into countries (code, name, notes) values
  ('US', 'United States', 'Primary hub for direct W2 and US-contractor evaluation tiers'),
  ('NG', 'Nigeria', 'Active market for English, Pidgin, and local language RLHF/SFT'),
  ('KE', 'Kenya', 'East African hub for content moderation, translation, and technical annotation'),
  ('GH', 'Ghana', 'West African hub for multilingual data collection and reasoning evaluations'),
  ('GB', 'United Kingdom', 'European hub for STEM, legal, and creative evaluation'),
  ('CA', 'Canada', 'North American regional evaluation hub with bilingual EN/FR support'),
  ('IN', 'India', 'Large contributor base for coding, STEM, and multimodal annotation'),
  ('PH', 'Philippines', 'Hub for prompt engineering, general annotation, and customer agent fine-tuning'),
  ('ZA', 'South Africa', 'Multilingual evaluation hub with high-speed remote banking rails'),
  ('DE', 'Germany', 'High-demand hub for German native reasoning, STEM, and technical evaluation')
on conflict (code) do nothing;

-- 2. Platforms (Outlier, Alignerr, DataAnnotation, Mercor)
insert into platforms (id, slug, name, official_url, description, who_it_suits, payout_methods, assessment_style, referral, referral_terms_url, last_reviewed_at)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'outlier',
    'Outlier AI [SAMPLE]',
    'https://outlier.ai',
    'Scale AI subsidiary platform offering task-based RLHF, coding, and multilingual AI model training.',
    'Domain experts, programmers, and linguists with strong technical writing and evaluation capabilities.',
    'PayPal, AirTM',
    'Automated multiple-choice subject tests followed by unpaid benchmark evaluation training tasks.',
    'public',
    'https://outlier.ai/referrals',
    now() - interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'alignerr',
    'Alignerr [SAMPLE]',
    'https://alignerr.com',
    'Labelbox community network matching vetted subject experts to frontier AI alignment tasks.',
    'Subject matter specialists in law, medicine, chemistry, and software engineering.',
    'Deel',
    'TestGorilla proctored assessments covering logic, writing, and domain expertise.',
    'invitation_only',
    null,
    now() - interval '5 days'
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'dataannotation',
    'DataAnnotation Tech [SAMPLE]',
    'https://dataannotation.tech',
    'Freelance platform evaluating LLM responses, chatbot persona adherence, and coding benchmarks.',
    'Self-directed contractors who excel at nuanced instruction-following and creative adversarial probing.',
    'PayPal',
    'Unpaid initial qualification test taking 45 to 60 minutes with open-ended creative evaluation.',
    'not_found',
    null,
    now() - interval '8 days'
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'mercor',
    'Mercor [SAMPLE]',
    'https://mercor.com',
    'AI-powered talent platform matching software engineers and researchers to foundation model labs.',
    'Senior engineers, AI researchers, and specialized technical evaluators seeking hourly contract work.',
    'Stripe Express, Wise',
    'AI video interview with real-time coding review and GitHub portfolio analysis.',
    'not_found',
    null,
    now() - interval '12 days'
  )
on conflict (id) do nothing;

-- 3. Platform Onboarding Steps (5-Step Expectation Timeline per Platform)
-- Outlier Steps
insert into platform_steps (platform_id, position, title, detail, label, source_url) values
  ('00000000-0000-0000-0000-000000000001', 1, 'Profile & Resume Submission', 'Submit CV and declare expertise domains, verified spoken languages, and degree background.', 'official', 'https://outlier.ai/faq'),
  ('00000000-0000-0000-0000-000000000001', 2, 'Government ID Verification', 'Persona biometric verification requiring government-issued photo ID and live webcam selfie.', 'official', 'https://outlier.ai/faq'),
  ('00000000-0000-0000-0000-000000000001', 3, 'Domain Qualification Exam', '30-45 minute timed assessment on domain reasoning and evaluation methodology.', 'reported', 'https://reddit.com/r/outlierai'),
  ('00000000-0000-0000-0000-000000000001', 4, 'Unpaid Benchmark Training Task', 'Interactive practice task in platform workspace evaluated against hidden gold-standard rubric.', 'reported', 'https://reddit.com/r/outlierai'),
  ('00000000-0000-0000-0000-000000000001', 5, 'Production Task Allocation', 'First paid task assigned to user queue upon passing benchmark accuracy threshold.', 'reported', 'https://outlier.ai/faq')
on conflict (platform_id, position) do nothing;

-- Alignerr Steps
insert into platform_steps (platform_id, position, title, detail, label, source_url) values
  ('00000000-0000-0000-0000-000000000002', 1, 'Application & Role Selection', 'Sign up via Google/LinkedIn and pick evaluation specialties (e.g., Code, Generalist, Physics).', 'official', 'https://alignerr.com'),
  ('00000000-0000-0000-0000-000000000002', 2, 'Identity Verification via Deel', 'Deel contractor identity verification, tax document submission, and payment routing.', 'official', 'https://alignerr.com'),
  ('00000000-0000-0000-0000-000000000002', 3, 'TestGorilla Screening Test', 'Proctored 40-minute domain test with camera monitoring. 80%+ passing score required.', 'official', 'https://alignerr.com'),
  ('00000000-0000-0000-0000-000000000002', 4, 'Slack Workspace & NDA Access', 'Invitation to Alignerr Slack community, project onboarding channel, and workspace tool training.', 'reported', 'https://reddit.com/r/alignerr'),
  ('00000000-0000-0000-0000-000000000002', 5, 'Paid Project Assignment', 'Task batch allocated when client projects matching your domain assessment score launch.', 'reported', 'https://alignerr.com')
on conflict (platform_id, position) do nothing;

-- DataAnnotation Steps
insert into platform_steps (platform_id, position, title, detail, label, source_url) values
  ('00000000-0000-0000-0000-000000000003', 1, 'Registration & Email Confirmation', 'Basic profile signup with PayPal email address and phone number verification.', 'official', 'https://dataannotation.tech'),
  ('00000000-0000-0000-0000-000000000003', 2, 'Starter Assessment', 'Open-ended 45-60 minute evaluation testing fact-checking, creative prompt writing, and nuance.', 'official', 'https://dataannotation.tech'),
  ('00000000-0000-0000-0000-000000000003', 3, 'Manual Quality Review', 'Internal review of submitted reasoning. Successful applicants receive platform access email in 3-7 days.', 'reported', 'https://reddit.com/r/dataannotation'),
  ('00000000-0000-0000-0000-000000000003', 4, 'Optional Qualification Quizzes', 'Subject-specific quizzes (Coding, Math, Safety) unlock additional projects at higher hourly rates.', 'official', 'https://dataannotation.tech'),
  ('00000000-0000-0000-0000-000000000003', 5, 'Active Project Dashboard', 'Self-paced tasks appear on dashboard; log time directly per project batch.', 'official', 'https://dataannotation.tech')
on conflict (platform_id, position) do nothing;

-- Mercor Steps
insert into platform_steps (platform_id, position, title, detail, label, source_url) values
  ('00000000-0000-0000-0000-000000000004', 1, 'Profile & GitHub Synchronization', 'Connect GitHub, upload resume, and index open-source contributions.', 'official', 'https://mercor.com'),
  ('00000000-0000-0000-0000-000000000004', 2, 'AI Video Interview', '20-minute structured interactive interview covering past engineering projects and system architecture.', 'official', 'https://mercor.com'),
  ('00000000-0000-0000-0000-000000000004', 3, 'Algorithmic Profiling & Scoring', 'Mercor ranking engine indexes technical strengths and generates verified talent card.', 'official', 'https://mercor.com'),
  ('00000000-0000-0000-0000-000000000004', 4, 'Client Shortlist Interview', 'Direct 30-minute technical conversation with hiring team at foundation model customer.', 'reported', 'https://news.ycombinator.com'),
  ('00000000-0000-0000-0000-000000000004', 5, 'Contract Signature & Deel/Stripe Setup', 'Execute master services agreement and begin direct hourly engineering or evaluation sprint.', 'official', 'https://mercor.com')
on conflict (platform_id, position) do nothing;

-- 4. Jobs (Human-Verified Roles, All Marked [SAMPLE])
insert into jobs (
  id, slug, platform_id, title, work_type, domains, languages, degree_levels,
  summary, requirements, pay_text, pay_verified, pay_source_url, official_url, apply_url,
  link, status, last_checked_at, next_check_at, closed_at
) values
  (
    '10000000-0000-0000-0000-000000000001',
    'sample-outlier-rlhf-generalist',
    '00000000-0000-0000-0000-000000000001',
    'AI Model Reasoning & Fact-Checking Evaluator [SAMPLE]',
    'Evaluation & RLHF',
    array['General Reasoning', 'Fact Checking', 'Truthfulness'],
    array['English'],
    array['Associate', 'Bachelor''s', 'Master''s'],
    'Evaluate dual LLM generation pairs for groundedness, hallucination detection, and stylistic coherence against a strict grading matrix.',
    'Native or bilingual English fluency. Demonstrated ability to cite reliable primary sources and write unambiguous justification comments.',
    '$15 - $22 / hr',
    true,
    'https://outlier.ai/careers/sample-rlhf',
    'https://outlier.ai',
    'https://outlier.ai/apply/sample-rlhf-2026',
    'direct',
    'verified',
    now() - interval '3 days',
    now() + interval '11 days',
    null
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'sample-alignerr-code-evaluator',
    '00000000-0000-0000-0000-000000000002',
    'Python & TypeScript Benchmark Evaluator [SAMPLE]',
    'Coding & Benchmarking',
    array['Software Engineering', 'Python', 'TypeScript', 'Unit Testing'],
    array['English'],
    array['Bachelor''s', 'Master''s', 'PhD'],
    'Verify correctness of code generated by frontier reasoning models. Write unit tests to catch edge-case hallucinations and benchmark runtime efficiency.',
    '3+ years professional software development experience. High proficiency in Python and TypeScript test suites (pytest, vitest).',
    '$35 - $50 / hr',
    true,
    'https://alignerr.com/roles/code-sample',
    'https://alignerr.com',
    'https://alignerr.com/apply/code-eval-sample',
    'direct',
    'verified',
    now() - interval '6 days',
    now() + interval '8 days',
    null
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'sample-dataannotation-bilingual-specialist',
    '00000000-0000-0000-0000-000000000003',
    'Multilingual LLM Prompt & Response Evaluator [SAMPLE]',
    'Translation & Localization',
    array['Linguistics', 'Cultural Nuance', 'Translation'],
    array['English', 'Spanish', 'French'],
    array['Bachelor''s'],
    'Assess conversational AI output quality across English, French, and Spanish dialogue. Flag cultural inaccuracies and translation artifacts.',
    'Bilingual proficiency in English plus French or Spanish. Strong editorial background and high attention to grammar and idiom fidelity.',
    '$20 - $25 / hr',
    false,
    null,
    'https://dataannotation.tech',
    'https://dataannotation.tech/apply/bilingual-sample',
    'direct',
    'needs_recheck',
    now() - interval '18 days', -- Over 14 days, sweeper trigger sample
    now() - interval '4 days',
    null
  ),
  (
    '10000000-0000-0000-0000-000000000004',
    'sample-mercor-llm-researcher',
    '00000000-0000-0000-0000-000000000004',
    'Frontier AI Safety & Alignment Auditor [SAMPLE]',
    'Safety & Red Teaming',
    array['AI Safety', 'Red Teaming', 'Jailbreak Research'],
    array['English'],
    array['Master''s', 'PhD'],
    'Execute adversarial probing campaigns on multimodal models to identify vulnerability modes, jailbreaks, and prompt injection susceptibilities.',
    'Background in cybersecurity, LLM security research, or formal AI safety benchmarks.',
    '$60 - $110 / hr',
    true,
    'https://mercor.com/jobs/safety-sample',
    'https://mercor.com',
    'https://mercor.com/apply/safety-auditor-sample',
    'direct',
    'verified',
    now() - interval '1 day',
    now() + interval '13 days',
    null
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    'sample-outlier-closed-project',
    '00000000-0000-0000-0000-000000000001',
    'Legacy Creative Writing Prompt Annotator [SAMPLE]',
    'Creative Writing',
    array['Creative Writing', 'Persona Adherence'],
    array['English'],
    array['Associate', 'Bachelor''s'],
    'Evaluate creative storytelling and character continuity across multi-turn roleplay conversations.',
    'Creative writing portfolio or degree in English/Literature.',
    '$18 / hr',
    true,
    'https://outlier.ai/careers/sample-creative',
    'https://outlier.ai',
    'https://outlier.ai/apply/creative-legacy-sample',
    'direct',
    'closed',
    now() - interval '32 days',
    null,
    now() - interval '15 days'
  )
on conflict (id) do nothing;

-- 5. Job Eligibility Matrix (Countries)
-- Job 1 (Outlier Generalist): US (accepted), NG (accepted), KE (accepted), GH (accepted), GB (accepted), CA (accepted), IN (accepted), PH (accepted)
insert into job_eligibility (job_id, country_code, status, source_url, checked_at) values
  ('10000000-0000-0000-0000-000000000001', 'US', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'NG', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'KE', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'GH', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'GB', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'CA', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'IN', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'PH', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'ZA', 'accepted', 'https://outlier.ai/faq', now() - interval '3 days'),
  ('10000000-0000-0000-0000-000000000001', 'DE', 'unconfirmed', null, now() - interval '3 days')
on conflict (job_id, country_code) do nothing;

-- Job 2 (Alignerr Code): US (accepted), GB (accepted), CA (accepted), DE (accepted), IN (accepted), NG (unconfirmed), KE (unconfirmed)
insert into job_eligibility (job_id, country_code, status, source_url, checked_at) values
  ('10000000-0000-0000-0000-000000000002', 'US', 'accepted', 'https://alignerr.com/faq', now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'GB', 'accepted', 'https://alignerr.com/faq', now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'CA', 'accepted', 'https://alignerr.com/faq', now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'DE', 'accepted', 'https://alignerr.com/faq', now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'IN', 'accepted', 'https://alignerr.com/faq', now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'NG', 'unconfirmed', null, now() - interval '6 days'),
  ('10000000-0000-0000-0000-000000000002', 'KE', 'unconfirmed', null, now() - interval '6 days')
on conflict (job_id, country_code) do nothing;

-- Job 3 (DataAnnotation Bilingual): US (accepted), CA (accepted), GB (accepted), DE (accepted), NG (not_accepted), GH (not_accepted)
insert into job_eligibility (job_id, country_code, status, source_url, checked_at) values
  ('10000000-0000-0000-0000-000000000003', 'US', 'accepted', 'https://dataannotation.tech/faq', now() - interval '18 days'),
  ('10000000-0000-0000-0000-000000000003', 'CA', 'accepted', 'https://dataannotation.tech/faq', now() - interval '18 days'),
  ('10000000-0000-0000-0000-000000000003', 'GB', 'accepted', 'https://dataannotation.tech/faq', now() - interval '18 days'),
  ('10000000-0000-0000-0000-000000000003', 'DE', 'accepted', 'https://dataannotation.tech/faq', now() - interval '18 days'),
  ('10000000-0000-0000-0000-000000000003', 'NG', 'not_accepted', 'https://dataannotation.tech/faq', now() - interval '18 days'),
  ('10000000-0000-0000-0000-000000000003', 'GH', 'not_accepted', 'https://dataannotation.tech/faq', now() - interval '18 days')
on conflict (job_id, country_code) do nothing;

-- 6. Check Log (Audit of Human Verification Checks)
insert into check_log (job_id, platform_id, result, note, checked_by, checked_at) values
  (
    '10000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000001',
    'verified',
    'SAMPLE human check: verified application form is active and accepting candidate applications. Pay confirmed at $15-$22.',
    null,
    now() - interval '3 days'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000002',
    'verified',
    'SAMPLE human check: confirmed TestGorilla pipeline is live for Python benchmark roles.',
    null,
    now() - interval '6 days'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000003',
    'needs_recheck',
    'SAMPLE automated sweeper: 14 days elapsed since last human verification check.',
    null,
    now() - interval '4 days'
  ),
  (
    '10000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000001',
    'closed',
    'SAMPLE human check: application link returned 404 and listing removed from career portal.',
    null,
    now() - interval '15 days'
  );

-- 7. Guides (Editorial Work Hub Knowledge Base)
insert into guides (id, slug, title, summary, tags, reading_time_mins, published_at, updated_at) values
  (
    '20000000-0000-0000-0000-000000000001',
    'rlhf-assessment-mastery-guide',
    'Mastering Frontier RLHF Assessments: Rubrics, Factuality, and Reasoning [SAMPLE]',
    'A breakdown of how leading evaluation platforms score justification comments and penalize hallucination misses.',
    array['RLHF', 'Assessments', 'Rubrics'],
    8,
    now() - interval '14 days',
    now() - interval '14 days'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    'cross-border-payout-guide',
    'Cross-Border Payout Options: AirTM, Deel, PayPal, and Wise Compared [SAMPLE]',
    'Fee breakdowns, withdrawal limits, and currency conversion realities for global AI contract workers.',
    array['Payouts', 'Banking', 'AirTM', 'Deel'],
    6,
    now() - interval '20 days',
    now() - interval '5 days'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    'spotting-ai-work-scams',
    'Identifying AI Data Work Scams: 5 Red Flags That Protect Your Identity [SAMPLE]',
    'How to spot fake Telegram recruiters, fee-demanding onboarding portals, and spoofed testing sites.',
    array['Safety', 'Scam Prevention', 'Security'],
    5,
    now() - interval '30 days',
    now() - interval '10 days'
  )
on conflict (id) do nothing;

-- 8. Sample Evaluation Leads (B2B Evaluation Studio)
insert into eval_leads (
  id, reference_id, name, work_email, company, product_url, service, volume,
  source_type, timeline, has_rubric, sensitivity, message, status, idempotency_key
) values
  (
    '30000000-0000-0000-0000-000000000001',
    'CS-EV-2026-0001',
    'Elena Rostova [SAMPLE]',
    'elena@synthetica-models.example',
    'Synthetica Labs [SAMPLE]',
    'https://synthetica-models.example',
    'rag_citation_audit',
    '250-500 pairs',
    'private repo docs',
    'Within 2 weeks',
    true,
    'custom compliance',
    'We require independent human verification on 400 financial query citations from our RAG pipeline.',
    'new',
    'sample-idempotency-key-001'
  )
on conflict (id) do nothing;

-- 9. Sample Audit Log
insert into audit_log (actor, action, entity, entity_id, diff, at) values
  (
    null,
    'job.create',
    'jobs',
    '10000000-0000-0000-0000-000000000001',
    '{"title": "AI Model Reasoning & Fact-Checking Evaluator [SAMPLE]", "status": "verified"}'::jsonb,
    now() - interval '3 days'
  ),
  (
    null,
    'sweeper.run',
    'jobs',
    '10000000-0000-0000-0000-000000000003',
    '{"from_status": "verified", "to_status": "needs_recheck", "reason": "14 days elapsed"}'::jsonb,
    now() - interval '4 days'
  );

-- 10. Sample Privacy Request & Incident Log
insert into privacy_requests (id, kind, contact_email, received_at, due_at, closed_at, note) values
  (
    '40000000-0000-0000-0000-000000000001',
    'access',
    'contributor-test@example.com',
    now() - interval '2 days',
    now() + interval '28 days',
    null,
    'SAMPLE SAR: Request for copy of alert subscription preferences'
  )
on conflict (id) do nothing;
