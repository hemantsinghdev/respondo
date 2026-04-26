"use client";

import { useState, useEffect } from "react";
import { authClient } from "@repo/auth/client";
import {
  Settings2,
  Plus,
  Loader2,
  ShieldCheck,
  ChevronRight,
  Trash2,
  Edit3,
  ShieldAlert,
} from "@repo/ui/icons";
import { CreateRoleDialog } from "./CreateRoleDialog";
import { notify } from "@app/lib/notify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@repo/ui/components";
import { useConfirmStore } from "@app/lib/stores/confirmStore";

interface RoleDefinition {
  id: string;
  name: string;
  isDefault?: boolean;
  permissions: Record<string, string[]>;
}

export function RolesTab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleDefinition | null>(null);
  const [selectedRole, setSelectedRole] = useState<RoleDefinition | null>(null);
  const [roles, setRoles] = useState<RoleDefinition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openConfirm } = useConfirmStore();

  const fetchRoles = async () => {
    setIsLoading(true);
    const { data } = await authClient.organization.listRoles();

    const systemDefaults: RoleDefinition[] = [
      {
        id: "owner",
        name: "owner",
        isDefault: true,
        permissions: { all: ["*"] },
      },
      {
        id: "admin",
        name: "admin",
        isDefault: true,
        permissions: {
          organization: ["update"],
          member: ["create", "update", "delete"],
        },
      },
      {
        id: "member",
        name: "member",
        isDefault: true,
        permissions: { ticket: ["create", "read"] },
      },
    ];

    const customRoles: RoleDefinition[] = (data || []).map((r: any) => ({
      id: r.id || r.role,
      name: r.role,
      permissions: r.permissions || r.permission || {},
      isDefault: false,
    }));

    setRoles([...systemDefaults, ...customRoles]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDelete = (roleId: string, roleName: string) => {
    openConfirm({
      title: `Delete ${roleName} role Permanently?`,
      description:
        "This Role will be permenantly deleted, and can not be retrieved back",
      variant: "danger",
      actionLabel: "Purge Role",
      onConfirm: async () => {
        const { data, error } = await authClient.organization.deleteRole({
          roleId,
        });
        if (error) {
          notify.error(error.message || "Failed to purge role.");
        } else {
          notify.success("Role Purged", "The security node has been removed.");
          setSelectedRole(null);
          fetchRoles();
        }
      },
    });
  };

  const openEdit = (role: RoleDefinition) => {
    setEditingRole(role);
    setSelectedRole(null); // Close the detail view
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Settings2 className="text-slate-400" size={18} /> Access Control
          Matrix
        </h3>
        <Button
          onClick={() => {
            setEditingRole(null);
            setIsDialogOpen(true);
          }}
          className="bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500 hover:text-white transition-all font-bold"
        >
          <Plus size={16} className="mr-2" /> Create Custom Role
        </Button>
      </div>

      {/* Grid Section */}
      {isLoading ? (
        <div className="flex py-24 justify-center">
          <Loader2 className="animate-spin text-purple-500" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role)}
              className="flex items-center justify-between p-5 bg-[#0D0D0D] border border-white/10 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/[0.02] transition-all group text-left"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${role.isDefault ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`}
                >
                  <ShieldCheck size={20} />
                </div>
                <span className="text-lg font-bold text-white capitalize">
                  {role.name}
                </span>
              </div>
              <ChevronRight
                className="text-slate-600 group-hover:text-white transition-colors"
                size={18}
              />
            </button>
          ))}
        </div>
      )}

      {/* --- Detail Popping Card (View Permissions) --- */}
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="bg-[#0D0D0D] border-white/10 sm:max-w-md p-0 overflow-hidden outline-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />

          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold text-white capitalize flex items-center gap-2">
                {selectedRole?.name}
                <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded border border-white/10 text-slate-500 uppercase">
                  {selectedRole?.isDefault ? "System" : "Custom"}
                </span>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                Access Permissions
              </label>

              <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar">
                {selectedRole &&
                  Object.entries(selectedRole.permissions).map(
                    ([resource, actions]) => (
                      <div
                        key={resource}
                        className="bg-white/[0.02] border border-white/5 p-3 rounded-xl"
                      >
                        <div className="text-xs font-bold text-purple-400 capitalize mb-2">
                          {resource}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(actions as string[]).map((action) => (
                            <span
                              key={action}
                              className="text-[11px] px-2 py-1 bg-black rounded border border-white/10 text-slate-300"
                            >
                              {action}
                            </span>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
              </div>

              {/* Action Buttons inside Card */}
              <div className="flex gap-2 mt-8">
                {selectedRole?.isDefault ? (
                  <div className="w-full flex items-center justify-center gap-2 p-3 bg-white/5 border border-white/5 rounded-xl text-slate-500 text-xs italic">
                    <ShieldAlert size={14} /> Immutable System Role
                  </div>
                ) : (
                  <>
                    <Button
                      onClick={() => openEdit(selectedRole!)}
                      className="flex-1 bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white gap-2"
                    >
                      <Edit3 size={16} /> Edit
                    </Button>
                    <Button
                      onClick={() =>
                        handleDelete(selectedRole!.id, selectedRole!.name)
                      }
                      className="flex-1 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white gap-2"
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {isDialogOpen && (
        <CreateRoleDialog
          initialData={
            editingRole
              ? {
                  id: editingRole.id,
                  name: editingRole.name,
                  permissions: editingRole.permissions,
                }
              : undefined
          }
          onClose={() => {
            setIsDialogOpen(false);
            setEditingRole(null);
          }}
          onSuccess={fetchRoles}
        />
      )}
    </div>
  );
}
