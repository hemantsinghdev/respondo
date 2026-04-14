"use client";

import { notify } from "@app/lib/notify";
import { Plus } from "@repo/ui/icons";
import { useRouter } from "next/navigation";

interface Props {
  isEmailVerified: boolean;
}

export function InitializeNodeButton({ isEmailVerified }: Props) {
  const router = useRouter();

  const handleClick = () => {
    if (!isEmailVerified) {
      return notify.warning(
        "Email Verification Required",
        "Please verify your email before creating an organization.",
        10000,
      );
    }

    router.push("/organization/create");
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-black overflow-hidden transition-all hover:scale-105 active:scale-95"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <Plus className="relative h-5 w-5 group-hover:text-white" />
      <span className="relative group-hover:text-white">Initialize Node</span>
    </button>
  );
}
