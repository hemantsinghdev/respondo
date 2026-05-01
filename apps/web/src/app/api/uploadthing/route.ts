import { createRouteHandler, fileRouter } from "@repo/storage/files/server";

export const { GET, POST } = createRouteHandler({
  router: fileRouter,
});
