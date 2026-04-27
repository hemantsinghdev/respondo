import { brevo } from "@repo/email/client";
import { Images } from "@repo/ui/assets";

export const sendResetPasswordEmail = async (
  name: string,
  email: string,
  url: string,
) => {
  const userName = name || "Valued User";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Inter', -apple-system, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0D0D0D; border: 1px solid rgba(255,255,255,0.05); border-radius: 24px; overflow: hidden; max-width: 600px;">
                
                <tr>
                  <td align="center" style="padding: 48px 40px 20px 40px;">
                    <img 
                      src="${process.env.NEXT_PUBLIC_APP_URL}${Images.logos.long.src}" 
                      alt="Respondo" 
                      height="40" 
                      style="display: block; border: 0; height: 40px; width: auto;"
                    />
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px 48px; text-align: center;">
                    <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 0 0 16px 0; letter-spacing: -0.5px;">
                      Reset Your Password
                    </h1>
                    <p style="color: #94A3B8; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                      Hello, ${userName}. We received a request to reset the password for your Respondo account. Click the button below to secure your terminal.
                    </p>
                    
                    <a href="${url}" style="display: inline-block; background: linear-gradient(to right, #06B6D4, #2563EB); color: #FFFFFF; padding: 16px 36px; border-radius: 14px; font-weight: 700; text-decoration: none; box-shadow: 0 10px 25px -5px rgba(6, 182, 212, 0.4);">
                      Initialize Reset
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 48px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
                    <p style="color: #475569; font-size: 13px; line-height: 1.5; margin: 0;">
                      For security reasons, this link will expire in 1 hour. <br>
                      If you did not request a password reset, please secure your account immediately or ignore this email.<br><br>
                      &copy; 2026 Respondo CRM. All rights reserved.
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

  await brevo.transactionalEmails.sendTransacEmail({
    sender: {
      email: process.env.RESPONDO_SENDER_EMAIL,
      name: process.env.RESPONDO_SENDER_NAME,
    },
    to: [{ email, name }],
    subject: `Reset your Respondo password, ${userName}`,
    htmlContent: htmlContent,
  });
};
