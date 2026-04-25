"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import {
  X,
  Mail,
  Trash2,
  Loader2,
  Clock,
  Shield,
  AlertCircle,
} from "@repo/ui/icons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Badge,
} from "@repo/ui/components";

export function PendingInvitationsDialog({ onClose }: { onClose: () => void }) {
  const [invites, setInvites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchInvites = async () => {
    setLoading(true);
    const { data, error } = await authClient.organization.listInvitations();
    if (error) {
      notify.error("Failed to sync invitation grid.");
    } else {
      setInvites(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleCancel = async (invitationId: string) => {
    setCancellingId(invitationId);
    const { error } = await authClient.organization.cancelInvitation({
      invitationId,
    });

    if (error) {
      notify.error(error.message || "Failed to abort invitation.");
    } else {
      notify.success("Transmission Aborted", "Invitation has been purged.");
      setInvites((prev) => prev.filter((i) => i.id !== invitationId));
    }
    setCancellingId(null);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-[#0D0D0D] border-white/10 p-0 overflow-hidden outline-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600" />

        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-amber-400" size={20} /> Pending
              Transmissions
            </DialogTitle>
          </DialogHeader>

          <div className="rounded-xl border border-white/5 bg-[#0A0A0A] overflow-hidden">
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead className="text-slate-400">Target Email</TableHead>
                  <TableHead className="text-slate-400">Access Level</TableHead>
                  <TableHead className="text-right text-slate-400">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-32 text-center">
                      <Loader2 className="h-6 w-6 animate-spin text-cyan-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : !invites.some((invite) => invite.status === "pending") ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-32 text-center text-slate-500"
                    >
                      <AlertCircle
                        className="mx-auto mb-2 opacity-20"
                        size={32}
                      />
                      <p>No active outgoing invitations.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  invites.map(
                    (invite) =>
                      invite.status === "pending" && (
                        <TableRow
                          key={invite.id}
                          className="border-white/5 hover:bg-white/[0.01]"
                        >
                          <TableCell className="font-medium text-slate-200">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                              {invite.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="capitalize border-white/10 text-slate-400 bg-white/5"
                            >
                              <Shield size={10} className="mr-1" />{" "}
                              {invite.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              disabled={cancellingId === invite.id}
                              onClick={() => handleCancel(invite.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10 h-8 px-3"
                            >
                              {cancellingId === invite.id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <>
                                  <Trash2 size={14} className="mr-2" />
                                  Abort
                                </>
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ),
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
