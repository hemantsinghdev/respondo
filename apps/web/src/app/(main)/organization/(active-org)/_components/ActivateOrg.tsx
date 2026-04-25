"use client";

import { notify } from "@app/lib/notify";
import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function ActivateOrg({
  organizationId,
}: {
  organizationId: string | null;
}) {
  const router = useRouter();
  const hasCalled = useRef(false);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    async function select() {
      try {
        await authClient.organization.setActive({
          organizationId,
        });
        router.refresh();
      } catch (error) {
        notify.error("Failed to set active organization");
        router.push("/dashboard");
      }
    }

    select();
  }, [organizationId, router]);

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="text-center">
        <p className="text-sm text-muted-foreground animate-pulse">
          Setting up your workspace...
        </p>
      </div>
    </div>
  );
}
