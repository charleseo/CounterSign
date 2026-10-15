import { NextRequest, NextResponse } from 'next/server';
import { dbRepository } from '@/lib/db/repository';


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Look up job by ID or slug
  const job = dbRepository.getJobById(id) || dbRepository.getJobBySlug(id);

  if (!job) {
    // If not found, redirect back to jobs directory
    return NextResponse.redirect(new URL('/jobs', request.url), 302);
  }

  // Read the country chip value from cookie or header (never IP / geolocation)
  const countryCookie = request.cookies.get('countersign_country')?.value;
  const coarseCountryCode = countryCookie ? countryCookie.toUpperCase().slice(0, 2) : 'NG';

  // 1. Log anonymous click safely inside try/catch so logging errors NEVER block the redirect
  try {
    dbRepository.logOutboundClick(job.id, job.link, coarseCountryCode);
  } catch (err) {
    // Log failure must never block the outbound applicant redirect
    console.error('Anonymous click logging failed:', err);
  }

  // 2. Perform 302 redirect to the official verified application URL OUTSIDE try/catch
  const destination = job.apply_url || job.official_url;
  const response = NextResponse.redirect(destination, 302);

  // Prevent search engine indexing of redirect route
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  response.headers.set('Cache-Control', 'no-store, max-age=0');

  return response;
}
