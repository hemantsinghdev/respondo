import { create } from "zustand";

type DialogVariant = "danger" | "warning" | "info";

interface ConfirmStore {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  actionLabel: string;
  variant: DialogVariant;
  onConfirm: () => void | Promise<void>;

  // Actions
  openConfirm: (
    data: Omit<ConfirmStore, "isOpen" | "openConfirm" | "closeConfirm">,
  ) => void;
  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  confirmText: "",
  actionLabel: "Confirm",
  variant: "info",
  onConfirm: () => {},

  openConfirm: (data) => set({ ...data, isOpen: true }),
  closeConfirm: () =>
    set({
      isOpen: false,
      confirmText: "",
    }),
}));
