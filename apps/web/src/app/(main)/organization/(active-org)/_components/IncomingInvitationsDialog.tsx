"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import {
  Inbox,
  Check,
  X,
  Loader2,
  Building2,
  Shield,
  Wifi,
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

export function IncomingInvitationsDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchInvites = async () => {
    setLoading(true);
    const { data, error } = await authClient.organization.listUserInvitations();
    if (error) {
      notify.error("Failed to intercept signals.");
    } else {
      setInvitations(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleAction = async (
    invitationId: string,
    action: "accept" | "reject",
  ) => {
    setProcessingId(invitationId);

    const { error } =
      action === "accept"
        ? await authClient.organization.acceptInvitation({ invitationId })
        : await authClient.organization.rejectInvitation({ invitationId });

    if (error) {
      notify.error(error.message || `Failed to ${action} signal.`);
    } else {
      notify.success(
        action === "accept" ? "Connection Established" : "Signal Dropped",
        action === "accept"
          ? "You have joined the organization node."
          : "Invitation purged.",
      );
      if (action === "accept") {
        window.location.reload(); // Refresh to boot into the new org layout
      } else {
        setInvitations((prev) => prev.filter((i) => i.id !== invitationId));
      }
    }
    setProcessingId(null);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-[#0D0D0D] border-white/10 p-0 overflow-hidden outline-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />

        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Wifi className="text-cyan-400 animate-pulse" size={20} />{" "}
              Incoming Signals
            </DialogTitle>
          </DialogHeader>

          <div className="rounded-xl border border-white/5 bg-[#0A0A0A] overflow-hidden">
            <Table>
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead className="text-slate-400">
                    Organization Node
                  </TableHead>
                  <TableHead className="text-slate-400">
                    Proposed Role
                  </TableHead>
                  <TableHead className="text-right text-slate-400">
                    Response
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="h-32 text-center">
                      <Loader2 className="h-6 w-6 animate-spin text-purple-500 mx-auto" />
                    </TableCell>
                  </TableRow>
                ) : invitations.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-32 text-center text-slate-500"
                    >
                      <Inbox className="mx-auto mb-2 opacity-20" size={32} />
                      <p>The frequency is silent. No invites found.</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  invitations.map((invite) => (
                    <TableRow
                      key={invite.id}
                      className="border-white/5 hover:bg-white/[0.01]"
                    >
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className="text-purple-400" />
                          {invite.organizationName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="capitalize border-cyan-500/20 text-cyan-400 bg-cyan-500/5"
                        >
                          <Shield size={10} className="mr-1" /> {invite.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={!!processingId}
                            onClick={() => handleAction(invite.id, "reject")}
                            className="text-slate-500 hover:text-red-400 hover:bg-red-400/10 h-8 w-8 p-0"
                          >
                            <X size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={!!processingId}
                            onClick={() => handleAction(invite.id, "accept")}
                            className="text-cyan-400 hover:bg-cyan-400/10 border border-cyan-500/20 h-8 px-3"
                          >
                            {processingId === invite.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : (
                              <>
                                <Check size={14} className="mr-2" />
                                Accept
                              </>
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
