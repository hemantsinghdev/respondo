"use client";

import { Sidebar } from "@app/components/Sidebar";
import { useSidebarStore } from "@app/lib/store/sidebarStore";
import { authClient } from "@repo/auth/client";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Redirect to login if no session is found after loading
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

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
      </div>
    </div>
  );
  return (
    <div className="flex min-h-screen bg-[#0A0A0A] text-[#FFFFFF]">
      {/* 1. Sidebar - Fixed width of 260px with subtle 1px border */}
      <Sidebar onLogout={handleSignOut} />

      {/* 2. Main Content Area - Pushed to the right by the sidebar width */}
      <div className="relative flex flex-1 flex-col transition-all duration-300 ease-in-out pl-[260px] has-[aside.w-\[80px\]]:pl-[80px]">
        {/* Optional: Global Header can be added here as per UI Plan section 2b */}
        {/* <main className="flex-1 overflow-y-auto px-8 py-8"> */}
        <main className="flex-1 px-8 py-8">{children}</main>
      </div>
    </div>
  );
}
