import { NextRequest, NextResponse } from 'next/server';
import { runJobSweeper } from '@/lib/db/sweeper';

export async function GET(req: NextRequest) {
  // Authorize cron secret if configured
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runJobSweeper('system-cron-sweeper');
  return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
  return GET(req);
}
