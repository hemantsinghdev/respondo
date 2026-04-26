import { LockKeyhole } from "@repo/ui/icons";
import { AccessControlTabs } from "./_components/AccessControlTabs";

export default function AccessControlPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <LockKeyhole className="text-purple-400" size={24} />
            Access Control
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Configure dynamic roles, permissions, and operational teams.
          </p>
        </div>
      </div>

      <AccessControlTabs />
    </div>
  );
}
