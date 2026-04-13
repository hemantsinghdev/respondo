"use client";

import { authClient } from "@repo/auth/client";
import { useConfirmStore } from "@app/lib/stores/confirmStore";
import { notify } from "@app/lib/notify";
import { Trash2 } from "@repo/ui/icons";

export default function DeleteAccountSection() {
  const { data: session } = authClient.useSession();
  const { openConfirm } = useConfirmStore();

  const handleDeleteAccount = () => {
    openConfirm({
      title: "Delete Account Permanently?",
      description:
        "All your data will be wiped from Respondo CRM. This action is irreversible.",
      variant: "danger",
      actionLabel: "Permanently Delete",
      confirmText: session?.user.email,
      onConfirm: async () => {
        const { data, error } = await authClient.deleteUser({
          callbackURL: "/goodbye",
        });
        if (error) notify.error("Error deleting account.");
        else
          notify.success(
            "Account Deletion Link Sent on Email",
            undefined,
            20000,
          );
      },
    });
  };

  return (
    <section className="mt-12">
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.02] p-6 flex flex-col md:flex-row items-center justify-between gap-6 border-dashed">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
            <Trash2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Terminate Account</h3>
            <p className="text-sm text-slate-400 max-w-md">
              Deleting your account is permanent. This will erase your personal
              profile and access to the organization's data.
            </p>
          </div>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="w-full md:w-auto px-8 py-3 bg-red-500/10 border border-red-500/50 text-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/5"
        >
          Delete Account
        </button>
      </div>
    </section>
  );
}
