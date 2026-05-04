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
  const BATCH_SIZE = 5; // Adjust based on your chunk size
  const chunksWithEmbeddings = [];
  try {
    for (let i = 0; i < parsedData.chunks.length; i += BATCH_SIZE) {
      const batch = parsedData.chunks.slice(i, i + BATCH_SIZE);
      const inputs = batch.map(createEmbeddingInput);

      const embeddings = (await hfClient.featureExtraction({
        model: "sentence-transformers/all-MiniLM-L6-v2",
        inputs: inputs,
      })) as number[][];

      const batchResult = batch.map((chunk, index) => ({
        vector: embeddings[index],
        metadata: { ...chunk },
      }));

      chunksWithEmbeddings.push(...batchResult);

      // Optional: Small delay to prevent rate-limit resets
      await new Promise((res) => setTimeout(res, 200));
    }

    console.log(
      "[HUGGINGFACE] Successfully Embedded the Vectors.\nFull DATA: ",
      chunksWithEmbeddings,
    );
    return { data: chunksWithEmbeddings, error: null };
  } catch (error) {
    console.error("[HUGGINGFACE] Error While Embedding the data : ", error);
    return { data: null, error: error };
  }
}
