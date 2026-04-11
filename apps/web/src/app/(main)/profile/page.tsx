// "use client";

// import { authClient } from "@repo/auth/client";
// import { Mail, Shield, Calendar } from "@repo/ui/icons";

// export default function BasicProfile() {
//   const { data: session } = authClient.useSession();

//   return (
//     <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
//       <div className="grid gap-8">
//         {/* Profile Hero Card */}
//         <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0D0D0D] p-8">
//           <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-600/10 blur-[80px]" />

//           <div className="relative flex flex-col md:flex-row items-center gap-6">
//             <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.3)]">
//               <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D0D0D] text-3xl font-bold text-white">
//                 {session?.user.name?.charAt(0).toUpperCase()}
//               </div>
//             </div>

//             <div className="text-center md:text-left">
//               <h2 className="text-3xl font-bold tracking-tight text-white">
//                 {session?.user.name}
//               </h2>
//               <p className="text-slate-400">{session?.user.email}</p>
//             </div>
//           </div>
//         </div>

//         {/* Details Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <DetailCard
//             icon={<Mail className="h-4 w-4 text-cyan-400" />}
//             label="Primary Email"
//             value={session?.user.email ?? "N/A"}
//           />
//           <DetailCard
//             icon={<Shield className="h-4 w-4 text-purple-400" />}
//             label="System Role"
//             value="Administrator"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function DetailCard({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-2xl border border-white/5 bg-[#0D0D0D] p-6 transition-all hover:border-white/10">
//       <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
//         {icon}
//         <span className="text-xs font-semibold uppercase tracking-widest">
//           {label}
//         </span>
//       </div>
//       <p className="text-lg font-medium text-white">{value}</p>
//     </div>
//   );
// }

"use client";

import { authClient } from "@repo/auth/client";
import {
  Mail,
  Shield,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Send,
} from "@repo/ui/icons";
import { notify } from "@app/lib/notify";
import { useState } from "react";

export default function BasicProfile() {
  const { data: session } = authClient.useSession();
  const [isSending, setIsSending] = useState(false);

  const handleSendVerification = async () => {
    setIsSending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: session?.user.email || "",
    });

    if (error) {
      notify.error("Failed to send verification email.");
    } else {
      notify.success("Verification link sent to your email!");
    }
    setIsSending(false);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-8">
        {/* Profile Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-[#0D0D0D] p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-600/10 blur-[80px]" />
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0D0D0D] text-3xl font-bold text-white">
                {session?.user.name?.charAt(0).toUpperCase()}
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                {session?.user.name}
              </h2>
              <p className="text-slate-400">{session?.user.email}</p>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Verification Card */}
          <div
            onClick={
              !session?.user.emailVerified ? handleSendVerification : undefined
            }
            className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-[#0D0D0D] p-6 transition-all hover:border-cyan-500/30 cursor-pointer ${isSending ? "opacity-50 pointer-events-none" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Account Status
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {session?.user.emailVerified ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <p className="text-lg font-medium text-white">Verified</p>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                      <p className="text-lg font-medium text-white group-hover:hidden">
                        Unverified
                      </p>
                      <p className="text-lg font-medium text-cyan-400 hidden group-hover:flex items-center gap-2 animate-in fade-in slide-in-from-right-2">
                        Verify Now <Send className="h-4 w-4" />
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DetailCard
            icon={<Calendar className="h-4 w-4 text-blue-400" />}
            label="Member Since"
            value={new Date(
              session?.user.createdAt || Date.now(),
            ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          />
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0D0D0D] p-6 transition-all hover:border-white/10">
      <div className="mb-2 flex items-center gap-2 text-[#94A3B8]">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-widest">
          {label}
        </span>
      </div>
      <p className="text-lg font-medium text-white">{value}</p>
    </div>
  );
}
