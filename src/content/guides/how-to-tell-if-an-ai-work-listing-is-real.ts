import { Guide } from './types';

export const guideOne: Guide = {
  slug: 'how-to-tell-if-an-ai-work-listing-is-real',
  title: 'How to Tell if an AI Work Listing is Real',
  subtitle: 'A step-by-step verification guide to confirming remote AI training roles, authenticating hiring domains, and avoiding advance-fee traps before you submit your resume.',
  readingTime: '6 min read',
  lastUpdated: '2026-10-14',
  lastCheckedDate: '12 Oct 2026',
  checkedBy: 'Jo (Ebube Okeke)',
  published: true,
  author: {
    name: 'Jo (Ebube Okeke)',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['Verification', 'Scam Prevention', 'Job Hunting'],
  summaryPoints: [
    'Legitimate AI evaluation platforms never charge candidates for application processing, onboarding modules, background checks, or software licenses.',
    'Always authenticate job postings against the company official applicant tracking system (ATS) like Ashby, Greenhouse, Lever, or Workday.',
    'Watch out for lookalike domain names and recruiters who insist on communicating solely through WhatsApp, Telegram, or personal webmail accounts.',
    'Verify country eligibility directly on the official role description: if a recruiter promises remote work from an unlisted country, treat it as unconfirmed.',
  ],
  sections: [
    {
      id: 'the-rise-of-ghost-listings',
      heading: 'The anatomy of remote AI job fraud',
      content: `The explosive demand for human feedback in AI alignment (RLHF, SFT, and model evaluation) has triggered a parallel wave of advance-fee scams and identity harvesting operations. 

Predatory actors copy legitimate job descriptions from platforms like Outlier, Alignerr, and DataAnnotation Tech, then post them on social media, Telegram groups, and unregulated freelance boards with inflated hourly rates ($80 to $120 per hour for basic text entry).

Their goal is straightforward: exploit candidates eagerness for remote dollar earnings to extract upfront fees or harvest sensitive financial identity documents. Knowing the warning signs saves you time and protects your data.`,
      callout: {
        type: 'warning',
        title: 'Golden Rule of Verification',
        text: 'If a recruiter asks you to pay money for equipment, training materials, or account verification, walk away immediately. Real employers pay you; you never pay them.',
      },
    },
    {
      id: 'checking-applicant-tracking-systems',
      heading: 'Step 1: Authenticate the applicant tracking system (ATS)',
      content: `Real technology companies and evaluation vendors do not collect initial job applications through Google Forms, Telegram bots, or unsolicited WhatsApp direct messages.

Legitimate hiring operations route candidate submissions through verified ATS portals. When you inspect an application link, look closely at the browser address bar:
- Ashby: jobs.ashbyhq.com/[company-name]
- Greenhouse: boards.greenhouse.io/[company-name]
- Lever: jobs.lever.co/[company-name]
- Workday: [company].wd1.myworkdayjobs.com

If an application form lives on an unbranded form builder or an unfamiliar domain registered two weeks ago, pause. Go directly to the company primary website, navigate to their Careers section, and search for the exact job requisition. If it is not listed on their primary site, the external post is unconfirmed.`,
    },
    {
      id: 'domain-inspection-and-email-headers',
      heading: 'Step 2: Inspect email headers and lookalike domains',
      content: `Scammers routinely register typosquatted domains that look nearly identical to legitimate platforms. For example, registering "outlier-talent-portal.com" or "alignerr-work.net" instead of the official domain.

When you receive recruiter outreach, inspect the sender email address:
1. Examine the domain suffix: does it end in the authentic corporate domain, or is it a free provider like gmail.com or outlook.com? Legitimate corporate recruiters do not conduct talent acquisition from personal webmail accounts.
2. Check for subtle letter swaps: look for subtle substitutions like "rn" instead of "m" or extra hyphens.
3. Beware of chat-only interviews: if an entire hiring process consists of text messaging without video verification, portal assessments, or formal documentation, it fails our verification standard.`,
      callout: {
        type: 'tip',
        title: 'Quick WHOIS Check',
        text: 'You can check any domain registration date for free via ICANN Lookup. If a supposed global AI vendor domain was registered within the last 60 days, treat it with extreme caution.',
      },
    },
    {
      id: 'country-eligibility-reality-check',
      heading: 'Step 3: Confirm genuine country eligibility',
      content: `A frequent trap in international AI contracting is the "worldwide remote" promise that conceals strict geographical exclusions. 

Many enterprise AI platforms restrict candidate payouts to countries where their payroll partners (such as Deel, AirTM, or Stripe Express) hold operational licenses. Third-party recruiters often hide these limits to build talent pools, leaving applicants stranded after completing unpaid assessments.

At TraceBase, we verify country eligibility against the platform official terms before marking any role as accepted. If a listing is silent regarding your region, we mark it plainly as Unconfirmed rather than guessing. Always verify that your country is explicitly supported for payroll before investing hours in technical screening.`,
    },
    {
      id: 'ten-point-red-flag-checklist',
      heading: 'Summary: The 10-point red flag test',
      content: `Before submitting your resume or identity documents to any AI work opportunity, check these 10 red flags:
1. Upfront fees demanded for training, hardware, or account setup.
2. Payouts offered via Bitcoin, USDT, or Amazon gift cards instead of recognized payroll rails.
3. Requests for sensitive financial credentials like your BVN, ATM PIN, or banking passwords.
4. Entity cannot be found in official corporate registers (such as Nigeria CAC public search).
5. Communication takes place exclusively via WhatsApp, Telegram, or Signal.
6. Recruiter uses a free webmail account or lookalike domain.
7. Unrealistic pay promises ($100+/hr for basic typing with zero experience).
8. Immediate contract offer without skills testing or technical review.
9. Artificial urgency demanding immediate contract signing within minutes.
10. Role cannot be found on the company official career portal.

If two or more are true, stop immediately and submit the link to our scam check tool.`,
    },
  ],
  sources: [
    {
      title: 'US Federal Trade Commission: Job Scams Advisory',
      url: 'https://consumer.ftc.gov/articles/job-scams',
      label: 'official',
      notes: 'Guidance on identifying advance-fee employment fraud and fake check schemes.',
    },
    {
      title: 'Nigeria Corporate Affairs Commission (CAC) Company Registry',
      url: 'https://search.cac.gov.ng',
      label: 'statute',
      notes: 'Public search portal for verifying registered corporate entities in Nigeria.',
    },
    {
      title: 'Outlier AI Official Support FAQ',
      url: 'https://outlier.ai/faq',
      label: 'official',
      notes: 'Official platform onboarding steps, identity verification policies, and payment terms.',
    },
  ],
  practiceExercise: {
    id: 'ex-1-detect-recruiter-fraud',
    title: 'Exercise: Audit a Recruiter Outreach Message',
    scenario: 'You receive an unsolicited direct message on LinkedIn claiming to offer an immediate AI prompt engineering role.',
    prompt: `Analyze the following recruiter outreach message and choose the safer course of action:
"Hello! We reviewed your profile and want to hire you immediately as an AI Prompt Rater for Outlier Global Network. Pay is $85/hr, 20 hrs/week. No technical test needed. To reserve your training seat and receive your company MacBook, send $45 shipping fee to our agent via USDT or Chipper Cash. Message our hiring director on WhatsApp at +234-80-XXXX-XXXX."`,
    optionA: {
      label: 'Option A: Flag as High-Risk Advance-Fee Fraud',
      text: 'Reject and report the message. The outreach displays multiple critical red flags: upfront shipping fee demand, payment via cryptocurrency/untraceable channels, hiring without skills testing, and off-platform WhatsApp redirection.',
    },
    optionB: {
      label: 'Option B: Message the WhatsApp Number to Request an Invoice',
      text: 'Send a message on WhatsApp asking if the shipping fee can be deducted from your first weekly paycheck instead of paying upfront.',
    },
    targetConstraint: {
      minSentences: 2,
      maxSentences: 3,
      instructionText: 'Write a 2 to 3 sentence justification explaining why Option A is the only defensible response.',
    },
    modelAnswer: {
      preferredOption: 'A',
      rationale: 'This message contains four fatal red flags: upfront fee demands, instant offers without qualification testing, cryptocurrency payment rails, and off-platform WhatsApp communication. Legitimate enterprises never ask candidates to pay shipping fees for work equipment, nor do they hire without testing. Option B engages with a scammer and risks identity exposure.',
      keyAuditPrinciple: 'Never negotiate terms with an advance-fee fraudster. When an upfront payment is demanded, verification stops and reporting begins.',
    },
  },
  relatedWorkTypes: ['Evaluation & RLHF', 'Model Evaluation', 'Safety & Red Teaming'],
};
