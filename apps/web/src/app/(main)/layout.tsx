"use client";

import "@repo/ui/styles/respondo-toaster.css";
import { Toaster } from "@repo/ui/components";
import { GlobalConfirmDialog } from "@app/components/ConfirmDialog";
import { Sidebar } from "@app/components/Sidebar";
import { useSidebarStore } from "@app/lib/stores/sidebarStore";
import { authClient } from "@repo/auth/client";
import { cn } from "@repo/ui/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { notify } from "@app/lib/notify";

function SessionChecker({
  session,
  isPending,
}: {
  session: any;
  isPending: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isPending && !session) {
      authClient.signOut();
      router.push("/login");
      return;
    }

    const accountNotification = searchParams.get("account_created");
    const loginNotification = searchParams.get("login");

    if (accountNotification || loginNotification) {
      if (accountNotification === "true") {
        notify.success("Your Account is created Successfully.");
      }
      if (loginNotification === "success") {
        notify.success("You have successfully logged in.");
      }

      const newPath = window.location.pathname;
      router.replace(newPath, { scroll: false });
    }
  }, [searchParams, session, isPending, router]);

  return null;
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0A0A0A]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => router.push("/login"),
      },
    });
  };

  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-white selection:bg-cyan-500/30">
      <Suspense fallback={null}>
        <SessionChecker session={session} isPending={isPending} />
      </Suspense>
      <Sidebar onLogout={handleSignOut} />

      <div
        className={cn(
          "relative flex flex-1 flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "pl-[80px]" : "pl-[260px]",
        )}
      >
        {/* Subtle top gradient to enhance the Neon Noir feel */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent h-[500px]" />

        <main className="relative z-10 flex-1 px-8 py-8">{children}</main>
        <GlobalConfirmDialog />
        <Toaster
          position="bottom-right"
          expand={true}
          visibleToasts={5}
          className="respondo-toaster"
          toastOptions={{
            unstyled: true,
          }}
        />
      </div>
    </div>
  );
}
