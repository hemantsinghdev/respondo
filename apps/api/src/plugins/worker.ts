import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { createIngestionWorker, INGESTION_QUEUE_NAME } from "@repo/jobs";

// Define our processing logic (e.g., fetching from DB, extracting, vectorizing)
async function processIngestion(jobData: any) {
  console.log(
    `[WORKER]: Starting heavy RAG pipeline for file ${jobData.fileId}`,
  );

  // Your PDF extraction, chunking, and embedding logic goes here!
  // e.g., await myAiService.ingest(jobData);
}

const workerPluginCallback: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.log.info("Initializing BullMQ Worker plugin...");

  // 1. Initialize and start the worker listening to Redis
  const worker = createIngestionWorker(async (job) => {
    // Pass the job data to our worker processing logic
    await processIngestion(job);
  });

  fastify.log.info(
    `[WORKER]: Connected to Redis and listening on queue: '${INGESTION_QUEUE_NAME}'`,
  );

  // 2. Tie clean teardown to Fastify lifecycle events
  fastify.addHook("onClose", async (instance) => {
    instance.log.info("Fastify server shutting down. Closing BullMQ Worker...");
    // Tell the worker to stop taking new jobs and finish active jobs
    await worker.close();
    instance.log.info("BullMQ Worker closed cleanly.");
  });
};

// fastify-plugin ensures this runs globally and isn't isolated to a new scope
export const workerPlugin = fp(workerPluginCallback, {
  name: "bullmq-worker",
});
