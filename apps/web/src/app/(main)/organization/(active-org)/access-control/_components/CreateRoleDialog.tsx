"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LockKeyhole, Loader2, Save } from "@repo/ui/icons";
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
  Checkbox,
} from "@repo/ui/components";
import { roleSchema } from "@app/lib/validations/organization";

const RESOURCE_ACTIONS = {
  organization: ["update", "delete"],
  member: ["create", "update", "delete"],
  invitation: ["create", "cancel"],
  team: ["create", "update", "delete"],
  ac: ["create", "read", "update", "delete"],
  ticket: ["create", "share", "update", "delete"],
} as const;

type RoleFormValues = z.infer<typeof roleSchema>;

interface RoleDialogProps {
  onClose: () => void;
  onSuccess: () => void;
  initialData?: {
    id: string;
    name: string;
    permissions: Record<string, string[]>;
  };
}

export function CreateRoleDialog({
  onClose,
  onSuccess,
  initialData,
}: RoleDialogProps) {
  const isEditMode = !!initialData;

  //   const form = useForm<RoleFormValues>({
  //     resolver: zodResolver(roleSchema),
  //     defaultValues: {
  //       roleName: initialData?.name || "",
  //       permissions:
  //         initialData?.permissions ||
  //         Object.fromEntries(
  //           Object.keys(RESOURCE_ACTIONS).map((key) => [key, []]),
  //         ),
  //     },
  //   });
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      roleName: initialData?.name || "",
      permissions: Object.fromEntries(
        Object.keys(RESOURCE_ACTIONS).map((key) => [
          key,
          initialData?.permissions?.[key] || [], // Use existing perms or fallback to empty array
        ]),
      ),
    },
  });
  async function onSubmit(values: RoleFormValues) {
    const cleanPermissions = Object.fromEntries(
      Object.entries(values.permissions).filter(
        ([_, actions]) => actions.length > 0,
      ),
    );

    const payload = {
      role: values.roleName.toLowerCase().replace(/\s+/g, "-"),
      permission: cleanPermissions,
    };

    const { error } = isEditMode
      ? await authClient.organization.updateRole({
          roleId: initialData.id,
          data:
            initialData.name === payload.role
              ? {
                  permission: payload.permission,
                }
              : {
                  roleName: payload.role,
                  permission: payload.permission,
                },
        })
      : await authClient.organization.createRole(payload);

    if (error) {
      notify.error(
        error.message || `Failed to ${isEditMode ? "update" : "create"} role.`,
      );
    } else {
      notify.success(
        isEditMode ? "Policy Synchronized" : "Security Policy Updated",
        `Custom role successfully ${isEditMode ? "updated" : "deployed"}.`,
      );
      onSuccess();
      onClose();
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-[#0D0D0D] border-white/10 p-0 overflow-hidden outline-none">
        <div
          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isEditMode ? "from-amber-500 to-orange-600" : "from-purple-500 to-magenta-600"}`}
        />

        <div className="p-6">
          <DialogHeader className="mb-6 flex flex-row items-center justify-between space-y-0">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <LockKeyhole
                className={isEditMode ? "text-amber-400" : "text-purple-400"}
                size={20}
              />
              {isEditMode ? "Edit Role Manifest" : "Compile Role"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-6">
              <Controller
                name="roleName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Role Designation
                    </FieldLabel>
                    <Input
                      {...field}
                      //   disabled={isEditMode}
                      className="bg-[#0A0A0A] border-white/10 rounded-xl"
                    />
                    {/* Haven't Full decided on whether to let the users edit the role name */}
                    {/* {isEditMode && (
                      <p className="text-[9px] text-slate-500 mt-1 italic">
                        Role identifiers cannot be renamed once deployed.
                      </p>
                    )} */}
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 block">
                  Access Matrix
                </label>
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(RESOURCE_ACTIONS).map(
                    ([resource, actions]) => (
                      <div
                        key={resource}
                        className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                      >
                        <span className="text-sm font-medium text-slate-300 capitalize">
                          {resource}
                        </span>
                        <div className="flex gap-3">
                          {actions.map((action) => (
                            <Controller
                              key={`${resource}-${action}`}
                              name={`permissions.${resource}`}
                              control={form.control}
                              render={({ field }) => (
                                <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer hover:text-white transition-colors">
                                  <Checkbox
                                    checked={field.value?.includes(action)}
                                    onCheckedChange={(checked) => {
                                      const next = checked
                                        ? [...(field.value || []), action]
                                        : field.value.filter(
                                            (a: string) => a !== action,
                                          );
                                      field.onChange(next);
                                    }}
                                    className="border-white/20 data-[state=checked]:bg-purple-500"
                                  />
                                  <span className="capitalize">{action}</span>
                                </label>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full bg-purple-500/10 border border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all py-6 rounded-xl font-bold"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                <span className="ml-2">
                  {isEditMode ? "Update Definition" : "Save Definition"}
                </span>
              </Button>
            </FieldGroup>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
