import { toast, ToastItem } from "@repo/ui/components";

type ToastVariant = "success" | "error" | "warning" | "ai";

const customToast = (variant: ToastVariant) => {
  return (title: string, desc?: string, duration?: number) =>
    toast.custom(
      (t) => (
        <ToastItem
          t={t}
          title={title}
          description={desc}
          duration={duration ?? 3000}
          variant={variant}
        />
      ),
      { duration: duration ?? 3000 },
    );
};

export const notify = {
  success: customToast("success"),
  error: customToast("error"),
  warning: customToast("warning"),
  ai: customToast("ai"),
  promise: (
    promise: Promise<any>,
    {
      loading,
      success,
      error,
    }: { loading: string; success: string; error: string },
  ) => {
    return toast.promise(promise, {
      loading: <ToastItem t={undefined} title={loading} variant="info" />,
      success: (data) => (
        <ToastItem t={data.id} title={success} variant="success" />
      ),
      error: (err) => <ToastItem t={err.id} title={error} variant="error" />,
    });
  },
};
