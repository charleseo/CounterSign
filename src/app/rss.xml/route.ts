import { dbRepository } from '@/lib/db/repository';
import { getAllGuides } from '@/content/guides';
import { getSiteUrl } from '@/lib/utils/siteUrl';

function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = getSiteUrl();
  const verifiedJobs = dbRepository.getJobs({ status: 'verified' });
  const guides = getAllGuides();

  const now = new Date().toUTCString();

  const jobItems = verifiedJobs.map((job) => {
    const cleanTitle = job.title.replace(/\[SAMPLE\]/g, '').trim();
    const cleanPlatform = job.platform.name.replace(/\[SAMPLE\]/g, '').trim();
    const cleanSummary = job.summary.replace(/\[SAMPLE\]/g, '').trim();
    const pubDate = new Date(job.created_at).toUTCString();
    const link = `${baseUrl}/jobs/${job.slug}`;

    return `    <item>
      <title>${escapeXml(`${cleanTitle} at ${cleanPlatform}`)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(`${cleanSummary} Work type: ${job.work_type}. Verified status: active.`)}</description>
    </item>`;
  });

  const guideItems = guides.map((guide) => {
    const link = `${baseUrl}/guides/${guide.slug}`;
    const pubDate = new Date(guide.lastUpdated).toUTCString();

    return `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(guide.subtitle)}</description>
    </item>`;
  });

  const allItems = [...jobItems, ...guideItems].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TraceBase | Verified AI Roles &amp; Platform Intelligence</title>
    <link>${escapeXml(baseUrl)}</link>
    <description>Independent, human-verified remote AI work listings, platform reality profiles, and evaluation playbooks.</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${escapeXml(baseUrl)}/rss.xml" rel="self" type="application/rss+xml"/>
${allItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
