"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { authClient } from "@repo/auth/client";
import {
  Button,
  FieldGroup,
  Alert,
  AlertDescription,
} from "@repo/ui/components";
import { Loader2, Mail, CheckCircle2, ArrowRight } from "@repo/ui/icons";
import { useRouter } from "next/navigation";
import AuthField from "../_components/AuthField";
import { forgotPasswordSchema } from "@app/lib/validations/auth";

type ForgotFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm({ isSent }: { isSent: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setLoading(true);
    await authClient.requestPasswordReset(
      {
        email: data.email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      },
      {
        onSuccess: () => {
          router.push("?sent=true");
        },
        onError: (ctx) => {
          router.push(`?error=${encodeURIComponent(ctx.error.message)}`);
        },
      },
    );
    setLoading(false);
  };

  if (isSent) {
    return (
      <Alert className="bg-cyan-500/10 border-cyan-500/20 text-cyan-400 py-8 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center w-full space-y-3">
          <CheckCircle2 className="h-8 w-8 text-cyan-500" />
          <AlertDescription className="text-sm font-medium text-center m-0 max-w-none">
            Reset link sent! Please check your inbox for instructions to restore
            access.
          </AlertDescription>
        </div>
      </Alert>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <AuthField
          name="email"
          label="Email Address"
          type="email"
          placeholder="agent@network.com"
          control={form.control}
          icon={Mail}
        />
      </FieldGroup>

      <Button
        type="submit"
        disabled={loading}
        className="group relative w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold h-12 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              Send Reset Link
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </span>
      </Button>
    </form>
  );
}
