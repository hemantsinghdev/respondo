"use client";

import { usePathname } from "next/navigation";
import { User, Building2 } from "@repo/ui/icons";
import { FloatingHeader } from "@app/components/FloatingHeader";

const profileTabs = [{ name: "Basic", href: "/organization", icon: Building2 }];

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col">
      <FloatingHeader
        tabs={profileTabs}
        title="Account Settings"
        topOffset="top-6"
        maxWidth="max-w-5xl"
      />

      <div className="mx-auto w-full max-w-4xl pt-12">{children}</div>
    </div>
  );
}
