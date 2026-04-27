"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  KeyRound,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
} from "@repo/ui/icons";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
  Button,
} from "@repo/ui/components";
import { changePasswordSchema } from "@app/lib/validations/auth";

type PasswordFormValues = z.infer<typeof changePasswordSchema>;

export function ChangePasswordDialog({ onClose }: { onClose: () => void }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: PasswordFormValues) {
    const { error } = await authClient.changePassword({
      newPassword: values.newPassword,
      currentPassword: values.currentPassword,
    });

    if (error) {
      notify.error(error.message || "Failed to update security credentials.");
    } else {
      notify.success(
        "Security override successful",
        "Your password has been updated.",
      );
      onClose();
    }
  }

  const preventPaste = (e: React.ClipboardEvent) => e.preventDefault();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0D0D0D]/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden outline-none shadow-[0_0_50px_-12px_rgba(6,182,212,0.5)]">
        {/* Neon Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]" />

        <div className="p-6">
          <DialogHeader className="mb-8 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-3 tracking-tight">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <ShieldCheck className="text-cyan-400" size={20} />
              </div>
              Update Security Key
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
              {/* Current Password */}
              <Controller
                name="currentPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5 block">
                      Current Credentials
                    </FieldLabel>
                    <div className="relative group">
                      <Input
                        {...field}
                        type={showCurrent ? "text" : "password"}
                        onPaste={preventPaste}
                        placeholder="••••••••"
                        className="bg-[#0A0A0A]/50 border-white/10 rounded-xl focus-visible:ring-cyan-500/40 pr-12 h-12 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                      >
                        {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError
                        className="text-[11px] text-red-400 mt-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </Field>
                )}
              />

              <div className="h-[1px] bg-white/5 w-full my-2" />

              {/* New Password */}
              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name="newPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5 block">
                        New Security String
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNew ? "text" : "password"}
                          onPaste={preventPaste}
                          className="bg-[#0A0A0A]/50 border-white/10 rounded-xl focus-visible:ring-cyan-500/40 h-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                        >
                          {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError
                          className="text-[11px] text-red-400 mt-1"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-1.5 block">
                        Confirm Sequence
                      </FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        onPaste={preventPaste}
                        className="bg-[#0A0A0A]/50 border-white/10 rounded-xl focus-visible:ring-cyan-500/40 h-12"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-[11px] text-red-400 mt-1"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4 bg-transparent border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all py-6 rounded-xl font-bold group"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Lock
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
                <span className="ml-2 uppercase tracking-widest text-xs">
                  Authorize Change
                </span>
              </Button>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
