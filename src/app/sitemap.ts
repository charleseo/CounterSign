import type { MetadataRoute } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { getAllGuides } from '@/content/guides';
import { getSiteUrl } from '@/lib/utils/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  // Core public static routes
  // Explicitly excludes /account/*, /newsletter/*, and any draft hubs (including /countries/nigeria)
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/platforms`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scam-check`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/changes`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/official-channels`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/scams-this-week`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/evaluation/services/rag-and-citation-audit`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/services/technical-documentation-truth-audit`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/services/negative-constraint-and-refusal-boundary-analysis`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/sample-audit`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/methodology`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/scope`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy/request`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/corrections`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evaluation/evaluators`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Verified Job detail routes (Excludes drafts, samples, and closed roles per honesty rule)
  const jobs = dbRepository
    .getJobs({ status: 'verified' })
    .filter((job) => !job.is_sample && !job.title.includes('[SAMPLE]'));
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: job.last_checked_at ? new Date(job.last_checked_at) : now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Platform reality profile routes (Excludes samples)
  const platforms = dbRepository
    .getPlatforms()
    .filter((p) => !p.name.includes('[SAMPLE]') && !Boolean((p as { is_sample?: boolean }).is_sample));
  const platformRoutes: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: `${baseUrl}/platforms/${platform.slug}`,
    lastModified: platform.last_reviewed_at
      ? new Date(platform.last_reviewed_at)
      : new Date(platform.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Platform x Country routes (Strictly requires a verified check_log row and source URL)
  const platformCountryRoutes: MetadataRoute.Sitemap = [];
  const primaryCountries = ['ng', 'us', 'gb', 'ke', 'ca', 'gh'];
  const checkLogs = dbRepository.getCheckLogs();
  const verifiedPlatformIds = new Set(
    checkLogs.filter((log) => log.result === 'verified').map((log) => log.platform_id)
  );

  for (const platform of platforms) {
    if (!verifiedPlatformIds.has(platform.id)) continue;

    for (const code of primaryCountries) {
      const eligibility = dbRepository.getPlatformCountryEligibility(platform.slug, code.toUpperCase());
      if (
        eligibility &&
        eligibility.eligibilityStatus === 'accepted' &&
        Boolean(eligibility.sourceUrl)
      ) {
        platformCountryRoutes.push({
          url: `${baseUrl}/platforms/${platform.slug}/${code}`,
          lastModified: eligibility.checkedAt ? new Date(eligibility.checkedAt) : now,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      }
    }
  }

  // Published guide routes only (Draft templates strictly excluded)
  const guides = getAllGuides(false).filter((g) => g.published !== false);
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Published weekly scam radar posts only (excluding samples)
  const weeklyScams = dbRepository
    .getWeeklyScams(false)
    .filter((post) => !post.title.includes('[SAMPLE]'));
  const scamRoutes: MetadataRoute.Sitemap = weeklyScams.map((post) => ({
    url: `${baseUrl}/scams-this-week/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...jobRoutes,
    ...platformRoutes,
    ...platformCountryRoutes,
    ...guideRoutes,
    ...scamRoutes,
  ];
}
