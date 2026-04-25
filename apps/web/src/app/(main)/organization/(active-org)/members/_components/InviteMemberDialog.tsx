"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Mail, Shield, Loader2, Send } from "@repo/ui/icons";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from "@repo/ui/components";
import { inviteSchema } from "@app/lib/validations/organization";

type InviteFormValues = z.infer<typeof inviteSchema>;

export function InviteMemberDialog({ onClose }: { onClose: () => void }) {
  const [roles, setRoles] = useState<string[]>([]);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  useEffect(() => {
    const fetchRoles = async () => {
      const { data, error } = await authClient.organization.listRoles();
      if (error) {
        notify.error("Failed to fetch Roles");
        return;
      }
      const dynamicRoles = data?.map((r) => r.role) || [];
      setRoles([...new Set([...dynamicRoles, "owner", "admin", "member"])]);
    };
    fetchRoles();
  }, []);

  async function onSubmit(values: InviteFormValues) {
    const { error } = await authClient.organization.inviteMember({
      email: values.email,
      role: values.role as any,
      resend: true,
    });

    if (error) {
      notify.error(error.message || "Failed to dispatch invitation.");
    } else {
      notify.success(
        "Transmission sent.",
        "The invitation has been dispatched.",
      );
      onClose();
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#0D0D0D] border-white/10 p-0 overflow-hidden outline-none">
        {/* Visual Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />

        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="text-cyan-400" size={20} /> Deploy Invitation
            </DialogTitle>
          </DialogHeader>

          <form id="invite-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-4">
              {/* Email Field with Controller */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Target Email Address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="invite-email"
                      placeholder="agent@cyberdyne.com"
                      aria-invalid={fieldState.invalid}
                      className="bg-[#0A0A0A] border-white/10 rounded-xl focus-visible:ring-cyan-500/50"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Role Field with Controller */}
              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Access Level (Role)
                    </FieldLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="bg-[#0A0A0A] border-white/10 rounded-xl focus:ring-cyan-500/50"
                        aria-invalid={fieldState.invalid}
                      >
                        <div className="flex items-center gap-2">
                          <Shield className="text-slate-500 h-4 w-4" />
                          <SelectValue placeholder="Select a role" />
                        </div>
                      </SelectTrigger>
                      <SelectContent className="bg-[#0D0D0D] border-white/10 text-white">
                        {roles.map((r) => (
                          <SelectItem
                            key={r}
                            value={r}
                            className="capitalize focus:bg-cyan-500/20 focus:text-cyan-400"
                          >
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full mt-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all py-6 rounded-xl font-bold"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Send size={18} />
                )}
                <span className="ml-2">Dispatch Invite</span>
              </Button>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
