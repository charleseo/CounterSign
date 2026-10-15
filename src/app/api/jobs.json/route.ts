import { NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';


export async function GET() {
  const jobs = dbRepository.getJobs();

  // Return a compact, lightweight JSON payload for the command palette and quick search
  const compactJobs = jobs.map((j) => ({
    id: j.id,
    slug: j.slug,
    title: j.title,
    platform: j.platform.name,
    work_type: j.work_type,
    status: j.status,
    daysAgo: j.daysAgo ?? 0,
    verifiedPay: j.pay_verified ? j.pay_text : null,
  }));

  return NextResponse.json(compactJobs, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
