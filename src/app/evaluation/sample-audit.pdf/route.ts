import { NextResponse } from 'next/server';

export async function GET() {
  // Generate a valid, clean, single-page PDF-1.4 document
  const pdfLines = [
    'BT',
    '/F1 18 Tf',
    '50 740 Td',
    '(TraceBase Evaluation Studio) Tj',
    '/F1 12 Tf',
    '0 -24 Td',
    '(Sample Audit Summary: Technical Documentation RAG Benchmark) Tj',
    '/F1 9 Tf',
    '0 -16 Td',
    '(Rubric Version 1.0.0 | Illustrative Benchmark Report | Verified by TraceBase) Tj',
    '0 -24 Td',
    '(/--------------------------------------------------------------------------------------------------------------------------) Tj',
    '0 -14 Td',
    '(Case 1: PostgreSQL Serializable Isolation Failure | Verdict: PASS) Tj',
    '0 -11 Td',
    '(  Query: Does SSI eliminate phantom reads without table locks? | Citation: PostgreSQL 16 Docs s13.2.3) Tj',
    '0 -11 Td',
    '(  Findings: Correctly cited predicate locking mechanisms. Zero hallucinated flags.) Tj',
    '0 -16 Td',
    '(Case 2: Stripe PaymentIntent Idempotency Handling | Verdict: FAIL [Deprecation]) Tj',
    '0 -11 Td',
    '(  Query: How do you handle idempotency key retries for PaymentIntents? | Citation: Charges API (Legacy)) Tj',
    '0 -11 Td',
    '(  Findings: Model cited deprecated v1 charges endpoint instead of modern PaymentIntents lifecycle.) Tj',
    '0 -16 Td',
    '(Case 3: Next.js App Router Server Action Boundaries | Verdict: PASS) Tj',
    '0 -11 Td',
    '(  Query: Can server actions be invoked directly from Client Components? | Citation: Next.js Docs) Tj',
    '0 -11 Td',
    '(  Findings: Correctly verified "use server" boundary directive and POST serialization rules.) Tj',
    '0 -16 Td',
    '(Case 4: AWS Bedrock Guardrail Concurrency Limits | Verdict: FAIL [Hallucination]) Tj',
    '0 -11 Td',
    '(  Query: How to configure cross-region guardrail fallback in Bedrock? | Citation: Bedrock Docs) Tj',
    '0 -11 Td',
    '(  Findings: Model invented "cross_region_fallback=true" configuration parameter not in AWS docs.) Tj',
    '0 -16 Td',
    '(Case 5: Tailwind CSS Arbitrary Variant Syntax | Verdict: PASS) Tj',
    '0 -11 Td',
    '(  Query: How to target nested data attributes with arbitrary variants? | Citation: Tailwind v3 Docs) Tj',
    '0 -11 Td',
    '(  Findings: Verified &[data-state=open] selector syntax against JIT specification.) Tj',
    '0 -24 Td',
    '(/--------------------------------------------------------------------------------------------------------------------------) Tj',
    '/F1 10 Tf',
    '0 -18 Td',
    '(Core Methodology & Commercial Scope:) Tj',
    '/F1 9 Tf',
    '0 -13 Td',
    '(- Traceable Evidence: Every verdict cross-referenced against line-level developer documentation.) Tj',
    '0 -11 Td',
    '(- Zero Black-Box Scores: Actionable defect taxonomies covering retrieval, prompt, and ingestion bugs.) Tj',
    '0 -11 Td',
    '(- Evaluation Pilots: Standard 100-300 test pair calibration sprints. Turnaround in 5 working days.) Tj',
    '0 -18 Td',
    '(Book an audit scoping call: https://tracebase.work/evaluation/scope | Contact: hello@tracebase.work) Tj',
    'ET',
  ];

  const streamContent = pdfLines.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf-8');

  const pdfBody = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Resources <<
    /Font <<
      /F1 4 0 R
    >>
  >>
  /Contents 5 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
5 0 obj
<< /Length ${streamLength} >>
stream
${streamContent}
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000257 00000 n 
0000000336 00000 n 
trailer
<<
  /Size 6
  /Root 1 0 R
>>
startxref
${420 + streamLength}
%%EOF`;

  return new NextResponse(pdfBody, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="tracebase-sample-audit.pdf"',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
