"use client";

import Link from "next/link";
import Image from "next/image";
import { useSidebarStore } from "@app/lib/stores/sidebarStore";
import { useConfirmStore } from "@app/lib/stores/confirmStore";
import { Images } from "@repo/ui/assets";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "@repo/ui/icons";
import { cn } from "@repo/ui/lib/utils"; // Standard ShadCN utility

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Organization", href: "/organization", icon: Building2 },
];

export function Sidebar({ onLogout }: { onLogout: () => void }) {
  const pathname = usePathname();
  const { isCollapsed, toggle } = useSidebarStore();
  const { openConfirm } = useConfirmStore();

  const handleLogoutClick = () => {
    openConfirm({
      title: "End Session?",
      description:
        "You'll need to re-authenticate to access your multi-channel inbox.",
      actionLabel: "Log Out",
      variant: "warning",
      onConfirm: () => {
        onLogout();
      },
    });
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen border-r border-white/5 bg-[#0D0D0D] flex flex-col transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[80px]" : "w-[260px]",
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "flex h-20 items-center px-6 mb-4",
          isCollapsed ? "justify-center px-0" : "gap-3",
        )}
      >
        {isCollapsed ? (
          <div className="relative h-9 w-9 shrink-0">
            <Image
              src={Images.logos.short}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="relative h-9 w-full shrink-0">
            <Image
              src={Images.logos.long}
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2 px-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center rounded-xl py-2.5 transition-all duration-200",
                isCollapsed ? "justify-center px-0" : "px-3 gap-3",
                isActive
                  ? "bg-white/5 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white",
              )}
            >
              {isActive && (
                <div className="absolute left-0 h-5 w-[2px] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]" />
              )}
              <item.icon
                className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-cyan-400" : "group-hover:text-white",
                )}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium animate-in fade-in slide-in-from-left-2">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/5 p-3 space-y-2">
        <button
          onClick={handleLogoutClick}
          className={cn(
            "flex w-full items-center rounded-xl py-2.5 text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors",
            isCollapsed ? "justify-center px-0" : "px-3 gap-3",
          )}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>

        <button
          onClick={toggle}
          className="flex w-full items-center justify-center rounded-xl py-2 text-zinc-600 hover:bg-white/5 hover:text-cyan-400 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>
    </aside>
  );
}
