import { UploadThingError, UTApi } from "uploadthing/server";
import { deleteFileFromDb } from "@repo/db/services";
import { auth } from "@repo/auth/server";

const utapi = new UTApi();

/**
 * Deletes a file completely from both UploadThing bucket and database with safety checks.
 * @param fileId - The file ID/key to delete.
 * @param requestHeaders - Headers forwarded from the client/server action for auth.
 */
export async function deleteFile(fileId: string, requestHeaders: Headers) {
  try {
    const activeMember = await auth.api.getActiveMember({
      headers: requestHeaders,
    });

    if (!activeMember) {
      throw new UploadThingError(
        "UPLOADTHING[DELETE] Unauthorized: No active organization session found.",
      );
    }

    //Fetch the file from DB first to ensure it exists and belongs to this organization
    const { getFileById } = await import("@repo/db/services");
    const { data: fileRecord, error: fetchError } = await getFileById(fileId);

    if (fetchError || !fileRecord) {
      throw new UploadThingError(
        "UPLOADTHING[DELETE] File not found in the database.",
      );
    }

    if (fileRecord.organizationId !== activeMember.organizationId) {
      throw new UploadThingError(
        "UPLOADTHING[DELETE] Access Denied: This file does not belong to your organization.",
      );
    }

    // Delete the file from uploadthing
    const utResponse = await utapi.deleteFiles(fileId);

    if (!utResponse.success) {
      throw new UploadThingError(
        "UPLOADTHING[DELETE] Failed to delete file from storage bucket.",
      );
    }

    // Delete the file record from Prisma DB
    const { error: dbError } = await deleteFileFromDb(fileId);
    if (dbError) {
      throw new Error(dbError.message);
    }

    return { success: true, error: null };
  } catch (err: any) {
    console.error(`UPLOADTHING[DELETE]: Failed to delete file ${fileId}`, err);
    return {
      success: false,
      error: err.message || "An error occurred while deleting the file.",
    };
  }
}
