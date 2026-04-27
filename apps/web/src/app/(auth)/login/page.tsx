import Link from "next/link";
import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { LoginForm } from "./LoginForm";
import { SocialProviders } from "@app/app/(auth)/_components/SocialProviders";
import ErrorAlert from "../_components/ErrorAlert";

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
      {error && <ErrorAlert error={error} />}
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
