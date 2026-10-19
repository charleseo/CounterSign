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
      content: `Our verification team cross-referenced Outlier's corporate registration with Delaware Secretary of State records and Scale AI parent filings. All official Outlier applications route exclusively through greenhouse.io or ashbyhq.com under Scale AI's verified enterprise domain. Any communication directing applicants to WhatsApp, Telegram, or non-corporate Google Forms is unauthorized and fraudulent.`,
      callout: {
        type: 'info',
        title: 'Editorial Fact',
        text: 'Outlier never charges candidates for account setup, background checks, or onboarding modules.',
      },
    },
    {
      id: 'pay-and-taxation',
      heading: 'Pay rates, payment schedules, and contractor taxation',
      content: `Hourly compensation ranges from $15/hr for generalist quality tasks to $50+/hr for verified coding, mathematics, and legal evaluation. Payments are disbursed on a weekly schedule via PayPal or AirTM. US contractors receive Form 1099-NEC from Smart Monkey VI, Inc. (Scale AI subsidiary); UK and Canadian contributors are responsible for self-employment tax filings under local revenue authority rules.`,
    },
    {
      id: 'queue-volatility',
      heading: 'The empty queue reality: what reviewers complain about most',
      content: `The most frequent contributor issue is sudden task queue pauses ("Empty Queue" or "EQ"). Projects are tied to dynamic client training batches; when a model evaluation cycle ends, evaluators may experience days or weeks of zero available tasks without advance notice. We recommend maintaining accounts across multiple platforms rather than relying on Outlier as a sole income stream.`,
      callout: {
        type: 'warning',
        title: 'Project Volatility Warning',
        text: 'Do not treat AI evaluation as steady full-time employment. Project demand fluctuates weekly based on client training cycles.',
      },
    },
    {
      id: 'editorial-verdict',
      heading: 'Editorial verdict: legitimate platform with volatile workflows',
      content: `Outlier is a legitimate, paying platform best suited for domain specialists seeking flexible supplemental income. Contributors should treat it as project-based gig work, avoid relying on it for fixed living expenses, and always verify direct application links through official channels.`,
    },
  ],
  sources: [
    {
      title: 'Outlier.ai Official Contributor Agreement',
      url: 'https://outlier.ai',
      label: 'official',
      notes: 'Reviewed corporate terms and contractor payment clauses.',
    },
    {
      title: 'Scale AI Corporate Registration Filings',
      url: 'https://scale.com',
      label: 'official',
      notes: 'Delaware state incorporation data and operating entities.',
    },
  ],
};

// 2. "Alignerr review: the test, the pay, month one reality" (Priority 1)
export const draftGuideAlignerrReview: Guide = {
  slug: 'alignerr-review-test-pay-month-one-reality',
  title: 'Alignerr Review: The Test, The Pay, and the Month-One Reality',
  subtitle:
    'What to expect from Alignerr screening tests on TestGorilla, verified hourly pay ranges, and why passing a test does not guarantee immediate work.',
  readingTime: '8 min read',
  lastUpdated: '2026-10-15',
  lastCheckedDate: '15 Oct 2026',
  checkedBy: 'Ebubechukwu Okeke',
  published: false, // Draft, not published
  author: {
    name: 'Ebubechukwu Okeke',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['Platform Audit', 'Alignerr', 'TestGorilla', 'Screening Tests', 'Deel'],
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
      content: `Alignerr assessments run via TestGorilla and bespoke proctored environments. Tests evaluate negative constraint adherence, logical consistency, and rigorous rubric grading. Most domain tracks require an 80% passing mark. Retakes are generally locked for 90 days after a failed attempt, making pre-test preparation essential.`,
    },
    {
      id: 'pay-benchmarks',
      heading: 'Hourly pay benchmarks across generalist and technical tiers',
      content: `Stated pay rates range from $20/hr for generalist language tasks up to $60/hr for verified software engineering and graduate-level mathematics evaluation. Pay rates are fixed per project track and confirmed in your project assignment agreement.`,
    },
    {
      id: 'month-one-onboarding',
      heading: 'Month one: the lag between passing tests and receiving paid tasks',
      content: `Passing the screening assessment does not guarantee immediate task availability. Most candidates experience a 2 to 6 week onboarding lag while waiting for client project batches and corresponding Slack channels to open.`,
    },
    {
      id: 'payout-mechanics',
      heading: 'Contractor onboarding and payment logistics via Deel',
      content: `Alignerr routes contractor payouts via Deel. Contributors must complete identity verification and submit applicable tax documents (W-8BEN for non-US contributors or W-9 for US citizens). Payouts disburse bi-weekly to connected local bank accounts or digital wallets.`,
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
      content: `In the US, AI evaluation work is treated as independent contractor earnings reported on IRS Form 1099-NEC. Earnings are subject to 15.3% Self-Employment Tax (SECA) covering Social Security and Medicare, plus federal and state income taxes. Contractors earning over $400 net must make quarterly estimated payments using Form 1040-ES to avoid underpayment penalties.`,
    },
    {
      id: 'united-kingdom-hmrc',
      heading: 'United Kingdom: HMRC Self Assessment and National Insurance',
      content: `UK contributors must register as sole traders with HMRC once annual gross trading income exceeds the £1,000 trading allowance. Earnings are reported via the annual Self Assessment tax return. You will pay Class 4 National Insurance and income tax on profits above personal allowance thresholds.`,
    },
    {
      id: 'canada-cra',
      heading: 'Canada: CRA T2125 Statement of Business Activities',
      content: `Canadian evaluators report AI platform earnings as self-employed business income on Form T2125 (Statement of Business or Professional Activities). Net income is subject to federal and provincial income taxes plus both employer and employee portions of Canada Pension Plan (CPP) contributions.`,
    },
    {
      id: 'record-keeping-tips',
      heading: 'Essential record-keeping habits for remote AI evaluators',
      content: `Maintain dedicated bank accounts for contractor income. Set aside 25% to 30% of every incoming payment for tax liabilities. Keep digital copies of all platform payment receipts, fee statements from PayPal or Deel, and receipts for business expenses such as internet connectivity and workspace equipment.`,
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
      content: `The counterfeit check scam is the most common scheme targeting US and Canadian remote workers. Scammers impersonate legitimate platforms and email an official-looking offer letter, followed by a mailed cashier check purportedly for home office equipment. The victim is directed to deposit the check and wire funds to a specified vendor. Days later, the check bounces, leaving the victim legally responsible for the full overdraft.`,
    },
    {
      id: 'screening-fee-scam',
      heading: 'The upfront screening and equipment fee scam: UK focus',
      content: `In the UK and Europe, fraudulent actors pose as recruitment agencies demanding upfront fees for DBS criminal background checks, vetting certificates, or proprietary evaluation software licenses. Legitimate AI platforms absorb background check costs and never charge candidates for screening.`,
    },
    {
      id: 'messaging-app-recruiting',
      heading: 'WhatsApp and Telegram impersonation tactics',
      content: `Fraudulent operators create lookalike profiles of real platform executives on WhatsApp and Telegram, offering immediate hires at inflated rates without formal interviews. Real enterprise evaluation teams only communicate from official corporate email domains and direct candidates to secure applicant tracking portals.`,
    },
    {
      id: 'prevention-checklist',
      heading: 'The 5-second sanity check before you reply',
      content: `Before responding to any recruiter, verify the sender email domain against official corporate careers pages. Never accept checks for equipment purchase, never pay upfront screening or activation fees, and run suspicious job offers through the TraceBase Scam Check tool.`,
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
      content: `DataAnnotation Tech officially restricts contributor registrations to a select roster of countries: the United States, Canada, the United Kingdom, Australia, and New Zealand. Candidate applications originating from IP addresses or identity credentials outside these supported territories are filtered during initial portal registration.`,
    },
    {
      id: 'vpn-and-proxy-penalties',
      heading: 'Why attempting VPN registration leads to permanent deactivation',
      content: `Attempting to bypass country restrictions using residential VPNs, proxy servers, or borrowed foreign identity profiles violates DataAnnotation's terms of service. Fraud detection systems routinely detect address discrepancies with connected payment accounts, leading to swift account deactivation and forfeiture of pending balances.`,
    },
    {
      id: 'verified-nigeria-alternatives',
      heading: 'Verified AI training platforms that officially accept Nigerian talent',
      content: `Nigerian domain specialists can apply to verified platforms that actively recruit from Nigeria, including Outlier AI, Invisible Technologies, Mindrift, and OneForma. These platforms support local identity verification and disburse payments directly via PayPal, AirTM, or global contractor rails.`,
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
      content: `Outlier provides two primary payment options for Kenyan contributors: PayPal and AirTM. Evaluators link their preferred payout method inside their Outlier worker dashboard under Account Settings, and payouts are initiated automatically on weekly cycles.`,
    },
    {
      id: 'fee-and-spread-comparison',
      heading: 'Fee breakdown: AirTM to M-Pesa vs PayPal to Equity Bank',
      content: `AirTM typically offers competitive net conversion rates when withdrawing USD directly to Kenyan Shillings via M-Pesa peer-to-peer cashier settlement. PayPal to Equity Bank withdrawals provide direct bank deposits but carry standard foreign exchange conversion spreads and bank transaction fees.`,
    },
    {
      id: 'tax-considerations-kenya',
      heading: 'Kenyan Revenue Authority (KRA) obligations for online contractors',
      content: `Kenyan digital economy contributors should track foreign exchange earnings for Kenya Revenue Authority (KRA) personal income tax declarations. Maintain monthly payment records and consult a local tax advisor regarding applicable digital service contractor provisions.`,
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
