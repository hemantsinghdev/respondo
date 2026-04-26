import { auth } from "@repo/auth/server";
import { headers } from "next/headers";
import { UserPlus, Users } from "@repo/ui/icons";
import { MembersClient } from "./_components/MemberClient";
import { InviteMember } from "./_components/InviteMember";
import { redirect } from "next/navigation";

export default async function MembersPage() {
  let activeMember;
  try {
    activeMember = await auth.api.getActiveMember({
      headers: await headers(),
    });
  } catch (error) {
    return redirect("/organization");
  }
  if (!activeMember) return null;
  const isAdmin = activeMember.role === "owner";

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Users className="text-cyan-400" size={24} />
            Organization Roster
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage agents, assign roles, and control grid access.
          </p>
        </div>
        {isAdmin && <InviteMember />}
      </div>

      <MembersClient activeMember={activeMember} isAdmin={isAdmin} />
    </div>
  );
}
