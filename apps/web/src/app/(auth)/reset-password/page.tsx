import { AccessAuthLayout } from "@app/components/AccessAuthLayout";
import { ResetPasswordForm } from "./ResetPasswordForm";
import ErrorAlert from "../_components/ErrorAlert";
import { redirect } from "next/navigation";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token?: string; error?: string };
}) {
  const params = await searchParams;
  const token = params.token;
  const error = params.error;

  if (!token) {
    redirect("/login");
  }

  return (
    <AccessAuthLayout
      title="Create New Password"
      description="Your identity is verified. Please choose a strong new password."
    >
      {error && <ErrorAlert error={error} />}

      <ResetPasswordForm token={token} />
    </AccessAuthLayout>
  );
}
