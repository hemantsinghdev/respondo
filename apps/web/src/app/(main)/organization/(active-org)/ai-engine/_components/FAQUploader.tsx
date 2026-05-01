"use client";
import { useRef } from "react";
import { authClient } from "@repo/auth/client";
import { Sparkles, CheckCircle2, Loader2 } from "@repo/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Progress,
} from "@repo/ui/components";
import { useFAQUpload } from "../_hooks/useFaqUpload";
import { FileDropzone } from "./FileDropzone";
import { notify } from "@app/lib/notify";

export function FAQUploader() {
  const { data: activeOrg } = authClient.useActiveOrganization();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { file, setFile, status, reset, errorMessage, progress, handleUpload } =
    useFAQUpload(activeOrg);

  const hasFaqFile = !!activeOrg?.faqFileUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.size > 4 * 1024 * 1024) {
      return notify.error("File too large (Max 4MB)");
    }
    setFile(selected || null);
  };

  return (
    <Card className="bg-[#0D0D0D] border-white/5 relative overflow-hidden transition-all hover:border-purple-500/30">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Sparkles className="w-5 h-5 text-fuchsia-500" />
          Knowledge Base Ingestion
        </CardTitle>
        <CardDescription className="text-slate-400">
          Upload your company's FAQ document to generate initial RAG vector
          embeddings for the AI support engine.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {hasFaqFile && status === "idle" ? (
          <ActiveStatusUI />
        ) : status === "error" ? (
          <ErrorUI errorMessage={errorMessage} reset={reset} />
        ) : (
          <>
            <FileDropzone
              file={file}
              status={status}
              onFileSelect={handleFileChange}
              inputRef={fileInputRef}
            />

            {(status === "uploading" || status === "updating") && (
              <ProgressSection status={status} progress={progress} />
            )}

            {status === "success" && <SuccessUI orgName={activeOrg?.name} />}

            <Button
              onClick={handleUpload}
              disabled={!file || status !== "idle"}
              className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:opacity-90 text-white"
            >
              {status === "idle" ? "Initialize AI Embeddings" : "Processing..."}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Simple internal helper components
const ActiveStatusUI = () => (
  <div className="p-6 rounded-lg border border-[#22C55E]/20 bg-[#22C55E]/5 flex flex-col items-center justify-center text-center space-y-3">
    <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <CheckCircle2 className="w-6 h-6 text-[#22C55E]" />
    </div>
    <div>
      <p className="text-white font-medium">FAQ Documentation Active</p>
      <p className="text-slate-400 text-sm mt-1">
        Your organization's AI is already equipped with an active knowledge
        base.
      </p>
    </div>
  </div>
);

const ProgressSection = ({
  status,
  progress,
}: {
  status: string;
  progress: number;
}) => (
  <div className="space-y-3">
    <div className="flex justify-between text-xs font-medium text-slate-400">
      <span className="flex items-center gap-1.5">
        <Loader2 className="w-3 h-3 animate-spin text-cyan-500" />
        {status === "uploading"
          ? "Uploading to storage..."
          : "Updating Database..."}
      </span>
      <span className="text-white">{progress}%</span>
    </div>
    <Progress value={progress} className="h-2 bg-white/5" />
  </div>
);

const ErrorUI = ({
  errorMessage,
  reset,
}: {
  errorMessage: string | null;
  reset: () => void;
}) => (
  <div className="p-6 rounded-lg border border-red-500/20 bg-red-500/5 flex flex-col items-center text-center space-y-3">
    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
      <span className="text-red-500 text-xl font-bold">!</span>
    </div>
    <div>
      <p className="text-white font-medium">Upload Failed</p>
      <p className="text-red-400 text-sm mt-1">
        {errorMessage || "An unexpected error occurred"}
      </p>
    </div>
    <Button
      variant="ghost"
      size="sm"
      onClick={reset}
      className="text-slate-400 hover:text-white"
    >
      Clear and Try Again
    </Button>
  </div>
);

const SuccessUI = ({ orgName }: { orgName?: string }) => (
  <div className="p-4 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center gap-3">
    <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
    <p className="text-sm text-white">
      Vectors successfully linked to {orgName}.
    </p>
  </div>
);
