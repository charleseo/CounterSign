import { ImageResponse } from 'next/og';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const alt = 'Job Offer Scam Check | TraceBase';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0c0e14',
          padding: '60px 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
          border: '12px solid #1a1e29',
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
                backgroundColor: 'rgba(90, 53, 200, 0.15)',
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

          {/* Verification Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(90, 53, 200, 0.15)',
              border: '1px solid rgba(90, 53, 200, 0.4)',
              color: '#8b6cf7',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            10-POINT RADAR
          </div>
        </div>

        {/* Central Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <div
            style={{
              display: 'flex',
              fontSize: '52px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            AI Job Offer Scam Check
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#94a3b8',
              maxWidth: '900px',
            }}
          >
            Spot fee demands, check cashing, fake WhatsApp recruiters, and credential theft before you reply.
          </div>
        </div>

        {/* Footer Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid #1e293b',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '16px', color: '#64748b' }}>
              Free & anonymous • No signup required
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '15px',
              color: '#8b6cf7',
              fontWeight: 600,
            }}
          >
            {getSiteHost()}/scam-check
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
