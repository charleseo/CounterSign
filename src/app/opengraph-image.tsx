import { ImageResponse } from 'next/og';

export const alt = 'Countersign | Human-Verified AI Work Hub & Model Evaluation Studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
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
          {/* Logo Mark & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '2px solid #00f2fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0, 242, 254, 0.1)',
                color: '#00f2fe',
                fontSize: '24px',
                fontWeight: 800,
              }}
            >
              CS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '28px',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  color: '#ffffff',
                }}
              >
                COUNTERSIGN
              </span>
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#00f2fe',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Independent Verification Hub
              </span>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
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
            HUMAN-CHECKED AI ROLES
          </div>
        </div>

        {/* Central Hero Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '980px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            <span>Legitimate Remote AI Work.</span>
            <span style={{ color: '#00f2fe' }}>Verified by Humans.</span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            Every listing verified against official employer applicant systems. Transparent country eligibility, confirmed pay rates, and realistic onboarding timelines.
          </div>
        </div>

        {/* Bottom Trust Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '28px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                }}
              />
              <span style={{ fontSize: '15px', color: '#cbd5e1', fontFamily: 'monospace' }}>
                14-Day Recheck Cycle
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#00f2fe',
                }}
              />
              <span style={{ fontSize: '15px', color: '#cbd5e1', fontFamily: 'monospace' }}>
                Zero Scraping
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#a855f7',
                }}
              />
              <span style={{ fontSize: '15px', color: '#cbd5e1', fontFamily: 'monospace' }}>
                Model Evaluation Studio
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: 'monospace',
              color: '#64748b',
            }}
          >
            countersign.ai
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
