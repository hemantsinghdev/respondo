import { documentParser } from "@api/lib/gemini";
import { processChunksForVectorDB } from "@api/lib/huggingface";
import {
  fileExistsInOrganization,
  saveDocumentChunks,
  updateFileStatus,
} from "@repo/db/services";
import { IngestionJobData } from "@repo/jobs";

export default async function processIngestion(jobData: IngestionJobData) {
  const { fileId, organizationId, fileUrl } = jobData;
  console.log(
    `[WORKER]: Starting heavy RAG pipeline for file ${jobData.fileId}`,
  );

  try {
    console.log("[RAG] Checking the Organization and File relation");
    const { exists, error: existError } = await fileExistsInOrganization(
      fileId,
      organizationId,
    );
    if (existError || !exists) {
      throw new Error("[RAG] File-Organization Relation not established", {
        cause: existError,
      });
    }

    console.log("[RAG] Parsing the file");
    const { data: parseData, error: parseError } =
      await documentParser(fileUrl);
    if (parseError || !parseData) {
      throw new Error("[RAG] Error Occured in parsing : ", {
        cause: parseError,
      });
    }
    await updateFileStatus(fileId, "PARSED");

    console.log("[RAG] Embedding the vectors.");
    const { data: chunkData, error: embeddingError } =
      await processChunksForVectorDB(parseData);
    if (embeddingError || !chunkData) {
      throw new Error("[RAG] Error Occured in embedding : ", {
        cause: embeddingError,
      });
    }
    await updateFileStatus(fileId, "EMBEDDED");

    console.log("[RAG] Saving in the database.");
    const { success, error: savingError } = await saveDocumentChunks(
      chunkData,
      fileId,
      organizationId,
    );
    if (savingError || !success) {
      throw new Error("[RAG] Error Occured during saving in database : ", {
        cause: savingError,
      });
    }
    await updateFileStatus(fileId, "COMPLETED");
    return;
  } catch (error) {
    await updateFileStatus(fileId, "FAILED");
    console.error("[RAG] FAILED : ", error);
    return;
  }
}
