import { auth } from "@repo/auth/server";
import { headers } from "next/headers";
import Link from "next/link";
import {
  Building2,
  Plus,
  Settings2,
  Globe,
  MapPin,
  ShieldCheck,
  Calendar,
  ExternalLink,
} from "@repo/ui/icons";
import { redirect } from "next/navigation";
import { InitializeNodeButton } from "./_components/InitializeNodeButton";

export default async function OrganizationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  const org = organizations?.[0];

  if (!org) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-1000">
        <div className="group relative mb-8">
          <div className="absolute -inset-4 rounded-full bg-cyan-500/10 blur-xl transition-all" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-[#0D0D0D]">
            <Building2 className="h-10 w-10 text-slate-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">No Active Node</h2>
        <p className="mb-10 text-center text-slate-400 max-w-sm leading-relaxed">
          Your account is currently floating in the void. Initialize an
          organization node to begin.
        </p>
        <InitializeNodeButton isEmailVerified={session?.user.emailVerified} />
      </div>
    );
  }

  const metadata = (org.metadata as any) || {};

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Organization Node
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-1">
            Registry Alpha-1
          </p>
        </div>
        <Link href="/organization/member-settings">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-all text-sm font-medium">
            <Settings2 className="h-4 w-4" />
            Manage Settings
          </button>
        </Link>
      </div>

      {/* Organization Hero Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0D0D0D] p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="relative h-32 w-32 items-center justify-center rounded-3xl bg-[#0A0A0A] border border-white/10 text-4xl font-bold text-white flex">
            {org.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-2">
              {org.name}
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-400">
              <span className="text-sm font-mono">
                <span className="text-slate-600">SLUG:</span> {org.slug}
              </span>
              {metadata.city && (
                <span className="flex items-center gap-1.5 text-sm">
                  <MapPin className="h-3.5 w-3.5 text-blue-400" />
                  {metadata.city}, {metadata.countryCode}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/5 bg-[#0D0D0D] p-6 hover:border-white/10 transition-all">
          <div className="mb-3 flex items-center gap-2 text-slate-500">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
              Node Established
            </span>
          </div>
          <p className="text-lg font-medium text-white">
            {new Date(org.createdAt).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        {metadata.website && (
          <div className="rounded-2xl border border-white/5 bg-[#0D0D0D] p-6 hover:border-blue-500/30 transition-all group">
            <div className="mb-3 flex items-center gap-2 text-slate-500">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                External Domain
              </span>
            </div>
            <a
              href={metadata.website}
              target="_blank"
              className="flex items-center justify-between text-lg font-medium text-white"
            >
              {metadata.website.replace(/^https?:\/\//, "")}
              <ExternalLink className="h-4 w-4 text-slate-600 group-hover:text-blue-400" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
