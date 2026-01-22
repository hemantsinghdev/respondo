"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@app/lib/validations/auth";
import { Button, Input, Label } from "@repo/ui/components";
import { authClient } from "@repo/auth/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (ctx) => {
          router.push("/dashboard");
        },
        onError: (ctx) => {
          router.push(`?error=${ctx.error.message}`);
        },
      },
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#121212] px-2 text-slate-500">Or use email</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-[#94A3B8] ml-1">
          Email
        </Label>
        <Input
          type="email"
          {...register("email")}
          className={cn(
            "bg-black/40 border-white/5 focus:ring-1 focus:ring-cyan-500/30 transition-all h-11 text-white",
            errors.email && "border-red-500/50",
          )}
        />
        {errors.email && (
          <p className="text-[10px] text-red-400 ml-1">
            {errors.email.message as string}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-[#94A3B8] ml-1">
          Password
        </Label>
        <Input
          type="password"
          {...register("password")}
          className={cn(
            "bg-black/40 border-white/5 focus:ring-1 focus:ring-cyan-500/30 transition-all h-11 text-white",
            errors.password && "border-red-500/50",
          )}
        />
        {errors.password && (
          <p className="text-[10px] text-red-400 ml-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="cursor-pointer w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-white font-bold h-12 rounded-xl transition-all active:scale-[0.98]"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Login"}
      </Button>
    </form>
  );
}
