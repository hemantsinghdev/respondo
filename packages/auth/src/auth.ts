import { betterAuth, email } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { ac, admin, member, owner } from "./permissions";
import { prisma } from "@repo/db";
import {
  sendDeleteVerificationEmail,
  sendUserVerificationEmail,
  sendOrganizationInvitationEmail,
} from "@repo/email/services";

export const auth = betterAuth({
  baseURL: process.env.APP_URL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
      organizationHooks: {
        beforeDeleteOrganization: async (data) => {
          const member = await prisma.member.findUnique({
            where: {
              userId: data.user.id,
            },
            select: { role: true, organizationId: true },
          });
          if (
            !member ||
            member.organizationId !== data.organization.id ||
            member.role !== "owner"
          ) {
            throw new Error("UNAUTHORIZED");
          }
          return;
        },
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

        // If they are the owner of their one-and-only org, delete the org
        if (membership?.role === "owner") {
          await prisma.organization.delete({
            where: { id: membership.organizationId },
          });
        }
      },
    },
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
