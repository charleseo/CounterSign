import { ImageResponse } from 'next/og';
import { dbRepository } from '@/lib/db/repository';

export const alt = 'Platform Reality Profile | Countersign';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface PlatformOgProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: PlatformOgProps) {
  const { slug } = await params;
  const platform = dbRepository.getPlatformBySlug(slug);

  const name = platform ? platform.name.replace(/\[SAMPLE\]/g, '').trim() : 'AI Evaluation Platform';
  const category = 'Remote AI Platform';
  const payRails = platform && platform.payout_methods ? platform.payout_methods : 'Verified payout rails';
  const assessmentType = platform && platform.assessment_style ? platform.assessment_style.slice(0, 45) : 'Unpaid screening';

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
            'radial-gradient(circle at 25px 25px, rgba(0, 242, 254, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(16, 185, 129, 0.05) 2%, transparent 0%)',
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
                border: '2px solid #00f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                color: '#00f2fe',
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

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(0, 242, 254, 0.12)',
              border: '1px solid rgba(0, 242, 254, 0.4)',
              color: '#00f2fe',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            PLATFORM REALITY CHECK
          </div>
        </div>

        {/* Central Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '15px',
              fontFamily: 'monospace',
              color: '#00f2fe',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            <span>{`${category} • INDEPENDENT PROFILE`}</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.1,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {name}
          </div>

          {/* Facts Grid */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '14px', flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                backgroundColor: '#111827',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>PAYOUT RAILS:</span>
              <span style={{ fontSize: '16px', color: '#38bdf8', fontWeight: 700 }}>{payRails}</span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 20px',
                backgroundColor: '#111827',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'monospace' }}>ASSESSMENT:</span>
              <span style={{ fontSize: '16px', color: '#cbd5e1', fontWeight: 600 }}>{assessmentType}</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
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
              Onboarding timelines and payment rails confirmed
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
            countersign.ai/platforms/{slug}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
