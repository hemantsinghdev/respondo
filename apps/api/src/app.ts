import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import Fastify from "fastify";
import dbPlugin from "@api/plugins/prisma";
import userRoutes from "./routes/users";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: process.env.APP_URL!,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
});
app.register(helmet);

app.register(dbPlugin);
app.register(userRoutes, { prefix: "/v1/users" });

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

export default app;
