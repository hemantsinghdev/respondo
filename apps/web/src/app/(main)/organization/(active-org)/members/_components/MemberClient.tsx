"use client";

import { useState } from "react";
import { authClient } from "@repo/auth/client";
import { useConfirmStore } from "@app/lib/stores/confirmStore";
import { notify } from "@app/lib/notify";
import {
  Search,
  Mail,
  Shield,
  Trash2,
  Loader2,
  Users,
  MoreHorizontal,
} from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Input,
  Badge,
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components";

type ActiveMember = {
  id: string;
  organizationId: string;
  role: string;
  createdAt: Date;
  userId: string;
};

export function MembersClient({
  activeMember,
  isAdmin,
}: {
  activeMember: ActiveMember;
  isAdmin: boolean;
}) {
  const { data: activeOrgData, isPending } = authClient.useActiveOrganization();
  const members = activeOrgData?.members;
  const { openConfirm } = useConfirmStore();
  const [searchQuery, setSearchQuery] = useState("");

  if (isPending) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  const filteredMembers = members?.filter(
    (m) =>
      m.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleRemoveMember = (memberId: string, memberName: string) => {
    openConfirm({
      title: "Revoke Access?",
      description: `Remove ${memberName} from the organization grid? They will lose all access immediately.`,
      confirmText: "Revoke Access",
      variant: "danger",
      actionLabel: "Remove Member",
      onConfirm: async () => {
        const { error } = await authClient.organization.removeMember({
          memberIdOrEmail: memberId,
        });
        if (error) notify.error(error.message || "Failed to remove member.");
        else notify.success("Member access revoked successfully.");
      },
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background"
          />
        </div>
      </div>

      {/* Members Table */}
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] overflow-hidden">
        <Table>
          <TableHeader className="bg-white/[0.02]">
            <TableRow className="hover:bg-transparent border-white/5">
              <TableHead className="w-[400px]">Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers?.map((member) => (
              <TableRow
                key={member.id}
                className="hover:bg-white/[0.01] border-white/5"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-cyan-500/20">
                      <AvatarFallback className="bg-gradient-to-br from-cyan-900 to-blue-900 text-white font-bold">
                        {member.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">
                          {member.user.name}
                        </span>
                        {member.user.id === activeMember?.userId && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] uppercase h-4 px-1.5 bg-white/10 text-slate-300 border-none"
                          >
                            You
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail size={10} />
                        {member.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium gap-1",
                      member.role === "owner" &&
                        "bg-purple-500/10 text-purple-400 border-purple-500/20",
                      member.role === "admin" &&
                        "bg-blue-500/10 text-blue-400 border-blue-500/20",
                      member.role === "member" &&
                        "bg-slate-500/10 text-slate-400 border-slate-500/20",
                    )}
                  >
                    <Shield size={12} className="opacity-70" />
                    {member.role}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  {isAdmin && member.user.id !== activeMember.userId ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem
                          className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
                          onClick={() =>
                            handleRemoveMember(member.id, member.user.name)
                          }
                        >
                          <Trash2 size={14} className="mr-2" />
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="h-8 w-8" /> /* Spacer */
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredMembers?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Users className="h-12 w-12 text-slate-800 mb-4" />
            <p>No members found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
