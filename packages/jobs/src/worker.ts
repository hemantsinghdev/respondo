import { Worker, Job } from "bullmq";
import { redisConnection } from "./redis";
import { INGESTION_QUEUE_NAME, IngestionJobData } from "./queues";

export function createIngestionWorker(
  processFn: (data: IngestionJobData) => Promise<void>,
) {
  const worker = new Worker<IngestionJobData>(
    INGESTION_QUEUE_NAME,
    async (job: Job<IngestionJobData>) => {
      console.log(`[JOBS]: Starting processing for file: ${job.data.fileId}`);
      await processFn(job.data);
      console.log(`[JOBS]: Success processing file: ${job.data.fileId}`);
    },
    { connection: redisConnection },
  );

  worker.on("failed", (job, err) => {
    console.error(`[JOBS]: Job ${job?.id} failed with error: ${err.message}`);
  });

  return worker;
}
