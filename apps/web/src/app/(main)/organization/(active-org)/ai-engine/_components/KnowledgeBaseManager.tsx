"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth/client";
import { Database, Loader2, RefreshCw } from "@repo/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
} from "@repo/ui/components";
import {
  fetchKnowledgeBaseAction,
  deleteChunkAction,
} from "@app/actions/knowledge";
import { notify } from "@app/lib/notify";
import { useConfirmStore } from "@app/lib/stores/confirmStore";
import { KnowledgeRow } from "./KnowledgeRow";
import { fetchRolePermissionsAction } from "@app/actions/accessControl";
import { RolePermissions } from "@repo/auth/server";

export function KnowledgeBaseManager() {
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState<RolePermissions | null>(null);
  const [chunks, setChunks] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { openConfirm } = useConfirmStore();
  const { data: activeMember } = authClient.useActiveMember();

  const fetchPermissions = async () => {
    if (!activeMember?.organizationId) return;
    try {
      const { data, error } = await fetchRolePermissionsAction(
        activeMember.organizationId,
        activeMember.role,
      );
      if (error) {
        notify.error(error);
      } else {
        setPermissions(data);
      }
    } catch (err) {
      notify.error("An error occurred fetching permissions");
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, [activeMember]);

  const loadData = async () => {
    if (!activeMember?.organizationId) return;
    setLoading(true);
    const { data, error } = await fetchKnowledgeBaseAction(
      activeMember.organizationId,
    );
    if (error) notify.error(error);
    else setChunks(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [activeMember]);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent row expansion
    openConfirm({
      title: "Delete Knowledge Chunk",
      description:
        "This will remove this specific vector segment. The AI will no longer use this context.",
      actionLabel: "Delete Chunk",
      variant: "warning",
      onConfirm: async () => {
        if (!activeMember?.organizationId) {
          notify.error("No Organization Found!!!");
          return;
        }
        if (!permissions?.document?.includes("delete")) {
          notify.error("You don't have permissions to delete Document Chunks");
          return;
        }
        const res = await deleteChunkAction(id, activeMember?.organizationId);
        if (res.success) {
          notify.success("Chunk deleted");
          loadData();
        } else notify.error(res.error ?? "Failed to Delete Chunk");
      },
    });
  };

  return (
    <Card className="bg-[#0D0D0D] border-white/5 overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="w-5 h-5 text-cyan-500" />
              Knowledge Base
            </CardTitle>
            <CardDescription className="text-slate-400">
              Granular view of the vectorized data stored in the AI engine.
            </CardDescription>
          </div>
          <div className="flex items-center justify-center">
            <Badge
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 bg-cyan-500/5"
            >
              {chunks.length} Total Chunks
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5"
              onClick={loadData}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex h-[240px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
          </div>
        ) : chunks.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-white/5 bg-white/[0.01] rounded-xl flex flex-col items-center justify-center space-y-2">
            <p className="text-slate-300 font-medium">
              No documents uploaded yet
            </p>
            <p className="text-slate-500 text-xs">
              Add files to start feeding contextual data to your AI.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-white/5 overflow-hidden">
            <Table className="table-fixed w-full">
              <TableHeader className="bg-white/[0.02]">
                <TableRow className="border-white/5">
                  <TableHead className="w-[5%]"></TableHead>
                  <TableHead className="w-[40%] text-slate-300">
                    Title & Origin
                  </TableHead>
                  <TableHead className="w-[25%] text-slate-300">
                    Keywords
                  </TableHead>
                  <TableHead className="w-[20%] text-slate-300">
                    Vector Embedding
                  </TableHead>
                  <TableHead className="w-[10%] text-right text-slate-300">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chunks.map((chunk) => (
                  <KnowledgeRow
                    key={chunk.id}
                    chunk={chunk}
                    isExpanded={expandedId === chunk.id}
                    onToggle={() =>
                      setExpandedId(expandedId === chunk.id ? null : chunk.id)
                    }
                    onDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleDelete(e, chunk.id)
                    }
                    deleteAllowed={!!permissions?.document?.includes("delete")}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
