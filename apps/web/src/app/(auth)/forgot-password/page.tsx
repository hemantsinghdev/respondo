import Link from "next/link";
import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import ErrorAlert from "../_components/ErrorAlert";
import { ChevronLeft } from "@repo/ui/icons";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { error?: string; sent?: string };
}) {
  const params = await searchParams;
  const error = params.error;
  const isSent = params.sent === "true";

  return (
    <AccessAuthLayout
      title="Reset Password"
      description="Enter your email to receive a secure password reset link."
    >
      {error && <ErrorAlert error={error} />}

      <ForgotPasswordForm isSent={isSent} />

      <div className="mt-8 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-cyan-500 transition-colors"
        >
          <ChevronLeft className="h-3 w-3" />
          Back to Login
        </Link>
      </div>
    </AccessAuthLayout>
  );
}
