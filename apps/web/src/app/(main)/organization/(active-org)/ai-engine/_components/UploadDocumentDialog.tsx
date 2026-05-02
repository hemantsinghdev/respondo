"use client";

import { useRef } from "react";
import { Sparkles, UploadCloud } from "@repo/ui/icons";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components";
import { Dropzone } from "./Dropzone";
import { useFAQUpload } from "../_hooks/useFaqUpload";
import { notify } from "@app/lib/notify";

interface UploadDocumentDialogProps {
  activeOrg: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onUploadSuccess: () => void;
}

export function UploadDocumentDialog({
  activeOrg,
  isOpen,
  setIsOpen,
  onUploadSuccess,
}: UploadDocumentDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    files,
    setFiles,
    status,
    reset,
    errorMessage,
    progress,
    handleUpload,
  } = useFAQUpload(activeOrg, () => {
    setIsOpen(false);
    onUploadSuccess();
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (files.length + selectedFiles.length > 4) {
      return notify.error("Maximum 4 files allowed at a time");
    }

    const validFiles: File[] = [];
    for (const f of selectedFiles) {
      if (f.size > 4 * 1024 * 1024) {
        notify.error(`File "${f.name}" is too large (Max 4MB)`);
      } else {
        validFiles.push(f);
      }
    }
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(val) => {
        setIsOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:opacity-90 text-white shadow-lg">
          <UploadCloud className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D0D0D] border-white/10 text-white sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fuchsia-500" />
            Ingest Materials
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Add PDF materials. These documents will be split and vectorized.
          </DialogDescription>
        </DialogHeader>

        {status === "error" ? (
          <ErrorUI errorMessage={errorMessage} reset={reset} />
        ) : (
          <div className="space-y-5 pt-2">
            <Dropzone
              files={files}
              status={status}
              onFilesSelect={handleFileChange}
              onRemoveFile={handleRemoveFile}
              inputRef={fileInputRef}
            />

            {(status === "uploading" || status === "success") && (
              <ProgressSection status={status} progress={progress} />
            )}

            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || status !== "idle"}
              className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:opacity-90 text-white font-medium"
            >
              {status === "idle"
                ? `Process ${files.length} Document${files.length !== 1 ? "s" : ""}`
                : "Uploading..."}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Sub-components used exclusively within the Dialog
import { Loader2 } from "@repo/ui/icons";
import { Progress } from "@repo/ui/components";

const ProgressSection = ({
  status,
  progress,
}: {
  status: string;
  progress: number;
}) => (
  <div className="space-y-2">
    <div className="flex justify-between text-xs font-medium text-slate-400">
      <span className="flex items-center gap-1.5">
        <Loader2 className="w-3 h-3 animate-spin text-cyan-500" />
        {status === "uploading"
          ? "Uploading to storage..."
          : "Processing complete!"}
      </span>
      <span className="text-white">{progress}%</span>
    </div>
    <Progress value={progress} className="h-1 bg-white/5" />
  </div>
);

const ErrorUI = ({
  errorMessage,
  reset,
}: {
  errorMessage: string | null;
  reset: () => void;
}) => (
  <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5 flex flex-col items-center text-center space-y-3">
    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
      <span className="text-red-500 text-lg font-bold">!</span>
    </div>
    <div>
      <p className="text-white text-sm font-medium">Upload Failed</p>
      <p className="text-red-400 text-xs mt-1">
        {errorMessage || "An unexpected error occurred during indexing"}
      </p>
    </div>
    <Button
      variant="ghost"
      size="sm"
      onClick={reset}
      className="text-slate-400 hover:text-white text-xs"
    >
      Try Again
    </Button>
  </div>
);
