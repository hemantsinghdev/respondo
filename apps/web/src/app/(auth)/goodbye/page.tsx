import { redirect } from "next/navigation";
import Link from "next/link";
import { Sparkles, Ghost } from "@repo/ui/icons";
import { jwtVerify } from "jose";

interface GoodbyePageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function GoodbyePage({ searchParams }: GoodbyePageProps) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/login");
  }

  let userData;

  try {
    const secret = new TextEncoder().encode(process.env.BETTER_AUTH_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    userData = {
      name: (payload.name as string) || "User",
      joinedAt: payload.createdAt
        ? new Date(payload.createdAt as string)
        : null,
    };
    console.log("Here is the user data in goodbye : ", userData);
  } catch (error) {
    console.error("Auth bypass attempt or expired token:", error);
    redirect("/login");
  }

  return (
    <div className="relative z-10 max-w-2xl w-full px-6 text-center">
      <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl">
        {/* Animated Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative h-20 w-20 mx-auto bg-[#0D0D0D] border border-white/10 rounded-2xl flex items-center justify-center rotate-3">
            <Ghost className="h-9 w-9 text-slate-400" />
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Farewell,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {userData.name}
          </span>
          .
        </h1>

        <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto">
          {userData.joinedAt && (
            <>
              You were with us since{" "}
              <span className="text-slate-200">
                {userData.joinedAt.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              .{" "}
            </>
          )}
          Your data has been fully erased. Transmission ended.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto group relative px-8 py-3 bg-white text-black rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative flex items-center justify-center gap-2">
              Start Anew <Sparkles className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 bg-white/5 text-slate-300 border border-white/10 rounded-xl font-semibold hover:bg-white/10 hover:text-white transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
