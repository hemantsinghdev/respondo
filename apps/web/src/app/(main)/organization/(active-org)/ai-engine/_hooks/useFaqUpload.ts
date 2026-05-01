import { useState } from "react";
import { authClient } from "@repo/auth/client";
import { useUploadThing } from "@repo/storage/files/client";
import { notify } from "@app/lib/notify";

export type UploadStatus =
  | "idle"
  | "uploading"
  | "updating"
  | "success"
  | "error";

export function useFAQUpload(activeOrg: any) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const { startUpload } = useUploadThing("file", {
    onUploadProgress: (p) => setProgress(Math.floor(p * 0.9)),
    onClientUploadComplete: async (res) => {
      if (!res?.[0] || !activeOrg) {
        handleFailure("Upload failed: No response from server");
        return;
      }

      const uploadedUrl = res[0].ufsUrl;
      setStatus("updating");
      setProgress(90);

      try {
        const { error } = await authClient.organization.update({
          organizationId: activeOrg.id,
          data: { faqFileUrl: uploadedUrl },
        });

        if (error) {
          notify.error("Organization Updation Error", error.message);
          setErrorMessage(
            error.message ?? "An Error Occured While updating Database",
          );
          setStatus("error");
        }

        setProgress(100);
        setStatus("success");
        notify.success("Knowledge base updated successfully.");

        setTimeout(() => {
          setStatus("idle");
          setFile(null);
          setProgress(0);
        }, 3000);
      } catch (err: any) {
        handleFailure(`Database update failed: ${err.message}`);
      }
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
  };

  const handleUpload = async () => {
    if (!file || !activeOrg || status !== "idle") return;

    setStatus("uploading");
    const fileExt = file.name.split(".").pop();
    const safeSlug = activeOrg.slug || activeOrg.id;
    const renamedFile = new File([file], `${safeSlug}-faq.${fileExt}`, {
      type: file.type,
    });

    await startUpload([renamedFile]);
  };

  return { file, setFile, status, reset, errorMessage, progress, handleUpload };
}
