import hfClient from "./model";
import { Chunk, ParsedDocument } from "@api/lib/gemini";

function createEmbeddingInput(chunk: Chunk) {
  return `
    Title: ${chunk.title}
    Keywords: ${chunk.keywords.join(", ")}
    Questions: ${chunk.suggested_questions.join(" ")}
    Content: ${chunk.content}
  `.trim();
}

export async function processChunksForVectorDB(parsedData: ParsedDocument) {
  try {
    const chunksWithEmbeddings = await Promise.all(
      parsedData.chunks.map(async (chunk) => {
        const richText = createEmbeddingInput(chunk);

        const embedding = await hfClient.featureExtraction({
          model: "sentence-transformers/all-MiniLM-L6-v2",
          inputs: richText,
        });

        return {
          vector: embedding,
          metadata: {
            ...chunk,
          },
        };
      }),
    );
    console.log("[HUGGINGFACE] Successfully Embedded the Vectors.");
    return { data: chunksWithEmbeddings, error: null };
  } catch (error) {
    console.error("[HUGGINGFACE] Error While Embedding the data : ", error);
    return { data: null, error: error };
  }
}
