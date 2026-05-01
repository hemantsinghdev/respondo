import { generateReactHelpers } from "@uploadthing/react";
import type { fileRouterType } from "./fileRouter";

// type ReactHelpersType = ReturnType<typeof generateReactHelpers<fileRouterType>>;
const reactHelper = generateReactHelpers<fileRouterType>();

export const { useUploadThing } = reactHelper;
