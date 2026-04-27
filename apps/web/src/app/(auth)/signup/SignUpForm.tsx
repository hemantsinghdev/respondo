"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@app/lib/validations/auth";
import { Button, FieldGroup } from "@repo/ui/components";
import { authClient } from "@repo/auth/client";
import { useState } from "react";
import { Loader2, User, Mail, Lock, ShieldCheck, Zap } from "@repo/ui/icons";
import { useRouter } from "next/navigation";
import * as z from "zod";
import AuthField from "../_components/AuthField";

type SignupFormValues = z.infer<typeof signupSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    await authClient.signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
      },
      {
        onSuccess: () => {
          router.push("/dashboard?account_created=true&login=success");
        },
        onError: (ctx) => {
          router.push(`?error=${encodeURIComponent(ctx.error.message)}`);
        },
      },
    );
    setLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {/* Visual Divider */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#121212] px-2 text-slate-500">Or use email</span>
        </div>
      </div>

      <FieldGroup className="">
        <div className="flex flex-col items-center justify-center gap-5">
          {/* Full Name */}
          <AuthField
            name="name"
            label="Full Name"
            placeholder="Hemant Singh"
            control={form.control}
            icon={User}
          />

          <AuthField
            name="email"
            label="Email Address"
            type="email"
            placeholder="agent@network.com"
            control={form.control}
            icon={Mail}
          />

          {/* Password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthField
              name="password"
              label="Password"
              type="password"
              control={form.control}
              icon={Lock}
            />
            <AuthField
              name="confirmPassword"
              label="Verify"
              type="password"
              control={form.control}
              icon={ShieldCheck}
            />
          </div>
        </div>
      </FieldGroup>

      <Button
        type="submit"
        disabled={loading}
        className="group relative overflow-hidden w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-bold h-12 rounded-xl transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <Zap className="h-4 w-4 fill-current group-hover:animate-pulse" />
              Initialize Account
            </>
          )}
        </span>
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
    </form>
  );
}
