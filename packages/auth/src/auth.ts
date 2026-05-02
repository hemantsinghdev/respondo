import { APIError, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { ac, admin, member, owner } from "./permissions";
import { prisma } from "@repo/db";
import {
  sendDeleteVerificationEmail,
  sendUserVerificationEmail,
  sendOrganizationInvitationEmail,
  sendResetPasswordEmail,
} from "@repo/email/services";

export const auth = betterAuth({
  baseURL: process.env.APP_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    crossSubDomainCookies: {
      enabled: !!process.env.PARENT_DOMAIN,
      domain: process.env.PARENT_DOMAIN,
    },
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: true,
      httpOnly: true,
    },
  },
  trustedOrigins: [process.env.APP_URL!, process.env.API_URL!],
  plugins: [
    organization({
      schema: {
        organization: {
          additionalFields: {
            email: {
              type: "string",
              required: false,
            },
          },
        },
      },
      ac,
      roles: { owner, admin, member },
      dynamicAccessControl: {
        enabled: true,
      },
      teams: {
        enabled: true,
      },
      allowUserToCreateOrganization: async (user): Promise<boolean> => {
        return user.emailVerified;
      },
      requireEmailVerificationOnInvitation: true,
      cancelPendingInvitationsOnReInvite: true,
      async sendInvitationEmail(data) {
        const organization = data.organization as typeof data.organization & {
          email: string;
        };
        const orgSenderEmail =
          organization.email ?? process.env.RESPONDO_SENDER_EMAIL;
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/organization/invitation/${data.id}`;
        await sendOrganizationInvitationEmail({
          email: data.email,
          invitedByUsername: data.inviter.user.name,
          invitedByEmail: orgSenderEmail,
          orgName: data.organization.name,
          teamName: data.invitation.teamId ?? undefined,
          orgLogoUrl: data.organization.logo ?? undefined,
          inviteLink,
        });
      },
    }),
  ],
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendDeleteVerificationEmail(user.name, user.email, url);
      },
      beforeDelete: async (user) => {
        const membership = await prisma.member.findUnique({
          where: { userId: user.id },
          include: { organization: true },
        });

        if (membership?.role === "owner") {
          throw new APIError("BAD_REQUEST", {
            message: "USER_IS_ORGANIZATION_OWNER",
          });
        }
      },
    },
  },
  onAPIError: {
    throw: false,
    onError: (error, ctx) => {
      console.error("Auth error:", error);
    },
    errorURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/error`,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 * 1, // updates session each day, pushing expiry forward
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60, // Cache the session state for 15 minutes
    },
  },
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      sendResetPasswordEmail(user.name, user.email, url);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendUserVerificationEmail(user.name, user.email, url);
    },
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
