import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { data: emailData, error } = await resend.emails.send({
      from: `ShelterPoint NG <${process.env.RESEND_FROM_EMAIL}>`,
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shelterpointng.com';
  const welcomeLink = `${siteUrl}/welcome?spot=${data.spotNumber}${data.referralCode ? `&ref=${data.referralCode}` : ''}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ShelterPoint NG</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F5F0E6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F5F0E6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.06);">
          
          <tr>
            <td style="background: linear-gradient(135deg, #C36F3D 0%, #7B4224 100%); padding: 36px 30px; text-align: center;">
              <h1 style="color: #F5F0E6; margin: 0; font-size: 28px; font-weight: bold;">ShelterPoint NG</h1>
              <p style="color: #F5F0E6; margin: 8px 0 0 0; font-size: 15px; opacity: 0.95;">Founding Member Access</p>
            </td>
          </tr>
          
          <tr>
            <td style="padding: 36px 30px;">
              <h2 style="color: #282521; margin: 0 0 16px 0; font-size: 22px;">You are in, ${data.name}</h2>
              
              <p style="color: #282521; line-height: 1.6; margin: 0 0 20px 0;">
                You are founding member <strong>#${data.spotNumber}</strong> on the private waitlist.
              </p>
              
              <div style="background-color: #F5F0E6; border-left: 4px solid #C36F3D; padding: 18px; margin: 0 0 24px 0; border-radius: 4px;">
                <p style="color: #282521; margin: 0 0 8px 0; font-weight: 600;">What you locked in:</p>
                <p style="color: #282521; margin: 0; line-height: 1.6; font-size: 15px;">
                  Priority access at launch<br>
                  Founding member rate (better than the standard 7%)<br>
                  First look at verified listings
                </p>
              </div>
              
              <p style="color: #282521; line-height: 1.6; margin: 0 0 20px 0;">
                Complete your profile so we can match you properly, then share your link to earn free inspection credits.
              </p>
              
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td align="center">
                    <a href="${welcomeLink}" style="display: inline-block; background-color: #C36F3D; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      Complete profile and get referral link
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #8D7A67; line-height: 1.6; margin: 24px 0 0 0; font-size: 14px;">
                Questions? Reply to this email or write to hello@shelterpointng.com
              </p>
              
              <p style="color: #282521; line-height: 1.6; margin: 20px 0 0 0;">
                Welcome to better Lagos housing.<br><br>
                <strong>The ShelterPoint NG Team</strong>
              </p>
            </td>
          </tr>
          
          <tr>
            <td style="background-color: #F5F0E6; padding: 24px 30px; text-align: center; border-top: 1px solid #DAD3BE;">
              <p style="color: #8D7A67; margin: 0 0 6px 0; font-size: 13px;">
                ShelterPoint NG. Proudly Lagos-based.
              </p>
              <p style="color: #8D7A67; margin: 0; font-size: 12px;">
                © 2026 ShelterPoint Nigeria Limited. NDPR Compliant.<br>
                <a href="${siteUrl}/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #8D7A67; text-decoration: underline;">Unsubscribe</a>
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
    await resend.emails.send({
      from: `ShelterPoint Notifications <${process.env.RESEND_FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      subject: `New founding member #${data.spotNumber}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Role:</strong> ${data.role}</p>
        <p><strong>Area:</strong> ${data.area}</p>
        <p><strong>Spot Number:</strong> #${data.spotNumber}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString('en-NG')}</p>
      `,
    });
  } catch (error) {
    console.error('Admin notification error:', error);
  }
}
