import type { FastifyInstance, FastifyPluginOptions } from "fastify";

export default async function userRoutes(
  app: FastifyInstance,
  opts: FastifyPluginOptions,
) {
  app.get("/count", async (request, reply) => {
    const userCount = await app.prisma.user.count();
    return reply.send({ users: userCount });
  });
}
