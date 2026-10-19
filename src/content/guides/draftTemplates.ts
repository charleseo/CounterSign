import { Guide } from './types';

// 1. "Is [platform] legit? What we found" (Priority 1: US, UK, Canada)
export const draftGuideIsOutlierLegit: Guide = {
  slug: 'is-outlier-ai-legit-what-we-found',
  title: 'Is Outlier.ai Legit? What We Found',
  subtitle:
    'An independent verification of Outlier.ai corporate ownership, contractor pay reliability, screening tests, and sudden task queue droughts.',
  readingTime: '7 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'Ebubechukwu Okeke',
  published: false, // Draft, not published
  author: {
    name: 'Ebubechukwu Okeke',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['Platform Audit', 'Outlier', 'Contractor Verification', 'US', 'UK', 'Canada'],
  summaryPoints: [
    'Outlier.ai is a genuine operating division of Scale AI, providing real contractor payments for AI evaluation.',
    'Screening tests are automated and uncompensated; candidates must pass strict rubric adherence tests before task assignment.',
    'Work volume is highly unpredictable: evaluators frequently experience sudden empty queues ("EQ") without explanation.',
    'Legitimate registration occurs solely through outlier.ai or scale.com; any recruiter reaching out on WhatsApp or Telegram is an impersonator.',
  ],
  sections: [
    {
      id: 'corporate-identity',
      heading: 'Corporate identity and legitimate applicant portals',
      content: `[Placeholder: Verification details on Scale AI corporate registration, Delaware filings, and confirmed ATS applicant tracking domains (Ashby / Greenhouse).]`,
      callout: {
        type: 'info',
        title: 'Editorial Fact',
        text: 'Outlier never charges candidates for account setup, background checks, or onboarding modules.',
      },
    },
    {
      id: 'pay-and-taxation',
      heading: 'Pay rates, payment schedules, and contractor taxation',
      content: `[Placeholder: Stated hourly rates ($15 to $50/hr depending on domain specialization), weekly payout cadence via PayPal/AirTM, and tax reporting requirements (W-9 / 1099-NEC in the US, T4A in Canada, HMRC self-employment in the UK).]`,
    },
    {
      id: 'queue-volatility',
      heading: 'The empty queue reality: what reviewers complain about most',
      content: `[Placeholder: Analysis of contributor feedback regarding sudden task pauses, model evaluation project transitions, and lack of human dispute resolution.]`,
      callout: {
        type: 'warning',
        title: 'Project Volatility Warning',
        text: 'Do not treat AI evaluation as steady full-time employment. Project demand fluctuates weekly based on client training cycles.',
      },
    },
    {
      id: 'editorial-verdict',
      heading: 'Editorial verdict: legitimate platform with volatile workflows',
      content: `[Placeholder: Summary verdict detailing who the platform suits best (flexible side income for domain specialists) and who should avoid it.]`,
    },
  ],
  sources: [
    {
      title: 'Outlier.ai Official Contributor Agreement',
      url: 'https://outlier.ai',
      label: 'official',
      notes: 'Reviewed October 2026 for contractor terms and dispute limitations.',
    },
    {
      title: 'Scale AI Delaware Business Entity Registry',
      url: 'https://scale.com',
      label: 'official',
      notes: 'Verified parent corporate status.',
    },
  ],
};

// 2. "[Platform] review: pay, tests and what the first month is really like" (Priority 1)
export const draftGuideAlignerrReview: Guide = {
  slug: 'alignerr-review-pay-tests-and-first-month-reality',
  title: 'Alignerr Review: Pay, Tests, and What the First Month is Really Like',
  subtitle:
    'Hands-on breakdown of Alignerr by Labelbox: assessment thresholds, real hourly earnings, onboarding delays, and task availability.',
  readingTime: '8 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'TraceBase Evaluation Desk',
  published: false, // Draft, not published
  author: {
    name: 'TraceBase Evaluation Desk',
    title: 'Research Team',
  },
  topicTags: ['Platform Review', 'Alignerr', 'Labelbox', 'Onboarding Experience'],
  summaryPoints: [
    'Alignerr is operated by Labelbox, focusing on high-tier subject matter experts in coding, STEM, and specialized writing.',
    'Assessments are rigorous and proctored; passing scores typically require 80% or higher.',
    'Many candidates pass initial assessments but wait weeks or months before a matching project queue opens.',
    'Payouts are routed through Deel with prompt disbursement once billable work begins.',
  ],
  sections: [
    {
      id: 'assessment-structure',
      heading: 'The assessment gauntlet: TestGorilla and coding challenges',
      content: `[Placeholder: Detailed review of test difficulty, rubric evaluation style, time limits, and retake policies.]`,
    },
    {
      id: 'pay-benchmarks',
      heading: 'Hourly pay benchmarks across generalist and technical tiers',
      content: `[Placeholder: Breakdown of verified pay ranges ($20/hr generalist to $60+/hr specialized engineering/law/medicine).]`,
    },
    {
      id: 'month-one-onboarding',
      heading: 'Month one: the lag between passing tests and receiving paid tasks',
      content: `[Placeholder: Contributor timeline data detailing the typical 2-6 week delay between test completion, Slack invitation, and first paid production task.]`,
    },
    {
      id: 'payout-mechanics',
      heading: 'Contractor onboarding and payment logistics via Deel',
      content: `[Placeholder: Walkthrough of Deel identity verification, tax form completion (W-8BEN / W-9), and global bank deposit speeds.]`,
    },
  ],
  sources: [
    {
      title: 'Labelbox Alignerr Contributor Portal',
      url: 'https://alignerr.com',
      label: 'official',
      notes: 'Official platform terms and stated hourly ranges.',
    },
  ],
};

// 3. "Taxes on AI contract work in the US / UK / Canada: the basics" (Priority 1)
export const draftGuideTaxesAIWork: Guide = {
  slug: 'taxes-on-ai-contract-work-us-uk-canada-basics',
  title: 'Taxes on AI Contract Work in the US, UK, and Canada: The Basics',
  subtitle:
    'How 1099-NEC, HMRC Self Assessment, and CRA T2125 self-employment rules apply to remote AI evaluators and model trainers.',
  readingTime: '9 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'TraceBase Editorial Desk',
  published: false, // Draft, not published
  author: {
    name: 'TraceBase Editorial Desk',
    title: 'Compliance & Research',
  },
  topicTags: ['Taxes', 'Independent Contractor', 'US', 'UK', 'Canada', '1099', 'Self Assessment'],
  summaryPoints: [
    'AI training work is classified as independent contractor (self-employment) income, not employee wages. Platforms do not withhold income tax.',
    'US evaluators must track quarterly estimated payments and report earnings via Form 1099-NEC and Schedule C (SECA tax applies).',
    'UK evaluators must register for HMRC Self Assessment and pay Class 2 and Class 4 National Insurance once earnings exceed the trading allowance.',
    'Canadian evaluators report income on Form T2125 and pay Canada Pension Plan (CPP) contributions on net self-employment earnings.',
    'Always speak with a certified tax professional or accountant regarding your specific circumstances.',
  ],
  sections: [
    {
      id: 'united-states-1099',
      heading: 'United States: 1099-NEC, Schedule C, and Self-Employment Tax',
      content: `[Placeholder: Practical explanation of independent contractor status, 15.3% SECA tax calculation, quarterly 1040-ES estimated payments, and allowable deductions for home office and equipment.]`,
    },
    {
      id: 'united-kingdom-hmrc',
      heading: 'United Kingdom: HMRC Self Assessment and National Insurance',
      content: `[Placeholder: Guide to the £1,000 trading allowance, registering as a sole trader, Class 2/4 NICs, and student loan repayment deductions.]`,
    },
    {
      id: 'canada-cra',
      heading: 'Canada: CRA T2125 Statement of Business Activities',
      content: `[Placeholder: Canadian tax return reporting, GST/HST registration rules once exceeding $30,000 threshold, and CPP self-employed contributions.]`,
    },
    {
      id: 'record-keeping-tips',
      heading: 'Essential record-keeping habits for remote AI evaluators',
      content: `[Placeholder: Recommendations on separating bank accounts, saving 25-30% of each gross payout, and archiving monthly invoice records from Deel, Tipalti, and PayPal.]`,
      callout: {
        type: 'warning',
        title: 'Tax Advisory Disclaimer',
        text: 'This guide provides general educational information only. Tax rules and personal thresholds vary. Always speak to a qualified tax professional or certified accountant.',
      },
    },
  ],
  sources: [
    {
      title: 'IRS Independent Contractor (Self-Employed) Guidelines',
      url: 'https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-defined',
      label: 'official',
      notes: 'Primary US tax source.',
    },
    {
      title: 'HMRC Working for Yourself & Self Assessment',
      url: 'https://www.gov.uk/working-for-yourself',
      label: 'official',
      notes: 'Primary UK tax source.',
    },
    {
      title: 'Canada Revenue Agency (CRA) Self-employed Income Guide',
      url: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/small-businesses-sole-proprietorships-partnerships.html',
      label: 'official',
      notes: 'Primary Canada tax source.',
    },
  ],
};

// 4. "AI training job scams: how to spot them" (Priority 1 + Global)
export const draftGuideJobScamsSpotter: Guide = {
  slug: 'ai-training-job-scams-how-to-spot-them',
  title: 'AI Training Job Scams: How to Spot Them (US, UK, Canada, and Global)',
  subtitle:
    'A tactical breakdown of fake check deposits, bogus equipment fees, and Telegram recruiter schemes targeting remote workers.',
  readingTime: '7 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'TraceBase Scam Radar',
  published: false, // Draft, not published
  author: {
    name: 'TraceBase Scam Radar',
    title: 'Threat Intelligence',
  },
  topicTags: ['Scam Prevention', 'Security', 'Check Scams', 'Telegram Scams', 'Advance Fee Fraud'],
  summaryPoints: [
    'Counterfeit equipment checks are the leading scam targeting US and Canadian applicants: scammers send a fake check and ask you to wire money back to an "approved vendor".',
    'Upfront screening fees or bogus background check payments are the primary trap in the UK and Australia.',
    'Telegram and WhatsApp outreach claiming to represent Outlier, Scale, or Remotasks is almost universally fraudulent.',
    'Real AI training companies never send cashier checks, never ask for your bank login password, and never charge application fees.',
  ],
  sections: [
    {
      id: 'counterfeit-check-scam',
      heading: 'The counterfeit check trap: US and Canada focus',
      content: `[Placeholder: In-depth breakdown of how the fake cashier check scheme operates, why bank check holds deceive victims, and your legal liability if you deposit a bad check.]`,
    },
    {
      id: 'screening-fee-scam',
      heading: 'The upfront screening and equipment fee scam: UK focus',
      content: `[Placeholder: Analysis of fraudulent requests for DBS check payments, training materials, or proprietary evaluation software licenses.]`,
    },
    {
      id: 'messaging-app-recruiting',
      heading: 'WhatsApp and Telegram impersonation tactics',
      content: `[Placeholder: Walkthrough of fake recruiter profiles, lookalike HR manager names, and urgent hiring messages with shortened redirection links.]`,
    },
    {
      id: 'prevention-checklist',
      heading: 'The 5-second sanity check before you reply',
      content: `[Placeholder: Quick reference verification rules: verify corporate email domain SPF/DKIM, check the career site directly, and run the outreach through TraceBase Scam Check.]`,
    },
  ],
  sources: [
    {
      title: 'Federal Trade Commission (FTC) Job Scams Advisory',
      url: 'https://consumer.ftc.gov/articles/job-scams',
      label: 'official',
      notes: 'US official consumer protection advice.',
    },
    {
      title: 'Action Fraud UK: Fake Job Offers',
      url: 'https://www.actionfraud.police.uk',
      label: 'official',
      notes: 'UK national reporting center advice.',
    },
  ],
};

// 5. "Can people in [country] work on [platform]?" (Priority 2)
export const draftGuideNigeriaDataAnnotation: Guide = {
  slug: 'can-people-in-nigeria-work-on-dataannotation-tech',
  title: 'Can People in Nigeria Work on DataAnnotation Tech? Country Eligibility Explained',
  subtitle:
    'An honest evaluation of DataAnnotation Tech geographic eligibility, VPN detection policies, and verified platform alternatives for Nigerian evaluators.',
  readingTime: '6 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'Ebubechukwu Okeke',
  published: false, // Draft, not published
  author: {
    name: 'Ebubechukwu Okeke',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['Nigeria', 'DataAnnotation', 'Country Eligibility', 'VPN Risk'],
  summaryPoints: [
    'DataAnnotation Tech officially restricts applicant registration to a small group of countries (primarily US, UK, Canada, Australia, and New Zealand).',
    'Nigeria is currently not on the officially supported applicant country roster for DataAnnotation Tech.',
    'Using residential VPNs or borrowed foreign IDs violates platform terms and triggers automated deactivation with balance forfeiture.',
    'Platforms like Outlier, Mindrift, and Appen officially recruit and pay evaluators resident in Nigeria.',
  ],
  sections: [
    {
      id: 'official-country-roster',
      heading: 'The official supported country roster',
      content: `[Placeholder: Verifiable quotes and direct terms from DataAnnotation Tech official hiring portals showing accepted jurisdictions.]`,
    },
    {
      id: 'vpn-and-proxy-penalties',
      heading: 'Why attempting VPN registration leads to permanent deactivation',
      content: `[Placeholder: Explanation of IP fraud scoring, PayPal / identity address mismatches, and why VPN tricks result in unpaid wasted effort.]`,
    },
    {
      id: 'verified-nigeria-alternatives',
      heading: 'Verified AI training platforms that officially accept Nigerian talent',
      content: `[Placeholder: Direct links and current status for Outlier, Invisible Technologies, Mindrift, and OneForma, which support Nigerian applicants.]`,
    },
  ],
  sources: [
    {
      title: 'DataAnnotation Tech Contributor FAQ',
      url: 'https://www.dataannotation.tech',
      label: 'official',
      notes: 'Verified country list.',
    },
  ],
};

// 6. "How to get paid from [platform] in [country]" (Priority 2)
export const draftGuideOutlierKenyaPayout: Guide = {
  slug: 'how-to-get-paid-from-outlier-in-kenya',
  title: 'How to Get Paid from Outlier in Kenya: Verified Rails and M-Pesa Routes',
  subtitle:
    'A tactical payout playbook for Kenyan AI evaluators: comparing PayPal and AirTM conversion rates, settlement times, and tax registration.',
  readingTime: '6 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'TraceBase Operations Desk',
  published: false, // Draft, not published
  author: {
    name: 'TraceBase Operations Desk',
    title: 'Payment & Infrastructure',
  },
  topicTags: ['Kenya', 'Outlier', 'Payout Rails', 'M-Pesa', 'AirTM', 'PayPal'],
  summaryPoints: [
    'Outlier supports two primary payment corridors for Kenya: PayPal and AirTM.',
    'AirTM offers lower aggregate conversion spreads when withdrawing USD directly to Kenyan Shillings via M-Pesa.',
    'PayPal withdrawals to Kenyan bank accounts or Equity Bank typically take 24-48 hours with higher foreign exchange markups.',
    'Kenyan digital contractors should maintain records of all foreign inbound remittances for KRA digital economy tax filing.',
  ],
  sections: [
    {
      id: 'outlier-supported-rails',
      heading: 'Available payout rails on Outlier for Kenyan accounts',
      content: `[Placeholder: Step-by-step account linking walkthrough for PayPal and AirTM inside the Outlier worker profile.]`,
    },
    {
      id: 'fee-and-spread-comparison',
      heading: 'Fee breakdown: AirTM to M-Pesa vs PayPal to Equity Bank',
      content: `[Placeholder: Comparison table detailing transfer fees, typical exchange rate markups, and end-to-end receipt times.]`,
    },
    {
      id: 'tax-considerations-kenya',
      heading: 'Kenyan Revenue Authority (KRA) obligations for online contractors',
      content: `[Placeholder: Educational overview of digital service contractor filings and personal income declaration in Kenya. End with professional tax consultation notice.]`,
    },
  ],
  sources: [
    {
      title: 'Outlier Payout Methods & Support',
      url: 'https://outlier.ai',
      label: 'official',
      notes: 'Verified payout options for East Africa.',
    },
    {
      title: 'AirTM Global Payment Corridors',
      url: 'https://airtm.com',
      label: 'official',
      notes: 'M-Pesa withdrawal terms.',
    },
  ],
};

export const ALL_DRAFT_GUIDES: Guide[] = [
  draftGuideIsOutlierLegit,
  draftGuideAlignerrReview,
  draftGuideTaxesAIWork,
  draftGuideJobScamsSpotter,
  draftGuideNigeriaDataAnnotation,
  draftGuideOutlierKenyaPayout,
];
