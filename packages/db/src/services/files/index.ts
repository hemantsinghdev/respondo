import { prisma } from "@repo/db";

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
