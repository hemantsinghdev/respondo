import fp from "fastify-plugin";
import { prisma } from "@repo/db";

export default fp(async (fastify) => {
  if (!fastify.prisma) {
    fastify.decorate("prisma", prisma);
  }

  fastify.addHook("onClose", async (instance) => {
    instance.log.info("Disconnecting Prisma...");
    await instance.prisma.$disconnect();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    prisma: typeof prisma;
  }
}
