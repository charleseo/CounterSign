import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { countryLabel } from '@/lib/utils/country';
import { JobCard } from '@/components/ui/JobCard';
import { SampleBadge } from '@/components/ui/SampleBadge';
import { EmailCapture } from '@/components/ui/EmailCapture';
import { BreadcrumbListJsonLd } from '@/components/seo/JsonLd';
import {
  AlertTriangle,
  Landmark,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface CountryHubConfig {
  code: string;
  slug: string;
  name: string;
  flag: string;
  priority: 1 | 2;
  isPublished: boolean;
  payoutPlaybook: {
    title: string;
    description: string;
    rails: Array<{ name: string; tag: string; details: string }>;
    taxNote: string;
  };
  scamsPlaybook: {
    title: string;
    description: string;
    commonTactics: string[];
  };
  faqs: Array<{ q: string; a: string }>;
}

const COUNTRY_HUBS: Record<string, CountryHubConfig> = {
  US: {
    code: 'US',
    slug: 'us',
    name: 'United States',
    flag: '🇺🇸',
    priority: 1,
    isPublished: false,
    payoutPlaybook: {
      title: 'US Contractor Payout & Tax Framework',
      description:
        'US evaluators work as independent 1099 contractors. Payouts are made directly in USD via domestic ACH or direct deposit.',
      rails: [
        {
          name: 'Direct Deposit / Domestic ACH',
          tag: 'Standard Rail',
          details:
            'Free domestic ACH deposit directly into checking or savings accounts. Settles in 1 to 2 business days.',
        },
        {
          name: 'PayPal / Hyperwallet',
          tag: 'Secondary Rail',
          details:
            'Available on Outlier and DataAnnotation Tech. Fast transfer to linked US bank accounts.',
        },
      ],
      taxNote:
        'Income is reported on Form 1099-NEC if earnings exceed $600. Contractors are responsible for quarterly estimated taxes (Federal + State) and 15.3% SECA self-employment tax. Always speak to a licensed CPA or tax professional.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting US Applicants',
      description:
        'Advance-fee fraud operators frequently target US applicants with counterfeit check overpayment schemes.',
      commonTactics: [
        'Counterfeit cashier checks sent by mail with instructions to wire money to an "approved home-office equipment vendor".',
        'Text or WhatsApp messages claiming to be HR representatives from Scale AI, Mercor, or OpenAI offering $80+/hr without an interview.',
        'Requests for sensitive Social Security numbers or online banking passwords during initial text message outreach.',
      ],
    },
    faqs: [
      {
        q: 'Can US residents work for multiple AI platforms simultaneously?',
        a: 'Yes. As an independent contractor (1099), you are free to evaluate models across multiple non-exclusive platforms as long as you do not work simultaneous billable hours on competing client sprints.',
      },
      {
        q: 'Do AI evaluation platforms withhold federal taxes for US contractors?',
        a: 'No. Independent contractors receive gross compensation. You are responsible for calculating and paying self-employment tax and income taxes.',
      },
    ],
  },
  GB: {
    code: 'GB',
    slug: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    priority: 1,
    isPublished: false,
    payoutPlaybook: {
      title: 'UK Contractor Payout & Self Assessment Framework',
      description:
        'UK evaluators contract as sole traders. Platforms disburse earnings via Deel, Wise, or direct UK Faster Payments.',
      rails: [
        {
          name: 'Deel / UK Bank Transfer (Faster Payments)',
          tag: 'Standard Rail',
          details:
            'Direct GBP deposit into UK current accounts (Barclays, HSBC, Monzo, etc.) using Sort Code and Account Number.',
        },
        {
          name: 'PayPal / Wise Virtual Account',
          tag: 'Secondary Rail',
          details:
            'Instant multi-currency conversion with competitive mid-market FX rates.',
        },
      ],
      taxNote:
        'Gross earnings exceeding the £1,000 trading allowance must be reported to HMRC via annual Self Assessment. Class 2 and Class 4 National Insurance contributions apply. Always speak to a chartered accountant.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting UK Applicants',
      description:
        'Unregulated job boards and WhatsApp recruiters often demand upfront administrative payments.',
      commonTactics: [
        'Requests to pay an upfront "DBS background check fee" or "training onboarding fee" via crypto or debit card.',
        'Impersonation of UK staffing agencies via WhatsApp offering remote model testing roles.',
        'Requests for your National Insurance number or online banking credentials prior to contract execution.',
      ],
    },
    faqs: [
      {
        q: 'Do I need to register as a sole trader in the UK to do AI evaluation?',
        a: 'If your total gross self-employment income across all side projects exceeds £1,000 in a tax year, you must register for Self Assessment with HMRC.',
      },
      {
        q: 'Are UK evaluators eligible for Scale AI and Outlier projects?',
        a: 'Yes. The UK is one of the primary recruitment markets for STEM, legal, and creative evaluation benchmarks.',
      },
    ],
  },
  CA: {
    code: 'CA',
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    priority: 1,
    isPublished: false,
    payoutPlaybook: {
      title: 'Canadian Contractor Payout & CRA Framework',
      description:
        'Canadian evaluators operate as self-employed individuals receiving USD payments converted to CAD.',
      rails: [
        {
          name: 'Direct Deposit / EFT via Deel or Tipalti',
          tag: 'Standard Rail',
          details:
            'Direct electronic funds transfer (EFT) into Canadian chequing accounts using Institution, Transit, and Account number.',
        },
        {
          name: 'PayPal to Canadian Bank',
          tag: 'Secondary Rail',
          details:
            'Standard payout on platforms like DataAnnotation Tech. Currency conversion to CAD is applied by PayPal.',
        },
      ],
      taxNote:
        'Self-employed earnings are reported on Form T2125 (Statement of Business or Professional Activities). CPP self-employed contributions apply. GST/HST registration is mandatory once revenues exceed $30,000 within 4 consecutive quarters. Always speak to a Canadian CPA.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting Canadian Applicants',
      description:
        'Scammers use overpayment checks and bogus remote work kits to target Canadian applicants.',
      commonTactics: [
        'Counterfeit mobile check deposits for remote work office equipment.',
        'Unsolicited job offers sent via SMS or Telegram promising $60 CAD/hr for basic data entry without qualification tests.',
        'Advance requests for Social Insurance Numbers (SIN) or Interac e-Transfer deposits.',
      ],
    },
    faqs: [
      {
        q: 'Do Canadian evaluators pay US tax withholding?',
        a: 'No. Canadian contractors complete Form W-8BEN to claim tax treaty benefits, exempting US platforms from withholding US federal tax.',
      },
    ],
  },
  IN: {
    code: 'IN',
    slug: 'india',
    name: 'India',
    flag: '🇮🇳',
    priority: 2,
    isPublished: false,
    payoutPlaybook: {
      title: 'India Contractor Remittance & Section 44ADA Framework',
      description:
        'Indian evaluators receive inward foreign remittances under RBI guidelines.',
      rails: [
        {
          name: 'Wire Transfer / Automated Inward Remittance (FIRC)',
          tag: 'Official Rail',
          details:
            'Direct foreign inward remittance to Indian NRE/NRO or resident savings accounts with Foreign Inward Remittance Certificate (FIRC).',
        },
        {
          name: 'PayPal / Payoneer',
          tag: 'Secondary Rail',
          details:
            'Automated 24-hour sweep to linked local bank accounts with purpose code P0802/P0803.',
        },
      ],
      taxNote:
        'Contractors can evaluate presumptive taxation under Section 44ADA of the Income Tax Act if eligible. GST registration applies once foreign export turnover exceeds Rs 20 Lakhs. End with qualified CA consultation notice.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting Indian Applicants',
      description:
        'Telegram task scams and deposit recruitment schemes are widespread.',
      commonTactics: [
        'Telegram channels asking users to complete "paid YouTube likes or reviews" and requiring a fee to release withdrawals.',
        'Impersonation of Appen or Outlier recruiters asking for registration fees via UPI.',
        'Requests for Aadhaar or PAN card scans via unverified personal WhatsApp chats.',
      ],
    },
    faqs: [
      {
        q: 'Can Indian developers work on Outlier and Alignerr?',
        a: 'Yes. Both platforms recruit Indian developers and domain specialists for coding evaluation and multilingual RLHF.',
      },
    ],
  },
  PH: {
    code: 'PH',
    slug: 'philippines',
    name: 'Philippines',
    flag: '🇵🇭',
    priority: 2,
    isPublished: false,
    payoutPlaybook: {
      title: 'Philippine Freelancer Remittance & BIR 8% Option',
      description:
        'Filipino evaluators receive USD remittances into local digital wallets and banks.',
      rails: [
        {
          name: 'PayPal / Deel to GCash or Maya',
          tag: 'Fast Digital Rail',
          details:
            'Direct USD to PHP real-time withdrawal into verified GCash or Maya digital wallets.',
        },
        {
          name: 'Bank Transfer (BDO, BPI, UnionBank)',
          tag: 'Bank Rail',
          details:
            'Domestic PESONet / InstaPay settlement for freelance compensation.',
        },
      ],
      taxNote:
        'Registered freelancers report income to the Bureau of Internal Revenue (BIR) using Form 1701Q with the option for 8% gross income tax in lieu of graduated rates. Consult a certified public accountant.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting Filipino Applicants',
      description:
        'Advance-fee training scams and VIP task platforms target Filipino freelancers.',
      commonTactics: [
        'Pay-to-work schemes asking for GCash transfers to purchase evaluation starter kits or software keys.',
        'Facebook group posts advertising "data entry encoder" jobs that redirect to Ponzi recharge schemes.',
        'Recruiters demanding photos of government IDs (UMID/Passport) before sharing official company links.',
      ],
    },
    faqs: [
      {
        q: 'Which platforms actively hire Filipino evaluators?',
        a: 'Outlier, Remotasks, Appen, and OneForma officially hire evaluators in the Philippines for English and Tagalog projects.',
      },
    ],
  },
  KE: {
    code: 'KE',
    slug: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    priority: 2,
    isPublished: true,
    payoutPlaybook: {
      title: 'Kenya Contractor Payout & KRA Tax Framework',
      description:
        'Kenyan evaluators receive USD contract earnings directly into local bank accounts or Safaricom M-Pesa.',
      rails: [
        {
          name: 'Deel / AirTM to M-Pesa',
          tag: 'Fast Mobile Rail',
          details:
            'Direct USD to KES real-time withdrawal into Safaricom M-Pesa lines with zero bank wait times.',
        },
        {
          name: 'Direct USD Wire (Equity Bank, KCB, Standard Chartered)',
          tag: 'Bank Rail',
          details:
            'Direct SWIFT transfer into personal foreign currency accounts for larger monthly balances.',
        },
      ],
      taxNote:
        'Kenyan contractors provide their KRA PIN on Form W-8BEN. Because services are performed physically in Kenya, 0% US tax withholding applies. Earnings are subject to local Kenyan personal income tax. Consult a licensed tax advisor.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting Kenyan Applicants',
      description:
        'Account broker syndicates and upfront deposit schemes frequently target Nairobi and regional tech talent.',
      commonTactics: [
        'WhatsApp groups offering to rent or sell verified Outlier or Alignerr accounts for a weekly cut.',
        'Telegram channels asking for an upfront M-Pesa fee to unlock task queues or access assessment answers.',
        'Unsolicited text messages claiming to hire for Google or OpenAI data entry without an official application link.',
      ],
    },
    faqs: [
      {
        q: 'Which platforms actively recruit Kenyan evaluators?',
        a: 'Outlier, Alignerr, Remotasks (CrowdGen), and OneForma regularly recruit Kenyan contributors for English reasoning, STEM, and Swahili localization.',
      },
      {
        q: 'Do Kenyans pay US taxes on AI evaluation earnings?',
        a: 'No. Submitting Form W-8BEN with your KRA PIN establishes foreign status, ensuring platforms withhold zero percent US federal tax.',
      },
    ],
  },
  GH: {
    code: 'GH',
    slug: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    priority: 2,
    isPublished: true,
    payoutPlaybook: {
      title: 'Ghana Contractor Payout & GRA Framework',
      description:
        'Ghanaian contributors receive USD payouts through mobile money wallets and local multi-currency bank accounts.',
      rails: [
        {
          name: 'Deel to MTN Mobile Money (MoMo) / Telecel Cash',
          tag: 'Fast Mobile Rail',
          details:
            'Direct USD to GHS withdrawal into registered MTN MoMo or Telecel Cash wallets.',
        },
        {
          name: 'USD Domiciliary Bank Account (Ecobank, Stanbic, CalBank)',
          tag: 'Bank Rail',
          details:
            'Direct international wire into personal foreign currency accounts to retain US Dollars.',
        },
      ],
      taxNote:
        'Ghanaian contractors use their Ghana Card PIN as their Taxpayer Identification Number (TIN). Filing Form W-8BEN ensures 0% US withholding tax under foreign-source income rules. Earnings are declared under local Ghana Revenue Authority regulations.',
    },
    scamsPlaybook: {
      title: 'Common Recruitment Scams Targeting Ghanaian Applicants',
      description:
        'Advance-fee training scams and fake mobile money verification requests target Ghanaian freelancers.',
      commonTactics: [
        'Requests to send an upfront MTN MoMo fee for identity verification or onboarding equipment.',
        'Impersonation of international remote staffing recruiters offering high hourly wages without screening tests.',
        'Unverified third-party websites claiming to sell TestGorilla answer keys for Alignerr screening.',
      ],
    },
    faqs: [
      {
        q: 'Can Ghanaians get paid through Deel and Outlier?',
        a: 'Yes. Deel supports withdrawals directly to Ghanaian bank accounts and mobile money wallets, and Outlier supports AirTM and PayPal.',
      },
    ],
  },
};

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  return [
    { country: 'us' },
    { country: 'united-states' },
    { country: 'uk' },
    { country: 'gb' },
    { country: 'united-kingdom' },
    { country: 'ca' },
    { country: 'canada' },
    { country: 'in' },
    { country: 'india' },
    { country: 'ph' },
    { country: 'philippines' },
    { country: 'ke' },
    { country: 'kenya' },
    { country: 'gh' },
    { country: 'ghana' },
  ];
}

function resolveCountryCode(slug: string): string | null {
  const clean = slug.trim().toUpperCase();
  if (COUNTRY_HUBS[clean]) return clean;

  const mapping: Record<string, string> = {
    US: 'US',
    'UNITED-STATES': 'US',
    USA: 'US',
    UK: 'GB',
    GB: 'GB',
    'UNITED-KINGDOM': 'GB',
    CA: 'CA',
    CANADA: 'CA',
    IN: 'IN',
    INDIA: 'IN',
    PH: 'PH',
    PHILIPPINES: 'PH',
    KE: 'KE',
    KENYA: 'KE',
    GH: 'GH',
    GHANA: 'GH',
  };

  return mapping[clean] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country } = await params;
  const code = resolveCountryCode(country);

  if (!code || !COUNTRY_HUBS[code]) {
    return {
      title: 'Country Hub Not Found | TraceBase',
    };
  }

  const hub = COUNTRY_HUBS[code];
  const articleName = countryLabel(code, 'withArticle');

  return {
    title: `AI Work in ${hub.name}: Verified Platforms, Payouts & Taxes | TraceBase`,
    description: `Independent verification of remote AI training roles, confirmed platforms, and contractor tax basics for people in ${articleName}.`,
    alternates: {
      canonical: `/countries/${hub.slug}`,
    },
    robots: !hub.isPublished
      ? {
          index: false,
          follow: false,
        }
      : undefined,
    openGraph: {
      title: `AI Work in ${hub.name} | TraceBase Country Hub`,
      description: `Verified platforms and local contractor realities for ${hub.name}.`,
      url: `/countries/${hub.slug}`,
      type: 'website',
    },
  };
}

export default async function DynamicCountryHubPage({ params }: Props) {
  const { country } = await params;
  const code = resolveCountryCode(country);

  if (!code || !COUNTRY_HUBS[code]) {
    notFound();
  }

  const hub = COUNTRY_HUBS[code];
  const articleName = countryLabel(code, 'withArticle');

  // Block 1: Open verified roles
  const openRoles = dbRepository.getJobs({ status: 'verified', country: code });

  // Block 2 & 3: Platforms that accept vs do not accept or unconfirmed
  const platforms = dbRepository.getPlatforms();
  const acceptedPlatforms: Array<{ name: string; slug: string; note: string }> = [];
  const unconfirmedPlatforms: Array<{ name: string; slug: string; status: string }> = [];

  for (const p of platforms) {
    const elig = dbRepository.getPlatformCountryEligibility(p.slug, code);
    if (elig && elig.eligibilityStatus === 'accepted') {
      acceptedPlatforms.push({
        name: p.name,
        slug: p.slug,
        note: elig.sourceUrl ? 'Verified via employer portal' : 'Reported active',
      });
    } else {
      unconfirmedPlatforms.push({
        name: p.name,
        slug: p.slug,
        status: elig ? elig.eligibilityStatus.replace('_', ' ') : 'unconfirmed',
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      <BreadcrumbListJsonLd
        items={[
          { name: 'Home', item: '/' },
          { name: 'Country Hubs', item: '/countries' },
          { name: hub.name, item: `/countries/${hub.slug}` },
        ]}
      />

      {/* Draft Warning Banner */}
      {!hub.isPublished && (
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <div className="space-y-0.5">
            <span className="font-bold block font-mono text-[11px] text-amber-400">
              Draft country hub, not published
            </span>
            <p className="text-amber-200/90 leading-relaxed">
              This country hub shell contains structured outlines and sample placeholders. It is excluded from the sitemap and set to noindex until editorial review.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="space-y-4 border-b border-rule pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-secondary">
          <Link href="/jobs" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Work Hub
          </Link>
          <span>/</span>
          <Link href="/countries" className="hover:text-ink transition-colors min-h-[44px] inline-flex items-center">
            Country Hubs
          </Link>
          <span>/</span>
          <span className="text-ink font-medium">{hub.name}</span>
        </div>

        <div className="flex items-center gap-3.5">
          <span className="text-3xl sm:text-4xl" role="img" aria-label={`${hub.name} flag`}>
            {hub.flag}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                AI Work in {hub.name}: Verified Platforms &amp; Contractor Playbook
              </h1>
              <SampleBadge />
            </div>
            <p className="text-xs text-secondary mt-1 flex items-center gap-2 font-mono">
              <span>Country code: {hub.code}</span>
              <span>&bull;</span>
              <span>Priority {hub.priority} Region</span>
            </p>
          </div>
        </div>

        {/* SAMPLE Banner */}
        <div className="p-3.5 rounded-xl border border-rule bg-surface text-secondary text-xs flex items-start gap-2.5">
          <SampleBadge />
          <p className="leading-relaxed">
            All banking fee estimates, tax outlines, and regional guides below are illustrative sample entries pending primary official source documentation.
          </p>
        </div>
      </section>

      {/* BLOCK 1: Open Roles for this Country */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-ink">
            Open Verified Roles for {articleName}
          </h2>
          <span className="text-xs font-mono text-secondary">
            {openRoles.length} role{openRoles.length === 1 ? '' : 's'} verified
          </span>
        </div>

        {openRoles.length > 0 ? (
          <div className="grid grid-cols-1 gap-3">
            {openRoles.map((job) => {
              const elig = job.eligibility.find((e) => e.country_code === hub.code);
              return (
                <JobCard
                  key={job.id}
                  id={job.id}
                  slug={job.slug}
                  title={job.title}
                  platform={job.platform.name}
                  countryCode={hub.code}
                  countryEligibility={elig?.status}
                  verifiedPay={job.pay_text}
                  daysAgo={job.daysAgo || 2}
                  status={job.status}
                  isClosed={job.status === 'closed'}
                />
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-xl border border-rule bg-sheet text-center space-y-2 text-xs text-secondary">
            <p className="font-semibold text-ink">No active verified roles exclusively tied to {hub.name} today.</p>
            <p>Our team rechecks official ATS feeds every 14 days. Check back or subscribe below for alerts.</p>
          </div>
        )}
      </section>

      {/* BLOCK 2 & 3: Platforms That Accept vs Do Not Accept */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-ink">
          Platform Eligibility for {hub.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Accepts */}
          <div className="p-5 rounded-xl border border-[#17663F]/30 bg-[#17663F]/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#17663F] font-mono">
              <CheckCircle2 size={15} />
              <span>Platforms that accept {hub.name}</span>
            </div>
            {acceptedPlatforms.length > 0 ? (
              <ul className="space-y-2 text-xs text-ink">
                {acceptedPlatforms.map((p) => (
                  <li key={p.slug} className="flex items-center justify-between border-b border-[#17663F]/10 pb-1.5">
                    <Link href={`/platforms/${p.slug}`} className="font-medium hover:underline">
                      {p.name}
                    </Link>
                    <span className="text-[11px] text-[#17663F] font-mono">{p.note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-secondary italic">No platforms currently confirmed active for {hub.name}.</p>
            )}
          </div>

          {/* Does not accept or unconfirmed */}
          <div className="p-5 rounded-xl border border-rule bg-sheet space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-secondary font-mono">
              <XCircle size={15} />
              <span>Unconfirmed or geographic restrictions</span>
            </div>
            <ul className="space-y-2 text-xs text-secondary">
              {unconfirmedPlatforms.map((p) => (
                <li key={p.slug} className="flex items-center justify-between border-b border-rule pb-1.5">
                  <Link href={`/platforms/${p.slug}`} className="hover:text-ink font-medium">
                    {p.name}
                  </Link>
                  <span className="text-[11px] text-tertiary capitalize font-mono">{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* BLOCK 4: Payout & Tax Framework (SAMPLE) */}
      <section className="p-6 rounded-xl border border-rule bg-sheet space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5A35C8]">
            <Landmark size={16} />
            <span>{hub.payoutPlaybook.title}</span>
          </div>
          <SampleBadge />
        </div>

        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          {hub.payoutPlaybook.description}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {hub.payoutPlaybook.rails.map((rail, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-border-default bg-surface space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{rail.name}</span>
                <span className="text-[10px] font-mono text-[#5A35C8] bg-[#5A35C8]/10 px-1.5 py-0.5 rounded">
                  {rail.tag}
                </span>
              </div>
              <p className="text-secondary leading-relaxed">{rail.details}</p>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-lg border border-rule bg-surface/50 text-xs text-secondary space-y-1">
          <span className="font-semibold text-ink block font-mono text-[11px]">
            Contractor tax note
          </span>
          <p className="leading-relaxed">{hub.payoutPlaybook.taxNote}</p>
        </div>
      </section>

      {/* BLOCK 5: Common Scams in Region (SAMPLE) */}
      <section className="p-6 rounded-xl border border-[#A8322A]/20 bg-[#A8322A]/5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A8322A]/20 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A8322A]">
            <ShieldAlert size={16} />
            <span>{hub.scamsPlaybook.title}</span>
          </div>
          <SampleBadge />
        </div>

        <p className="text-xs text-secondary leading-relaxed">
          {hub.scamsPlaybook.description}
        </p>

        <div className="space-y-2">
          {hub.scamsPlaybook.commonTactics.map((tactic, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-ink">
              <AlertTriangle size={14} className="text-[#A8322A] shrink-0 mt-0.5" />
              <span>{tactic}</span>
            </div>
          ))}
        </div>
      </section>

      {/* BLOCK 6: FAQ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-ink font-mono">
          <HelpCircle size={15} className="text-[#5A35C8]" />
          <span>Frequently asked questions: {hub.name}</span>
        </div>

        <div className="space-y-3">
          {hub.faqs.map((faq, idx) => (
            <details key={idx} className="border border-rule bg-sheet rounded-xl p-4 sm:p-5 group">
              <summary className="cursor-pointer text-xs sm:text-sm font-semibold text-ink flex items-center justify-between select-none">
                <span>{faq.q}</span>
                <span className="text-[#5A35C8] text-xs group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <div className="pt-3 mt-3 border-t border-rule text-xs sm:text-sm text-secondary leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* BLOCK 7: Alerts */}
      <section className="space-y-4">
        <EmailCapture
          headline={`Get verified AI roles open to ${articleName}`}
          subtext="Human-checked weekly updates. Zero spam, unsubscribe in one click."
          source={`country_hub_${code.toLowerCase()}`}
        />
      </section>
    </div>
  );
}
