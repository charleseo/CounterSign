import type { MetadataRoute } from 'next';
import { dbRepository } from '@/lib/db/repository';
import { getAllGuides } from '@/content/guides';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://countersign.ai';
  const now = new Date();

  // Core static routes
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
  ];

  // Verified Job detail routes
  const jobs = dbRepository.getJobs({ status: 'all' });
  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.slug}`,
    lastModified: job.last_checked_at ? new Date(job.last_checked_at) : now,
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Platform reality profile routes
  const platforms = dbRepository.getPlatforms();
  const platformRoutes: MetadataRoute.Sitemap = platforms.map((platform) => ({
    url: `${baseUrl}/platforms/${platform.slug}`,
    lastModified: platform.last_reviewed_at
      ? new Date(platform.last_reviewed_at)
      : new Date(platform.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Guide routes
  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: guide.lastUpdated ? new Date(guide.lastUpdated) : now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...jobRoutes, ...platformRoutes, ...guideRoutes];
}
