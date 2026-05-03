"use server";

import { deleteChunk, getDocumentChunks } from "@repo/db/services";
import { revalidatePath } from "next/cache";

export async function retryIngestionAction(fileId: string) {
  return { success: false, error: "here" };
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
