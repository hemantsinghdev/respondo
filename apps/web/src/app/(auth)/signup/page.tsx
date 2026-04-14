import { SignupForm } from "./_components/SignUpForm";
import Link from "next/link";
import { Alert, AlertDescription } from "@repo/ui/components";
import { AlertCircle } from "@repo/ui/icons";
import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { SocialProviders } from "@app/components/SocialProviders";

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
      {error && (
        <Alert
          variant="destructive"
          className="mb-6 bg-red-500/10 border-red-500/20 text-red-400"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.includes("User already exists")
              ? "User already exists."
              : "An error occurred. Please try again."}
          </AlertDescription>
        </Alert>
      )}
      <SocialProviders />
      <SignupForm />

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
