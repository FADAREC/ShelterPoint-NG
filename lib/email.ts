import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailData {
  name: string;
  email: string;
  role: string;
  area: string;
  spotNumber: number;
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
  try {
    const { data: emailData, error } = await resend.emails.send({
      from: `ShelterPoint NG <${process.env.RESEND_FROM_EMAIL}>`,
      to: data.email,
      subject: `🎉 You're In! Welcome to ShelterPoint NG Beta`,
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
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to ShelterPoint NG</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #DAD3BE;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #DAD3BE; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #F5F0E6; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #C36F3D 0%, #7B4224 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #F5F0E6; margin: 0; font-size: 32px; font-weight: bold;">🏠 ShelterPoint NG</h1>
              <p style="color: #F5F0E6; margin: 10px 0 0 0; font-size: 16px;">Your Lagos Housing Journey Starts Here</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #282521; margin: 0 0 20px 0; font-size: 24px;">Welcome, ${data.name}! 🎉</h2>
              
              <p style="color: #282521; line-height: 1.6; margin: 0 0 20px 0;">
                You're officially on the ShelterPoint NG beta waitlist! You're spot <strong>#${data.spotNumber}</strong> in line.
              </p>
              
              <div style="background-color: #DAD3BE; border-left: 4px solid #C36F3D; padding: 20px; margin: 20px 0; border-radius: 4px;">
                <h3 style="color: #282521; margin: 0 0 10px 0; font-size: 18px;">Your Details:</h3>
                <p style="color: #282521; margin: 5px 0; line-height: 1.6;">
                  <strong>Looking to:</strong> ${data.role === 'seeker' ? 'Find a home' : data.role === 'owner' ? 'List property' : 'Both'}<br>
                  <strong>Preferred Area:</strong> ${data.area}<br>
                  <strong>Early Access Perks:</strong> 50% off first transaction
                </p>
              </div>
              
              <h3 style="color: #282521; margin: 30px 0 15px 0; font-size: 20px;">What Happens Next?</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #8D7A67;">
                    <div style="background-color: #C36F3D; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; float: left; margin-right: 15px;">1</div>
                    <p style="color: #282521; margin: 0; padding-top: 5px;"><strong>Beta Launch Notification</strong><br><span style="color: #8D7A67; font-size: 14px;">We'll email you 1 week before launch (targeting March 2026)</span></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid #8D7A67;">
                    <div style="background-color: #C36F3D; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; float: left; margin-right: 15px;">2</div>
                    <p style="color: #282521; margin: 0; padding-top: 5px;"><strong>Early Access</strong><br><span style="color: #8D7A67; font-size: 14px;">Get first pick of verified listings before public launch</span></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <div style="background-color: #C36F3D; color: white; width: 30px; height: 30px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; float: left; margin-right: 15px;">3</div>
                    <p style="color: #282521; margin: 0; padding-top: 5px;"><strong>Move In Fast</strong><br><span style="color: #8D7A67; font-size: 14px;">From first contact to keys in hand—within 2 weeks</span></p>
                  </td>
                </tr>
              </table>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #6B8A7A; border-radius: 8px;">
                <p style="color: #F5F0E6; margin: 0; text-align: center; font-size: 16px;">
                  <strong>💰 Your Early Bird Benefit:</strong><br>
                  Save ₦70,000+ on a ₦2M rent (3.5% fee vs 7%)
                </p>
              </div>
              
              <p style="color: #282521; line-height: 1.6; margin: 20px 0;">
                Have questions? Reply to this email or reach us at <a href="mailto:hello@shelterpointng.com" style="color: #C36F3D; text-decoration: none;">hello@shelterpointng.com</a>
              </p>
              
              <p style="color: #282521; line-height: 1.6; margin: 0;">
                Welcome to the future of Lagos housing! 🚀<br><br>
                <strong>The ShelterPoint NG Team</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #DAD3BE; padding: 30px; text-align: center; border-top: 1px solid #8D7A67;">
              <p style="color: #8D7A67; margin: 0 0 10px 0; font-size: 14px;">
                🏠 ShelterPoint NG - Proudly Lagos-Based
              </p>
              <p style="color: #8D7A67; margin: 0; font-size: 12px;">
                © 2026 ShelterPoint Nigeria Limited. NDPR Compliant.<br>
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/unsubscribe?email=${encodeURIComponent(data.email)}" style="color: #8D7A67; text-decoration: underline;">Unsubscribe</a>
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
      subject: `🎯 New Waitlist Signup #${data.spotNumber}`,
      html: `
        <h2>New Beta Signup</h2>
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