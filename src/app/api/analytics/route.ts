import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbRepository } from '@/lib/db/repository';

const eventSchema = z.object({
  event: z.string().min(1).max(100),
  path: z.string().max(255).optional(),
  properties: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parse = eventSchema.safeParse(json);

    if (!parse.success) {
      return NextResponse.json({ error: 'invalid_event' }, { status: 400 });
    }

    const { event, path, properties } = parse.data;

    // Filter out any potential sensitive PII keys (NDPA 2023)
    const sanitizedProps: Record<string, unknown> = {};
    if (properties) {
      for (const [k, v] of Object.entries(properties)) {
        if (!['email', 'name', 'password', 'token', 'ip', 'phone', 'address'].includes(k.toLowerCase())) {
          sanitizedProps[k] = v;
        }
      }
    }

    dbRepository.recordAnalyticsEvent({
      event,
      path: path || '/',
      properties: sanitizedProps,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
