"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import { KeyRound, Loader2, ChevronDown } from "@repo/ui/icons";
import { changePasswordSchema } from "@app/lib/validations/changePassword";

type PasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordSection() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onChangePassword = async (values: PasswordFormValues) => {
    setIsChangingPassword(true);
    const { error } = await authClient.changePassword({
      newPassword: values.newPassword,
      currentPassword: values.currentPassword,
    });

    if (error) {
      notify.error(error.message || "Failed to update password");
    } else {
      notify.success("Password updated successfully");
      reset();
      setShowPasswordForm(false);
    }
    setIsChangingPassword(false);
  };

  return (
    <section className="rc-card rounded-2xl border border-white/5 bg-[#0D0D0D] overflow-hidden transition-all">
      <div
        onClick={() => setShowPasswordForm(!showPasswordForm)}
        className="p-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <KeyRound className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">
              Security Password
            </h3>
            <p className="text-sm text-slate-500">
              Update your account password regularly to stay secure.
            </p>
          </div>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${showPasswordForm ? "rotate-180" : ""}`}
        />
      </div>

      {showPasswordForm && (
        <div className="p-6 border-t border-white/5 bg-black/20 animate-in slide-in-from-top-2">
          <form
            onSubmit={handleSubmit(onChangePassword)}
            className="space-y-4 max-w-lg"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">
                Current Password
              </label>
              <input
                {...register("currentPassword")}
                type="password"
                className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500/20 outline-none"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  New Password
                </label>
                <input
                  {...register("newPassword")}
                  type="password"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500/20 outline-none"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">
                  Confirm
                </label>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-cyan-500/20 outline-none"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isChangingPassword}
              className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {isChangingPassword && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Update Password
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
