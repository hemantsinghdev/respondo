"use client";

import { useEffect, useState } from "react";
import { authClient } from "@repo/auth/client";
import { notify } from "@app/lib/notify";
import { Monitor, Smartphone, LogOut, Loader2, Laptop } from "@repo/ui/icons";
import { UAParser } from "ua-parser-js";

export default function SessionManagementSection() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSessions = async () => {
    setIsLoading(true);
    try {
      // Fetching active sessions and current session info
      const [sessionsRes, activeRes] = await Promise.all([
        authClient.listSessions(),
        authClient.getSession(),
      ]);

      if (sessionsRes.data) setSessions(sessionsRes.data);
      if (activeRes.data) setCurrentSessionId(activeRes.data.session.id);
    } catch (err) {
      notify.error("Failed to load sessions");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const parseUA = (userAgent: string) => {
    const parser = new UAParser(userAgent);
    const res = parser.getResult();
    return {
      browser: res.browser.name || "Web Browser",
      os: res.os.name || "Unknown OS",
      isMobile: userAgent.toLowerCase().includes("mobi"),
    };
  };

  const handleRevokeSession = async (token: string) => {
    const { data, error } = await authClient.revokeSession({ token });
    if (error) {
      notify.error(error.message || "Failed to terminate session");
    } else {
      notify.success("Session terminated", data.status ? "true" : "false");
      fetchSessions();
    }
  };

  return (
    <section className="rc-card rounded-2xl border border-white/5 bg-[#0D0D0D] w-full overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <Monitor className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-semibold text-white">Active Sessions</h3>
      </div>

      <div className="p-2 min-h-[100px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-3">
            <Loader2 className="h-6 w-6 animate-spin text-cyan-500" />
            <p className="text-xs text-slate-500">
              Retrieving active devices...
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((s) => {
              const info = parseUA(s.userAgent || "");
              const isCurrent = s.id === currentSessionId;

              return (
                <div
                  key={s.id}
                  className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center border ${isCurrent ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400" : "bg-white/5 border-white/10 text-slate-500"}`}
                    >
                      {info.isMobile ? (
                        <Smartphone className="h-5 w-5" />
                      ) : (
                        <Laptop className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white">
                          {info.browser} on {info.os}
                        </p>
                        {isCurrent && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-cyan-500 text-white font-bold uppercase tracking-tight">
                            You
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{s.ipAddress || "Unknown IP"}</span>
                        <span>•</span>
                        <span>
                          {new Date(s.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isCurrent && (
                    <button
                      onClick={() => handleRevokeSession(s.token)}
                      className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
