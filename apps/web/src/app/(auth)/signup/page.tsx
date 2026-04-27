import { SignUpForm } from "./SignUpForm";
import Link from "next/link";
import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { SocialProviders } from "@app/app/(auth)/_components/SocialProviders";
import ErrorAlert from "../_components/ErrorAlert";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const filter = await searchParams;
  const error = filter.error;
  return (
    <AccessAuthLayout
      title="Create Account"
      description="Start managing your customers with AI efficiency"
    >
      {error && <ErrorAlert error={error} />}
      <SocialProviders />
      <SignUpForm />

      <div className="mt-6 text-center text-sm text-[#94A3B8]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors"
        >
          Login
        </Link>
      </div>
    </AccessAuthLayout>
  );
}
