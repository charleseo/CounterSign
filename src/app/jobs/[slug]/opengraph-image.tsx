import { ImageResponse } from 'next/og';
import { dbRepository } from '@/lib/db/repository';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const alt = 'Verified AI Work Role Details | TraceBase';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface JobOgProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: JobOgProps) {
  const { slug } = await params;
  const job = dbRepository.getJobBySlug(slug);

  const title = job ? job.title.replace(/\[SAMPLE\]/g, '').trim() : 'Verified Remote AI Work Role';
  const platformName = job ? job.platform.name.replace(/\[SAMPLE\]/g, '').trim() : 'Verified Platform';
  const workType = job ? job.work_type : 'AI Training & Evaluation';
  const payText = job && job.pay_verified && job.pay_text ? job.pay_text : 'Pay: not confirmed';
  const allCountries = dbRepository.getCountries();
  const acceptedCountryCodes = job
    ? job.eligibility.filter((e) => e.status === 'accepted').map((e) => e.country_code)
    : [];
  const countryNames = acceptedCountryCodes
    .map((code) => allCountries.find((c) => c.code === code)?.name || code)
    .join(', ');
  const countries = countryNames || 'Global Remote';
  const isClosed = job ? job.status === 'closed' : false;
  const isSample = job ? job.is_sample || job.title.includes('[SAMPLE]') : false;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#070a10',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(90, 53, 200, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          color: '#ffffff',
          border: '12px solid #0d1522',
        }}
      >
        {/* Top Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo Mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: '2px solid #5A35C8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(90, 53, 200, 0.1)',
                color: '#8b6cf7',
                fontSize: '20px',
                fontWeight: 800,
              }}
            >
              CS
            </div>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 900,
                letterSpacing: '0.08em',
                color: '#ffffff',
              }}
            >
              COUNTERSIGN
            </span>
          </div>

          {/* Verification / Sample Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: isSample
                ? 'rgba(148, 163, 184, 0.15)'
                : isClosed
                ? 'rgba(239, 68, 68, 0.15)'
                : 'rgba(16, 185, 129, 0.15)',
              border: `1px solid ${
                isSample
                  ? 'rgba(148, 163, 184, 0.4)'
                  : isClosed
                  ? 'rgba(239, 68, 68, 0.4)'
                  : 'rgba(16, 185, 129, 0.4)'
              }`,
              color: isSample ? '#94a3b8' : isClosed ? '#f87171' : '#34d399',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            {isSample ? 'SAMPLE ENTRY' : isClosed ? 'ROLE CLOSED' : 'HUMAN VERIFIED'}
          </div>
        </div>

        {/* Central Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          {/* Platform Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontFamily: 'monospace',
                color: '#00f2fe',
                letterSpacing: '0.05em',
                fontWeight: 700,
              }}
            >
              {platformName}
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span
              style={{
                fontSize: '15px',
                color: '#94a3b8',
                fontFamily: 'monospace',
              }}
            >
              {workType}
            </span>
          </div>

          {/* Job Title */}
          <div
            style={{
              display: 'flex',
              fontSize: title.length > 50 ? '42px' : '50px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>

          {/* Key Facts Pill Grid */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 18px',
                backgroundColor: '#111827',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>PAY:</span>
              <span style={{ fontSize: '16px', color: '#38bdf8', fontWeight: 700 }}>{payText}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 18px',
                backgroundColor: '#111827',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>ELIGIBILITY:</span>
              <span style={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 600 }}>
                {countries.length > 40 ? `${countries.slice(0, 40)}...` : countries}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            <span style={{ fontSize: '14px', color: '#94a3b8', fontFamily: 'monospace' }}>
              Checked directly against employer portal
            </span>
          </div>

          <span
            style={{
              fontSize: '15px',
              fontFamily: 'monospace',
              color: '#00f2fe',
              fontWeight: 700,
            }}
          >
            {getSiteHost()}/jobs/{slug}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
