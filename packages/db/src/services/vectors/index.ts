import { prisma } from "@repo/db";
import { createId } from "@paralleldrive/cuid2";

type Chunk = {
  vector: any;
  metadata: {
    title: string;
    content: string;
    keywords: string[];
    suggested_questions: string[];
  };
};

export async function saveDocumentChunks(
  chunks: Chunk[],
  fileId: string,
  organizationId: string,
) {
  try {
    const values = chunks.map((chunk) => {
      const { metadata, vector } = chunk;
      const vectorString = `[${vector.join(",")}]`;

      return {
        id: createId(),
        title: metadata.title,
        content: metadata.content,
        keywords: metadata.keywords,
        questions: metadata.suggested_questions,
        embedding: vectorString,
      };
    });

    //Perform the Bulk Insert using a Transaction & Raw Query
    await prisma.$transaction(
      values.map(
        (v) =>
          prisma.$executeRaw`INSERT INTO "document_chunks" (
          "id",
          "title",
          "content", 
          "keywords", 
          "suggestedQuestions", 
          "embedding", 
          "fileId", 
          "organizationId"
        )
        VALUES (
          ${v.id}, 
          ${v.title}, 
          ${v.content}, 
          ${v.keywords}, 
          ${v.questions}, 
          ${v.embedding}::vector,
          ${fileId}, 
          ${organizationId}
        )`,
      ),
    );

    console.log(`[DATABASE] Successfully stored ${chunks.length} chunks.`);
    return { success: true, error: null };
  } catch (error) {
    console.error("[DATABASE] Error saving chunks:", error);
    return { success: false, error };
  }
}

export async function getDocumentChunks(organizationId: string) {
  try {
    const chunks = await prisma.$queryRaw`
      SELECT 
        dc.id, 
        dc.title, 
        dc.content, 
        dc.keywords,
        dc."suggestedQuestions",
        dc.contenttokens::text as "contentTokens", 
        dc.embedding::text as "embeddingString", 
        dc."fileId",
        f.name as "fileName"
      FROM "document_chunks" dc
      JOIN "file" f ON dc."fileId" = f.id
      WHERE dc."organizationId" = ${organizationId}
      ORDER BY dc.title ASC
    `;

    return { data: chunks as any[], error: null };
  } catch (error) {
    console.error("Error fetching knowledge base:", error);
    return { data: null, error: "Failed to fetch raw vector data." };
  }
}

export async function deleteChunk(chunkId: string, organizationId: string) {
  try {
    await prisma.documentChunk.delete({
      where: { id: chunkId, organizationId },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete chunk." };
  }
}
