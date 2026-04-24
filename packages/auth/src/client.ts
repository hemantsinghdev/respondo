import { createAuthClient } from "better-auth/react";
import {
  inferOrgAdditionalFields,
  organizationClient,
} from "better-auth/client/plugins";
import { ac, owner } from "./permissions";
import { auth } from "./auth";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    organizationClient({
      schema: inferOrgAdditionalFields<typeof auth>(),
      ac,
      roles: { owner },
      dynamicAccessControl: {
        enabled: true,
      },
      teams: {
        enabled: true,
      },
    }),
  ],
});
