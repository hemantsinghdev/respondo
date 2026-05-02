"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth/client";
import {
  Sparkles,
  Loader2,
  Trash2,
  ExternalLink,
  RefreshCw,
} from "@repo/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@repo/ui/components";
import { UploadDocumentDialog } from "./UploadDocumentDialog";
import { fetchFilesAction, deleteFileAction } from "@app/actions/files";
import { notify } from "@app/lib/notify";
import { useConfirmStore } from "@app/lib/stores/confirmStore";

export function DocumentsManager() {
  const [loading, setLoading] = useState(true);
  const [filesList, setFilesList] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { openConfirm } = useConfirmStore();

  const { data: activeOrg } = authClient.useActiveOrganization();

  const fetchFiles = async () => {
    if (!activeOrg?.id) return;
    setLoading(true);
    try {
      const { data, error } = await fetchFilesAction(activeOrg.id);
      if (error) {
        notify.error("Unable to Fetch Files");
      } else {
        setFilesList(data || []);
      }
    } catch (err) {
      notify.error("An error occurred loading documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeOrg?.id) {
      fetchFiles();
    }
  }, [activeOrg]);

  const handleDelete = async (fileId: string) => {
    openConfirm({
      title: "Delete File",
      description:
        "Delete this document? This will purge it from your AI knowledge base.",
      actionLabel: "Delete",
      variant: "warning",
      onConfirm: async () => {
        try {
          const res = await deleteFileAction(fileId);

          if (res.success) {
            notify.success("Document deleted successfully");
            fetchFiles();
          } else {
            notify.error(res.error || "Failed to delete document");
          }
        } catch (err) {
          notify.error("An error occurred while deleting the file");
        }
      },
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            Ingested
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            Failed
          </Badge>
        );
      case "QUEUED":
      case "PARSED":
      case "EMBEDDED":
        return (
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 animate-pulse">
            Processing
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20">
            Not Ingested
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-[#0D0D0D] border-white/5 relative overflow-hidden transition-all">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

        <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
          <div>
            <CardTitle className="flex items-center gap-2 text-white text-xl">
              <Sparkles className="w-5 h-5 text-fuchsia-500" />
              Document Manager
            </CardTitle>
            <CardDescription className="text-slate-400 mt-1 max-w-2xl">
              Manage the documents used by the AI engine to answer inquiries.
              Up-to-date documentation improves the relevance of responses.
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={fetchFiles}
              size="icon"
              disabled={loading}
              className="border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 h-10 w-10"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </Button>

            <UploadDocumentDialog
              activeOrg={activeOrg}
              isOpen={isDialogOpen}
              setIsOpen={setIsDialogOpen}
              onUploadSuccess={fetchFiles}
            />
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex h-[240px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-purple-500" />
            </div>
          ) : filesList.length === 0 ? (
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
              <Table>
                <TableHeader className="bg-white/[0.02]">
                  <TableRow className="border-white/5 hover:bg-transparent">
                    <TableHead className="text-slate-300">File Name</TableHead>
                    <TableHead className="text-slate-300">Size</TableHead>
                    <TableHead className="text-slate-300">Date Added</TableHead>
                    <TableHead className="text-slate-300">
                      Ingestion Status
                    </TableHead>
                    <TableHead className="text-slate-300 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filesList.map((file) => (
                    <TableRow
                      key={file.id}
                      className="border-white/5 hover:bg-white/[0.01]"
                    >
                      <TableCell className="font-medium text-white max-w-[280px] truncate">
                        {file.name}
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {(Number(file.size) / 1024 / 1024).toFixed(2)} MB
                      </TableCell>
                      <TableCell className="text-slate-400 text-sm">
                        {file.lastModified
                          ? new Date(file.lastModified).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        <div className="flex">
                          {getStatusBadge(file.status)}
                          {(file.status === "FAILED" ||
                            file.status === "NOT_INGESTED") && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Retry Ingestion"
                              className="h-8 w-8 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                              // onClick={async () => {
                              //   const res = await retryIngestionAction(file.id);
                              //   if (res.success) {
                              //     notify.success("File queued for ingestion!");
                              //     fetchFiles(); // Reload the table data
                              //   } else {
                              //     notify.error(res.error || "Retry failed.");
                              //   }
                              // }}
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end items-center gap-1">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/10"
                          >
                            <a href={file.url} target="_blank" rel="noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            onClick={() => handleDelete(file.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
