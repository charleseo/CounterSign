import React from 'react';
import { getSiteUrl } from '@/lib/utils/siteUrl';

/**
 * Organization & WebSite Structured Data (Schema.org)
 * Placed in root layout for broad search engine understanding and SearchAction integration.
 */
export function OrganizationAndWebsiteJsonLd() {
  const baseUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'TraceBase',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/favicon.ico`,
        },
        founder: {
          '@type': 'Person',
          name: 'Ebubechukwu Okeke',
          jobTitle: 'Founder & Principal Evaluator',
        },
        description:
          'Independent human-verified AI work hub and precision model evaluation studio.',
        sameAs: [
          'https://x.com/tracebase_ai',
          'https://github.com/tracebase',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'TraceBase',
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/jobs?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Structured Data
 */
export interface BreadcrumbItem {
  name: string;
  item: string;
}

export function BreadcrumbListJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const baseUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${baseUrl}${item.item}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Article Structured Data for Guides
 */
export interface ArticleJsonLdProps {
  headline: string;
  description: string;
  datePublished: string;
  authorName: string;
  url: string;
}

export function ArticleJsonLd({
  headline,
  description,
  datePublished,
  authorName,
  url,
}: ArticleJsonLdProps) {
  const baseUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TraceBase',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${baseUrl}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Structured Data (Only where FAQs are visibly present on the page)
 */
export interface FAQItem {
  q: string;
  a: string;
}

export function FAQPageJsonLd({ faqs }: { faqs: FAQItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * JobPosting Structured Data (Feature Flagged: OFF by default)
 * STRICT RULES:
 * 1. Only on single job detail pages, NEVER on list pages.
 * 2. Only active when NEXT_PUBLIC_ENABLE_JOB_POSTING_SCHEMA === 'true'.
 * 3. Closed jobs do not emit valid active postings.
 */
export interface JobPostingJsonLdProps {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType: string;
  hiringOrganizationName: string;
  hiringOrganizationUrl: string;
  isTelecommute?: boolean;
  applicantLocationCountry?: string;
  isClosed?: boolean;
}

export function JobPostingJsonLd({
  title,
  description,
  datePosted,
  validThrough,
  employmentType,
  hiringOrganizationName,
  hiringOrganizationUrl,
  isTelecommute = true,
  applicantLocationCountry,
  isClosed = false,
}: JobPostingJsonLdProps) {
  // Feature flag check: OFF by default
  const isEnabled =
    process.env.NEXT_PUBLIC_ENABLE_JOB_POSTING_SCHEMA === 'true' ||
    process.env.NEXT_PUBLIC_ENABLE_JOB_POSTING_LD === 'true';

  if (!isEnabled || isClosed) {
    return null;
  }

  // Map employment type string to schema.org Enum
  const formatEmploymentType = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('contract')) return 'CONTRACTOR';
    if (lower.includes('part-time') || lower.includes('part time')) return 'PART_TIME';
    if (lower.includes('full-time') || lower.includes('full time')) return 'FULL_TIME';
    if (lower.includes('freelance')) return 'CONTRACTOR';
    return 'OTHER';
  };

  const defaultValidThrough =
    validThrough ||
    new Date(new Date(datePosted).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    validThrough: defaultValidThrough,
    employmentType: formatEmploymentType(employmentType),
    hiringOrganization: {
      '@type': 'Organization',
      name: hiringOrganizationName,
      sameAs: hiringOrganizationUrl,
    },
  };

  if (isTelecommute) {
    schema.jobLocationType = 'TELECOMMUTE';
  }

  if (applicantLocationCountry) {
    schema.applicantLocationRequirements = {
      '@type': 'Country',
      name: applicantLocationCountry,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
