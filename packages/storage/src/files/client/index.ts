import { generateReactHelpers } from "@uploadthing/react";
import { type fileRouterType } from "@repo/storage/files/server";

const reactHelper = generateReactHelpers<fileRouterType>();

export const { useUploadThing } = reactHelper;
