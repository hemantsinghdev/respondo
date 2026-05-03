import { z } from "zod";

export const chunkSchema = z.object({
  title: z
    .string()
    .describe(
      "The main topic of this section describing this correctly for vector embedding.",
    ),
  content: z.string().describe("The full text extracted from this section."),
  keywords: z.array(z.string()).describe("3-5 tags for search indexing."),
  suggested_questions: z
    .array(z.string())
    .describe("3 potential user questions this chunk answers."),
});

export const documentSchema = z.object({
  chunks: z.array(chunkSchema),
  document_summary: z
    .string()
    .describe("A high-level overview of the entire document."),
});

export type Chunk = z.infer<typeof chunkSchema>;
export type ParsedDocument = z.infer<typeof documentSchema>;
