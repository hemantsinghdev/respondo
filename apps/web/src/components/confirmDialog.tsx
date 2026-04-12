"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Button,
} from "@repo/ui/components";
import { useConfirmStore } from "@app/lib/store/confirmStore";
import { AlertTriangle, Info, LogOut, ShieldAlert } from "@repo/ui/icons";

export const GlobalConfirmDialog = () => {
  const {
    isOpen,
    title,
    description,
    confirmText,
    actionLabel,
    variant,
    onConfirm,
    closeConfirm,
  } = useConfirmStore();
  const [userInput, setUserInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) setUserInput("");
  }, [isOpen]);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    await onConfirm();
    setIsSubmitting(false);
    closeConfirm();
  };

  const isLocked = confirmText ? userInput !== confirmText : false;

  const getTheme = () => {
    switch (variant) {
      case "danger":
        return {
          border: "border-red-500/50",
          glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
          line: "from-red-500 to-orange-600",
          button:
            "from-red-600 to-orange-600 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)]",
          icon: <ShieldAlert className="text-red-500 w-5 h-5" />,
        };
      case "warning":
        return {
          border: "border-amber-500/50",
          glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
          line: "from-amber-400 to-orange-500",
          button:
            "from-amber-500 to-orange-600 hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]",
          icon: <AlertTriangle className="text-amber-500 w-5 h-5" />,
        };
      default:
        return {
          border: "border-cyan-500/50",
          glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
          line: "from-cyan-500 to-blue-600",
          button:
            "from-cyan-500 to-blue-600 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]",
          icon: <Info className="text-cyan-500 w-5 h-5" />,
        };
    }
  };

  const theme = getTheme();

  return (
    <Dialog open={isOpen} onOpenChange={closeConfirm}>
      <DialogContent
        className={`bg-[#0D0D0D]/95 backdrop-blur-xl border ${theme.border} ${theme.glow} text-white max-w-md overflow-hidden p-0`}
      >
        <div
          className={`absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r ${theme.line} z-50`}
        />

        <div className="p-6 space-y-6">
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
              {theme.icon}
              {title}
            </DialogTitle>
            <DialogDescription className="text-slate-400 leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          {confirmText && (
            <div className="space-y-3 p-3 rounded-lg bg-white/5 border border-white/5">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                Verification Required
              </p>
              <p className="text-sm text-slate-300">
                Please type{" "}
                <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded">
                  {confirmText}
                </span>
              </p>
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="bg-black/40 border-white/10 focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all h-10"
                placeholder="Type here..."
              />
            </div>
          )}

          <DialogFooter className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={closeConfirm}
              className="text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </Button>
            <Button
              disabled={isLocked || isSubmitting}
              onClick={handleConfirm}
              className={`px-6 font-bold text-white transition-all duration-300 bg-gradient-to-r ${theme.button}`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Processing
                </div>
              ) : (
                actionLabel
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
