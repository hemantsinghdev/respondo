"use client";

import { useState } from "react";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import { Smartphone, Globe, LogOut } from "@repo/ui/icons";

export default function SessionList({
  initialSessions,
  currentSessionId,
}: any) {
  const [sessions, setSessions] = useState(initialSessions);

  const handleRevokeSession = async (id: string) => {
    const { error } = await authClient.revokeSession({ token: id });

    if (error) {
      notify.error("Failed to terminate session");
    } else {
      notify.success("Session terminated");
      setSessions(sessions.filter((s: any) => s.id !== id));
    }
  };

  return (
    <div className="space-y-1">
      {sessions.map((s: any) => (
        <div
          key={s.id}
          className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400">
              {s.userAgent?.includes("Mobi") ? (
                <Smartphone className="h-5 w-5" />
              ) : (
                <Globe className="h-5 w-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">
                  {s.ipAddress || "Unknown IP"}
                </p>
                {s.id === currentSessionId && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase font-bold tracking-tighter">
                    Current
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {s.userAgent || "Web Browser"}
              </p>
            </div>
          </div>

          {s.id !== currentSessionId && (
            <button
              onClick={() => handleRevokeSession(s.id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-slate-500 hover:text-red-400 transition-all"
              title="Terminate Session"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
