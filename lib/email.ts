import { Resend } from 'resend';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) {
    resendClient = new Resend(key);
  }
  return resendClient;
}

interface WelcomeEmailData {
  name: string;
  email: string;
  role: string;
  area: string;
  spotNumber: number;
  referralCode?: string;
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const resend = getResend();
    if (!resend) {
      console.error('Email skipped: RESEND_API_KEY is not set');
      return { success: false, error: 'RESEND_API_KEY missing' };
    }

    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) {
      console.error('Email skipped: RESEND_FROM_EMAIL is not set');
      return { success: false, error: 'RESEND_FROM_EMAIL missing' };
    }

    const { data: emailData, error } = await resend.emails.send({
      from: `ShelterPoint <${from}>`,
      to: data.email,
      subject: `You are in. Founding member #${data.spotNumber}`,
      html: generateWelcomeEmailHTML(data),
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error('Email service error:', error);
    return { success: false, error };
  }
}

function generateWelcomeEmailHTML(data: WelcomeEmailData): string {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://shelterpoint-ng.onrender.com';
  const welcomeLink = `${siteUrl}/welcome?spot=${data.spotNumber}${data.referralCode ? `&ref=${data.referralCode}` : ''}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ShelterPoint</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #111111; border-radius: 12px; overflow: hidden;">
          <tr>
            <td style="padding: 36px 30px; text-align: center; border-bottom: 1px solid #222;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 600;">ShelterPoint</h1>
              <p style="color: #888; margin: 8px 0 0 0; font-size: 13px;">Founding member access</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="color: #ffffff; margin: 0 0 16px 0; font-size: 20px;">You are in, ${data.name}</h2>
              <p style="color: #bbbbbb; line-height: 1.6; margin: 0 0 20px 0;">
                You are founding member <strong style="color:#fff">#${data.spotNumber}</strong> on the private waitlist.
              </p>
              <div style="background-color: #1a1a1a; border-left: 3px solid #ffffff; padding: 16px; margin: 0 0 24px 0;">
                <p style="color: #ffffff; margin: 0 0 8px 0; font-weight: 600; font-size: 14px;">What you locked in</p>
                <p style="color: #aaaaaa; margin: 0; line-height: 1.6; font-size: 14px;">
                  Priority access at launch<br>
                  Founding member rate (4% instead of 7% on first rental)<br>
                  Inspection credits when friends join through you
                </p>
              </div>
              <p style="color: #bbbbbb; line-height: 1.6; margin: 0 0 20px 0;">
                Complete your profile so we can match you, then share your link for free inspection credits.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <a href="${welcomeLink}" style="display: inline-block; background-color: #ffffff; color: #000000; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      Complete profile
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #777; line-height: 1.6; margin: 24px 0 0 0; font-size: 13px;">
                Questions? Reply to this email or write to hello@shelterpointng.com
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; text-align: center; border-top: 1px solid #222;">
              <p style="color: #555; margin: 0; font-size: 12px;">
                ShelterPoint · Lagos<br>
                <a href="${siteUrl}/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #555; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendAdminNotification(data: WelcomeEmailData) {
  try {
    const resend = getResend();
    const from = process.env.RESEND_FROM_EMAIL;
    const admin = process.env.ADMIN_EMAIL;
    if (!resend || !from || !admin) {
      console.error('Admin email skipped: missing RESEND or ADMIN_EMAIL');
      return;
    }

    await resend.emails.send({
      from: `ShelterPoint Notifications <${from}>`,
      to: admin,
      subject: `New founding member #${data.spotNumber}`,
      html: `
        <h2>New waitlist signup</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Area:</strong> ${data.area}</p>
        <p><strong>Spot:</strong> #${data.spotNumber}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-NG')}</p>
      `,
    });
  } catch (error) {
    console.error('Admin notification error:', error);
  }
}
