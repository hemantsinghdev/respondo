import {
  createUploadthing,
  UploadThingError,
  type FileRouter,
} from "uploadthing/server";
import { auth } from "@repo/auth/server";

const f = createUploadthing();

export const fileRouter: FileRouter = {
  file: f(
    {
      pdf: { maxFileCount: 1, maxFileSize: "4MB" },
    },
    { awaitServerData: true },
  )
    .middleware(async ({ req }) => {
      console.log(
        "MIDDLEWARE[UPLOADTHING]:checking if active organization is there",
      );
      const activeMember = await auth.api.getActiveMember({
        headers: req.headers,
      });

      if (!activeMember) {
        throw new UploadThingError("No Active Organization Member found.");
      }
      console.log("MIDDLEWARE[UPLOADTHING]:organization is found!!!");

      return { activeOrganizationId: activeMember.organizationId };
    })
    // .middleware(async ({ req }) => {
    //   // Check if this is the initial upload request or the server callback
    //   // UploadThing usually attaches headers to identify its own callback pings
    //   const isCallback =
    //     req.headers.get("x-uploadthing-package") || !req.headers.get("cookie");

    //   console.log("\n\nChecking if active organization is there...");

    //   // Only run auth if it's NOT a callback or if you have cookies
    //   if (!isCallback) {
    //     const activeMember = await auth.api.getActiveMember({
    //       headers: req.headers,
    //     });

    //     if (!activeMember) {
    //       console.log("MIDDLEWARE: No organization found");
    //       throw new UploadThingError("Unauthorized");
    //     }

    //     console.log("\n\n\nOrganization found for upload initiation!");
    //     return { activeOrganizationId: activeMember.organizationId };
    //   }

    //   // If it IS a callback, skip auth check and return empty or cached ID
    //   console.log(
    //     "Callback detected, skipping auth check to allow onUploadComplete...",
    //   );
    //   return {};
    // })
    .onUploadComplete(async (data) => {
      console.log(
        "COMPLETE[UPLOADTHING]:Upload complete is triggered for : ",
        data.file.name,
      );
      return {
        fileData: {
          ...data.file,
        },
      };
    }),
};

export type fileRouterType = typeof fileRouter;
