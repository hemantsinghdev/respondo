"use server";

import { getFiles as getDbFiles } from "@repo/db/services";
import { deleteFile as deleteFileFromStorage } from "@repo/storage/files/server";
import { headers } from "next/headers";

export async function fetchFilesAction(organizationId: string) {
  if (!organizationId) {
    return { data: null, error: "Organization ID is required." };
  }
  return await getDbFiles(organizationId);
}

export async function deleteFileAction(fileId: string) {
  if (!fileId) {
    return { success: false, error: "File ID is required." };
  }

  // Next.js headers() forwards cookies/auth tokens securely from the browser
  const requestHeaders = await headers();

  return await deleteFileFromStorage(fileId, requestHeaders);
}
