import { NextResponse } from 'next/server';
import { SAMPLE_AUDIT_CASES } from '@/content/evaluation/sample-audit';

function escapeCsvField(val: string | number): string {
  const str = String(val ?? '');
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const headers = [
    'Case ID',
    'Case Number',
    'Rubric Version',
    'Model Name',
    'Model Version',
    'Run Date',
    'Document Title',
    'Document URL',
    'Document Section',
    'Source Access Date',
    'Prompt',
    'Model Output',
    'Verdict',
    'Verdict Label',
    'Severity',
    'Root Cause',
    'Recommended Fix',
  ];

  const rows = SAMPLE_AUDIT_CASES.map((c) => [
    escapeCsvField(c.id),
    escapeCsvField(c.caseNumber),
    escapeCsvField(c.rubricVersion),
    escapeCsvField(c.model.name),
    escapeCsvField(c.model.version),
    escapeCsvField(c.model.runDate),
    escapeCsvField(c.source.documentTitle),
    escapeCsvField(c.source.url),
    escapeCsvField(c.source.section),
    escapeCsvField(c.source.accessDate),
    escapeCsvField(c.prompt),
    escapeCsvField(c.modelOutput),
    escapeCsvField(c.verdict),
    escapeCsvField(c.verdictLabel),
    escapeCsvField(c.severity),
    escapeCsvField(c.rootCause),
    escapeCsvField(c.recommendedFix),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="countersign-sample-audit-v1.csv"',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
