import {
  createUploadthing,
  UploadThingError,
  UTApi,
  type FileRouter,
} from "uploadthing/server";
import { auth } from "@repo/auth/server";
import { createFile } from "@repo/db/services";
import { fetchRolePermissions } from "./utils/fetchRolePermissions";

export const utapi = new UTApi();

const f = createUploadthing();

export const fileRouter: FileRouter = {
  file: f(
    {
      pdf: { maxFileCount: 4, maxFileSize: "4MB" },
    },
    { awaitServerData: true },
  )
    .middleware(async ({ req }) => {
      console.log(
        "UPLOADTHING[MIDDLEWARE]:checking if active organization is there",
      );
      const activeMember = await auth.api.getActiveMember({
        headers: req.headers,
      });

      if (!activeMember) {
        throw new UploadThingError("No Active Organization Member found.");
      }

      const { data: permissions, error } = await fetchRolePermissions(
        activeMember.organizationId,
        activeMember.role,
      );
      if (error) {
        throw new UploadThingError(error);
      }

      if (!permissions?.document?.includes("upload")) {
        throw new UploadThingError(
          "Member doesn't have the permissions to upload files",
        );
      }
      console.log(
        "UPLOADTHING[MIDDLEWARE]:organization and member role checked!!!",
      );

      return { activeOrganizationId: activeMember.organizationId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { data, error } = await createFile({
        key: file.key,
        organizationId: metadata.activeOrganizationId,
        name: file.name,
        type: file.type,
        url: file.ufsUrl,
        size: file.size,
        customId: file.customId,
        fileHash: file.fileHash,
        lastModified: file.lastModified ?? Date.now(),
      });

      if (error) {
        console.error(
          "UPLOADTHING[COMPLETED] Database insert failed, cleaning up UploadThing file:",
          error.message,
          file.key,
        );
        await utapi.deleteFiles(file.key);
        throw new Error(error.message);
      }

      console.log(
        "UPLOADTHING[COMPLETED] File successfully saved to database!",
      );

      return {
        fileId: data.id,
        url: data.url,
      };
    }),
};

export type fileRouterType = typeof fileRouter;
