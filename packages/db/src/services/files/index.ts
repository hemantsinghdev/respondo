import { IngestionStatus, prisma } from "@repo/db";

interface CreateFileInput {
  key: string;
  organizationId: string;
  name: string;
  type: string;
  url: string;
  size: number;
  customId?: string | null;
  fileHash: string;
  lastModified?: number | null; // Accepts the timestamp
}

export async function createFile(input: CreateFileInput) {
  try {
    const file = await prisma.file.create({
      data: {
        id: input.key,
        organizationId: input.organizationId,
        name: input.name,
        type: input.type,
        url: input.url,
        size: input.size,
        customId: input.customId,
        fileHash: input.fileHash,
        // Convert timestamp to Date object if it exists
        lastModified: input.lastModified ? new Date(input.lastModified) : null,
      },
    });

    return { data: file, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Failed to create file",
        code: "DB_CREATE_ERROR",
      },
    };
  }
}

export async function getFiles(organizationId: string) {
  try {
    const files = await prisma.file.findMany({
      where: { organizationId },
      orderBy: { lastModified: "desc" }, // Most recent files first
    });

    return { data: files, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Failed to fetch files for this organization.",
        code: "DB_FETCH_ERROR",
      },
    };
  }
}

export async function getFileById(id: string) {
  try {
    const file = await prisma.file.findUnique({
      where: { id },
    });

    return { data: file, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Failed to fetch files for this organization.",
        code: "DB_FETCH_ERROR",
      },
    };
  }
}

export async function deleteFileFromDb(id: string) {
  try {
    const deletedFile = await prisma.file.delete({
      where: { id },
    });

    return { data: deletedFile, error: null };
  } catch (err: any) {
    return {
      data: null,
      error: {
        message: err.message || "Failed to delete file record from database.",
        code: "DB_DELETE_ERROR",
      },
    };
  }
}

export async function fileExistsInOrganization(
  fileId: string,
  organizationId: string,
) {
  try {
    const count = await prisma.file.count({
      where: {
        id: fileId,
        organizationId: organizationId,
      },
    });

    return {
      exists: count > 0,
      error: null,
    };
  } catch (err: any) {
    console.error("[DB_CHECK_ERROR]:", err);
    return {
      exists: false,
      error: {
        message: "An error occurred while verifying file ownership.",
        code: "DB_CHECK_ERROR",
      },
    };
  }
}

export async function updateFileStatus(
  fileId: string,
  status: IngestionStatus,
) {
  try {
    await prisma.$executeRaw`UPDATE "file" SET "status" = ${status}::"IngestionStatus" WHERE "id" = ${fileId}`;

    return { success: true, error: null };
  } catch (error: any) {
    console.error(
      `[DB_STATUS_UPDATE_ERROR]: Failed to set ${fileId} to ${status}`,
      error,
    );

    return {
      success: false,
      error: error.message || "Failed to update file status",
    };
  }
}
