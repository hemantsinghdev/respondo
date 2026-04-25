"use client";

import { useState } from "react";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import {
  Building2,
  ShieldCheck,
  UserCircle2,
  ArrowRight,
  Check,
  X,
  Loader2,
} from "@repo/ui/icons";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
  Badge,
} from "@repo/ui/components";

export function InvitationClient({ invitation }: { invitation: any }) {
  const [isProcessing, setIsProcessing] = useState<"accept" | "reject" | null>(
    null,
  );

  const handleAction = async (action: "accept" | "reject") => {
    setIsProcessing(action);

    const { error } =
      action === "accept"
        ? await authClient.organization.acceptInvitation({
            invitationId: invitation.id,
          })
        : await authClient.organization.rejectInvitation({
            invitationId: invitation.id,
          });

    if (error) {
      notify.error(error.message || `Signal disruption. Could not ${action}.`);
      setIsProcessing(null);
    } else {
      notify.success(
        action === "accept" ? "Access Granted" : "Signal Dropped",
        action === "accept" ? "Welcome to the grid." : "Invitation purged.",
      );
      window.location.href = action === "accept" ? "/organization" : "/";
    }
  };

  return (
    <div className="relative w-full max-w-lg animate-in fade-in zoom-in-95 duration-700">
      {/* Background Glows */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0D0D0D]/80 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-600" />

        <div className="p-8">
          {/* Organization Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {invitation.organizationName}
              </h1>
              <p className="text-slate-400 text-sm flex items-center justify-center gap-1.5 mt-1">
                <Building2 size={14} className="text-cyan-500" />
                {invitation.organizationSlug}.grid
              </p>
            </div>
          </div>

          {/* Invitation Details */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <ShieldCheck size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    Assigned Role
                  </p>
                  <p className="text-white font-medium capitalize">
                    {invitation.role}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
              >
                Verified
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <UserCircle2 size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Invited As
                </p>
                <p className="text-white font-medium">{invitation.email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="ghost"
              disabled={!!isProcessing}
              onClick={() => handleAction("reject")}
              className="h-14 rounded-2xl border border-white/5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 text-slate-400 transition-all"
            >
              {isProcessing === "reject" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <X className="mr-2" size={18} />
              )}
              Decline
            </Button>

            <Button
              disabled={!!isProcessing}
              onClick={() => handleAction("accept")}
              className="h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
              {isProcessing === "accept" ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Check className="mr-2" size={18} />
              )}
              Establish Link
            </Button>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-500 uppercase tracking-[0.2em]">
            Secure encrypted invitation • Expires{" "}
            {new Date(invitation.expiresAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
