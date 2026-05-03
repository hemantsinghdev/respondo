import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { createIngestionWorker } from "@repo/jobs";
import processIngestion from "@api/services/rag";

const ragWorkerPlugin: FastifyPluginAsync = async (
  fastify: FastifyInstance,
) => {
  fastify.log.info("[WORKER] Initializing BullMQ Worker plugin...");

  const { worker, shutdown } = createIngestionWorker(async (data) => {
    // Pass the job data to our worker processing logic
    await processIngestion(data);
  });

  fastify.log.info(
    `[WORKER] Connected to Redis and listening on ingestion queue'`,
  );

  fastify.addHook("onClose", async (instance) => {
    instance.log.info(
      "[WORKER] Fastify server shutting down. Closing BullMQ Worker...",
    );
    await shutdown();
    instance.log.info("[WORKER] BullMQ Worker closed cleanly.");
  });
};

export const workerPlugin = fp(ragWorkerPlugin, {
  name: "bullmq-worker",
});
