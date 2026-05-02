import { Queue } from "bullmq";
import { redisConnection } from "./redis";

export interface IngestionJobData {
  fileId: string;
  fileUrl: string;
  organizationId: string;
}

export const INGESTION_QUEUE_NAME = "ai-ingestion-queue";

export const ingestionQueue = new Queue<IngestionJobData>(
  INGESTION_QUEUE_NAME,
  {
    connection: redisConnection,
    defaultJobOptions: {
      attempts: 3, // Retry up to 3 times if it crashes
      backoff: {
        type: "exponential",
        delay: 1000, // 1s, 2s, 4s backoff
      },
      removeOnComplete: true, // Auto-clean Redis memory upon success
      removeOnFail: { age: 24 * 3600 }, // Keep failed jobs for 24 hours for logs
    },
  },
);
