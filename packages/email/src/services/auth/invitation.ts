import { brevo } from "@repo/email/client";
import { Images } from "@repo/ui/assets";

type organizationInvitationEmail = {
  email: string;
  invitedByUsername: string;
  invitedByEmail: string;
  inviteLink: string;
  orgName: string;
  orgLogoUrl?: string;
  teamName?: string;
};

export const sendOrganizationInvitationEmail = async ({
  email,
  invitedByUsername,
  invitedByEmail,
  inviteLink,
  orgName,
  orgLogoUrl,
  teamName,
}: organizationInvitationEmail) => {
  const orgInitial = orgName.charAt(0).toUpperCase();

  const logoContent = orgLogoUrl
    ? `<img src="${orgLogoUrl}" alt="${orgName}" height="60" style="display: block; border: 0; height: 60px; width: auto; border-radius: 12px;" />`
    : `<div style="width: 64px; height: 64px; line-height: 64px; background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; color: #FFFFFF; font-size: 28px; font-weight: 700; text-align: center; box-shadow: 0 8px 16px rgba(0,0,0,0.4);">${orgInitial}</div>`;

  // Team Logic: Render a specific badge if teamName exists
  const teamBadge = teamName
    ? `<div style="margin-top: 12px; display: inline-block; padding: 4px 12px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2); border-radius: 8px;">
         <span style="color: #22D3EE; font-size: 13px; font-weight: 600;">Team: ${teamName}</span>
       </div>`
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        </style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Inter', -apple-system, sans-serif;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0A0A0A; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #0D0D0D; border: 1px solid rgba(255,255,255,0.05); border-radius: 28px; overflow: hidden; max-width: 600px;">
                
                <tr>
                  <td align="right" style="padding: 24px 32px 0 0;">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="color: #475569; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; padding-right: 8px;">Infrastructure by</td>
                        <td><img src="${process.env.NEXT_PUBLIC_APP_URL}${Images.logos.long.src}" alt="Respondo" height="12" style="display: block; opacity: 0.4;" /></td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 20px 48px 10px 48px;">
                    ${logoContent}
                    <h1 style="color: #FFFFFF; font-size: 28px; font-weight: 700; margin: 24px 0 8px 0; letter-spacing: -0.5px;">
                      Join ${orgName}
                    </h1>
                    ${teamBadge}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 20px 48px 40px 48px; text-align: center;">
                    <p style="color: #94A3B8; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
                      <strong style="color: #FFFFFF;">${invitedByUsername}</strong> has invited you to collaborate as a member ${teamName ? `of the <strong>${teamName}</strong> team` : "of their organization"} on Respondo.
                    </p>

                    <table border="0" cellspacing="0" cellpadding="0" align="center">
                      <tr>
                        <td align="center" style="border-radius: 14px;" bgcolor="#FFFFFF">
                          <a href="${inviteLink}" style="display: inline-block; background-color: #FFFFFF; color: #000000; padding: 18px 40px; border-radius: 14px; font-weight: 700; text-decoration: none; font-size: 16px; box-shadow: 0 20px 30px -10px rgba(255, 255, 255, 0.15);">
                            Accept Invitation
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 32px 48px; background-color: rgba(255,255,255,0.02); text-align: center; border-top: 1px solid rgba(255,255,255,0.03);">
                    <p style="color: #64748B; font-size: 13px; margin: 0;">
                      Sender: <span style="color: #94A3B8;">${invitedByEmail}</span>
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 48px; text-align: center;">
                    <p style="color: #334155; font-size: 12px; line-height: 1.6; margin: 0;">
                      This is a secure invitation. If you were not expecting this, please ignore this email. <br>
                      &copy; 2026 ${orgName} &bull; Respondo CRM Platform
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
      email: invitedByEmail,
      name: invitedByUsername,
    },
    to: [{ email }],
    subject: `Invitation: Join ${teamName ? `${teamName} @ ` : ""}${orgName}`,
    htmlContent: htmlContent,
  });
};
