"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { authClient } from "@repo/auth/client";
import { Button, FieldGroup } from "@repo/ui/components";
import { Loader2, Lock, ShieldCheck, Sparkles } from "@repo/ui/icons";
import { useRouter } from "next/navigation";
import AuthField from "../_components/AuthField";
import { resetPasswordSchema } from "@app/lib/validations/auth";

type ResetFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ResetFormValues) => {
    setLoading(true);
    await authClient.resetPassword(
      {
        newPassword: data.password,
        token,
      },
      {
        onSuccess: () => {
          router.push("/login?reset=success");
        },
        onError: (ctx) => {
          router.push(
            `?token=${token}&error=${encodeURIComponent(ctx.error.message)}`,
          );
        },
      },
    );
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <div className="space-y-5">
          <AuthField
            name="password"
            label="New Password"
            type="password"
            placeholder="••••••••"
            control={form.control}
            icon={Lock}
          />

          <AuthField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            control={form.control}
            icon={ShieldCheck}
          />
        </div>
      </FieldGroup>

      <Button
        type="submit"
        disabled={loading}
        className="group relative w-full bg-gradient-to-r from-emerald-600 to-cyan-700 hover:from-emerald-500 hover:to-cyan-600 text-white font-bold h-12 rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Update Password
            </>
          )}
        </span>
      </Button>
    </form>
  );
}
