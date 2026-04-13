"use client";

import { authClient } from "@repo/auth/client";
import { Building2, Plus, LogOut } from "@repo/ui/icons";
import Link from "next/link";
import { useState } from "react";

export default function OrganizationPage() {
  const { data: organizations, isPending } = authClient.useListOrganizations();
  const [isDeleting, setIsDeleting] = useState(false);

  const hasOrg = organizations && organizations.length > 0;

  const handleDeleteOrganization = async () => {
    if (!organizations?.[0]?.id) return;

    setIsDeleting(true);
    await authClient.organization.delete({
      organizationId: organizations[0].id,
    });
    setIsDeleting(false);
  };

  if (isPending) return <div className="p-8 text-white">Loading...</div>;

  if (hasOrg) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-white">
        <p className="mb-4">
          You are currently part of: <strong>{organizations[0]?.name}</strong>
        </p>

        <button
          onClick={handleDeleteOrganization}
          disabled={isDeleting}
          className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-colors"
        >
          <LogOut className="h-4 w-4" />
          {isDeleting ? "Deleting..." : "Delete Organization"}
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 flex flex-col items-center justify-center py-20">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-dashed border-white/20 bg-white/5">
        <Building2 className="h-10 w-10 text-zinc-600" />
      </div>
      <h2 className="text-2xl font-bold text-white">Organizations</h2>
      <p className="mb-8 text-center text-slate-400 max-w-sm">
        You are currently not part of an organization. Create one to start
        managing tickets.
      </p>
      <Link href="/organization/create">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition-transform">
          <Plus className="h-5 w-5" />
          Create Organization
        </button>
      </Link>
    </div>
  );
}
