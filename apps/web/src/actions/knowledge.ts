"use server";

import {
  deleteChunk,
  getDocumentChunks,
  getFileById,
  updateFileStatus,
} from "@repo/db/services";
import { waitUntil } from "@vercel/functions";
import { enqueueIngestion } from "@repo/jobs";

export async function retryIngestionAction(fileId: string) {
  try {
    const { data, error } = await getFileById(fileId);
    if (error || !data) {
      throw new Error("File not found in database");
    }
    const res = await enqueueIngestion({
      fileId: data.id,
      fileUrl: data.url,
      organizationId: data.organizationId,
    });

    await updateFileStatus(data.id, "QUEUED");

    waitUntil(
      fetch(`${process.env.API_URL}/ping`)
        .then((res) => console.log("[NEXT API] Awaken the server", res))
        .catch((error) => console.error("Failed to awake the server", error)),
    );

    return { success: true, error: null };
  } catch (error) {
    console.error("ACTION [JOBS] Failed to enqueue the file for ingestion");
    return { success: false, error };
  }
}

export async function fetchKnowledgeBaseAction(organizationId: string) {
  return await getDocumentChunks(organizationId);
}

export async function deleteChunkAction(
  chunkId: string,
  organizationId: string,
) {
  return await deleteChunk(chunkId, organizationId);
}
