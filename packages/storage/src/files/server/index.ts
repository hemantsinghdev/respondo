import { UTApi } from "uploadthing/server";

export { createRouteHandler } from "uploadthing/next";
export { fileRouter, type fileRouterType } from "./fileRouter";
export { deleteFile } from "./utils";
export const utapi = new UTApi();
