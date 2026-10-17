import { NextResponse } from 'next/server';
import { SAMPLE_AUDIT_CASES, SAMPLE_AUDIT_METADATA } from '@/content/evaluation/sample-audit';

export async function GET() {
  const payload = {
    metadata: {
      ...SAMPLE_AUDIT_METADATA,
      exportedAt: new Date().toISOString(),
      format: 'TraceBase Evaluation Studio Case Audit Benchmark v1',
    },
    cases: SAMPLE_AUDIT_CASES,
  };

  return NextResponse.json(payload, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="countersign-sample-audit-v1.json"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
