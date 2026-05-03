import {
  defaultRolePermissions,
  defaultRoles,
  type DefaultRole,
  type RolePermissions,
} from "@repo/auth/server";
import { getPermissions } from "@repo/db/services";

function isDefaultRole(role: string): role is DefaultRole {
  return (defaultRoles as readonly string[]).includes(role);
}

export async function fetchRolePermissions(
  organizationId: string,
  role: string,
) {
  if (isDefaultRole(role)) {
    return { data: defaultRolePermissions[role], error: null };
  }
  const res = await getPermissions(organizationId, role);
  if (res.data?.permission) {
    return {
      data: JSON.parse(res.data.permission) as RolePermissions,
      error: null,
    };
  }
  return { data: null, error: "Unable to fetch permissions" };
}
