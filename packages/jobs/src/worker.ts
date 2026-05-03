import { Worker, Job } from "bullmq";
import { redisConnection } from "./redis";
import { INGESTION_QUEUE_NAME, IngestionJobData } from "./queues";

export function createIngestionWorker(
  processFn: (data: IngestionJobData) => Promise<void>,
) {
  const worker = new Worker<IngestionJobData>(
    INGESTION_QUEUE_NAME,
    async (job: Job<IngestionJobData>) => {
      const { fileId, organizationId } = job.data;

      console.log(
        `[JOBS]: Processing file ${fileId} for Org ${organizationId}`,
      );

      try {
        await processFn(job.data);
      } catch (error) {
        console.error(`[JOBS]: Processing failed for ${fileId}:`, error);
        throw error; // Let BullMQ handle the retry
      }
    },
    {
      connection: redisConnection,
      concurrency: 5, // Process 5 files at a time (adjust based on your RAM/CPU)
    },
  );

  worker.on("failed", (job, err) => {
    console.error(`[JOBS]: Job ${job?.id} failed: ${err.message}`);
  });

  // Graceful shutdown helper
  const shutdown = async () => {
    console.log("[JOBS]: Closing worker...");
    await worker.close();
  };

  return { worker, shutdown };
}
