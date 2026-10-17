import { Guide } from './types';

export const guideTwo: Guide = {
  slug: 'getting-paid-in-usd-from-nigeria',
  title: 'Getting Paid in USD from Nigeria: Geegpay, Grey, and Domiciliary Accounts',
  subtitle: 'A practical, verified banking guide for Nigerian AI contractors: setting up US virtual ACH accounts, navigating Deel and Outlier payouts, and avoiding frozen PayPal traps.',
  readingTime: '8 min read',
  lastUpdated: '2026-10-14',
  lastCheckedDate: '12 Oct 2026',
  checkedBy: 'Jo (Ebube Okeke)',
  published: true,
  author: {
    name: 'Jo (Ebube Okeke)',
    title: 'Lead Evaluator, TraceBase',
  },
  topicTags: ['Nigeria', 'Banking', 'USD Payouts', 'Geegpay', 'Grey'],
  summaryPoints: [
    'Virtual US routing accounts (Geegpay and Grey) allow Nigerian evaluators to receive domestic ACH transfers from Deel, Outlier, and Alignerr without international wire friction.',
    'Never use a Nigerian personal PayPal account to receive freelance wages: PayPal does not permit incoming payments to personal accounts registered in Nigeria, which leads to frozen funds.',
    'For transfers above $2,000, traditional Nigerian bank domiciliary accounts (GTBank, Zenith, First Bank) offer direct SWIFT routing, though correspondent banks deduct $15 to $35 in transit.',
    'Always complete Tier-3 KYC verification on your payment platform (NIN plus International Passport or Driver License) before directing large payroll deposits.',
  ],
  sections: [
    {
      id: 'understanding-payment-rails',
      heading: '1. The two proven payout pathways for Nigerian contractors',
      content: `Earning in US dollars while living in Nigeria gives you a substantial purchasing advantage, but getting funds from Silicon Valley payroll portals into your local bank account requires the right rails.

Most AI training platforms (including Outlier, Alignerr, Mercor, and Invisible Technologies) disburse payments via one of two mechanisms:
1. Direct contractor platforms: Services like Deel or Stripe Express that let you choose your withdrawal method.
2. US domestic ACH direct deposit: Direct payments to a US-based checking account with a 9-digit ABA routing number and account number.

You can receive these funds cleanly through two reliable channels: Virtual US Bank Accounts (best for weekly payouts under $2,000) or Nigerian Commercial Bank Domiciliary Accounts (best for larger monthly sums).`,
    },
    {
      id: 'virtual-usd-accounts',
      heading: '2. Virtual US bank accounts: Geegpay and Grey',
      content: `Virtual bank accounts provided by regulated fintech operators like Geegpay (by Raenest) and Grey Finance are the most popular choice for Nigerian AI evaluators.

Here is how they work:
- You register and verify your identity using your National Identification Number (NIN) and an International Passport, Voter Card, or Driver License.
- The provider issues you an individual virtual US checking account hosted with a US partner bank (such as Lead Bank or Thread Bank).
- You receive an individual 9-digit ACH routing number and account number in your legal name.
- When Outlier or Deel sends your earnings via ACH, the deposit clears within 1 to 2 business days without international wire charges.

Once the dollars land in your virtual wallet, you can either swap them to Nigerian Naira (NGN) at market rates and withdraw directly to your Nigerian commercial bank (Access, GTBank, Zenith, Kuda) within minutes, or hold them in USD. Typical platform exchange fees range from 1% to 1.5%.`,
      callout: {
        type: 'tip',
        title: 'KYC Tip for Quick Approval',
        text: 'Ensure the legal name on your Geegpay or Grey profile matches the exact spelling on your government ID and your AI platform contract. Mismatches in middle names often trigger automated compliance holds.',
      },
    },
    {
      id: 'domiciliary-accounts',
      heading: '3. Nigerian bank domiciliary accounts: When to use SWIFT',
      content: `If you are receiving larger single disbursements (such as $2,000 to $5,000 or more from engineering evaluations or specialized enterprise pilots), a traditional Nigerian Domiciliary Account with a commercial bank is often preferable.

How commercial domiciliary accounts operate:
- You open an individual USD domiciliary account at banks like GTBank, Zenith Bank, First Bank, or Stanbic IBTC.
- You provide your bank SWIFT code (e.g., GTBINGLAXXX), account number, and intermediary bank routing instructions to the payroll provider.
- Payouts travel through the international SWIFT network. Intermediary correspondent banks (typically Citibank or JPMorgan Chase in New York) deduct a routing fee of $15 to $35 per transfer.

Benefits:
- Funds sit directly in your domestic banking custody.
- You can withdraw physical dollar cash over the counter at your local bank branch, or liquidate via official bank FX windows.
- No third-party fintech withdrawal limits apply.`,
    },
    {
      id: 'methods-to-avoid',
      heading: '4. Critical warnings: Payout methods to avoid',
      content: `Navigating international payments carries real risks if you follow outdated online advice. Watch out for these common traps:

1. The Nigerian PayPal Trap:
Personal PayPal accounts registered in Nigeria cannot receive commercial payments from employers. If you attempt to open an account using a foreign VPN or false address, PayPal automated fraud systems will eventually freeze the account, locking your earnings for 180 days with minimal recourse.

2. Account Renting or Third-Party Intermediaries:
Never permit someone else to receive your earnings on your behalf through their foreign bank account or foreign PayPal. This practice breaches platform terms of service, frequently leads to account termination, and leaves you vulnerable to payment theft.

3. Unregulated Peer-to-Peer Telegram Exchangers:
Always convert your dollars to Naira through licensed fintech platforms or official banking channels. Sending funds to anonymous peer-to-peer traders on WhatsApp or Telegram carries significant risk of fraud and frozen local bank accounts.`,
      callout: {
        type: 'warning',
        title: 'Zero Tolerance for VPN Payout Bypasses',
        text: 'Attempting to spoof your location to open a US PayPal or UK bank account violates platform terms and can result in immediate loss of verified evaluator status.',
      },
    },
    {
      id: 'power-and-data-reliability',
      heading: '5. Hardware essentials: Backup power and data conservation',
      content: `Reliable remote work in Nigeria requires planning for infrastructure challenges:

1. Router Power (Mini DC UPS):
Invest in an affordable 12V Mini DC UPS (costing approximately 15,000 to 25,000 NGN). These compact units plug directly between your wall outlet and your fiber or 4G Wi-Fi router, providing 4 to 8 hours of uninterrupted connectivity during power outages. This prevents unexpected disconnections in the middle of timed evaluation sprints.

2. Laptop Power Banks:
Ensure you maintain a power bank capable of 65W USB-C Power Delivery (PD) to keep your work laptop charged through extended power outages.

3. Bandwidth Conservation:
Enable TraceBase Data-Saver mode (under 48 KB initial load) and utilize browser bandwidth settings to prevent heavy background updates during peak data billing hours.`,
    },
  ],
  sources: [
    {
      title: 'Central Bank of Nigeria: Guidelines on International Money Transfers and Domiciliary Accounts',
      url: 'https://www.cbn.gov.ng',
      label: 'statute',
      notes: 'Regulatory framework governing individual foreign currency domiciliary deposits and FX transactions.',
    },
    {
      title: 'Geegpay by Raenest Knowledge Base: US Virtual Bank Account Terms',
      url: 'https://geegpay.africa',
      label: 'official',
      notes: 'Operational documentation on virtual ACH account allocation, limits, and supported payroll partners.',
    },
    {
      title: 'Deel Official Contractor Payout Options: Direct Deposit & Global Withdrawal',
      url: 'https://www.deel.com/blog/contractor-payment-methods',
      label: 'official',
      notes: 'Official breakdown of supported contractor payout rails across emerging markets.',
    },
  ],
  practiceExercise: {
    id: 'ex-2-choose-payment-rail',
    title: 'Exercise: Select the Optimal Payout Strategy',
    scenario: 'You just qualified for an AI evaluation project that pays $20 per hour with weekly disbursements totaling approximately $300 each Friday.',
    prompt: `Evaluate the two payout options below for collecting your weekly $300 earnings in Nigeria:
Option A: Open a virtual US checking account via Geegpay or Grey, connect the individual ACH routing number to your employer dashboard, and convert to Naira weekly.
Option B: Provide your commercial bank USD domiciliary account details for weekly direct international SWIFT wire transfers.`,
    optionA: {
      label: 'Option A: Virtual US ACH Account (Geegpay / Grey)',
      text: 'Recommended for weekly $300 disbursements. Domestic ACH transfers incur zero intermediary wire deductions, saving $15 to $35 every week compared to SWIFT wire fees.',
    },
    optionB: {
      label: 'Option B: Commercial Bank Domiciliary Wire (SWIFT)',
      text: 'Request direct weekly SWIFT wire to your Nigerian bank domiciliary account.',
    },
    targetConstraint: {
      minSentences: 2,
      maxSentences: 3,
      instructionText: 'Write a 2 to 3 sentence justification highlighting the fee impact of choosing Option A over Option B.',
    },
    modelAnswer: {
      preferredOption: 'A',
      rationale: 'For weekly disbursements of $300, Option A is far more cost-effective because ACH transfers avoid the $15 to $35 intermediary correspondent banking fee charged on each SWIFT wire. Over a month, choosing Option B would consume $60 to $140 of your earnings in fixed wire fees alone. Option A keeps your transaction fees under 1.5% while providing rapid local Naira settlement.',
      keyAuditPrinciple: 'Always match payment rails to payout frequency: use low-cost ACH virtual accounts for frequent modest payouts, and reserve SWIFT wire transfers for high-value lump sums.',
    },
  },
  relatedWorkTypes: ['Evaluation & RLHF', 'Model Evaluation', 'Domain Specialist'],
};
