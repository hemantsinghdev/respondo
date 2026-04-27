"use client";

import { notify } from "@app/lib/notify";
import { authClient } from "@repo/auth/client";
import { Loader2, MailCheck } from "@repo/ui/icons";
import React, { useState } from "react";

export default function NeedVerification({ email }: { email?: string }) {
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setIsSending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: email || "",
      callbackURL: "/profile?email-verified=true",
    });

    if (error) {
      notify.error("Failed to send verification email.");
    } else {
      notify.success(
        "Verification link sent!",
        "Check your inbox to authorize your identity.",
        10000,
      );
    }
    setIsSending(false);
  };
  return (
    <div className="max-w-xl mx-auto py-1 px-6">
      <div className="bg-[#0D0D0D] border border-cyan-500/20 rounded-3xl p-8 text-center space-y-6 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-2">
          <MailCheck className="text-cyan-400" size={40} />
        </div>
        <h2 className="text-3xl font-bold text-white">Identity Unverified</h2>
        <p className="text-slate-400 max-w-sm mx-auto">
          Access to the organization grid requires a verified email address.
          Please confirm your transmission.
        </p>
        <button
          onClick={handleSendVerification}
          disabled={isSending}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white hover:scale-[1.02] transition-all disabled:opacity-50"
        >
          {isSending ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Resend Verification Link"
          )}
        </button>
      </div>
    </div>
  );
}
