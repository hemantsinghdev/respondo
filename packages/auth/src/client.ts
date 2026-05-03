import { createAuthClient } from "better-auth/react";
import {
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { ac, admin, member, owner, type RolePermissions } from "./permissions";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
      ac,
      roles: { owner, admin, member },
      dynamicAccessControl: {
        enabled: true,
      },
      teams: {
        enabled: true,
      },
    }),
  ],
});

//Defines the Default Roles
export const defaultRoles = ["member", "admin", "owner"] as const;
export type DefaultRole = (typeof defaultRoles)[number];

//Defines the structure of permissions/statements inside role
export type { RolePermissions };

export const defaultRolePermissions: Record<DefaultRole, RolePermissions> = {
  owner: owner.statements,
  member: member.statements,
  admin: admin.statements,
};
