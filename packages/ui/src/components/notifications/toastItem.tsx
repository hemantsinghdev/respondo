import {
  X,
  CheckCircle2,
  Info,
  AlertTriangle,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { toast } from "sonner";

type ThemeVariant = "success" | "error" | "warning" | "ai" | "info";
interface ThemeConfig {
  icon: React.ReactNode;
  border: string;
  glow: string;
  bg?: string;
}

export const ToastItem = ({
  t,
  title,
  description,
  duration,
  variant = "info",
}: {
  t: any;
  title: string;
  description?: string;
  duration?: number;
  variant?: ThemeVariant;
}) => {
  const themes: Record<ThemeVariant, ThemeConfig> = {
    success: {
      icon: <CheckCircle2 className="text-emerald-400" />,
      border: "border-emerald-500/30",
      glow: "shadow-emerald-500/10",
    },
    error: {
      icon: <AlertCircle className="text-red-400" />,
      border: "border-red-500/30",
      glow: "shadow-red-500/10",
    },
    warning: {
      icon: <AlertTriangle className="text-amber-400" />,
      border: "border-amber-500/30",
      glow: "shadow-amber-500/10",
    },
    ai: {
      icon: <Sparkles className="text-purple-400" />,
      border: "border-purple-500/30",
      glow: "shadow-purple-500/10",
      bg: "bg-purple-500/5",
    },
    info: {
      icon: <Info className="text-cyan-400" />,
      border: "border-cyan-500/30",
      glow: "shadow-cyan-500/10",
    },
  };

  const theme = themes[variant] || themes.info;

  return (
    <div
      className={cn(
        "group relative flex w-[380px] gap-4 p-4 rounded-xl border bg-[#0D0D0D]/90 backdrop-blur-xl shadow-2xl transition-all pointer-events-auto",
        theme.border,
        theme.glow,
        theme.bg,
      )}
    >
      <div className="mt-0.5">{theme.icon}</div>

      <div className="flex-1 space-y-1 pr-6">
        <h4 className="text-sm font-bold text-white leading-none">{title}</h4>
        {description && (
          <p className="text-xs text-slate-400 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* Desktop Close Button */}
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-4 right-4 text-slate-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress Bar (Purely Visual for Duration) */}
      {duration && (
        <div className="absolute bottom-0 left-[5px] h-[0.5px] w-full flex justify-center overflow-hidden rounded-b-xl">
          <div
            style={{ animationDuration: `${duration}ms` }}
            className={cn(
              "w-[90%] h-full fade-out-30 animate-out slide-out-to-left ease-linear fill-mode-forwards",
              variant === "ai" ? "bg-purple-500" : "bg-cyan-500",
            )}
          />
        </div>
      )}
    </div>
  );
};
