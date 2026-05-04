import gemini from "./gemini";
import { z } from "zod";
import { documentSchema } from "./schema";

export async function documentParser(fileUrl: string) {
  const pdfResp = await fetch(fileUrl).then((response) =>
    response.arrayBuffer(),
  );

  const model = "models/gemini-2.5-flash";

  const contents = [
    {
      text: "Parse this helpdesk document into logical chunks for vector embeddings.",
    },
    {
      inlineData: {
        mimeType: "application/pdf",
        data: Buffer.from(pdfResp).toString("base64"),
      },
    },
  ];

  try {
    const response = await gemini.models.generateContent({
      model,
      contents,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: z.toJSONSchema(documentSchema),
      },
    });

    const chunkData = documentSchema.parse(JSON.parse(response.text ?? ""));

    console.log("[GEMINI] Successfully parsed the data\nData: \n", chunkData);
    return { data: chunkData, error: null };
  } catch (error) {
    console.error("[GEMINI] Error While Parsing the data");
    return { data: null, error: error };
  }
}
