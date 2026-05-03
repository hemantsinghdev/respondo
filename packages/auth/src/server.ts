export { auth } from "./auth";
export { toNextJsHandler } from "better-auth/next-js";
export { getSessionCookie } from "better-auth/cookies";

import { member, admin, owner, type RolePermissions } from "./permissions";

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
