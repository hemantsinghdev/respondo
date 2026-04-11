import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/auth", "@repo/email"],
};

export default nextConfig;
