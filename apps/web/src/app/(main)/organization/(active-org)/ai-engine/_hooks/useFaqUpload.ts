import { useState } from "react";
import { useUploadThing } from "@repo/storage/files/client";
import { notify } from "@app/lib/notify";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export function useFAQUpload(
  activeMember: any,
  activeOrg: any,
  onComplete?: () => void,
) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const { startUpload } = useUploadThing("file", {
    onUploadProgress: (p) => setProgress(Math.floor(p * 0.95)),
    onClientUploadComplete: async (res) => {
      if (!res || res.length === 0 || !activeMember) {
        handleFailure("Upload failed: No response from server");
        return;
      }

      setProgress(100);
      setStatus("success");
      notify.success("Knowledge base updated successfully.");

      setTimeout(() => {
        setStatus("idle");
        setFiles([]);
        setProgress(0);
        onComplete?.();
      }, 2000);
    },
    onUploadError: (error) => handleFailure(error.message),
  });

  const handleFailure = (msg: string) => {
    notify.error(msg);
    setErrorMessage(msg);
    setStatus("error");
  };

  const reset = () => {
    setStatus("idle");
    setErrorMessage(null);
    setProgress(0);
    setFiles([]);
  };

  const handleUpload = async () => {
    if (activeMember.role !== "owner") {
      notify.warning("You don't have Permissions to Upload Files");
      return;
    }
    if (files.length === 0 || status !== "idle") return;

    setStatus("uploading");

    // Map through and properly prepare filenames for storage
    const renamedFiles = files.map((file) => {
      const parts = file.name.split(".");
      const fileExt = parts.pop();
      const baseName = parts.join(".");
      return new File(
        [file],
        `${activeOrg.slug}-${baseName.replace(/\s+/g, "_")}.${fileExt}`,
        { type: file.type },
      );
    });

    await startUpload(renamedFiles);
  };

  return {
    files,
    setFiles,
    status,
    reset,
    errorMessage,
    progress,
    handleUpload,
  };
}
