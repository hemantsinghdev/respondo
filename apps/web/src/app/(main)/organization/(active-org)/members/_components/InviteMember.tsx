"use client";

import { useState } from "react";
import { Clock, UserPlus } from "@repo/ui/icons";
import { InviteMemberDialog } from "./InviteMemberDialog";
import { PendingInvitationsDialog } from "./PendingInvitationsDialog";

export function InviteMember() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isPendingOpen, setIsPendingOpen] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* Pending Invites Button */}
      <button
        onClick={() => setIsPendingOpen(true)}
        className="group flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 font-bold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
      >
        <Clock
          size={18}
          className="text-amber-400 group-hover:rotate-12 transition-transform"
        />
        <span>Invitations</span>
      </button>

      {/* Main Invite Button */}
      <button
        onClick={() => setIsInviteOpen(true)}
        className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 font-bold text-white transition-all"
      >
        <UserPlus size={18} />
        <span>Invite Member</span>
      </button>

      {/* Modals */}
      {isInviteOpen && (
        <InviteMemberDialog onClose={() => setIsInviteOpen(false)} />
      )}
      {isPendingOpen && (
        <PendingInvitationsDialog onClose={() => setIsPendingOpen(false)} />
      )}
    </div>
  );
}
