"use client";

import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="text-zinc-500 animate-pulse">Checking session...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
        <div className="rounded-lg border border-white/10 bg-zinc-900 p-8 text-center shadow-2xl">
          <h1 className="text-xl font-semibold text-zinc-300">
            No Session Found
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Please sign in to view your dashboard.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 w-full rounded-md bg-white px-4 py-2 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-zinc-900 p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          {/* User Avatar Placeholder */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-xl font-bold">
            {session.user.name?.charAt(0).toUpperCase()}
          </div>

          <div className="text-center">
            <h2 className="text-lg font-medium">Hello, {session.user.name}</h2>
            <p className="text-sm text-zinc-400">{session.user.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="mt-4 w-full rounded-lg border border-red-500/50 bg-red-500/10 py-2 text-sm font-medium text-red-400 hover:bg-red-500 hover:text-white transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
