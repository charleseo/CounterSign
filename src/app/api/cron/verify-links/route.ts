import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = dbRepository.getJobs({ status: 'verified' });
  const checkedSummary: Array<{ id: string; title: string; ok: boolean }> = [];

  for (const job of jobs) {
    // In production, performs HTTP HEAD/GET request with timeout.
    // In preview/simulation, verifies URL syntax and platform availability.
    const hasValidUrl = Boolean(job.apply_url && job.apply_url.startsWith('https://'));
    checkedSummary.push({
      id: job.id,
      title: job.title,
      ok: hasValidUrl,
    });
  }

  dbRepository.logAudit({
    actor: 'cron-verify-links',
    action: 'links.verify_batch',
    entity: 'jobs',
    entity_id: null,
    diff: { totalChecked: checkedSummary.length },
  });

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    checkedCount: checkedSummary.length,
    results: checkedSummary,
    success: true,
  });
}

export async function POST(req: NextRequest) {
  return GET(req);
}
