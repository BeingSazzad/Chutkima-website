"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import AccountSidebar from "./AccountSidebar";
import { cn } from "@/lib/utils";

export default function AccountShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHub = pathname === "/account";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Sidebar: always on desktop, only on /account hub on mobile */}
      <div className={cn(isHub ? "block" : "hidden", "lg:block")}>
        <AccountSidebar />
      </div>

      {/* Content: hidden on mobile when on hub */}
      <div className={cn(isHub ? "hidden" : "block", "lg:block")}>
        {!isHub && (
          <Link
            href="/account"
            className="mb-3 inline-flex items-center gap-1 text-sm font-semibold text-ink-muted hover:text-brand-700 lg:hidden"
          >
            ← Account
          </Link>
        )}
        {children}
      </div>
    </div>
  );
}
