"use client";

import { usePathname } from "next/navigation";
import { FloatingHeader } from "@app/components/FloatingHeader";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
      <FloatingHeader
        type="profile"
        title="Account Settings"
        topOffset="top-0"
        maxWidth="max-w-5xl"
      />

      <div className="mx-auto w-full max-w-5xl pt-12">{children}</div>
    </div>
  );
}
