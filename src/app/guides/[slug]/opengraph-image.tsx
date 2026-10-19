import { ImageResponse } from 'next/og';
import { getGuideBySlug } from '@/content/guides';
import { getSiteHost } from '@/lib/utils/siteUrl';

export const alt = 'Practical Guide for Remote AI Work | TraceBase';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

interface GuideOgProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: GuideOgProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  const title = guide ? guide.title : 'Practical Guide for Remote AI Work';
  const subtitle = guide ? guide.subtitle : 'Tactical playbook for remote AI evaluators and alignment specialists.';
  const readingTime = guide ? guide.readingTime : '5 min read';
  const authorName = guide ? guide.author.name : 'Ebubechukwu Okeke';

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
            'radial-gradient(circle at 25px 25px, rgba(0, 242, 254, 0.08) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(168, 85, 247, 0.05) 2%, transparent 0%)',
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

          {/* Guide Tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(168, 85, 247, 0.15)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              color: '#c084fc',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            PRACTICAL PLAYBOOK
          </div>
        </div>

        {/* Central Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '14px',
                fontFamily: 'monospace',
                color: '#00f2fe',
                letterSpacing: '0.1em',
              }}
            >
              READING TIME: {readingTime.toUpperCase()}
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                fontFamily: 'monospace',
              }}
            >
              BY {authorName.toUpperCase()}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: title.length > 55 ? '40px' : '48px',
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '20px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '850px',
            }}
          >
            {subtitle}
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
                backgroundColor: '#00f2fe',
              }}
            />
            <span style={{ fontSize: '14px', color: '#94a3b8', fontFamily: 'monospace' }}>
              Free verified guide. Never sponsored.
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
            {getSiteHost()}/guides/{slug}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
