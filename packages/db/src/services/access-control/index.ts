import { prisma } from "@repo/db";

export async function getPermissions(organizationId: string, role: string) {
  try {
    const permissions = await prisma.organizationRole.findUnique({
      where: {
        orgRoleIdentifier: {
          organizationId,
          role,
        },
      },
      select: {
        permission: true,
      },
    });

    return { data: permissions, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Failed to find permissions",
        code: "DB_CREATE_ERROR",
      },
    };
  }
}
