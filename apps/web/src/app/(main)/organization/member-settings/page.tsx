"use client";

import { authClient } from "@repo/auth/client";
import { useConfirmStore } from "@app/lib/stores/confirmStore";
import { notify } from "@app/lib/notify";
import { useRouter } from "next/navigation";
import {
  ShieldAlert,
  LogOut,
  Trash2,
  ArrowLeft,
  Loader2,
} from "@repo/ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { findMembership } from "@app/actions/findMembership";

export default function MemberSettingsPage() {
  const { data: organizations, isPending } = authClient.useListOrganizations();
  const [isOwner, setIsOwner] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { data: session } = authClient.useSession();
  const { openConfirm } = useConfirmStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const activeOrg = organizations?.[0];

  useEffect(() => {
    const checkOwnership = async () => {
      if (!session?.user?.id || !activeOrg?.id) return;

      try {
        setIsChecking(true);
        const membership = await findMembership(session.user.id);
        const isUserOwner = !!(
          membership &&
          membership.organizationId === activeOrg.id &&
          membership.role === "owner"
        );
        setIsOwner(isUserOwner);
      } catch (error) {
        console.error("Ownership check failed:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkOwnership();
  }, [session?.user?.id, activeOrg?.id]);

  const handleLeave = () => {
    openConfirm({
      title: "Sever Connection?",
      description:
        "You will lose access to all tickets and data within this organization node.",
      confirmText: "Leave Organization",
      variant: "warning",
      actionLabel: "Leave Organization",
      onConfirm: async () => {
        if (!activeOrg?.id) {
          notify.error("No active node detected.");
          return;
        }
        setIsProcessing(true);
        const { error } = await authClient.organization.leave({
          organizationId: activeOrg.id,
        });
        if (error) {
          notify.error("Failed to leave organization.");
          setIsProcessing(false); // Reset if error
        } else {
          notify.success("Connection terminated.");
          router.push("/organization");
        }
      },
    });
  };

  const handlePurge = () => {
    openConfirm({
      title: "Absolute Purge?",
      description:
        "Warning: This action is irreversible. All organization data, history, and AI models will be erased from the Respondo grid.",
      confirmText: "Purge Everything",
      variant: "danger",
      actionLabel: "Delete Organization",
      onConfirm: async () => {
        if (!activeOrg?.id) {
          notify.error("No active node detected.");
          return;
        }
        setIsProcessing(true);
        const { error } = await authClient.organization.delete({
          organizationId: activeOrg.id,
        });
        if (error) {
          notify.error("Failed to Delete Organization.");
          setIsProcessing(false); // Reset if error
        } else {
          notify.success("Node successfully erased.");
          router.push("/organization");
        }
      },
    });
  };

  if (isPending || isChecking)
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <Link
        href="/organization"
        className="group flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-mono uppercase tracking-widest">
          Back to Node
        </span>
      </Link>

      <div className="bg-[#0D0D0D] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldAlert size={120} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Member Settings</h2>
        <p className="text-slate-400 text-sm mb-8">
          Manage your administrative status and node connectivity.
        </p>

        <div className="space-y-4">
          {isOwner ? (
            <section className="p-6 rounded-2xl bg-red-500/[0.03] border border-red-500/10 space-y-4">
              <div>
                <h3 className="text-red-400 font-bold flex items-center gap-2">
                  <Trash2 size={18} /> Danger Zone
                </h3>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">
                  Owner Level Permissions Required
                </p>
              </div>
              <p className="text-sm text-slate-400">
                Purging the organization will permanently delete all associated
                data for all members. This cannot be undone.
              </p>
              <button
                onClick={handlePurge}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Purging Node...
                  </>
                ) : (
                  "Purge Organization Node"
                )}
              </button>
            </section>
          ) : (
            <section className="p-6 rounded-2xl bg-amber-500/[0.03] border border-amber-500/10 space-y-4">
              <div>
                <h3 className="text-amber-400 font-bold flex items-center gap-2">
                  <LogOut size={18} /> Sever Connection
                </h3>
              </div>
              <p className="text-sm text-slate-400">
                Leave this organization. You will need an invite from an
                administrator to reconnect to this node.
              </p>
              <button
                onClick={handleLeave}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-white transition-all font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Severing Connection...
                  </>
                ) : (
                  "Leave Organization"
                )}
              </button>
            </section>
          )}
        </div>
      </div>

      <div className="text-center">
        <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em]">
          Security Protocol 402-A // Respondo v3.0
        </p>
      </div>
    </div>
  );
}
