import { Images } from "@repo/ui/assets";
import Image from "next/image";
import Link from "next/link";

export default function DefaultAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="absolute top-8 left-8 z-50">
        <Link href="/" className="transition-opacity hover:opacity-80">
          <Image
            src={Images.logos.long}
            alt="Respondo Logo"
            width={140}
            height={40}
            className="h-8 w-auto filter drop-shadow-[0_0_8px_rgba(6,182,212,0.2)]"
            priority
          />
        </Link>
      </div>
      {children}
    </div>
  );
}
