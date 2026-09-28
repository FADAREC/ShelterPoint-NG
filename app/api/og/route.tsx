import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

function formatNaira(n: number): string {
  if (!Number.isFinite(n) || n < 0) return '₦0';
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const rent = Number(searchParams.get('rent') || 0);
  const dayOne = Number(searchParams.get('dayOne') || 0);
  const unrecoverable = Number(searchParams.get('unrecoverable') || 0);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '56px 64px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: 16,
            }}
          >
            ShelterCheck by ShelterPoint
          </div>
          <div
            style={{
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Real move-in cost before you pay anyone
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.4)' }}>
              Cash needed on day one
            </div>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                marginTop: 4,
              }}
            >
              {formatNaira(dayOne)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 48 }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
                Annual rent quoted
              </div>
              <div style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>
                {formatNaira(rent)}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.4)' }}>
                Likely not recoverable
              </div>
              <div style={{ fontSize: 28, fontWeight: 600, marginTop: 4 }}>
                {formatNaira(unrecoverable)}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          Not legal advice · Lagos Tenancy Law 2011 is current law
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
