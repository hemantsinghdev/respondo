import Link from "next/link";
import { Alert, AlertDescription } from "@repo/ui/components";
import { AlertCircle } from "lucide-react";
import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { LoginForm } from "./_components/LoginForm";
import { SocialProviders } from "@app/components/SocialProviders";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const filter = await searchParams;
  const error = filter.error;

  return (
    <AccessAuthLayout
      title="Welcome Back"
      description="Log in to access your AI-powered dashboard"
    >
      {error && (
        <Alert
          variant="destructive"
          className="mb-6 bg-red-500/10 border-red-500/20 text-red-400"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.includes("Invalid email or password")
              ? "Invalid email or password."
              : "An error occurred. Please try again."}
          </AlertDescription>
        </Alert>
      )}
      <SocialProviders />
      <LoginForm />

      <div className="mt-6 text-center text-sm text-[#94A3B8]">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
        >
          Create Account
        </Link>
      </div>
    </AccessAuthLayout>
  );
}
